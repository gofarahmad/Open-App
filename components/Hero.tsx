
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
        <span className="material-symbols-outlined text-sm">rocket_launch</span>
        Direct Deep Linking
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4">
        Open Android App <br />
        <span className="text-primary">Instantly.</span>
      </h1>
      <p className="text-slate-400 text-lg max-w-md mx-auto">
        Launch any installed application on your device by specifying its package unique identifier.
      </p>
    </div>
  );
};
