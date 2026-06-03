'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, Clock } from 'lucide-react';

const stats = [
  { 
    icon: Users, 
    value: '12,847+', 
    label: 'Celebrations Hosted',
    color: 'text-amber',
    bgColor: 'bg-amber/10',
    borderColor: 'border-amber/20'
  },
  { 
    icon: Star, 
    value: '4.9/5', 
    label: 'Average Rating',
    color: 'text-amber-light',
    bgColor: 'bg-amber/10',
    borderColor: 'border-amber/20'
  },
  { 
    icon: TrendingUp, 
    value: '3', 
    label: 'Booking Right Now',
    color: 'text-coral',
    bgColor: 'bg-coral/10',
    borderColor: 'border-coral/20'
  },
  { 
    icon: Clock, 
    value: '2m', 
    label: 'Last Booking Ago',
    color: 'text-sage',
    bgColor: 'bg-sage/10',
    borderColor: 'border-sage/20'
  },
];

export function LiveSocialProof() {
  return (
    <div className="sticky top-[72px] z-30 border-y border-black/4 bg-velvet/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-6 py-3 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 1.5 }}
              className="flex items-center gap-3"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-dusty">{stat.label}</span>
              </div>
              
              {/* Live pulse dot for active bookings */}
              {stat.label === 'Booking Right Now' && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}