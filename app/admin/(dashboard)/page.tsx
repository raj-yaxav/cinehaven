'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Film,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalBookings: number;
  totalLeads: number;
  totalRevenue: number;
  pendingBookings: number;
  confirmedBookings: number;
  newLeads: number;
  convertedLeads: number;
  todayBookings: number;
  weeklyGrowth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalLeads: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    newLeads: 0,
    convertedLeads: 0,
    todayBookings: 0,
    weeklyGrowth: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [bookingsRes, leadsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/leads'),
      ]);

      const bookingsJson = await bookingsRes.json();
      const leadsJson = await leadsRes.json();

      const bookings = bookingsJson.data || [];
      const leads = leadsJson.data || [];

      // Calculate stats
      const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (b.finalAmount || 0), 0);
      const pendingBookings = bookings.filter((b: any) => b.bookingStatus === 'pending_otp').length;
      const confirmedBookings = bookings.filter((b: any) => b.bookingStatus === 'confirmed').length;
      const newLeads = leads.filter((l: any) => l.status === 'new').length;
      const convertedLeads = leads.filter((l: any) => l.status === 'converted').length;

      const today = new Date().toDateString();
      const todayBookings = bookings.filter((b: any) => 
        new Date(b.createdAt).toDateString() === today
      ).length;

      setStats({
        totalBookings: bookings.length,
        totalLeads: leads.length,
        totalRevenue,
        pendingBookings,
        confirmedBookings,
        newLeads,
        convertedLeads,
        todayBookings,
        weeklyGrowth: 12.5, // Mock - calculate from real data
      });

      setRecentBookings(bookings.slice(0, 5));
      setRecentLeads(leads.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: 'amber',
      change: '+8%',
      changeUp: true,
      link: '/admin/bookings',
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'coral',
      change: '+12%',
      changeUp: true,
      link: '/admin/leads',
    },
    {
      title: 'Revenue',
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'sage',
      change: '+15%',
      changeUp: true,
      link: '/admin/analytics',
    },
    {
      title: 'Pending OTP',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'mist',
      change: '-3%',
      changeUp: false,
      link: '/admin/bookings',
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    amber: { bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/20', iconBg: 'bg-amber/20' },
    coral: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/20', iconBg: 'bg-coral/20' },
    sage: { bg: 'bg-sage/10', text: 'text-sage', border: 'border-sage/20', iconBg: 'bg-sage/20' },
    mist: { bg: 'bg-white/5', text: 'text-mist', border: 'border-white/10', iconBg: 'bg-white/10' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-ivory">Dashboard</h1>
        <p className="text-mist mt-1">Welcome back! Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const colors = colorMap[stat.color];
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.link}>
                <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 hover:border-opacity-50 transition-all cursor-pointer group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-medium ${stat.changeUp ? 'text-sage' : 'text-coral'}`}>
                      {stat.changeUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-ivory mb-1">{stat.value}</p>
                  <p className="text-sm text-mist">{stat.title}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <Film className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-sm text-mist">Today&apos;s Bookings</p>
              <p className="text-2xl font-bold text-ivory">{stats.todayBookings}</p>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-amber rounded-full" style={{ width: `${Math.min(stats.todayBookings * 10, 100)}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-coral/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-coral" />
            </div>
            <div>
              <p className="text-sm text-mist">New Leads</p>
              <p className="text-2xl font-bold text-ivory">{stats.newLeads}</p>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-coral rounded-full" style={{ width: `${Math.min(stats.newLeads * 10, 100)}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-sage/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-sage" />
            </div>
            <div>
              <p className="text-sm text-mist">Converted Leads</p>
              <p className="text-2xl font-bold text-ivory">{stats.convertedLeads}</p>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-sage rounded-full" style={{ width: `${Math.min(stats.convertedLeads * 10, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ivory">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-sm text-amber hover:text-amber-light transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-mist text-center py-8">No bookings yet</p>
            ) : (
              recentBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      booking.bookingStatus === 'confirmed' ? 'bg-sage/10' : 'bg-amber/10'
                    }`}>
                      {booking.bookingStatus === 'confirmed' ? (
                        <CheckCircle2 className="h-5 w-5 text-sage" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">{booking.bookingId}</p>
                      <p className="text-xs text-mist">
                        {booking.customerDetails?.name || 'Unknown'} • {booking.guests} guests
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ivory">₹{booking.finalAmount?.toLocaleString()}</p>
                    <p className="text-xs text-dusty">
                      {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ivory">Recent Leads</h3>
            <Link href="/admin/leads" className="text-sm text-amber hover:text-amber-light transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length === 0 ? (
              <p className="text-mist text-center py-8">No leads yet</p>
            ) : (
              recentLeads.map((lead, index) => (
                <motion.div
                  key={lead._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-coral/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      lead.status === 'new' ? 'bg-coral/10' : 'bg-sage/10'
                    }`}>
                      <Users className={`h-5 w-5 ${lead.status === 'new' ? 'text-coral' : 'text-sage'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">{lead.name}</p>
                      <p className="text-xs text-mist">{lead.email} • {lead.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' 
                        ? 'bg-coral/10 text-coral border border-coral/20' 
                        : lead.status === 'contacted'
                        ? 'bg-amber/10 text-amber border border-amber/20'
                        : 'bg-sage/10 text-sage border border-sage/20'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
