import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Booking from '../../../models/Booking';

function generateBookingId() {
  return `CH-${Date.now().toString(36).toUpperCase()}`;
}

export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ status: 'success', data: bookings });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();
    const booking = await Booking.create({
      bookingId: generateBookingId(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ status: 'success', data: booking });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to create booking' }, { status: 500 });
  }
}
