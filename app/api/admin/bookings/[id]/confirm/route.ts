import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../../../lib/auth';
import AvailabilitySlot from '../../../../../../models/AvailabilitySlot';
import Booking from '../../../../../../models/Booking';

interface Params {
  params: { id: string };
}

export async function POST(_request: Request, { params }: Params) {
  try {
    if (!getAdminFromToken()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ status: 'error', message: 'Booking not found' }, { status: 404 });
    }

    const dateString = new Date(booking.date).toISOString().split('T')[0];
    const slot = await AvailabilitySlot.findOne({
      room: booking.room,
      dateString,
      start: booking.timeSlot.start,
      end: booking.timeSlot.end,
      status: { $ne: 'booked' },
    });

    if (!slot) {
      return NextResponse.json({ status: 'error', message: 'Slot is not available or already booked' }, { status: 409 });
    }

    slot.status = 'booked';
    slot.booking = booking._id;
    await slot.save();

    booking.bookingStatus = 'confirmed';
    booking.availabilitySlot = slot._id;
    await booking.save();

    return NextResponse.json({ status: 'success', data: booking });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to confirm booking' }, { status: 500 });
  }
}
