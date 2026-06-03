'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Gift, Loader2, Save } from 'lucide-react';

type AddOn = { _id: string; name: string; category: string; description?: string; price: number; isActive: boolean };

const categories = ['decor', 'food', 'cake', 'photo', 'effects', 'entertainment', 'personalization'];

export default function AdminAddOnsPage() {
  const [addons, setAddons] = useState<AddOn[]>([]);
  const [form, setForm] = useState({ name: '', category: 'decor', description: '', price: 500, isActive: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAddOns();
  }, []);

  async function loadAddOns() {
    const res = await fetch('/api/admin/addons');
    const json = await res.json();
    if (json.status === 'success') setAddons(json.data || []);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/addons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setForm({ name: '', category: 'decor', description: '', price: 500, isActive: true });
      loadAddOns();
    }
  }

  async function toggleActive(addon: AddOn) {
    await fetch(`/api/admin/addons/${addon._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !addon.isActive }),
    });
    loadAddOns();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-ivory">Add-ons</h1>
        <p className="text-mist mt-1">Manage optional decor, food, cake, effects, and personalization extras.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-card border border-white/10 bg-white/[0.03] p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
            <Gift className="h-5 w-5 text-amber" />
          </div>
          <h2 className="text-lg font-semibold text-ivory">Add New Add-on</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" className="input-velvet" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-velvet">
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="input-velvet" />
        </div>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="input-velvet w-full" />
        <button disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Add-on
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {addons.map((addon) => (
          <div key={addon._id} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber">{addon.category}</p>
                <h3 className="mt-2 font-semibold text-ivory">{addon.name}</h3>
                <p className="mt-2 text-sm text-mist">{addon.description}</p>
                <p className="mt-3 text-lg font-bold text-amber">₹{addon.price.toLocaleString()}</p>
              </div>
              <button onClick={() => toggleActive(addon)} className={`rounded-full px-3 py-1 text-xs ${addon.isActive ? 'bg-sage/10 text-sage' : 'bg-white/5 text-dusty'}`}>
                {addon.isActive ? 'Active' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
