
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-[#0f172a]">
            <span className="material-symbols-outlined text-xl font-bold">robot_2</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            DroidLaunch <span className="text-primary">PWA</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 mr-6 text-sm font-medium text-slate-400">
            <a className="hover:text-primary transition-colors cursor-pointer">Documentation</a>
            <a className="hover:text-primary transition-colors cursor-pointer">Support</a>
          </nav>
          
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-800 text-slate-300 hover:text-primary transition-all border border-slate-700">
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white text-slate-900 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined">code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
