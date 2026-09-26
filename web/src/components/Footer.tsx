import React from 'react';
import { 
  Flame, 
  GraduationCap, 
  FileText, 
  Presentation, 
  Download, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Academic Department */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-slate-900 shadow-md">
                <img 
                  src="/assets/heat_sink_logo.jpg" 
                  alt="Heat Sink Analysis Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="font-extrabold text-sm text-white tracking-wide">
                HEAT SINK ANALYSIS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Comprehensive thermodynamic ODE formulations, boundary layer aerodynamics, and advanced thermal engineering.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              University of Moratuwa • Sri Lanka
            </div>
          </div>

          {/* Col 2: Interactive Modules */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Computational Solvers
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveTab('fin-sim'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Fin Conduction ODE Simulator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('convection'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Convection & Boundary Layer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('radiation'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Radiation & Emissivity Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('operating-point'); scrollToTop(); }}
                  className="hover:text-purple-400 transition-colors"
                >
                  Fan P-Q Operating Point Solver
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('profiles'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  6 Fin Profiles Geometry Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Documents */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Academic Documents
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/docs/Heat_Sink_Thermodynamic_Analysis_Report.pdf" 
                  download 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technical Report (77-Page PDF)</span>
                </a>
              </li>
              <li>
                <a 
                  href="/docs/Heat_Sink_Thermodynamic_Analysis_Presentation.pdf" 
                  download 
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Presentation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Defense Presentation (47-Slide PDF)</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('modifications'); scrollToTop(); }}
                  className="hover:text-purple-400 transition-colors"
                >
                  9 Next-Gen Modifications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('team'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Group 3 Research Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Authorship & Credits */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Authorship Attribution
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Sadun Premakumara</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Index: <strong className="text-amber-300">210494D</strong>
              </div>
              <div className="text-[10px] text-slate-400">
                Lead Computational Architect & Thermal Modeler
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition-colors text-xs font-semibold"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2023–2026 Department of Materials Science and Engineering, University of Moratuwa. All academic rights reserved.
          </div>
          <div className="font-mono text-slate-400">
            MT1070: Thermodynamics and Phase Equilibria
          </div>
        </div>
      </div>
    </footer>
  );
};
