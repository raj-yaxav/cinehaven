import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import AddOn from '../../../models/AddOn';

export async function GET() {
  try {
    await connectToDatabase();
    const addons = await AddOn.find({ isActive: true }).sort({ name: 1 }).lean();
    return NextResponse.json({ status: 'success', data: addons });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch add-ons' }, { status: 500 });
  }
}
