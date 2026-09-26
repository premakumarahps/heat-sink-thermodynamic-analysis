/**
 * Heat Sink Thermodynamic Analysis Data Model
 * Extracted directly from University of Moratuwa MT1070 Technical Report and Presentation
 */

export interface TeamMember {
  index: string;
  name: string;
  role: string;
  isLeadAuthor?: boolean; // Highlighted for Sadun Premakumara (210494D)
  isGroupLeader?: boolean; // Themiya K.L.
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    index: '210494D',
    name: 'PREMAKUMARA H.P.S.',
    role: 'Lead Computational Architect & Thermal Modeler',
    isLeadAuthor: true
  },
  {
    index: '210640A',
    name: 'THEMIYA K.L.',
    role: 'Group Leader & Research Coordinator',
    isGroupLeader: true
  },
  {
    index: '210042R',
    name: 'ANJANA E.A.O.',
    role: 'Thermodynamics & Heat Transfer Analyst'
  },
  {
    index: '210094C',
    name: 'DANINDI H.M.T.',
    role: 'Convection & Aerodynamics Specialist'
  },
  {
    index: '210101A',
    name: 'DE SILVA G.A.I.',
    role: 'Boundary Layer & Fluid Dynamics Analyst'
  },
  {
    index: '210347G',
    name: 'MADHUBHASHINEE H.A.W.R.',
    role: 'Materials Characterization & Diffusivity Specialist'
  },
  {
    index: '210447M',
    name: 'PATHIRAGE S.S.K.',
    role: 'Radiation & Emissivity Optimization'
  },
  {
    index: '210525C',
    name: 'RANAWEERA R.K.P.',
    role: 'Extended Surfaces & Fin Geometry Analyst'
  },
  {
    index: '210660J',
    name: 'UDAYAKANTHA D.A.W.I.',
    role: 'Advanced Cooling Technologies & Modifications'
  }
];

export interface FinProfile {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  heatTransferRating: number; // 1-5
  pressureDropRating: number; // 1-5 (5 = high resistance)
  compactnessRating: number; // 1-5
  manufacturingCost: 'Low' | 'Medium' | 'High' | 'Very High';
  idealFlow: 'Low Velocity / Natural' | 'Moderate Forced' | 'High Velocity Forced' | 'Micro-scale Forced';
  advantages: string[];
  tradeoffs: string[];
}

export const FIN_PROFILES: FinProfile[] = [
  {
    id: 'pin-finned',
    name: 'Pin Finned Profile',
    category: 'Staggered / In-line Pins',
    description: 'Pin-finned arrays promote omnidirectional fluid mixing, boundary layer tripping, and high surface area. Outstanding for low-airflow and natural convection environments.',
    image: '/assets/pin_fin_heat_sink.jpeg',
    heatTransferRating: 4.5,
    pressureDropRating: 4.2,
    compactnessRating: 4.0,
    manufacturingCost: 'Medium',
    idealFlow: 'Low Velocity / Natural',
    advantages: [
      'Disrupts laminar thermal boundary layers via vortex shedding',
      'Omnidirectional flow tolerance without choking',
      'High surface area-to-volume ratio'
    ],
    tradeoffs: [
      'Higher form drag and pressure drop across dense arrays',
      'Complex tooling for high aspect-ratio pins'
    ]
  },
  {
    id: 'straight-finned',
    name: 'Straight Finned Profile',
    category: 'Continuous Parallel Fins',
    description: 'The industrial benchmark for extruded aluminum heat sinks. Features continuous rectangular channels offering minimal airflow resistance and straightforward manufacturing.',
    image: '/assets/straight_finned_heat_sink.jpeg',
    heatTransferRating: 3.5,
    pressureDropRating: 2.0,
    compactnessRating: 3.0,
    manufacturingCost: 'Low',
    idealFlow: 'Moderate Forced',
    advantages: [
      'Lowest manufacturing cost via continuous aluminum extrusion',
      'Very low pressure drop along straight parallel channels',
      'Robust mechanical rigidity and structural stability'
    ],
    tradeoffs: [
      'Boundary layer thickens longitudinally, reducing downstream heat flux',
      'Lower heat dissipation density compared to interrupted geometries'
    ]
  },
  {
    id: 'louvered-finned',
    name: 'Louvered Finned Profile',
    category: 'Slotted / Angled Vanes',
    description: 'Employs precision-cut louvers angled to the incoming airflow, continuously creating new boundary layer leading edges while channeling air through the fin core.',
    image: '/assets/louvered_finned_heat_sink.jpeg',
    heatTransferRating: 4.8,
    pressureDropRating: 3.8,
    compactnessRating: 4.7,
    manufacturingCost: 'High',
    idealFlow: 'Moderate Forced',
    advantages: [
      'Consecutive boundary layer restarts maximize local Nusselt numbers',
      'Up to 80% higher heat dissipation per unit core volume',
      'Extensively utilized in high-density automotive radiators and servers'
    ],
    tradeoffs: [
      'Requires delicate stamping dies with tight tolerances',
      'Susceptible to dust clogging in harsh ambient environments'
    ]
  },
  {
    id: 'offset-strip',
    name: 'Offset Strip Profile',
    category: 'Interrupted Rectangular',
    description: 'Staggered rectangular fin segments periodically interrupt fluid flow, suppressing thick boundary layer development and promoting moderate turbulence.',
    image: '/assets/offset_finned_heat_sink.jpeg',
    heatTransferRating: 4.4,
    pressureDropRating: 3.6,
    compactnessRating: 4.5,
    manufacturingCost: 'Medium',
    idealFlow: 'Moderate Forced',
    advantages: [
      'Breaks up boundary layers without the severe form drag of solid pins',
      'High thermal performance in compact aerospace heat exchangers',
      'Effective balance between Colburn j-factor and Fanning friction factor'
    ],
    tradeoffs: [
      'Moderate pressure drop penalty over straight extruded fins',
      'Requires folding or brazing assembly operations'
    ]
  },
  {
    id: 'wavy-finned',
    name: 'Wavy (Corrugated) Profile',
    category: 'Sinusoidal Channels',
    description: 'Continuous sinusoidal or herringbone channels generate Dean vortices and centrifugal secondary flows that continuously mix core fluid with fin walls.',
    image: '/assets/wavy_finned_heat_sink.jpeg',
    heatTransferRating: 4.2,
    pressureDropRating: 3.2,
    compactnessRating: 4.2,
    manufacturingCost: 'Medium',
    idealFlow: 'Moderate Forced',
    advantages: [
      'Secondary Dean vortices enhance convective mixing without dead-zones',
      'No sharp leading edges to trap debris or promote localized stalling',
      'Smooth airflow path maintains low acoustic noise signature'
    ],
    tradeoffs: [
      'Friction factor rises rapidly at Reynolds numbers exceeding 2,500',
      'Tooling requires precision corrugation roll sets'
    ]
  },
  {
    id: 'microchannel-finned',
    name: 'Microchannel Fin Profile',
    category: 'High-Heat-Flux Microscale (Dh < 1mm)',
    description: 'Etched silicon or micro-machined copper channels with hydraulic diameters under 1 millimeter. Delivers unprecedented heat removal exceeding 100-300 W/cm².',
    image: '/assets/microchannel_heat_sink.jpeg',
    heatTransferRating: 5.0,
    pressureDropRating: 4.9,
    compactnessRating: 5.0,
    manufacturingCost: 'Very High',
    idealFlow: 'Micro-scale Forced',
    advantages: [
      'Extremely high heat transfer coefficient h inversely proportional to Dh',
      'Superb cooling for high-power electronics, laser diodes, and GPUs',
      'Capable of dissipating ultra-high heat flux with minimal thermal resistance'
    ],
    tradeoffs: [
      'Very high hydraulic pumping pressure drop (Darcy-Weisbach dp/dx)',
      'Extreme sensitivity to micro-particulate contamination'
    ]
  }
];

export interface EmissivityItem {
  material: string;
  finish: string;
  emissivity: number;
  radiationRatioVsAnodized: number;
  notes: string;
}

export const EMISSIVITY_DATA: EmissivityItem[] = [
  {
    material: 'Aluminum',
    finish: 'Highly Polished',
    emissivity: 0.04,
    radiationRatioVsAnodized: 0.047,
    notes: 'Nearly pure reflector; radiation heat dissipation is negligible (~5% of potential).'
  },
  {
    material: 'Aluminum',
    finish: 'Extruded / Raw Mill',
    emissivity: 0.06,
    radiationRatioVsAnodized: 0.071,
    notes: 'Standard mill finish before surface passivation; poor radiative performance.'
  },
  {
    material: 'Aluminum',
    finish: 'Black Anodized',
    emissivity: 0.85,
    radiationRatioVsAnodized: 1.0,
    notes: 'Gold standard for passive heatsinks; yields 10x-20x boost in radiative dissipation!'
  },
  {
    material: 'Copper',
    finish: 'Polished Mirror',
    emissivity: 0.03,
    radiationRatioVsAnodized: 0.035,
    notes: 'Lowest radiative emissivity; relies almost completely on conductive/convective modes.'
  },
  {
    material: 'Copper',
    finish: 'Commercial Burnished',
    emissivity: 0.07,
    radiationRatioVsAnodized: 0.082,
    notes: 'Standard machined copper baseplate interface.'
  },
  {
    material: 'Copper',
    finish: 'Heavy Oxidized',
    emissivity: 0.78,
    radiationRatioVsAnodized: 0.918,
    notes: 'Cuprous/cupric oxide layer dramatically increases infrared emissivity.'
  },
  {
    material: 'Steel',
    finish: 'Rolled Strip',
    emissivity: 0.55,
    radiationRatioVsAnodized: 0.647,
    notes: 'Moderate emissivity, but thermal conductivity k is too low for primary fins.'
  },
  {
    material: 'Steel',
    finish: 'Oxidized',
    emissivity: 0.78,
    radiationRatioVsAnodized: 0.918,
    notes: 'High IR radiation emission.'
  },
  {
    material: 'Stainless Steel',
    finish: 'AISI 304 / 316',
    emissivity: 0.28,
    radiationRatioVsAnodized: 0.329,
    notes: 'Used where extreme chemical corrosion resistance is paramount.'
  },
  {
    material: 'Specialty Paint',
    finish: 'Flat Black / Enamel',
    emissivity: 0.94,
    radiationRatioVsAnodized: 1.106,
    notes: 'Near blackbody radiative performance across infrared spectrum.'
  }
];

export interface AdvancedModification {
  id: string;
  name: string;
  tagline: string;
  reportSection: string;
  image: string;
  principles: string[];
  keyBenefits: string[];
  targetApplications: string[];
}

export const ADVANCED_MODIFICATIONS: AdvancedModification[] = [
  {
    id: 'nanostructured',
    name: 'Nanostructured Heat Sinks',
    tagline: 'Nanowires & Nano-Pillars for Gigantic Wetted Surface Area',
    reportSection: 'Section 4.1 (Pages 58-59)',
    image: '/assets/nanostructured_heat_sink_sem.jpeg',
    principles: [
      'Chemical etching or nanolithography synthesizes millions of vertically aligned nanowires/pillars on fin surfaces',
      'Surface area-to-volume ratio scales exponentially compared to macroscopic smooth fins',
      'Micro-turbulent shedding disrupts stagnant viscous sublayers (delta_vsl) even at low fluid velocities'
    ],
    keyBenefits: [
      'Up to 300% increase in effective convective heat dissipation area',
      'Drastic reduction of local thermal resistance at high heat-flux hot spots',
      'Lightweight integration without expanding volumetric envelope'
    ],
    targetApplications: ['High-density Microprocessors (CPUs/GPUs)', 'High-power GaN & SiC Power Electronics', 'Solid-state Laser Diodes']
  },
  {
    id: 'thermoelectric',
    name: 'Thermoelectric Energy Harvesting',
    tagline: 'Seebeck Effect: Transforming Dissipated Waste Heat into Usable Electricity',
    reportSection: 'Section 4.2 (Pages 60-61)',
    image: '/assets/thermoelectric_peltier_assembly.jpeg',
    principles: [
      'Integrated Bismuth Telluride (Bi2Te3) p-n semiconductor couples sandwiched between hot baseplate and fin array',
      'Seebeck effect drives charge carriers across the thermal gradient, inducing a proportional electric EMF',
      'Simultaneously extracts thermal energy while generating auxiliary power to drive onboard cooling fans'
    ],
    keyBenefits: [
      'Net energy recovery from industrial and computing waste thermal streams',
      'Self-powered autonomous cooling loops without external battery draw',
      'Continuous thermal gradient buffering'
    ],
    targetApplications: ['Self-powered Industrial IoT Sensors', 'Automotive Exhaust Heat Recovery', 'Aerospace Avionics Thermal Loops']
  },
  {
    id: 'microfluidic',
    name: 'Microfluidic Channel Networks',
    tagline: 'Precision Forced Two-Phase & Single-Phase Micro-Convection',
    reportSection: 'Section 4.3 (Pages 62-64)',
    image: '/assets/microfluidic_manifold_diagram.png',
    principles: [
      'Directly micromachined channels with hydraulic diameters under 500 microns on copper or silicon substrates',
      'Convective heat transfer coefficient scales inversely with channel width: h ~ k / Dh',
      'Manifold distribution topology maintains uniform coolant temperature across entire die'
    ],
    keyBenefits: [
      'Heat removal capability exceeding 250 W/cm²',
      'Near-elimination of localized hotspot temperature differentials',
      'Ultra-compact form factor for 3D chiplet architectures'
    ],
    targetApplications: ['Data Center Liquid Cooling Plates', 'Military Radar Arrays (AESA)', 'High-Output EV Inverter Modules']
  },
  {
    id: 'photonic',
    name: 'Photonic Radiative Coolers',
    tagline: 'Engineered Spectral Emissivity & Photonic Bandgap Thermal Radiation',
    reportSection: 'Section 4.4 (Pages 64-66)',
    image: '/assets/photonic_heat_sink_packaging.jpeg',
    principles: [
      'Micro-structured photonic crystals engineered to maximize infrared emission within the 8-13 um atmospheric transparency window',
      'Photonic bandgaps suppress re-absorption of ambient parasitic thermal radiation',
      'Passive sub-ambient radiative cooling to outer space without electrical energy input'
    ],
    keyBenefits: [
      'Zero-power passive sub-ambient thermal dissipation',
      'Drastically lower thermal resistance in space and vacuum operating environments',
      'Thin optical coatings applicable to existing chassis and heat sinks'
    ],
    targetApplications: ['Satellite Thermal Management Systems', 'Outdoor Telecom Base Stations', 'Optoelectronic Transceivers']
  },
  {
    id: 'graphene',
    name: 'Graphene-Enhanced Thermal Spreading',
    tagline: 'In-Plane Thermal Conductivity Exceeding 5,000 W/m·K',
    reportSection: 'Section 4.5 (Pages 67-69)',
    image: '/assets/graphene_heat_sink_diagram.jpeg',
    principles: [
      'Single and few-layer graphene 2D honeycomb carbon lattices laminated onto copper substrates',
      'Ballistic phonon transport along sp2 carbon bonds provides in-plane conductivity up to 5,300 W/(m*K)',
      'Graphene aerogels deliver ultra-lightweight, 3D high-porosity heat dissipation paths'
    ],
    keyBenefits: [
      'Instantaneous lateral heat spreading prevents core temperature spikes',
      'Ultrathin profiles ideal for mobile and ultra-slim laptops',
      'Drastic reduction of interface thermal boundary resistance'
    ],
    targetApplications: ['Flagship Smartphones & Tablets', 'Ultra-thin Laptops', 'Aerospace Lightweight Thermal Shielding']
  },
  {
    id: 'magnetic',
    name: 'Magnetic (Magnetocaloric) Cooling',
    tagline: 'Vibrationless, Refrigerant-Free Thermodynamic Cycles',
    reportSection: 'Section 4.6 (Pages 70-71)',
    image: '/assets/magnetic_magnetocaloric_heat_sink.jpeg',
    principles: [
      'Magnetocaloric materials (Gadolinium and rare-earth alloys) undergo magnetic entropy changes under magnetic field variations',
      'Applying magnetic field aligns magnetic dipoles, decreasing magnetic entropy and rejecting heat',
      'Removing field absorbs heat from the electronic heat source silently without compressors'
    ],
    keyBenefits: [
      'Zero mechanical compressor noise or acoustic footprint',
      'Environmentally pure: 100% free of GWP/ODP chemical refrigerants',
      'High theoretical thermodynamic Carnot efficiency'
    ],
    targetApplications: ['Cryogenic Sensors & Quantum Computing Stages', 'Acoustically Silent Medical Diagnostics', 'Submarine & Deep-Sea Electronics']
  },
  {
    id: 'pcms',
    name: 'Phase Change Material (PCM) Buffering',
    tagline: 'Latent Heat Storage to Suppress Transient Thermal Shock Spikes',
    reportSection: 'Section 4.7 (Page 72)',
    image: '/assets/pcm_phase_transition_enthalpy.jpeg',
    principles: [
      'Organic paraffins or hydrated inorganic salts encapsulated inside hollow fin cavities',
      'During high-load compute bursts, PCM absorbs immense latent heat at near-constant melting temperature',
      'Releases stored latent enthalpy slowly via natural convection once compute load subsides'
    ],
    keyBenefits: [
      'Clamps silicon junction temperature during peak burst computational tasks',
      'Enables downsized heatsink designs without over-engineering for rare peak loads',
      'Zero moving parts or active sensors required'
    ],
    targetApplications: ['5G Massive MIMO Burst Amplifiers', 'Missile Guidance Systems', 'Smartphone Fast-Charging Thermal Dampening']
  },
  {
    id: 'hybrid',
    name: 'Hybrid Multi-Technology Systems',
    tagline: 'Synergistic Fusion of Vapor Chambers, Micro-Fins, and Active Heat Pipes',
    reportSection: 'Section 4.8 (Page 72)',
    image: '/assets/thermoelectric_heat_sink_schematic.jpeg',
    principles: [
      'Integrates two-phase vapor chambers as the baseplate with micro-finned secondary arrays and auxiliary Peltier chillers',
      'Eliminates single-mechanism bottlenecks across conduction, phase-change, and forced convection',
      'Adaptive control triggers thermoelectric assist only when junction temperatures exceed critical thresholds'
    ],
    keyBenefits: [
      'Highest overall system coefficient of thermal performance',
      'Graceful degradation: system maintains passive cooling if active elements fail',
      'Dynamically adapts to wide swings in ambient temperatures'
    ],
    targetApplications: ['High-Performance Computing Clusters', 'Supercomputer Server Blades', 'Electric Hypercar Inverters']
  },
  {
    id: 'sma',
    name: 'Shape Memory Alloy (SMA) Adaptive Fins',
    tagline: 'Autonomous Geometrical Reconfiguration Driven by Thermal State',
    reportSection: 'Section 4.9 (Page 72)',
    image: '/assets/pin_fin_heat_sink.jpeg',
    principles: [
      'Nitinol (NiTi) shape-memory alloy fins transition from martensite to austenite phases as temperature climbs',
      'Phase transformation drives reversible fin flare-out, expanding channel spacing and wetted area dynamically',
      'Returns to compact low-drag aerodynamic profile when operating at low temperatures'
    ],
    keyBenefits: [
      'Self-regulating cooling geometry without sensors, actuators, or wiring',
      'Optimizes aerodynamic drag and parasitic power during low-load cruise',
      'Failsafe thermal expansion under extreme thermal runaway scenarios'
    ],
    targetApplications: ['Hypersonic & Atmospheric Re-entry Craft', 'Adaptive UAV Thermal Fairings', 'Extreme Environment Exploration Probes']
  }
];

export interface ReportChapter {
  id: string;
  chapterNumber: string;
  title: string;
  pages: string;
  summary: string;
  keyEquations: { name: string; latex: string; explanation: string }[];
  keyFigures: { title: string; image: string; caption: string }[];
  highlights: string[];
}

export const REPORT_CHAPTERS: ReportChapter[] = [
  {
    id: 'ch1',
    chapterNumber: 'Chapter 1',
    title: 'Introduction to Heat Sink Engineering',
    pages: 'Pages 2–4',
    summary: 'Establishes the fundamental necessity of heat dissipation in modern electronic and mechanical systems. Highlights the synergy among conduction (absorbing heat from the component), convection (transferring heat to the fluid film), and radiation (infrared electromagnetic dissipation). Sets up the theoretical framework for analyzing fin efficiency and advanced cooling paradigms.',
    keyEquations: [
      {
        name: 'Conservation of Energy Balance',
        latex: '\\dot{Q}_{\\text{in}} - \\dot{Q}_{\\text{out}} + \\dot{Q}_{\\text{gen}} = \\frac{dE_{\\text{sys}}}{dt}',
        explanation: 'At steady state, the net heat conducted from the component must equal the heat dissipated by convection and radiation.'
      }
    ],
    keyFigures: [
      {
        title: 'Thermal Dissipation Topology',
        image: '/assets/conduction_coordinate_element.jpeg',
        caption: 'Heat conduction through solid baseplate and extended fin surfaces into ambient fluid.'
      }
    ],
    highlights: [
      'Modern microprocessors generate heat fluxes comparable to nuclear reactor cores (>100 W/cm²)',
      'Heat sinks prevent thermal runaway, electromigration, and premature mechanical packaging degradation',
      'The multi-mechanism synergy: conduction in solids, convection in fluids, and radiation through space'
    ]
  },
  {
    id: 'ch2-1',
    chapterNumber: 'Chapter 2.1',
    title: 'Conduction Process & Boundary Conditions',
    pages: 'Pages 5–21',
    summary: 'Rigorous mathematical derivation of the general 3D heat conduction partial differential equation using a differential Cartesian control volume dx dy dz. Classifies all 4 types of thermal boundary conditions: Dirichlet (fixed temperature), Neumann (prescribed heat flux/insulated), Robin (convective balance), and Stefan/4th kind (interfacial continuity across dissimilar materials). Explores isotropic vs anisotropic materials and the critical physical significance of thermal diffusivity alpha.',
    keyEquations: [
      {
        name: 'General 3D Conduction PDE',
        latex: '\\frac{\\partial}{\\partial x}\\left(k_x \\frac{\\partial T}{\\partial x}\\right) + \\frac{\\partial}{\\partial y}\\left(k_y \\frac{\\partial T}{\\partial y}\\right) + \\frac{\\partial}{\\partial z}\\left(k_z \\frac{\\partial T}{\\partial z}\\right) + \\dot{q} = \\rho c_p \\frac{\\partial T}{\\partial t}',
        explanation: 'Governs transient and steady-state thermal field distributions with anisotropic thermal conductivity.'
      },
      {
        name: 'Isotropic Heat Diffusion Equation',
        latex: '\\nabla^2 T + \\frac{\\dot{q}}{k} = \\frac{1}{\\alpha}\\frac{\\partial T}{\\partial t}, \\quad \\alpha = \\frac{k}{\\rho c_p}',
        explanation: 'Thermal diffusivity alpha (m²/s) determines how rapidly heat propagates through a solid during thermal transients.'
      },
      {
        name: 'Boundary Condition of the 4th Kind (Stefan)',
        latex: 'k_1 \\left(\\frac{\\partial T_1}{\\partial n}\\right)_i = k_2 \\left(\\frac{\\partial T_2}{\\partial n}\\right)_i \\implies \\frac{\\tan \\theta_1}{\\tan \\theta_2} = \\frac{k_2}{k_1}',
        explanation: 'Heat flux and temperature continuity at the interface of two solid materials in perfect thermal contact.'
      }
    ],
    keyFigures: [
      {
        title: 'Differential Element in Cartesian Coordinates',
        image: '/assets/conduction_coordinate_element.jpeg',
        caption: 'Figure 2.1.3.1: Differential control volume showing heat fluxes Qx, Qy, Qz and internal energy storage.'
      },
      {
        title: 'Isothermal Surfaces & Normal Gradients',
        image: '/assets/isothermal_surfaces.jpeg',
        caption: 'Figure 2.1.1.1: Temperature gradient grad(T) is perpendicular to isotherms in direction of maximum increase.'
      },
      {
        title: 'Dirichlet & Robin Boundary Conditions',
        image: '/assets/dirichlet_boundary_slab.jpeg',
        caption: 'Figure 2.1.4.1 & 2.1.4.3: Comparison of prescribed temperature vs surface convective boundary balance.'
      }
    ],
    highlights: [
      'Copper thermal diffusivity (1.15 cm²/s) vs Aluminum (0.97 cm²/s) allows rapid heat dispersion before hotspots form',
      'Anisotropic materials (e.g. pyrolytic graphite) direct thermal flux along preferred planes',
      'The 4th kind boundary condition dictates that ratio of tangent slopes equals the inverse ratio of conductivities'
    ]
  },
  {
    id: 'ch2-2',
    chapterNumber: 'Chapter 2.2',
    title: 'Convection & Extended Surface (Fin) Analysis',
    pages: 'Pages 22–44',
    summary: 'Comprehensive treatment of convective heat transfer from extended surfaces. Formulates the differential fin energy balance, solving for longitudinal temperature distribution under convective, adiabatic, and infinite tip conditions. Evaluates fin efficiency eta and heat transfer rate Q. Extensively examines dimensionless numbers (Nu, Re, Gr, Pr, Ra), hydrodynamic and thermal boundary layers (Blasius solutions), and Darcy-Weisbach pressure drop calculations.',
    keyEquations: [
      {
        name: 'Fin Differential Equation',
        latex: '\\frac{d^2\\theta}{dx^2} - m^2 \\theta = 0, \\quad m = \\sqrt{\\frac{p h}{k A_c}} \\approx \\sqrt{\\frac{2h}{kw}}',
        explanation: 'One-dimensional conduction-convection balance along a rectangular fin.'
      },
      {
        name: 'Longitudinal Temperature Profile (Adiabatic Tip)',
        latex: '\\frac{\\theta(x)}{\\theta_b} = \\frac{\\cosh[m(L - x)]}{\\cosh(mL)}, \\quad \\theta_b = T_w - T_0',
        explanation: 'Predicts the exponential/hyperbolic temperature decay from fin base (Tw) to fin tip.'
      },
      {
        name: 'Fin Efficiency',
        latex: '\\eta = \\frac{Q_{\\text{actual}}}{Q_{\\text{max}}} = \\frac{\\tanh(mL)}{mL}',
        explanation: 'Ratio of actual heat dissipated by fin to the theoretical maximum if entire fin stayed at base temperature.'
      },
      {
        name: 'Blasius Laminar & Turbulent Boundary Layer',
        latex: '\\delta_{\\text{lam}} = \\frac{4.91 x}{\\sqrt{Re_x}}, \\quad \\delta_{\\text{turb}} = \\frac{0.37 x}{Re_x^{1/5}}',
        explanation: 'Boundary layer growth over heat sink plates, triggering transition to turbulence at Re_cr = 500,000.'
      }
    ],
    keyFigures: [
      {
        title: 'Heat Balance in Rectangular Fin',
        image: '/assets/rectangular_fin_heat_balance.jpeg',
        caption: 'Figure 2.2.1.1: Differential fin slice showing conduction input, conduction output, and surface convection.'
      },
      {
        title: 'Boundary Layer Development & Sublayer',
        image: '/assets/boundary_layer_regions.jpeg',
        caption: 'Figure 2.2.4.1: Laminar, transition, and turbulent zones with viscous sublayer buffer.'
      },
      {
        title: 'Prandtl Number Boundary Layer Thicknesses',
        image: '/assets/prandtl_boundary_layer_profiles.jpeg',
        caption: 'Velocity boundary layer delta vs thermal boundary layer delta_T as a function of Pr.'
      }
    ],
    highlights: [
      'Fins bridge the high thermal resistance of gases by dramatically increasing the exposed convective surface area',
      'For typical aluminum fins (k = 160 W/mK, h = 50 W/m²K, L = 5cm), mL = 0.625 yielding 88% fin efficiency',
      'Laminar vs turbulent boundary layer transition fundamentally alters local Nusselt numbers and wall shear stress'
    ]
  },
  {
    id: 'ch2-3',
    chapterNumber: 'Chapter 2.3',
    title: 'Radiation Process & Emissivity Optimization',
    pages: 'Pages 45–47',
    summary: 'Analysis of radiative heat dissipation from heat sinks. Reviews Planck radiation distribution, Stefan-Boltzmann law, and greybody emission. Explains the critical role of surface treatments: black anodizing (emissivity 0.85) provides a 10-fold boost in radiation over polished aluminum (0.04). Details the calculation of apparent radiation surface area Arad = 2H(L+W) + LW.',
    keyEquations: [
      {
        name: 'Stefan-Boltzmann Radiation Equation',
        latex: 'Q_{\\text{rad}} = \\epsilon \\sigma A (T_s^4 - T_{\\text{sur}}^4), \\quad \\sigma = 5.67037 \\times 10^{-8} \\,\\text{W}/(\\text{m}^2 \\text{K}^4)',
        explanation: 'Quantifies net radiative heat loss from heat sink surface at absolute temperature Ts to ambient surroundings.'
      },
      {
        name: 'Apparent Radiation Surface Area',
        latex: 'A_{\\text{rad}} = 2H(L + W) + L \\cdot W',
        explanation: 'Treats the finned envelope as an equivalent bounding box to approximate radiative view factor interactions.'
      }
    ],
    keyFigures: [
      {
        title: 'Planck Spectral Radiance Distribution',
        image: '/assets/planck_radiation_distribution.png',
        caption: 'Figure 2.3.1: Blackbody spectral energy density as a function of temperature and wavelength.'
      },
      {
        title: 'Apparent Radiation Envelope',
        image: '/assets/apparent_radiation_area_box.jpeg',
        caption: 'Figure 2.3.4: Solid block bounding envelope methodology for finned heat sink radiation calculations.'
      }
    ],
    highlights: [
      'Radiation is often mistakenly omitted in heat sink design; at elevated temperatures (Ts > 70°C), radiation can account for 20-30% of passive dissipation',
      'Black anodized aluminum (epsilon = 0.85) dramatically outclasses raw mill or polished aluminum (epsilon = 0.04)',
      'Cavity view factor effects mean internal fin rays reflect among adjacent fins, making envelope bounding box analysis effective'
    ]
  },
  {
    id: 'ch3',
    chapterNumber: 'Chapter 3',
    title: 'Heat Sink Design & Aerodynamic Characterization',
    pages: 'Pages 48–59',
    summary: 'Examines geometric configurations, fin profiles (pin, straight, louvered, offset, wavy, microchannel), pin density, baseplate design, and thermal interface materials (TIM). Covers characterization methodology including wind tunnel testing, system impedance, and operating point determination via the intersection of fan P-Q curves and Darcy-Weisbach flow impedance.',
    keyEquations: [
      {
        name: 'Thermal Resistance Definition',
        latex: '\\theta_{sa} = \\frac{T_s - T_a}{Q} \\quad (^{\\circ}\\text{C}/\\text{W})',
        explanation: 'Primary figure of merit: temperature difference between heat sink base and approaching air per Watt dissipated.'
      },
      {
        name: 'Darcy-Weisbach Pressure Drop',
        latex: '\\frac{dp}{dx} = \\frac{f}{D_h} \\frac{\\rho V^2}{2}, \\quad f_{\\text{lam}} = \\frac{64}{Re_{D_h}}',
        explanation: 'Calculates the hydraulic pressure resistance opposing fan airflow through fin channels.'
      }
    ],
    keyFigures: [
      {
        title: 'Base Plate CFD Configurations',
        image: '/assets/base_plate_cfd_configurations.jpeg',
        caption: 'Figure 3.4.1: Temperature fields across Aluminum, Copper, Heat Pipe, and Vapor Chamber baseplates.'
      },
      {
        title: 'Fan P-Q Curve vs System Impedance',
        image: '/assets/fan_operating_point_pq_curve.jpeg',
        caption: 'Figure 3.7.1: Operating point where fan static pressure meets heat sink flow resistance.'
      },
      {
        title: 'Thermal Resistance vs Airflow Rate',
        image: '/assets/thermal_resistance_vs_airflow_cfm.jpeg',
        caption: 'Figure 3.7.2: Inverse relationship between thermal resistance theta_sa and volumetric flow rate.'
      }
    ],
    highlights: [
      'Baseplate thickness and material govern lateral heat spreading to prevent localized hot spots over CPU dies',
      'Adding more fins increases surface area but chokes airflow by raising system impedance K_sys',
      'The fan operating point (intersection of fan curve and impedance curve) determines the achievable CFM and thermal resistance'
    ]
  }
];

export interface SlideData {
  slideNumber: number;
  title: string;
  category: 'Overview' | 'Conduction' | 'Convection' | 'Radiation' | 'Design & Aerodynamics' | 'Advanced Modifications' | 'References';
  summary: string;
  image: string;
}

export const PRESENTATION_SLIDES: SlideData[] = Array.from({ length: 47 }, (_, i) => {
  const num = i + 1;
  const pad = num < 10 ? `0${num}` : `${num}`;
  
  let title = `Slide ${num}`;
  let category: SlideData['category'] = 'Overview';
  let summary = '';

  if (num === 1) {
    title = 'Title: Thermodynamic Analysis of a Heat Sink';
    summary = 'Department of Materials Science and Engineering, University of Moratuwa - MT1070 Defense';
  } else if (num === 2) {
    title = 'Group 3 Members Directory';
    summary = 'Listing all 9 student researchers: Premakumara (210494D), Themiya (Lead), Anjana, Danindi, etc.';
  } else if (num === 3) {
    title = 'Introduction to Heat Sinks';
    summary = 'Role of heat dissipation in maintaining optimal electronic operating temperatures.';
  } else if (num === 4) {
    title = 'Part 1: Conduction';
    category = 'Conduction';
    summary = 'Transition to conduction physics and governing differential equations.';
  } else if (num === 5) {
    title = "Fourier's Law in 3 Dimensions";
    category = 'Conduction';
    summary = 'Directional heat flux equations Qx, Qy, Qz and thermal conductivity components.';
  } else if (num === 6) {
    title = 'Base Plate & Fin Differential Control Volume';
    category = 'Conduction';
    summary = 'Cartesian coordinate mapping dx dy dz for heat conduction formulation.';
  } else if (num === 7) {
    title = 'First Law Energy Balance on Differential Element';
    category = 'Conduction';
    summary = 'Net heat conducted + heat generated = change in internal energy + work done.';
  } else if (num === 8) {
    title = "Taylor Series Expansion for Heat Inflow & Outflow";
    category = 'Conduction';
    summary = 'Expanding Q(x+dx) to formulate net rate of heat storage.';
  } else if (num === 9) {
    title = '3D Net Conduction Rate Summation';
    category = 'Conduction';
    summary = 'Summing x, y, and z directional differentials over volume dx dy dz.';
  } else if (num === 10) {
    title = 'Internal Energy Storage & Heat Generation Terms';
    category = 'Conduction';
    summary = 'Deriving rho * cp * dT/dt and volumetric heat generation q_dot.';
  } else if (num === 11) {
    title = 'General 3D Differential Heat Conduction Equation';
    category = 'Conduction';
    summary = 'Full 3D PDE with anisotropic conductivities and unsteady rate terms.';
  } else if (num === 12) {
    title = 'Isotropic Materials & Thermal Diffusivity alpha';
    category = 'Conduction';
    summary = 'Defining thermal diffusivity alpha = k / (rho * cp) in m²/s.';
  } else if (num === 13) {
    title = 'Part 2: Convection Process';
    category = 'Convection';
    summary = 'Introduction to extended surfaces (fins) and fluid-solid convective heat transfer.';
  } else if (num === 14) {
    title = 'Heat Balance Over a Rectangular Fin Slice';
    category = 'Convection';
    summary = 'Balancing conduction in, conduction out, and surface convection loss 2(b+w)dx*h*(T-T0).';
  } else if (num === 15) {
    title = 'Fin Temperature Profile & Heat Transfer Rate';
    category = 'Convection';
    summary = 'Exponential decay profile theta(x) = theta_b * e^(-mx) and total heat dissipated Q.';
  } else if (num === 16) {
    title = 'Dimensionless Group: Nusselt Number (Nu)';
    category = 'Convection';
    summary = 'Ratio of wall temperature gradient to fluid gradient: Nu = h * L / k.';
  } else if (num === 17) {
    title = 'Dimensionless Group: Reynolds Number (Re)';
    category = 'Convection';
    summary = 'Ratio of inertial forces to viscous forces: Re = V * L / nu.';
  } else if (num === 18) {
    title = 'Dimensionless Group: Grashof Number (Gr)';
    category = 'Convection';
    summary = 'Characterizes buoyancy forces in natural convection: Gr = g * beta * deltaT * L³ / nu².';
  } else if (num === 19) {
    title = 'Dimensionless Group: Prandtl Number (Pr)';
    category = 'Convection';
    summary = 'Ratio of momentum diffusivity to thermal diffusivity: Pr = nu / alpha = cp * mu / k.';
  } else if (num === 20) {
    title = 'Dimensionless Group: Rayleigh Number (Ra)';
    category = 'Convection';
    summary = 'Product of Grashof and Prandtl numbers: Ra = Gr * Pr for natural convection onset.';
  } else if (num === 21) {
    title = 'Free Convection Interdependence Flowchart';
    category = 'Convection';
    summary = 'Functional relationships linking Nu = f(Ra, Pr) and Nu = f(Gr, Pr).';
  } else if (num === 22) {
    title = 'Laminar Free Convection Churchill-Chu Correlations';
    category = 'Convection';
    summary = 'Calculation sequence: Gr -> Ra -> Nu -> h_bar -> Q_dot = h_bar * A * deltaT.';
  } else if (num === 23) {
    title = 'Hydrodynamic Boundary Layer Definition';
    category = 'Convection';
    summary = 'Distance delta from surface where fluid velocity u reaches 99% of freestream U_inf.';
  } else if (num === 24) {
    title = 'Boundary Layer Regimes: Laminar, Transition, Turbulent';
    category = 'Convection';
    summary = 'Flow development along plate showing critical Reynolds transition and turbulent sublayer.';
  } else if (num === 25) {
    title = 'Viscous Boundary Layer Growth Mechanism';
    category = 'Convection';
    summary = 'Layer-by-layer viscous retardation transmitting slower momentum outward.';
  } else if (num === 26) {
    title = 'Thermal Boundary Layer delta_T';
    category = 'Convection';
    summary = 'Temperature profile in fluid approaching freestream bulk temperature T_inf.';
  } else if (num === 27) {
    title = 'Darcy-Weisbach Pressure Drop & Moody Diagram';
    category = 'Convection';
    summary = 'Channel pressure drop dp/dx = (f/D) * (rho*V²/2g) and friction factor curve.';
  } else if (num === 28) {
    title = 'Part 3: Radiation Process';
    category = 'Radiation';
    summary = 'Introduction to electromagnetic radiation heat transfer from heat sink surfaces.';
  } else if (num === 29) {
    title = 'Stefan-Boltzmann Law & Emissivity Table';
    category = 'Radiation';
    summary = 'Q = epsilon * sigma * A * (Ts⁴ - Tsur⁴) with comparison of polished vs anodized metals.';
  } else if (num === 30) {
    title = 'Part 4: Heat Sink Design & Optimization';
    category = 'Design & Aerodynamics';
    summary = 'Comprehensive design parameters: profiles, fin density, height, materials, baseplates.';
  } else if (num === 31) {
    title = 'Core Factors in Heat Sink Design';
    category = 'Design & Aerodynamics';
    summary = 'Overview: Fin Geometry, Density, Height, Material selection, and Baseplate flatness.';
  } else if (num === 32) {
    title = 'Plate Finned Heat Sink & Thermal Resistance theta_sa';
    category = 'Design & Aerodynamics';
    summary = 'Thermal resistance theta_sa = (Ts - Ta) / Q as a function of volumetric CFM.';
  } else if (num === 33) {
    title = 'Fan P-Q Operating Point Intersection';
    category = 'Design & Aerodynamics';
    summary = 'Intersection of fan curve and heat sink system impedance curve determines operating CFM.';
  } else if (num === 34) {
    title = 'Part 5: Advanced Heat Sink Modifications';
    category = 'Advanced Modifications';
    summary = 'Innovations to elevate cooling capacity beyond classical limits.';
  } else if (num === 35) {
    title = 'Modification Categorization';
    category = 'Advanced Modifications';
    summary = 'Dividing into: Enhancing dissipation performance vs Utilizing dissipated waste energy.';
  } else if (num === 36) {
    title = 'Nanostructured Heat Sink Principles';
    category = 'Advanced Modifications';
    summary = 'Nanoscale pillars and wires provide immense surface area and trip stagnant sublayers.';
  } else if (num === 37) {
    title = 'SEM Micrographs of Nanostructured Surfaces';
    category = 'Advanced Modifications';
    summary = 'Electron microscope imagery showing 100um nanopillars and etched features.';
  } else if (num === 38) {
    title = 'Microfluidic Heat Sink Architecture';
    category = 'Advanced Modifications';
    summary = 'Circulating liquid through microchannels for ultra-high heat flux removal.';
  } else if (num === 39) {
    title = 'Microfluidic Manifold & Advantages';
    category = 'Advanced Modifications';
    summary = 'Diagram of inlet/outlet manifolds, flow dividers, and microfin unit cells.';
  } else if (num === 40) {
    title = 'Phase Change Materials (PCMs) in Heat Sinks';
    category = 'Advanced Modifications';
    summary = 'Latent heat absorption to buffer transient thermal shocks and temperature spikes.';
  } else if (num === 41) {
    title = 'PCM Phase Transition Enthalpy Curve';
    category = 'Advanced Modifications';
    summary = 'Temperature vs energy content curve showing solid -> melting -> liquid transition.';
  } else if (num === 42) {
    title = 'Thermoelectric Peltier Heat Sinks';
    category = 'Advanced Modifications';
    summary = 'Converting temperature gradients into usable electricity via Seebeck effect.';
  } else if (num === 43) {
    title = 'Physical Thermoelectric Heat Sink Prototype';
    category = 'Advanced Modifications';
    summary = 'Photograph of integrated Peltier module, fan, and secondary extruded aluminum fin stack.';
  } else if (num === 44) {
    title = 'Academic References (Part 1)';
    category = 'References';
    summary = 'Citations: Rogers & Mayhew, Dutta Heat Transfer, Bhattacharya Thermal Management.';
  } else if (num === 45) {
    title = 'Academic References (Part 2)';
    category = 'References';
    summary = 'Citations: Nuclear Power Nusselt definitions, Som & Chakraborty fin analysis.';
  } else if (num === 46) {
    title = 'Project Conclusions & Outlook';
    category = 'Overview';
    summary = 'Synthesis of conduction, convection, and radiation optimization for next-gen electronics.';
  } else if (num === 47) {
    title = 'End of Defense Presentation';
    category = 'Overview';
    summary = 'Closing slide - Questions and Committee Defense.';
  }

  return {
    slideNumber: num,
    title,
    category,
    summary,
    image: `/slides/slide_${pad}.png`
  };
});
