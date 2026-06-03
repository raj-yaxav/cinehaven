'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BarChart3,
  Settings,
  Film,
  LogOut,
  Loader2,
  BookOpen,
  Building2,
  CalendarClock,
  Gift,
  Menu,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/theatres', label: 'Theatres', icon: Building2 },
  { href: '/admin/availability', label: 'Availability', icon: CalendarClock },
  { href: '/admin/addons', label: 'Add-ons', icon: Gift },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'border-amber/25 bg-amber/10 text-amber shadow-sm shadow-amber/10'
                  : 'border-transparent text-mist hover:border-amber/15 hover:bg-white/70 hover:text-ivory'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto h-2 w-2 rounded-full bg-amber"
                />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  function Brand({ closeButton = false }: { closeButton?: boolean }) {
    return (
      <div className="border-b border-amber/10 p-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/admin" onClick={() => setIsMobileOpen(false)} className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber/20 bg-amber/10">
              <Film className="h-5 w-5 text-amber" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-display font-bold tracking-wide text-ivory">CINEHAVEN</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-dusty">Admin Panel</p>
            </div>
          </Link>
          {closeButton && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg border border-amber/15 bg-white/70 p-2 text-mist hover:text-ivory"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  function LogoutButton() {
    return (
      <div className="border-t border-amber/10 p-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-dusty transition-all hover:bg-coral/5 hover:text-coral disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <>
    <button
      onClick={() => setIsMobileOpen(true)}
      className="fixed left-4 top-4 z-50 rounded-xl border border-amber/20 bg-white/90 p-2 text-ivory shadow-burgundy-glow-sm backdrop-blur md:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>

    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-amber/15 bg-cream/95 shadow-card-lift backdrop-blur-xl md:flex">
      <Brand />
      <NavLinks />
      <LogoutButton />
    </aside>

    {isMobileOpen && (
      <div className="fixed inset-0 z-50 md:hidden">
        <button
          className="absolute inset-0 bg-black/35 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close admin menu"
        />
        <aside className="relative flex h-full w-72 max-w-[86vw] flex-col border-r border-amber/15 bg-cream shadow-2xl shadow-black/20">
          <Brand closeButton />
          <NavLinks onNavigate={() => setIsMobileOpen(false)} />
          <LogoutButton />
        </aside>
      </div>
    )}
    </>
  );
}
