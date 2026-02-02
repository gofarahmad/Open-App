import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { findPackageName, getPopularPackages } from '../services/geminiService.ts';

export const PackageLauncher: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{ name: string; id: string; iconUrl?: string }[]>([]);

  useEffect(() => {
    getPopularPackages().then(setSuggestions);
  }, []);

  const selectedApp = useMemo(() => {
    const trimmed = packageName.trim().toLowerCase();
    if (!trimmed) return null;
    return suggestions.find(s => s.id.toLowerCase() === trimmed);
  }, [packageName, suggestions]);

  const handleLaunch = useCallback((id?: string) => {
    const target = id || packageName.trim();
    if (!target) {
      setError('Enter a package name');
      return;
    }
    // Attempt to launch via intent
    const intentUrl = `intent://#Intent;package=${target};scheme=package;end`;
    window.location.assign(intentUrl);
    setError(null);
  }, [packageName]);

  const handleAIQuery = async () => {
    const prompt = window.prompt("What app are you looking for? (e.g., 'Netflix', 'Mobile Legends')");
    if (!prompt) return;
    
    setIsSearching(true);
    setError(null);
    try {
      const result = await findPackageName(prompt);
      if (result === 'unknown') {
        setError(`Could not identify package for "${prompt}"`);
      } else {
        setPackageName(result);
        if (window.confirm(`Found: ${result}\nLaunch now?`)) {
          handleLaunch(result);
        }
      }
    } catch (err) {
      setError('AI service unavailable');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full glass-panel rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group">
      {/* Accent lighting */}
      <div className="absolute -top-12 -left-12 size-40 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10 flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-8 bg-primary/10 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary text-xl notranslate">terminal</span>
              </div>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] font-mono">
                App Identifier
              </span>
            </div>
            <button 
              onClick={handleAIQuery}
              disabled={isSearching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-base notranslate ${isSearching ? 'animate-spin' : ''}`}>
                {isSearching ? 'progress_activity' : 'psychology'}
              </span>
              <span>{isSearching ? 'Searching...' : 'AI Lookup'}</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500">
              <span className="material-symbols-outlined text-2xl notranslate">settings_suggest</span>
            </div>
            <input 
              type="text"
              className="w-full h-16 md:h-20 bg-slate-950/60 border border-white/10 rounded-2xl pl-16 pr-16 text-xl font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-mono"
              placeholder="com.android.settings"
              value={packageName}
              onChange={(e) => {
                setPackageName(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLaunch()}
            />
            {selectedApp && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="size-10 md:size-12 rounded-xl bg-slate-900 border border-white/10 p-1 shadow-2xl overflow-hidden">
                  <img src={selectedApp.iconUrl} alt={selectedApp.name} className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            )}
          </div>
          {error && (
            <div className="px-2 flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
              <span className="material-symbols-outlined text-sm notranslate">error</span>
              {error}
            </div>
          )}
        </div>

        {/* Main Launch Button */}
        <button 
          onClick={() => handleLaunch()}
          className="w-full h-16 md:h-20 bg-primary hover:bg-emerald-400 text-slate-950 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20"
        >
          <span className="material-symbols-outlined text-3xl font-bold notranslate">bolt</span>
          <span className="text-xl font-black uppercase tracking-wide">Launch App</span>
        </button>

        {/* Shortcuts Section */}
        <div className="pt-4 border-t border-white/5">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">Popular Shortcuts</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {suggestions.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setPackageName(app.id);
                  handleLaunch(app.id);
                }}
                className={`group/btn flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  packageName.toLowerCase() === app.id.toLowerCase()
                  ? 'bg-primary/10 border-primary/40'
                  : 'bg-white/5 border-white/5 hover:border-primary/30 hover:bg-white/10'
                }`}
              >
                <div className="size-10 bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 group-hover/btn:scale-110 transition-transform">
                  {app.iconUrl ? (
                    <img src={app.iconUrl} alt={app.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-xl flex h-full w-full items-center justify-center notranslate">android</span>
                  )}
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-xs font-black text-white truncate w-full text-left">{app.name}</span>
                  <span className="text-[8px] font-mono text-slate-500 truncate w-full text-left opacity-60">{app.id}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-2">
          Optimized for Chrome on Android &bull; Safe Deep Linking
        </p>
      </div>
    </div>
  );
};