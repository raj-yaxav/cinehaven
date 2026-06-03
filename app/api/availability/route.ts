import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import AvailabilitySlot from '../../../models/AvailabilitySlot';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');
    const date = searchParams.get('date');

    if (!room || !date) {
      return NextResponse.json(
        { status: 'error', message: 'Room and date are required' },
        { status: 400 }
      );
    }

    const slots = await AvailabilitySlot.find({
      room,
      dateString: date,
      status: 'available',
    })
      .sort({ start: 1 })
      .lean();

    return NextResponse.json({ status: 'success', data: slots });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch availability' }, { status: 500 });
  }
}
