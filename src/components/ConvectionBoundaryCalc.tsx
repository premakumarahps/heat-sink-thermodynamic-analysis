import React, { useState, useMemo } from 'react';
import { 
  Wind, 
  Layers, 
  Activity, 
  HelpCircle, 
  Droplet, 
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { calculateBoundaryLayer, FlowParameters } from '../core/heatTransferPhysics';
import { MathView } from './MathView';

export const ConvectionBoundaryCalc: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(3.0); // 3 m/s (Report benchmark page 33)
  const [plateLengthMm, setPlateLengthMm] = useState<number>(300); // 300mm = 0.3m (or up to 3m)
  const [surfaceTemp, setSurfaceTemp] = useState<number>(65);
  const [ambientTemp, setAmbientTemp] = useState<number>(25);
  const [fluid, setFluid] = useState<'air' | 'water' | 'engine_oil'>('air');

  const params: FlowParameters = useMemo(() => ({
    velocity,
    plateLength: plateLengthMm / 1000,
    surfaceTemp,
    ambientTemp,
    fluid
  }), [velocity, plateLengthMm, surfaceTemp, ambientTemp, fluid]);

  const blResult = useMemo(() => calculateBoundaryLayer(params), [params]);

  // Chart configuration for boundary layer growth
  const chartData = useMemo(() => {
    const labels = blResult.boundaryPoints.map(p => `${p.xMm} mm`);
    const actualDelta = blResult.boundaryPoints.map(p => p.actualDeltaMm);
    const laminarDelta = blResult.boundaryPoints.map(p => p.laminarDeltaMm);

    return {
      labels,
      datasets: [
        {
          label: 'Boundary Layer Thickness δ(x) [mm]',
          data: actualDelta,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.3,
          borderWidth: 2.5,
          pointRadius: 0
        },
        {
          label: 'Laminar Blasius Prediction [mm]',
          data: laminarDelta,
          borderColor: '#94a3b8',
          borderDash: [5, 5],
          fill: false,
          tension: 0.3,
          borderWidth: 1.5,
          pointRadius: 0
        }
      ]
    };
  }, [blResult]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#06b6d4',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 }, maxTicksLimit: 8 },
        title: { display: true, text: 'Distance from Leading Edge x [mm]', color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        title: { display: true, text: 'Boundary Thickness δ [mm]', color: '#64748b' }
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>Chapter 2.2 • Aerodynamics & Convective Transport</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Convection & Boundary Layer Fluid Dynamics
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Calculates dimensionless groups (<MathView latex="Re, Gr, Pr, Ra, Nu" />) and solves Blasius laminar & turbulent boundary layer growth <MathView latex="\delta(x)" /> along heat sink fin channels.
          </p>
        </div>

        {/* Fluid Pill Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-700/80 self-start md:self-center">
          {[
            { id: 'air', label: 'Air (Pr≈0.71)' },
            { id: 'water', label: 'Liquid Water' },
            { id: 'engine_oil', label: 'Engine Oil' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFluid(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                fluid === f.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Interactive Controls vs 5 Dimensionless Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Flow & Thermodynamic Parameters</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400">{fluid.toUpperCase()}</span>
            </div>

            {/* Slider: Velocity */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Free Stream Velocity (V)</span>
                <span className="font-mono text-cyan-400 font-bold">{velocity.toFixed(1)} m/s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="15"
                step="0.1"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Natural Convection (&lt;0.3 m/s)</span>
                <span>Axial Fan (2-5 m/s)</span>
                <span>Blower (10+ m/s)</span>
              </div>
            </div>

            {/* Slider: Plate Length */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Heat Sink / Plate Length (L)</span>
                <span className="font-mono text-cyan-400 font-bold">{plateLengthMm} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={plateLengthMm}
                onChange={(e) => setPlateLengthMm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Temperature Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Surface Temp (Ts)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="30"
                    max="150"
                    value={surfaceTemp}
                    onChange={(e) => setSurfaceTemp(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">°C</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Ambient Temp (T∞)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">°C</span>
                </div>
              </div>
            </div>

            {/* Flow Regime Status Callout */}
            <div className={`p-4 rounded-2xl border ${
              blResult.isTurbulent 
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' 
                : 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {blResult.isTurbulent ? <AlertCircle className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                <span>Flow Regime: {blResult.isTurbulent ? 'Turbulent Flow' : 'Laminar Flow'}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {blResult.isTurbulent ? (
                  <>Reynolds number <code className="font-mono text-amber-300">Re = {blResult.reynolds.toLocaleString()}</code> exceeds critical <MathView latex="Re_{\text{cr}} = 5 \times 10^5" />. Flow transitions into turbulent boundary layer with higher heat transfer and increased drag.</>
                ) : (
                  <>Reynolds number <code className="font-mono text-cyan-300">Re = {blResult.reynolds.toLocaleString()}</code> is below critical threshold. Flow remains purely laminar with smooth parallel streamline profiles.</>
                )}
              </p>
            </div>

          </div>
        </div>

        {/* Dimensionless Numbers Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* Reynolds */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Reynolds Number</span>
                <span className="text-[10px] text-cyan-400 font-mono font-bold">Re</span>
              </div>
              <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">
                {blResult.reynolds > 1e6 ? blResult.reynolds.toExponential(2) : blResult.reynolds.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Inertial / Viscous force
              </div>
            </div>

            {/* Nusselt */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Average Nusselt</span>
                <span className="text-[10px] text-orange-400 font-mono font-bold">Nu_L</span>
              </div>
              <div className="text-2xl font-black text-orange-400 mt-1 font-mono">
                {blResult.avgNusselt.toFixed(1)}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Convection / Conduction
              </div>
            </div>

            {/* Heat Transfer Coeff h */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Convective Coeff</span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">h</span>
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                {blResult.avgHeatTransferCoeff.toFixed(1)} <span className="text-xs font-normal">W/m²K</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                h = Nu · k_f / L
              </div>
            </div>

            {/* Grashof */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Grashof Number</span>
                <span className="text-[10px] text-purple-400 font-mono font-bold">Gr</span>
              </div>
              <div className="text-2xl font-black text-purple-400 mt-1 font-mono">
                {blResult.grashof > 1e6 ? blResult.grashof.toExponential(2) : blResult.grashof.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Buoyancy / Viscous force
              </div>
            </div>

            {/* Prandtl */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Prandtl Number</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">Pr</span>
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                {blResult.prandtl.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Momentum / Thermal diff
              </div>
            </div>

            {/* Rayleigh */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Rayleigh Number</span>
                <span className="text-[10px] text-rose-400 font-mono font-bold">Ra</span>
              </div>
              <div className="text-2xl font-black text-rose-400 mt-1 font-mono">
                {blResult.rayleigh > 1e6 ? blResult.rayleigh.toExponential(2) : blResult.rayleigh.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Ra = Gr · Pr
              </div>
            </div>

          </div>

          {/* Boundary Layer Thickness Chart */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Hydrodynamic Boundary Layer Growth δ(x)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Blasius laminar formulation <MathView latex="\delta = \frac{4.91x}{\sqrt{Re_x}}" /> vs turbulent growth
                </p>
              </div>
            </div>

            <div className="h-[260px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Academic Diagram & Report Visual Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                <img 
                  src="/assets/boundary_layer_regions.jpeg" 
                  alt="Boundary Layer Regions" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Boundary Layer Regions</div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Laminar, transition zone, and turbulent boundary layer containing viscous sublayer buffer <MathView latex="\delta'" />.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                <img 
                  src="/assets/prandtl_boundary_layer_profiles.jpeg" 
                  alt="Prandtl Number Profiles" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Prandtl Thermal vs Velocity</div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  For gases (<MathView latex="Pr \approx 0.7" />), velocity boundary layer <MathView latex="\delta" /> is comparable to thermal boundary layer <MathView latex="\delta_T" />.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
