import React from 'react';

const STATS = [
  { value: '10k+', label: 'Deep Links' },
  { value: '100%', label: 'Private' },
  { value: 'v3.0', label: 'Engine' }
];

export const Stats: React.FC = () => {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-12 md:gap-20 opacity-60">
      {STATS.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="text-2xl font-black text-white">{stat.value}</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};