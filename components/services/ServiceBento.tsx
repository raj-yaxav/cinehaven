'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Cake, 
  Heart, 
  Sparkles, 
  PartyPopper, 
  Briefcase,
  ArrowUpRight,
  Star
} from 'lucide-react';

const services = [
  {
    id: 'birthday',
    title: 'Birthday Celebrations',
    description: 'Make their special day unforgettable with custom decor, cake, and their favorite movie on the big screen.',
    icon: Cake,
    accent: 'amber',
    size: 'large', // spans 2 columns
    image: '/images/hero-birthday.png',
    price: 'From ₹3,999',
    rating: 4.9,
    features: ['Custom Cake', 'Balloon Decor', 'Birthday Video'],
  },
  {
    id: 'proposal',
    title: 'Proposal Packages',
    description: 'The perfect "Yes" starts here. Rose petals, candlelight, and a private cinema just for two.',
    icon: Heart,
    accent: 'coral',
    size: 'tall', // spans 2 rows
    image: '/images/hero-proposal.png',
    price: 'From ₹5,999',
    rating: 5.0,
    features: ['Rose Petal Path', 'Private Butler', 'Photography'],
  },
  {
    id: 'anniversary',
    title: 'Anniversary Specials',
    description: 'Celebrate your journey together with romantic decor and a curated movie marathon.',
    icon: Sparkles,
    accent: 'coral',
    size: 'normal',
    image: '/images/hero-anniversary.png',
    price: 'From ₹4,499',
    rating: 4.8,
    features: ['Champagne Toast', 'Photo Montage'],
  },
  {
    id: 'date-night',
    title: 'Date Nights',
    description: 'Elevate your regular date night with intimate seating and gourmet dining.',
    icon: Sparkles,
    accent: 'amber',
    size: 'normal',
    image: '/images/hero-date.png',
    price: 'From ₹2,999',
    rating: 4.7,
    features: ['Candlelight Dinner', 'Movie Choice'],
  },
  {
    id: 'friends',
    title: 'Friends Party',
    description: 'Karaoke, gaming, and movies — the ultimate friends night out.',
    icon: PartyPopper,
    accent: 'sage',
    size: 'large',
    image: '/images/hero-friends.png',
    price: 'From ₹6,999',
    rating: 4.8,
    features: ['Karaoke Setup', 'Gaming Console', 'Pizza Party'],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Impress clients or reward your team with a premium private screening experience.',
    icon: Briefcase,
    accent: 'sage',
    size: 'normal',
    image: '/images/hero-corporate.png',
    price: 'From ₹8,999',
    rating: 4.6,
    features: ['Projector Setup', 'Catering', 'Branding'],
  },
];

const accentMap: Record<string, { bg: string; border: string; text: string; glow: string; gradient: string }> = {
  amber: {
    bg: 'bg-amber/15',
    border: 'border-amber/25',
    text: 'text-amber',
    glow: 'group-hover:shadow-burgundy-glow',
    gradient: 'from-amber/20',
  },
  coral: {
    bg: 'bg-coral/15',
    border: 'border-coral/25',
    text: 'text-coral',
    glow: 'group-hover:shadow-crimson-glow',
    gradient: 'from-coral/20',
  },
  sage: {
    bg: 'bg-sage/15',
    border: 'border-sage/25',
    text: 'text-sage',
    glow: 'group-hover:shadow-rosegold-glow',
    gradient: 'from-sage/20',
  },
};

export function ServiceBento() {
  return (
    <section className="relative section-padding bg-midnight">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-accent uppercase tracking-[0.3em] text-amber">Choose Your Celebration</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            Something for <span className="text-gradient-amber">Everyone</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {services.map((service, i) => {
            const accent = accentMap[service.accent];
            const gridClass = service.size === 'large' 
              ? 'md:col-span-2' 
              : service.size === 'tall' 
              ? 'md:row-span-2' 
              : '';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={gridClass}
              >
                <Link href={`/services?service=${service.id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`group relative h-full overflow-hidden rounded-card border border-black/4 bg-gradient-to-b ${accent.gradient} to-midnight transition-all duration-500 ${accent.glow}`}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cream via-midnight/70 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      {/* Top badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/12 backdrop-blur-md px-3 py-1.5">
                        <Star className="h-3.5 w-3.5 text-amber fill-amber" />
                        <span className="text-xs text-ink font-medium">{service.rating}</span>
                      </div>

                      {/* Icon */}
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.border} backdrop-blur-sm`}>
                        <service.icon className={`h-6 w-6 ${accent.text}`} />
                      </div>

                      <h3 className="font-display text-2xl font-bold text-ivory group-hover:text-gradient-amber transition-all">
                        {service.title}
                      </h3>
                      
                      <p className="mt-2 text-sm text-mist line-clamp-4">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mt-3 flex flex-wrap gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {service.features.map((f) => (
                          <span key={f} className={`text-xs px-2.5 py-1 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Bottom row */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`text-sm font-medium ${accent.text}`}>{service.price}</span>
                        <div className={`flex items-center gap-1 text-sm ${accent.text} opacity-0 transition-all group-hover:opacity-100`}>
                          Explore
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}