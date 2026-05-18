import React, { useState } from 'react';
import { Menu, ArrowRight, Layout, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const navigateTo = (screen) => setCurrentScreen(screen);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      {currentScreen === 'intro' && <IntroScreen onNext={() => navigateTo('select')} />}
      {currentScreen === 'select' && (
        <SubjectSelectionScreen
          onBack={() => navigateTo('intro')}
          onSelect={handleSelectSubject}
        />
      )}
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
            Built at the intersection of minimal design and robust technology.
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

function SubjectSelectionScreen({ onBack, onSelect }) {
  const subjects = [
    { id: 1, title: 'Data Modeling and Visualization', category: 'Subject' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <TopNav
        onLogoClick={onBack}
        rightAction={<PillButton dark={false} onClick={onBack}>Go Back</PillButton>}
      />

      <main className="flex-1 px-6 md:px-12 max-w-7xl mx-auto w-full py-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">Select your Subject</h2>
          <p className="text-gray-500 text-lg">Choose a discipline to open your customized dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onSelect(sub.title)}
              className="group bg-white border border-gray-100 p-8 rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-16 transition-colors group-hover:bg-white/10">
                <Layout size={32} className="text-black group-hover:text-white" />
              </div>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 mb-2 uppercase tracking-wider">
                {sub.category}
              </p>
              <h3 className="text-2xl font-medium tracking-tight flex justify-between items-center">
                {sub.title}
                <ChevronRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
