import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, Sparkles } from 'lucide-react';
import { connectToDatabase } from '../../lib/mongodb';
import Blog from '../../models/Blog';

export const metadata: Metadata = {
  title: 'Blog - CineHaven Private Theatre Ideas',
  description:
    'Celebration ideas, private theatre planning guides, proposal inspiration, and birthday tips from CineHaven.',
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  isFeatured: boolean;
  publishedAt: string;
};

const starterPosts: BlogPost[] = [
  {
    _id: 'birthday-guide',
    title: 'Best Birthday Celebration Ideas for Private Theatre Parties',
    slug: 'best-birthday-celebration-ideas-private-theatre',
    excerpt:
      'Plan a birthday that feels cinematic with decor, cake moments, music, photos, and a private screening made for your group.',
    category: 'Featured story',
    image: '/images/hero-birthday.png',
    readTime: '5 min read',
    isFeatured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'proposal-guide',
    title: 'How to Plan a Private Theatre Proposal Without Stress',
    slug: 'private-theatre-proposal-planning-guide',
    excerpt:
      'A simple sequence for surprise entries, custom videos, lighting, flowers, and the big screen moment.',
    category: 'CineHaven journal',
    image: '/images/hero-proposal.png',
    readTime: '4 min read',
    isFeatured: false,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'friends-night',
    title: 'Unique Date and Friends Night Ideas Beyond Restaurants',
    slug: 'unique-date-friends-night-ideas-private-screening',
    excerpt:
      'Trade the usual dinner plan for a private movie room with snacks, games, karaoke, and a playlist everyone remembers.',
    category: 'CineHaven journal',
    image: '/images/hero-friends.png',
    readTime: '3 min read',
    isFeatured: false,
    publishedAt: new Date().toISOString(),
  },
];

async function getBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ isPublished: true })
      .sort({ isFeatured: -1, publishedAt: -1 })
      .lean<BlogPost[]>();
    return blogs.length ? blogs.map((blog) => ({ ...blog, _id: blog._id.toString() })) : starterPosts;
  } catch {
    return starterPosts;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const featured = blogs.find((blog) => blog.isFeatured) || blogs[0];
  const journal = blogs.filter((blog) => blog.slug !== featured.slug);

  return (
    <main className="min-h-screen bg-midnight text-ivory overflow-hidden pt-28">
      <section className="relative px-6 pb-16 pt-12 lg:px-8">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-sm text-amber mb-6">
              <Sparkles className="h-4 w-4" />
              CineHaven journal
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Our News & Events
            </h1>
            <p className="mt-6 text-lg text-mist leading-8">
              Ideas for birthdays, proposals, anniversaries, private screenings, and small celebrations that deserve a bigger screen.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 overflow-hidden rounded-card border border-black/6 bg-black/[0.015] lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[320px] lg:min-h-[460px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/50 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-sm uppercase tracking-[0.28em] text-amber">{featured.category}</p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight group-hover:text-amber-light transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-mist leading-7">{featured.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-dusty">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-amber" />
                  {new Date(featured.publishedAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber" />
                  {featured.readTime}
                </span>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-amber font-medium">
                Read featured story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journal.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group overflow-hidden rounded-card border border-black/6 bg-black/[0.015] transition-all hover:-translate-y-1 hover:border-amber/30"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber">{blog.category}</p>
                  <h3 className="mt-3 text-xl font-semibold text-ivory group-hover:text-amber-light transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-mist">{blog.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-amber">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
