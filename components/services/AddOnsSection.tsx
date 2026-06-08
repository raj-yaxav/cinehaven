'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  X,
  ArrowRight,
  Zap,
  Crown,
  Plus,
  PartyPopper,
  ShoppingBag,
  Info
} from 'lucide-react';

const addOns = [
  { 
    id: 'karaoke', 
    label: 'Karaoke Setup', 
    icon: Music, 
    price: 999, 
    accent: 'amber',
    desc: 'Professional mic & speaker system with 10,000+ songs library',
    popular: true,
    tag: 'Most Booked'
  },
  { 
    id: 'photography', 
    label: 'Photography', 
    icon: Camera, 
    price: 1499, 
    accent: 'coral',
    desc: '30 min professional shoot with edited digital album',
    popular: false,
    tag: 'Memories'
  },
  { 
    id: 'gaming', 
    label: 'Gaming Console', 
    icon: Gamepad2, 
    price: 799, 
    accent: 'sage',
    desc: 'PS5 with 4 controllers and 20+ top titles',
    popular: false,
    tag: 'Fun'
  },
  { 
    id: 'decor', 
    label: 'Special Decor', 
    icon: Sparkles, 
    price: 1999, 
    accent: 'coral',
    desc: 'Balloons, banners, fairy lights & themed setup',
    popular: true,
    tag: 'Essential'
  },
  { 
    id: 'dinner', 
    label: 'Gourmet Dinner', 
    icon: Utensils, 
    price: 2499, 
    accent: 'amber',
    desc: '3-course meal for two with private chef service',
    popular: true,
    tag: 'Premium'
  },
  { 
    id: 'champagne', 
    label: 'Champagne Toast', 
    icon: Wine, 
    price: 1299, 
    accent: 'amber',
    desc: 'Premium sparkling wine with chocolate pairings',
    popular: false,
    tag: 'Classic'
  },
  { 
    id: 'led', 
    label: 'LED Dance Floor', 
    icon: Lightbulb, 
    price: 1999, 
    accent: 'sage',
    desc: 'Color-changing floor panels with sync to music',
    popular: false,
    tag: 'Wow Factor'
  },
  { 
    id: 'fog', 
    label: 'Fog Entry', 
    icon: Wind, 
    price: 899, 
    accent: 'mist',
    desc: 'Dramatic entrance effect with colored lighting',
    popular: false,
    tag: 'Dramatic'
  },
  { 
    id: 'petals', 
    label: 'Rose Petal Path', 
    icon: Heart, 
    price: 599, 
    accent: 'coral',
    desc: 'Romantic walkway with 500 fresh rose petals',
    popular: false,
    tag: 'Romantic'
  },
];

const accentMap: Record<string, { 
  bg: string; 
  border: string; 
  text: string; 
  hover: string;
  glow: string;
  light: string;
  gradient: string;
  solid: string;
}> = {
  amber: { 
    bg: 'bg-amber/10', 
    border: 'border-amber/20', 
    text: 'text-amber-dark',
    hover: 'hover:border-amber/40 hover:bg-amber/[0.15]',
    glow: 'shadow-amber/20',
    light: 'bg-amber/5',
    gradient: 'from-amber to-amber-dark',
    solid: 'bg-amber',
  },
  coral: { 
    bg: 'bg-coral/10', 
    border: 'border-coral/20', 
    text: 'text-coral',
    hover: 'hover:border-coral/40 hover:bg-coral/[0.15]',
    glow: 'shadow-coral/20',
    light: 'bg-coral/5',
    gradient: 'from-coral to-coral-dark',
    solid: 'bg-coral',
  },
  sage: { 
    bg: 'bg-sage/10', 
    border: 'border-sage/20', 
    text: 'text-sage-dark',
    hover: 'hover:border-sage/40 hover:bg-sage/[0.15]',
    glow: 'shadow-sage/20',
    light: 'bg-sage/5',
    gradient: 'from-sage to-sage-dark',
    solid: 'bg-sage',
  },
  mist: { 
    bg: 'bg-mist/10', 
    border: 'border-mist/20', 
    text: 'text-mist',
    hover: 'hover:border-mist/40 hover:bg-mist/[0.15]',
    glow: 'shadow-mist/20',
    light: 'bg-mist/5',
    gradient: 'from-mist to-mist-dark',
    solid: 'bg-mist',
  },
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function AddOnsSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const toggleAddon = useCallback((id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const removeAddon = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(prev => prev.filter(i => i !== id));
  }, []);

  const totalPrice = selected.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const selectedCount = selected.length;
  
  const selectedAddons = selected.map(id => addOns.find(a => a.id === id)).filter(Boolean);

  // Group by category for the new layout
  const categories = [
    { id: 'all', label: 'All Extras' },
    { id: 'popular', label: 'Popular' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'ambiance', label: 'Ambiance' },
    { id: 'dining', label: 'Dining' },
  ];

  const filteredAddons = activeCategory === 'all' 
    ? addOns 
    : activeCategory === 'popular'
    ? addOns.filter(a => a.popular)
    : activeCategory === 'entertainment'
    ? addOns.filter(a => ['karaoke', 'gaming', 'led'].includes(a.id))
    : activeCategory === 'ambiance'
    ? addOns.filter(a => ['decor', 'fog', 'petals'].includes(a.id))
    : addOns.filter(a => ['dinner', 'champagne'].includes(a.id));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream-warm/30 py-20 sm:py-28 lg:py-32">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[5%] w-[600px] h-[600px] rounded-full bg-amber/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full bg-coral/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sage/[0.02] blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Header - Asymmetric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber/[0.08] border border-amber/15 text-amber-dark text-sm font-medium tracking-wide mb-6"
            >
              <Zap className="h-4 w-4" />
              Extras & Add-ons
            </motion.div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
              Curate Your{' '}
              <span className="relative inline-block">
                <span className="text-gradient-amber">
                  Perfect Experience
                </span>
                {/* <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C75 2 225 2 298 8" stroke="url(#gradAddon2)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradAddon2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7f0505" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#5f0d04" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                </svg> */}
              </span>
            </h2>
            
            <p className="mt-5 text-ink-secondary text-lg leading-relaxed max-w-lg">
              Hand-picked additions to transform your celebration. Mix, match, and make it uniquely yours.
            </p>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-6 lg:pb-2"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-ink">{addOns.length}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">Options</p>
            </div>
            <div className="w-px h-10 bg-surface-border/50" />
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-dark">₹499</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">From</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-amber text-white shadow-lg shadow-amber/20'
                  : 'bg-white/60 text-ink-secondary hover:bg-amber/10 hover:text-amber border border-amber/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAddons.map((addon, i) => {
              const style = accentMap[addon.accent];
              const isSelected = selected.includes(addon.id);
              const isHovered = hoveredId === addon.id;
              const Icon = addon.icon;

              // Featured card takes more space
              const isFeatured = addon.popular && i === 0;

              return (
                <motion.div
                  key={addon.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    delay: i * 0.05, 
                    duration: 0.4, 
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setHoveredId(addon.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''}
                >
                  <motion.button
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleAddon(addon.id)}
                    className={`group relative w-full text-left rounded-3xl border-2 p-6 sm:p-7 transition-all duration-500 overflow-hidden ${
                      isSelected 
                        ? `${style.bg} ${style.border} shadow-xl ${style.glow}` 
                        : 'bg-white/60 backdrop-blur-sm border border-amber/10 hover:border-amber/30 hover:shadow-lg'
                    }`}
                  >
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient} opacity-0 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'group-hover:opacity-60'}`} />

                    {/* Floating tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        isSelected 
                          ? `${style.bg} ${style.text} ${style.border} border` 
                          : 'bg-cream-warm/80 text-ink-muted border border-surface-border/20'
                      }`}>
                        {addon.tag}
                      </span>
                    </div>

                    {/* Popular crown - only for popular items */}
                    {addon.popular && !isSelected && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber/10 border border-amber/20 text-[10px] font-bold text-amber-dark uppercase tracking-wider">
                          <Crown className="h-3 w-3" />
                          Top Pick
                        </span>
                      </div>
                    )}

                    {/* Selected indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className={`absolute top-4 right-4 h-7 w-7 rounded-full bg-amber flex items-center justify-center shadow-lg`}
                        >
                          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Content Layout */}
                    <div className="pt-10">
                      {/* Icon with animated ring */}
                      <div className="relative mb-5 inline-block">
                        <motion.div 
                          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                            isSelected 
                              ? `${style.bg} ${style.border} border shadow-inner` 
                              : 'bg-cream-warm/60 border border-surface-border/30 group-hover:border-surface-border/60'
                          }`}
                          animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className={`h-6 w-6 transition-colors duration-300 ${
                            isSelected ? style.text : 'text-ink-light group-hover:text-ink'
                          }`} strokeWidth={1.5} />
                        </motion.div>
                        
                        {/* Pulse ring on hover */}
                        <div className={`absolute inset-0 h-14 w-14 rounded-2xl ${style.solid} opacity-0 blur-lg transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} />
                      </div>

                      <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-ink transition-colors">
                        {addon.label}
                      </h3>
                      
                      <p className="text-sm text-ink-muted leading-relaxed mb-6 min-h-[40px]">
                        {addon.desc}
                      </p>

                      {/* Price & Action Row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-2xl font-bold ${isSelected ? style.text : 'text-ink'}`}>
                            {formatPrice(addon.price)}
                          </p>
                          <p className="text-[11px] text-ink-muted mt-0.5">per booking</p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                            isSelected 
                              ? 'bg-amber/10 text-amber border border-amber/30' 
                              : 'bg-amber text-white hover:bg-amber-dark shadow-md hover:shadow-lg'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-4 w-4" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Add
                            </>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Subtle gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 transition-opacity duration-700 pointer-events-none ${isHovered && !isSelected ? 'opacity-[0.03]' : ''}`} />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state for filters */}
        {filteredAddons.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Info className="h-12 w-12 text-ink-muted mx-auto mb-4" />
            <p className="text-ink-secondary">No add-ons in this category</p>
          </motion.div>
        )}

        {/* Selected Items Sidebar / Bottom Sheet */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              {/* Backdrop blur strip */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-t border-amber/15 shadow-[0_-4px_60px_-15px_rgba(0,0,0,0.15)]" />
              
              <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  
                  {/* Left: Selected items horizontal scroll */}
                  <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-amber to-amber-dark shadow-lg shadow-amber/20">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex gap-2">
                      {selectedAddons.map((addon) => {
                        if (!addon) return null;
                        const style = accentMap[addon.accent];
                        return (
                          <motion.div
                            key={addon.id}
                            layout
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-xl ${style.bg} ${style.border} border whitespace-nowrap`}
                          >
                            <span className={`text-sm font-semibold ${style.text}`}>{addon.label}</span>
                            <button 
                              onClick={(e) => removeAddon(addon.id, e)}
                              className="p-1 rounded-lg hover:bg-white/50 transition-colors"
                            >
                              <X className={`h-3.5 w-3.5 ${style.text}`} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Total & CTA */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="text-left sm:text-right flex-1 sm:flex-none">
                      <p className="text-xs text-ink-muted mb-0.5">Total extras</p>
                      <p className="text-3xl font-bold text-amber-dark">{formatPrice(totalPrice)}</p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber to-amber-dark text-white font-bold text-sm shadow-xl shadow-amber/25 hover:shadow-2xl hover:shadow-amber/30 transition-all"
                    >
                      Add {selectedCount} to Booking
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for fixed bottom bar */}
        <div className={`transition-all duration-500 ease-out ${selectedCount > 0 ? 'h-28 sm:h-24' : 'h-0'}`} />

      </div>
    </section>
  );
}