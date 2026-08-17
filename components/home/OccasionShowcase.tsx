'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, CalendarDays, CakeSlice, CircleEllipsis, Gem, GraduationCap, HeartHandshake, Sparkles, Users, UtensilsCrossed, Volume2, PlayCircle, ArrowRight } from 'lucide-react';

type Occasion = { id: string; label: string; icon: typeof CakeSlice; image: string; eyebrow: string };

const occasions: Occasion[] = [
  { id: 'birthday', label: 'Birthday', icon: CakeSlice, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976164/cinehaven/landing-assets/images/hero-birthday.png', eyebrow: 'Happy Birthday' },
  { id: 'anniversary', label: 'Anniversary', icon: HeartHandshake, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976168/cinehaven/landing-assets/images/hero-anniversary.png', eyebrow: 'Celebrate Together' },
  { id: 'proposal', label: 'Proposal', icon: Gem, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976171/cinehaven/landing-assets/images/hero-proposal.png', eyebrow: 'A Perfect Yes' },
  { id: 'friends', label: 'Friends & Reunion', icon: Users, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976173/cinehaven/landing-assets/images/hero-friends.png', eyebrow: 'Make It Memorable' },
  { id: 'graduation', label: 'Graduation', icon: GraduationCap, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976175/cinehaven/landing-assets/images/hero-corporate.png', eyebrow: 'Celebrate Success' },
  { id: 'corporate', label: 'Corporate Events', icon: BriefcaseBusiness, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976175/cinehaven/landing-assets/images/hero-corporate.png', eyebrow: 'Celebrate Together' },
  { id: 'more', label: 'And More', icon: CircleEllipsis, image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976178/cinehaven/landing-assets/images/mood-party.png', eyebrow: 'Make It Yours' },
];

const baseDetailCards = [
  { title: 'Custom Decor', description: 'Themes that match your vibe perfectly.', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976171/cinehaven/landing-assets/images/hero-proposal.png', icon: Sparkles },
  { title: 'Delicious Food', description: 'Handpicked menus for every taste.', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976167/cinehaven/landing-assets/images/hero-date.png', icon: UtensilsCrossed },
  { title: 'Premium Experience', description: 'Top-notch sound, screen & ultimate comfort.', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976175/cinehaven/landing-assets/images/hero-corporate.png', icon: Volume2 },
  { title: 'Personal Touch', description: 'Add-ons that make it uniquely yours.', image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1786976178/cinehaven/landing-assets/images/mood-party.png', icon: PlayCircle },
];

export function OccasionShowcase() {
  const [activeId, setActiveId] = useState('birthday');
  const active = occasions.find((occasion) => occasion.id === activeId) ?? occasions[0];
  const detailCards = baseDetailCards.map((card, index) => ({
    ...card,
    image: index === 0 ? active.image : card.image,
    description: index === 0 ? `Décor styled especially for your ${active.label.toLowerCase()} celebration.` : card.description,
  }));

  return (
    <section className="bg-[#fff9fc] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1450px] rounded-[32px] border border-fuchsia-100 bg-[radial-gradient(circle_at_16%_20%,rgba(255,197,223,.48),transparent_24%),radial-gradient(circle_at_86%_82%,rgba(202,165,255,.28),transparent_24%),linear-gradient(135deg,#fffefd_0%,#fff8fc_48%,#fbf4ff_100%)] px-5 py-9 shadow-[0_18px_48px_rgba(106,37,98,.12)] sm:px-8 lg:px-12 lg:py-12">
        <header className="text-center">
          <p className="inline-flex items-center gap-3 text-sm font-bold text-[var(--celebration-primary)] before:h-px before:w-20 before:bg-fuchsia-200 after:h-px after:w-20 after:bg-fuchsia-200"><Sparkles className="h-3.5 w-3.5" /> Tailored For Every Occasion <Sparkles className="h-3.5 w-3.5" /></p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.055em] text-[var(--celebration-ink)] sm:text-5xl lg:text-6xl">Your <span className="celebrating-shine inline-block">Celebration</span>, Your <span className="text-violet-600">Way</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--celebration-muted)] sm:text-lg">From birthdays to proposals, anniversaries to corporate events —<br className="hidden sm:block" /> we have the perfect setting to make your moments unforgettable.</p>
        </header>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {occasions.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveId(id)} className={`relative flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] ${activeId === id ? 'border-fuchsia-400 bg-white text-[var(--celebration-primary)] shadow-[0_10px_22px_rgba(223,43,151,.16)]' : 'border-white bg-white/70 text-[var(--celebration-ink)] hover:border-violet-300 hover:bg-white'}`}><Icon className="h-6 w-6" strokeWidth={1.7} /><span className="text-xs font-bold leading-tight">{label}</span>{activeId === id && <span className="absolute -bottom-1 h-1 w-14 rounded-full bg-[var(--celebration-primary)]" />}</button>)}
        </div>
        <div className="mt-9 grid overflow-hidden rounded-[28px] bg-[linear-gradient(125deg,#150d20,#21102c_55%,#151519)] p-3 shadow-[0_22px_42px_rgba(44,15,57,.30)] lg:grid-cols-[.94fr_1.06fr] lg:p-6">
          <div className="relative min-h-[330px] overflow-hidden rounded-[22px] lg:min-h-[470px]"><Image key={active.id} src={active.image} alt={`${active.label} celebration`} fill unoptimized className="object-cover" sizes="(max-width: 1024px) 100vw, 680px" /><div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" /><span className="absolute bottom-5 left-5 rounded-full bg-black/35 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">{active.eyebrow}</span></div>
          <div className="flex flex-col px-3 py-6 text-white sm:px-7 lg:py-3"><p className="font-display text-3xl italic text-fuchsia-400">You imagine it,</p><h3 className="mt-1 text-3xl font-black uppercase leading-tight sm:text-4xl">We set the <span className="text-fuchsia-400">stage.</span></h3><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{detailCards.map(({ title, description, image, icon: Icon }) => <div key={title} className="group grid grid-cols-[118px_1fr] gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2 transition hover:border-fuchsia-300/60 hover:bg-white/[0.07]"><div className="relative aspect-[16/10] overflow-hidden rounded-lg"><Image src={image} alt={title} fill unoptimized className="object-cover transition duration-300 group-hover:scale-105" sizes="118px" /></div><div className="flex min-w-0 flex-col justify-center"><h4 className="text-sm font-bold sm:text-base">{title}</h4><p className="mt-1 text-xs leading-4 text-white/75">{description}</p><Icon className="mt-2 h-4 w-4 text-fuchsia-400" /></div></div>)}</div><Link href={`/book?occasion=${active.id}`} className="bg-celebration-gradient mt-7 flex min-h-14 items-center justify-center gap-3 rounded-2xl px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(218,38,166,.35)] transition hover:-translate-y-0.5"> <CalendarDays className="h-5 w-5" /> Plan Your Celebration Now <ArrowRight className="h-5 w-5" /></Link></div>
        </div>
      </div>
    </section>
  );
}
