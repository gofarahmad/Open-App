import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-slate-950/20 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">android</span>
            <span className="text-sm font-black tracking-tighter uppercase">DroidLaunch</span>
          </div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
            Built for power users &bull; &copy; {new Date().getFullYear()}
          </p>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <a className="hover:text-primary transition-colors cursor-pointer">Open Source</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Security</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Contact</a>
          <button className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </footer>
  );
};