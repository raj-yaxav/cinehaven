'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Crown, Grid2X2, Heart, Sparkles, Users, Volume2, MonitorPlay, Armchair } from 'lucide-react';

type Room = { id: string; name: string; image: string; price: string; guests: string; idealFor: string; tags: string[]; categories: string[] };

const rooms: Room[] = [
  { id: 'amor', name: 'Amor', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976167/cinehaven/landing-assets/images/hero-date.png', price: '₹1,749', guests: 'Up to 2 Guests', idealFor: 'Ideal for Couples', tags: ['Romantic', 'Cozy', 'Intimate'], categories: ['Romantic'] },
  { id: 'meadow', name: 'Meadow', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976179/cinehaven/landing-assets/images/mood-family.png', price: '₹1,899', guests: 'Up to 6 Guests', idealFor: 'Ideal for Families', tags: ['Family', 'Celebration', 'Vibrant'], categories: ['Family Friendly', 'Large Group'] },
  { id: 'luxe', name: 'Luxe', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976168/cinehaven/landing-assets/images/hero-anniversary.png', price: '₹2,499', guests: 'Up to 10 Guests', idealFor: 'Luxury Experience', tags: ['Luxury', 'Premium', 'Elegant'], categories: ['Premium', 'Large Group'] },
  { id: 'eclipse', name: 'Eclipse', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976173/cinehaven/landing-assets/images/hero-friends.png', price: '₹2,999', guests: 'Up to 12 Guests', idealFor: 'Ideal for Groups', tags: ['Modern', 'Spacious', 'Premium'], categories: ['Premium', 'Large Group'] },
];

const filters = [{ label: 'All Theatres', icon: Grid2X2 }, { label: 'Romantic', icon: Heart }, { label: 'Family Friendly', icon: Users }, { label: 'Premium', icon: Crown }, { label: 'Large Group', icon: Users }];
const benefits = [{ icon: Heart, title: '100% Private', text: 'Only your people, your space.' }, { icon: Volume2, title: 'Premium Sound', text: 'Cinematic sound that immerses you.' }, { icon: MonitorPlay, title: 'Big Screen', text: 'Ultra HD visuals for a larger-than-life feel.' }, { icon: Armchair, title: 'Plush Seating', text: 'Recline, relax and enjoy in total comfort.' }, { icon: Sparkles, title: 'Impeccable Ambience', text: 'Lighting, décor and details that set the mood.' }];

export function FeaturedRooms() {
  const [activeFilter, setActiveFilter] = useState('All Theatres');
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleRooms = useMemo(() => activeFilter === 'All Theatres' ? rooms : rooms.filter((room) => room.categories.includes(activeFilter)), [activeFilter]);
  const scroll = (direction: 'left' | 'right') => scrollRef.current?.scrollBy({ left: direction === 'left' ? -430 : 430, behavior: 'smooth' });

  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976154/cinehaven/landing-assets/landing-page/cards-section/backG.png" alt="" fill priority className="-z-20 object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-white/15" />
      <div className="mx-auto max-w-[1440px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--celebration-primary)] before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current">Signature Experience</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[0.92] tracking-[-0.045em] text-[var(--celebration-ink)] sm:text-5xl lg:text-6xl">Find Your Perfect<br /><span className="celebrating-shine">Private Theatre</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--celebration-muted)]">From cozy hideaways for two to grand cinematic spaces, every Celebrationflix theatre is crafted to make your moments iconic.</p>
        </header>
        <div className="mt-7 flex items-center justify-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setActiveFilter(label)} className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] ${activeFilter === label ? 'bg-celebration-gradient border-transparent text-white shadow-[0_8px_22px_rgba(216,51,168,.28)]' : 'border-fuchsia-100 bg-white/75 text-[var(--celebration-ink)] hover:border-fuchsia-300 hover:bg-white'}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}
          <div className="hidden items-center gap-2 lg:flex"><button type="button" aria-label="Previous theatres" onClick={() => scroll('left')} className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-100 bg-white/85 text-[var(--celebration-primary)]"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next theatres" onClick={() => scroll('right')} className="flex h-10 w-10 items-center justify-center rounded-full bg-celebration-gradient text-white shadow-[0_7px_18px_rgba(216,51,168,.25)]"><ArrowRight className="h-4 w-4" /></button></div>
        </div>
        <div ref={scrollRef} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 hide-scrollbar">
          {visibleRooms.map((room) => <article key={room.id} className="group w-[285px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/90 bg-white/95 p-2 shadow-[0_12px_28px_rgba(91,36,98,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(216,51,168,.2)] sm:w-[320px] lg:w-[calc((100%-48px)/4)]">
            <div className="relative h-40 overflow-hidden rounded-xl sm:h-44"><Image src={room.image} alt={`${room.name} private theatre`} fill unoptimized className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 360px" /><span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-[var(--celebration-primary)]"><Heart className="h-2.5 w-2.5 fill-current" /> Most Loved</span><Heart className="absolute right-3 top-3 h-5 w-5 text-white drop-shadow" /></div>
            <div className="px-2 pb-2 pt-3"><div className="flex items-end justify-between gap-3"><h3 className="font-display text-2xl font-bold text-[var(--celebration-ink)]">{room.name}</h3><div className="text-right"><p className="text-[8px] font-semibold uppercase text-[var(--celebration-muted)]">Starting from</p><strong className="text-base text-[var(--celebration-ink)]">{room.price}</strong></div></div><div className="mt-2 flex items-center gap-3 text-[9px] font-medium text-[var(--celebration-muted)]"><span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{room.guests}</span><span>{room.idealFor}</span></div><div className="mt-3 flex flex-wrap gap-1.5">{room.tags.map((tag) => <span key={tag} className="rounded-full bg-fuchsia-50 px-2 py-1 text-[9px] font-semibold text-fuchsia-600">{tag}</span>)}</div><Link href={`/book?room=${room.id}`} className="mt-3 flex h-9 items-center justify-center gap-2 rounded-lg bg-fuchsia-50 text-[11px] font-bold text-[var(--celebration-primary)] transition hover:bg-celebration-gradient hover:text-white">Explore Theatre <ArrowRight className="h-3.5 w-3.5" /></Link></div>
          </article>)}
        </div>
        <div className="mt-7 grid overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_12px_28px_rgba(91,36,98,.09)] sm:grid-cols-2 lg:grid-cols-5">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3 border-b border-fuchsia-100/80 px-5 py-5 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-500"><Icon className="h-5 w-5" /></span><div><h3 className="text-xs font-bold text-[var(--celebration-ink)]">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[var(--celebration-muted)]">{text}</p></div></div>)}</div>
      </div>
    </section>
  );
}
