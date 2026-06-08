'use client';

import { memo } from 'react';

interface SummaryRowProps {
  icon: any;
  label: string;
  value: string;
  empty?: boolean;
}

export const SummaryRow = memo(function SummaryRow({ icon: Icon, label, value, empty }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-mist">
        <Icon className="h-4 w-4 text-amber/70" />
        <span>{label}</span>
      </div>
      <span className={`text-sm font-medium text-right ${empty ? 'text-dusty italic' : 'text-ivory'}`}>
        {value}
      </span>
    </div>
  );
});
