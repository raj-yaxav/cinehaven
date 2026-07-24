import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Lead from '../../../models/Lead';
import { getAdminFromToken } from '../../../lib/auth';

export async function GET() {
  if (!getAdminFromToken()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    const normalizedLeads = leads.map((lead) => ({
      ...lead,
      status: lead.status === 'converted' || lead.status === 'lost' ? 'closed' : lead.status,
    }));
    return NextResponse.json({ status: 'success', data: normalizedLeads });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Unable to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  void request;
  return NextResponse.json(
    { status: 'error', message: 'Submit new enquiries through /api/contact' },
    { status: 405, headers: { Allow: 'GET' } }
  );
}
