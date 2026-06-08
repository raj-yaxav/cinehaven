'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Quote, Calendar } from 'lucide-react';

const memories = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913959/cinehaven/hero-proposal.png',
    occasion: 'Proposal',
    date: 'Feb 14, 2026',
    quote: 'She said yes! The setup was absolutely magical.',
    couple: 'Rahul & Priya',
    location: 'Mumbai',
    likes: 234,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png',
    occasion: 'Birthday',
    date: 'Jan 20, 2026',
    quote: 'Best birthday ever! My friends were blown away.',
    couple: 'Sarah & Friends',
    location: 'Bangalore',
    likes: 189,
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913949/cinehaven/hero-anniversary.png',
    occasion: 'Anniversary',
    date: 'Dec 25, 2025',
    quote: '10 years together, celebrated in the most perfect way.',
    couple: 'Amit & Neha',
    location: 'Delhi',
    likes: 312,
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913956/cinehaven/hero-date.png',
    occasion: 'Date Night',
    date: 'Mar 5, 2026',
    quote: 'Our monthly date night tradition just got upgraded.',
    couple: 'Vikram & Ananya',
    location: 'Mumbai',
    likes: 156,
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913957/cinehaven/hero-friends.png',
    occasion: 'Friends Party',
    date: 'Feb 28, 2026',
    quote: 'Karaoke + movie + pizza = unforgettable night!',
    couple: 'The Squad',
    location: 'Bangalore',
    likes: 278,
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913959/cinehaven/hero-proposal.png',
    occasion: 'Proposal',
    date: 'Jan 1, 2026',
    quote: 'Started the year by asking her to be mine forever.',
    couple: 'Arjun & Meera',
    location: 'Delhi',
    likes: 445,
  },
];

export function MemoryWall() {
  const [selectedMemory, setSelectedMemory] = useState<typeof memories[0] | null>(null);

  return (
    <section className="relative section-padding bg-transparent overflow-hidden">
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-coral/5 blur-[150px]" />
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber">
            Real Moments
          </span>
          <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
            Memory <span className="text-burgundy">Wall</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/80 text-balance">
            Real celebrations, real emotions, real memories created at CineHaven.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="mb-6 break-inside-avoid"
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="group relative cursor-pointer overflow-hidden rounded-card">
                <div 
                  className="aspect-[4/5] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${memory.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/30 via-transparent to-transparent transition-opacity group-hover:opacity-50" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="pill bg-white/90 text-burgundy border border-burgundy/20 mb-2 w-fit text-xs">{memory.occasion}</span>
                  <p className="font-display text-lg font-bold text-white">{memory.couple}</p>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {memory.location} • {memory.date}
                  </p>
                </div>

                {/* Always visible badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-ink/60 backdrop-blur-md px-3 py-1.5">
                  <Heart className="h-3.5 w-3.5 text-white fill-white" />
                  <span className="text-xs text-white font-medium">{memory.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-mist mb-4">Want to see your memory here?</p>
          <a 
            href="/book" 
            className="inline-flex items-center gap-2 rounded-full border border-amber/30 px-6 py-3 text-sm font-medium text-amber transition hover:bg-amber/10"
          >
            <Heart className="h-4 w-4" />
            Create Your Memory
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full overflow-hidden rounded-card bg-velvet border border-black/6"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedMemory.image})` }}
              />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="pill pill-coral">{selectedMemory.occasion}</span>
                  <span className="text-sm text-dusty">{selectedMemory.date}</span>
                </div>
                
                <Quote className="h-8 w-8 text-amber/40 mb-3" />
                <p className="font-display text-xl text-ivory italic mb-6">
                  "{selectedMemory.quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-ivory">{selectedMemory.couple}</p>
                    <p className="text-sm text-dusty">{selectedMemory.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-coral">
                    <Heart className="h-5 w-5 fill-coral" />
                    <span className="font-bold">{selectedMemory.likes}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur-md transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}