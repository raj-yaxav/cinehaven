import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Package from '../../../models/Package';

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await Package.find().sort({ tier: 1 }).lean();
    return NextResponse.json({ status: 'success', data: packages });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch packages' }, { status: 500 });
  }
}
