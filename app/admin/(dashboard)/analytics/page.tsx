'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    monthlyBookings: [12, 19, 15, 25, 32, 28, 35, 42, 38, 45, 52, 48],
    monthlyRevenue: [2.5, 3.8, 3.1, 5.2, 6.8, 5.9, 7.3, 8.9, 8.1, 9.5, 11.2, 10.4],
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-ivory">Analytics</h1>
        <p className="text-mist mt-1">Track your business performance</p>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-amber" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory">Monthly Revenue</h3>
              <p className="text-sm text-mist">Revenue in Lakhs (₹)</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-amber">₹10.4L</span>
        </div>

        <div className="flex items-end gap-2 h-64">
          {stats.monthlyRevenue.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 15) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="w-full bg-gradient-to-t from-amber/20 to-amber/60 rounded-t-lg group-hover:from-amber/30 group-hover:to-amber/70 transition-all"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-midnight border border-white/10 px-2 py-1 rounded text-xs text-ivory whitespace-nowrap">
                  ₹{value}L
                </div>
              </div>
              <span className="text-xs text-dusty">{months[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-coral/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-coral" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory">Monthly Bookings</h3>
              <p className="text-sm text-mist">Number of bookings per month</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-coral">48</span>
        </div>

        <div className="flex items-end gap-2 h-64">
          {stats.monthlyBookings.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 60) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="w-full bg-gradient-to-t from-coral/20 to-coral/60 rounded-t-lg group-hover:from-coral/30 group-hover:to-coral/70 transition-all"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-midnight border border-white/10 px-2 py-1 rounded text-xs text-ivory whitespace-nowrap">
                  {value} bookings
                </div>
              </div>
              <span className="text-xs text-dusty">{months[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
