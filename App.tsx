import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { PackageLauncher } from './components/PackageLauncher.tsx';
import { Stats } from './components/Stats.tsx';
import { Footer } from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-primary/30">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col items-center px-4 py-12 lg:py-24 max-w-7xl mx-auto w-full">
        <div className="w-full max-w-[680px]">
          <Hero />
          <PackageLauncher />
          <Stats />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;