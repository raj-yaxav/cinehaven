import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Lead from '../../../models/Lead';
import Notification from '../../../models/Notification';
import {
  sendContactAcknowledgementEmail,
  sendContactAdminNotificationEmail,
} from '../../../lib/email';

const BUDGET_RANGES = ['under_10000', '10000_25000', '25000_50000', '50000_plus'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      occasion: rawOccasion,
      budgetRange,
      message: rawMessage,
    } = body;
    const name = typeof rawName === 'string' ? rawName.trim() : '';
    const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
    const phone = typeof rawPhone === 'string' ? rawPhone.trim() : '';
    const occasion = typeof rawOccasion === 'string' ? rawOccasion.trim() : '';
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

    // Validate required fields
    if (!name || !email || !budgetRange || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, budget range, and message are required' },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 2000 || phone.length > 30) {
      return NextResponse.json(
        { status: 'error', message: 'One or more fields exceed the allowed length' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!BUDGET_RANGES.includes(budgetRange)) {
      return NextResponse.json(
        { status: 'error', message: 'Please select a valid budget range' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const lead = await Lead.create({
      name,
      email,
      phone,
      occasion,
      budgetRange,
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
