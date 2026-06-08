import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { connectToDatabase } from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

type Params = {
  params: { slug: string };
};

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  authorName: string;
  publishedAt: string;
};

const starterPosts: BlogPost[] = [
  {
    title: 'Best Birthday Celebration Ideas for Private Theatre Parties',
    slug: 'best-birthday-celebration-ideas-private-theatre',
    excerpt:
      'Plan a birthday that feels cinematic with decor, cake moments, music, photos, and a private screening made for your group.',
    content:
      'A private theatre birthday works best when the celebration has a simple flow: arrival, surprise reveal, cake moment, screening, photos, and a relaxed finish.\n\nStart with the guest list and the mood. A couple celebration can stay soft and romantic, while a friends party can use brighter decor, games, karaoke, and a high-energy playlist.\n\nUse the big screen for the personal part. A short video, photo slideshow, or custom birthday message makes the room feel made for one person, not just decorated for an event.\n\nKeep food and add-ons practical. Cake, snacks, beverages, and photography usually create more value than overloading the setup with too many props.',
    category: 'Featured story',
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png',
    readTime: '5 min read',
    authorName: 'CineHaven Team',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'How to Plan a Private Theatre Proposal Without Stress',
    slug: 'private-theatre-proposal-planning-guide',
    excerpt:
      'A simple sequence for surprise entries, custom videos, lighting, flowers, and the big screen moment.',
    content:
      'The best proposal plans feel effortless because the timing is clear before the day starts.\n\nChoose the exact reveal moment first. It could be a custom video, a song cue, a message on the screen, or a walk-in surprise after the lights dim.\n\nKeep the setup personal. Flowers, candles, soft lighting, and a private screening room are enough when the message is specific to your story.\n\nShare the plan with the venue team in advance. The right cue sheet helps everyone know when to play the video, bring the cake, adjust lights, and give you privacy.',
    category: 'CineHaven journal',
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913959/cinehaven/hero-proposal.png',
    readTime: '4 min read',
    authorName: 'CineHaven Team',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Unique Date and Friends Night Ideas Beyond Restaurants',
    slug: 'unique-date-friends-night-ideas-private-screening',
    excerpt:
      'Trade the usual dinner plan for a private movie room with snacks, games, karaoke, and a playlist everyone remembers.',
    content:
      'A private screening night gives you the comfort of a lounge and the drama of a cinema without the crowd.\n\nFor couples, keep the plan intimate: a favorite film, a memory slideshow, snacks, and a cozy decor theme.\n\nFor friends, make the night interactive. Add karaoke, console gaming, a comedy watch party, or a playlist battle before the movie starts.\n\nThe best part is control. You choose the people, the screen, the soundtrack, and the pace of the celebration.',
    category: 'CineHaven journal',
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913957/cinehaven/hero-friends.png',
    readTime: '3 min read',
    authorName: 'CineHaven Team',
    publishedAt: new Date().toISOString(),
  },
];

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug, isPublished: true }).lean<BlogPost>();
    return blog || starterPosts.find((post) => post.slug === slug) || null;
  } catch {
    return starterPosts.find((post) => post.slug === slug) || null;
  }
}

function renderInline(text: string) {
  const parts = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      parts.push(
        <a key={`${match.index}-link`} href={match[3]} className="text-amber underline decoration-amber/40 underline-offset-4 hover:text-amber-light">
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      parts.push(
        <strong key={`${match.index}-bold`} className="font-semibold text-ivory">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      parts.push(
        <em key={`${match.index}-italic`} className="text-ivory">
          {match[5]}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderBlock(line: string) {
  const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    return (
      <div key={line} className="relative my-8 aspect-[16/9] overflow-hidden rounded-card border border-black/6">
        <Image src={imageMatch[2]} alt={imageMatch[1]} fill className="object-cover" />
      </div>
    );
  }

  if (line.startsWith('### ')) {
    return (
      <h3 key={line} className="pt-4 text-2xl font-semibold text-ivory">
        {renderInline(line.slice(4))}
      </h3>
    );
  }

  if (line.startsWith('## ')) {
    return (
      <h2 key={line} className="pt-6 font-display text-3xl font-bold text-ivory">
        {renderInline(line.slice(3))}
      </h2>
    );
  }

  if (line.startsWith('- ')) {
    return (
      <ul key={line} className="list-disc pl-6">
        <li>{renderInline(line.slice(2))}</li>
      </ul>
    );
  }

  if (/^\d+\.\s/.test(line)) {
    return (
      <ol key={line} className="list-decimal pl-6">
        <li>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
      </ol>
    );
  }

  if (line.startsWith('> ')) {
    return (
      <blockquote key={line} className="border-l-2 border-amber pl-5 text-ivory">
        {renderInline(line.slice(2))}
      </blockquote>
    );
  }

  return <p key={line}>{renderInline(line)}</p>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  if (!blog) {
    return { title: 'Blog not found - CineHaven' };
  }
  return {
    title: `${blog.title} - CineHaven Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const blog = await getBlog(params.slug);
  if (!blog) {
    notFound();
  }

  const paragraphs = blog.content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-midnight text-ivory pt-28">
      <article>
        <header className="px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-amber hover:text-amber-light">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
            <p className="mt-8 text-sm uppercase tracking-[0.28em] text-amber">{blog.category}</p>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">{blog.title}</h1>
            <p className="mt-6 text-lg leading-8 text-mist">{blog.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-dusty">
              <span>{blog.authorName}</span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-amber" />
                {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="relative aspect-[16/8] overflow-hidden rounded-card border border-black/6">
              <Image src={blog.image} alt={blog.title} fill priority className="object-cover" />
            </div>
          </div>
        </div>

        <section className="px-6 py-14 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-8 text-mist">
            {paragraphs.map((paragraph) => renderBlock(paragraph))}
          </div>
        </section>
      </article>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-card border border-amber/20 bg-amber/10 p-8 text-center">
          <h2 className="font-display text-3xl font-bold">Ready to create your own story?</h2>
          <p className="mt-3 text-mist">Book a private theatre celebration and make the next blog-worthy moment yours.</p>
          <Link href="/book" className="btn-primary mt-6 inline-flex">
            Book now
          </Link>
        </div>
      </section>
    </main>
  );
}
