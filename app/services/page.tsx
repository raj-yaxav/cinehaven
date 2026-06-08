import type { Metadata } from 'next';
import { Suspense } from 'react';
import { 
  HeroSection, 
  ServiceBento, 
  // MoodSelector, 
  PackageComparison, 
  AddOnsSection, 
  TestimonialsSection, 
  FAQAccordion, 
  // CTASection 
} from '../../components/services';
import { MoodSelector } from '../../components/home';

export const metadata: Metadata = {
  title: 'Experiences — CineHaven Private Theatre',
  description: 'Explore our curated celebration experiences. Birthdays, proposals, anniversaries, date nights, friends parties & corporate events.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-midnight text-ivory overflow-x-hidden relative">
      {/* Full-page Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 sm:opacity-55"
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dq3typk9u/image/upload/v1780913960/cinehaven/hero-services.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-midnight/60 to-midnight/95" />
        <div className="absolute top-0 left-1/4 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-coral/8 blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[150px] w-[150px] sm:h-[300px] sm:w-[300px] rounded-full bg-amber/8 blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ServiceBento />
        {/* <MoodSelector /> */}
        <PackageComparison />
        <AddOnsSection />
        <TestimonialsSection />
        <FAQAccordion />
        {/* <CTASection /> */}
      </div>
    </main>
  );
}