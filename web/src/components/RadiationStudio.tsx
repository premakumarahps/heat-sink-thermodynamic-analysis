import React, { useState, useMemo } from 'react';
import { 
  SunMedium, 
  Sparkles, 
  Info, 
  Flame, 
  Layers, 
  TrendingUp, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { EMISSIVITY_DATA } from '../core/heatSinkData';
import { calculateRadiationPerformance } from '../core/heatTransferPhysics';
import { MathView } from './MathView';

export const RadiationStudio: React.FC = () => {
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState<number>(2); // Black Anodized Aluminum default
  const [surfaceTempC, setSurfaceTempC] = useState<number>(75);
  const [surroundingTempC, setSurroundingTempC] = useState<number>(25);
  
  // Apparent bounding box dimensions
  const [heightMm, setHeightMm] = useState<number>(40);
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(100);
  const [convectiveH, setConvectiveH] = useState<number>(12); // typical natural convection h

  const selectedMaterial = EMISSIVITY_DATA[selectedMaterialIndex];

  // Apparent Radiation Surface Area: Arad = 2H(L + W) + LW (Eq 2.3.4)
  const apparentAreaM2 = useMemo(() => {
    const H = heightMm / 1000;
    const L = lengthMm / 1000;
    const W = widthMm / 1000;
    return 2 * H * (L + W) + L * W;
  }, [heightMm, lengthMm, widthMm]);

  // Current calculation with selected material
  const currentResult = useMemo(() => {
    return calculateRadiationPerformance({
      surfaceArea: apparentAreaM2,
      emissivity: selectedMaterial.emissivity,
      surfaceTempC,
      surroundingTempC,
      convectiveH
    });
  }, [apparentAreaM2, selectedMaterial, surfaceTempC, surroundingTempC, convectiveH]);

  // Comparison benchmark: Polished Aluminum (eps = 0.04)
  const bareAlResult = useMemo(() => {
    return calculateRadiationPerformance({
      surfaceArea: apparentAreaM2,
      emissivity: 0.04,
      surfaceTempC,
      surroundingTempC,
      convectiveH
    });
  }, [apparentAreaM2, surfaceTempC, surroundingTempC, convectiveH]);

  // Anodized Aluminum benchmark (eps = 0.85)
  const anodizedAlResult = useMemo(() => {
    return calculateRadiationPerformance({
      surfaceArea: apparentAreaM2,
      emissivity: 0.85,
      surfaceTempC,
      surroundingTempC,
      convectiveH
    });
  }, [apparentAreaM2, surfaceTempC, surroundingTempC, convectiveH]);

  const radiationMultiplier = currentResult.qRadiation > 0 && bareAlResult.qRadiation > 0
    ? (currentResult.qRadiation / bareAlResult.qRadiation).toFixed(1)
    : '1.0';

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <SunMedium className="w-4 h-4 text-amber-400" />
            <span>Chapter 2.3 • Infrared Electromagnetic Heat Dissipation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Radiation & Surface Emissivity Studio
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Stefan-Boltzmann law <MathView latex="Q_{\text{rad}} = \epsilon \sigma A (T_s^4 - T_{\text{sur}}^4)" /> and apparent bounding box area <MathView latex="A_{\text{rad}} = 2H(L + W) + LW" />. Highlights why black anodizing delivers a 10x-20x boost in radiative cooling.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold self-start md:self-center">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Stefan-Boltzmann σ = 5.67 × 10⁻⁸ W/m²K⁴</span>
        </div>
      </div>

      {/* Main Grid: Controls vs Visual Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders & Dimensions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Apparent Envelope & Thermal State</span>
              </span>
              <span className="text-xs font-mono text-amber-400">
                Arad: {(apparentAreaM2 * 10000).toFixed(0)} cm²
              </span>
            </div>

            {/* Heat Sink Dimensions */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Height (H)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="10"
                    max="150"
                    value={heightMm}
                    onChange={(e) => setHeightMm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-[10px] text-slate-500">mm</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Length (L)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={lengthMm}
                    onChange={(e) => setLengthMm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-[10px] text-slate-500">mm</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Width (W)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={widthMm}
                    onChange={(e) => setWidthMm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white font-mono text-xs border border-slate-700"
                  />
                  <span className="text-[10px] text-slate-500">mm</span>
                </div>
              </div>
            </div>

            {/* Slider: Surface Temperature */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Heat Sink Surface Temp (Ts)</span>
                <span className="font-mono text-amber-400 font-bold">{surfaceTempC} °C ({surfaceTempC + 273.15} K)</span>
              </div>
              <input
                type="range"
                min="35"
                max="130"
                step="1"
                value={surfaceTempC}
                onChange={(e) => setSurfaceTempC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Slider: Surrounding Ambient Temp */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Surrounding Enclosure Temp (Tsur)</span>
                <span className="font-mono text-cyan-400 font-bold">{surroundingTempC} °C ({surroundingTempC + 273.15} K)</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={surroundingTempC}
                onChange={(e) => setSurroundingTempC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Slider: Natural Convection Coefficient h */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Ambient Natural Convection (h)</span>
                <span className="font-mono text-slate-300 font-bold">{convectiveH} W/(m²·K)</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={convectiveH}
                onChange={(e) => setConvectiveH(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="text-[10px] text-slate-500 mt-1">
                For stagnant ambient air, h is typically 8–15 W/m²K
              </div>
            </div>

            {/* Surface Material Selection List */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Surface Finish & Emissivity Preset (ε):
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {EMISSIVITY_DATA.map((item, idx) => (
                  <button
                    key={`${item.material}-${item.finish}`}
                    onClick={() => setSelectedMaterialIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all border ${
                      selectedMaterialIndex === idx
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{item.material} • {item.finish}</div>
                      <div className="text-[10px] text-slate-400">{item.notes}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-400">ε = {item.emissivity}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Comparative Physics Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Comparison Cards: Bare vs Anodized vs Selected */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Emissivity Multiplier: Bare vs Anodized Heat Sink</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Thermal radiation scales with absolute temperature to the 4th power <MathView latex="T^4" />. Anodized coatings create a microscopic porous oxide layer that dramatically radiates IR energy into the ambient enclosure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card A: Raw / Polished Aluminum */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Raw / Polished Aluminum</span>
                  <span className="text-xs font-mono text-slate-400">ε = 0.04</span>
                </div>
                <div className="text-2xl font-black text-slate-400 font-mono">
                  {bareAlResult.qRadiation} W
                </div>
                <div className="text-[11px] text-slate-500">
                  Radiation accounts for only <strong className="text-slate-400">{bareAlResult.radiationSharePercent}%</strong> of total heat dissipation ({bareAlResult.qTotal} W total).
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full" style={{ width: `${Math.max(5, bareAlResult.radiationSharePercent)}%` }} />
                </div>
              </div>

              {/* Card B: Black Anodized Aluminum */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">Black Anodized Aluminum</span>
                  <span className="text-xs font-mono text-amber-400">ε = 0.85</span>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {anodizedAlResult.qRadiation} W
                </div>
                <div className="text-[11px] text-amber-200/80">
                  Radiation accounts for <strong className="text-amber-300">{anodizedAlResult.radiationSharePercent}%</strong> of total heat dissipation ({anodizedAlResult.qTotal} W total)!
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: `${anodizedAlResult.radiationSharePercent}%` }} />
                </div>
              </div>

            </div>

            {/* Performance Multiplier Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Current Selection: {selectedMaterial.material} ({selectedMaterial.finish})</div>
                  <div className="text-xs text-amber-200">
                    Provides <strong className="text-white font-mono text-sm">{radiationMultiplier}x</strong> more radiative cooling than polished aluminum!
                  </div>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Radiated Power</div>
                <div className="text-xl font-black text-amber-300">{currentResult.qRadiation} W</div>
              </div>
            </div>

          </div>

          {/* Report Visual & Apparent Area Model */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-5 items-center">
            <div className="w-full sm:w-52 h-36 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
              <img 
                src="/assets/apparent_radiation_area_box.jpeg" 
                alt="Apparent Radiation Surface Area" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Apparent Radiation Envelope Method (Report Section 2.3)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Because radiation rays undergo internal reflections and re-absorption among adjacent fins, treating the heatsink as a solid bounding block with external envelope dimensions yields an accurate first-order radiation loss model:
              </p>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px]">
                <MathView latex="A_{\text{rad}} = 2H(L + W) + L \cdot W" />
              </div>
              <p className="text-slate-400 text-[11px]">
                At <code className="text-amber-300 font-mono">Ts = {surfaceTempC}°C</code>, radiative dissipation constitutes up to <strong className="text-white">{currentResult.radiationSharePercent}%</strong> of passive natural convection dissipation.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
