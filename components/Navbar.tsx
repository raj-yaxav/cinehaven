// components/Navbar.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Film, 
  Home, 
  Layers, 
  Calendar, 
  Users, 
  Mail, 
  FileText,
  Sparkles,
  ArrowUpRight,
  TicketCheck
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Layers },
  { href: '/my-booking', label: 'My Booking', icon: TicketCheck },
  { href: '/about', label: 'About', icon: Users },
  { href: '/blog', label: 'Blog', icon: FileText },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const ctaLink = { href: '/book', label: 'Book Now', icon: Calendar };

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 40 },
  open: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const tickingRef = useRef(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleMenu = useCallback(() => setIsMobileMenuOpen(v => !v), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  if (isAdminRoute) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl border-b border-surface-border shadow-soft-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] sm:h-[72px] items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative">
              <motion.div 
                className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-burgundy overflow-hidden shadow-burgundy-glow-sm"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Film className="h-4 w-4 sm:h-5 sm:w-5 text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.div>
              
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-display font-bold text-ink tracking-tight group-hover:text-burgundy transition-colors duration-300">
                  Cine<span className="text-burgundy">Haven</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-accent uppercase tracking-[0.25em] text-ink-muted -mt-0.5 hidden sm:block">
                  Private Theatre
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative group px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-burgundy'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </span>
                    
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'opacity-100 scale-100 bg-burgundy-bg border border-burgundy/10'
                          : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 bg-burgundy-bg border border-burgundy/10'
                      }`}
                    />
                    
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-burgundy" />
                    )}
                  </Link>
                );
              })}

              {/* CTA Button */}
              <Link
                href={ctaLink.href}
                className="group relative ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-burgundy text-white text-sm font-semibold shadow-burgundy-glow-sm hover:shadow-burgundy-glow transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calendar className="h-4 w-4" />
                <span>{ctaLink.label}</span>
                <Sparkles className="h-3 w-3 animate-pulse" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-burgundy-bg border border-burgundy/10 flex items-center justify-center text-ink hover:bg-burgundy/10 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-burgundy" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] sm:max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 h-[60px] sm:h-[72px] border-b border-surface-border flex-shrink-0">
                <span className="font-display font-bold text-base sm:text-lg text-ink">Menu</span>
                <motion.button
                  onClick={closeMenu}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-burgundy-bg flex items-center justify-center text-burgundy"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-1.5 sm:space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-burgundy-bg text-burgundy border border-burgundy/15'
                            : 'text-ink-secondary hover:bg-cream-warm hover:text-ink'
                        }`}
                      >
                        <div className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl ${
                          isActive ? 'bg-burgundy/10' : 'bg-cream-warm'
                        }`}>
                          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-burgundy' : 'text-ink-muted'}`} />
                        </div>
                        <span className="flex-1">{link.label}</span>
                        <ArrowUpRight className={`h-4 w-4 transition-transform ${
                          isActive ? 'text-burgundy' : 'text-ink-light'
                        }`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-5 border-t border-surface-border space-y-3 sm:space-y-4">
                <motion.div variants={itemVariants}>
                  <Link
                    href={ctaLink.href}
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gradient-burgundy text-white text-sm sm:text-base font-semibold shadow-burgundy-glow-sm"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    {ctaLink.label}
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <p className="text-[10px] sm:text-xs text-ink-muted text-center leading-relaxed">
                    India&apos;s Most Immersive Private Theatre Experience
                  </p>
                  <div className="flex justify-center mt-2 sm:mt-2.5">
                    <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-ink-light">
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-teal animate-pulse" />
                      Available Now
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
