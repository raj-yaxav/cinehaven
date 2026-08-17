'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, PlayCircle, ShieldCheck, Sparkles, Star, UsersRound, Volume2, WandSparkles, UtensilsCrossed } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, label: '100% Private' },
  { icon: Volume2, label: 'Premium Sound' },
  { icon: WandSparkles, label: 'Custom Decor' },
  { icon: UtensilsCrossed, label: 'Delicious Food' },
];

const STATS = [
  { icon: UsersRound, value: '50K+', label: 'Happy Customers' },
  { icon: PlayCircle, value: '1000+', label: 'Private Celebrations' },
  { icon: MapPin, value: '25+', label: 'Locations' },
  { icon: Star, value: '4.9/5', label: 'Customer Rating' },
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[var(--celebration-theatre)] pt-[82px] sm:min-h-[100svh]">
      <Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976159/cinehaven/landing-assets/landing-page/hero-section/hero-back2.png" alt="CelebrationFlix private theatre" fill priority sizes="100vw" className="-translate-y-2 object-cover object-center" />

      <div className="hero-prop-clapper hero-float-a pointer-events-none absolute left-[5%] top-[16%] z-10 hidden w-[19vw] max-w-[300px] lg:block"><Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976157/cinehaven/landing-assets/landing-page/hero-section/action-clipboard.png" alt="" width={500} height={500} priority /></div>
      <div className="hero-prop-popcorn hero-float-b pointer-events-none absolute bottom-[14%] left-[3%] z-10 hidden w-[20vw] max-w-[320px] lg:block"><Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976160/cinehaven/landing-assets/landing-page/hero-section/popcorn.png" alt="" width={500} height={500} priority /></div>
      <div className="hero-prop-balloon hero-float-c pointer-events-none absolute right-[1%] top-[11%] z-10 hidden w-[24vw] max-w-[380px] lg:block"><Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976158/cinehaven/landing-assets/landing-page/hero-section/balloon.png" alt="" width={500} height={700} priority /></div>
      <div className="hero-prop-ticket hero-float-d pointer-events-none absolute bottom-[13%] right-[-2%] z-10 hidden w-[24vw] max-w-[370px] lg:block"><Image src="https://res.cloudinary.com/dq3typk9u/image/upload/v1786976161/cinehaven/landing-assets/landing-page/hero-section/ticket.png" alt="" width={500} height={280} priority /></div>

      <div className="celebration-hero-content relative z-20 mx-auto flex max-w-[1909px] flex-col items-center px-4 pb-10 pt-40 sm:px-6 sm:pt-24 lg:px-16 lg:pt-12">
        <div className="celebration-hero-copy mt-2 w-full max-w-[1000px] px-5 pb-2 pt-8 text-center sm:px-12 sm:pb-2 sm:pt-10 lg:mt-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--celebration-ink)] sm:text-sm">
            <Sparkles className="h-4 w-4 text-[var(--celebration-violet)]" aria-hidden="true" />
            India&apos;s most loved private theatre
            <Sparkles className="h-4 w-4 text-[var(--celebration-violet)]" aria-hidden="true" />
          </div>
          <h1 className="celebration-hero-heading mx-auto mt-4 max-w-5xl text-[clamp(2.25rem,4.1vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.055em] text-[var(--celebration-ink)]">
            Your <span className="text-[var(--celebration-primary)]">Celebration.</span><br />
            Your <span className="text-[var(--celebration-violet)]">Private Theatre.</span><br />
            Your <span className="text-[var(--celebration-primary)]">Moment.</span>
          </h1>
          <p className="celebration-hero-tagline mt-3 font-display text-xl italic text-[var(--celebration-violet)] sm:text-[28px]">Memories that stay forever</p>
          <p className="celebration-hero-description mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--celebration-ink)] sm:text-[22px] sm:leading-9">
            Celebrate birthdays, anniversaries, date nights and life&apos;s special moments in your own private theatre with stunning setups, delicious food and unforgettable memories.
          </p>
          <div className="celebration-hero-actions mt-5 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/book" className="bg-celebration-gradient inline-flex min-h-[62px] items-center justify-center gap-2 rounded-xl px-7 py-3 text-base font-semibold text-white shadow-[0_12px_24px_var(--celebration-glow)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] focus-visible:ring-offset-2">
              <CalendarDays className="h-5 w-5" /> Book Your Celebration <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/services" className="inline-flex min-h-[62px] items-center justify-center gap-2 rounded-xl border border-[var(--celebration-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--celebration-ink)] transition-colors duration-200 hover:bg-[var(--celebration-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] focus-visible:ring-offset-2">
              <PlayCircle className="h-6 w-6 text-[var(--celebration-ink)]" /> Explore Theatres
            </Link>
          </div>
        </div>

        <div className="celebration-feature-bar mt-[22px] grid w-full max-w-[1025px] grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-[var(--celebration-feature-surface)]/90 text-white shadow-[0_12px_28px_rgba(15,5,20,0.35)] backdrop-blur-md sm:grid-cols-4">
          {FEATURES.map(({ icon: Icon, label }) => <div key={label} className="flex items-center justify-center gap-3 border-white/15 px-3 py-5 text-base font-semibold sm:border-r last:sm:border-r-0"><Icon className="h-6 w-6 text-fuchsia-400" />{label}</div>)}
        </div>

        <div className="celebration-stats-bar mt-[70px] grid w-full max-w-[1338px] grid-cols-2 overflow-hidden rounded-2xl border border-white/70 bg-white/90 text-[var(--celebration-ink)] shadow-[0_16px_36px_rgba(31,12,37,0.25)] backdrop-blur-md sm:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => <div key={label} className="flex items-center justify-center gap-4 border-[var(--celebration-border)] px-3 py-5 sm:border-r last:sm:border-r-0 sm:py-[22px]"><Icon className="h-10 w-10 shrink-0 text-[var(--celebration-primary)]" /><div><p className="text-3xl font-bold leading-none">{value}</p><p className="mt-2 text-sm font-medium text-[var(--celebration-muted)]">{label}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
