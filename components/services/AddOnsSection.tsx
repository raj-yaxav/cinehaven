'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Camera, 
  Gamepad2, 
  Sparkles, 
  Utensils, 
  Wine, 
  Lightbulb, 
  Wind,
  Heart,
  Check,
  Plus,
  X,
  ArrowRight,
  Zap,
  Crown,
  PartyPopper
} from 'lucide-react';

const addOns = [
  { 
    id: 'karaoke', 
    label: 'Karaoke Setup', 
    icon: Music, 
    price: 999, 
    accent: 'amber',
    desc: 'Professional mic & speaker system',
    popular: true,
  },
  { 
    id: 'photography', 
    label: 'Photography', 
    icon: Camera, 
    price: 1499, 
    accent: 'coral',
    desc: '30 min professional shoot',
    popular: false,
  },
  { 
    id: 'gaming', 
    label: 'Gaming Console', 
    icon: Gamepad2, 
    price: 799, 
    accent: 'sage',
    desc: 'PS5 + 4 controllers',
    popular: false,
  },
  { 
    id: 'decor', 
    label: 'Special Decor', 
    icon: Sparkles, 
    price: 1999, 
    accent: 'coral',
    desc: 'Balloons, banners & fairy lights',
    popular: true,
  },
  { 
    id: 'dinner', 
    label: 'Gourmet Dinner', 
    icon: Utensils, 
    price: 2499, 
    accent: 'amber',
    desc: '3-course meal for two',
    popular: true,
  },
  { 
    id: 'champagne', 
    label: 'Champagne Toast', 
    icon: Wine, 
    price: 1299, 
    accent: 'amber',
    desc: 'Premium sparkling wine',
    popular: false,
  },
  { 
    id: 'led', 
    label: 'LED Dance Floor', 
    icon: Lightbulb, 
    price: 1999, 
    accent: 'sage',
    desc: 'Color-changing floor panels',
    popular: false,
  },
  { 
    id: 'fog', 
    label: 'Fog Entry', 
    icon: Wind, 
    price: 899, 
    accent: 'mist',
    desc: 'Dramatic entrance effect',
    popular: false,
  },
  { 
    id: 'petals', 
    label: 'Rose Petal Path', 
    icon: Heart, 
    price: 599, 
    accent: 'coral',
    desc: 'Romantic walkway setup',
    popular: false,
  },
];

const accentMap: Record<string, { 
  bg: string; 
  border: string; 
  text: string; 
  hover: string;
  glow: string;
  light: string;
}> = {
  amber: { 
    bg: 'bg-amber/10', 
    border: 'border-amber/20', 
    text: 'text-amber-dark',
    hover: 'hover:border-amber/40 hover:bg-amber/[0.15]',
    glow: 'shadow-amber/20',
    light: 'bg-amber/5',
  },
  coral: { 
    bg: 'bg-coral/10', 
    border: 'border-coral/20', 
    text: 'text-coral',
    hover: 'hover:border-coral/40 hover:bg-coral/[0.15]',
    glow: 'shadow-coral/20',
    light: 'bg-coral/5',
  },
  sage: { 
    bg: 'bg-sage/10', 
    border: 'border-sage/20', 
    text: 'text-sage-dark',
    hover: 'hover:border-sage/40 hover:bg-sage/[0.15]',
    glow: 'shadow-sage/20',
    light: 'bg-sage/5',
  },
  mist: { 
    bg: 'bg-mist/10', 
    border: 'border-mist/20', 
    text: 'text-mist',
    hover: 'hover:border-mist/40 hover:bg-mist/[0.15]',
    glow: 'shadow-mist/20',
    light: 'bg-mist/5',
  },
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function AddOnsSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleAddon = useCallback((id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const totalPrice = selected.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const selectedCount = selected.length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-warm/30 to-cream py-20 sm:py-28 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full bg-amber/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 left-[5%] w-[350px] h-[350px] rounded-full bg-coral/[0.03] blur-[100px]" />
      <div className="absolute top-1/3 left-[8%] w-1.5 h-1.5 rounded-full bg-amber/20" />
      <div className="absolute bottom-1/3 right-[12%] w-1 h-1 rounded-full bg-coral/20" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber/[0.08] border border-amber/15 text-amber-dark text-sm font-accent font-medium tracking-wide mb-6 sm:mb-8"
          >
            <Zap className="h-4 w-4" />
            Extras & Add-ons
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
            Make It{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-dark to-coral">
                Extra Special
              </span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="url(#gradAddon)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradAddon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#E85D4E" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="mt-5 sm:mt-6 text-ink-secondary max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Elevate your celebration with curated add-ons. Each detail is designed to make your moment unforgettable.
          </p>
        </motion.div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {addOns.map((addon, i) => {
            const style = accentMap[addon.accent];
            const isSelected = selected.includes(addon.id);
            const isHovered = hoveredId === addon.id;
            const Icon = addon.icon;

            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(addon.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.button
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleAddon(addon.id)}
                  className={`relative w-full text-left rounded-3xl border p-6 sm:p-7 transition-all duration-500 overflow-hidden ${
                    isSelected 
                      ? `${style.bg} ${style.border} shadow-lg ${style.glow}` 
                      : 'bg-white/80 backdrop-blur-sm border-white/60 hover:border-amber/20 hover:shadow-md'
                  }`}
                >
                  {/* Popular badge */}
                  {addon.popular && !isSelected && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber/10 border border-amber/20 text-[10px] font-semibold text-amber-dark uppercase tracking-wider">
                        <Crown className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Selected checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`absolute top-4 right-4 h-8 w-8 rounded-full ${style.bg} ${style.border} flex items-center justify-center`}
                      >
                        <Check className={`h-4 w-4 ${style.text}`} strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className="relative mb-5">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                      isSelected 
                        ? `${style.bg} ${style.border} border` 
                        : 'bg-cream-warm/80 border border-surface-border/40'
                    }`}>
                      <Icon className={`h-6 w-6 transition-colors duration-300 ${
                        isSelected ? style.text : 'text-ink-light'
                      }`} strokeWidth={1.5} />
                    </div>
                    {/* Glow behind icon on hover */}
                    <div className={`absolute inset-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${style.bg} opacity-0 blur-xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-60' : ''
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold mb-1.5 transition-colors duration-300 ${
                    isSelected ? 'text-ink' : 'text-ink'
                  }`}>
                    {addon.label}
                  </h3>
                  
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">
                    {addon.desc}
                  </p>

                  {/* Price row */}
                  <div className="flex items-center justify-between pt-4 border-t border-surface-border/30">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl font-bold ${isSelected ? style.text : 'text-ink'}`}>
                        {formatPrice(addon.price)}
                      </span>
                    </div>
                    
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                      isSelected 
                        ? `${style.bg} ${style.text} ${style.border} border` 
                        : 'bg-cream-warm text-ink-muted'
                    }`}>
                      {isSelected ? 'Selected' : 'Add'}
                    </span>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.bg} opacity-0 transition-opacity duration-500 pointer-events-none ${
                    isHovered && !isSelected ? 'opacity-30' : ''
                  }`} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Summary Bar */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-amber/20 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.1)]"
            >
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left: Selected items */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 border border-amber/20">
                        <PartyPopper className="h-5 w-5 text-amber-dark" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {selectedCount} add-on{selectedCount > 1 ? 's' : ''} selected
                        </p>
                        <div className="flex gap-2 mt-1">
                          {selected.slice(0, 3).map(id => {
                            const addon = addOns.find(a => a.id === id);
                            return (
                              <span key={id} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cream-warm text-ink-muted">
                                {addon?.label}
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleAddon(id); }}
                                  className="hover:text-coral"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </span>
                            );
                          })}
                          {selected.length > 3 && (
                            <span className="text-[10px] text-ink-muted">+{selected.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price + CTA */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-ink-muted">Additional cost</p>
                      <p className="text-2xl font-bold text-amber-dark">{formatPrice(totalPrice)}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber to-amber-dark text-white font-bold text-sm shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/30 transition-all"
                    >
                      <span className="sm:hidden">{formatPrice(totalPrice)} — </span>
                      Add to Booking
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for fixed bar */}
        <div className={`transition-all duration-300 ${selectedCount > 0 ? 'h-24 sm:h-20' : 'h-0'}`} />

      </div>
    </section>
  );
}