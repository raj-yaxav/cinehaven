'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Film, 
  Heart, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight,
  Sparkles,
  Star,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  navigate: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Experiences' },
    { href: '/about', label: 'Our Story' },
    { href: '/my-booking', label: 'My Booking' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
  ],
  experiences: [
    { href: '/services?service=birthday', label: 'Birthday Celebrations' },
    { href: '/services?service=proposal', label: 'Proposal Packages' },
    { href: '/services?service=anniversary', label: 'Anniversary Specials' },
    { href: '/services?service=date-night', label: 'Date Nights' },
    { href: '/services?service=friends', label: 'Friends Party' },
    { href: '/services?service=corporate', label: 'Corporate Events' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-transparent border-t border-white/10">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-burgundy/20 to-transparent" />
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-burgundy/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rosegold/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative -mb-24 translate-y-0 z-10">
          <div className="rounded-2xl bg-gradient-to-br from-burgundy to-burgundy-dark p-8 lg:p-12 shadow-burgundy-glow-lg">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="max-w-lg">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-rosegold-light" />
                  <span className="text-sm font-accent uppercase tracking-[0.2em] text-rosegold-light">Stay Inspired</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white lg:text-3xl">
                  Get Celebration Ideas Delivered
                </h3>
                <p className="mt-2 text-rosegold-lighter/80 leading-relaxed">
                  Join 10,000+ couples and friend groups who get exclusive decor trends, package deals, and surprise ideas weekly.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur transition-all focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    subscribed 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'bg-white text-burgundy-dark hover:shadow-xl'
                  }`}
                >
                  {subscribed ? (
                    <>Subscribed!</>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Section */}
        <div className="pt-40 pb-12">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="group inline-flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-burgundy transition-transform group-hover:scale-110 group-hover:-rotate-3">
                  <Film className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-ink tracking-tight">Cine<span className="text-burgundy">Haven</span></span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-ink font-accent font-medium">Private Theatre</span>
                </div>
              </Link>
              
              <p className="text-sm text-ink leading-relaxed max-w-sm">
                India&apos;s most immersive private theatre experience. We transform ordinary movie nights into extraordinary celebrations for couples, friends, and everyone in between.
              </p>
              
              <div className="mt-6 flex gap-2">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-surface-border text-ink transition-all hover:text-burgundy hover:border-burgundy/30 hover:bg-burgundy-bg"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>

              {/* Rating badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-surface border border-surface-border px-4 py-2.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-3.5 w-3.5 ${star <= 4.9 ? 'text-amber fill-amber' : 'text-ink-muted'}`} />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-ink leading-tight">4.9 Rating</p>
                  <p className="text-[10px] text-ink leading-tight">12,000+ celebrations</p>
                </div>
              </div>
            </div>

            {/* Navigate */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-xs font-accent font-semibold uppercase tracking-[0.15em] text-burgundy mb-5">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.navigate.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink transition hover:text-burgundy"
                    >
                      <ChevronRight className="h-3 w-3 text-ink-muted transition-all group-hover:translate-x-0.5 group-hover:text-burgundy" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-accent font-semibold uppercase tracking-[0.15em] text-burgundy mb-5">
                Experiences
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.experiences.map((service) => (
                  <li key={service.href}>
                    <Link 
                      href={service.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink transition hover:text-burgundy"
                    >
                      <ChevronRight className="h-3 w-3 text-ink-muted transition-all group-hover:translate-x-0.5 group-hover:text-burgundy" />
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-accent font-semibold uppercase tracking-[0.15em] text-burgundy mb-5">
                Get in Touch
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-burgundy-bg border border-burgundy/10 shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-burgundy" />
                  </div>
                  <span className="text-sm text-ink leading-relaxed">
                    123 Linking Road, Bandra West<br />
                    Mumbai 400050, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-burgundy-bg border border-burgundy/10 shrink-0">
                    <Phone className="h-4 w-4 text-burgundy" />
                  </div>
                  <a href="tel:+919876543210" className="text-sm text-ink transition hover:text-burgundy">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-burgundy-bg border border-burgundy/10 shrink-0">
                    <Mail className="h-4 w-4 text-burgundy" />
                  </div>
                  <a href="mailto:hello@cinehaven.com" className="text-sm text-ink transition hover:text-burgundy">
                    hello@cinehaven.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-burgundy-bg border border-burgundy/10 shrink-0">
                    <Clock className="h-4 w-4 text-burgundy" />
                  </div>
                  <span className="text-sm text-ink">
                    Daily: 10AM - 11PM
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-ink flex items-center gap-1">
              &copy; {new Date().getFullYear()} CineHaven. Crafted with 
              <Heart className="h-3 w-3 text-rosegold fill-rosegold inline mx-0.5" /> 
              in Mumbai
            </p>
            
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-ink transition hover:text-burgundy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-ink transition hover:text-burgundy">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-xs text-ink transition hover:text-burgundy">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}