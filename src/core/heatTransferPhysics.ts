/**
 * Computational Thermodynamics & Heat Transfer Physics Engine
 * Grounded in University of Moratuwa MT1070 Technical Report & Defense Presentation
 */

export interface FinParameters {
  length: number; // L in meters (e.g. 0.05m = 5cm)
  thickness: number; // w in meters (e.g. 0.004m = 4mm)
  width: number; // b in meters (e.g. 0.1m = 10cm)
  thermalConductivity: number; // k in W/(m*K) (e.g. 205 for Aluminum, 385 for Copper)
  heatTransferCoeff: number; // h in W/(m^2*K) (e.g. 25-100)
  baseTemperature: number; // Tw in Celsius (e.g. 80 C)
  ambientTemperature: number; // T0 in Celsius (e.g. 25 C)
  tipCondition: 'insulated' | 'convective' | 'infinite';
}

export interface FinSimulationResult {
  m: number; // m = sqrt(ph / kbw) (1/m)
  mL: number; // Dimensionless fin parameter
  perimeter: number; // p = 2(b + w)
  crossSectionArea: number; // Ac = b * w
  surfaceArea: number; // As = p * L
  efficiency: number; // eta (0 to 1)
  actualHeatLoss: number; // Q in Watts
  maxHeatLoss: number; // Qmax in Watts
  tipTemperature: number; // T at x = L in C
  profileData: { xMm: number; xMeter: number; temp: number; heatFlux: number }[];
}

export function calculateFinPerformance(params: FinParameters): FinSimulationResult {
  const { length, thickness, width, thermalConductivity: k, heatTransferCoeff: h, baseTemperature: Tw, ambientTemperature: T0, tipCondition } = params;
  
  const p = 2 * (width + thickness);
  const Ac = width * thickness;
  const As = p * length;
  const thetaB = Tw - T0;

  // Fin parameter m (xi)
  const m = Math.sqrt((p * h) / (k * Ac));
  const mL = m * length;

  let efficiency = 0;
  let actualHeatLoss = 0;
  const maxHeatLoss = h * As * thetaB;

  const pointsCount = 50;
  const profileData: { xMm: number; xMeter: number; temp: number; heatFlux: number }[] = [];

  if (tipCondition === 'infinite') {
    // Infinitely long fin: theta(x) = thetaB * exp(-m * x)
    actualHeatLoss = Math.sqrt(p * h * k * Ac) * thetaB;
    efficiency = actualHeatLoss / (h * As * thetaB);

    for (let i = 0; i <= pointsCount; i++) {
      const x = (i / pointsCount) * length;
      const thetaX = thetaB * Math.exp(-m * x);
      const temp = T0 + thetaX;
      const heatFlux = k * m * thetaX;
      profileData.push({
        xMm: Math.round(x * 1000 * 10) / 10,
        xMeter: x,
        temp: Math.round(temp * 100) / 100,
        heatFlux: Math.round(heatFlux * 10) / 10
      });
    }
  } else if (tipCondition === 'convective') {
    // Convective tip: Eq 2.2.1.7
    const hDivKm = h / (k * m);
    const denom = Math.cosh(mL) + hDivKm * Math.sinh(mL);
    
    // Actual heat loss: Eq 2.2.1.8
    actualHeatLoss = k * Ac * m * thetaB * ((Math.sinh(mL) + hDivKm * Math.cosh(mL)) / denom);
    // Efficiency: Eq 2.2.1.10
    efficiency = actualHeatLoss / (h * (p * length + Ac) * thetaB);

    for (let i = 0; i <= pointsCount; i++) {
      const x = (i / pointsCount) * length;
      const num = Math.cosh(m * (length - x)) + hDivKm * Math.sinh(m * (length - x));
      const thetaX = thetaB * (num / denom);
      const temp = T0 + thetaX;
      const heatFlux = k * m * thetaB * ((Math.sinh(m * (length - x)) + hDivKm * Math.cosh(m * (length - x))) / denom);
      profileData.push({
        xMm: Math.round(x * 1000 * 10) / 10,
        xMeter: x,
        temp: Math.round(temp * 100) / 100,
        heatFlux: Math.round(heatFlux * 10) / 10
      });
    }
  } else {
    // Insulated/Adiabatic tip: Eq 2.2.1.12 & Eq 2.2.1.13
    actualHeatLoss = Math.sqrt(p * h * k * Ac) * thetaB * Math.tanh(mL);
    efficiency = mL > 0 ? Math.tanh(mL) / mL : 1;

    for (let i = 0; i <= pointsCount; i++) {
      const x = (i / pointsCount) * length;
      const thetaX = thetaB * (Math.cosh(m * (length - x)) / Math.cosh(mL));
      const temp = T0 + thetaX;
      const heatFlux = k * m * thetaB * (Math.sinh(m * (length - x)) / Math.cosh(mL));
      profileData.push({
        xMm: Math.round(x * 1000 * 10) / 10,
        xMeter: x,
        temp: Math.round(temp * 100) / 100,
        heatFlux: Math.round(heatFlux * 10) / 10
      });
    }
  }

  const tipTemperature = profileData[profileData.length - 1].temp;

  return {
    m: Math.round(m * 100) / 100,
    mL: Math.round(mL * 1000) / 1000,
    perimeter: Math.round(p * 1000) / 1000,
    crossSectionArea: Ac,
    surfaceArea: Math.round(As * 10000) / 10000,
    efficiency: Math.min(1, Math.max(0, Math.round(efficiency * 1000) / 1000)),
    actualHeatLoss: Math.round(actualHeatLoss * 100) / 100,
    maxHeatLoss: Math.round(maxHeatLoss * 100) / 100,
    tipTemperature: Math.round(tipTemperature * 100) / 100,
    profileData
  };
}

/**
 * Convection & Boundary Layer Physics
 */
export interface FlowParameters {
  velocity: number; // m/s
  plateLength: number; // m (e.g. 0.15m)
  surfaceTemp: number; // C
  ambientTemp: number; // C
  fluid: 'air' | 'water' | 'engine_oil';
}

export interface BoundaryLayerResult {
  reynolds: number;
  isTurbulent: boolean;
  criticalLength: number; // x_cr where Re = 5e5
  grashof: number;
  prandtl: number;
  rayleigh: number;
  nusseltLaminar: number;
  nusseltTurbulent: number;
  avgNusselt: number;
  avgHeatTransferCoeff: number; // h in W/(m^2*K)
  boundaryPoints: { xMm: number; laminarDeltaMm: number; turbulentDeltaMm: number; actualDeltaMm: number }[];
}

export function calculateBoundaryLayer(params: FlowParameters): BoundaryLayerResult {
  const { velocity, plateLength, surfaceTemp, ambientTemp, fluid } = params;

  // Approximate fluid properties at film temp T_film = (Ts + T_inf) / 2
  const tFilm = (surfaceTemp + ambientTemp) / 2;
  const tFilmK = tFilm + 273.15;

  let nu = 1.56e-5; // kinematic viscosity m^2/s
  let kFluid = 0.026; // W/(m*K)
  let pr = 0.707;
  let beta = 1 / tFilmK; // 1/K for ideal gas

  if (fluid === 'water') {
    nu = 0.8e-6;
    kFluid = 0.6;
    pr = 5.8;
    beta = 2.5e-4;
  } else if (fluid === 'engine_oil') {
    nu = 8e-5;
    kFluid = 0.14;
    pr = 1000;
    beta = 7e-4;
  }

  const reynolds = (velocity * plateLength) / nu;
  const reCr = 5e5;
  const isTurbulent = reynolds > reCr;
  const criticalLength = Math.min(plateLength, (reCr * nu) / Math.max(0.01, velocity));

  const deltaT = Math.abs(surfaceTemp - ambientTemp);
  const g = 9.81;
  const grashof = (g * beta * deltaT * Math.pow(plateLength, 3)) / Math.pow(nu, 2);
  const rayleigh = grashof * pr;

  // Nusselt calculation (Page 35 & 36 of report)
  const nusseltLaminar = 0.664 * Math.pow(reynolds, 0.5) * Math.pow(pr, 1 / 3);
  const nusseltTurbulent = 0.0296 * Math.pow(reynolds, 0.8) * Math.pow(pr, 1 / 3);
  
  let avgNusselt = nusseltLaminar;
  if (reynolds > reCr) {
    avgNusselt = (0.037 * Math.pow(reynolds, 0.8) - 871) * Math.pow(pr, 1 / 3);
  } else if (velocity < 0.1) {
    // Natural convection fallback for stagnant fluid
    if (rayleigh < 1e9) {
      avgNusselt = 0.68 + (0.67 * Math.pow(rayleigh, 0.25)) / Math.pow(1 + Math.pow(0.492 / pr, 9 / 16), 4 / 9);
    } else {
      avgNusselt = Math.pow(0.825 + (0.387 * Math.pow(rayleigh, 1 / 6)) / Math.pow(1 + Math.pow(0.492 / pr, 9 / 16), 8 / 27), 2);
    }
  }

  const avgHeatTransferCoeff = (avgNusselt * kFluid) / plateLength;

  // Boundary layer profile points along plate
  const boundaryPoints = [];
  const steps = 40;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * plateLength;
    const reX = (velocity * x) / nu;
    
    // Blasius solutions (report page 31 & 33)
    const lamDelta = reX > 0 ? (4.91 * x) / Math.sqrt(reX) : 0;
    const turbDelta = reX > 0 ? (0.37 * x) / Math.pow(reX, 0.2) : 0;
    const actualDelta = x <= criticalLength ? lamDelta : turbDelta;

    boundaryPoints.push({
      xMm: Math.round(x * 1000 * 10) / 10,
      laminarDeltaMm: Math.round(lamDelta * 1000 * 100) / 100,
      turbulentDeltaMm: Math.round(turbDelta * 1000 * 100) / 100,
      actualDeltaMm: Math.round(actualDelta * 1000 * 100) / 100
    });
  }

  return {
    reynolds: Math.round(reynolds),
    isTurbulent,
    criticalLength: Math.round(criticalLength * 1000) / 1000,
    grashof: Math.round(grashof),
    prandtl: Math.round(pr * 1000) / 1000,
    rayleigh: Math.round(rayleigh),
    nusseltLaminar: Math.round(nusseltLaminar * 10) / 10,
    nusseltTurbulent: Math.round(nusseltTurbulent * 10) / 10,
    avgNusselt: Math.round(avgNusselt * 10) / 10,
    avgHeatTransferCoeff: Math.round(avgHeatTransferCoeff * 10) / 10,
    boundaryPoints
  };
}

/**
 * Radiation Thermodynamics (Stefan-Boltzmann & Apparent Area)
 */
export interface RadiationParams {
  surfaceArea: number; // m^2
  emissivity: number; // epsilon (0 to 1)
  surfaceTempC: number;
  surroundingTempC: number;
  convectiveH: number; // for comparison
}

export function calculateRadiationPerformance(params: RadiationParams) {
  const { surfaceArea, emissivity, surfaceTempC, surroundingTempC, convectiveH } = params;
  const sigma = 5.670374419e-8; // W/(m^2*K^4)

  const TsK = surfaceTempC + 273.15;
  const TsurK = surroundingTempC + 273.15;

  const qRadiation = emissivity * sigma * surfaceArea * (Math.pow(TsK, 4) - Math.pow(TsurK, 4));
  const qConvection = convectiveH * surfaceArea * (surfaceTempC - surroundingTempC);
  const qTotal = Math.max(0, qRadiation) + Math.max(0, qConvection);

  const radiationSharePercent = qTotal > 0 ? (qRadiation / qTotal) * 100 : 0;
  const convectionSharePercent = qTotal > 0 ? (qConvection / qTotal) * 100 : 0;

  return {
    qRadiation: Math.round(qRadiation * 100) / 100,
    qConvection: Math.round(qConvection * 100) / 100,
    qTotal: Math.round(qTotal * 100) / 100,
    radiationSharePercent: Math.round(radiationSharePercent * 10) / 10,
    convectionSharePercent: Math.round(convectionSharePercent * 10) / 10
  };
}

/**
 * Fan Operating Point Solver (P-Q Curve vs System Impedance)
 */
export function solveOperatingPoint(
  maxCfm: number, // e.g. 50 CFM
  maxPressurePa: number, // e.g. 60 Pa
  finCount: number, // e.g. 10 to 40
  finHeightMm: number // e.g. 25 mm
) {
  // System impedance constant K increases with more fins (smaller spacing) and taller fins
  // Delta_P_sys = K * Q^2
  const baseK = 0.015;
  const finMultiplier = Math.pow(finCount / 20, 1.6);
  const heightMultiplier = Math.pow(finHeightMm / 25, 0.7);
  const kSys = baseK * finMultiplier * heightMultiplier;

  // Fan curve: P_fan(Q) = P_max * (1 - (Q / Q_max)^1.8)
  // Solve P_fan(Q) = P_sys(Q)
  let bestCfm = 0;
  let bestPa = 0;
  let minDiff = Infinity;

  const curveData: { cfm: number; fanPa: number; sysPa: number }[] = [];
  const steps = 50;

  for (let i = 0; i <= steps; i++) {
    const q = (i / steps) * maxCfm;
    const pFan = Math.max(0, maxPressurePa * (1 - Math.pow(q / maxCfm, 1.8)));
    const pSys = kSys * Math.pow(q, 2);

    curveData.push({
      cfm: Math.round(q * 10) / 10,
      fanPa: Math.round(pFan * 10) / 10,
      sysPa: Math.round(pSys * 10) / 10
    });

    const diff = Math.abs(pFan - pSys);
    if (diff < minDiff && q > 0) {
      minDiff = diff;
      bestCfm = q;
      bestPa = pFan;
    }
  }

  // Thermal resistance theta_sa approx inversely proportional to CFM^0.65
  const thermalResistance = (bestCfm > 0 ? (15 / Math.pow(bestCfm, 0.65)) : 5.0) + (100 / (finCount * finHeightMm));

  return {
    operatingCfm: Math.round(bestCfm * 10) / 10,
    operatingPressurePa: Math.round(bestPa * 10) / 10,
    thermalResistanceCPerW: Math.round(thermalResistance * 100) / 100,
    kSys: Math.round(kSys * 10000) / 10000,
    curveData
  };
}
