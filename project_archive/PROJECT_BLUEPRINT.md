# THERMODYNAMIC ANALYSIS OF A HEAT SINK
## Master Engineering Architecture & Web Experience Blueprint

> **Academic Credentials & Context**
> - **Institution**: Department of Materials Science & Engineering, University of Moratuwa, Sri Lanka
> - **Module**: MT1070 – Thermodynamics and Phase Equilibria
> - **Project Title**: Thermodynamic Analysis of a Heat Sink (Conduction, Convection, Radiation, Fin Design & Advanced Modifications)
> - **Group**: Group 3
> - **Date of Submission / Presentation**: July 9 / 12, 2023
> - **Team Members**:
>   - **210494D PREMAKUMARA H.P.S. (Sadun Premakumara)**
>   - **210042R ANJANA E.A.O.**
>   - **210094C DANINDI H.M.T.**
>   - **210101A DE SILVA G.A.I.**
>   - **210347G MADHUBHASHINEE H.A.W.R.**
>   - **210447M PATHIRAGE S.S.K.**
>   - **210525C RANAWEERA R.K.P.**
>   - **210640A THEMIYA K.L.**
>   - **210660J UDAYAKANTHA D.A.W.I.**

---

## 1. Executive Summary & Physics Foundations

### 1.1 The Thermal Dissipation Imperative in Electronics
Heat sinks are ubiquitous passive and active thermal management components in modern power electronics, microprocessors, automotive inverters, and high-flux optoelectronics. As semiconductor device densities escalate, heat flux at the die level exceeds **$50 – 150 \text{ W/cm}^2$**. Maintaining junction temperatures below critical limits ($T_j < 85^\circ\text{C} – 105^\circ\text{C}$) requires optimizing the three classical modes of heat transfer:

1. **Conduction ($q = -k \nabla T$)**: Direct solid-state thermal transport through high-conductivity substrates (Copper $k \approx 400 \text{ W/mK}$, Aluminum $k \approx 205 \text{ W/mK}$) into extended fin structures.
2. **Convection ($q = h \Delta T$)**: Fluid-solid heat exchange between fin surfaces and ambient air/coolant via natural buoyancy ($Ra$) or fan-driven forced flow ($Re$).
3. **Radiation ($Q = \epsilon \sigma A [T_s^4 - T_{\text{sur}}^4]$)**: Electromagnetic infrared heat rejection, heavily dictated by surface treatment (anodization increases emissivity by over **$10\times$** from $0.06$ to $0.85$!).

---

## 2. Mathematical Modeling & Differential Equations

### 2.1 General 3D Heat Conduction Equation
$$\frac{\partial}{\partial x}\left(k_x \frac{\partial T}{\partial x}\right) + \frac{\partial}{\partial y}\left(k_y \frac{\partial T}{\partial y}\right) + \frac{\partial}{\partial z}\left(k_z \frac{\partial T}{\partial z}\right) + \dot{q} = \rho c_p \frac{\partial T}{\partial t}$$
For isotropic materials ($k_x = k_y = k_z = k$):
$$\nabla^2 T + \frac{\dot{q}}{k} = \frac{1}{\alpha} \frac{\partial T}{\partial t}, \quad \alpha = \frac{k}{\rho c_p} \text{ (Thermal Diffusivity)}$$

### 2.2 Extended Surfaces: Fin Heat Transfer Analysis
For a rectangular fin of length $L$, thickness $w$, and width $b$:
$$\frac{d^2 \theta}{dx^2} - m^2 \theta = 0, \quad m = \sqrt{\frac{p h}{k A_c}} \approx \sqrt{\frac{2h}{kw}}$$
- Temperature Distribution (Adiabatic Tip): $\frac{\theta(x)}{\theta_b} = \frac{\cosh[m(L-x)]}{\cosh(mL)}$
- Heat Dissipation Rate: $Q = \sqrt{p h k A_c} \, \theta_b \tanh(mL)$
- Fin Efficiency: $\eta = \frac{\tanh(mL)}{mL}$

---

## 3. Convection & Dimensionless Groups
- **Nusselt Number**: $Nu = \frac{h L}{k}$
- **Reynolds Number**: $Re = \frac{V L}{\nu}$
- **Grashof Number**: $Gr = \frac{g \beta (T_w - T_\infty) L^3}{\nu^2}$
- **Prandtl Number**: $Pr = \frac{\nu}{\alpha} = \frac{c_p \mu}{k}$
- **Rayleigh Number**: $Ra = Gr \times Pr$
- **Laminar Boundary Layer Thickness (Blasius)**: $\delta(x) = \frac{4.91 x}{\sqrt{Re_x}}$
- **Turbulent Boundary Layer Thickness (Blasius)**: $\delta(x) = \frac{0.37 x}{Re_x^{1/5}}$
- **Darcy-Weisbach Pressure Drop**: $\frac{\Delta p}{L} = \frac{f}{D_h} \frac{\rho V^2}{2 g}$

---

## 4. Radiation & Surface Emissivity
- $Q_{\text{rad}} = \epsilon \sigma A (T_s^4 - T_{\text{sur}}^4)$
- Anodized Aluminum ($\epsilon = 0.85$) provides a **10x radiative dissipation boost** over polished aluminum ($\epsilon = 0.04$).

---

## 5. Fin Profiles & Operating Point
- 6 Profiles: Straight Fin, Pin Fin, Louvered Fin, Offset Strip Fin, Wavy Fin, Microchannel Fin.
- Operating Point: Intersection of Fan P-Q Curve and System Impedance Curve.

---

## 6. 9 Advanced Cooling Modifications
1. Nanostructured Heat Sinks (Nanowires, Nanopillars, CNTs)
2. Thermoelectric Heat Sinks (Peltier/Seebeck TEC/TEG)
3. Microfluidic Heat Sinks (Microchannels with liquid coolant)
4. Photonic Heat Sinks (Radiative bandgap engineering)
5. Graphene-Based Heat Sinks ($k > 3000 \text{ W/mK}$, Aerogels)
6. Magnetic Heat Sinks (Magnetocaloric effect)
7. Phase Change Materials (PCMs) (Latent heat thermal buffer)
8. Hybrid Heat Sinks (Vapor chambers + microchannels)
9. Shape Memory Alloys (SMAs) (Adaptive thermal actuators)

---

## 7. Web Application Architecture ("Thermal Plasma & CFD Vibe")
- **Palette**: Obsidian Black (`#030712`), Copper Orange (`#F97316`), Cryogenic Cyan (`#06B6D4`), Plasma Violet (`#6366F1`).
- **Interactive Modules**:
  1. Interactive Fin Temperature Profile & Efficiency Simulator
  2. Convection & Dimensionless Groups Calculator ($Nu, Re, Gr, Pr, Ra, \delta$)
  3. Stefan-Boltzmann Radiation & Anodization Studio
  4. Fan P-Q Operating Point Solver
  5. 6 Fin Profiles CAD & Performance Gallery
  6. 9 Advanced Cooling Modifications Showcase
  7. 47-Slide Defense Presentation Carousel (300 DPI) & 77-Page Report Reader
  8. Group 3 Research Team Hub with University of Moratuwa credentials
