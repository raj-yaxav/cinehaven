import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import AvailabilitySlot from '../../../../models/AvailabilitySlot';
import Booking from '../../../../models/Booking';
import Lead from '../../../../models/Lead';
import Notification from '../../../../models/Notification';
import Package from '../../../../models/Package';
import Room from '../../../../models/Room';
import {
  sendAdminNotificationEmail,
  sendBookingConfirmationEmail,
} from '../../../../lib/email';
import crypto from 'crypto';

function generateBookingId(): string {
  return `CH-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

type BookingRoomFallback = {
  _id: unknown;
  location?: unknown;
  name?: string;
};

type BookingPackageFallback = {
  _id: unknown;
  name?: string;
};

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();

    let {
      name,
      email,
      phone,
      location,
      room,
      package: packageId,
      date,
      timeSlot,
      guests,
      addOns,
      totalAmount,
      discountAmount,
      finalAmount,
      specialRequests,
      occasion,
    } = payload;

    const selectedRoom = (room
      ? await Room.findById(room).select('location name').lean()
      : null) as BookingRoomFallback | null;
    const defaultPackage = (!packageId
      ? await Package.findOne().sort({ isPopular: -1, tier: 1 }).select('_id name').lean()
      : null
    ) as BookingPackageFallback | null;
    const fallbackPackage = (!packageId && !defaultPackage
      ? await Package.findOneAndUpdate(
          { slug: 'standard-theatre-booking' },
          {
            $setOnInsert: {
              name: 'Standard Theatre Booking',
              slug: 'standard-theatre-booking',
              tier: 'silver',
              description: 'Default package for theatre-only bookings',
              priceModifier: 0,
              isPopular: false,
            },
          },
          { new: true, upsert: true }
        ).select('_id name').lean()
      : null
    ) as BookingPackageFallback | null;

    location = location || selectedRoom?.location;
    packageId = packageId || defaultPackage?._id || fallbackPackage?._id;

    if (!name || !email || !phone || !room || !date || !timeSlot?.start || !timeSlot?.end) {
      return NextResponse.json(
        { status: 'error', message: 'Please fill in your contact details and select a theatre slot' },
        { status: 400 }
      );
    }

    if (!selectedRoom || !location || !packageId) {
      return NextResponse.json(
        { status: 'error', message: 'Booking setup is incomplete. Please refresh and try again.' },
        { status: 400 }
      );
    }

    const dateString = new Date(date).toISOString().split('T')[0];
    const slot = await AvailabilitySlot.findOne({
      room,
      dateString,
      start: timeSlot.start,
      end: timeSlot.end,
      status: 'available',
    });

    if (!slot) {
      return NextResponse.json(
        { status: 'error', message: 'Selected slot is no longer available' },
        { status: 409 }
      );
    }

    const normalizedSpecialRequests = specialRequests?.trim() || undefined;
    const bookingId = generateBookingId();
    const packageName = payload.packageName || defaultPackage?.name || fallbackPackage?.name || 'Standard Theatre Booking';

    const lead = await Lead.create({
      name,
      email,
      phone,
      occasion,
      location,
      room,
      package: packageId,
      date: new Date(date),
      guests,
      specialRequests: normalizedSpecialRequests,
      status: 'new',
      source: 'booking_wizard',
    });

    const booking = await Booking.create({
      bookingId,
      lead: lead._id,
      location,
      room,
      package: packageId,
      date: new Date(date),
      timeSlot,
      availabilitySlot: slot._id,
      guests,
      addOns: addOns || [],
      totalAmount,
      discountAmount: discountAmount || 0,
      finalAmount,
      paymentStatus: 'pending',
      bookingStatus: 'confirmed',
      customerDetails: {
        name,
        email,
        phone,
      },
      specialRequests: normalizedSpecialRequests,
      emailSent: false,
    });

    await Notification.create({
      type: 'booking',
      title: 'New booking confirmed',
      message: `${name} confirmed booking ${bookingId}`,
      href: '/admin/bookings',
      metadata: {
        bookingId,
        bookingObjectId: booking._id,
        leadId: lead._id,
        amount: finalAmount,
      },
    });

    slot.status = 'booked';
    slot.booking = booking._id;
    await slot.save();

    try {
      const formattedDate = new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      await Promise.all([
        sendBookingConfirmationEmail(email, {
          name,
          bookingId,
          location: payload.locationName || String(location),
          room: payload.roomName || selectedRoom.name || String(room),
          package: packageName,
          date: formattedDate,
          timeSlot: `${timeSlot.start} - ${timeSlot.end}`,
          guests,
          totalAmount: finalAmount,
        }),
        sendAdminNotificationEmail({
          bookingId,
          name,
          email,
          phone,
          location: payload.locationName || String(location),
          room: payload.roomName || selectedRoom.name || String(room),
          package: packageName,
          date: formattedDate,
          guests,
          totalAmount: finalAmount,
        }),
      ]);

      booking.emailSent = true;
      booking.emailSentAt = new Date();
      await booking.save();
    } catch (emailError) {
      console.error('Booking email sending failed:', emailError);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Booking confirmed successfully',
      data: { bookingId, bookingObjectId: booking._id },
    });
  } catch (error) {
    console.error('Initiate booking error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to initiate booking' },
      { status: 500 }
    );
  }
}
