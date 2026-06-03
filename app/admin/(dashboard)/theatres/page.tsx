'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Building2, Edit3, ImagePlus, Loader2, Plus, Save, Trash2, X } from 'lucide-react';

type Theatre = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  capacity: { min: number; max: number };
  screenSize?: string;
  soundSystem?: string;
  features?: string[];
  categories?: string[];
  basePrice: number;
  pricePerExtraPerson?: number;
  isActive: boolean;
};

const theatreCategories = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date-night', label: 'Date Night' },
  { value: 'friends', label: 'Friends Party' },
  { value: 'family', label: 'Family Gathering' },
  { value: 'corporate', label: 'Corporate Event' },
];

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  capacityMin: 2,
  capacityMax: 8,
  screenSize: 'Large 4K Screen',
  soundSystem: 'Premium Dolby Sound',
  features: [] as string[],
  categories: ['birthday'] as string[],
  basePrice: 3000,
  pricePerExtraPerson: 300,
  isActive: true,
  images: [] as string[],
  newFeature: '',
  newCategory: '',
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-ivory">
        {label}
        {hint && <span className="ml-1 text-mist font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }: { icon: any; title: string; description?: string }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
      <div className="h-9 w-9 rounded-lg bg-amber/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-amber" />
      </div>
      <div>
        <h3 className="font-semibold text-ivory">{title}</h3>
        {description && <p className="text-xs text-mist">{description}</p>}
      </div>
    </div>
  );
}

export default function AdminTheatresPage() {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [availableCategories, setAvailableCategories] = useState(theatreCategories);

  useEffect(() => {
    fetchTheatres();
  }, []);

  async function fetchTheatres() {
    setLoading(true);
    const res = await fetch('/api/admin/theatres', { credentials: 'include' });
    const json = await res.json();
    if (json.status === 'success') {
      const activeTheatres = (json.data.theatres || []).filter((theatre: Theatre) => theatre.isActive !== false);
      setTheatres(activeTheatres);
    }
    setLoading(false);
  }

  function updateField(name: string, value: string | number | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(theatre: Theatre) {
    setEditingId(theatre._id);
    setForm({
      name: theatre.name,
      slug: theatre.slug,
      description: theatre.description || '',
      capacityMin: theatre.capacity?.min || 2,
      capacityMax: theatre.capacity?.max || 8,
      screenSize: theatre.screenSize || '',
      soundSystem: theatre.soundSystem || '',
      features: theatre.features || [],
      categories: theatre.categories || ['birthday'],
      basePrice: theatre.basePrice || 0,
      pricePerExtraPerson: theatre.pricePerExtraPerson || 0,
      isActive: theatre.isActive,
      images: (theatre as any).images || [],
      newFeature: '',
      newCategory: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
  }

async function handleSubmit(event: FormEvent) {
  event.preventDefault();
  setSaving(true);
  
  const payload = {
    name: form.name,
    slug: form.slug,
    description: form.description,
    capacity: { min: form.capacityMin, max: form.capacityMax },
    screenSize: form.screenSize,
    soundSystem: form.soundSystem,
    features: form.features,
    categories: form.categories,
    basePrice: form.basePrice,
    pricePerExtraPerson: form.pricePerExtraPerson,
    isActive: form.isActive,
    images: form.images,
  };
  
  // ⭐ DEBUG: See exactly what the form is sending
  console.log('📤 FRONTEND → API payload:', payload);
  console.log('📤 categories type:', Array.isArray(payload.categories), payload.categories);
  
  try {
    const res = await fetch(
      editingId ? `/api/admin/theatres/${editingId}` : '/api/admin/theatres',
      {
        method: editingId ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    
    const json = await res.json();
    
    // ⭐ DEBUG: See what the API returns
    console.log('📥 API response:', json);
    
    setSaving(false);
    if (json.status === 'success') {
      setMessage(editingId ? 'Theatre updated' : 'Theatre added');
      resetForm();
      fetchTheatres();
    } else {
      setMessage(json.message || 'Unable to save theatre');
    }
  } catch (err) {
    console.error('❌ Network/fetch error:', err);
    setSaving(false);
    setMessage('Network error. Please try again.');
  }
}

  async function deleteTheatre(id: string) {
    if (!confirm('Delete this theatre? This will disable it for bookings.')) return;

    setSaving(true);
    const res = await fetch(`/api/admin/theatres/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const json = await res.json();
    setSaving(false);

    if (json.status === 'success') {
      setMessage('Theatre deleted');
      setTheatres((current) => current.filter((item) => item._id !== id));
    } else {
      setMessage(json.message || 'Unable to delete theatre');
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ivory">Delhi Theatres</h1>
          <p className="text-mist mt-1">Manage private theatres shown under the single Delhi location.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-mist">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          {theatres.length} active
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="rounded-card border border-white/10 bg-white/[0.03] overflow-hidden">
        {/* Form Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
              {editingId ? <Edit3 className="h-5 w-5 text-amber" /> : <Plus className="h-5 w-5 text-amber" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ivory">{editingId ? 'Edit Theatre' : 'Add New Theatre'}</h2>
              <p className="text-xs text-mist">{editingId ? 'Update theatre details below' : 'Fill in the details to create a new theatre listing'}</p>
            </div>
          </div>
          {editingId && (
            <button type="button" onClick={resetForm} className="flex items-center gap-1.5 text-sm text-mist hover:text-ivory transition-colors">
              <X className="h-4 w-4" />
              Cancel editing
            </button>
          )}
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <SectionHeader icon={Building2} title="Basic Information" />
            <div className="grid gap-5 md:grid-cols-2">
              <FieldGroup label="Theatre Name" hint="e.g. Room 7, The Vault">
                <input
                  value={form.name}
                  onChange={(e) => setForm((current) => ({ ...current, name: e.target.value, slug: editingId ? current.slug : slugify(e.target.value) }))}
                  required
                  placeholder="Enter theatre name"
                  className="input-velvet"
                />
              </FieldGroup>
              <FieldGroup label="URL Slug" hint="auto-generated">
                <input
                  value={form.slug}
                  onChange={(e) => updateField('slug', slugify(e.target.value))}
                  required
                  placeholder="auto-generated-from-name"
                  className="input-velvet font-mono text-sm"
                />
              </FieldGroup>
            </div>
            <div className="space-y-4">
              <FieldGroup label="Service Categories" hint="Select multiple categories this theatre suits">
                <div className="grid grid-cols-2 gap-2">
                  {theatreCategories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2 p-2 rounded-lg border border-white/10 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={form.categories.includes(cat.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm((curr) => ({
                              ...curr,
                              categories: [...curr.categories, cat.value],
                            }));
                          } else {
                            setForm((curr) => ({
                              ...curr,
                              categories: curr.categories.filter((c) => c !== cat.value),
                            }));
                          }
                        }}
                        className="w-4 h-4 rounded accent-amber cursor-pointer"
                      />
                      <span className="text-sm text-ivory">{cat.label}</span>
                    </label>
                  ))}
                </div>
                {form.categories.length === 0 && (
                  <p className="text-xs text-coral mt-2">Select at least one category</p>
                )}
              </FieldGroup>

              {/* Add new category */}
              <FieldGroup label="Add New Category" hint="Or add custom category">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={form.newCategory}
                    onChange={(e) => setForm((curr) => ({ ...curr, newCategory: e.target.value }))}
                    placeholder="e.g. Wedding Reception"
                    className="input-velvet flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (form.newCategory.trim()) {
                        const catValue = form.newCategory.toLowerCase().trim().replace(/\s+/g, '-');
                        if (!form.categories.includes(catValue)) {
                          setForm((curr) => ({
                            ...curr,
                            categories: [...curr.categories, catValue],
                            newCategory: '',
                          }));
                          const newCat = { value: catValue, label: form.newCategory };
                          setAvailableCategories((curr) => [...curr, newCat]);
                        }
                      }
                    }}
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </FieldGroup>
            </div>
          </div>

          {/* Capacity & Pricing */}
          <div className="space-y-4">
            <SectionHeader icon={Save} title="Capacity & Pricing" description="Define the guest range and booking rates" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <FieldGroup label="Min Capacity">
                <input
                  type="number"
                  value={form.capacityMin}
                  onChange={(e) => updateField('capacityMin', Number(e.target.value))}
                  min={1}
                  className="input-velvet"
                />
              </FieldGroup>
              <FieldGroup label="Max Capacity">
                <input
                  type="number"
                  value={form.capacityMax}
                  onChange={(e) => updateField('capacityMax', Number(e.target.value))}
                  min={1}
                  className="input-velvet"
                />
              </FieldGroup>
              <FieldGroup label="Base Price (₹)" hint="per session">
                <input
                  type="number"
                  value={form.basePrice}
                  onChange={(e) => updateField('basePrice', Number(e.target.value))}
                  min={0}
                  className="input-velvet"
                />
              </FieldGroup>
              <FieldGroup label="Extra Person (₹)" hint="per person above min">
                <input
                  type="number"
                  value={form.pricePerExtraPerson}
                  onChange={(e) => updateField('pricePerExtraPerson', Number(e.target.value))}
                  min={0}
                  className="input-velvet"
                />
              </FieldGroup>
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-4">
            <SectionHeader icon={Building2} title="Equipment Details" />
            <div className="grid gap-5 md:grid-cols-2">
              <FieldGroup label="Screen Size">
                <input
                  value={form.screenSize}
                  onChange={(e) => updateField('screenSize', e.target.value)}
                  placeholder="e.g. Large 4K Screen"
                  className="input-velvet"
                />
              </FieldGroup>
              <FieldGroup label="Sound System">
                <input
                  value={form.soundSystem}
                  onChange={(e) => updateField('soundSystem', e.target.value)}
                  placeholder="e.g. Premium Dolby Sound"
                  className="input-velvet"
                />
              </FieldGroup>
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-4">
            <SectionHeader icon={Plus} title="Description & Features" />
            <FieldGroup label="Theatre Description">
              <textarea
                value={form.description}
                onChange={(e) => setForm((curr) => ({ ...curr, description: e.target.value }))}
                placeholder="Describe what makes this theatre special..."
                rows={3}
                className="input-velvet w-full resize-none"
              />
            </FieldGroup>

            {/* Multiple Features Selection */}
            <FieldGroup label="Features" hint="Select or add multiple features">
              <div className="space-y-3">
                {form.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/10">
                    {form.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber/15 text-amber border border-amber/30"
                      >
                        <span className="text-sm font-medium">{feature}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((curr) => ({
                              ...curr,
                              features: curr.features.filter((f) => f !== feature),
                            }))
                          }
                          className="hover:text-amber/60 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={form.newFeature}
                    onChange={(e) => setForm((curr) => ({ ...curr, newFeature: e.target.value }))}
                    placeholder="e.g. Karaoke, PS5, Fog entry, Mood lighting"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (form.newFeature.trim() && !form.features.includes(form.newFeature.trim())) {
                          setForm((curr) => ({
                            ...curr,
                            features: [...curr.features, form.newFeature.trim()],
                            newFeature: '',
                          }));
                        }
                      }
                    }}
                    className="input-velvet flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (form.newFeature.trim() && !form.features.includes(form.newFeature.trim())) {
                        setForm((curr) => ({
                          ...curr,
                          features: [...curr.features, form.newFeature.trim()],
                          newFeature: '',
                        }));
                      }
                    }}
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {form.features.length < 8 && (
                  <div className="text-xs text-mist space-y-1">
                    <p>Suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Karaoke', 'PS5', 'Fog Entry', 'Mood Lighting', 'HDMI Available', 'Surround Sound', 'Dance Floor', 'Mirror Wall'].map(
                        (suggestion) =>
                          !form.features.includes(suggestion) && (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() =>
                                setForm((curr) => ({
                                  ...curr,
                                  features: [...curr.features, suggestion],
                                }))
                              }
                              className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-ivory transition-colors"
                            >
                              + {suggestion}
                            </button>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </FieldGroup>
          </div>
          {/* ^^^ This closing </div> was missing in the original - it closes "Description & Features" section */}

          {/* Images */}
          <div className="space-y-4">
            <SectionHeader icon={ImagePlus} title="Theatre Images" description="Upload photos to showcase the space" />

            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-amber/30 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  const selectedFiles = e.target.files;
                  if (!selectedFiles || selectedFiles.length === 0) return;

                  setSaving(true);
                  const fd = new FormData();
                  Array.from(selectedFiles).forEach((file) => fd.append('images', file));

                  const upRes = await fetch('/api/admin/theatres/upload', {
                    method: 'POST',
                    credentials: 'include',
                    body: fd,
                  });

                  const upJson = await upRes.json();
                  setSaving(false);

                  if (upJson.status !== 'success') {
                    setMessage(upJson.message || 'Unable to upload images');
                    return;
                  }

                  setForm((current) => ({
                    ...current,
                    images: upJson.imageUrls as string[],
                  }));
                  setMessage('Images uploaded successfully');
                }}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-amber/10 flex items-center justify-center">
                    <ImagePlus className="h-5 w-5 text-amber" />
                  </div>
                  <div>
                    <span className="text-amber font-medium">Click to upload</span>
                    <span className="text-mist"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-mist">PNG, JPG up to 10MB</p>
                </div>
              </label>
            </div>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {form.images.map((url, index) => (
                  <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, images: current.images.filter((_, i) => i !== index) }))}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Toggle */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`relative h-6 w-11 rounded-full transition-colors ${form.isActive ? 'bg-amber' : 'bg-white/10'}`}>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => updateField('isActive', e.target.checked)}
                  className="sr-only"
                />
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              <div>
                <span className="text-ivory font-medium">Active Status</span>
                <p className="text-xs text-mist">{form.isActive ? 'Visible to users' : 'Hidden from users'}</p>
              </div>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {message && (
                <span className="text-sm text-mist">{message}</span>
              )}
              <button disabled={saving} className="btn-primary disabled:opacity-50 flex items-center gap-2">
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {editingId ? 'Update Theatre' : 'Save Theatre'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Theatres Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ivory">All Theatres</h2>
          <span className="text-sm text-mist">{theatres.length} theatres</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber" />
          </div>
        ) : theatres.length === 0 ? (
          <div className="rounded-card border border-white/10 bg-white/[0.02] p-12 text-center">
            <Building2 className="h-12 w-12 text-mist mx-auto mb-4" />
            <p className="text-mist">No theatres yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {theatres.map((theatre) => (
              <div key={theatre._id} className="rounded-card border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-amber shrink-0" />
                      <h3 className="text-lg font-semibold text-ivory truncate">{theatre.name}</h3>
                      {!theatre.isActive && (
                        <span className="text-xs bg-white/10 text-mist px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-mist line-clamp-2">{theatre.description || 'No description'}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-dusty">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {theatre.capacity?.min}–{theatre.capacity?.max}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ₹{theatre.basePrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button onClick={() => startEdit(theatre)} className="p-2 rounded-lg bg-white/5 text-mist hover:text-amber hover:bg-amber/10 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTheatre(theatre._id)}
                      className="rounded-lg border border-red-500/20 bg-red-600/10 px-3 py-2 text-sm text-red-200 hover:bg-red-600/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
