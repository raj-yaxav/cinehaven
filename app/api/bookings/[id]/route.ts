import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Booking from '../../../../models/Booking';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectToDatabase();
    const booking = await Booking.findOne({ bookingId: params.id }).lean();
    if (!booking) {
      return NextResponse.json({ status: 'error', message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: booking });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch booking' }, { status: 500 });
  }
}
