import React, { useState } from 'react';
import { 
  Menu, 
  ArrowRight, 
  Search, 
  Bell, 
  ChevronRight, 
  Layout, 
  Star,
  CheckCircle2
} from 'lucide-react';

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
      {currentScreen === 'select' && <SubjectSelectionScreen onBack={() => navigateTo('intro')} onSelect={handleSelectSubject} />}
      {currentScreen === 'dashboard' && <DashboardScreen subject={selectedSubject} onBack={() => navigateTo('select')} />}
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
                <img 
                  src="/icons8-data-modelling-64 (1).png" 
                  alt="Data Modeling Logo" 
                  className="w-12 h-12 object-contain"
                />
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

function DashboardScreen({ subject, onBack }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <Layout size={18} />
            </div>
            <span className="font-bold text-lg hidden md:block tracking-tight">Everything.</span>
          </div>
          
          <div className="hidden lg:flex items-center bg-gray-50 px-4 py-2 rounded-full w-96 border border-gray-100 focus-within:border-black transition-colors">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search components, topics..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="hidden md:block cursor-pointer hover:opacity-70">Courses</span>
          <span className="hidden md:block cursor-pointer hover:opacity-70">Tutorials</span>
          <span className="hidden md:block cursor-pointer hover:opacity-70">Practice</span>
          <div className="w-px h-4 bg-gray-200 mx-2 hidden md:block"></div>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 cursor-pointer">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Felix`} alt="User" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        
        <aside className="w-72 border-r border-gray-100 hidden md:flex flex-col h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto bg-white p-6">
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Current Subject</p>
            <h3 className="text-xl font-medium tracking-tight bg-gray-50 p-4 rounded-2xl border border-gray-100">{subject || 'Selected Subject'}</h3>
          </div>

          <nav className="space-y-1">
             <SidebarItem title="Module 1: Introduction" active />
             <SidebarItem title="Module 2: Core Concepts" />
             <SidebarItem title="Module 3: Advanced Methods" />
             <SidebarItem title="Module 4: Practical Apps" />
          </nav>

          <div className="mt-8 space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Resources</p>
            <SidebarItem title="Grades" icon={false} />
            <SidebarItem title="Notes" icon={false} />
            <SidebarItem title="Discussion Forums" icon={false} />
            <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 rounded-xl cursor-pointer hover:bg-gray-50">
              <span>Messages</span>
              <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">4</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-[#fafafa]">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-2">Congratulations on completing this section!</h2>
              <p className="text-gray-500 mb-8">Course 4 of 8 | Completed: May 18, 2026 | Grade: 90%</p>
              <div className="flex gap-4">
                <PillButton dark={true}>Add to Profile</PillButton>
                <PillButton dark={false}>View Certificate</PillButton>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
              <h3 className="text-xl font-medium tracking-tight mb-4 md:mb-0">Rate this subject</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm mr-2 font-medium">Rate this course</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={24} className="text-gray-200 cursor-pointer hover:text-black transition-colors" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm mt-12">
               <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{subject || 'Content Placeholder'} Overview</h1>
               <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-100">
                 <span>Last Updated: 18 May, 2026</span>
               </div>
               
               <div className="prose prose-lg max-w-none text-gray-600">
                 <p className="text-xl leading-relaxed text-black mb-8">
                   This section provides an optimization method that adapts parameters based on past 
                   data, improving learning for features with different frequencies.
                 </p>
                 <ul className="space-y-4 mb-12 list-none p-0">
                   {['Adjusts learning rate individually for each parameter', 'Uses accumulated past gradients to scale updates', 'Works well for sparse data and varying feature magnitudes'].map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 flex-shrink-0"></span>
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>

                 <h3 className="text-2xl font-medium text-black tracking-tight mb-6">Working Algorithm</h3>
                 <p className="mb-6">
                   The algorithm begins by initializing the parameter values randomly, just like other optimization 
                   methods. Additionally, it initializes a running sum which will track changes over time.
                 </p>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ title, active = false, icon = true }) {
  return (
    <div className={`
      flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-black text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}
    `}>
      {icon && (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${active ? 'border-white/30 text-white' : 'border-gray-300 text-transparent'}`}>
          <CheckCircle2 size={14} className={active ? 'opacity-100' : 'opacity-0'} />
        </div>
      )}
      <span className="text-sm">{title}</span>
    </div>
  );
}
