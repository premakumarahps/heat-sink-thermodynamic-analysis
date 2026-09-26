import React, { useState, useMemo } from 'react';
import { 
  Gauge, 
  Wind, 
  Sliders, 
  TrendingDown, 
  Info, 
  Layers, 
  Activity,
  Crosshair,
  CheckCircle2
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { solveOperatingPoint } from '../core/heatTransferPhysics';
import { MathView } from './MathView';

export const OperatingPointSolver: React.FC = () => {
  const [maxCfm, setMaxCfm] = useState<number>(50); // 50 CFM fan
  const [maxPa, setMaxPa] = useState<number>(60); // 60 Pa max pressure
  const [finCount, setFinCount] = useState<number>(24); // 24 fins
  const [finHeightMm, setFinHeightMm] = useState<number>(30); // 30 mm fin height
  const [ambientTempC, setAmbientTempC] = useState<number>(25);
  const [powerWatts, setPowerWatts] = useState<number>(65); // 65W TDP processor

  const result = useMemo(() => {
    return solveOperatingPoint(maxCfm, maxPa, finCount, finHeightMm);
  }, [maxCfm, maxPa, finCount, finHeightMm]);

  // Heat sink base temperature: Ts = Ta + theta_sa * Q_power
  const estimatedBaseTemp = useMemo(() => {
    return ambientTempC + result.thermalResistanceCPerW * powerWatts;
  }, [ambientTempC, result.thermalResistanceCPerW, powerWatts]);

  // Chart configuration
  const chartData = useMemo(() => {
    const labels = result.curveData.map(d => `${d.cfm}`);
    const fanPressures = result.curveData.map(d => d.fanPa);
    const sysPressures = result.curveData.map(d => d.sysPa);

    return {
      labels,
      datasets: [
        {
          label: 'Fan P-Q Curve [Pa]',
          data: fanPressures,
          borderColor: '#f97316',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 0
        },
        {
          label: 'Heat Sink System Impedance [Pa]',
          data: sysPressures,
          borderColor: '#06b6d4',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 0
        }
      ]
    };
  }, [result]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#f97316'
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 }, maxTicksLimit: 10 },
        title: { display: true, text: 'Volumetric Airflow Rate (CFM)', color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        title: { display: true, text: 'Static Pressure (Pa)', color: '#64748b' }
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span>Chapter 3.7 • Aerodynamic System Impedance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Fan P-Q Operating Point & Thermal Resistance Solver
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Solves the simultaneous intersection between the fan pressure-flow characteristic curve and the Darcy-Weisbach channel impedance to pinpoint operating CFM and heatsink thermal resistance <MathView latex="\theta_{sa} = \frac{T_s - T_a}{Q}" />.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold self-start md:self-center">
          <Crosshair className="w-4 h-4 text-purple-400" />
          <span>Equilibrium Operating Point</span>
        </div>
      </div>

      {/* Main Grid: Controls vs Visual Operating Point */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Fan & Heat Sink Parameters</span>
              </span>
              <span className="text-xs font-mono text-purple-400">P-Q Dynamics</span>
            </div>

            {/* Slider: Fan Max Airflow */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fan Free Delivery Max (Qmax)</span>
                <span className="font-mono text-orange-400 font-bold">{maxCfm} CFM</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={maxCfm}
                onChange={(e) => setMaxCfm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Fan Max Static Pressure */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fan Shut-off Static Pressure (Pmax)</span>
                <span className="font-mono text-orange-400 font-bold">{maxPa} Pa</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={maxPa}
                onChange={(e) => setMaxPa(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Slider: Fin Count */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Number of Fins (Density)</span>
                <span className="font-mono text-cyan-400 font-bold">{finCount} fins</span>
              </div>
              <input
                type="range"
                min="8"
                max="45"
                step="1"
                value={finCount}
                onChange={(e) => setFinCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="text-[10px] text-slate-500 mt-1">
                More fins increase wetted area but sharply increase flow impedance K_sys
              </div>
            </div>

            {/* Slider: Fin Height */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fin Height (H)</span>
                <span className="font-mono text-cyan-400 font-bold">{finHeightMm} mm</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={finHeightMm}
                onChange={(e) => setFinHeightMm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Thermal Load Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Heat Source TDP</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={powerWatts}
                    onChange={(e) => setPowerWatts(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">W</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Ambient Air (Ta)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={ambientTempC}
                    onChange={(e) => setAmbientTempC(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">°C</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Results & Intersection Curve Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Output Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Operating Flow (Q)</div>
              <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">
                {result.operatingCfm} <span className="text-xs font-normal">CFM</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((result.operatingCfm / maxCfm) * 100).toFixed(0)}% of max delivery
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Pressure Drop (ΔP)</div>
              <div className="text-2xl font-black text-orange-400 mt-1 font-mono">
                {result.operatingPressurePa} <span className="text-xs font-normal">Pa</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Impedance loss
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Thermal Resistance</div>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                {result.thermalResistanceCPerW} <span className="text-xs font-normal">°C/W</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                θ_sa = (Ts - Ta) / Q
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Base Temp (Ts)</div>
              <div className={`text-2xl font-black mt-1 font-mono ${estimatedBaseTemp > 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {estimatedBaseTemp.toFixed(1)} <span className="text-xs font-normal">°C</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                At {powerWatts} W load
              </div>
            </div>

          </div>

          {/* Intersection Chart Container */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Operating Point Intersection (P-Q vs System Impedance)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Intersection point: <strong className="text-cyan-400 font-mono">{result.operatingCfm} CFM</strong> at <strong className="text-orange-400 font-mono">{result.operatingPressurePa} Pa</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-orange-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Fan P-Q</span>
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>System Impedance</span>
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Academic Visual Reference from Report */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                <img 
                  src="/assets/fan_operating_point_pq_curve.jpeg" 
                  alt="Operating Point P-Q" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Report Figure 3.7.1</div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Operating point where fan performance <MathView latex="f(\text{voltage, RPM})" /> crosses system impedance curve.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                <img 
                  src="/assets/thermal_resistance_vs_airflow_cfm.jpeg" 
                  alt="Thermal Resistance vs CFM" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Report Figure 3.7.2</div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  As flow rate (CFM) climbs, thermal resistance <MathView latex="\theta_{sa}" /> decays hyperbolically until reaching boundary layer plateau.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
