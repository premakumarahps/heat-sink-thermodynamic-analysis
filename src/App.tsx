import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { FinSimulator } from './components/FinSimulator';
import { ConvectionBoundaryCalc } from './components/ConvectionBoundaryCalc';
import { RadiationStudio } from './components/RadiationStudio';
import { OperatingPointSolver } from './components/OperatingPointSolver';
import { FinProfilesGallery } from './components/FinProfilesGallery';
import { AdvancedModifications } from './components/AdvancedModifications';
import { DocumentViewer } from './components/DocumentViewer';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic Auto-Hiding Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* Hero Section (Always on Overview or compact header on sub-tabs) */}
        {activeTab === 'overview' && (
          <Hero setActiveTab={setActiveTab} />
        )}

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${activeTab === 'overview' ? 'py-12' : 'pt-28 pb-16'}`}>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <OverviewSection setActiveTab={setActiveTab} />
          )}

          {/* Fin ODE Simulator Tab */}
          {activeTab === 'fin-sim' && (
            <FinSimulator />
          )}

          {/* Convection & Boundary Layer Tab */}
          {activeTab === 'convection' && (
            <ConvectionBoundaryCalc />
          )}

          {/* Radiation Studio Tab */}
          {activeTab === 'radiation' && (
            <RadiationStudio />
          )}

          {/* Fan Operating Point Solver Tab */}
          {activeTab === 'operating-point' && (
            <OperatingPointSolver />
          )}

          {/* Fin Profiles Gallery Tab */}
          {activeTab === 'profiles' && (
            <FinProfilesGallery />
          )}

          {/* 9 Advanced Modifications Tab */}
          {activeTab === 'modifications' && (
            <AdvancedModifications />
          )}

          {/* 47 Presentation Slides Deck */}
          {activeTab === 'slides' && (
            <DocumentViewer initialMode="slides" />
          )}

          {/* 77-Page Project Report Reader */}
          {activeTab === 'report' && (
            <DocumentViewer initialMode="report" />
          )}

          {/* Team Directory Tab */}
          {activeTab === 'team' && (
            <TeamSection />
          )}

        </div>
      </main>

      {/* Global Academic Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
