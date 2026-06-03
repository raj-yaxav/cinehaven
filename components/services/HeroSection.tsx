'use client';

import { motion } from 'framer-motion';
import { Sparkles, Camera, Heart, PartyPopper } from 'lucide-react';

const floatingIcons = [
  { Icon: Heart, x: '10%', y: '20%', color: 'text-coral/30', size: 40, delay: 0 },
  { Icon: PartyPopper, x: '85%', y: '15%', color: 'text-amber/30', size: 35, delay: 1 },
  { Icon: Camera, x: '75%', y: '75%', color: 'text-sage/30', size: 30, delay: 2 },
  { Icon: Sparkles, x: '15%', y: '70%', color: 'text-amber/20', size: 45, delay: 3 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 sm:opacity-30"
          style={{ backgroundImage: 'url(/images/services-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-midnight/80 to-midnight" />
        <div className="absolute top-0 left-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-coral/8 blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] rounded-full bg-amber/8 blur-[80px] sm:blur-[120px]" />
      </div>

      {/* Floating Icons - Desktop Only */}
      {floatingIcons.map(({ Icon, x, y, color, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
          }}
        >
          <Icon className={color} style={{ width: size, height: size }} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-1.5 font-accent text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Curated Experiences
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-5xl font-bold text-ivory md:text-6xl lg:text-7xl text-balance leading-tight"
        >
          Crafted for Every{' '}
          <span className="text-gradient-amber">Occasion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-4 sm:mt-6 max-w-xl sm:max-w-2xl text-sm sm:text-lg text-mist text-balance px-2 sm:px-0 leading-relaxed"
        >
          From intimate proposals to wild friends' nights — discover the perfect setting for your celebration.
        </motion.p>

        {/* Quick category pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-0"
        >
          {['Birthday', 'Proposal', 'Anniversary', 'Date Night', 'Friends', 'Corporate'].map((cat) => (
            <motion.a
              key={cat}
              href={`#${cat.toLowerCase().replace(' ', '-')}`}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-black/6 bg-black/3 text-xs sm:text-sm text-mist sm:hover:border-amber/30 sm:hover:text-amber sm:hover:bg-amber/5 transition-all"
            >
              {cat}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}