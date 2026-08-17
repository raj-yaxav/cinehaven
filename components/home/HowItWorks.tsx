'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, CakeSlice, CreditCard, Headphones, MapPin, PartyPopper, ShieldCheck, SlidersHorizontal, Star, Store, Theater, Trophy, WandSparkles } from 'lucide-react';

const steps = [
  { number: '1', title: <>Choose Your<br /><em>Occasion</em></>, text: 'Tell us what you’re celebrating and pick your perfect vibe.', image: '/images/hero-birthday.png', icon: CakeSlice },
  { number: '2', title: <>Select Your<br /><em>Location</em></>, text: 'Choose from our premium private theatres near you.', image: '/images/hero-home.png', icon: MapPin },
  { number: '3', title: <>Pick Your<br /><em>Theatre</em></>, text: 'Explore themes, capacity, amenities and choose the perfect setting.', image: '/images/hero-proposal.png', icon: Theater },
  { number: '4', title: <>Customize Your<br /><em>Experience</em></>, text: 'Add decor, food, cake, balloons, music & more to make it yours.', image: '/images/hero-birthday.png', icon: SlidersHorizontal },
  { number: '5', title: <>Confirm &<br /><em>Pay Securely</em></>, text: 'Review your booking details and pay securely in just a few clicks.', image: '/images/my-booking.png', icon: CreditCard },
  { number: '6', title: <>Show Up &<br /><em>Celebrate!</em></>, text: 'We’ll take care of the rest. You just show up and create unforgettable memories.', image: '/images/mood-party.png', icon: PartyPopper },
];

const benefits = [
  { icon: ShieldCheck, title: '100% Private', text: 'Your celebration, your space.' },
  { icon: Star, title: 'Hassle-Free', text: 'We handle everything, you enjoy the moment.' },
  { icon: Headphones, title: '24/7 Support', text: 'We’re here for you, always.' },
  { icon: Trophy, title: 'Best Experience', text: 'Premium theatres, unmatched service.' },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_20%,rgba(255,186,223,.36),transparent_22%),radial-gradient(circle_at_92%_78%,rgba(194,161,255,.28),transparent_22%),linear-gradient(135deg,#fffafe_0%,#fff5fb_52%,#faf7ff_100%)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1480px]">
        <header className="text-center"><p className="font-display text-2xl italic text-[var(--celebration-primary)]">♥ Simple Steps, Extraordinary Moments ♥</p><h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-0.055em] text-[var(--celebration-ink)] sm:text-5xl lg:text-6xl">How <span className="celebrating-shine inline-block">Celebrationflix</span> Works</h2><p className="mt-3 text-sm text-[var(--celebration-muted)] sm:text-base">From booking to memories — we make your celebration <strong className="text-[var(--celebration-primary)]">seamless, special</strong> and stress-free.</p></header>
        <div className="relative mt-12">
          <div className="how-works-rail pointer-events-none absolute left-0 right-0 top-0 hidden h-1 rounded-full lg:block" />
          <div className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-5 hide-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
          {steps.map(({ number, title, text, image, icon: Icon }) => <article key={number} className="relative min-w-[220px] snap-start rounded-2xl border border-white/70 bg-white/90 p-2 pt-7 text-center shadow-[0_12px_28px_rgba(243,47,184,.2)] transition duration-300 hover:-translate-y-1 hover:border-violet-400 hover:ring-2 hover:ring-violet-400/65 hover:shadow-[0_18px_34px_rgba(161,67,238,.34)] lg:min-w-0"><span className="absolute left-1/2 top-0 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-celebration-gradient text-lg font-black text-white shadow-[0_6px_18px_rgba(238,41,145,.55)]">{number}</span><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#160d25] text-fuchsia-400"><Icon className="h-6 w-6" /></span><h3 className="mt-3 text-sm font-black uppercase leading-5 text-[var(--celebration-ink)]">{title}</h3><p className="mt-2 min-h-[52px] px-2 text-[11px] leading-4 text-[var(--celebration-muted)]">{text}</p><div className="relative mt-3 h-36 overflow-hidden rounded-xl"><Image src={image} alt="" fill unoptimized className="object-cover" sizes="(max-width: 1024px) 220px, 240px" /></div></article>)}
          </div>
        </div>
        <div className="mt-3 grid overflow-hidden rounded-2xl border border-fuchsia-200/80 bg-white/88 shadow-[0_10px_30px_rgba(234,60,191,.22)] sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.5fr]">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3 border-b border-fuchsia-100 px-5 py-5 last:border-b-0 sm:odd:border-l lg:border-b-0 lg:border-l"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-500"><Icon className="h-5 w-5" /></span><div><h3 className="text-xs font-bold text-[var(--celebration-ink)]">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[var(--celebration-muted)]">{text}</p></div></div>)}<Link href="/book" className="bg-celebration-gradient flex min-h-[72px] items-center justify-center gap-3 px-5 text-sm font-bold text-white transition hover:brightness-110"><CalendarDays className="h-5 w-5" />Book Your Celebration Now <ArrowRight className="h-5 w-5" /></Link></div>
      </div>
    </section>
  );
}
