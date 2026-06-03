import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import OTP from '../../../../models/OTP';
import { sendOTPEmail } from '../../../../lib/email';
import crypto from 'crypto';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateBookingId(): string {
  return `CH-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();

    const {
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

    // Validation
    if (!name || !email || !phone || !location || !room || !packageId || !date) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing unverified OTP for this email
    const existingOTP = await OTP.findOne({
      email,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (existingOTP) {
      // Update existing OTP with new booking data
      const newOTP = generateOTP();
      existingOTP.otp = newOTP;
      existingOTP.bookingData = {
        ...payload,
        bookingId: generateBookingId(),
      };
      existingOTP.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      existingOTP.attempts = 0;
      await existingOTP.save();

      await sendOTPEmail(email, newOTP, name);

      return NextResponse.json({
        status: 'success',
        message: 'OTP resent successfully',
        data: { email, expiresIn: 600 },
      });
    }

    // Create new OTP
    const otp = generateOTP();
    const bookingId = generateBookingId();

    const otpRecord = await OTP.create({
      email,
      otp,
      bookingData: {
        ...payload,
        bookingId,
      },
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verified: false,
      attempts: 0,
    });

    await sendOTPEmail(email, otp, name);

    return NextResponse.json({
      status: 'success',
      message: 'OTP sent successfully',
      data: { email, expiresIn: 600 },
    });
  } catch (error) {
    console.error('Initiate booking error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to initiate booking' },
      { status: 500 }
    );
  }
}