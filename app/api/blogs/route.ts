import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { getAdminFromToken } from '../../../lib/auth';
import Blog from '../../../models/Blog';

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get('admin') === 'true' && Boolean(getAdminFromToken());
    const slug = searchParams.get('slug');
    const query: Record<string, unknown> = includeDrafts ? {} : { isPublished: true };

    if (slug) {
      const blog = await Blog.findOne({ ...query, slug }).lean();
      if (!blog) {
        return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ status: 'success', data: blog });
    }

    const blogs = await Blog.find(query).sort({ isFeatured: -1, publishedAt: -1 }).lean();
    return NextResponse.json({ status: 'success', data: blogs });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Unable to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = getAdminFromToken();
    if (!admin) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const payload = await request.json();
    const slug = makeSlug(payload.slug || payload.title || '');

    if (!payload.title || !slug || !payload.excerpt || !payload.content) {
      return NextResponse.json(
        { status: 'error', message: 'Title, slug, excerpt, and content are required' },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title: payload.title,
      slug,
      excerpt: payload.excerpt,
      content: payload.content,
      category: payload.category || 'CineHaven journal',
      image: payload.image || '/images/hero-birthday.png',
      readTime: payload.readTime || '4 min read',
      isFeatured: Boolean(payload.isFeatured),
      isPublished: payload.isPublished !== false,
      authorName: payload.authorName || 'CineHaven Team',
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : new Date(),
    });

    return NextResponse.json({ status: 'success', data: blog }, { status: 201 });
  } catch (error: any) {
    const message = error?.code === 11000 ? 'A blog with this slug already exists' : 'Unable to create blog';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
