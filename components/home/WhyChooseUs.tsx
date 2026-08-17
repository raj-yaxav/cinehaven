'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CakeSlice, Camera, Crown, Flower2, Heart, Music2, ShieldCheck, Smile, Sparkles, UtensilsCrossed, Users, WandSparkles } from 'lucide-react';

const experiences = [
  { title: 'Custom Décor', text: 'Themes that match your occasion & personality.', image: '/images/hero-birthday.png', icon: Sparkles },
  { title: 'Cakes & Desserts', text: 'Delicious cakes made for your special moments.', image: '/images/hero-date.png', icon: CakeSlice },
  { title: 'Flowers', text: 'Elegant floral arrangements to set the perfect vibe.', image: '/images/hero-anniversary.png', icon: Flower2 },
  { title: 'Food & Beverages', text: 'Tasty bites & beverages served at your seat.', image: '/images/hero-proposal.png', icon: UtensilsCrossed, featured: true },
  { title: 'Fog Entry', text: 'Grand entrances that create unforgettable first impressions.', image: '/images/mood-party.png', icon: WandSparkles },
  { title: 'Photoshoot', text: 'Capture every emotion with our professional setup.', image: '/images/hero-corporate.png', icon: Camera },
  { title: 'Karaoke & More', text: 'Sing, play & celebrate your way.', image: '/images/hero-friends.png', icon: Music2 },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Celebrations Hosted', sub: 'Across all locations' },
  { icon: Smile, value: '100%', label: 'Happiness Guaranteed', sub: 'Memories that last forever' },
  { icon: ShieldCheck, value: '100%', label: 'Private & Secure', sub: 'Your privacy is our priority' },
  { icon: Crown, value: '4.9/5', label: 'Customer Rating', sub: '5000+ happy reviews' },
];

export function WhyChooseUs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => scrollRef.current?.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });

  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Image src="/landing-page/celebrationExperience/experienceBG.png" alt="" fill priority className="-z-20 object-cover" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-white/10" />
      <div className="mx-auto max-w-[1440px]">
        <header className="relative mx-auto max-w-4xl text-center">
          <div className="absolute left-0 top-20 hidden rounded-3xl border border-white/80 bg-white/70 px-6 py-4 text-left shadow-[0_12px_28px_rgba(173,58,139,.12)] lg:block"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-500"><ShieldCheck className="h-6 w-6" /></span><div><strong className="block text-xl text-[var(--celebration-ink)]">100%</strong><span className="text-xs font-medium text-[var(--celebration-ink)]">Private & Secure</span></div></div><p className="mt-1 text-[10px] text-[var(--celebration-muted)]">Your space. Your moment.</p></div>
          <div className="absolute right-0 top-20 hidden rounded-3xl border border-white/80 bg-white/70 px-6 py-4 text-left shadow-[0_12px_28px_rgba(173,58,139,.12)] lg:block"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-violet-500"><Crown className="h-6 w-6" /></span><div><strong className="block text-xl text-[var(--celebration-ink)]">4.9/5</strong><span className="text-xs font-medium text-[var(--celebration-ink)]">Loved by Customers</span></div></div><p className="mt-1 text-[10px] text-[var(--celebration-muted)]">5000+ reviews</p></div>
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--celebration-primary)] before:h-px before:w-10 before:bg-current after:h-px after:w-10 after:bg-current">More than just a movie</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[0.9] tracking-[-0.045em] text-[var(--celebration-ink)] sm:text-5xl lg:text-6xl">A Complete Celebration<br /><span className="celebrating-shine">Experience</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--celebration-muted)] sm:text-lg">We take care of every little detail so you can focus on<br className="hidden sm:block" /> <span className="font-display text-2xl italic text-[var(--celebration-primary)]">making memories.</span></p>
        </header>

        <div className="relative mt-12">
          <button aria-label="Previous experiences" type="button" onClick={() => scroll('left')} className="absolute left-0 top-[35%] z-10 -translate-x-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--celebration-primary)] shadow-lg transition hover:scale-105 lg:flex"><ArrowLeft className="h-5 w-5" /></button>
          <div ref={scrollRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 hide-scrollbar">
            {experiences.map(({ title, text, image, icon: Icon, featured }) => <article key={title} className={`group w-[225px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-2 shadow-[0_12px_28px_rgba(122,34,109,.13)] transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:ring-2 hover:ring-violet-400/70 hover:ring-offset-2 hover:ring-offset-white/50 hover:shadow-[0_18px_38px_rgba(124,58,237,.28)] sm:w-[250px] ${featured ? 'ring-2 ring-fuchsia-300 shadow-[0_16px_38px_rgba(219,46,161,.28)]' : ''}`}>
              <div className="relative h-48 overflow-hidden rounded-xl sm:h-52"><Image src={image} alt={title} fill unoptimized className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 225px, 250px" />{featured && <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--celebration-primary)] shadow"><Heart className="mr-1 inline h-3 w-3 fill-current" />Most Loved</span>}</div>
              <div className="relative px-3 pb-4 pt-8 text-center"><span className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white text-fuchsia-500 shadow-[0_8px_20px_rgba(203,50,169,.22)]"><Icon className="h-6 w-6" /></span><h3 className="font-display text-xl font-bold text-[var(--celebration-ink)]">{title}</h3><p className="mt-2 min-h-[42px] text-xs leading-[1.4] text-[var(--celebration-muted)]">{text}</p><Link href="/add-ons" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--celebration-primary)] transition hover:gap-2">Explore <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </article>)}
          </div>
          <button aria-label="Next experiences" type="button" onClick={() => scroll('right')} className="absolute right-0 top-[35%] z-10 translate-x-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--celebration-primary)] shadow-lg transition hover:scale-105 lg:flex"><ArrowRight className="h-5 w-5" /></button>
        </div>
        <div className="mt-7 flex justify-center gap-2" aria-hidden="true">{[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? 'bg-[var(--celebration-primary)]' : 'bg-fuchsia-200'}`} />)}</div>
        <div className="mt-8 grid overflow-hidden rounded-[28px] border border-white/90 bg-white/75 shadow-[0_14px_34px_rgba(113,39,104,.11)] sm:grid-cols-2 lg:grid-cols-[1.25fr_repeat(4,1fr)]">
          <div className="border-b border-fuchsia-100 px-6 py-6 lg:border-b-0 lg:border-r"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-celebration-gradient text-white"><Sparkles className="h-5 w-5" /></span><div><strong className="font-display text-lg text-[var(--celebration-ink)]">CELEBRATION<span className="text-[var(--celebration-primary)]">FLIX</span></strong><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--celebration-muted)]">Private Theatres</p></div></div><p className="mt-3 font-display text-lg italic text-[var(--celebration-primary)]">You celebrate, we create the magic.</p></div>
          {stats.map(({ icon: Icon, value, label, sub }) => <div key={label} className="flex gap-3 border-b border-fuchsia-100 px-6 py-6 last:border-b-0 sm:odd:border-l lg:border-b-0 lg:border-l"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-500"><Icon className="h-5 w-5" /></span><div><strong className="text-lg text-[var(--celebration-primary)]">{value}</strong><p className="text-xs font-bold text-[var(--celebration-ink)]">{label}</p><p className="mt-1 text-[10px] text-[var(--celebration-muted)]">{sub}</p></div></div>)}
        </div>
        <p className="mt-9 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--celebration-primary)]">You celebrate, we create the magic</p>
      </div>
    </section>
  );
}
