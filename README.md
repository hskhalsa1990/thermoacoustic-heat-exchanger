# Thermoacoustic Phenomena in a Heat Exchanger

An illustrative, multi-language project on thermoacoustic instability in a heat exchanger. It covers the physics model, 3D visualisation, data cleaning, machine learning, deep learning, Navier-Stokes checks, thermodynamics and heat transfer, and dimensionless numbers, implemented in Python, C, C++, C#/.NET, Bash and TypeScript.

> **Scope:** this is a toy model for teaching and exploration. It is not a validated design tool.

---

## Project at a glance

```mermaid
flowchart LR
    NB["thermoacoustic_heat_exchanger.ipynb<br/>Python: physics, plots, ML, DL, math"]
    CPP["solver_cpp.cpp<br/>C++ sweep"]
    C["solver_c.c<br/>C sweep"]
    NET["Program.cs + ThermoCalc.csproj<br/>.NET sweep"]
    UTIL["thermo_utils.py + cli.py<br/>shared functions and CLI"]
    SH["run_all.sh<br/>Bash runner"]
    TS["dashboard.ts + dashboard.html<br/>TypeScript 3D dashboard"]
    CSV[("sweep_*.csv<br/>growth-rate data")]

    NB -- "compiles and runs" --> CPP
    CPP --> CSV
    NB -- "loads CSV, 3D scatter" --> CSV
    SH --> C
    SH --> CPP
    SH --> NET
    C --> CSV
    NET --> CSV
    NB -- "imports" --> UTIL
    UTIL --> CLI["cli.py"]
    TS -- "Plotly 3D" --> DASH["Interactive browser view"]
    NB -. "same model, same formula" .- TS
```

## Physics model

The toy model combines acoustic modes of a closed-open duct with a Rayleigh-type drive. A mode grows when the heat release is in phase with the pressure oscillation.

```mermaid
flowchart TD
    A["Duct length L, speed of sound c"] --> B["Mode frequencies<br/>f_n = n c / 2L"]
    B --> C["Growth rate<br/>sigma = Q cos(2 pi f tau) - zeta"]
    D["Heat-release strength Q"] --> C
    E["Time delay tau"] --> C
    F["Acoustic damping zeta"] --> C
    C --> G{"sigma > 0 ?"}
    G -- yes --> H["Unstable: thermoacoustic oscillation grows"]
    G -- no --> I["Stable: oscillation decays"]
```

## Notebook map

The main notebook has 22 sections. Each section can be run on its own after the setup cell.

```mermaid
flowchart TB
    S0["0. Setup"] --> S1["1. Physics and 3D diagrams"]
    S1 --> S2["2. 3D amplitude graph"]
    S2 --> S3["3. C++ solver from Python"]
    S3 --> S4["4. 3D comparison table and bars"]
    S4 --> S5["5. Machine learning: classifiers"]
    S5 --> S6["6. Deep learning: MLP surrogate"]
    S6 --> S7["7. Interactive Plotly surface"]
    S7 --> S8["8. Summary"]
    S8 --> S10["10. Data cleaning"]
    S10 --> S11["11. Visualisation: spectrogram, heatmap, GIF"]
    S11 --> S12["12. Pandas analysis"]
    S12 --> S13["13. ML: cross-validation and tuning"]
    S13 --> S14["14. DL: early stopping and metrics"]
    S14 --> S15["15. Python utilities"]
    S15 --> S16["16. Navier-Stokes and math analysis"]
    S16 --> S18["18. Air thermodynamics and heat transfer"]
    S18 --> S19["19. Material composition effects"]
    S19 --> S20["20. Dimensionless numbers"]
    S20 --> S21["21. Isothermal vs adiabatic"]
    S21 --> S22["22. Heat-transfer glossary in use"]
```

## Heat-transfer concepts

```mermaid
mindmap
  root((Heat transfer))
    Conduction
      Fourier law
      Conductivity k
    Convection
      Newton law
      Coefficient h
      Heat sink fins
    Radiation
      Stefan-Boltzmann
      T to the fourth power
    Advection
      m_dot c_p dT
    Equilibrium
      Time constant
      Newton cooling
```

## Language support

| Language | File | How to run |
|---|---|---|
| Python | `thermoacoustic_heat_exchanger.ipynb`, `thermo_utils.py`, `cli.py` | `jupyter notebook` or `python cli.py --mode 2 --tau 0.003 --Q 1.2` |
| C | `solver_c.c` | `gcc -O2 -std=c99 solver_c.c -o solver_c -lm && ./solver_c > sweep_c.csv` |
| C++ | `solver_cpp.cpp` | `g++ -O2 -std=c++17 solver_cpp.cpp -o solver_cpp && ./solver_cpp > sweep_cpp.csv` |
| C# / .NET | `Program.cs`, `ThermoCalc.csproj` | `dotnet run --project ThermoCalc.csproj > sweep_dotnet.csv` |
| Bash | `run_all.sh` | `bash run_all.sh` (builds all solvers and checks outputs) |
| TypeScript | `dashboard.ts`, `tsconfig.json`, `package.json` | `npm install && npm run build`, then open `dashboard.html` |

### How the solvers relate

```mermaid
sequenceDiagram
    participant U as User
    participant S as run_all.sh
    participant C as solver_c
    participant X as solver_cpp
    participant N as ThermoCalc
    participant K as Compare
    U->>S: bash run_all.sh
    S->>C: gcc build, run
    C-->>S: sweep_c.csv
    S->>X: g++ build, run
    X-->>S: sweep_cpp.csv
    S->>N: dotnet run (if installed)
    N-->>S: sweep_dotnet.csv
    S->>K: cmp sweep_c.csv sweep_cpp.csv
    K-->>U: identical or differ
```

## Setup

Python:
```bash
pip install -r requirements.txt
jupyter notebook thermoacoustic_heat_exchanger.ipynb
```

Run the notebook from the project folder so its relative paths resolve.

Native solvers and the Bash runner:
```bash
bash run_all.sh
```

TypeScript dashboard:
```bash
npm install
npm run build
# then open dashboard.html in a browser
```

## Files

| File | Purpose |
|---|---|
| `thermoacoustic_heat_exchanger.ipynb` | Main notebook, all sections merged |
| `thermo_utils.py` | Shared Python functions |
| `cli.py` | Command-line growth-rate calculator |
| `solver_c.c` | C solver |
| `solver_cpp.cpp` | C++ solver |
| `Program.cs`, `ThermoCalc.csproj` | .NET solver |
| `run_all.sh` | Bash runner for all solvers |
| `dashboard.ts`, `dashboard.html`, `tsconfig.json`, `package.json` | TypeScript 3D dashboard |
| `GLOSSARY.md` | Heat-transfer terms |
| `requirements.txt` | Python dependencies |
| `.gitignore` | Ignores build outputs and caches |
| `LICENSE` | MIT |

## Results gallery

All 29 figures are generated by the notebook and saved here as PNG files. Each one is also stored in the notebook's cell outputs.

### Physics and 3D diagrams (sections 1-4)

![Growth-rate surface](fig_01.png)
*Rayleigh-type growth-rate surface over frequency and time delay (section 1).*

![Mode shapes](fig_02.png)
*Acoustic mode shapes for n = 1, 2, 3 (section 1).*

![C++ sweep](fig_04.png)
*3D scatter of the C++ solver output (section 3).*

![Peak growth by mode](fig_05.png)
*3D bar chart of peak growth rate by mode and heat release (section 4).*

### Machine learning and deep learning (sections 5-14)

![Classifier comparison](fig_06.png)
*Stable vs unstable prediction on the test set (section 5).*

![Deep learning surrogate](fig_07.png)
*MLP surrogate surface for the growth rate (section 6).*

![Learning curves](fig_11.png)
*Learning curves and predicted vs true values for the validation set (section 14).*

### Mathematics and thermodynamics (sections 16-22)

![Energy decay and Taylor-Green vortex](fig_13.png)
*Taylor-Green vortex, an exact 2D Navier-Stokes solution: speed surface, kinetic-energy decay and velocity field (section 16).*

![Air heating: temperature, enthalpy, entropy](fig_16.png)
*Outlet temperature, enthalpy change and entropy change for heated air (section 18).*

![Dimensionless numbers](fig_21.png)
*Reynolds and Nusselt numbers against velocity and tube diameter, on a log scale (section 20).*

![P-V and T-s diagrams](fig_24.png)
*Isothermal vs adiabatic compression: P-V and T-s diagrams (section 21).*

![Heat sink](fig_27.png)
*Heat per fin against convective coefficient and fin length (section 22).*

## Important notes

- **Toy model:** the growth-rate model is simplified. The material-composition parameters are illustrative, not measured.
- **Navier-Stokes:** existence and smoothness of 3D solutions is an open problem (Clay Millennium Prize). The notebook checks an exact 2D solution and does not claim a new theorem.
- **Correlations:** the Nusselt correlation (Dittus-Boelter) is for turbulent flow, Re above 10,000. Values at lower Reynolds numbers are only indicative.
- **Verification status:** all 47 code cells of the notebook were executed in this environment, and the results are saved in the notebook. PyTorch and IPython could not be installed here, so the deep learning sections (6 and 14) ran on a NumPy MLP fallback with physics-informed phase features. Running the notebook with PyTorch will use the PyTorch path instead. The .NET and TypeScript builds were not compiled here.


## Licence

MIT. See `LICENSE`.
