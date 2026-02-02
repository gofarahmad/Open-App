
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackageLauncher } from './components/PackageLauncher';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-[-1] bg-pattern opacity-50 pointer-events-none"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <div className="w-full max-w-[640px] flex flex-col items-center">
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
