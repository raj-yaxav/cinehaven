/**
 * HeroSection — Minimal Premium Layout
 * Clean typography-focused design with subtle glass accents
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Star, 
  MapPin, 
  Calendar,
  Heart,
  Users,
  Gem
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Birthday', icon: '🎂', color: 'from-rose-500/20 to-orange-400/10', desc: '2,400+ hosted' },
  { name: 'Proposal', icon: '💍', color: 'from-pink-500/20 to-rose-300/10', desc: '890+ moments' },
  { name: 'Anniversary', icon: '🥂', color: 'from-amber-500/15 to-yellow-300/10', desc: '1,200+ stories' },
  { name: 'Date Night', icon: '🌹', color: 'from-purple-500/15 to-pink-300/10', desc: '3,100+ evenings' },
  { name: 'Friends', icon: '🎉', color: 'from-blue-500/15 to-cyan-300/10', desc: '4,500+ laughs' },
  { name: 'Corporate', icon: '💼', color: 'from-slate-500/15 to-gray-300/10', desc: '670+ events' },
];

const HIGHLIGHTS = [
  { icon: MapPin, label: '15 Premium Venues', sub: 'Across India' },
  { icon: Star, label: '4.9/5 Rating', sub: '50,000+ Reviews' },
  { icon: Users, label: '12,847+ Guests', sub: 'Celebrated With Us' },
  { icon: Gem, label: '98% Satisfaction', sub: 'Happy Memories' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-cream overflow-hidden">
      
      {/* Soft Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-burgundy/[0.04] blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-rosegold/[0.04] blur-[100px]" />
      
      {/* Very Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 15, 42, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(107, 15, 42, 0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
        
        {/* ========== TOP SECTION: Main Hero Content ========== */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-burgundy/15 bg-white/60 backdrop-blur-md px-5 py-2.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-burgundy" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-burgundy font-semibold">
                India's Premier Private Theatre
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-bold text-ink leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
          >
            Your Moment,
            <br />
            <span className="text-gradient-burgundy">The Big Screen</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-ink-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Private cinemas crafted for proposals, birthdays, anniversaries & celebrations 
            that deserve to be remembered forever.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/book"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-burgundy text-white font-bold text-sm uppercase tracking-wider overflow-hidden shadow-burgundy-glow hover:shadow-burgundy-glow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="h-4 w-4" />
              Book Your Experience
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-ink/10 bg-white/50 backdrop-blur-md text-ink-secondary text-sm font-medium hover:border-burgundy/30 hover:bg-white/80 transition-all duration-300 w-full sm:w-auto"
            >
              <Play className="h-4 w-4 fill-ink-secondary" />
              Watch Our Film
            </Link>
          </motion.div>

        </div>

        {/* ========== MIDDLE: Trust Highlights Bar ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 sm:mt-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {HIGHLIGHTS.map((item) => (
              <div 
                key={item.label}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/70 hover:border-burgundy/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-burgundy/10 flex items-center justify-center group-hover:bg-burgundy/20 transition-colors">
                  <item.icon className="h-5 w-5 text-burgundy" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{item.label}</p>
                  <p className="text-[10px] text-ink-muted uppercase tracking-wider">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========== BOTTOM: Occasion Cards ========== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 sm:mt-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink-muted font-medium">
              Perfect For Every Occasion
            </p>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link href={`/book?occasion=${cat.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="group relative p-5 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/60 hover:border-burgundy/20 hover:shadow-lg hover:shadow-burgundy/5 transition-all duration-300 cursor-pointer text-center">
                    
                    {/* Gradient Background Blob */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <span className="text-3xl mb-3 block">{cat.icon}</span>
                      <h3 className="text-sm font-bold text-ink group-hover:text-burgundy transition-colors">{cat.name}</h3>
                      <p className="text-[10px] text-ink-muted mt-1">{cat.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x snap-mandatory px-1">
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex-shrink-0 w-32 snap-start"
              >
                <Link href={`/book?occasion=${cat.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="group relative p-4 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40 active:bg-white/60 transition-all text-center">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-50`} />
                    <div className="relative z-10">
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <h3 className="text-xs font-bold text-ink">{cat.name}</h3>
                      <p className="text-[9px] text-ink-muted mt-0.5">{cat.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== BOTTOM: Single Hero Image (Optional, Subtle) ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 sm:mt-16 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/30 bg-white/20 backdrop-blur-sm shadow-2xl shadow-black/5">
            {/* Gradient overlay instead of heavy image */}
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/10 via-rosegold/5 to-cream" />
            
            {/* Optional: Uncomment if you want ONE hero image */}
            {/* <Image
              src="/images/hero-birthday.png"
              alt="Private Theatre Experience"
              width={1200}
              height={500}
              className="w-full h-48 sm:h-72 md:h-80 object-cover opacity-40"
              priority
            /> */}
            
            {/* Content over the visual area */}
            <div className="relative z-10 py-12 sm:py-16 px-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 mb-4">
                <Calendar className="h-4 w-4 text-burgundy" />
                <span className="text-xs font-medium text-burgundy">Book 7 Days in Advance</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mb-2">
                Ready to Create Your Memory?
              </h3>
              <p className="text-sm text-ink-muted max-w-md mx-auto mb-6">
                From intimate proposals to grand celebrations — we handle every detail.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
                <Heart className="h-3.5 w-3.5 text-burgundy fill-burgundy" />
                <span>Trusted by 50,000+ guests across India</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
    </section>
  );
}