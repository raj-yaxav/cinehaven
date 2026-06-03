import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Lead from '../../../models/Lead';

export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ status: 'success', data: leads });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Unable to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();

    const lead = await Lead.create({
      ...payload,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ status: 'success', data: lead });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Unable to create lead' },
      { status: 500 }
    );
  }
}