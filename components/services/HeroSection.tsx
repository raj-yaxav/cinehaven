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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/services-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-midnight/80 to-midnight" />
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-coral/8 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-amber/8 blur-[120px]" />
      </div>

      {/* Floating Icons */}
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-32 pb-20 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber"
        >
          <Sparkles className="h-4 w-4 inline mr-2" />
          Curated Experiences
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl font-bold text-ivory md:text-6xl lg:text-7xl text-balance"
        >
          Crafted for Every{' '}
          <span className="text-gradient-amber">Occasion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-mist text-balance"
        >
          From intimate proposals to wild friends' nights — discover the perfect setting for your celebration.
        </motion.p>

        {/* Quick category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {['Birthday', 'Proposal', 'Anniversary', 'Date Night', 'Friends', 'Corporate'].map((cat, i) => (
            <motion.a
              key={cat}
              href={`#${cat.toLowerCase().replace(' ', '-')}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full border border-black/6 bg-black/3 text-sm text-mist hover:border-amber/30 hover:text-amber hover:bg-amber/5 transition-all"
            >
              {cat}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}