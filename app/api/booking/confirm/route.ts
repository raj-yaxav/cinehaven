import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Booking from '../../../../models/Booking';
import Lead from '../../../../models/Lead';
import Notification from '../../../../models/Notification';
import OTP from '../../../../models/OTP';
import AvailabilitySlot from '../../../../models/AvailabilitySlot';
import {
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail,
} from '../../../../lib/email';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { status: 'error', message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP again
    const otpRecord = await OTP.findOne({
      email,
      otp,
      verified: true,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid or expired session' },
        { status: 400 }
      );
    }

    const bookingData = otpRecord.bookingData;
    const dateString = new Date(bookingData.date).toISOString().split('T')[0];
    const slot = await AvailabilitySlot.findOne({
      _id: bookingData.availabilitySlot,
      room: bookingData.room,
      dateString,
      start: bookingData.timeSlot.start,
      end: bookingData.timeSlot.end,
      status: 'available',
    });

    if (!slot) {
      return NextResponse.json(
        { status: 'error', message: 'Selected slot is no longer available' },
        { status: 409 }
      );
    }

    // Create Lead
    const lead = await Lead.create({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      occasion: bookingData.occasion,
      location: bookingData.location,
      room: bookingData.room,
      package: bookingData.package,
      date: new Date(bookingData.date),
      guests: bookingData.guests,
      specialRequests: bookingData.specialRequests,
      status: 'new',
      source: 'booking_wizard',
    });

    // Create Booking
    const booking = await Booking.create({
      bookingId: bookingData.bookingId,
      lead: lead._id,
      location: bookingData.location,
      room: bookingData.room,
      package: bookingData.package,
      date: new Date(bookingData.date),
      timeSlot: bookingData.timeSlot,
      availabilitySlot: slot._id,
      guests: bookingData.guests,
      addOns: bookingData.addOns || [],
      totalAmount: bookingData.totalAmount,
      discountAmount: bookingData.discountAmount || 0,
      finalAmount: bookingData.finalAmount,
      paymentStatus: 'pending',
      bookingStatus: 'confirmed',
      customerDetails: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
      specialRequests: bookingData.specialRequests,
      emailSent: false,
    });

    await Notification.create({
      type: 'booking',
      title: 'New booking confirmed',
      message: `${bookingData.name} confirmed booking ${bookingData.bookingId}`,
      href: '/admin/bookings',
      metadata: {
        bookingId: booking.bookingId,
        bookingObjectId: booking._id,
        leadId: lead._id,
        amount: bookingData.finalAmount,
      },
    });

    slot.status = 'booked';
    slot.booking = booking._id;
    await slot.save();

    // Send emails
    try {
      await sendBookingConfirmationEmail(bookingData.email, {
        name: bookingData.name,
        bookingId: bookingData.bookingId,
        location: bookingData.locationName || bookingData.location,
        room: bookingData.roomName || bookingData.room,
        package: bookingData.packageName || bookingData.package,
        date: new Date(bookingData.date).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        timeSlot: `${bookingData.timeSlot.start} - ${bookingData.timeSlot.end}`,
        guests: bookingData.guests,
        totalAmount: bookingData.finalAmount,
      });

      await sendAdminNotificationEmail({
        bookingId: bookingData.bookingId,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        location: bookingData.locationName || bookingData.location,
        room: bookingData.roomName || bookingData.room,
        package: bookingData.packageName || bookingData.package,
        date: new Date(bookingData.date).toLocaleDateString('en-IN'),
        guests: bookingData.guests,
        totalAmount: bookingData.finalAmount,
      });

      // Update booking
      booking.emailSent = true;
      booking.emailSentAt = new Date();
      await booking.save();
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    // Clean up OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    return NextResponse.json({
      status: 'success',
      message: 'Booking confirmed successfully',
      data: {
        bookingId: booking.bookingId,
        leadId: lead._id,
      },
    });
  } catch (error) {
    console.error('Confirm booking error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to confirm booking' },
      { status: 500 }
    );
  }
}
