'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, HeadphonesIcon, Wand2, Star, Clock, Film, Cake } from 'lucide-react';

const reasons = [
  {
    icon: Wand2,
    title: 'Curated Experiences',
    desc: 'Every celebration is uniquely designed with custom decor, lighting, and ambiance tailored to your occasion.',
  },
  {
    icon: ShieldCheck,
    title: 'Hassle-Free Booking',
    desc: 'Book in under 2 minutes. Our team handles setup, catering, and clean-up so you can focus on celebrating.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Premium AV Setup',
    desc: 'Dolby Atmos sound, 4K projection, and professional-grade lighting for a true cinematic experience.',
  },
  {
    icon: Star,
    title: '5-Star Service',
    desc: 'Rated 4.9 by 12,000+ guests. Our dedicated hosts ensure every moment is flawless.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    desc: 'Open daily 10AM–11PM. Early morning or late night slots available for your convenience.',
  },
  {
    icon: Cake,
    title: 'All Occasions Welcome',
    desc: 'Birthdays, proposals, anniversaries, corporate events — we do it all with equal passion.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-cream-warm section-padding">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-burgundy/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rosegold/[0.03] blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 lg:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/10 border border-burgundy/15 text-burgundy text-sm font-accent font-medium tracking-wide mb-5">
            <Sparkles className="h-4 w-4" />
            Why CineHaven
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Designed to Make Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy to-burgundy-light">
              Moments Unforgettable
            </span>
          </h2>
          <p className="mt-4 text-ink-secondary max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From the moment you walk in, every detail is crafted to deliver an experience you&apos;ll cherish forever.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group p-6 sm:p-8 rounded-2xl bg-white border border-surface-border/60 hover:border-burgundy/15 transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-burgundy text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
