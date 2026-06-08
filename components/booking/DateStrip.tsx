'use client';

import { memo, useMemo } from 'react';

interface DateStripProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

const getNextDays = (count: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
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

export const DateStrip = memo(function DateStrip({ selectedDate, onSelect }: DateStripProps) {
  const dateOptions = useMemo(() => getNextDays(14), []);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <div className="rounded-card border border-black/6 bg-black/[0.015] p-4 backdrop-blur-md">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {dateOptions.map((dateStr) => {
          const parts = formatDateParts(dateStr);
          const isActive = selectedDate === dateStr;
          const isToday = dateStr === todayStr;
          return (
            <button
              key={dateStr}
              onClick={() => onSelect(dateStr)}
              className={`shrink-0 flex flex-col items-center min-w-[68px] py-3 px-3 rounded-xl border transition-all ${
                isActive
                  ? 'bg-amber text-midnight border-amber shadow-burgundy-glow'
                  : 'bg-black/[0.01] text-ivory border-black/6 hover:border-amber/40 hover:bg-black/[0.03]'
              }`}
            >
              <span className={`text-[10px] uppercase font-semibold tracking-wider ${
                isActive ? 'text-midnight' : 'text-mist'
              }`}>{parts?.weekday}</span>
              <span className="text-2xl font-bold my-0.5">{parts?.day}</span>
              <span className={`text-[10px] uppercase ${isActive ? 'text-midnight' : 'text-mist'}`}>{parts?.month}</span>
              {isToday && !isActive && <span className="mt-1 h-1 w-1 rounded-full bg-amber" />}
            </button>
          );
        })}
      </div>
    </div>
  );
});
