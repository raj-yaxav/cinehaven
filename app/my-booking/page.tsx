'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  CreditCard,
  Package,
  TicketCheck,
  ChevronRight,
  Loader2,
  AlertCircle,
  Film,
  Sparkles,
  Smartphone,
  Mail,
  CheckCircle2,
  Receipt,
  ArrowRight,
  Ticket,
  Clock3,
  ShieldCheck,
  Printer,
  Download,
  X,
  Copy,
  Check,
  Armchair,
  Popcorn,
} from 'lucide-react';

interface PopulatedRef {
  _id: string;
  name?: string;
  city?: string;
  tier?: string;
  price?: number;
}

interface BookingData {
  _id: string;
  bookingId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  location: PopulatedRef;
  room: PopulatedRef;
  package: PopulatedRef;
  date: string;
  timeSlot: { start: string; end: string };
  guests: number;
  addOns: { addon: PopulatedRef; quantity: number }[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  specialRequests?: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: any; gradient: string }> = {
  pending_otp: { 
    label: 'Pending OTP', 
    color: 'text-crimson', 
    bg: 'bg-crimson/10', 
    border: 'border-crimson/20',
    icon: Clock3,
    gradient: 'from-crimson/5 to-crimson/[0.02]'
  },
  confirmed: { 
    label: 'Confirmed', 
    color: 'text-crimson', 
    bg: 'bg-crimson/10', 
    border: 'border-crimson/20',
    icon: CheckCircle2,
    gradient: 'from-crimson/5 to-crimson/[0.02]'
  },
  cancelled: { 
    label: 'Cancelled', 
    color: 'text-crimson', 
    bg: 'bg-crimson/10', 
    border: 'border-crimson/20',
    icon: AlertCircle,
    gradient: 'from-crimson/5 to-crimson/[0.02]'
  },
  completed: { 
    label: 'Completed', 
    color: 'text-crimson-light', 
    bg: 'bg-crimson/10', 
    border: 'border-crimson/20',
    icon: CheckCircle2,
    gradient: 'from-crimson/5 to-crimson/[0.02]'
  },
  no_show: { 
    label: 'No Show', 
    color: 'text-crimson', 
    bg: 'bg-crimson/10', 
    border: 'border-crimson/20',
    icon: Clock3,
    gradient: 'from-crimson/5 to-crimson/[0.02]'
  },
};

const paymentConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-crimson', bg: 'bg-crimson/10' },
  paid: { label: 'Paid', color: 'text-crimson', bg: 'bg-crimson/10' },
  failed: { label: 'Failed', color: 'text-crimson', bg: 'bg-crimson/10' },
  refunded: { label: 'Refunded', color: 'text-crimson-light', bg: 'bg-crimson/10' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

function formatTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

// Backdrop click handler hook
function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lock]);
}

export default function MyBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useLockBodyScroll(showModal);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = bookingId.trim();
    if (!id) return;

    setLoading(true);
    setError('');
    setBooking(null);
    setShowModal(false);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(id)}`);
      const json = await res.json();
      if (json.status === 'success') {
        setBooking(json.data);
        setTimeout(() => setShowModal(true), 300);
      } else {
        setError(json.message || 'Booking not found');
      }
    } catch {
      setError('Unable to look up booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setTimeout(() => setBooking(null), 300);
  }

  function copyBookingId() {
    if (booking?.bookingId) {
      navigator.clipboard.writeText(booking.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        {/* Main background image - replace src with your generated image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/dq3typk9u/image/upload/v1780913962/cinehaven/my-booking.png')`,
          }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-burgundy/5 via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-burgundy/[0.03] blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[5%] w-80 h-80 rounded-full bg-rosegold/[0.03] blur-[120px]"
        />
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-burgundy/20" />
        <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-rosegold/30" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-amber/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-burgundy/[0.08] border border-burgundy/15 text-burgundy text-sm font-accent font-medium tracking-wide mb-6 sm:mb-8 backdrop-blur-sm"
              >
                <TicketCheck className="h-4 w-4" />
                Booking Lookup
              </motion.div>
              
              <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-ink tracking-tight leading-[1.1]">
                Find Your{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy via-burgundy to-burgundy-light">
                    Booking
                  </span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B1538" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#C75B7A" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed font-light px-4">
                Enter your booking ID to view your reservation details, manage add-ons, and track your booking status in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Form */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl sm:max-w-2xl mx-auto"
            >
              <div className="relative">
                {/* Glow effect behind search */}
                <div className="absolute -inset-2 bg-gradient-to-r from-burgundy/10 via-rosegold/10 to-burgundy/10 rounded-[2rem] blur-2xl opacity-60" />
                
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted/80" />
                      <input
                        type="text"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        placeholder="Enter booking ID (e.g. CH-XXXX-XXXX)"
                        className="w-full pl-12 pr-4 py-3.5 sm:py-4 text-sm sm:text-base bg-white/80 border-0 outline-none placeholder:text-ink-muted/70 text-ink font-medium rounded-xl sm:rounded-2xl"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading || !bookingId.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-burgundy/20 flex items-center justify-center gap-2 font-medium text-sm sm:text-base whitespace-nowrap"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span>Look Up</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Quick hints */}
              {!booking && !error && !loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-ink-secondary/80"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Secure lookup
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    Real-time status
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Receipt className="h-3.5 w-3.5" />
                    Instant details
                  </span>
                </motion.div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="mt-5 sm:mt-6 flex items-start gap-3 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl bg-red-50/90 border border-red-200/60 text-red-700 backdrop-blur-sm"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Unable to load booking</p>
                      <p className="text-xs text-red-600/80 mt-0.5">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {!booking && !error && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 sm:mt-24 text-center"
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-burgundy/[0.08] to-burgundy/[0.02] border border-burgundy/10 mb-6 sm:mb-8 shadow-sm"
                >
                  <Ticket className="h-9 w-9 sm:h-11 sm:w-11 text-burgundy/30" />
                </motion.div>
                
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3">Enter Your Booking ID</h3>
                <p className="text-ink-secondary max-w-sm sm:max-w-md mx-auto leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base px-4">
                  Your booking ID was sent to your email after confirmation. It looks like{' '}
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-burgundy bg-burgundy/[0.06] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-burgundy/10 font-medium">
                    <TicketCheck className="h-3.5 w-3.5" />
                    CH-XXXX-XXXX
                  </span>
                </p>
                
                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg sm:max-w-2xl mx-auto px-4">
                  {[
                    { icon: ShieldCheck, title: 'Secure', desc: 'Encrypted lookup' },
                    { icon: Clock3, title: 'Instant', desc: 'Real-time updates' },
                    { icon: Receipt, title: 'Detailed', desc: 'Full breakdown' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="p-4 sm:p-5 rounded-2xl bg-white/60 border border-white/70 backdrop-blur-sm hover:bg-white/80 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-burgundy/40 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showModal && booking && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-md"
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 60, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-3xl bg-cream rounded-none sm:rounded-[2rem] shadow-2xl shadow-ink/20 overflow-hidden my-0 sm:my-8"
              >
                {/* Modal Header with Status */}
                <div className={`relative px-5 sm:px-8 pt-6 sm:pt-8 pb-6 bg-gradient-to-br ${statusConfig[booking.bookingStatus]?.gradient || 'from-ink-muted/5 to-ink-muted/[0.02]'} border-b border-surface-border/40`}>
                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-white/80 border border-surface-border/40 text-ink-muted hover:text-burgundy hover:border-burgundy/20 transition-colors z-10"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pr-10 sm:pr-0">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${statusConfig[booking.bookingStatus]?.bg || 'bg-ink-muted/10'} border ${statusConfig[booking.bookingStatus]?.border || 'border-ink-muted/20'} shrink-0`}>
                        {(() => {
                          const StatusIcon = statusConfig[booking.bookingStatus]?.icon || CheckCircle2;
                          return <StatusIcon className={`h-6 w-6 sm:h-7 sm:w-7 ${statusConfig[booking.bookingStatus]?.color || 'text-ink-secondary'}`} />;
                        })()}
                      </div>
                      <div>
                        <h2 className={`text-xl sm:text-2xl font-bold ${statusConfig[booking.bookingStatus]?.color || 'text-ink-secondary'}`}>
                          {statusConfig[booking.bookingStatus]?.label || booking.bookingStatus}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${paymentConfig[booking.paymentStatus]?.bg || 'bg-ink-muted/10'} ${paymentConfig[booking.paymentStatus]?.color || 'text-ink-secondary'} border-current/20`}>
                            {paymentConfig[booking.paymentStatus]?.label || booking.paymentStatus}
                          </span>
                          <span className="text-xs text-ink-muted">•</span>
                          <span className="text-xs text-ink-muted">Booked {formatShortDate(booking.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Booking ID with copy */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm text-ink-secondary bg-white/80 px-3 sm:px-4 py-2 rounded-xl border border-surface-border/60 font-medium tracking-wider">
                        {booking.bookingId}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyBookingId}
                        className="p-2 rounded-xl bg-white/80 border border-surface-border/60 text-ink-muted hover:text-burgundy hover:border-burgundy/20 transition-colors"
                        title="Copy booking ID"
                      >
                        {copied ? <Check className="h-4 w-4 text-sage-dark" /> : <Copy className="h-4 w-4" />}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="px-5 sm:px-8 py-6 sm:py-8 max-h-[70vh] sm:max-h-[65vh] overflow-y-auto custom-scrollbar">
                  <div className="grid gap-6 sm:gap-8">
                    
                    {/* Schedule Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-6 w-1 rounded-full bg-burgundy/40" />
                        <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Schedule</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Date</p>
                            <p className="text-xs sm:text-sm font-bold text-ink leading-snug truncate">{formatDate(booking.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Time</p>
                            <p className="text-xs sm:text-sm font-bold text-ink">
                              {booking.timeSlot ? `${formatTime(booking.timeSlot.start)} — ${formatTime(booking.timeSlot.end)}` : 'Time TBD'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Venue Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-6 w-1 rounded-full bg-burgundy/40" />
                        <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Venue</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Location</p>
                            <p className="text-xs sm:text-sm font-bold text-ink truncate">
                              {booking.location?.name || 'N/A'}
                              {booking.location?.city ? <span className="text-ink-muted font-normal">, {booking.location.city}</span> : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <Film className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Room</p>
                            <p className="text-xs sm:text-sm font-bold text-ink truncate">{booking.room?.name || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Package Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-6 w-1 rounded-full bg-burgundy/40" />
                        <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Package Details</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Package</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-ink truncate">{booking.package?.name || 'N/A'}</span>
                              {booking.package?.tier && (
                                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-accent font-bold px-2 py-0.5 rounded-full bg-crimson/10 text-crimson border border-crimson/20">
                                  {booking.package.tier}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cream-warm/50 border border-white/60">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/[0.08] text-burgundy shrink-0">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-[11px] text-ink-secondary font-accent uppercase tracking-[0.15em] font-semibold">Guests</p>
                            <p className="text-xs sm:text-sm font-bold text-ink">
                              {booking.guests} <span className="text-ink-muted font-normal">{booking.guests === 1 ? 'person' : 'people'}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Add-ons */}
                    {booking.addOns && booking.addOns.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="h-6 w-1 rounded-full bg-rosegold/40" />
                          <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Add-Ons</h3>
                        </div>
                        <div className="space-y-2.5">
                          {booking.addOns.map((item, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-cream-warm/40 border border-white/60"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rosegold/10 text-rosegold shrink-0">
                                  <Sparkles className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-semibold text-ink truncate">{item.addon?.name || 'Add-on'}</p>
                                  {item.quantity > 1 && (
                                    <p className="text-[10px] sm:text-xs text-ink-secondary">Qty: {item.quantity}</p>
                                  )}
                                </div>
                              </div>
                              {item.addon?.price && (
                                <span className="text-xs sm:text-sm font-bold text-ink bg-white/70 px-2.5 sm:px-3 py-1.5 rounded-xl border border-surface-border/40 shrink-0 ml-2">
                                  {formatCurrency(item.addon.price * item.quantity)}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="h-6 w-1 rounded-full bg-sage/40" />
                          <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Special Requests</h3>
                        </div>
                        <div className="p-4 sm:p-5 rounded-2xl bg-sage/[0.04] border border-sage/10">
                          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed italic">"{booking.specialRequests}"</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Customer & Payment Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                    >
                      {/* Customer */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/60 border border-white/70">
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="h-5 w-1 rounded-full bg-burgundy/30" />
                          <h3 className="font-accent text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Customer</h3>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-burgundy/15 to-burgundy/5 text-burgundy text-base sm:text-lg font-bold border border-burgundy/10 shadow-sm shrink-0">
                            {booking.customerDetails?.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm sm:text-base font-bold text-ink truncate">{booking.customerDetails?.name}</p>
                            <p className="text-[10px] sm:text-xs text-ink-muted">Primary contact</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink-secondary">
                            <Mail className="h-3.5 w-3.5 text-ink-muted shrink-0" />
                            <span className="truncate">{booking.customerDetails?.email}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-ink-secondary">
                            <Smartphone className="h-3.5 w-3.5 text-ink-muted shrink-0" />
                            <span>{booking.customerDetails?.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/60 border border-white/70">
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="h-5 w-1 rounded-full bg-burgundy/30" />
                          <h3 className="font-accent text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-secondary font-semibold">Payment</h3>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-ink-secondary">Subtotal</span>
                            <span className="font-semibold text-ink">{formatCurrency(booking.totalAmount)}</span>
                          </div>
                          {booking.discountAmount > 0 && (
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-sage-dark">Discount</span>
                              <span className="font-semibold text-sage-dark">-{formatCurrency(booking.discountAmount)}</span>
                            </div>
                          )}
                          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-sm sm:text-base font-bold text-ink">Total</span>
                            <span className="text-xl sm:text-2xl font-bold text-burgundy tracking-tight">{formatCurrency(booking.finalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-surface-border/30 bg-white/40 backdrop-blur-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-ink-muted/60 justify-center sm:justify-start">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Secure booking verified</span>
                  </div>
                  <div className="flex gap-2.5">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-surface-border/60 text-xs sm:text-sm font-semibold text-ink hover:shadow-md transition-all"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Receipt</span>
                    </motion.button>
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-burgundy/[0.08] border border-burgundy/15 text-xs sm:text-sm font-semibold text-burgundy hover:bg-burgundy/[0.12] transition-all"
                    >
                      Support
                      <ChevronRight className="h-3.5 w-3.5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 21, 56, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 21, 56, 0.25);
        }
      `}</style>
    </div>
  );
}