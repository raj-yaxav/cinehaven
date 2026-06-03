import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../../lib/auth';
import AvailabilitySlot from '../../../../../models/AvailabilitySlot';

interface Params {
  params: { id: string };
}

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const payload = await request.json();
    const update = {
      ...payload,
      ...(payload.dateString ? { date: new Date(`${payload.dateString}T00:00:00.000Z`) } : {}),
    };
    const slot = await AvailabilitySlot.findByIdAndUpdate(params.id, update, { new: true });
    if (!slot) {
      return NextResponse.json({ status: 'error', message: 'Slot not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: slot });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to update slot' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const slot = await AvailabilitySlot.findByIdAndDelete(params.id);
    if (!slot) {
      return NextResponse.json({ status: 'error', message: 'Slot not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', message: 'Slot deleted' });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to delete slot' }, { status: 500 });
  }
}
