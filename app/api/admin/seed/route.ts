import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';

export async function POST(request: Request) {
  try {
    const { secretKey } = await request.json();
    const seedSecret = process.env.ADMIN_SEED_SECRET;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!seedSecret || secretKey !== seedSecret) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!adminEmail || !adminPassword || adminPassword.length < 12) {
      return NextResponse.json(
        { status: 'error', message: 'Secure admin seed credentials are not configured' },
        { status: 503 }
      );
    }

    await connectToDatabase();

    const adminData = {
      name: 'Super Admin',
      email: adminEmail.toLowerCase(),
      password: adminPassword,
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
