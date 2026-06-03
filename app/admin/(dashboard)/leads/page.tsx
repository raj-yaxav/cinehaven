'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowUpDown,
  Download,
  Eye,
  Edit3,
  Trash2,
} from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  location?: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  source: string;
  createdAt: string;
  notes?: string;
  assignedTo?: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [searchQuery, statusFilter, leads]);

  async function fetchLeads() {
    try {
      const res = await fetch('/api/leads');
      const json = await res.json();
      if (json.status === 'success') {
        setLeads(json.data);
        setFilteredLeads(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLeadStatus(leadId: string, newStatus: string) {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  }

  async function deleteLead(leadId: string) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchLeads();
        setShowDetailModal(false);
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  }

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    new: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/20' },
    contacted: { bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/20' },
    converted: { bg: 'bg-sage/10', text: 'text-sage', border: 'border-sage/20' },
    lost: { bg: 'bg-white/5', text: 'text-dusty', border: 'border-white/10' },
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Occasion', 'Status', 'Source', 'Date'];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.occasion || '-',
      lead.status,
      lead.source,
      new Date(lead.createdAt).toLocaleDateString('en-IN'),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ivory">Leads</h1>
          <p className="text-mist mt-1">Manage and track all your leads</p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber/30 bg-amber/10 text-amber hover:bg-amber/20 transition-all text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dusty" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-ivory placeholder-dusty focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'converted', 'lost'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                statusFilter === status
                  ? 'bg-amber/15 text-amber border border-amber/30'
                  : 'bg-white/5 text-mist border border-white/10 hover:border-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: leads.length, color: 'text-ivory' },
          { label: 'New', value: leads.filter((l) => l.status === 'new').length, color: 'text-coral' },
          { label: 'Contacted', value: leads.filter((l) => l.status === 'contacted').length, color: 'text-amber' },
          { label: 'Converted', value: leads.filter((l) => l.status === 'converted').length, color: 'text-sage' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-mist mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Lead</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Occasion</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Status</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Source</th>
                <th className="text-left px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Date</th>
                <th className="text-right px-6 py-4 text-xs font-accent uppercase tracking-[0.2em] text-dusty">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-mist">
                    <Users className="h-12 w-12 mx-auto mb-3 text-dusty" />
                    <p>No leads found</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber/10 flex items-center justify-center">
                          <span className="text-amber font-semibold text-sm">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ivory">{lead.name}</p>
                          {lead.assignedTo && (
                            <p className="text-xs text-dusty">Assigned: {lead.assignedTo}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-mist flex items-center gap-2">
                          <Mail className="h-3 w-3 text-dusty" />
                          {lead.email}
                        </p>
                        <p className="text-sm text-mist flex items-center gap-2">
                          <Phone className="h-3 w-3 text-dusty" />
                          {lead.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-mist capitalize">{lead.occasion || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border outline-none cursor-pointer ${
                          statusColors[lead.status].bg
                        } ${statusColors[lead.status].text} ${statusColors[lead.status].border}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-mist capitalize">{lead.source?.replace('_', ' ') ?? 'Direct'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-mist">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetailModal(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 text-mist hover:text-amber hover:bg-amber/10 transition-all"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowEditModal(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 text-mist hover:text-sage hover:bg-sage/10 transition-all"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="p-2 rounded-lg bg-white/5 text-mist hover:text-coral hover:bg-coral/10 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-midnight p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-ivory">Lead Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-dusty hover:text-ivory"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="h-14 w-14 rounded-full bg-amber/10 flex items-center justify-center">
                    <span className="text-amber font-bold text-xl">
                      {selectedLead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ivory">{selectedLead.name}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      statusColors[selectedLead.status].bg
                    } ${statusColors[selectedLead.status].text} ${statusColors[selectedLead.status].border}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-xs text-dusty mb-1">Email</p>
                    <p className="text-sm text-ivory flex items-center gap-2">
                      <Mail className="h-4 w-4 text-amber" />
                      {selectedLead.email}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-xs text-dusty mb-1">Phone</p>
                    <p className="text-sm text-ivory flex items-center gap-2">
                      <Phone className="h-4 w-4 text-amber" />
                      {selectedLead.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-xs text-dusty mb-1">Occasion</p>
                    <p className="text-sm text-ivory capitalize">{selectedLead.occasion || '-'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-xs text-dusty mb-1">Source</p>
                    <p className="text-sm text-ivory capitalize">{selectedLead.source?.replace('_', ' ') ?? 'Direct'}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-xs text-dusty mb-1">Created</p>
                  <p className="text-sm text-ivory flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber" />
                    {new Date(selectedLead.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>

                {selectedLead.notes && (
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-xs text-dusty mb-1">Notes</p>
                    <p className="text-sm text-mist">{selectedLead.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 btn-primary justify-center text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 btn-ghost justify-center text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
