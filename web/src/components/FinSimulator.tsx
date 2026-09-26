import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Settings2, 
  TrendingDown, 
  HelpCircle, 
  BarChart3, 
  Info,
  Maximize2,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { calculateFinPerformance, FinParameters } from '../core/heatTransferPhysics';
import { MathView } from './MathView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MATERIAL_PRESETS = [
  { name: 'Pure Copper (Cu)', k: 385, color: '#f97316' },
  { name: 'Pure Aluminum (Al)', k: 205, color: '#38bdf8' },
  { name: 'Extruded Al Alloy (6063-T5)', k: 160, color: '#06b6d4' },
  { name: 'Yellow Brass', k: 115, color: '#fbbf24' },
  { name: 'Stainless Steel (304)', k: 16, color: '#94a3b8' }
];

export const FinSimulator: React.FC = () => {
  // Simulator input state
  const [lengthMm, setLengthMm] = useState<number>(50); // 50mm = 0.05m (Report Example)
  const [thicknessMm, setThicknessMm] = useState<number>(4); // 4mm = 0.004m
  const [widthMm, setWidthMm] = useState<number>(100); // 100mm = 0.1m
  const [k, setK] = useState<number>(160); // 160 W/(m*K) (Report Page 24)
  const [h, setH] = useState<number>(50); // 50 W/(m^2*K) (Report Page 24)
  const [tw, setTw] = useState<number>(85); // 85 C base
  const [t0, setT0] = useState<number>(25); // 25 C ambient
  const [tipCondition, setTipCondition] = useState<'insulated' | 'convective' | 'infinite'>('insulated');

  // Compute physics result
  const params: FinParameters = useMemo(() => ({
    length: lengthMm / 1000,
    thickness: thicknessMm / 1000,
    width: widthMm / 1000,
    thermalConductivity: k,
    heatTransferCoeff: h,
    baseTemperature: tw,
    ambientTemperature: t0,
    tipCondition
  }), [lengthMm, thicknessMm, widthMm, k, h, tw, t0, tipCondition]);

  const simResult = useMemo(() => calculateFinPerformance(params), [params]);

  // Chart configuration
  const chartData = useMemo(() => {
    const labels = simResult.profileData.map(p => `${p.xMm} mm`);
    const temperatures = simResult.profileData.map(p => p.temp);

    return {
      labels,
      datasets: [
        {
          label: 'Fin Temperature T(x) [°C]',
          data: temperatures,
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.12)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#f97316'
        }
      ]
    };
  }, [simResult]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f97316',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx: any) => `Temperature: ${ctx.parsed.y.toFixed(2)} °C`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 }, maxTicksLimit: 10 },
        title: { display: true, text: 'Distance from Fin Base x [mm]', color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        title: { display: true, text: 'Temperature [°C]', color: '#64748b', font: { size: 11 } }
      }
    }
  };

  // Reset to report canonical benchmark
  const handleResetBenchmark = () => {
    setLengthMm(50);
    setThicknessMm(4);
    setWidthMm(100);
    setK(160);
    setH(50);
    setTw(85);
    setT0(25);
    setTipCondition('insulated');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Chapter 2.2 • Mathematical ODE Solver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Extended Surface Fin Temperature Simulator
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Solves the one-dimensional conduction-convection differential equation <MathView latex="\frac{d^2\theta}{dx^2} = m^2 \theta" /> to determine longitudinal temperature decay <MathView latex="T(x)" />, heat dissipation rate <MathView latex="Q" />, and fin efficiency <MathView latex="\eta" />.
          </p>
        </div>

        <button
          onClick={handleResetBenchmark}
          className="self-start md:self-center flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-orange-300 border border-orange-500/30 transition-all hover:scale-105"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Load Report Benchmark (L=5cm, k=160)</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Results & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-orange-400" />
                <span>Fin Geometry & Material Parameters</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">Interactive Inputs</span>
            </div>

            {/* Material Presets */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Material Conductivity Preset (k):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIAL_PRESETS.map((mat) => (
                  <button
                    key={mat.name}
                    onClick={() => setK(mat.k)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                      k === mat.k
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                        : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold truncate">{mat.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{mat.k} W/(m·K)</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Thermal Conductivity k */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Thermal Conductivity (k)</span>
                <span className="font-mono text-orange-400 font-bold">{k} W/(m·K)</span>
              </div>
              <input
                type="range"
                min="10"
                max="450"
                step="5"
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Fin Length L */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fin Length (L)</span>
                <span className="font-mono text-orange-400 font-bold">{lengthMm} mm</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="2"
                value={lengthMm}
                onChange={(e) => setLengthMm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Fin Thickness w */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fin Thickness (w)</span>
                <span className="font-mono text-orange-400 font-bold">{thicknessMm} mm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.5"
                value={thicknessMm}
                onChange={(e) => setThicknessMm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Fin Width b */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fin Breadth / Width (b)</span>
                <span className="font-mono text-orange-400 font-bold">{widthMm} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Convection Coefficient h */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Heat Transfer Coeff (h)</span>
                <span className="font-mono text-cyan-400 font-bold">{h} W/(m²·K)</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={h}
                onChange={(e) => setH(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Natural Air (~10)</span>
                <span>Forced Air (~50-100)</span>
                <span>High Airflow (~200)</span>
              </div>
            </div>

            {/* Temperature Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Base Temp (Tw)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="30"
                    max="150"
                    value={tw}
                    onChange={(e) => setTw(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">°C</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Ambient (T0)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={t0}
                    onChange={(e) => setT0(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">°C</span>
                </div>
              </div>
            </div>

            {/* Tip Condition Selector */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Tip Boundary Condition:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'insulated', label: 'Adiabatic Tip', desc: 'dT/dx=0' },
                  { id: 'convective', label: 'Convective Tip', desc: 'Exact Robin' },
                  { id: 'infinite', label: 'Infinite Fin', desc: 'L → ∞' }
                ].map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => setTipCondition(tc.id as any)}
                    className={`p-2 rounded-xl text-center transition-all border ${
                      tipCondition === tc.id
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                        : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{tc.label}</div>
                    <div className="text-[9px] font-mono text-slate-500">{tc.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Results & Visual Chart Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Output Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Fin Efficiency (η)</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {(simResult.efficiency * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                mL = {simResult.mL}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Actual Heat Loss (Q)</div>
              <div className="text-2xl font-black text-orange-400 mt-1">
                {simResult.actualHeatLoss.toFixed(1)} W
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Per fin element
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Tip Temp T(L)</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">
                {simResult.tipTemperature.toFixed(1)} °C
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                ΔT = {(tw - simResult.tipTemperature).toFixed(1)} °C drop
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Fin Parameter (m)</div>
              <div className="text-2xl font-black text-purple-400 mt-1 font-mono">
                {simResult.m.toFixed(1)} <span className="text-xs font-normal">m⁻¹</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                ξ = √(ph/kbw)
              </div>
            </div>

          </div>

          {/* Interactive Chart Container */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-orange-400" />
                  <span>Longitudinal Temperature Profile Curve T(x)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Thermal decay from base (Tw = {tw}°C) to tip (x = {lengthMm} mm)
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-orange-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>T(x) Profile</span>
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span>Theoretical Max Dissipation <code className="text-slate-300 font-mono">Qmax = {simResult.maxHeatLoss} W</code></span>
              <span>Wetted Fin Area <code className="text-slate-300 font-mono">As = {(simResult.surfaceArea * 10000).toFixed(1)} cm²</code></span>
            </div>
          </div>

          {/* Theoretical Derivation Card from Report */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden border border-slate-800 flex-shrink-0 bg-slate-900">
              <img 
                src="/assets/rectangular_fin_heat_balance.jpeg" 
                alt="Rectangular Fin Heat Balance" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-orange-400" />
                <span>Analytical Heat Balance (Report Section 2.2.1)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Balancing heat input at <code className="text-orange-400 font-mono">x</code> and output at <code className="text-orange-400 font-mono">x + Δx</code> with surface convective dissipation:
              </p>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-[11px]">
                <MathView latex="bw\,q_x\big|_x - bw\,q_x\big|_{x+\Delta x} - p\,\Delta x\,h(T - T_0) = 0 \implies \frac{d^2\theta}{dx^2} = \xi^2\theta" />
              </div>
              <p className="text-slate-400 text-[11px]">
                Report benchmark: For <code className="font-mono text-slate-300">L=5cm, w=4mm, k=160, h=50</code>, exact solution yields <MathView latex="\xi L = 0.625" /> with efficiency <MathView latex="\eta = 0.887" />.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
