'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Users, Star, Eye } from 'lucide-react';

const rooms = [
  {
    id: 'grand-suite',
    name: 'Grand Suite',
    description: 'Luxury private theatre with plush recliners and ambient lighting',
    capacity: '2-8 guests',
    price: '₹4,999',
    rating: 4.9,
    reviews: 234,
    image: '/images/room-grand.jpg',
    tags: ['Couples Favorite', 'Premium Sound'],
  },
  {
    id: 'intimate-corner',
    name: 'Intimate Corner',
    description: 'Cozy nook designed for two, perfect for proposals and date nights',
    capacity: '2-4 guests',
    price: '₹3,499',
    rating: 4.8,
    reviews: 189,
    image: '/images/room-intimate.jpg',
    tags: ['Best for Couples', 'Private'],
  },
  {
    id: 'party-zone',
    name: 'Party Zone',
    description: 'Spacious room with dance floor, karaoke, and gaming setup',
    capacity: '8-20 guests',
    price: '₹7,999',
    rating: 4.7,
    reviews: 156,
    image: '/images/room-party.jpg',
    tags: ['Friends Favorite', 'Karaoke'],
  },
  {
    id: 'family-hall',
    name: 'Family Hall',
    description: 'Large comfortable space with kid-friendly amenities',
    capacity: '6-15 guests',
    price: '₹5,999',
    rating: 4.8,
    reviews: 98,
    image: '/images/room-family.jpg',
    tags: ['Family Friendly', 'Spacious'],
  },
];

export function FeaturedRooms() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative  bg-midnight overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="mb-4 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber">
              Our Spaces
            </span>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl text-balance">
              Featured <span className="text-gradient-amber">Rooms</span>
            </h2>
          </div>
          
          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/6 bg-mauve/50 text-ivory transition hover:border-amber hover:text-amber"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/6 bg-mauve/50 text-ivory transition hover:border-amber hover:text-amber"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 pb-4 lg:px-8 hide-scrollbar snap-scroll"
      >
        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group relative w-[340px] shrink-0 snap-start md:w-[400px]"
          >
            <div className="overflow-hidden rounded-card bg-mauve/40 border border-black/4 transition-all duration-500 hover:border-amber/20 hover:shadow-card-hover card-hover-lift">
              {/* Image */}
              <div className="relative h-56 overflow-hidden img-zoom">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${room.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mauve to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {room.tags.map((tag) => (
                    <span key={tag} className="pill pill-amber text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Quick View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex items-center gap-2 rounded-full bg-black/5 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-ink border border-black/10">
                    <Eye className="h-4 w-4" />
                    Quick Preview
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ivory">{room.name}</h3>
                    <p className="mt-1 text-sm text-mist line-clamp-2">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-amber/10 px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-amber fill-amber" />
                    <span className="text-xs font-bold text-amber">{room.rating}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-dusty">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {room.capacity}
                  </div>
                  <span>{room.reviews} reviews</span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-dusty">Starting from</span>
                    <p className="text-xl font-bold text-amber">{room.price}</p>
                  </div>
                  <Link
                    href={`/book?room=${room.id}`}
                    className="rounded-full bg-amber/10 border border-amber/30 px-5 py-2.5 text-sm font-semibold text-amber transition hover:bg-amber hover:text-midnight"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}