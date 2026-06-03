'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  MapPin,
  Users,
  Star,
  Download,
} from 'lucide-react';

interface Booking {
  _id: string;
  bookingId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  location: string;
  room: string;
  package: string;
  date: string;
  timeSlot: { start: string; end: string };
  guests: number;
  finalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  specialRequests?: string;
  createdAt: string;
  emailSent: boolean;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.bookingId.toLowerCase().includes(query) ||
          b.customerDetails?.name?.toLowerCase().includes(query) ||
          b.customerDetails?.email?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.bookingStatus === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchQuery, statusFilter, bookings]);

  async function fetchBookings() {
    try {
      const res = await fetch('/api/bookings');
      const json = await res.json();
      if (json.status === 'success') {
        setBookings(json.data);
        setFilteredBookings(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function confirmBooking(bookingId: string) {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/confirm`, { method: 'POST' });
      const json = await res.json();
      if (json.status !== 'success') {
        alert(json.message || 'Unable to confirm booking');
        return;
      }
      fetchBookings();
    } catch {
      alert('Unable to confirm booking');
    }
  }

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    pending_otp: { bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/20' },
    confirmed: { bg: 'bg-sage/10', text: 'text-sage', border: 'border-sage/20' },
    cancelled: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/20' },
    completed: { bg: 'bg-mist/10', text: 'text-mist', border: 'border-mist/20' },
    no_show: { bg: 'bg-white/5', text: 'text-dusty', border: 'border-white/10' },
  };

  const paymentColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-amber/10', text: 'text-amber' },
    paid: { bg: 'bg-sage/10', text: 'text-sage' },
    failed: { bg: 'bg-coral/10', text: 'text-coral' },
    refunded: { bg: 'bg-white/5', text: 'text-dusty' },
  };

  const exportToCSV = () => {
    const headers = ['Booking ID', 'Customer', 'Email', 'Phone', 'Location', 'Room', 'Package', 'Date', 'Guests', 'Amount', 'Status', 'Payment'];
    const rows = filteredBookings.map((b) => [
      b.bookingId,
      b.customerDetails?.name || '-',
      b.customerDetails?.email || '-',
      b.customerDetails?.phone || '-',
      b.location,
      b.room,
      b.package,
      new Date(b.date).toLocaleDateString('en-IN'),
      b.guests,
      b.finalAmount,
      b.bookingStatus,
      b.paymentStatus,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ivory">Bookings</h1>
          <p className="text-mist mt-1">Manage all customer bookings</p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber/30 bg-amber/10 text-amber hover:bg-amber/20 transition-all text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: bookings.length },
          { label: 'Confirmed', value: bookings.filter((b) => b.bookingStatus === 'confirmed').length, color: 'text-sage' },
          { label: 'Pending OTP', value: bookings.filter((b) => b.bookingStatus === 'pending_otp').length, color: 'text-amber' },
          { label: 'Completed', value: bookings.filter((b) => b.bookingStatus === 'completed').length, color: 'text-mist' },
          { label: 'Revenue', value: `₹${(bookings.reduce((s, b) => s + b.finalAmount, 0) / 100000).toFixed(1)}L`, color: 'text-amber' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color || 'text-ivory'}`}>{stat.value}</p>
            <p className="text-xs text-mist mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dusty" />
          <input
            type="text"
            placeholder="Search by booking ID, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-ivory placeholder-dusty focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending_otp', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                statusFilter === status
                  ? 'bg-amber/15 text-amber border border-amber/30'
                  : 'bg-white/5 text-mist border border-white/10 hover:border-white/20'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Booking</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Details</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Date</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Status</th>
                <th className="text-right px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-mist">
                    <CalendarCheck className="h-12 w-12 mx-auto mb-3 text-dusty" />
                    <p>No bookings found</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-mono font-medium text-amber">{booking.bookingId}</p>
                        <p className="text-xs text-dusty mt-1">
                          {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-ivory">{booking.customerDetails?.name || '-'}</p>
                        <p className="text-xs text-mist">{booking.customerDetails?.email}</p>
                        <p className="text-xs text-mist">{booking.customerDetails?.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-mist flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-dusty" />
                          {booking.location}
                        </p>
                        <p className="text-sm text-mist flex items-center gap-2">
                          <Star className="h-3 w-3 text-dusty" />
                          {booking.room}
                        </p>
                        <p className="text-sm text-mist flex items-center gap-2">
                          <Users className="h-3 w-3 text-dusty" />
                          {booking.guests} guests
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-ivory">
                          {new Date(booking.date).toLocaleDateString('en-IN')}
                        </p>
                        <p className="text-xs text-mist">
                          {booking.timeSlot?.start} - {booking.timeSlot?.end}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-ivory">₹{booking.finalAmount?.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${paymentColors[booking.paymentStatus]?.bg} ${paymentColors[booking.paymentStatus]?.text}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.bookingStatus]?.bg} ${statusColors[booking.bookingStatus]?.text} ${statusColors[booking.bookingStatus]?.border}`}>
                        {booking.bookingStatus.replace('_', ' ')}
                      </span>
                      {booking.emailSent && (
                        <p className="text-xs text-sage mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Email sent
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg bg-white/5 text-mist hover:text-amber hover:bg-amber/10 transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                        {booking.bookingStatus !== 'confirmed' && (
                          <button
                            onClick={() => confirmBooking(booking._id)}
                            className="p-2 rounded-lg bg-white/5 text-mist hover:text-sage hover:bg-sage/10 transition-all"
                            title="Confirm booking and lock slot"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
