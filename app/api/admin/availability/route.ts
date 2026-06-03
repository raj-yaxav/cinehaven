import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../lib/auth';
import AvailabilitySlot from '../../../../models/AvailabilitySlot';
import { ensureDefaultSlotsForRooms } from '../../../../lib/availability';

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

export async function GET(request: Request) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const query: Record<string, unknown> = {};
    if (date) query.dateString = date;
    const slots = await AvailabilitySlot.find(query)
      .populate('room', 'name')
      .populate('location', 'name city')
      .sort({ dateString: -1, start: 1 })
      .limit(200)
      .lean();
    return NextResponse.json({ status: 'success', data: slots });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch slots' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const payload = await request.json();

    if (payload.generateDefault) {
      const roomIds = Array.isArray(payload.rooms)
        ? payload.rooms.filter(Boolean)
        : [payload.room].filter(Boolean);

      if (!payload.dateString || roomIds.length === 0) {
        return NextResponse.json(
          { status: 'error', message: 'Date and theatre are required to generate slots' },
          { status: 400 }
        );
      }

      const result = await ensureDefaultSlotsForRooms(roomIds, payload.dateString);
      return NextResponse.json({ status: 'success', data: result }, { status: 201 });
    }

    const slot = await AvailabilitySlot.create({
      location: payload.location,
      room: payload.room,
      date: new Date(`${payload.dateString}T00:00:00.000Z`),
      dateString: payload.dateString,
      start: payload.start,
      end: payload.end,
      status: payload.status || 'available',
      priceOverride: payload.priceOverride ? Number(payload.priceOverride) : undefined,
      note: payload.note,
    });
    return NextResponse.json({ status: 'success', data: slot }, { status: 201 });
  } catch (error: any) {
    const message = error?.code === 11000 ? 'This slot already exists for the selected theatre and date' : 'Unable to create slot';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
