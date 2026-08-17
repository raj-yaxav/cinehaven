'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CakeSlice, Camera, ConciergeBell, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';

type Occasion = {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  detail: string;
};

const occasions: Occasion[] = [
  { id: 'birthday', number: '01', name: 'Birthday', description: 'Make birthdays unforgettable with magic and joy.', image: '/images/hero-birthday.png', detail: 'From surprise setups to themed decor, we make every birthday a blockbuster memory.' },
  { id: 'date-night', number: '02', name: 'Date Night', description: 'Romantic settings for your perfect night together.', image: '/images/hero-date.png', detail: 'A private screen, warm ambience and thoughtful details made just for two.' },
  { id: 'anniversary', number: '03', name: 'Anniversary', description: 'Celebrate your beautiful journey together.', image: '/images/hero-anniversary.png', detail: 'Relive your favourite memories with a cinematic anniversary experience.' },
  { id: 'proposal', number: '04', name: 'Proposal', description: 'Create the perfect moment to pop the question.', image: '/images/hero-proposal.png', detail: 'A breathtaking private setup designed around the most important question.' },
  { id: 'bride-to-be', number: '05', name: 'Bride to Be', description: 'Celebrate her special journey in style.', image: '/images/mood-party.png', detail: 'Bring the bride squad together for a stylish, joyful private celebration.' },
  { id: 'family', number: '06', name: 'Family Celebration', description: 'Quality time with family in a private, joyful space.', image: '/images/mood-family.png', detail: 'A comfortable private theatre where every generation can celebrate together.' },
];

const benefits = [
  { icon: ShieldCheck, title: '100% Private', text: 'Only you and your loved ones' },
  { icon: WandSparkles, title: 'Customizable Decor', text: 'Set the vibe you imagine' },
  { icon: ConciergeBell, title: 'Food & Beverages', text: 'Delicious food served at your seat' },
  { icon: Camera, title: 'Memories Captured', text: 'Capture moments to cherish forever' },
];

function OccasionCard({ occasion, selected, onSelect, imageRight = false }: { occasion: Occasion; selected: boolean; onSelect: () => void; imageRight?: boolean }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`occasion-shine-card group grid min-h-[190px] w-full cursor-pointer grid-cols-[1fr_0.92fr] overflow-hidden rounded-[22px] border bg-white/90 p-3 text-left shadow-[0_12px_30px_rgba(74,28,78,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(220,38,38,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${selected ? 'is-selected border-red-500 shadow-[0_16px_36px_rgba(220,38,38,0.20)]' : 'border-white'}`}
    >
      <div className={`relative min-h-[166px] overflow-hidden rounded-[17px] ${imageRight ? 'order-2' : ''}`}>
        <Image src={occasion.image} alt={`${occasion.name} celebration`} fill unoptimized sizes="(max-width: 640px) 46vw, (max-width: 1024px) 42vw, 240px" className="object-cover" />
      </div>
      <div className={`flex flex-col justify-center px-5 py-3 ${imageRight ? 'order-1' : ''}`}>
        <span className="text-sm font-bold text-[var(--celebration-primary)]">{occasion.number}</span>
        <h3 className="mt-2 font-display text-[22px] font-bold leading-tight text-[var(--celebration-ink)]">{occasion.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--celebration-muted)]">{occasion.description}</p>
      </div>
    </button>
  );
}

export function MoodSelector() {
  const [selectedId, setSelectedId] = useState('birthday');
  const selected = occasions.find((occasion) => occasion.id === selectedId) ?? occasions[0];
  const left = occasions.slice(0, 3);
  const right = occasions.slice(3);

  return (
    <section className="relative overflow-hidden bg-[#fffdfd] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-[1440px]">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-[var(--celebration-primary)]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--celebration-primary)]" />
            Choose your occasion
            <span className="h-px w-8 bg-gradient-to-r from-[var(--celebration-primary)] to-transparent" />
          </div>
          <h2 className="mt-3 font-display text-5xl font-bold leading-[0.92] tracking-[-0.04em] text-[var(--celebration-ink)] sm:text-6xl lg:text-[72px]">
            What are you<br /><span className="celebrating-shine">celebrating?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-[var(--celebration-muted)]">Every moment is special. Choose your occasion and we&apos;ll help you create memories that last forever.</p>
        </header>

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.55fr_1fr] lg:gap-14">
          <div className="relative z-10 grid gap-5">
            {left.map((occasion) => <OccasionCard key={occasion.id} occasion={occasion} selected={occasion.id === selectedId} onSelect={() => setSelectedId(occasion.id)} />)}
          </div>

          <motion.div key={selected.id} initial={false} animate={{ opacity: 1 }} className="relative z-10 overflow-hidden rounded-t-[220px] rounded-b-[28px] border border-fuchsia-200 bg-white shadow-[0_22px_55px_rgba(86,35,95,0.14)]">
            <div className="relative h-[390px] sm:h-[450px]">
              <Image src={selected.image} alt={`${selected.name} private theatre setup`} fill unoptimized priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 720px" className="object-cover" />
            </div>
            <div className="relative px-7 pb-8 pt-11 text-center sm:px-10">
              <span className="absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[7px] border-white bg-white text-[var(--celebration-primary)] shadow-[0_8px_24px_rgba(144,44,125,0.18)]"><CakeSlice className="h-9 w-9" /></span>
              <h3 className="font-display text-3xl font-bold text-[var(--celebration-ink)]">{selected.name} Celebration</h3>
              <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[var(--celebration-muted)]">{selected.detail}</p>
              <Link href={`/book?occasion=${selected.id}`} className="bg-celebration-gradient mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-8 py-3 font-semibold text-white shadow-[0_12px_25px_var(--celebration-glow)] transition-transform hover:-translate-y-0.5">Plan {selected.name} <ArrowRight className="h-5 w-5" /></Link>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-5">
            {right.map((occasion) => <OccasionCard key={occasion.id} occasion={occasion} selected={occasion.id === selectedId} onSelect={() => setSelectedId(occasion.id)} imageRight />)}
          </div>

          <div className="pointer-events-none absolute left-[24%] right-[24%] top-1/2 hidden -translate-y-1/2 border-t border-dashed border-fuchsia-300/80 lg:block" />
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[28px] border border-fuchsia-100 bg-white/85 shadow-[0_14px_34px_rgba(75,28,80,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 border-fuchsia-100 px-7 py-7 sm:border-r last:border-r-0">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-500"><Icon className="h-7 w-7" /></span>
              <div><h4 className="font-semibold text-[var(--celebration-ink)]">{title}</h4><p className="mt-1 text-sm leading-5 text-[var(--celebration-muted)]">{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
