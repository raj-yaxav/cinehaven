'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Menu, Play, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/my-booking', label: 'My Booking' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <header className="celebration-nav fixed inset-x-0 top-0 z-50 bg-transparent px-3 sm:px-6">
        <nav className="celebration-nav-card relative mx-auto flex h-[68px] max-w-[1785px] items-center rounded-b-2xl border-x border-b border-[var(--celebration-border)] bg-white px-4 shadow-[0_10px_28px_rgba(30,12,39,0.14)] sm:h-[104px] sm:rounded-b-[30px] sm:px-8" aria-label="Primary navigation">
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="CelebrationFlix home">
            <span className="celebration-brand-mark bg-celebration-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-[0_8px_18px_var(--celebration-glow)] transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Play className="h-4 w-4 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="celebration-brand-name text-[1.25rem] font-bold leading-none tracking-[-0.06em] text-[var(--celebration-ink)] sm:text-[2.25rem]">celebration<span className="text-[var(--celebration-primary)]">flix</span></span>
              <span className="mt-1 hidden text-[13px] font-medium leading-none text-[var(--celebration-muted)] sm:block">Your Celebration Destination</span>
            </span>
          </Link>

          <div className="celebration-nav-links absolute left-1/2 hidden h-full -translate-x-1/2 items-center justify-center gap-6 lg:flex xl:gap-9">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return <Link key={link.href} href={link.href} className={`celebration-nav-item relative flex min-h-11 items-center justify-center whitespace-nowrap px-1 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] focus-visible:ring-offset-4 min-[1700px]:text-[17px] ${active ? 'text-[var(--celebration-primary)]' : 'text-[var(--celebration-ink)] hover:text-[var(--celebration-primary)]'}`}>
                <span>{link.label}</span>
                {active && <span className="absolute bottom-0 left-1/2 h-[3px] w-full -translate-x-1/2 rounded-full bg-[var(--celebration-primary)]" />}
              </Link>;
            })}
          </div>

          <Link href="/book" className="celebration-nav-cta bg-celebration-gradient ml-auto hidden min-h-[58px] min-w-[154px] items-center justify-center gap-3 rounded-xl px-6 py-3 text-[17px] font-semibold text-white shadow-[0_10px_22px_var(--celebration-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_var(--celebration-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] focus-visible:ring-offset-4 lg:inline-flex">
            <CalendarDays className="h-5 w-5" /> Book Now
          </Link>

          <button type="button" className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--celebration-border)] bg-white text-[var(--celebration-ink)] transition-colors hover:bg-[var(--celebration-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celebration-primary)] lg:hidden" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="fixed inset-x-3 top-[76px] z-40 rounded-2xl border border-[var(--celebration-border)] bg-white px-4 py-5 shadow-xl sm:inset-x-6 sm:top-[112px] lg:hidden">
          <div className="mx-auto grid max-w-md gap-1">
            {navLinks.map((link) => <Link key={link.href} href={link.href} className={`min-h-11 rounded-xl px-4 py-3 text-base font-medium transition-colors ${pathname === link.href ? 'bg-[var(--celebration-soft)] text-[var(--celebration-primary)]' : 'text-[var(--celebration-ink)] hover:bg-[var(--celebration-soft)]'}`}>{link.label}</Link>)}
            <Link href="/book" className="bg-celebration-gradient mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"><CalendarDays className="h-5 w-5" /> Book Now</Link>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
