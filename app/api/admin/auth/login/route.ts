import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Admin from '../../../../../models/Admin';
import { generateToken, setAdminCookie } from '../../../../../lib/auth';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { status: 'error', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (admin.isLocked()) {
      return NextResponse.json(
        { status: 'error', message: 'Account is temporarily locked. Try again later.' },
        { status: 403 }
      );
    }

    // Check if account is active
    if (!admin.isActive) {
      return NextResponse.json(
        { status: 'error', message: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await admin.comparePassword(password);

    if (!isValid) {
      admin.loginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (admin.loginAttempts >= 5) {
        admin.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      }
      
      await admin.save();

      return NextResponse.json(
        { status: 'error', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    // Set cookie
    setAdminCookie(token);

    return NextResponse.json({
      status: 'success',
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          avatar: admin.avatar,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Login failed' },
      { status: 500 }
    );
  }
}