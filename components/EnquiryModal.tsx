'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', occasion: '' });
      setSubmitted(false);
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'enquiry_modal' }),
      });
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); setForm({ name: '', email: '', phone: '', occasion: '' }); }, 2000);
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative flex w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur text-ink-muted hover:text-ink transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image Side */}
            <div className="relative hidden w-5/12 shrink-0 md:block">
              <img
                src="/images/hero-proposal.png"
                alt="CineHaven experience"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-burgundy/40 via-burgundy/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-white text-xs font-medium">
                  <Sparkles className="h-3 w-3" />
                  Celebrate in Style
                </div>
                <p className="mt-3 text-xl font-display font-bold text-white leading-tight">
                  Your Perfect Moment<br />Starts Here
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 px-6 py-10 md:px-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-sage-dark mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink">Thank You!</h3>
                  <p className="mt-2 text-ink-secondary">We&apos;ll reach out shortly to craft your perfect experience.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-display font-bold text-ink">Let&apos;s Plan Something Magical</h3>
                    <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                      Tell us a bit about your celebration and we&apos;ll help create the perfect evening.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-accent uppercase tracking-wider text-ink-muted mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="input-velvet"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-accent uppercase tracking-wider text-ink-muted mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="priya@example.com"
                          className="input-velvet"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-accent uppercase tracking-wider text-ink-muted mb-1.5">Phone</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="input-velvet"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-accent uppercase tracking-wider text-ink-muted mb-1.5">Occasion (optional)</label>
                      <select
                        value={form.occasion}
                        onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                        className="input-velvet appearance-none"
                      >
                        <option value="">Select an occasion</option>
                        <option value="birthday">Birthday</option>
                        <option value="proposal">Proposal</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="date-night">Date Night</option>
                        <option value="friends">Friends Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Enquiry
                        </>
                      )}
                    </motion.button>
                    <p className="text-xs text-ink-muted text-center">
                      We&apos;ll get back to you within 24 hours
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
