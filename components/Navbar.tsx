import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full h-16 md:h-20 border-b border-white/5 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
            <span className="material-symbols-outlined font-bold text-xl">android</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase">
            Droid<span className="text-primary">Launch</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Documentation
          </button>
          <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">info</span>
          </button>
          <button className="size-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">install_mobile</span>
          </button>
        </div>
      </div>
    </header>
  );
};