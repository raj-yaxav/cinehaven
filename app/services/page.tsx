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
    <main className="min-h-screen overflow-x-hidden">
      <div>
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
