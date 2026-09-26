import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Wind, 
  DollarSign, 
  Gauge, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { FIN_PROFILES, FinProfile } from '../core/heatSinkData';

export const FinProfilesGallery: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('pin-finned');

  const activeProfile = FIN_PROFILES.find(p => p.id === selectedProfileId) || FIN_PROFILES[0];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
            <Layers className="w-4 h-4 text-orange-500" />
            <span>Chapter 3.1 • Geometric Architectural Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Fin Profile Geometries & CFD Performance
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Detailed thermodynamic and fluid dynamic evaluation of the 6 fundamental fin topologies analyzed in Chapter 3 of the University of Moratuwa technical thesis.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 self-start md:self-center">
          6 Evaluated Fin Profiles
        </div>
      </div>

      {/* Profile Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {FIN_PROFILES.map((profile) => {
          const isSelected = profile.id === selectedProfileId;
          return (
            <button
              key={profile.id}
              onClick={() => setSelectedProfileId(profile.id)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-gradient-to-b from-orange-500/20 to-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10 text-white scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="text-[10px] font-mono text-orange-400 font-semibold">{profile.category}</div>
              <div className="text-xs font-bold mt-1 text-slate-100">{profile.name}</div>
            </button>
          );
        })}
      </div>

      {/* Active Profile Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image & Ratings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            
            {/* Real Extracted Heat Sink Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 flex items-center justify-center p-4 group">
              <img 
                src={activeProfile.image} 
                alt={activeProfile.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-orange-400 border border-orange-500/30">
                Report Figure
              </div>
            </div>

            {/* Performance Ratings */}
            <div className="mt-6 space-y-3.5">
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Heat Transfer Efficiency</span>
                  </span>
                  <span className="font-mono text-orange-400 font-bold">{activeProfile.heatTransferRating} / 5.0</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full" 
                    style={{ width: `${(activeProfile.heatTransferRating / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Pressure Drop & Flow Resistance</span>
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{activeProfile.pressureDropRating} / 5.0</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full" 
                    style={{ width: `${(activeProfile.pressureDropRating / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-purple-400" />
                    <span>Volumetric Compactness</span>
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{activeProfile.compactnessRating} / 5.0</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full" 
                    style={{ width: `${(activeProfile.compactnessRating / 5) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Quick Metadata Chips */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Manufacturing Cost</span>
                <span className="font-bold text-white mt-0.5 block">{activeProfile.manufacturingCost}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Optimal Airflow</span>
                <span className="font-bold text-cyan-300 mt-0.5 block truncate">{activeProfile.idealFlow}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Architectural Analysis & Trade-offs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
            
            <div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                {activeProfile.category}
              </div>
              <h3 className="text-2xl font-black text-white mt-1">
                {activeProfile.name}
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {activeProfile.description}
              </p>
            </div>

            {/* Key Advantages */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thermodynamic & Fluid Advantages</span>
              </h4>
              <ul className="space-y-2">
                {activeProfile.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering Trade-offs */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Engineering Trade-Offs & Limitations</span>
              </h4>
              <ul className="space-y-2">
                {activeProfile.tradeoffs.map((tradeoff, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Comparative Curves from Report (Figure 3.1.7 & 3.1.8) */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Experimental & CFD Profile Comparison (Report Section 3.1.7)</span>
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Comparing Colburn j-factor vs friction factor and heat transfer per unit core volume across pin, louvered, offset, wavy, and straight fins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="h-44 w-full flex items-center justify-center overflow-hidden rounded-xl">
                  <img 
                    src="/assets/fin_profile_comparison_charts.jpeg" 
                    alt="Heat Transfer / Pressure Drop Comparison"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-semibold text-slate-300 mt-2 text-center">
                  Figure 3.1.7: Heat Transfer vs Pressure Drop
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="h-44 w-full flex items-center justify-center overflow-hidden rounded-xl">
                  <img 
                    src="/assets/fin_profile_comparison_heat_transfer_volume.jpeg" 
                    alt="Heat Transfer / Volume Comparison"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-semibold text-slate-300 mt-2 text-center">
                  Figure 3.1.8: Heat Transfer vs Core Volume
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
