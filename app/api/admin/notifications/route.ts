import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../lib/auth';
import Notification from '../../../../models/Notification';

export async function GET() {
  try {
    if (!getAdminFromToken()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20).lean();
    const unreadCount = await Notification.countDocuments({ read: false });

    return NextResponse.json({
      status: 'success',
      data: {
        notifications,
        unreadCount,
      },
    });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    if (!getAdminFromToken()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    await Notification.updateMany({ read: false }, { $set: { read: true } });

    return NextResponse.json({ status: 'success', message: 'Notifications marked as read' });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to update notifications' }, { status: 500 });
  }
}
