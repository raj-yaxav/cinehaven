import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import OTP from '../../../../models/OTP';
import { sendOTPEmail } from '../../../../lib/email';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Email is required' },
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
        { status: 'error', message: 'No active OTP found. Please start booking again.' },
        { status: 400 }
      );
    }

    // Check rate limit (max 3 resends)
    const resendCount = otpRecord.get('resendCount') || 0;
    if (resendCount >= 3) {
      return NextResponse.json(
        { status: 'error', message: 'Maximum resend limit reached. Please start a new booking.' },
        { status: 429 }
      );
    }

    // Generate new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    otpRecord.otp = newOTP;
    otpRecord.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    otpRecord.attempts = 0;
    otpRecord.set('resendCount', resendCount + 1);
    await otpRecord.save();

    await sendOTPEmail(email, newOTP, otpRecord.bookingData.name);

    return NextResponse.json({
      status: 'success',
      message: 'OTP resent successfully',
      data: { email, expiresIn: 600 },
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to resend OTP' },
      { status: 500 }
    );
  }
}