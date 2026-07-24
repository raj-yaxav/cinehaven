'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react';

const occasions = [
  { value: '', label: 'Select occasion' },
  { value: 'birthday', label: 'Birthday Celebration' },
  { value: 'proposal', label: 'Marriage Proposal' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date_night', label: 'Date Night' },
  { value: 'family', label: 'Family Gathering' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'other', label: 'Something Else' },
];

const budgetRanges = [
  { value: '', label: 'Select budget range' },
  { value: 'under_10000', label: 'Under ₹10,000' },
  { value: '10000_25000', label: '₹10,000 – ₹25,000' },
  { value: '25000_50000', label: '₹25,000 – ₹50,000' },
  { value: '50000_plus', label: '₹50,000+' },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    budgetRange: '',
    message: '',
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  function updateField(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!form.name.trim() || !form.email.trim() || !form.budgetRange || !form.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please complete your name, email, budget range, and message.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.status !== 'success') {
        setStatus({ type: 'error', message: json.message || 'Unable to send message' });
        return;
      }

      setStatus({ type: 'success', message: json.message });
      setForm({
        name: '',
        email: '',
        phone: '',
        occasion: '',
        budgetRange: '',
        message: '',
        newsletter: false,
      });
    } catch {
      setStatus({ type: 'error', message: 'Unable to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="lead-name" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
            maxLength={100}
            className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lead-email" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
            maxLength={254}
            className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="lead-phone" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
            Phone Number <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            maxLength={30}
            className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lead-occasion" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
            Occasion <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <select
            id="lead-occasion"
            value={form.occasion}
            onChange={(event) => updateField('occasion', event.target.value)}
            className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20 appearance-none cursor-pointer"
          >
            {occasions.map((occasion) => (
              <option key={occasion.value} value={occasion.value} className="bg-midnight">
                {occasion.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="lead-budget" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
          Budget Range <span aria-hidden="true">*</span>
        </label>
        <select
          id="lead-budget"
          value={form.budgetRange}
          onChange={(event) => updateField('budgetRange', event.target.value)}
          required
          className="w-full min-h-12 rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20 appearance-none cursor-pointer"
        >
          {budgetRanges.map((range) => (
            <option key={range.value} value={range.value} className="bg-midnight">
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="lead-message" className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">
          Your Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="lead-message"
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          required
          maxLength={2000}
          className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20 resize-none"
          placeholder="Tell us about your dream celebration, guest count, preferred date, special requests, or questions."
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="newsletter"
          checked={form.newsletter}
          onChange={(event) => updateField('newsletter', event.target.checked)}
          className="h-4 w-4 rounded border-black/10 bg-black/3 text-amber focus:ring-amber/30"
        />
        <label htmlFor="newsletter" className="text-sm text-mist cursor-pointer">
          Send me exclusive offers and celebration ideas
        </label>
      </div>

      {status && (
        <div role="status" aria-live="polite" className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${
          status.type === 'success' ? 'border-sage/20 bg-sage/10 text-sage' : 'border-coral/20 bg-coral/10 text-coral'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber to-amber-dark px-8 py-4 text-sm font-bold text-midnight shadow-lg shadow-burgundy/20 hover:shadow-xl hover:shadow-burgundy/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
