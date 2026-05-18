import React, { useState } from 'react';
import { Menu, ArrowRight, Layout } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const navigateTo = (screen) => setCurrentScreen(screen);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      {currentScreen === 'intro' && <IntroScreen onNext={() => navigateTo('select')} />}
    </div>
  );
}

const TopNav = ({ rightAction, onLogoClick }) => (
  <nav className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={onLogoClick}
    >
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white transform transition-transform group-hover:-rotate-12">
        <Layout size={18} />
      </div>
      <span className="font-bold text-xl tracking-tight">Everything.</span>
    </div>
    <div className="flex items-center gap-4">
      {rightAction}
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Menu size={24} />
      </button>
    </div>
  </nav>
);

const PillButton = ({ children, onClick, dark = true, icon = null }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
      ${dark
        ? 'bg-black text-white hover:bg-gray-800 hover:scale-105'
        : 'bg-white text-black border border-gray-200 hover:bg-gray-50'
      }
    `}
  >
    {children}
    {icon}
  </button>
);

function IntroScreen({ onNext }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNav rightAction={<PillButton dark={true} onClick={onNext}>Get Started</PillButton>} />
        <main className="flex-1 flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto w-full mb-20">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium leading-[1.05] tracking-tight mb-8 max-w-4xl">
            Everything you need <br className="hidden md:block" /> to know.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            A comprehensive, meticulously designed dashboard for all your learning and data needs.
          </p>
          <div className="flex items-center gap-4">
            <PillButton onClick={onNext} icon={<ArrowRight size={18} />}>
              Explore Subjects
            </PillButton>
          </div>
        </main>
        <div className="bg-black text-white p-8 md:p-12 rounded-t-[2.5rem] mt-auto mx-2 md:mx-6">
          <div className="flex justify-between items-center opacity-80 text-sm">
            <span>© 2026 Everything Platform</span>
            <span>Based on Minimalist Design Principles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
