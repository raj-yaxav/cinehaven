import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';

export async function POST(request: Request) {
  try {
    // Only allow in development or with secret key
    const { secretKey } = await request.json();
    if (secretKey !== process.env.ADMIN_SEED_SECRET && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const adminData = {
      name: 'Super Admin',
      email: 'admin@cinehaven.com',
      password: 'CineHaven@2024',
      role: 'super_admin',
      isActive: true,
      loginAttempts: 0,
      lockUntil: undefined,
    };

    // Create or reset default admin. Assigning password and saving triggers
    // the Admin model pre-save hook, so the password is hashed correctly.
    let admin = await Admin.findOne({ email: adminData.email });
    let message = 'Admin created successfully';

    if (admin) {
      admin.name = adminData.name;
      admin.password = adminData.password;
      admin.role = adminData.role;
      admin.isActive = adminData.isActive;
      admin.loginAttempts = adminData.loginAttempts;
      admin.lockUntil = adminData.lockUntil;
      await admin.save();
      message = 'Admin reset successfully';
    } else {
      admin = await Admin.create(adminData);
    }

    return NextResponse.json({
      status: 'success',
      message,
      data: {
        email: admin.email,
        password: 'CineHaven@2024', // Only shown once
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
