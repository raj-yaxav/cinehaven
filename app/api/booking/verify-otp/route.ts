import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import OTP from '../../../../models/OTP';

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

    const otpRecord = await OTP.findOne({
      email,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { status: 'error', message: 'OTP expired or not found. Please request a new one.' },
        { status: 400 }
      );
    }

    if (otpRecord.attempts >= 3) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { status: 'error', message: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return NextResponse.json(
        {
          status: 'error',
          message: `Invalid OTP. ${3 - otpRecord.attempts} attempts remaining.`,
        },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return NextResponse.json({
      status: 'success',
      message: 'OTP verified successfully',
      data: {
        bookingData: otpRecord.bookingData,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}