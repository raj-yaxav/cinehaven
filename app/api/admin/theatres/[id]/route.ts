import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../../lib/auth';
import Room from '../../../../../models/Room';

function requireAdmin() {
  return Boolean(getAdminFromToken());
}

function normalizeCategories(input) {
  if (!input) return undefined;
  if (Array.isArray(input)) {
    return input.map((c) => String(c).toLowerCase().trim()).filter(Boolean);
  }
  if (typeof input === 'string') {
    return input.split(',').map((c) => c.toLowerCase().trim()).filter(Boolean);
  }
  return undefined;
}

function normalizeStringArray(input) {
  if (!input) return undefined;
  if (Array.isArray(input)) return input.map(String).filter(Boolean);
  if (typeof input === 'string') {
    return input.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return undefined;
}

export async function PATCH(request, { params }) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const payload = await request.json();

    const update = {};

    if (payload.name !== undefined) update.name = payload.name;
    if (payload.description !== undefined) update.description = payload.description;
    if (payload.screenSize !== undefined) update.screenSize = payload.screenSize;
    if (payload.soundSystem !== undefined) update.soundSystem = payload.soundSystem;
    if (payload.basePrice !== undefined) update.basePrice = Number(payload.basePrice);
    if (payload.pricePerExtraPerson !== undefined) {
      update.pricePerExtraPerson = Number(payload.pricePerExtraPerson);
    }
    if (payload.isActive !== undefined) update.isActive = Boolean(payload.isActive);

    if (payload.capacity) {
      update.capacity = {
        min: Number(payload.capacity.min ?? 2),
        max: Number(payload.capacity.max ?? 8),
      };
    } else {
      if (payload.capacityMin !== undefined || payload.capacityMax !== undefined) {
        const existing = await Room.findById(params.id).select('capacity').lean();
        update.capacity = {
          min: Number(payload.capacityMin ?? existing?.capacity?.min ?? 2),
          max: Number(payload.capacityMax ?? existing?.capacity?.max ?? 8),
        };
      }
    }

    // ⭐ Handle categories
    const normalizedCats = normalizeCategories(payload.categories);
    if (normalizedCats) {
      if (normalizedCats.length === 0) {
        return NextResponse.json(
          { status: 'error', message: 'At least one category is required' },
          { status: 400 }
        );
      }
      update.categories = normalizedCats;
    }

    // Handle features + images if present
    const features = normalizeStringArray(payload.features);
    if (features) update.features = features;

    const images = normalizeStringArray(payload.images);
    if (images) update.images = images;

    const room = await Room.findByIdAndUpdate(
      params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!room) {
      return NextResponse.json({ status: 'error', message: 'Theatre not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', data: room });
  } catch (error) {
    console.error('PATCH /api/admin/theatres/[id] error:', error);

    if (error?.name === 'ValidationError') {
      return NextResponse.json(
        { status: 'error', message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: 'error', message: 'Unable to update theatre' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Soft delete: just flip isActive to false (matches your existing delete UI)
    const room = await Room.findByIdAndUpdate(
      params.id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!room) {
      return NextResponse.json({ status: 'error', message: 'Theatre not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', data: room });
  } catch (error) {
    console.error('DELETE /api/admin/theatres/[id] error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Unable to delete theatre' },
      { status: 500 }
    );
  }
}