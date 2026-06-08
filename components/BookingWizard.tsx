'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Users, Clock, Star, Gift, CheckCircle2, X, Play, Sparkles,
  ChevronRight, Loader2, Shield, Mail, Phone, User, MessageSquare, AlertCircle,
  Tv, Lock, Crown, PartyPopper, Cake,
} from 'lucide-react';
import { DateStrip } from './booking/DateStrip';
import { RoomCard } from './booking/RoomCard';
import { SummaryRow } from './booking/SummaryRow';
import type { Room, Slot, AddOn } from './booking/types';

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
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }),
  };
};

export default function BookNowPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [locationName, setLocationName] = useState('IP Extension, Delhi');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [slotsByRoom, setSlotsByRoom] = useState<Record<string, Slot[]>>({});
  const [loadingSlots, setLoadingSlots] = useState<Record<string, boolean>>({});
  const [slotErrors, setSlotErrors] = useState<Record<string, string>>({});
  const [videoModal, setVideoModal] = useState<string | null>(null);

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

  const dateOptions = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

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
          setExpandedRoomId(roomsJson.data[0]?._id || '');
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
    if (!selectedDate && dateOptions.length) setSelectedDate(dateOptions[0]);
  }, [dateOptions, selectedDate]);

  useEffect(() => {
    if (!expandedRoomId || !selectedDate) return;
    if (slotsByRoom[expandedRoomId]) return;
    loadSlots(expandedRoomId);
  }, [expandedRoomId, selectedDate, slotsByRoom, loadSlots]);

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

  const selectedRoom = useMemo(
    () => rooms.find((r) => r._id === selectedRoomId),
    [rooms, selectedRoomId],
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

  const dateParts = formatDateParts(selectedDate);
  const canContinue = !!(selectedRoomId && selectedSlotId);

  const handleDateSelect = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    setSlotsByRoom({});
    setSelectedSlotId('');
  }, []);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedRoomId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectSlot = useCallback((roomId: string, slotId: string) => {
    setSelectedRoomId(roomId);
    setSelectedSlotId(slotId);
  }, []);

  const handleVideoClick = useCallback((url: string) => setVideoModal(url), []);

  const handleContinue = useCallback(() => {
    if (!canContinue) {
      setStatusMessage('Please pick a theatre and a time slot first.');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }
    setShowCheckout(true);
  }, [canContinue]);

  async function handleBooking() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatusMessage('Please fill in all contact details.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
    if (!emailOk) { setStatusMessage('Please enter a valid email.'); return; }
    if (!phoneOk) { setStatusMessage('Please enter a valid 10-digit phone number.'); return; }

    setIsSubmitting(true);
    try {
      const payload = {
        name, email, phone: phone.replace(/\D/g, ''),
        room: selectedRoomId, date: selectedDate,
        timeSlot: { start: selectedSlot?.start, end: selectedSlot?.end },
        guests,
        addOns: selectedAddOns.map((id) => ({ addon: id, quantity: 1 })),
        totalAmount: pricing.subtotal, finalAmount: pricing.total,
        specialRequests: specialRequests.trim() || undefined,
        locationName, roomName: selectedRoom?.name,
      };
      const res = await fetch('/api/booking/initiate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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

  const roomsContent = useMemo(() => {
    if (rooms.length === 0) {
      return (
        <div className="col-span-2 rounded-card border border-black/6 bg-black/[0.01] p-12 text-center">
          <Tv className="h-12 w-12 text-dusty mx-auto mb-3" />
          <p className="text-mist">No theatres available right now.</p>
        </div>
      );
    }
    return rooms.map((room) => (
      <RoomCard
        key={room._id}
        room={room}
        isExpanded={expandedRoomId === room._id}
        isSelectedRoom={selectedRoomId === room._id}
        selectedSlotId={selectedSlotId}
        selectedDate={selectedDate}
        slots={slotsByRoom[room._id] || []}
        isLoadingSlots={loadingSlots[room._id] || false}
        error={slotErrors[room._id] || ''}
        onToggleExpand={handleToggleExpand}
        onSelectSlot={handleSelectSlot}
        onVideoClick={handleVideoClick}
      />
    ));
  }, [rooms, expandedRoomId, selectedRoomId, selectedSlotId, selectedDate, slotsByRoom, loadingSlots, slotErrors, handleToggleExpand, handleSelectSlot, handleVideoClick]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mauve to-midnight">
      <header className="sticky top-0 z-30 border-b border-black/4 bg-mauve/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber to-coral flex items-center justify-center">
              <Tv className="h-5 w-5 text-midnight" />
            </div>
            <div>
              <p className="font-display font-bold text-ivory text-lg leading-none">Cine Celebrate</p>
              <p className="text-[10px] uppercase tracking-widest text-mist">Private Theatres</p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919643055509" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-sage/10 border border-sage/20 text-sage text-sm hover:bg-sage/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">+91 96430 55509</span>
            </a>
            <a href="#book-now" className="btn-primary text-sm">
              Book Now <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-ivory">Pick Your Event Date</h1>
          <p className="text-mist mt-2">Choose a date, compare all our private theatres side-by-side, and book your slot.</p>
        </div>
        <DateStrip selectedDate={selectedDate} onSelect={handleDateSelect} />
      </section>

      <section id="book-now" className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-display font-bold text-ivory">Pick Your Date, Compare Options & Book Your Slot</h2>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <p className="text-ivory font-semibold">{dateParts?.full}</p>
                  <span className="flex items-center gap-1.5 text-xs text-sage bg-sage/10 border border-sage/20 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    Available theatres: {rooms.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {roomsContent}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-amber/20 bg-gradient-to-br from-amber/[0.06] to-coral/[0.04] p-5 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-amber/15 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-amber" />
                </div>
                <h3 className="text-lg font-display font-bold text-ivory">Booking Summary</h3>
              </div>

              <div className="space-y-3 text-sm">
                <SummaryRow icon={MapPin} label="Location" value={locationName} />
                <SummaryRow icon={Tv} label="Theatre" value={selectedRoom?.name || 'Not selected'} empty={!selectedRoom} />
                <SummaryRow
                  icon={Clock} label="Slot"
                  value={selectedSlot ? formatTimeRange(selectedSlot.start, selectedSlot.end) : 'Not selected'}
                  empty={!selectedSlot}
                />
                <SummaryRow icon={Calendar} label="Date" value={dateParts?.full || '—'} />
                <SummaryRow icon={Users} label="Guests" value={`${guests} ${guests === 1 ? 'person' : 'people'}`} />
              </div>

              {canContinue && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-3 border-t border-black/6 space-y-1.5 text-sm"
                >
                  <div className="flex items-center justify-between text-mist">
                    <span>Slot price</span>
                    <span className="text-ivory">₹{pricing.base.toLocaleString()}</span>
                  </div>
                  {pricing.extraTotal > 0 && (
                    <div className="flex items-center justify-between text-mist">
                      <span>Extra guests</span>
                      <span className="text-ivory">₹{pricing.extraTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-mist">
                    <span>GST (18%)</span>
                    <span className="text-ivory">₹{pricing.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/4">
                    <span className="text-ivory font-semibold">Estimated Total</span>
                    <span className="text-xl font-bold text-gradient-amber">₹{pricing.total.toLocaleString()}</span>
                  </div>
                </motion.div>
              )}

              {statusMessage && !showCheckout && (
                <div className="flex items-start gap-2 text-xs text-coral bg-coral/10 border border-coral/20 rounded-lg p-2.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  {statusMessage}
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {canContinue ? 'Continue to Book' : 'Pick a slot first'}
                <ChevronRight className="h-4 w-4" />
              </button>

              {!canContinue && (
                <p className="text-[11px] text-dusty text-center leading-relaxed">
                  Confirm your theatre and slot selection to continue to the booking details step.
                </p>
              )}

              <div className="pt-3 border-t border-black/4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-mist">
                  <Shield className="h-3.5 w-3.5 text-sage" />
                  <span>Confirmation email sent instantly</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-mist">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-mist">
                  <Lock className="h-3.5 w-3.5 text-sage" />
                  <span>Slot blocks automatically after booking</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && !bookingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-card border border-black/6 bg-mauve/95 backdrop-blur-xl shadow-card"
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/3 flex items-center justify-center text-mist hover:text-ivory hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-ivory">Almost there!</h3>
                  <p className="text-mist mt-1 text-sm">Fill in your details to confirm the booking.</p>
                </div>

                <div className="rounded-card border border-amber/20 bg-amber/5 p-4 space-y-2 text-sm">
                  <SummaryRow icon={Tv} label="Theatre" value={selectedRoom?.name || '—'} />
                  <SummaryRow
                    icon={Clock} label="Slot"
                    value={selectedSlot ? formatTimeRange(selectedSlot.start, selectedSlot.end) : '—'}
                  />
                  <SummaryRow icon={Calendar} label="Date" value={dateParts?.full || '—'} />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                    <Users className="h-4 w-4 text-amber" />
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(2, guests - 1))}
                      className="h-10 w-10 rounded-full bg-black/3 flex items-center justify-center text-ivory hover:bg-black/5"
                    >–</button>
                    <input type="number" value={guests} min={2} max={selectedRoom?.capacity.max || 50}
                      onChange={(e) => setGuests(Math.max(2, Number(e.target.value)))}
                      className="input-velvet text-center w-20"
                    />
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(selectedRoom?.capacity.max || 50, guests + 1))}
                      className="h-10 w-10 rounded-full bg-black/3 flex items-center justify-center text-ivory hover:bg-black/5"
                    >+</button>
                    <span className="text-xs text-mist ml-2">Max: {selectedRoom?.capacity.max || '—'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                      <User className="h-4 w-4 text-amber" /> Full Name
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="input-velvet" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                        <Mail className="h-4 w-4 text-amber" /> Email
                      </label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="input-velvet" />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                        <Phone className="h-4 w-4 text-amber" /> Phone
                      </label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9876543210" maxLength={10} className="input-velvet" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                      <MessageSquare className="h-4 w-4 text-amber" /> Special Requests (Optional)
                    </label>
                    <input value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Cake message, song requests..." className="input-velvet" />
                  </div>
                </div>

                {addOns.length > 0 && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-accent uppercase tracking-widest text-mist">
                      <Gift className="h-4 w-4 text-amber" /> Add-ons
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {addOns.map((addon) => (
                        <button
                          key={addon._id} type="button"
                          onClick={() =>
                            setSelectedAddOns((prev) =>
                              prev.includes(addon._id) ? prev.filter((id) => id !== addon._id) : [...prev, addon._id]
                            )
                          }
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            selectedAddOns.includes(addon._id)
                              ? 'bg-amber/15 text-amber border-amber/30'
                              : 'bg-black/3 text-mist border-black/6 hover:border-amber/30'
                          }`}
                        >
                          {selectedAddOns.includes(addon._id) ? '✓' : '+'} {addon.name} • ₹{addon.price}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-card border border-amber/20 bg-amber/5 p-4 space-y-1.5 text-sm">
                  <div className="flex items-center justify-between text-mist">
                    <span>Subtotal</span>
                    <span className="text-ivory">₹{pricing.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-mist">
                    <span>GST (18%)</span>
                    <span className="text-ivory">₹{pricing.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/6">
                    <span className="text-ivory font-semibold">Total</span>
                    <span className="text-2xl font-bold text-gradient-amber">₹{pricing.total.toLocaleString()}</span>
                  </div>
                </div>

                {statusMessage && (
                  <div className="flex items-start gap-2 text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    {statusMessage}
                  </div>
                )}

                <button onClick={handleBooking} disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Confirming booking...</>
                  ) : (
                    <><Lock className="h-4 w-4" /> Confirm Booking (₹{pricing.total.toLocaleString()})</>
                  )}
                </button>

                <p className="text-xs text-dusty text-center">By continuing, you agree to our terms. Free cancellation up to 24 hours before.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCheckout && bookingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-card border border-sage/30 bg-mauve/95 p-8 text-center max-w-md w-full"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sage/20 mb-4">
                <CheckCircle2 className="h-8 w-8 text-sage" />
              </div>
              <h3 className="text-2xl font-display font-bold text-ivory mb-2">Booking Confirmed!</h3>
              <p className="text-mist mb-6">
                We've sent booking ID and complete details to <span className="text-amber">{email}</span>.
              </p>
              <a href="/" className="btn-primary w-full">Back to Home</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-video rounded-card overflow-hidden bg-black"
            >
              <button
                onClick={() => setVideoModal(null)}
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-midnight/80 flex items-center justify-center text-ivory hover:bg-amber hover:text-midnight"
              >
                <X className="h-4 w-4" />
              </button>
              <iframe src={videoModal} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
