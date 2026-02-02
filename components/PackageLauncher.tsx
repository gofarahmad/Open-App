
import React, { useState, useCallback } from 'react';
import { findPackageName } from '../services/geminiService';

export const PackageLauncher: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLaunch = useCallback(() => {
    if (!packageName.trim()) {
      setError('Please enter a package name');
      return;
    }

    // Android Intent URI construction
    // Standard format for launching apps by package ID
    const intentUrl = `intent://#Intent;package=${packageName.trim()};scheme=package;end`;
    
    // Attempt to open
    window.location.assign(intentUrl);
    setError(null);
  }, [packageName]);

  const handleSearchAssistant = async () => {
    const prompt = window.prompt("What app are you looking for? (e.g. Instagram, Netflix)");
    if (!prompt) return;

    setIsSearching(true);
    setError(null);
    try {
      const result = await findPackageName(prompt);
      if (result === 'unknown') {
        setError(`Could not find package for "${prompt}"`);
      } else {
        setPackageName(result);
      }
    } catch (err) {
      setError('Failed to query assistant');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full glass-card rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all duration-700"></div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center pb-2">
            <span className="text-slate-200 text-sm font-semibold uppercase tracking-wide">Package Name</span>
            <button 
              onClick={handleSearchAssistant}
              className="text-primary text-xs font-medium cursor-pointer flex items-center gap-1 hover:underline disabled:opacity-50"
              disabled={isSearching}
            >
              <span className="material-symbols-outlined text-sm">
                {isSearching ? 'autorenew' : 'info'}
              </span>
              {isSearching ? 'Consulting Gemini...' : 'Where to find?'}
            </button>
          </div>
          
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
              <span className="material-symbols-outlined">package_2</span>
            </div>
            <input 
              className="w-full pl-12 pr-4 rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-700 bg-slate-950/50 focus:border-primary h-16 placeholder:text-slate-600 text-lg font-medium transition-all"
              placeholder="e.g., com.whatsapp"
              value={packageName}
              onChange={(e) => {
                setPackageName(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLaunch()}
            />
          </div>
          {error && <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>}
        </div>

        <div className="flex pt-2">
          <button 
            onClick={handleLaunch}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-16 px-8 bg-primary text-[#0f172a] hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(33,196,93,0.3)] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-lg font-bold tracking-tight">
              <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">rocket</span>
              <span>Open Application</span>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-slate-800 pt-6 mt-2 text-center">
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
            Ensure the application is installed on your Android device. This PWA uses 
            <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-800 text-primary font-mono text-xs italic">intent://</code> 
            schemes to trigger direct launches.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Secure
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">bolt</span>
              No Latency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
