
import React from 'react';

const STATS = [
  { value: '5k+', label: 'Daily Launches' },
  { value: '100%', label: 'Client Side' },
  { value: 'v2.4', label: 'Latest Version' }
];

export const Stats: React.FC = () => {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-[600px] text-center">
      {STATS.map((stat, idx) => (
        <div key={idx} className={`flex flex-col ${idx === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
          <span className="text-2xl font-bold text-white">{stat.value}</span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
