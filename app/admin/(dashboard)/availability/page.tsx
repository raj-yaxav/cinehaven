'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarClock, Clock3, Loader2, Plus, Save, Trash2 } from 'lucide-react';

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
type SlotDraft = Omit<Partial<Slot>, 'priceOverride'> & { priceOverride?: number | string };

const today = () => new Date().toISOString().split('T')[0];

const defaultTimes = [
  '10:00 - 11:30',
  '11:30 - 13:00',
  '13:00 - 14:30',
  '14:30 - 16:00',
  '16:00 - 17:30',
  '17:30 - 19:00',
  '19:00 - 20:30',
  '20:30 - 22:00',
  '22:00 - 23:30',
];

export default function AdminAvailabilityPage() {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filterDate, setFilterDate] = useState(today());
  const [form, setForm] = useState({
    room: '',
    dateString: today(),
    start: '10:00',
    end: '11:30',
    status: 'available',
    priceOverride: '',
    note: '',
  });
  const [editing, setEditing] = useState<Record<string, SlotDraft>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData(filterDate);
  }, [filterDate, loadData]);

  const visibleSlots = useMemo(
    () => slots.slice().sort((a, b) => `${a.room?.name || ''}${a.start}`.localeCompare(`${b.room?.name || ''}${b.start}`)),
    [slots]
  );

  async function loadData(dateToLoad = filterDate) {
    setLoading(true);
    const [theatreRes, slotRes] = await Promise.all([
      fetch('/api/admin/theatres'),
      fetch(`/api/admin/availability?date=${dateToLoad}`),
    ]);
    const theatreJson = await theatreRes.json();
    const slotJson = await slotRes.json();
    if (theatreJson.status === 'success') {
      setTheatres((theatreJson.data.theatres || []).filter((theatre: Theatre) => theatre.isActive !== false));
    }
    if (slotJson.status === 'success') setSlots(slotJson.data || []);
    setLoading(false);
  }

  function getLocation(roomId: string) {
    const theatre = theatres.find((item) => item._id === roomId);
    return typeof theatre?.location === 'string' ? theatre.location : theatre?.location?._id;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, location: getLocation(form.room) }),
    });
    const json = await res.json();
    setSaving(false);
    setMessage(json.status === 'success' ? 'Slot saved' : json.message || 'Unable to save slot');
    if (json.status === 'success') {
      setFilterDate(form.dateString);
      loadData(form.dateString);
    }
  }

  async function generateDefaults(scope: 'selected' | 'all') {
    const rooms = scope === 'all' ? theatres.map((theatre) => theatre._id) : [form.room].filter(Boolean);
    if (!form.dateString || rooms.length === 0) {
      setMessage('Choose a date and theatre first, or generate for all theatres.');
      return;
    }

    setSaving(true);
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generateDefault: true, rooms, dateString: form.dateString }),
    });
    const json = await res.json();
    setSaving(false);
    setMessage(json.status === 'success' ? `Default slots ready (${json.data.created} new)` : json.message || 'Unable to generate slots');
    if (json.status === 'success') {
      setFilterDate(form.dateString);
      loadData(form.dateString);
    }
  }

  async function saveSlot(slot: Slot) {
    const draft = editing[slot._id] || {};
    const payload = {
      status: draft.status ?? slot.status,
      start: draft.start ?? slot.start,
      end: draft.end ?? slot.end,
      note: draft.note ?? slot.note,
      priceOverride: draft.priceOverride === '' ? undefined : draft.priceOverride ?? slot.priceOverride,
    };

    await fetch(`/api/admin/availability/${slot._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setEditing((current) => {
      const next = { ...current };
      delete next[slot._id];
      return next;
    });
    loadData();
  }

  async function deleteSlot(id: string) {
    if (!confirm('Delete this slot?')) return;
    await fetch(`/api/admin/availability/${id}`, { method: 'DELETE' });
    loadData();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ivory sm:text-3xl">Availability</h1>
          <p className="mt-1 max-w-2xl text-sm text-mist sm:text-base">
            Generate 90 minute slots for each theatre, then block, edit, or delete only the exceptions.
          </p>
        </div>
        <input
          type="date"
          value={filterDate}
          min={today()}
          onChange={(e) => setFilterDate(e.target.value)}
          className="input-velvet w-full sm:w-auto"
        />
      </div>

      <section className="rounded-card border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber/10">
              <CalendarClock className="h-5 w-5 text-amber" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ivory">Default 90 Minute Mapping</h2>
              <p className="text-xs text-mist">{defaultTimes.join(', ')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => generateDefaults('selected')} disabled={saving || !form.room} className="btn-ghost justify-center disabled:opacity-50">
              <Clock3 className="h-4 w-4" />
              Selected Theatre
            </button>
            <button type="button" onClick={() => generateDefaults('all')} disabled={saving || theatres.length === 0} className="btn-primary justify-center disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              All Theatres
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 lg:grid-cols-6">
          <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} required className="input-velvet lg:col-span-2">
            <option value="">Select theatre</option>
            {theatres.map((theatre) => (
              <option key={theatre._id} value={theatre._id}>
                {theatre.name}{theatre.category ? ` - ${theatre.category.replace('-', ' ')}` : ''}
              </option>
            ))}
          </select>
          <input type="date" value={form.dateString} min={today()} onChange={(e) => setForm({ ...form, dateString: e.target.value })} className="input-velvet" />
          <input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="input-velvet" />
          <input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="input-velvet" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-velvet">
            <option value="available">Available</option>
            <option value="blocked">Blocked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input type="number" value={form.priceOverride} onChange={(e) => setForm({ ...form, priceOverride: e.target.value })} placeholder="Price override" className="input-velvet lg:col-span-2" />
          <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Internal note" className="input-velvet lg:col-span-3" />
          <button disabled={saving} className="btn-primary justify-center disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Add Custom
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-mist">{message}</p>}
      </section>

      <section className="overflow-hidden rounded-card border border-white/10 bg-white/[0.03]">
        {loading ? (
          <div className="p-10"><Loader2 className="h-8 w-8 animate-spin text-amber" /></div>
        ) : (
          <div className="divide-y divide-white/5">
            {visibleSlots.map((slot) => {
              const draft = editing[slot._id] || {};
              const status = draft.status ?? slot.status;
              return (
                <div key={slot._id} className="grid gap-4 p-4 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1fr_auto] xl:items-center sm:p-5">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-ivory">{slot.room?.name}</h3>
                    <p className="text-sm text-mist">{slot.dateString}</p>
                    <input
                      value={(draft.note ?? slot.note) || ''}
                      onChange={(e) => setEditing((current) => ({ ...current, [slot._id]: { ...current[slot._id], note: e.target.value } }))}
                      placeholder="Note"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-ivory outline-none focus:border-amber/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="time"
                      value={(draft.start ?? slot.start) || ''}
                      onChange={(e) => setEditing((current) => ({ ...current, [slot._id]: { ...current[slot._id], start: e.target.value } }))}
                      className="input-velvet"
                    />
                    <input
                      type="time"
                      value={(draft.end ?? slot.end) || ''}
                      onChange={(e) => setEditing((current) => ({ ...current, [slot._id]: { ...current[slot._id], end: e.target.value } }))}
                      className="input-velvet"
                    />
                  </div>
                  <input
                    type="number"
                    value={(draft.priceOverride ?? slot.priceOverride ?? '') as string | number}
                    onChange={(e) => setEditing((current) => ({ ...current, [slot._id]: { ...current[slot._id], priceOverride: e.target.value } }))}
                    placeholder="Price"
                    className="input-velvet"
                  />
                  <select
                    value={status}
                    onChange={(e) => setEditing((current) => ({ ...current, [slot._id]: { ...current[slot._id], status: e.target.value } }))}
                    className="input-velvet"
                  >
                    <option value="available">Available</option>
                    <option value="blocked">Blocked</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => saveSlot(slot)} className="btn-ghost px-3">
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button onClick={() => deleteSlot(slot._id)} className="rounded-lg bg-white/5 p-3 text-mist transition-colors hover:text-coral">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {visibleSlots.length === 0 && <div className="p-10 text-center text-mist">No slots for this date yet. Generate defaults to fill the day.</div>}
          </div>
        )}
      </section>
    </div>
  );
}
