import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../models/Location';

export async function GET() {
  try {
    await connectToDatabase();
    const locations = await Location.find({ isActive: true }).sort({ name: 1 }).lean();
    return NextResponse.json({ status: 'success', data: locations });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch locations' }, { status: 500 });
  }
}
