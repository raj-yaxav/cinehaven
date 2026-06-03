import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Lead from '../../../models/Lead';
import Notification from '../../../models/Notification';
import {
  sendContactAcknowledgementEmail,
  sendContactAdminNotificationEmail,
} from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, occasion, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email format' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const lead = await Lead.create({
      name,
      email,
      phone,
      occasion,
      specialRequests: message,
      notes: message,
      source: 'contact_page',
      status: 'new',
    });

    await Notification.create({
      type: 'contact',
      title: 'New contact inquiry',
      message: `${name} asked about ${occasion || 'a celebration'}`,
      href: '/admin/leads',
      metadata: {
        leadId: lead._id,
        name,
        email,
        phone,
        occasion,
      },
    });

    try {
      await Promise.all([
        sendContactAcknowledgementEmail({ name, email, phone, occasion, message }),
        sendContactAdminNotificationEmail({ name, email, phone, occasion, message }),
      ]);
    } catch (emailError) {
      console.error('Contact email sending failed:', emailError);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Thank you for your message! We will get back to you within 2 hours.',
      data: { leadId: lead._id },
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'CineHaven Contact API',
    endpoints: {
      POST: '/api/contact - Submit contact form',
    },
  });
}
