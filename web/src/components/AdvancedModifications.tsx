import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Atom,
  Flame,
  Radio,
  RefreshCw,
  Compass
} from 'lucide-react';
import { ADVANCED_MODIFICATIONS, AdvancedModification } from '../core/heatSinkData';

export const AdvancedModifications: React.FC = () => {
  const [selectedTechId, setSelectedTechId] = useState<string>('nanostructured');

  const activeTech = ADVANCED_MODIFICATIONS.find(m => m.id === selectedTechId) || ADVANCED_MODIFICATIONS[0];

  const getTechIcon = (id: string) => {
    switch (id) {
      case 'nanostructured': return Atom;
      case 'thermoelectric': return Zap;
      case 'microfluidic': return RefreshCw;
      case 'photonic': return Radio;
      case 'graphene': return Layers;
      case 'magnetic': return Compass;
      case 'pcms': return Flame;
      case 'hybrid': return Sparkles;
      case 'sma': return Cpu;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Chapter 4 • Next-Generation Thermal Architectures</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            9 Advanced Heat Sink Paradigm Modifications
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Cutting-edge research innovations evaluated in Chapter 4 of the University of Moratuwa report, bridging nanoscale structures, thermoelectric energy harvesting, photonic radiative cooling, and smart phase change materials.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 self-start md:self-center">
          9 Pioneering Technologies
        </div>
      </div>

      {/* Technology Tab Buttons Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {ADVANCED_MODIFICATIONS.map((mod) => {
          const isSelected = mod.id === selectedTechId;
          const Icon = getTechIcon(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => setSelectedTechId(mod.id)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex items-start gap-3 ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-500/25 to-slate-900 border-purple-500/60 shadow-lg shadow-purple-500/15 text-white scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-xl mt-0.5 ${
                isSelected ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-mono text-purple-400 font-semibold">{mod.reportSection.split(' ')[0]}</div>
                <div className="text-xs font-bold text-slate-100 truncate mt-0.5">{mod.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Modification Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Schematic & Report Figure (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 flex items-center justify-center p-4 group">
              <img 
                src={activeTech.image} 
                alt={activeTech.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/30">
                {activeTech.reportSection}
              </div>
            </div>

            {/* Target Applications Chips */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                Target Real-World Applications:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeTech.targetApplications.map((app, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Principles, Steps & Key Advantages (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
            
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {activeTech.reportSection}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {activeTech.name}
              </h3>
              <p className="text-sm font-semibold text-purple-300 mt-1">
                {activeTech.tagline}
              </p>
            </div>

            {/* Scientific Operating Principles */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                <Atom className="w-4 h-4 text-purple-400" />
                <span>Operating Mechanism & Physics</span>
              </h4>
              <div className="space-y-2.5">
                {activeTech.principles.map((pr, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{pr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Engineering Benefits */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Distinct Thermal & Performance Benefits</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTech.keyBenefits.map((ben, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
