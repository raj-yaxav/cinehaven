import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../lib/auth';
import AddOn from '../../../../models/AddOn';

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

export async function GET() {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const addons = await AddOn.find().sort({ category: 1, name: 1 }).lean();
    return NextResponse.json({ status: 'success', data: addons });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch add-ons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const payload = await request.json();
    const addon = await AddOn.create({
      name: payload.name,
      category: payload.category,
      description: payload.description,
      images: payload.images || [],
      price: Number(payload.price || 0),
      options: payload.options || [],
      isActive: payload.isActive !== false,
    });
    return NextResponse.json({ status: 'success', data: addon }, { status: 201 });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Unable to create add-on' }, { status: 500 });
  }
}
