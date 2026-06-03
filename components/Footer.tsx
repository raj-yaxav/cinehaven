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
  Star
} from 'lucide-react';
import { useState } from 'react';

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

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Experiences' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
  ];

  const services = [
    { href: '/services?service=birthday', label: 'Birthday Celebrations' },
    { href: '/services?service=proposal', label: 'Proposal Packages' },
    { href: '/services?service=anniversary', label: 'Anniversary Specials' },
    { href: '/services?service=date-night', label: 'Date Nights' },
    { href: '/services?service=friends', label: 'Friends Party' },
    { href: '/services?service=corporate', label: 'Corporate Events' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative overflow-hidden bg-velvet border-t border-amber/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-amber/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/5 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-mauve to-white p-8 lg:p-12 border border-black/4">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-lg">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber" />
                <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Stay Inspired</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ivory lg:text-3xl">
                Get Celebration Ideas Delivered
              </h3>
              <p className="mt-3 text-mist">
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
                  className="input-velvet w-full"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                  subscribed 
                    ? 'bg-sage/20 text-sage border border-sage/30' 
                    : 'bg-gradient-to-r from-amber to-amber-dark text-midnight hover:shadow-burgundy-glow'
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

        {/* Main Footer Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-amber-dark transition-transform group-hover:scale-110">
                <Film className="h-6 w-6 text-midnight" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-ivory">CineHaven</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber font-accent">Private Theatre</span>
              </div>
            </Link>
            
            <p className="text-mist leading-relaxed max-w-sm">
              India's most immersive private theatre experience. We transform ordinary movie nights into extraordinary celebrations for couples, friends, and everyone in between.
            </p>
            
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-mauve/60 border border-black/4 text-mist transition hover:text-amber hover:border-amber/30"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-accent font-semibold uppercase tracking-[0.15em] text-amber mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-2 text-mist transition hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-amber transition-all group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-accent font-semibold uppercase tracking-[0.15em] text-amber mb-6">
              Experiences
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className="group flex items-center gap-2 text-mist transition hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-amber transition-all group-hover:w-3" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-accent font-semibold uppercase tracking-[0.15em] text-amber mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber/70 mt-0.5 shrink-0" />
                <span className="text-mist text-sm leading-relaxed">
                  123 Linking Road, Bandra West<br />
                  Mumbai 400050, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber/70 shrink-0" />
                <a href="tel:+919876543210" className="text-mist text-sm transition hover:text-amber">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber/70 shrink-0" />
                <a href="mailto:hello@cinehaven.com" className="text-mist text-sm transition hover:text-amber">
                  hello@cinehaven.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber/70 shrink-0" />
                <span className="text-mist text-sm">
                  Daily: 10AM - 11PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-dusty flex items-center gap-1">
            © {new Date().getFullYear()} CineHaven. Crafted with 
            <Heart className="h-3 w-3 text-coral fill-coral inline" /> 
            in Mumbai
          </p>
          
          <div className="flex items-center gap-2 text-dusty text-sm">
            <Star className="h-3 w-3 text-amber fill-amber" />
            <span>4.9 rating from 12,000+ celebrations</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-dusty transition hover:text-mist">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-dusty transition hover:text-mist">
              Terms
            </Link>
            <Link href="/sitemap" className="text-sm text-dusty transition hover:text-mist">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}