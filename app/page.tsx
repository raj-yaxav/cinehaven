import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AIPlanner from '../components/AIPlanner';
import { 
  HeroSection, 
  LiveSocialProof, 
  MoodSelector, 
  FeaturedRooms, 
  MemoryWall, 
  Testimonials, 
  PressLogos,
  CTASection 
} from '../components/home';

export const metadata: Metadata = {
  title: 'CineHaven — Where Every Moment Deserves the Big Screen',
  description: 'Book an exclusive private cinema for birthdays, proposals, anniversaries & more. Premium sound, curated decor, unforgettable memories. India\'s finest private theatre experience.',
  keywords: ['private theatre', 'cinema booking', 'birthday celebration', 'proposal venue', 'anniversary celebration', 'private screening', 'luxury cinema', 'CineHaven', 'couple date night', 'friends party'],
  authors: [{ name: 'CineHaven' }],
  openGraph: {
    title: 'CineHaven — Where Every Moment Deserves the Big Screen',
    description: 'Book an exclusive private cinema for birthdays, proposals, anniversaries & more. Premium sound, curated decor, unforgettable memories.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'CineHaven',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'CineHaven — Premium Private Theatre Experience',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineHaven — Premium Private Theatre Booking',
    description: 'Book an exclusive private cinema for birthdays, proposals, anniversaries & more.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://cinehaven.in',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  name: 'CineHaven',
  description: 'Premium private theatre booking platform for celebrations, date nights, and special occasions',
  url: 'https://cinehaven.in',
  logo: 'https://cinehaven.in/logo.png',
  image: 'https://cinehaven.in/og-image.jpg',
  telephone: '+91-9876543210',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  priceRange: '₹₹₹',
  openingHours: 'Mo-Su 10:00-23:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <main className="min-h-screen bg-midnight text-ivory overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Live Social Proof Bar */}
        <LiveSocialProof />
        
        {/* AI Celebration Planner */}
        <section className="relative section-padding bg-vibe-romantic">
          <div className="mx-auto max-w-[1400px] px-1 lg:px-8">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block font-accent text-sm uppercase tracking-[0.3em] text-amber">
                Smart Planning
              </span>
              <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl text-balance">
                Let AI Plan Your <span className="text-gradient-amber">Perfect</span> Celebration
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-mist text-balance">
                Whether it's a romantic surprise or a wild friends' night out, our AI matches you with the ideal room, decor, and vibe.
              </p>
            </div>
            <Suspense fallback={
              <div className="h-96 rounded-3xl glass-card shimmer" />
            }>
              <AIPlanner />
            </Suspense>
          </div>
        </section>

        {/* Mood Selector */}
        <MoodSelector />

        {/* Featured Rooms Carousel */}
        <FeaturedRooms />

        {/* Memory Wall */}
        <MemoryWall />

        {/* Testimonials */}
        <Testimonials />

        {/* Press / As Seen In */}
        <PressLogos />

        {/* Final CTA */}
        <CTASection />
      </main>
    </>
  );
}