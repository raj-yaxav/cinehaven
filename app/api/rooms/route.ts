import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Room from '../../../models/Room';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const location = url.searchParams.get('location');
    const query: Record<string, any> = { isActive: true };
    if (location) {
      query.location = location;
    }
    let rooms = await Room.find(query).sort({ basePrice: 1 }).lean();

    // Ensure backward-compat: some older documents may not have `categories` set.
    rooms = rooms.map((r) => ({
      ...r,
      categories: Array.isArray(r.categories) && r.categories.length > 0 ? r.categories : ['birthday'],
    }));

    return NextResponse.json({ status: 'success', data: rooms });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch rooms' }, { status: 500 });
  }
}
