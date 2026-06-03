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

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-midnight/95 backdrop-blur-xl z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
            <Film className="h-5 w-5 text-amber" />
          </div>
          <div>
            <p className="text-lg font-display font-bold text-ivory tracking-wide">CINEHAVEN</p>
            <p className="text-[10px] text-dusty uppercase tracking-[0.3em]">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber/10 text-amber border border-amber/20'
                  : 'text-mist hover:bg-white/5 hover:text-ivory border border-transparent'
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

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-dusty hover:text-coral hover:bg-coral/5 transition-all w-full disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
