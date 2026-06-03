'use client';
import { useState } from 'react';
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
  Plus
} from 'lucide-react';

const addOns = [
  { id: 'karaoke', label: 'Karaoke Setup', icon: Music, price: '₹999', accent: 'amber' },
  { id: 'photography', label: 'Photography', icon: Camera, price: '₹1,499', accent: 'coral' },
  { id: 'gaming', label: 'Gaming Console', icon: Gamepad2, price: '₹799', accent: 'sage' },
  { id: 'decor', label: 'Special Decor', icon: Sparkles, price: '₹1,999', accent: 'coral' },
  { id: 'dinner', label: 'Gourmet Dinner', icon: Utensils, price: '₹2,499', accent: 'amber' },
  { id: 'champagne', label: 'Champagne Toast', icon: Wine, price: '₹1,299', accent: 'amber' },
  { id: 'led', label: 'LED Dance Floor', icon: Lightbulb, price: '₹1,999', accent: 'sage' },
  { id: 'fog', label: 'Fog Entry', icon: Wind, price: '₹899', accent: 'mist' },
  { id: 'petals', label: 'Rose Petal Path', icon: Heart, price: '₹599', accent: 'coral' },
];

const accentMap: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  amber: { bg: 'bg-amber/10', border: 'border-amber/20', text: 'text-amber', hover: 'hover:border-amber/40 hover:bg-amber/15' },
  coral: { bg: 'bg-coral/10', border: 'border-coral/20', text: 'text-coral', hover: 'hover:border-coral/40 hover:bg-coral/15' },
  sage: { bg: 'bg-sage/10', border: 'border-sage/20', text: 'text-sage', hover: 'hover:border-sage/40 hover:bg-sage/15' },
  mist: { bg: 'bg-mist/10', border: 'border-mist/20', text: 'text-mist', hover: 'hover:border-mist/40 hover:bg-mist/15' },
};

export function AddOnsSection() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative section-padding bg-gradient-mesh">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-accent uppercase tracking-[0.3em] text-amber">Extras</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            Make It <span className="text-gradient-amber">Extra Special</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {addOns.map((addon, i) => {
            const style = accentMap[addon.accent];
            const isSelected = selected.includes(addon.id);

            return (
              <motion.button
                key={addon.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleAddon(addon.id)}
                className={`relative rounded-card border p-5 text-left transition-all duration-300 ${
                  isSelected 
                    ? `${style.bg} ${style.border} ${style.text} shadow-${addon.accent}-glow` 
                    : `border-black/4 bg-black/2 ${style.hover}`
                }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-3 right-3 h-5 w-5 rounded-full ${style.bg} ${style.border} flex items-center justify-center`}
                  >
                    <Plus className={`h-3 w-3 ${style.text} rotate-45`} />
                  </motion.div>
                )}

                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${isSelected ? style.bg : 'bg-black/3'} mb-3`}>
                  <addon.icon className={`h-5 w-5 ${isSelected ? style.text : 'text-mist'}`} />
                </div>
                
                <p className={`text-sm font-medium ${isSelected ? 'text-ivory' : 'text-mist'}`}>
                  {addon.label}
                </p>
                <p className={`text-xs mt-1 ${isSelected ? style.text : 'text-dusty'}`}>
                  {addon.price}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Selected summary */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 rounded-card border border-amber/20 bg-amber/5 p-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-mist">
                  {selected.length} add-on{selected.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-lg font-bold text-amber">
                  + ₹{selected.reduce((sum, id) => {
                    const addon = addOns.find(a => a.id === id);
                    return sum + (addon ? parseInt(addon.price.replace(/[^0-9]/g, '')) : 0);
                  }, 0).toLocaleString()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                Add to Booking
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}