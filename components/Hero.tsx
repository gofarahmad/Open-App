import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
        <span className="material-symbols-outlined text-base">rocket_launch</span>
        Direct Deep Linking
      </div>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] mb-6">
        Open Android App <br />
        <span className="text-primary italic">Instantly.</span>
      </h2>
      <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
        Launch any installed application on your device by specifying its unique package identifier.
      </p>
    </div>
  );
};