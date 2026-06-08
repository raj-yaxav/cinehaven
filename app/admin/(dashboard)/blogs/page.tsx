'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Bold,
  CheckCircle2,
  Edit3,
  Eye,
  FilePlus2,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Save,
  Search,
  Star,
  Trash2,
  XCircle,
} from 'lucide-react';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  isFeatured: boolean;
  isPublished: boolean;
  authorName: string;
  publishedAt: string;
};

type BlogForm = Omit<BlogPost, '_id' | 'publishedAt'>;

const emptyForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'CineHaven journal',
  image: 'https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png',
  readTime: '4 min read',
  isFeatured: false,
  isPublished: true,
  authorName: 'CineHaven Team',
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs?admin=true');
      const json = await res.json();
      if (json.status === 'success') {
        setBlogs(json.data);
      }
    } catch {
      setError('Unable to load blogs');
    } finally {
      setLoading(false);
    }
  }

  function updateForm<K extends keyof BlogForm>(key: K, value: BlogForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((current) => ({
      ...current,
      title,
      slug: editingId ? current.slug : slugify(title),
    }));
  }

  function startEdit(blog: BlogPost) {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      image: blog.image,
      readTime: blog.readTime,
      isFeatured: blog.isFeatured,
      isPublished: blog.isPublished,
      authorName: blog.authorName,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  }

  function insertContent(before: string, after = '', placeholder = 'selected text') {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.slice(start, end) || placeholder;
    const nextContent = `${form.content.slice(0, start)}${before}${selected}${after}${form.content.slice(end)}`;

    updateForm('content', nextContent);

    requestAnimationFrame(() => {
      textarea.focus();
      const nextStart = start + before.length;
      const nextEnd = nextStart + selected.length;
      textarea.setSelectionRange(nextStart, nextEnd);
    });
  }

  function insertBlock(prefix: string, placeholder = 'Write here') {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const needsLineBreak = start > 0 && form.content[start - 1] !== '\n';
    const insert = `${needsLineBreak ? '\n' : ''}${prefix}${placeholder}`;
    const nextContent = `${form.content.slice(0, start)}${insert}${form.content.slice(start)}`;

    updateForm('content', nextContent);

    requestAnimationFrame(() => {
      textarea.focus();
      const nextStart = start + insert.length - placeholder.length;
      textarea.setSelectionRange(nextStart, nextStart + placeholder.length);
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.status !== 'success') {
        setError(json.message || 'Unable to save blog');
        return;
      }

      resetForm();
      fetchBlogs();
    } catch {
      setError('Unable to save blog');
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm('Delete this blog post?')) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchBlogs();
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ivory">Blogs</h1>
          <p className="text-mist mt-1">Create and publish journal stories for the public blog.</p>
        </div>
        <Link href="/blog" target="_blank" className="btn-ghost inline-flex justify-center text-sm">
          <Eye className="h-4 w-4" />
          View Blog
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <FilePlus2 className="h-5 w-5 text-amber" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ivory">{editingId ? 'Edit Article' : 'Write Article'}</h2>
              <p className="text-xs text-mist">Start with the article body, then add SEO and publishing details.</p>
            </div>
          </div>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-dusty hover:text-ivory">
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <input
              value={form.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Article title"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-semibold text-ivory outline-none focus:border-amber"
            />

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-midnight/40 p-3">
                <button type="button" onClick={() => insertContent('**', '**', 'bold text')} title="Bold" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <Bold className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertContent('*', '*', 'italic text')} title="Italic" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <Italic className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertContent('[', '](https://example.com)', 'link text')} title="Link" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <Link2 className="h-4 w-4" />
                </button>
                <span className="h-6 w-px bg-white/10" />
                <button type="button" onClick={() => insertBlock('## ', 'Section heading')} title="Heading" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <Heading2 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertBlock('- ', 'List item')} title="Bullet list" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <List className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertBlock('1. ', 'List item')} title="Numbered list" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertBlock('> ', 'Quote text')} title="Quote" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <Quote className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => insertContent('![', '](https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png)', 'Image alt text')} title="Image" className="p-2 rounded-lg text-mist hover:bg-white/10 hover:text-ivory">
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
              <textarea
                ref={contentRef}
                value={form.content}
                onChange={(event) => updateForm('content', event.target.value)}
                placeholder="Write the article content here. Use the toolbar for bold, italic, links, headings, lists, quotes, and images."
                required
                rows={18}
                className="w-full resize-y bg-transparent px-4 py-4 font-mono text-sm leading-7 text-ivory outline-none placeholder:text-dusty"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-midnight/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-ivory">Article preview</p>
                <p className="text-xs text-dusty">{form.content.trim().split(/\s+/).filter(Boolean).length} words</p>
              </div>
              <div className="max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-white/[0.03] p-4 text-sm leading-7 text-mist">
                {form.content || 'Preview appears here as you write.'}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-midnight/40 p-4">
              <h3 className="mb-4 text-sm font-semibold text-ivory">SEO & Card Details</h3>
              <textarea
                value={form.excerpt}
                onChange={(event) => updateForm('excerpt', event.target.value)}
                placeholder="Short excerpt for cards and SEO"
                required
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-midnight/40 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-ivory">Publishing Details</h3>
              <input
                value={form.slug}
                onChange={(event) => updateForm('slug', slugify(event.target.value))}
                placeholder="blog-slug"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
              <input
                value={form.category}
                onChange={(event) => updateForm('category', event.target.value)}
                placeholder="Category"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
              <input
                value={form.image}
                onChange={(event) => updateForm('image', event.target.value)}
                placeholder="https://res.cloudinary.com/dq3typk9u/image/upload/v1780913950/cinehaven/hero-birthday.png"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
              <input
                value={form.readTime}
                onChange={(event) => updateForm('readTime', event.target.value)}
                placeholder="4 min read"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
              <input
                value={form.authorName}
                onChange={(event) => updateForm('authorName', event.target.value)}
                placeholder="Author name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-amber"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-midnight/40 p-4 space-y-4">
              <label className="flex items-center justify-between gap-3 text-sm text-mist">
                <span>Published</span>
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) => updateForm('isPublished', event.target.checked)}
                  className="h-4 w-4 accent-amber"
                />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm text-mist">
                <span>Featured story</span>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(event) => updateForm('isFeatured', event.target.checked)}
                  className="h-4 w-4 accent-amber"
                />
              </label>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingId ? 'Update Article' : 'Publish Article'}
            </button>
          </aside>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-2 text-sm text-coral">
            <XCircle className="h-4 w-4" />
            {error}
          </p>
        )}
      </form>

      <div className="rounded-card border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-amber" />
            <h2 className="text-lg font-semibold text-ivory">Published Library</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dusty" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search blogs..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-ivory outline-none focus:border-amber sm:w-72"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-10 text-center text-mist">No blog posts yet.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {blog.isFeatured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber/20 bg-amber/10 px-2 py-1 text-xs text-amber">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                      blog.isPublished ? 'bg-sage/10 text-sage' : 'bg-white/5 text-dusty'
                    }`}>
                      {blog.isPublished ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-ivory">{blog.title}</h3>
                  <p className="mt-1 text-sm text-mist">/{blog.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 rounded-lg bg-white/5 text-mist hover:text-amber">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button onClick={() => startEdit(blog)} className="p-2 rounded-lg bg-white/5 text-mist hover:text-sage">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteBlog(blog._id)} className="p-2 rounded-lg bg-white/5 text-mist hover:text-coral">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
