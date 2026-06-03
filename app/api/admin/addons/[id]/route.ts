import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../../lib/auth';
import AddOn from '../../../../../models/AddOn';

interface Params {
  params: { id: string };
}

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const payload = await request.json();
    const addon = await AddOn.findByIdAndUpdate(params.id, payload, { new: true });
    if (!addon) {
      return NextResponse.json({ status: 'error', message: 'Add-on not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: addon });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to update add-on' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const addon = await AddOn.findByIdAndUpdate(params.id, { isActive: false }, { new: true });
    if (!addon) {
      return NextResponse.json({ status: 'error', message: 'Add-on not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', message: 'Add-on disabled' });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to disable add-on' }, { status: 500 });
  }
}
