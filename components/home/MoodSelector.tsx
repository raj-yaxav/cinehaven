'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, PartyPopper, Flame, Users, Sparkles, ArrowRight } from 'lucide-react';

const moods = [
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Intimate settings for two',
    icon: Heart,
    gradient: 'from-burgundy/15 to-cream',
    accent: 'text-burgundy',
    borderAccent: 'border-burgundy/20',
    bgAccent: 'bg-burgundy/8',
    iconBg: 'bg-burgundy-bg',
    image: '/images/hero-proposal.png',
    tagline: 'Perfect for proposals & anniversaries',
    glow: 'group-hover:shadow-burgundy-glow',
  },
  {
    id: 'party',
    name: 'Party Vibes',
    description: 'High energy celebrations',
    icon: PartyPopper,
    gradient: 'from-crimson/15 to-cream',
    accent: 'text-crimson',
    borderAccent: 'border-crimson/20',
    bgAccent: 'bg-crimson/8',
    iconBg: 'bg-crimson-muted',
    image: '/images/hero-friends.png',
    tagline: 'Birthdays & friends night out',
    glow: 'group-hover:shadow-crimson-glow',
  },
  {
    id: 'chill',
    name: 'Chill & Cozy',
    description: 'Relaxed intimate moments',
    icon: Flame,
    gradient: 'from-rosegold/15 to-cream',
    accent: 'text-rosegold',
    borderAccent: 'border-rosegold/20',
    bgAccent: 'bg-rosegold/8',
    iconBg: 'bg-rosegold-bg',
    image: '/images/hero-date.png',
    tagline: 'Date nights & low-key hangs',
    glow: 'group-hover:shadow-rosegold-glow',
  },
  {
    id: 'family',
    name: 'Family Fun',
    description: 'All ages welcome',
    icon: Users,
    gradient: 'from-teal/15 to-cream',
    accent: 'text-teal',
    borderAccent: 'border-teal/20',
    bgAccent: 'bg-teal/8',
    iconBg: 'bg-teal-bg',
    image: '/images/hero-anniversary.png',
    tagline: 'Memories for everyone',
    glow: 'group-hover:shadow-teal-glow',
  },
  {
    id: 'epic',
    name: 'Epic Surprise',
    description: 'Grand unforgettable moments',
    icon: Sparkles,
    gradient: 'from-burgundy/20 to-cream',
    accent: 'text-burgundy',
    borderAccent: 'border-burgundy/25',
    bgAccent: 'bg-burgundy/10',
    iconBg: 'bg-burgundy-bg',
    image: '/images/hero-birthday.png',
    tagline: 'Proposals & milestone events',
    glow: 'group-hover:shadow-burgundy-glow',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function MoodSelector() {
  return (
    <section className="relative section-padding bg-cream overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-burgundy/4 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-rosegold/4 blur-[120px]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 15, 42, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(107, 15, 42, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.span
            variants={headerVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-burgundy/15 bg-burgundy-bg px-5 py-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-burgundy" />
            <span className="font-accent text-[11px] uppercase tracking-[0.3em] text-burgundy font-medium">
              Discover
            </span>
          </motion.span>
          
          <motion.h2
            variants={headerVariants}
            className="font-display text-4xl font-bold text-ink md:text-5xl lg:text-6xl text-balance leading-tight"
          >
            Find Your{' '}
            <span className="text-gradient-burgundy">Vibe</span>
          </motion.h2>
          
          <motion.p
            variants={headerVariants}
            className="mx-auto mt-5 max-w-lg text-ink-muted text-base md:text-lg leading-relaxed text-balance"
          >
            Every celebration has a mood. Pick yours and we'll craft the perfect experience.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {moods.map((mood) => (
            <motion.div key={mood.id} variants={itemVariants}>
              <Link href={`/services?mood=${mood.id}`} className="block h-full">
                <div className={`
                  group relative h-[340px] overflow-hidden rounded-card border border-surface-border 
                  bg-gradient-to-b ${mood.gradient} 
                  transition-all duration-500 ease-velvet
                  hover:scale-[1.03] hover:border-burgundy/20 ${mood.glow}
                `}>
                  
                  {/* Background Image with Parallax */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div 
                      className="absolute inset-[-20%] bg-cover bg-center transition-all duration-700 ease-velvet group-hover:scale-110"
                      style={{ backgroundImage: `url(${mood.image})` }}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mood.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-6">
                    
                    {/* Icon */}
                    <motion.div 
                      className={`
                        mb-4 flex h-14 w-14 items-center justify-center rounded-2xl 
                        ${mood.iconBg} border ${mood.borderAccent}
                        transition-all duration-500 group-hover:scale-110 group-hover:shadow-soft
                      `}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <mood.icon className={`h-7 w-7 ${mood.accent} transition-transform duration-300 group-hover:scale-110`} />
                    </motion.div>
                    
                    {/* Text */}
                    <h3 className="font-display text-2xl font-bold text-ink group-hover:text-burgundy transition-colors duration-300">
                      {mood.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink/80 leading-relaxed">
                      {mood.description}
                    </p>
                    
                    {/* Tagline - appears on hover */}
                    <div className="overflow-hidden">
                      <p className={`mt-2 text-xs font-medium ${mood.accent} translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100`}>
                        {mood.tagline}
                      </p>
                    </div>
                    
                    {/* CTA */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink/70 transition-all duration-300 group-hover:text-burgundy group-hover:gap-3">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className={`h-8 w-8 rounded-full ${mood.bgAccent} flex items-center justify-center`}>
                      <ArrowRight className={`h-4 w-4 ${mood.accent}`} />
                    </div>
                  </div>
                  
                  {/* Bottom Glow */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 h-32 
                    bg-gradient-to-t ${mood.gradient} 
                    opacity-0 transition-opacity duration-500 group-hover:opacity-60
                    pointer-events-none
                  `} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-burgundy transition-colors duration-300"
          >
            View all experiences
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}