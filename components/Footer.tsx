
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-slate-800 mt-auto bg-slate-900/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} DroidLaunch. Built for Android Power Users.
        </p>
        <div className="flex items-center gap-6">
          <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
          <a className="text-slate-400 hover:text-primary transition-colors font-mono text-xs cursor-pointer">GITHUB</a>
          <a className="text-slate-400 hover:text-primary transition-colors font-mono text-xs cursor-pointer">TERMS</a>
        </div>
      </div>
    </footer>
  );
};
