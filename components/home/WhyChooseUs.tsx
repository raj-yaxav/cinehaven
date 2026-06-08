'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Sparkles,
  ShieldCheck,
  HeadphonesIcon,
  Wand2,
  Star,
  Clock,
  Cake,
  ArrowUpRight,
  Heart,
  Zap,
  Gem,
} from 'lucide-react';

const reasons = [
  {
    icon: Wand2,
    title: 'Curated Experiences',
    desc: 'Every celebration is uniquely designed with custom decor, lighting, and ambiance tailored to your occasion. No two events are ever the same.',
    stat: '500+',
    statLabel: 'Custom setups',
    color: 'from-burgundy to-burgundy-light',
    bgColor: 'bg-burgundy/[0.06]',
    borderColor: 'border-burgundy/15',
    accentColor: 'text-burgundy',
  },
  {
    icon: ShieldCheck,
    title: 'Hassle-Free Booking',
    desc: 'Book in under 2 minutes. Our team handles setup, catering, and clean-up so you can focus entirely on celebrating.',
    stat: '2 min',
    statLabel: 'Average booking',
    color: 'from-sage to-sage-light',
    bgColor: 'bg-sage/[0.06]',
    borderColor: 'border-sage/15',
    accentColor: 'text-sage-dark',
  },
  {
    icon: HeadphonesIcon,
    title: 'Premium AV Setup',
    desc: 'Dolby Atmos sound, 4K projection, and professional-grade lighting for a true cinematic experience at home.',
    stat: '4K',
    statLabel: 'Ultra HD projection',
    color: 'from-teal to-teal-light',
    bgColor: 'bg-teal/[0.06]',
    borderColor: 'border-teal/15',
    accentColor: 'text-teal',
  },
  {
    icon: Star,
    title: '5-Star Service',
    desc: 'Rated 4.9 by 12,000+ guests. Our dedicated hosts ensure every moment is flawless from start to finish.',
    stat: '4.9',
    statLabel: 'Average rating',
    color: 'from-amber to-amber-light',
    bgColor: 'bg-amber/[0.06]',
    borderColor: 'border-amber/15',
    accentColor: 'text-amber-dark',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    desc: 'Open daily 10AM–11PM. Early morning or late night slots available for your convenience, any day of the week.',
    stat: '13 hrs',
    statLabel: 'Daily availability',
    color: 'from-rosegold to-rosegold-light',
    bgColor: 'bg-rosegold/[0.06]',
    borderColor: 'border-rosegold/15',
    accentColor: 'text-rosegold',
  },
  {
    icon: Cake,
    title: 'All Occasions Welcome',
    desc: 'Birthdays, proposals, anniversaries, corporate events — we bring equal passion and precision to every celebration.',
    stat: '50+',
    statLabel: 'Event types',
    color: 'from-crimson to-crimson-light',
    bgColor: 'bg-crimson/[0.06]',
    borderColor: 'border-crimson/15',
    accentColor: 'text-crimson',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ item, index }: { item: typeof reasons[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative h-full p-6 sm:p-7 lg:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 hover:border-burgundy/10 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(139,21,56,0.08)] overflow-hidden">
        
        {/* Background gradient blob on hover */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-700`} />
        
        {/* Top accent line */}
        <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-burgundy/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Number badge */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
          <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-ink-light/30 font-semibold">
            0{index + 1}
          </span>
        </div>

        {/* Icon */}
        <div className="relative mb-6">
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-burgundy/10 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
            <item.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          {/* Glow effect behind icon */}
          <div className={`absolute inset-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-bold text-ink mb-3 group-hover:text-burgundy transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-sm sm:text-[15px] text-ink-secondary leading-[1.75] mb-6">
          {item.desc}
        </p>

        {/* Stat + CTA row */}
        <div className="flex items-center justify-between pt-5 border-t border-surface-border/30">
          <div>
            <p className={`text-xl sm:text-2xl font-bold ${item.accentColor}`}>{item.stat}</p>
            <p className="text-[10px] sm:text-xs text-ink-light uppercase tracking-wider font-medium mt-0.5">{item.statLabel}</p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-xs font-semibold text-ink-light/50 group-hover:text-burgundy transition-colors duration-300 cursor-pointer"
          >
            <span className="hidden sm:inline">Learn more</span>
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] rounded-full bg-burgundy/[0.02] blur-[150px]" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-rosegold/[0.02] blur-[120px]" />
      <div className="absolute top-1/3 left-[8%] w-2 h-2 rounded-full bg-burgundy/15" />
      <div className="absolute bottom-1/3 right-[12%] w-1.5 h-1.5 rounded-full bg-rosegold/20" />
      <div className="absolute top-1/4 right-[20%] w-1 h-1 rounded-full bg-amber/30" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-18 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-burgundy/[0.08] border border-burgundy/15 text-burgundy text-sm font-accent font-medium tracking-wide mb-6 sm:mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Why CineHaven
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
            Designed to Make Your{' '}
            <span className="relative inline-block">
              <span className="text-burgundy">
                Moments Unforgettable
              </span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C75 2 225 2 298 8" stroke="url(#grad2)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B1538" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C75B7A" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="mt-5 sm:mt-6 text-ink-secondary max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From the moment you walk in, every detail is crafted to deliver an experience you&apos;ll cherish forever. Here&apos;s what sets us apart.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-5 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 sm:mt-18 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
            <div className="flex -space-x-3">
              {['RS', 'SJ', 'AN', 'PM', 'VA'].map((initials, i) => (
                <div
                  key={initials}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm ${
                    i === 0 ? 'bg-burgundy' :
                    i === 1 ? 'bg-teal' :
                    i === 2 ? 'bg-rosegold' :
                    i === 3 ? 'bg-amber' :
                    'bg-sage'
                  }`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-ink">Join 12,000+ happy guests</p>
              <p className="text-xs text-ink-muted mt-0.5">Start planning your perfect celebration today</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl bg-gradient-burgundy text-white text-sm font-semibold shadow-lg shadow-burgundy/20 hover:shadow-burgundy-glow transition-all whitespace-nowrap"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}