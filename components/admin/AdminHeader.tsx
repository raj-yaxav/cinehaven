'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Search, User, Shield, CheckCircle2, CalendarCheck, Mail } from 'lucide-react';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AdminNotification {
  _id: string;
  type: 'contact' | 'booking' | 'lead' | 'system';
  title: string;
  message: string;
  href?: string;
  read: boolean;
  createdAt: string;
}

export default function AdminHeader() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    fetchAdminInfo();
    fetchNotifications();
  }, []);

  async function fetchAdminInfo() {
    try {
      const res = await fetch('/api/admin/auth/me');
      const json = await res.json();
      if (json.status === 'success') {
        setAdmin(json.data.admin);
      }
    } catch (error) {
      console.error('Failed to fetch admin info:', error);
    }
  }

  async function fetchNotifications() {
    try {
      const res = await fetch('/api/admin/notifications');
      const json = await res.json();
      if (json.status === 'success') {
        setNotifications(json.data.notifications);
        setUnreadCount(json.data.unreadCount);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }

  async function markNotificationsRead() {
    setIsNotificationsOpen((current) => !current);
    if (unreadCount === 0) return;

    try {
      await fetch('/api/admin/notifications', { method: 'PATCH' });
      setUnreadCount(0);
      setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error('Failed to mark notifications read:', error);
    }
  }

  const notificationIcons = {
    contact: Mail,
    booking: CalendarCheck,
    lead: CheckCircle2,
    system: Bell,
  };

  const roleColors: Record<string, string> = {
    super_admin: 'text-amber',
    admin: 'text-coral',
    manager: 'text-sage',
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-midnight/70 px-4 backdrop-blur-xl sm:px-6 md:px-8">
      {/* Search */}
      <div className="relative hidden w-80 lg:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dusty" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-ivory placeholder-dusty text-sm focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
        />
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={markNotificationsRead}
            className="relative p-2 rounded-lg bg-white/5 text-mist hover:text-amber hover:bg-amber/10 transition-all"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-h-5 min-w-5 rounded-full bg-coral px-1 text-white text-xs flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-xl border border-white/10 bg-midnight shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ivory">Notifications</p>
                  <p className="text-xs text-dusty">{unreadCount} unread</p>
                </div>
                <button onClick={fetchNotifications} className="text-xs text-amber hover:text-amber-light">
                  Refresh
                </button>
              </div>

              <div className="max-h-96 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-mist">No notifications yet.</div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type] || Bell;
                    const content = (
                      <div className={`flex gap-3 p-4 transition-colors hover:bg-white/[0.03] ${notification.read ? '' : 'bg-amber/[0.03]'}`}>
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10">
                          <Icon className="h-4 w-4 text-amber" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-ivory">{notification.title}</p>
                            {!notification.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />}
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-mist">{notification.message}</p>
                          <p className="mt-2 text-[11px] text-dusty">
                            {new Date(notification.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    );

                    return notification.href ? (
                      <Link key={notification._id} href={notification.href} onClick={() => setIsNotificationsOpen(false)}>
                        {content}
                      </Link>
                    ) : (
                      <div key={notification._id}>{content}</div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="h-9 w-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
            {admin?.avatar ? (
              <img src={admin.avatar} alt={admin.name} className="h-9 w-9 rounded-full" />
            ) : (
              <User className="h-4 w-4 text-amber" />
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-ivory">{admin?.name || 'Admin'}</p>
            <p className={`text-xs capitalize ${roleColors[admin?.role || 'admin']}`}>
              {admin?.role?.replace('_', ' ') || 'Admin'}
            </p>
          </div>
          <Shield className={`h-4 w-4 hidden sm:block ${roleColors[admin?.role || 'admin']}`} />
        </div>
      </div>
    </header>
  );
}
