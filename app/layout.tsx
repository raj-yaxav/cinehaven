import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';
import { ScrollProgress } from '../components/ScrollProgress';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'CineHaven — Private Theatre Celebrations | Birthdays, Proposals & More',
  description: 'Book an exclusive private cinema experience for birthdays, proposals, anniversaries & special occasions. Premium sound, curated decor, unforgettable memories. India\'s finest private theatre.',
  keywords: ['private theatre', 'cinema booking', 'birthday celebration', 'proposal venue', 'anniversary celebration', 'private screening', 'luxury cinema', 'CineHaven', 'date night', 'friends party'],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-midnight text-ivory font-body antialiased selection:bg-amber/30 selection:text-white">
        <ScrollProgress />
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}