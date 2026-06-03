import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { getAdminFromToken } from '../../../../lib/auth';
import Blog from '../../../../models/Blog';

interface Params {
  params: { id: string };
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    const update = {
      ...payload,
      ...(payload.slug ? { slug: makeSlug(payload.slug) } : {}),
      ...(payload.publishedAt ? { publishedAt: new Date(payload.publishedAt) } : {}),
    };

    const blog = await Blog.findByIdAndUpdate(params.id, update, { new: true });
    if (!blog) {
      return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', data: blog });
  } catch (error: any) {
    const message = error?.code === 11000 ? 'A blog with this slug already exists' : 'Unable to update blog';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    if (!requireAdmin()) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', message: 'Blog deleted' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to delete blog' }, { status: 500 });
  }
}
