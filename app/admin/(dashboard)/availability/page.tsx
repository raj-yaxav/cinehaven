'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CalendarClock, Loader2, Save, Trash2 } from 'lucide-react';

type Theatre = { _id: string; name: string; category?: string; isActive?: boolean; location: { _id: string } | string };
type Slot = {
  _id: string;
  room: { _id: string; name: string };
  location: { _id: string; name: string };
  dateString: string;
  start: string;
  end: string;
  status: string;
  priceOverride?: number;
  note?: string;
};

export default function AdminAvailabilityPage() {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [form, setForm] = useState({
    room: '',
    dateString: new Date().toISOString().split('T')[0],
    start: '18:00',
    end: '21:00',
    status: 'available',
    priceOverride: '',
    note: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [theatreRes, slotRes] = await Promise.all([
      fetch('/api/admin/theatres'),
      fetch('/api/admin/availability'),
    ]);
    const theatreJson = await theatreRes.json();
    const slotJson = await slotRes.json();
    if (theatreJson.status === 'success') setTheatres((theatreJson.data.theatres || []).filter((theatre: Theatre) => theatre.isActive !== false));
    if (slotJson.status === 'success') setSlots(slotJson.data || []);
    setLoading(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const theatre = theatres.find((item) => item._id === form.room);
    const location = typeof theatre?.location === 'string' ? theatre.location : theatre?.location?._id;
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, location }),
    });
    const json = await res.json();
    setSaving(false);
    setMessage(json.status === 'success' ? 'Slot saved' : json.message || 'Unable to save slot');
    if (json.status === 'success') loadData();
  }

  async function updateSlot(id: string, status: string) {
    await fetch(`/api/admin/availability/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadData();
  }

  async function deleteSlot(id: string) {
    if (!confirm('Delete this slot?')) return;
    await fetch(`/api/admin/availability/${id}`, { method: 'DELETE' });
    loadData();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-ivory">Availability</h1>
        <p className="text-mist mt-1">Control which Delhi theatre slots are bookable.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
            <CalendarClock className="h-5 w-5 text-amber" />
          </div>
          <h2 className="text-lg font-semibold text-ivory">Add Time Slot</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} required className="input-velvet">
            <option value="">Select theatre</option>
            {theatres.map((theatre) => (
              <option key={theatre._id} value={theatre._id}>
                {theatre.name}{theatre.category ? ` — ${theatre.category.replace('-', ' ')}` : ''}
              </option>
            ))}
          </select>
          <input type="date" value={form.dateString} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm({ ...form, dateString: e.target.value })} className="input-velvet" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-velvet">
            <option value="available">Available</option>
            <option value="blocked">Blocked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="input-velvet" />
          <input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="input-velvet" />
          <input type="number" value={form.priceOverride} onChange={(e) => setForm({ ...form, priceOverride: e.target.value })} placeholder="Price override optional" className="input-velvet" />
        </div>
        <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Internal note optional" className="input-velvet mt-4 w-full" />
        <div className="mt-5 flex items-center gap-3">
          <button disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Slot
          </button>
          {message && <span className="text-sm text-mist">{message}</span>}
        </div>
      </form>

      <div className="rounded-card border border-white/10 bg-white/[0.03] overflow-hidden">
        {loading ? (
          <div className="p-10"><Loader2 className="h-8 w-8 animate-spin text-amber" /></div>
        ) : (
          <div className="divide-y divide-white/5">
            {slots.map((slot) => (
              <div key={slot._id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-semibold text-ivory">{slot.room?.name}</h3>
                  <p className="text-sm text-mist">{slot.dateString} • {slot.start} - {slot.end}</p>
                  <p className="text-xs text-dusty">{slot.note}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={slot.status} onChange={(e) => updateSlot(slot._id, e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-ivory">
                    <option value="available">Available</option>
                    <option value="blocked">Blocked</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  <button onClick={() => deleteSlot(slot._id)} className="p-2 rounded-lg bg-white/5 text-mist hover:text-coral">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {slots.length === 0 && <div className="p-10 text-center text-mist">No slots created yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
