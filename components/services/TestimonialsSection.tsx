'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, MapPin, CalendarDays, Verified } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'RS',
    avatarColor: 'from-burgundy to-burgundy-light',
    occasion: 'Proposal Package',
    rating: 5,
    text: 'I proposed to my girlfriend here and it was absolutely perfect. The team helped me plan every detail, from the rose petal entrance to the custom video montage. She cried tears of joy! The private screening room was beautifully decorated, and the staff even helped me set up a hidden camera to capture the moment.',
    location: 'Mumbai',
    date: '2 months ago',
    verified: true,
    likes: 24,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    avatarColor: 'from-teal to-teal-light',
    occasion: 'Birthday Celebration',
    rating: 5,
    text: 'Best birthday ever! Booked the Party Zone for 15 friends. The karaoke setup, gaming console, and custom decor made it a night we still talk about. Worth every rupee! The sound system was incredible and the LED dance floor was a huge hit.',
    location: 'Bangalore',
    date: '1 month ago',
    verified: true,
    likes: 18,
  },
  {
    id: 3,
    name: 'Amit & Neha Patel',
    avatar: 'AN',
    avatarColor: 'from-rosegold to-rosegold-light',
    occasion: '10th Anniversary',
    rating: 5,
    text: 'We wanted something special for our 10th anniversary and CineHaven delivered beyond expectations. The Intimate Corner with candlelight dinner setup was so romantic. Felt like our first date all over again. The personalized video message from our kids was the cherry on top.',
    location: 'Delhi',
    date: '3 weeks ago',
    verified: true,
    likes: 31,
  },
  {
    id: 4,
    name: 'Priya Mehta',
    avatar: 'PM',
    avatarColor: 'from-amber to-amber-light',
    occasion: 'Date Night',
    rating: 5,
    text: 'Such a unique date night experience! The cozy setup with fairy lights, our favorite movie on the big screen, and gourmet popcorn made it incredibly special. We could rewind, pause, and just enjoy being together without any distractions.',
    location: 'Mumbai',
    date: '1 week ago',
    verified: true,
    likes: 12,
  },
  {
    id: 5,
    name: 'Vikram & Anjali',
    avatar: 'VA',
    avatarColor: 'from-sage to-sage-light',
    occasion: 'Anniversary',
    rating: 5,
    text: 'We have been to CineHaven three times now, and each experience has been better than the last. The attention to detail is remarkable — from the welcome drink to the customized photo backdrop. Truly the best private theatre experience in India.',
    location: 'Pune',
    date: '2 weeks ago',
    verified: true,
    likes: 45,
  },
  {
    id: 6,
    name: 'The Bangalore Squad',
    avatar: 'BS',
    avatarColor: 'from-crimson to-crimson-light',
    occasion: 'Friends Reunion',
    rating: 5,
    text: 'We booked the Party Zone for our college reunion. The fog entry, LED dance floor, and custom playlist had us dancing till midnight. Already planning our next visit! The staff even arranged a surprise cake cutting for us.',
    location: 'Bangalore',
    date: '3 months ago',
    verified: true,
    likes: 67,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 400 }}
        >
          <Star
            className={`h-3.5 w-3.5 ${i < rating ? 'text-amber fill-amber' : 'text-ink-light/20'}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);

  const visible = reviews.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const goToPage = useCallback((page: number, dir: number = 1) => {
    setDirection(dir);
    setCurrentPage(page);
  }, []);

  function next() {
    const nextPage = (currentPage + 1) % totalPages;
    goToPage(nextPage, 1);
  }

  function prev() {
    const prevPage = (currentPage - 1 + totalPages) % totalPages;
    goToPage(prevPage, -1);
  }

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentPage, isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-warm/30 to-cream py-20 sm:py-28 lg:py-32"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-burgundy/[0.025] blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-rosegold/[0.03] blur-[120px]" />
      <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-burgundy/20" />
      <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 rounded-full bg-rosegold/30" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-burgundy/[0.08] border border-burgundy/15 text-burgundy text-sm font-accent font-medium tracking-wide mb-6 sm:mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Guest Love
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
            What Our{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy via-burgundy to-burgundy-light">
                Guests Say
              </span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B1538" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#C75B7A" stopOpacity="0.25"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="mt-5 sm:mt-6 text-ink-secondary max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Real stories from real celebrations. Join <span className="text-burgundy font-semibold">12,000+</span> happy guests who made their moments magical at CineHaven.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12 sm:mb-16"
        >
          {[
            { value: '4.9', label: 'Average Rating', icon: Star },
            { value: '12K+', label: 'Happy Guests', icon: Heart },
            { value: '98%', label: 'Would Recommend', icon: Verified },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 border border-white/80 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy">
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-ink">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-ink-muted uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-3"
            >
              {visible.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <div className="relative h-full p-6 sm:p-7 lg:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 hover:border-burgundy/15 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(139,21,56,0.08)]">
                    
                    {/* Top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-burgundy/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quote icon */}
                    <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                      <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-burgundy/[0.06] group-hover:text-burgundy/[0.12] transition-all duration-500 rotate-12" />
                    </div>

                    {/* Header row: Rating + Verified + Date */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <StarRating rating={review.rating} />
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage/10 border border-sage/20 text-[10px] font-medium text-sage-dark">
                            <Verified className="h-2.5 w-2.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-accent uppercase tracking-[0.15em] text-ink-light/50 font-medium">
                        {review.date}
                      </span>
                    </div>

                    {/* Review Text */}
                    <div className="relative mb-6">
                      <p className="text-sm sm:text-[15px] text-ink-secondary leading-[1.75] line-clamp-5 group-hover:line-clamp-none transition-all duration-500">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>

                    {/* Author Section */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-surface-border/30">
                      {/* Avatar */}
                      <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${review.avatarColor} text-white text-sm font-bold shadow-sm shrink-0`}>
                        {review.avatar}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-ink truncate">{review.name}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="inline-flex items-center gap-1 text-[11px] text-ink-light">
                            <MapPin className="h-3 w-3" />
                            {review.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-ink-light/30 shrink-0" />
                          <span className="text-[11px] text-burgundy font-medium">{review.occasion}</span>
                        </div>
                      </div>

                      {/* Likes */}
                      <div className="flex items-center gap-1 text-xs text-ink-light/60 shrink-0">
                        <Heart className="h-3.5 w-3.5" />
                        <span className="font-medium">{review.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-10 sm:mt-12">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={prev}
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white border border-surface-border/60 text-ink-secondary hover:text-burgundy hover:border-burgundy/25 hover:shadow-md transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex gap-2.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2.5 rounded-full transition-all duration-400 ${
                    i === currentPage
                      ? 'w-8 bg-burgundy shadow-sm'
                      : 'w-2.5 bg-surface-border hover:bg-burgundy/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={next}
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white border border-surface-border/60 text-ink-secondary hover:text-burgundy hover:border-burgundy/25 hover:shadow-md transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center gap-2">
              <div className={`h-1 rounded-full transition-all duration-1000 ${isAutoPlaying ? 'w-8 bg-burgundy/30' : 'w-2 bg-surface-border'}`} />
              <span className="text-[10px] text-ink-light/40 uppercase tracking-wider">
                {isAutoPlaying ? 'Auto-playing' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}