import React from 'react';
import { 
  Flame, 
  Wind, 
  SunMedium, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  Download, 
  FileText, 
  Presentation,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { MathView } from './MathView';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Ambient Glows & Thermal Particle Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Academic Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>University of Moratuwa</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Department of Materials Science & Engineering</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>MT1070: Thermodynamics & Phase Equilibria</span>
          </div>

          {/* Highlighted Lead Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-950/80 to-slate-900 border border-amber-500/50 text-amber-300 text-xs font-medium shadow-lg shadow-amber-950/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Architect: <strong>Sadun Premakumara</strong></span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 font-mono text-[10px] font-bold border border-amber-500/40">
              210494D
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            THERMODYNAMIC ANALYSIS OF A{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              HEAT SINK
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An advanced computational engineering platform synthesizing <strong>3D conduction PDEs</strong>, 
            <strong>extended surface fin ODE derivations</strong>, <strong>boundary layer fluid dynamics</strong>, 
            and <strong>spectral radiative emissivity</strong> with 9 next-generation solid-state & microfluidic modifications.
          </p>

          {/* Key Formula Teaser Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-orange-400 font-bold">Fin ODE:</span>
              <MathView latex="\frac{d^2\theta}{dx^2} - m^2\theta = 0" />
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">Diffusivity:</span>
              <MathView latex="\alpha = \frac{k}{\rho c_p}" />
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">Efficiency:</span>
              <MathView latex="\eta = \frac{\tanh(mL)}{mL}" />
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('fin-sim')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 border border-orange-400/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Launch Fin ODE Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('convection')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/30 transition-all hover:scale-[1.02]"
            >
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Boundary Layer & CFD</span>
            </button>

            <button
              onClick={() => setActiveTab('slides')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800/90 text-slate-200 border border-slate-700 transition-all"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>47-Slide Defense Deck</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800/90 text-slate-200 border border-slate-700 transition-all"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>77-Page Project Report</span>
            </button>
          </div>
        </div>

        {/* 4 Multi-Physics Core Pillar Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Conduction */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-orange-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              Mechanism 01
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-orange-300 transition-colors">
              3D Conduction & Diffusivity
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Derived from Cartesian element <code className="text-orange-300 font-mono">dx dy dz</code> with isotropic thermal diffusivity <MathView latex="\alpha = k/\rho c_p" /> and 4 boundary condition classes.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-orange-400">
              <span>Inspect Derivations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Convection */}
          <div 
            onClick={() => setActiveTab('convection')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Mechanism 02
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
              Convection & Boundary Layer
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Natural vs forced flow regimes. Blasius laminar & turbulent solutions, viscous sublayers, and Churchill-Chu correlations for <MathView latex="Nu(Ra, Pr)" />.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              <span>View Aerodynamics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Radiation */}
          <div 
            onClick={() => setActiveTab('radiation')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <SunMedium className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Mechanism 03
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
              Radiation & Emissivity
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Stefan-Boltzmann electromagnetic heat dissipation. Reveals why black anodizing (<MathView latex="\epsilon=0.85" />) produces a 10x radiative boost over bare aluminum.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <span>Radiation Calculator</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Advanced Tech */}
          <div 
            onClick={() => setActiveTab('modifications')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-purple-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              State of the Art
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
              9 Advanced Modifications
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Nanowires, microfluidics (&gt;250 W/cm²), thermoelectric Peltier energy recovery, graphene aerogels, magnetocaloric cooling, and PCMs.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-400">
              <span>Explore 9 Tech</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
