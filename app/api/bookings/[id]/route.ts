import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Booking from '../../../../models/Booking';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const bookingId = params?.id;
    if (!bookingId) {
      return NextResponse.json({ status: 'error', message: 'Booking ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const booking = await Booking.findOne({ bookingId }).lean().exec();

    if (!booking) {
      return NextResponse.json({ status: 'error', message: `No booking found with ID: ${bookingId}` }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', data: booking });
  } catch (error) {
    console.error('Booking lookup error:', error);
    const message = error instanceof Error ? error.message : 'Unable to fetch booking';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
