import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Lead from '../../../../models/Lead';
import { getAdminFromToken } from '../../../../lib/auth';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  if (!getAdminFromToken()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const lead = await Lead.findById(params.id).lean();
    if (!lead) {
      return NextResponse.json({ status: 'error', message: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: lead });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch lead' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  if (!getAdminFromToken()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const payload = await request.json();
    const allowedStatuses = ['new', 'contacted', 'closed'];

    if (!allowedStatuses.includes(payload.status)) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid lead status' },
        { status: 400 }
      );
    }

    const lead = await Lead.findByIdAndUpdate(
      params.id,
      { status: payload.status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return NextResponse.json({ status: 'error', message: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: lead });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to update lead' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!getAdminFromToken()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const lead = await Lead.findByIdAndDelete(params.id);
    if (!lead) {
      return NextResponse.json({ status: 'error', message: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', message: 'Lead deleted' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to delete lead' }, { status: 500 });
  }
}
