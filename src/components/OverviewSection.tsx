import React from 'react';
import { 
  Flame, 
  Wind, 
  SunMedium, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { MathView } from './MathView';

interface OverviewSectionProps {
  setActiveTab: (tab: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12">
      
      {/* Executive Scientific Summary Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <Flame className="w-3.5 h-3.5" />
            <span>Thermodynamic Foundations</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            The Physics of Heat Dissipation in Modern Electronics
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            As silicon transistors scale into sub-3nm nodes, power densities inside semiconductor microprocessors exceed <strong>100 W/cm²</strong>—surpassing the core thermal flux of nuclear reactors. Without rapid, continuous thermal transport away from the silicon die, localized junctions undergo electromigration failure, gate oxide breakdown, and catastrophic thermal runaway.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            A heat sink is a passive or active thermodynamic transducer engineered to bridge the immense thermal resistance gap between high-flux solid semiconductors and fluid heat sinks (ambient air or liquid coolants) through an integrated interplay of <strong>3D conduction</strong>, <strong>extended-surface convection</strong>, and <strong>infrared electromagnetic radiation</strong>.
          </p>
        </div>
      </div>

      {/* The 3 Core Heat Transfer Mechanisms Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-orange-400" />
              <span>The Three Thermodynamic Transport Mechanisms</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Derived from the fundamental laws of thermodynamics (Report Chapter 2)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Mechanism 1: Conduction */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-orange-500/40 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase">
                Section 2.1 • Conduction
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                Solid-State Conduction
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct microscopic vibrational and electronic energy transfer across solid contact. Governed by Fourier's Law and isotropic thermal diffusivity.
              </p>
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <MathView latex="q = -k\nabla T, \quad \alpha = \frac{k}{\rho c_p}" />
              </div>

              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>High-k baseplates (Copper ~385 W/mK)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>Rapid lateral spreading to prevent hotspots</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>Low interface contact resistance via TIMs</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('fin-sim')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 text-xs font-semibold border border-orange-500/30 transition-colors"
            >
              <span>Explore Conduction Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mechanism 2: Convection */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Section 2.2 • Convection
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Extended Surface Convection
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fluid bulk advection and molecular diffusion carrying heat away from extended fin surfaces into the coolant stream.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <MathView latex="Q = h A (T_s - T_\infty), \quad Nu = \frac{hL}{k}" />
              </div>

              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Extended fin area offsets low air thermal-k</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Laminar vs turbulent boundary layer dynamics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Forced air via fans vs silent buoyancy draft</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('convection')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-colors"
            >
              <span>Explore Boundary Layers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mechanism 3: Radiation */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <SunMedium className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                Section 2.3 • Radiation
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Electromagnetic Radiation
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct photon emission across the infrared spectrum according to Stefan-Boltzmann law and surface emissivity coefficient.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <MathView latex="Q = \epsilon \sigma A (T_s^4 - T_{\text{sur}}^4)" />
              </div>

              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Non-linear scaling with absolute T to the 4th</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Black anodizing gives 10x-20x radiation boost</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Crucial for natural convection passive systems</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('radiation')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
            >
              <span>Explore Radiation Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* The 4 Boundary Conditions Matrix (Report Section 2.1.4) */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div>
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Report Section 2.1.4
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Classification of Thermal Boundary Conditions
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Rigorous mathematical classification of physical boundary states required to solve the 3D heat conduction PDE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono text-[10px] font-bold">
              1st Kind • Dirichlet
            </span>
            <div className="text-sm font-bold text-white">Prescribed Surface Temp</div>
            <div className="py-1">
              <MathView latex="T(x,y,z,t)\big|_{\text{bound}} = T_s" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Specifies fixed interface temperature (e.g. perfect contact with a constant-temperature heat source <MathView latex="T_c" />).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">
              2nd Kind • Neumann
            </span>
            <div className="text-sm font-bold text-white">Prescribed Heat Flux</div>
            <div className="py-1">
              <MathView latex="-k \frac{\partial T}{\partial n}\Big|_0 = q_0" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Specifies heat flux per unit area. When <MathView latex="q_0 = 0" />, represents an insulated or adiabatic symmetry boundary.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
              3rd Kind • Robin
            </span>
            <div className="text-sm font-bold text-white">Convective Boundary</div>
            <div className="py-1">
              <MathView latex="-k \frac{\partial T}{\partial n}\Big|_s = h(T_s - T_\infty)" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Equates internal conduction flux arriving at the solid surface to heat carried away by fluid convection.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono text-[10px] font-bold">
              4th Kind • Stefan
            </span>
            <div className="text-sm font-bold text-white">Interface Continuity</div>
            <div className="py-1">
              <MathView latex="\frac{\tan \theta_1}{\tan \theta_2} = \frac{k_2}{k_1}" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ensures temperature and heat flux continuity across two contacting solid bodies (e.g. Copper spreader on Silicon die).
            </p>
          </div>

        </div>
      </div>

      {/* Thermal Diffusivity Comparison Table from Report Page 20 */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              Section 2.1.6 • Transient Response Metric
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Thermal Diffusivity (α) Across Engineering Materials
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Measures how rapidly heat propagates through a material: <MathView latex="\alpha = \frac{k}{\rho c_p}" /> (Table 2.1.6.1 at 300 K)
            </p>
          </div>

          <div className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 self-start sm:self-center">
            Report Benchmark Data
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Thermal Diffusivity α [cm²/s]</th>
                <th className="py-3 px-4">Thermal Conductivity k [W/mK]</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Thermal Response Character</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr className="bg-orange-500/5 hover:bg-orange-500/10 transition-colors">
                <td className="py-3 px-4 text-white font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Copper (Cu)</span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-orange-400">1.15 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-300">385 W/mK</td>
                <td className="py-3 px-4 text-slate-300">Isotropic Metal</td>
                <td className="py-3 px-4 text-emerald-400">Ultra-Rapid Transient Propagation</td>
              </tr>
              <tr className="bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                <td className="py-3 px-4 text-white font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>Aluminum (Al)</span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-cyan-400">0.97 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-300">205 W/mK</td>
                <td className="py-3 px-4 text-slate-300">Isotropic Metal</td>
                <td className="py-3 px-4 text-emerald-400">Rapid Transient Propagation (Lightweight)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-slate-300 font-bold">Air (at 300 K)</td>
                <td className="py-3 px-4 font-mono text-amber-400">0.19 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-400">0.026 W/mK</td>
                <td className="py-3 px-4 text-slate-400">Gas Phase</td>
                <td className="py-3 px-4 text-amber-400">High Diffusivity due to Low Density ρ</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-slate-300 font-bold">Stainless Steel (304)</td>
                <td className="py-3 px-4 font-mono text-slate-400">0.042 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-400">16 W/mK</td>
                <td className="py-3 px-4 text-slate-400">Alloy</td>
                <td className="py-3 px-4 text-slate-400">Moderate Conduction Lag</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-slate-300 font-bold">Silicon Dioxide (Polycrystalline)</td>
                <td className="py-3 px-4 font-mono text-slate-400">0.0083 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-400">1.4 W/mK</td>
                <td className="py-3 px-4 text-slate-400">Ceramic Dielectric</td>
                <td className="py-3 px-4 text-rose-400">Thermal Bottleneck / Insulator</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-slate-300 font-bold">Water (Liquid at 1 bar)</td>
                <td className="py-3 px-4 font-mono text-slate-400">0.0014 cm²/s</td>
                <td className="py-3 px-4 font-mono text-slate-400">0.60 W/mK</td>
                <td className="py-3 px-4 text-slate-400">Liquid Coolant</td>
                <td className="py-3 px-4 text-cyan-400">Immense Heat Capacity Buffering</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
