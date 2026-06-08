import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../lib/auth';
import Location from '../../../../models/Location';
import Room from '../../../../models/Room';

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Coerce input into a clean string array
function normalizeCategories(input: unknown): string[] {
  if (!input) return ['birthday'];
  if (Array.isArray(input)) {
    return input
      .map((c) => String(c).toLowerCase().trim())
      .filter((c) => c.length > 0);
  }
  if (typeof input === 'string') {
    // Accept "birthday,anniversary" OR a single value
    return input
      .split(',')
      .map((c) => c.toLowerCase().trim())
      .filter((c) => c.length > 0);
  }
  return ['birthday'];
}

function normalizeStringArray(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(String).filter(Boolean);
  if (typeof input === 'string') {
    return input.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export async function GET() {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const location = (await Location.findOne({ city: 'Delhi' }).lean()) as
      | { _id?: unknown }
      | null;
    const query: Record<string, unknown> = { isActive: true };
    if (location?._id) query.location = location._id;

    const rooms = await Room.find(query)
      .populate('location', 'name city')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ status: 'success', data: { location, theatres: rooms } });
  } catch (err) {
    console.error('GET /api/admin/theatres error:', err);
    return NextResponse.json({ status: 'error', message: 'Unable to fetch theatres' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const payload = await request.json();
console.log('📥 API received payload:', JSON.stringify(payload, null, 2));

    console.log('📥 categories type:', Array.isArray(payload.categories), payload.categories);

    
    if (!payload.name) {
      return NextResponse.json(
        { status: 'error', message: 'Theatre name is required' },
        { status: 400 }
      );
    }

    // Resolve / create the Delhi location
    let location = await Location.findOne({ city: 'Delhi' });
    if (!location) {
      location = await Location.create({
        name: 'CineHaven Delhi',
        city: 'Delhi',
        state: 'Delhi',
        address: payload.address || 'Delhi, India',
        coordinates: [77.209, 28.6139],
        description: 'CineHaven private theatre experiences in Delhi.',
        amenities: ['Parking', 'WiFi', 'AC', 'Private Lounge'],
        images: ['https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png'],
        isActive: true,
      });
    }

    // ⭐ Normalize categories — handles string, array, undefined, etc.
    const categories = normalizeCategories(payload.categories);
    if (categories.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'At least one category is required' },
        { status: 400 }
      );
    }

    const features = normalizeStringArray(payload.features);
    const images = normalizeStringArray(payload.images);
    if (images.length === 0) images.push('https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png');

    const room = await Room.create({
      location: location._id,
      name: payload.name,
      slug: slugify(payload.slug || payload.name),
      description: payload.description || '',
      images,
      capacity: {
        min: Number(payload.capacity?.min ?? payload.capacityMin ?? 2),
        max: Number(payload.capacity?.max ?? payload.capacityMax ?? 8),
      },
      screenSize: payload.screenSize || 'Large 4K Screen',
      soundSystem: payload.soundSystem || 'Premium Dolby Sound',
      features,
      categories, // ⭐ Now properly typed in schema
      basePrice: Number(payload.basePrice || 0),
      pricePerExtraPerson: Number(payload.pricePerExtraPerson || 0),
      isActive: payload.isActive !== false,
    });

    await Location.findByIdAndUpdate(location._id, { $addToSet: { rooms: room._id } });

    return NextResponse.json({ status: 'success', data: room }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/admin/theatres error:', error);

    const err = error as { code?: number; name?: string; message?: string };
    if (err.code === 11000) {
      return NextResponse.json(
        { status: 'error', message: 'A theatre with this slug already exists' },
        { status: 409 }
      );
    }

    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { status: 'error', message: err.message ?? 'Validation error' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: 'error', message: 'Unable to create theatre' },
      { status: 500 }
    );
  }
}