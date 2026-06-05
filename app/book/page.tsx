'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Gift,
  MessageSquare,
  Phone,
  Mail,
  X,
  Play,
  Loader2,
  Tv,
  Crown,
  Lock,
  User,
  AlertCircle,
  Shield,
  Heart,
  Star,
  Filter,
  ArrowUpDown,
  RotateCcw,
  ImageOff,
  Zap,
  Diamond,
  Flame,
  Wine,
  Music,
  Camera,
  PartyPopper,
  Ticket,
  ChevronDown,
  Info,
  Minus,
  Plus,
  ArrowRight,
  Check,
  Briefcase,
  CalendarDays,
} from 'lucide-react';

// ============ TYPES ============
interface RoomOption {
  _id: string;
  name: string;
  category?: string;
  categories?: string[];
  basePrice?: number;
  originalPrice?: number;
  pricePerExtraPerson?: number;
  capacity: { min: number; max: number };
  images?: string[];
  features?: string[];
  screenSize?: string;
  soundSystem?: string;
  videoUrl?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

interface SlotOption {
  _id: string;
  start: string;
  end: string;
  priceOverride?: number;
  originalPrice?: number;
  availableSeats?: number;
}

interface AddOnOption {
  _id: string;
  name: string;
  price: number;
  icon?: string;
  description?: string;
}

// ============ CATEGORY SYSTEM (Light Theme) ============
const categoryPalette: Record<string, { 
  label: string; 
  gradient: string; 
  icon: any;
  accent: string;
  bgAccent: string;
  borderAccent: string;
}> = {
  premium: { 
    label: 'Premium', 
    gradient: 'from-burgundy/15 to-cream', 
    icon: Crown,
    accent: 'text-burgundy',
    bgAccent: 'bg-burgundy-bg',
    borderAccent: 'border-burgundy/20',
  },
  luxury: { 
    label: 'Luxury', 
    gradient: 'from-crimson/15 to-cream', 
    icon: Diamond,
    accent: 'text-crimson',
    bgAccent: 'bg-crimson-muted',
    borderAccent: 'border-crimson/20',
  },
  deluxe: { 
    label: 'Deluxe', 
    gradient: 'from-teal/15 to-cream', 
    icon: Star,
    accent: 'text-teal',
    bgAccent: 'bg-teal-bg',
    borderAccent: 'border-teal/20',
  },
  vip: { 
    label: 'VIP', 
    gradient: 'from-burgundy/20 to-cream', 
    icon: Crown,
    accent: 'text-burgundy',
    bgAccent: 'bg-burgundy-bg',
    borderAccent: 'border-burgundy/25',
  },
  couple: { 
    label: 'Couple', 
    gradient: 'from-rosegold/15 to-cream', 
    icon: Heart,
    accent: 'text-rosegold',
    bgAccent: 'bg-rosegold-bg',
    borderAccent: 'border-rosegold/20',
  },
  family: { 
    label: 'Family', 
    gradient: 'from-teal/15 to-cream', 
    icon: Users,
    accent: 'text-teal',
    bgAccent: 'bg-teal-bg',
    borderAccent: 'border-teal/20',
  },
  standard: { 
    label: 'Standard', 
    gradient: 'from-ink-muted/15 to-cream', 
    icon: Tv,
    accent: 'text-ink-muted',
    bgAccent: 'bg-cream-warm',
    borderAccent: 'border-surface-border',
  },
  birthday: { 
    label: 'Birthday', 
    gradient: 'from-crimson/15 to-cream', 
    icon: PartyPopper,
    accent: 'text-crimson',
    bgAccent: 'bg-crimson-muted',
    borderAccent: 'border-crimson/20',
  },
  proposal: { 
    label: 'Proposal', 
    gradient: 'from-burgundy/15 to-cream', 
    icon: Heart,
    accent: 'text-burgundy',
    bgAccent: 'bg-burgundy-bg',
    borderAccent: 'border-burgundy/20',
  },
  anniversary: { 
    label: 'Anniversary', 
    gradient: 'from-rosegold/15 to-cream', 
    icon: Wine,
    accent: 'text-rosegold',
    bgAccent: 'bg-rosegold-bg',
    borderAccent: 'border-rosegold/20',
  },
  'date-night': { 
    label: 'Date Night', 
    gradient: 'from-burgundy/15 to-cream', 
    icon: Flame,
    accent: 'text-burgundy',
    bgAccent: 'bg-burgundy-bg',
    borderAccent: 'border-burgundy/20',
  },
  friends: { 
    label: 'Friends', 
    gradient: 'from-teal/15 to-cream', 
    icon: Zap,
    accent: 'text-teal',
    bgAccent: 'bg-teal-bg',
    borderAccent: 'border-teal/20',
  },
  corporate: { 
    label: 'Corporate', 
    gradient: 'from-ink-secondary/15 to-cream', 
    icon: Briefcase,
    accent: 'text-ink-secondary',
    bgAccent: 'bg-cream-warm',
    borderAccent: 'border-surface-border',
  },
  'private-theater': { 
    label: 'Private', 
    gradient: 'from-burgundy/15 to-cream', 
    icon: Ticket,
    accent: 'text-burgundy',
    bgAccent: 'bg-burgundy-bg',
    borderAccent: 'border-burgundy/20',
  },
};

const getCategoryMeta = (cat?: string) => {
  if (!cat) return categoryPalette.standard;
  return (
    categoryPalette[cat.toLowerCase()] || {
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
      gradient: 'from-ink-muted/15 to-cream',
      icon: Tv,
      accent: 'text-ink-muted',
      bgAccent: 'bg-cream-warm',
      borderAccent: 'border-surface-border',
    }
  );
};

// ============ HELPERS ============
const formatTimeRange = (start: string, end: string) => {
  try {
    const t = (s: string) => {
      const [h, m] = s.split(':');
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const display = hour % 12 || 12;
      return `${display}:${m} ${ampm}`;
    };
    return `${t(start)} - ${t(end)}`;
  } catch {
    return `${start} - ${end}`;
  }
};

const formatDateParts = (dateStr: string) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return {
    weekday: d.toLocaleDateString('en-IN', { weekday: 'short' }),
    day: d.getDate(),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    full: d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    iso: dateStr,
  };
};

// ============ DATE UTILITIES ============
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeToday(d: Date): boolean {
  return startOfDay(d).getTime() < startOfDay(new Date()).getTime();
}

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCalendarGrid(viewMonth: Date): Date[] {
  const firstOfMonth = startOfMonth(viewMonth);
  const startDayOfWeek = firstOfMonth.getDay();
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startDayOfWeek);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

function getRoomCategories(room: RoomOption): string[] {
  if (room.categories && room.categories.length > 0) return room.categories;
  if (room.category) return [room.category];
  return [];
}

// ============ IMAGE COMPONENT ============
function RoomImage({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    src ? 'loading' : 'error'
  );

  useEffect(() => {
    setStatus(src ? 'loading' : 'error');
  }, [src]);

  if (!src || status === 'error') {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-burgundy/5 via-rosegold/5 to-cream ${className}`}>
        <Sparkles className="h-8 w-8 text-burgundy/20 mb-2" />
        <span className="text-2xl font-bold text-burgundy/10">{(alt || '?').charAt(0).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy/10 via-rosegold/10 to-cream animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`h-full w-full object-cover transition-all duration-700 ${
          status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
}

// ============ HORIZONTAL DATE SCROLLER ============
function DateScroller({
  selectedDate,
  onSelectDate,
  maxDaysAhead = 90,
  onOpenCalendar,
}: {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  maxDaysAhead?: number;
  onOpenCalendar: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => startOfDay(new Date()), []);
  
  const days = useMemo(() => {
    const result = [];
    for (let i = 0; i <= maxDaysAhead; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d);
    }
    return result;
  }, [today, maxDaysAhead]);

  const selectedIndex = days.findIndex(d => toISODate(d) === selectedDate);

  useEffect(() => {
    if (scrollRef.current && selectedIndex >= 0) {
      const el = scrollRef.current.children[selectedIndex] as HTMLElement;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center gap-3">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {days.map((date) => {
            const iso = toISODate(date);
            const isSelected = selectedDate === iso;
            const isToday = isSameDay(date, today);
            const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
            const dayNum = date.getDate();
            
            return (
              <motion.button
                key={iso}
                onClick={() => onSelectDate(iso)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center min-w-[64px] h-20 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-burgundy border-burgundy text-white shadow-burgundy-glow scale-105'
                    : isToday
                    ? 'bg-burgundy-bg border-burgundy/30 text-burgundy'
                    : 'bg-white border-surface-border text-ink-secondary hover:bg-cream-warm hover:border-burgundy/20'
                }`}
              >
                <span className={`text-[10px] uppercase tracking-wider font-medium ${isSelected ? 'text-white/70' : ''}`}>
                  {dayName}
                </span>
                <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-ink'}`}>
                  {dayNum}
                </span>
                {isToday && !isSelected && (
                  <span className="h-1 w-1 rounded-full bg-burgundy mt-1" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Calendar Icon Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCalendar}
          className="shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl bg-white border border-surface-border text-ink-secondary hover:bg-cream-warm hover:border-burgundy/30 transition-all duration-300 shadow-soft"
          title="Open calendar"
        >
          <CalendarDays className="h-5 w-5 text-burgundy mb-1" />
          <span className="text-[9px] uppercase tracking-wider font-medium text-ink-muted">Pick</span>
        </motion.button>
      </div>
    </div>
  );
}

// ============ CALENDAR MODAL ============
function CalendarModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  maxMonthsAhead = 6,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  maxMonthsAhead?: number;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + maxMonthsAhead);
    return d;
  }, [maxMonthsAhead, today]);

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    if (selectedDate) return startOfMonth(new Date(selectedDate));
    return startOfMonth(today);
  });

  useEffect(() => {
    if (selectedDate) {
      const d = new Date(selectedDate);
      const monthStart = startOfMonth(d);
      if (monthStart.getTime() !== viewMonth.getTime()) {
        setViewMonth(monthStart);
      }
    }
  }, [selectedDate]);

  const grid = useMemo(() => getCalendarGrid(viewMonth), [viewMonth]);

  const isPrevDisabled =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  const isNextDisabled =
    viewMonth.getFullYear() === maxDate.getFullYear() &&
    viewMonth.getMonth() === maxDate.getMonth();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border border-surface-border rounded-3xl p-6 shadow-card-lift"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-burgundy" />
            <h3 className="text-lg font-bold text-ink">Select Date</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-cream-warm text-ink-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => !isPrevDisabled && setViewMonth(addMonths(viewMonth, -1))}
            disabled={isPrevDisabled}
            className="p-2 rounded-full hover:bg-cream-warm disabled:opacity-30 text-ink transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-ink font-semibold">
            {viewMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => !isNextDisabled && setViewMonth(addMonths(viewMonth, 1))}
            disabled={isNextDisabled}
            className="p-2 rounded-full hover:bg-cream-warm disabled:opacity-30 text-ink transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center text-[10px] uppercase tracking-widest text-ink-muted py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((date) => {
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate && isSameDay(date, new Date(selectedDate));
            const isPast = isBeforeToday(date);
            const isOtherMonth = date.getMonth() !== viewMonth.getMonth();
            const isBeyondMax = date > maxDate;
            const isDisabled = isPast || isBeyondMax;

            return (
              <motion.button
                key={date.toISOString()}
                whileHover={!isDisabled ? { scale: 1.1 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isDisabled) {
                    onSelectDate(toISODate(date));
                    onClose();
                  }
                }}
                disabled={isDisabled}
                className={`aspect-square flex items-center justify-center text-sm font-medium rounded-xl transition-all ${
                  isSelected
                    ? 'bg-burgundy text-white font-bold shadow-burgundy-glow'
                    : isToday
                    ? 'bg-burgundy-bg text-burgundy border border-burgundy/30'
                    : isPast
                    ? 'text-ink-light cursor-not-allowed'
                    : isOtherMonth
                    ? 'text-ink-light/50'
                    : 'text-ink hover:bg-cream-warm'
                }`}
              >
                {date.getDate()}
              </motion.button>
            );
          })}
        </div>

        {/* Selected date display */}
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-surface-border">
            <p className="text-sm text-ink-muted text-center">
              Selected: <span className="font-semibold text-burgundy">{formatDateParts(selectedDate)?.full}</span>
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============ ROOM CARD ============
function RoomCard({
  room,
  isExpanded,
  isSelected,
  onExpand,
  onSelect,
  slots,
  isLoadingSlots,
  slotError,
  selectedSlotId,
  onSelectSlot,
}: {
  room: RoomOption;
  isExpanded: boolean;
  isSelected: boolean;
  onExpand: () => void;
  onSelect: () => void;
  slots: SlotOption[];
  isLoadingSlots: boolean;
  slotError: string;
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const roomCats = getRoomCategories(room);
  const primaryCat = roomCats[0];
  const catMeta = getCategoryMeta(primaryCat);
  const CategoryIcon = catMeta.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 ${
        isSelected
          ? 'border-burgundy/30 shadow-card-hover'
          : 'border-surface-border hover:border-burgundy/20 hover:shadow-card-hover'
      } bg-white`}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${catMeta.gradient} transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
        {room.images?.[0] && (
          <img
            src={room.images[0]}
            alt={room.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md border ${catMeta.borderAccent} ${catMeta.accent}`}>
            <CategoryIcon className="h-3.5 w-3.5" />
            {catMeta.label}
          </span>
        </div>

        {/* Discount Badge */}
        {room.originalPrice && room.basePrice && room.originalPrice > room.basePrice && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-crimson text-white shadow-soft">
              {Math.round(((room.originalPrice - room.basePrice) / room.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}

        {/* Video Button */}
        {room.videoUrl && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle video modal
            }}
            className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-all shadow-soft"
          >
            <Play className="h-4 w-4 fill-current" />
          </motion.button>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-4 left-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-burgundy text-white shadow-burgundy-glow">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Selected
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-burgundy transition-colors">{room.name}</h3>
            <p className="text-sm text-ink-muted">
              {room.screenSize || 'Premium Screen'} · {room.soundSystem || 'Surround Sound'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-burgundy">
              ₹{room.basePrice?.toLocaleString() || '—'}
            </div>
            {room.originalPrice && room.originalPrice > (room.basePrice || 0) && (
              <div className="text-sm text-ink-muted line-through">
                ₹{room.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-2 text-sm text-ink-secondary mb-4">
          <Users className="h-4 w-4 text-burgundy" />
          <span>
            {room.capacity.min} guests included
            {room.capacity.max > room.capacity.min && ` (up to ${room.capacity.max})`}
          </span>
        </div>

        {/* Features */}
        {room.features && room.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {room.features.slice(0, 4).map((feature, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-cream-warm text-ink-secondary border border-surface-border"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 4 && (
              <span className="text-[11px] px-2.5 py-1 rounded-lg text-ink-muted">
                +{room.features.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Expand/Collapse */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onExpand}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cream-warm text-sm text-ink-secondary hover:bg-cream-dark transition-all border border-surface-border font-medium"
        >
          {isExpanded ? 'Hide' : 'View'} Available Slots
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>

        {/* Slots Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-surface-border">
                {isLoadingSlots ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-burgundy" />
                  </div>
                ) : slotError ? (
                  <p className="text-sm text-crimson text-center py-4">{slotError}</p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-ink-muted text-center py-4">No slots available for this date</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      const isSlotSelected = selectedSlotId === slot._id;
                      return (
                        <motion.button
                          key={slot._id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onSelect();
                            onSelectSlot(slot._id);
                          }}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-left transition-all ${
                            isSlotSelected
                              ? 'bg-burgundy-bg border-burgundy text-burgundy shadow-soft'
                              : 'bg-cream-warm border-surface-border text-ink hover:bg-cream-dark hover:border-burgundy/20'
                          }`}
                        >
                          <span className="text-xs font-semibold">
                            {formatTimeRange(slot.start, slot.end)}
                          </span>
                          <span className="text-sm font-bold">
                            ₹{(slot.priceOverride || room.basePrice || 0).toLocaleString()}
                          </span>
                          {slot.originalPrice && slot.originalPrice > (slot.priceOverride || 0) && (
                            <span className="text-[10px] line-through text-ink-muted">
                              ₹{slot.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============ FLOATING SUMMARY BAR ============
function FloatingSummary({
  selectedRoom,
  selectedSlot,
  selectedDate,
  guests,
  pricing,
  onContinue,
  canContinue,
}: {
  selectedRoom?: RoomOption;
  selectedSlot?: SlotOption | null;
  selectedDate: string;
  guests: number;
  pricing: any;
  onContinue: () => void;
  canContinue: boolean;
}) {
  const dateParts = formatDateParts(selectedDate);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-surface-border shadow-card-lift"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 min-w-fit">
              <div className={`h-2.5 w-2.5 rounded-full ${canContinue ? 'bg-teal animate-pulse' : 'bg-burgundy'}`} />
              <span className="text-sm text-ink-secondary">
                {canContinue ? 'Ready to book' : 'Select room & slot'}
              </span>
            </div>
            
            {selectedRoom && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-ink">
                <Tv className="h-4 w-4 text-burgundy" />
                {selectedRoom.name}
              </div>
            )}
            
            {selectedSlot && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-ink">
                <Clock className="h-4 w-4 text-burgundy" />
                {formatTimeRange(selectedSlot.start, selectedSlot.end)}
              </div>
            )}
            
            {dateParts && (
              <div className="hidden md:flex items-center gap-2 text-sm text-ink">
                <Calendar className="h-4 w-4 text-burgundy" />
                {dateParts.full}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {canContinue && (
              <div className="hidden sm:block text-right">
                <div className="text-xs text-ink-muted">Total</div>
                <div className="text-xl font-bold text-burgundy">
                  ₹{pricing.total.toLocaleString()}
                </div>
              </div>
            )}
            <motion.button
              whileHover={canContinue ? { scale: 1.02 } : {}}
              whileTap={canContinue ? { scale: 0.98 } : {}}
              onClick={onContinue}
              disabled={!canContinue}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                canContinue
                  ? 'bg-gradient-burgundy text-white hover:shadow-burgundy-glow'
                  : 'bg-cream-warm text-ink-muted cursor-not-allowed border border-surface-border'
              }`}
            >
              {canContinue ? (
                <span className="flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </span>
              ) : (
                'Select Slot'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ CHECKOUT DRAWER ============
function CheckoutDrawer({
  isOpen,
  onClose,
  selectedRoom,
  selectedSlot,
  selectedDate,
  guests,
  setGuests,
  pricing,
  addOns,
  selectedAddOns,
  setSelectedAddOns,
  onSubmit,
  isSubmitting,
  statusMessage,
  bookingSuccess,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  specialRequests,
  setSpecialRequests,
}: any) {
  const dateParts = formatDateParts(selectedDate);

  return (
    <AnimatePresence>
      {isOpen && !bookingSuccess && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-white border-l border-surface-border overflow-y-auto shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-ink">Complete Booking</h2>
                  <p className="text-sm text-ink-muted mt-1">Fill in your details to confirm</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-cream-warm text-ink-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Booking Summary Card */}
              <div className="rounded-2xl bg-cream-warm border border-surface-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-muted">Theatre</span>
                  <span className="text-sm font-semibold text-ink">{selectedRoom?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-muted">Date</span>
                  <span className="text-sm font-semibold text-ink">{dateParts?.full}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-muted">Time</span>
                  <span className="text-sm font-semibold text-ink">
                    {selectedSlot ? formatTimeRange(selectedSlot.start, selectedSlot.end) : '—'}
                  </span>
                </div>
              </div>

              {/* Guest Counter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-ink">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGuests(Math.max(2, guests - 1))}
                    className="h-12 w-12 rounded-xl bg-cream-warm flex items-center justify-center text-ink hover:bg-cream-dark border border-surface-border transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold text-ink">{guests}</span>
                    <p className="text-xs text-ink-muted">Max: {selectedRoom?.capacity.max || '—'}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGuests(Math.min(selectedRoom?.capacity.max || 50, guests + 1))}
                    className="h-12 w-12 rounded-xl bg-cream-warm flex items-center justify-center text-ink hover:bg-cream-dark border border-surface-border transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-ink mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-cream-warm border border-surface-border text-ink placeholder:text-ink-light focus:border-burgundy/50 focus:outline-none focus:ring-2 focus:ring-burgundy/10 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ink mb-2 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-cream-warm border border-surface-border text-ink placeholder:text-ink-light focus:border-burgundy/50 focus:outline-none focus:ring-2 focus:ring-burgundy/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ink mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-cream-warm border border-surface-border text-ink placeholder:text-ink-light focus:border-burgundy/50 focus:outline-none focus:ring-2 focus:ring-burgundy/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-ink mb-2 block">Special Requests (Optional)</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-cream-warm border border-surface-border text-ink placeholder:text-ink-light focus:border-burgundy/50 focus:outline-none focus:ring-2 focus:ring-burgundy/10 transition-all"
                  />
                </div>
              </div>

              {/* Add-ons */}
              {addOns.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-ink">Add-ons</label>
                  <div className="space-y-2">
                    {addOns.map((addon: AddOnOption) => (
                      <motion.button
                        key={addon._id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() =>
                          setSelectedAddOns((prev: string[]) =>
                            prev.includes(addon._id)
                              ? prev.filter((id) => id !== addon._id)
                              : [...prev, addon._id]
                          )
                        }
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                          selectedAddOns.includes(addon._id)
                            ? 'bg-burgundy-bg border-burgundy/30'
                            : 'bg-cream-warm border-surface-border hover:border-burgundy/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                            selectedAddOns.includes(addon._id)
                              ? 'bg-burgundy border-burgundy'
                              : 'border-surface-border'
                          }`}>
                            {selectedAddOns.includes(addon._id) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-ink">{addon.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-burgundy">₹{addon.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="rounded-2xl bg-cream-warm border border-surface-border p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-muted">Subtotal</span>
                  <span className="text-ink">₹{pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-muted">GST (18%)</span>
                  <span className="text-ink">₹{pricing.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-border">
                  <span className="text-ink font-semibold">Total</span>
                  <span className="text-2xl font-bold text-burgundy">₹{pricing.total.toLocaleString()}</span>
                </div>
              </div>

              {statusMessage && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-crimson/10 border border-crimson/20 text-sm text-crimson">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {statusMessage}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-burgundy text-white font-bold text-sm hover:shadow-burgundy-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Confirm Booking (₹{pricing.total.toLocaleString()})
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-4 text-xs text-ink-muted">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Instant
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" /> 24h Cancel
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {isOpen && bookingSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-teal/30 rounded-3xl p-8 text-center max-w-md w-full shadow-card-lift"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="h-16 w-16 rounded-full bg-teal-bg flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-teal" />
            </motion.div>
            <h3 className="text-2xl font-bold text-ink mb-2">Booking Confirmed!</h3>
            <p className="text-ink-muted mb-6">
              Booking ID and complete details sent to <span className="text-burgundy font-medium">{email}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/'}
              className="w-full py-3 rounded-xl bg-gradient-burgundy text-white font-bold hover:shadow-burgundy-glow transition-all"
            >
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ MAIN PAGE ============
export default function BookPage() {
  const [rooms, setRooms] = useState<RoomOption[]>([]);
  const [addOns, setAddOns] = useState<AddOnOption[]>([]);
  const [locationName, setLocationName] = useState('IP Extension, Delhi');

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [slotsByRoom, setSlotsByRoom] = useState<Record<string, SlotOption[]>>({});
  const [loadingSlots, setLoadingSlots] = useState<Record<string, boolean>>({});
  const [slotErrors, setSlotErrors] = useState<Record<string, string>>({});

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc'>('recommended');
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const [locRes, roomsRes, addOnsRes] = await Promise.all([
          fetch('/api/locations').catch(() => null),
          fetch('/api/rooms').catch(() => null),
          fetch('/api/addons').catch(() => null),
        ]);
        const locJson = locRes ? await locRes.json() : null;
        const roomsJson = roomsRes ? await roomsRes.json() : null;
        const addOnsJson = addOnsRes ? await addOnsRes.json() : null;

        if (roomsJson?.data) {
          setRooms(roomsJson.data);
        }
        if (addOnsJson?.data) setAddOns(addOnsJson.data);
        if (locJson?.data) {
          const delhi = locJson.data.find((l: any) => l.city?.toLowerCase() === 'delhi');
          if (delhi) setLocationName(`${delhi.name}, ${delhi.city}`);
        }
      } catch {
        setStatusMessage('Unable to load theatres. Please refresh.');
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!selectedDate) setSelectedDate(toISODate(new Date()));
  }, [selectedDate]);

  useEffect(() => {
    if (!expandedRoomId || !selectedDate) return;
    if (slotsByRoom[expandedRoomId]) return;
    loadSlots(expandedRoomId);
  }, [expandedRoomId, selectedDate, slotsByRoom]);

  async function loadSlots(roomId: string) {
    setLoadingSlots((m) => ({ ...m, [roomId]: true }));
    setSlotErrors((m) => ({ ...m, [roomId]: '' }));
    try {
      const res = await fetch(`/api/availability?room=${roomId}&date=${selectedDate}`);
      const json = await res.json();
      setSlotsByRoom((m) => ({ ...m, [roomId]: json.data || [] }));
    } catch {
      setSlotErrors((m) => ({ ...m, [roomId]: 'Unable to load slots' }));
    } finally {
      setLoadingSlots((m) => ({ ...m, [roomId]: false }));
    }
  }

  const selectDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    setSlotsByRoom({});
    setSelectedSlotId('');
  }, []);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    rooms.forEach((r) => {
      getRoomCategories(r).forEach((cat) => {
        const k = cat.toLowerCase();
        counts.set(k, (counts.get(k) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, count, ...getCategoryMeta(id) }))
      .sort((a, b) => b.count - a.count);
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    let result = rooms;
    if (selectedCategories.length > 0) {
      result = result.filter((r) => {
        const roomCats = getRoomCategories(r).map((c) => c.toLowerCase());
        return selectedCategories.some((c) => roomCats.includes(c));
      });
    }
    const sorted = [...result];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.basePrice || 0) - (a.basePrice || 0));
        break;
      case 'capacity-asc':
        sorted.sort((a, b) => a.capacity.max - b.capacity.max);
        break;
      case 'capacity-desc':
        sorted.sort((a, b) => b.capacity.max - a.capacity.max);
        break;
    }
    return sorted;
  }, [rooms, selectedCategories, sortBy]);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r._id === selectedRoomId),
    [rooms, selectedRoomId]
  );

  const selectedSlot = useMemo(() => {
    if (!selectedRoomId || !selectedSlotId) return null;
    return slotsByRoom[selectedRoomId]?.find((s) => s._id === selectedSlotId) || null;
  }, [selectedRoomId, selectedSlotId, slotsByRoom]);

  const pricing = useMemo(() => {
    const base = selectedSlot?.priceOverride || selectedRoom?.basePrice || 0;
    const extra = Math.max(0, guests - (selectedRoom?.capacity?.min || 2));
    const extraTotal = extra * (selectedRoom?.pricePerExtraPerson || 0);
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const a = addOns.find((x) => x._id === id);
      return sum + (a?.price || 0);
    }, 0);
    const subtotal = base + extraTotal + addOnTotal;
    const tax = Math.round(subtotal * 0.18);
    return { subtotal, tax, total: subtotal + tax, base, extraTotal, addOnTotal };
  }, [selectedSlot, selectedRoom, guests, selectedAddOns, addOns]);

  const canContinue = !!(selectedRoomId && selectedSlotId);

  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => setSelectedCategories([]), []);

  function handleContinue() {
    if (!canContinue) {
      setStatusMessage('Please pick a theatre and a time slot first.');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }
    setShowCheckout(true);
  }

  async function handleBooking() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatusMessage('Please fill in all contact details.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
    if (!emailOk) return setStatusMessage('Please enter a valid email.');
    if (!phoneOk) return setStatusMessage('Please enter a valid 10-digit phone number.');

    setIsSubmitting(true);
    try {
      const payload = {
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        room: selectedRoomId,
        date: selectedDate,
        timeSlot: { start: selectedSlot?.start, end: selectedSlot?.end },
        guests,
        addOns: selectedAddOns.map((id) => ({ addon: id, quantity: 1 })),
        totalAmount: pricing.subtotal,
        finalAmount: pricing.total,
        specialRequests: specialRequests.trim() || undefined,
        locationName,
        roomName: selectedRoom?.name,
      };
      const res = await fetch('/api/booking/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.status === 'success') setBookingSuccess(true);
      else setStatusMessage(json.message || 'Booking failed. Try again.');
    } catch {
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream text-ink pb-24 mt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rosegold/5 rounded-full blur-3xl" />
      </div>

      {/* Date Scroller with Calendar Icon */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <DateScroller
          selectedDate={selectedDate}
          onSelectDate={selectDate}
          onOpenCalendar={() => setShowCalendar(true)}
        />
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategories([])}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategories.length === 0
                ? 'bg-burgundy text-white shadow-burgundy-glow-sm'
                : 'bg-white text-ink-secondary hover:bg-cream-warm border border-surface-border'
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            All
          </motion.button>
          
          {categoryOptions.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategories.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? `${cat.accent} ${cat.bgAccent} ${cat.borderAccent}`
                    : 'text-ink-secondary bg-white border-surface-border hover:bg-cream-warm'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
                <span className="text-xs opacity-60">({cat.count})</span>
              </motion.button>
            );
          })}

          <div className="ml-auto flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-surface-border rounded-full px-4 py-2 text-sm text-ink focus:outline-none focus:border-burgundy/50 shadow-soft"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="capacity-asc">Capacity: Small to Large</option>
              <option value="capacity-desc">Capacity: Large to Small</option>
            </select>
          </div>
        </div>
      </section>

      {/* Room Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        {filteredRooms.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ImageOff className="h-12 w-12 text-ink-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink mb-2">No theatres match</h3>
            <p className="text-sm text-ink-muted mb-4">Try adjusting your filters</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-white text-sm text-ink hover:bg-cream-warm border border-surface-border shadow-soft"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredRooms.map((room, i) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <RoomCard
                  room={room}
                  isExpanded={expandedRoomId === room._id}
                  isSelected={selectedRoomId === room._id}
                  onExpand={() => setExpandedRoomId(expandedRoomId === room._id ? null : room._id)}
                  onSelect={() => setSelectedRoomId(room._id)}
                  slots={slotsByRoom[room._id] || []}
                  isLoadingSlots={loadingSlots[room._id]}
                  slotError={slotErrors[room._id]}
                  selectedSlotId={selectedSlotId}
                  onSelectSlot={(slotId) => setSelectedSlotId(slotId)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Summary */}
      <FloatingSummary
        selectedRoom={selectedRoom}
        selectedSlot={selectedSlot}
        selectedDate={selectedDate}
        guests={guests}
        pricing={pricing}
        onContinue={handleContinue}
        canContinue={canContinue}
      />

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <CalendarModal
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
          />
        )}
      </AnimatePresence>

      {/* Checkout Drawer */}
      <CheckoutDrawer
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        selectedRoom={selectedRoom}
        selectedSlot={selectedSlot}
        selectedDate={selectedDate}
        guests={guests}
        setGuests={setGuests}
        pricing={pricing}
        addOns={addOns}
        selectedAddOns={selectedAddOns}
        setSelectedAddOns={setSelectedAddOns}
        onSubmit={handleBooking}
        isSubmitting={isSubmitting}
        statusMessage={statusMessage}
        bookingSuccess={bookingSuccess}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        specialRequests={specialRequests}
        setSpecialRequests={setSpecialRequests}
      />
    </div>
  );
}