import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import Admin from '../../../../../models/Admin';
import { getAdminFromToken } from '../../../../../lib/auth';

export async function GET() {
  try {
    const decoded = getAdminFromToken();
    
    if (!decoded) {
      return NextResponse.json(
        { status: 'error', message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { status: 'error', message: 'Admin not found or deactivated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          avatar: admin.avatar,
          lastLogin: admin.lastLogin,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to verify session' },
      { status: 500 }
    );
  }
}