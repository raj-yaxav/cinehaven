'use client';

import { motion } from 'framer-motion';

const pressLogos = [
  { name: 'The Times of India', abbr: 'TOI' },
  { name: 'India Today', abbr: 'IT' },
  { name: 'Vogue India', abbr: 'Vogue' },
  { name: 'NDTV', abbr: 'NDTV' },
  { name: 'Mumbai Mirror', abbr: 'MM' },
  { name: 'BuzzFeed India', abbr: 'BF' },
  { name: 'Curly Tales', abbr: 'CT' },
  { name: 'LBB', abbr: 'LBB' },
];

export function PressLogos() {
  // Double the array for seamless infinite scroll
  const doubledLogos = [...pressLogos, ...pressLogos];

  return (
    <section className="relative py-16 bg-transparent border-y border-black/4 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 mb-8 lg:px-8">
        <p className="text-center text-sm font-accent uppercase tracking-[0.3em] text-dusty">
          As Featured In
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -50 * pressLogos.length * 4] }}
          transition={{ 
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" }
          }}
          className="flex shrink-0 gap-16 items-center pr-16"
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center px-8 py-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <span className="font-display text-2xl font-bold text-ivory tracking-wider whitespace-nowrap">
                {logo.abbr}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}