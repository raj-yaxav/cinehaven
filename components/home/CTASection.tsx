'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mauve via-velvet to-midnight" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-amber/10 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/8 blur-[120px]" />
      <div className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-sage/5 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          {/* Floating sparkles */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-8 left-1/4"
          >
            <Sparkles className="h-8 w-8 text-amber/40" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -15, 15, 0], y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -top-4 right-1/4"
          >
            <Sparkles className="h-6 w-6 text-coral/30" />
          </motion.div>

          <span className="mb-6 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber">
            Your Turn
          </span>
          
          <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl text-balance">
            Ready to Create Your{' '}
            <span className="text-gradient-amber">Premiere?</span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-lg text-mist text-balance">
            Join thousands of couples and friend groups who turned ordinary moments into extraordinary memories.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 overflow-hidden rounded-button bg-gradient-to-r from-amber to-amber-dark px-8 py-4 text-base font-bold text-midnight transition-all hover:shadow-burgundy-glow-lg"
              >
                <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                Book Your Celebration
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-button border border-black/6 bg-black/3 px-8 py-4 text-base font-medium text-ivory transition hover:border-amber/40 hover:text-amber"
              >
                Talk to an Expert
              </Link>
            </motion.div>
          </div>

          {/* Trust badges — Redesigned with new colors */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-dusty">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sage" />
              Instant Confirmation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sage" />
              Free Cancellation 24h Before
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sage" />
              Secure Payment
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}