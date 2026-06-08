'use client';

import { motion } from 'framer-motion';
import { Check, Star, Crown, Gem } from 'lucide-react';

const packages = [
  {
    name: 'Silver',
    tier: 'silver',
    price: '₹3,499',
    period: 'per celebration',
    description: 'Perfect for intimate gatherings',
    icon: Star,
    accent: 'mist',
    features: [
      '2 Hours Duration',
      'Basic Decor Setup',
      'Standard Sound System',
      'Popcorn & Soft Drinks',
      'Digital Invite',
    ],
    notIncluded: [
      'Custom Cake',
      'Photography',
      'Private Butler',
    ],
  },
  {
    name: 'Gold',
    tier: 'gold',
    price: '₹5,999',
    period: 'per celebration',
    description: 'Our most popular choice',
    icon: Crown,
    accent: 'amber',
    popular: true,
    features: [
      '3 Hours Duration',
      'Premium Decor Theme',
      'Dolby Atmos Sound',
      'Gourmet Snack Platter',
      'Complimentary Cake',
      'Custom Video Montage',
      'Professional Photography (20 shots)',
    ],
    notIncluded: [
      'Private Butler',
      'Champagne Toast',
    ],
  },
  {
    name: 'Diamond',
    tier: 'diamond',
    price: '₹9,999',
    period: 'per celebration',
    description: 'The ultimate luxury experience',
    icon: Gem,
    accent: 'coral',
    features: [
      '4 Hours Duration',
      'Luxury Custom Decor',
      'Private Butler Service',
      'Professional Photography (50 shots)',
      'Champagne Toast',
      'Custom Playlist Curation',
      'Gourmet 3-Course Dinner',
      'LED Dance Floor',
      'Fog Machine Entry',
      'Dedicated Event Coordinator',
    ],
    notIncluded: [],
  },
];

const accentStyles: Record<string, { bg: string; border: string; text: string; glow: string; badge: string }> = {
  mist: {
    bg: 'bg-mist/10',
    border: 'border-mist/20',
    text: 'text-mist',
    glow: 'hover:shadow-[0_0_30px_rgba(155,150,168,0.15)]',
    badge: 'bg-mist/15 text-mist border-mist/20',
  },
  amber: {
    bg: 'bg-amber/15',
    border: 'border-amber/30',
    text: 'text-amber',
    glow: 'hover:shadow-burgundy-glow',
    badge: 'bg-amber/15 text-amber border-amber/30',
  },
  coral: {
    bg: 'bg-coral/15',
    border: 'border-coral/30',
    text: 'text-coral',
    glow: 'hover:shadow-crimson-glow',
    badge: 'bg-coral/15 text-coral border-coral/30',
  },
};

export function PackageComparison() {
  return (
    <section className="relative section-padding bg-transparent">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-amber/5 blur-[100px]" />
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-accent uppercase tracking-[0.3em] text-amber">Pricing</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            Find Your <span className="text-gradient-amber">Perfect Package</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {packages.map((pkg, i) => {
            const style = accentStyles[pkg.accent];
            
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative ${pkg.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber to-amber-dark text-midnight text-xs font-bold shadow-burgundy-glow">
                      Most Popular
                    </span>
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`h-full rounded-card border ${style.border} bg-white/60 backdrop-blur-sm p-8 transition-all duration-500 ${style.glow} ${pkg.popular ? 'border-amber/40 shadow-burgundy-glow' : ''}`}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${style.bg} ${style.border} mb-4`}>
                      <pkg.icon className={`h-7 w-7 ${style.text}`} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ivory">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-ink-secondary">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <span className={`text-4xl font-bold font-display ${pkg.popular ? 'text-gradient-amber' : style.text}`}>
                      {pkg.price}
                    </span>
                    <span className="text-dusty text-sm ml-2">{pkg.period}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 h-5 w-5 rounded-full bg-amber/20 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-amber" />
                        </div>
                        <span className="text-sm text-ink-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Not included */}
                  {pkg.notIncluded.length > 0 && (
                    <div className="space-y-2 mb-8 pt-4 border-t border-black/4">
                      <p className="text-xs font-accent uppercase tracking-wider text-ink-muted mb-2">Not included</p>
                      {pkg.notIncluded.map((item) => (
                        <div key={item} className="flex items-start gap-3 opacity-50">
                          <div className="mt-0.5 h-5 w-5 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                            <span className="text-ink-muted text-xs">—</span>
                          </div>
                          <span className="text-sm text-ink-muted line-through">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-button font-semibold text-sm transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-amber to-amber-dark text-midnight shadow-burgundy-glow hover:shadow-burgundy-glow-lg'
                        : `border ${style.border} ${style.text} hover:bg-black/3`
                    }`}
                  >
                    Choose {pkg.name}
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}