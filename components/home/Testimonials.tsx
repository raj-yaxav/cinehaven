'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: '/images/my-booking.png',
    occasion: 'Proposal Package',
    rating: 5,
    text: 'I proposed to my girlfriend here and it was absolutely perfect. The team helped me plan every detail, from the rose petal entrance to the custom video montage. She cried tears of joy!',
    location: 'Mumbai',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '/images/hero-birthday.png',
    occasion: 'Birthday Celebration',
    rating: 5,
    text: 'Best birthday ever! Booked the Party Zone for 15 friends. The karaoke setup, gaming console, and custom decor made it a night we still talk about. Worth every rupee!',
    location: 'Bangalore',
  },
  {
    id: 3,
    name: 'Amit & Neha Patel',
    avatar: '/images/hero-anniversary.png',
    occasion: '10th Anniversary',
    rating: 5,
    text: 'We wanted something special for our 10th anniversary and CineHaven delivered beyond expectations. The Intimate Corner with candlelight dinner setup was so romantic. Felt like our first date all over again.',
    location: 'Delhi',
  },
  {
    id: 4,
    name: 'The Bangalore Squad',
    avatar: '/images/hero-date.png',
    occasion: 'Friends Reunion',
    rating: 5,
    text: 'We booked the Party Zone for our college reunion. The fog entry, LED dance floor, and custom playlist had us dancing till midnight. Already planning our next visit!',
    location: 'Bangalore',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative section-padding bg-velvet overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-midnight opacity-50" />
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber">
            Love Stories
          </span>
          <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            What Couples & Friends <span className="text-gradient-amber">Say</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="mx-auto h-12 w-12 text-amber/30 mb-8" />
              
              <p className="font-display text-2xl leading-relaxed text-ivory md:text-3xl lg:text-4xl text-balance">
                "{testimonials[current].text}"
              </p>
              
              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber fill-amber" />
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-mauve border-2 border-amber/30 overflow-hidden flex items-center justify-center">
                    <span className="text-lg font-bold text-amber">
                      {testimonials[current].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-ivory">{testimonials[current].name}</p>
                    <p className="text-sm text-amber">{testimonials[current].occasion}</p>
                    <p className="text-xs text-dusty">{testimonials[current].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/6 text-ivory transition hover:border-amber hover:text-amber"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-8 bg-amber' : 'w-2 bg-black/10 hover:bg-black/8'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/6 text-ivory transition hover:border-amber hover:text-amber"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}