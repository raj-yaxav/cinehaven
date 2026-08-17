'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clapperboard, Heart, PlaySquare, Quote, Star, Users } from 'lucide-react';

const testimonials = [
  { name: 'Ananya Sharma', initials: 'AS', gradient: 'from-rose-300 to-pink-600', text: 'Celebrationflix made my birthday super special! The private theatre was stunning and the experience was magical.' },
  { name: 'Rohan Mehta', initials: 'RM', gradient: 'from-violet-500 to-fuchsia-600', text: 'Best place to celebrate with friends! Loved the privacy, cozy setup and the premium movie experience.', featured: true },
  { name: 'Priya Nair', initials: 'PN', gradient: 'from-orange-300 to-rose-500', text: 'A perfect spot for anniversaries. The ambience and service were top-notch. Highly recommended!' },
  { name: 'Aarav Kapoor', initials: 'AK', gradient: 'from-sky-400 to-indigo-500', text: 'Everything was beautifully managed from the welcome to the final surprise. We will be back soon.' },
];

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Guests' },
  { icon: Clapperboard, value: '1.2K+', label: 'Private Theatres' },
  { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
  { icon: Star, value: '4.9/5', label: 'Avg. Rating' },
];

export function Testimonials() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(1);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setCurrent((value) => (value + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);
  const next = () => { setDirection(1); setCurrent((value) => (value + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length); };
  const displayed = [-1, 0, 1].map((offset) => testimonials[(current + offset + testimonials.length) % testimonials.length]);

  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Image src="/landing-page/testimonials/celebration-couple-background-v2.png" alt="" fill priority className="-z-20 object-cover object-[68%_center]" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,247,252,.96)_0%,rgba(255,247,252,.83)_47%,rgba(37,9,45,.10)_100%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <header className="max-w-2xl text-center lg:text-left">
          <p className="inline-flex items-center gap-3 font-display text-xl italic text-violet-600 before:h-px before:w-12 before:bg-fuchsia-300 after:h-px after:w-12 after:bg-fuchsia-300">♥ Loved by People Who ♥</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.055em] text-[var(--celebration-ink)] sm:text-5xl lg:text-6xl"><span className="celebrating-shine inline-block">Celebrate</span> Big</h2>
          <p className="mt-3 text-lg text-[var(--celebration-ink)]">Real stories. Real smiles. Unforgettable celebration moments.</p>
        </header>
        <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => <div key={label} className="rounded-2xl border border-white/90 bg-white/70 px-3 py-4 text-center shadow-[0_10px_24px_rgba(185,58,143,.12)] backdrop-blur-sm"><Icon className="mx-auto h-7 w-7 text-[var(--celebration-primary)]" /><strong className="mt-2 block text-2xl text-[var(--celebration-ink)]">{value}</strong><span className="text-xs font-medium text-[var(--celebration-muted)]">{label}</span></div>)}
        </div>
        <div className="relative mt-14 flex items-center gap-4 lg:mt-16">
          <button type="button" aria-label="Previous testimonials" onClick={prev} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-white/90 text-[var(--celebration-primary)] shadow-lg transition hover:scale-105 lg:flex"><ArrowLeft className="h-5 w-5" /></button>
          <AnimatePresence mode="wait" initial={false}><motion.div key={current} initial={{ opacity: 0, x: direction * 42 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -42 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="grid flex-1 gap-4 md:grid-cols-3">{displayed.map((testimonial, index) => <article key={`${testimonial.name}-${index}`} className={`rounded-[25px] border bg-white/90 p-6 shadow-[0_16px_34px_rgba(92,30,95,.16)] backdrop-blur-sm transition duration-300 ${index === 1 ? 'border-fuchsia-400 ring-2 ring-fuchsia-300/60 shadow-[0_18px_40px_rgba(223,38,167,.30)] md:-translate-y-2' : 'hidden border-white/90 md:block'}`}><div className="flex items-center gap-3"><span className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} border-2 border-fuchsia-200 text-sm font-black text-white`}>{testimonial.initials}</span><div><h3 className="text-lg font-bold text-[var(--celebration-ink)]">{testimonial.name}</h3><div className="mt-1 flex gap-0.5">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div></div></div><Quote className="mt-5 h-7 w-7 text-fuchsia-400" /><p className="mt-2 text-base italic leading-7 text-[var(--celebration-ink)]">{testimonial.text}</p></article>)}</motion.div></AnimatePresence>
          <button type="button" aria-label="Next testimonials" onClick={next} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-white/90 text-[var(--celebration-primary)] shadow-lg transition hover:scale-105 lg:flex"><ArrowRight className="h-5 w-5" /></button>
        </div>
        <div className="mt-7 flex justify-center gap-2">{testimonials.map((testimonial, index) => <button key={testimonial.name} aria-label={`Show ${testimonial.name}'s testimonial`} onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }} className={`h-2.5 rounded-full transition-all ${index === current ? 'w-6 bg-[var(--celebration-primary)]' : 'w-2.5 bg-fuchsia-200'}`} />)}</div>
        <Link href="/book" className="bg-celebration-gradient mx-auto mt-9 flex max-w-4xl items-center justify-center gap-4 rounded-full px-6 py-5 text-center text-lg font-bold text-white shadow-[0_14px_30px_rgba(163,33,214,.34)] transition hover:-translate-y-0.5"><Heart className="h-6 w-6" />Join 50,000+ Happy Celebrations <span className="hidden h-7 w-px bg-white/40 sm:block" /> <span className="hidden sm:inline">Create Your Special Moment Today</span> <ArrowRight className="h-6 w-6" /></Link>
      </div>
    </section>
  );
}
