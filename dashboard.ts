// Interactive 3D dashboard for the thermoacoustic toy model.
// Requires Plotly loaded globally (see web/index.html).

declare const Plotly: {
  newPlot(el: HTMLElement, data: unknown[], layout?: unknown, config?: unknown): Promise<void>;
};

const C = 343.0; // speed of sound (m/s)
const L = 1.0;   // duct length (m)
const ZETA = 0.05;

export function modeFrequency(n: number): number {
  return (n * C) / (2 * L);
}

export function growthRate(f: number, tau: number, Q: number): number {
  return Q * Math.cos(2 * Math.PI * f * tau) - ZETA;
}

function linspace(a: number, b: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

function renderSurface(el: HTMLElement): void {
  const f = linspace(20, 600, 120);
  const tau = linspace(0, 0.02, 120);
  const z = tau.map((t) => f.map((fr) => growthRate(fr, t, 1.0)));

  const trace = {
    type: "surface",
    x: f,
    y: tau.map((t) => t * 1000),
    z,
    colorscale: "RdBu",
    reversescale: true,
  };
  const layout = {
    title: "Growth rate surface (Q = 1.0)",
    scene: {
      xaxis: { title: "Frequency (Hz)" },
      yaxis: { title: "Time delay (ms)" },
      zaxis: { title: "Growth rate (1/s, toy)" },
    },
    margin: { l: 0, r: 0, t: 40, b: 0 },
  };
  void Plotly.newPlot(el, [trace], layout, { responsive: true });
}

function renderModeBars(el: HTMLElement): void {
  const modes = [1, 2, 3, 4];
  const Qs = [0.5, 1.0, 1.5];
  const traces = Qs.map((Q) => ({
    type: "bar",
    name: `Q = ${Q}`,
    x: modes.map((n) => `n=${n} (${modeFrequency(n).toFixed(0)} Hz)`),
    y: modes.map((n) => growthRate(modeFrequency(n), 0.003, Q)),
  }));
  const layout = {
    title: "Growth rate per mode at tau = 3 ms",
    yaxis: { title: "Growth rate (1/s, toy)" },
    barmode: "group",
  };
  void Plotly.newPlot(el, traces, layout, { responsive: true });
}

function renderModeShapes(el: HTMLElement): void {
  const x = linspace(0, L, 60);
  const phase = linspace(0, 2 * Math.PI, 60);
  const z = phase.map((p) => x.map((xi) => Math.cos(Math.PI * xi / L) * Math.cos(p)));

  const trace = { type: "surface", x, y: phase, z, colorscale: "Viridis" };
  const layout = {
    title: "Mode shape, n = 1",
    scene: {
      xaxis: { title: "Position x (m)" },
      yaxis: { title: "Phase (rad)" },
      zaxis: { title: "Pressure (a.u.)" },
    },
    margin: { l: 0, r: 0, t: 40, b: 0 },
  };
  void Plotly.newPlot(el, [trace], layout, { responsive: true });
}

function init(): void {
  const surface = document.getElementById("surface");
  const bars = document.getElementById("bars");
  const shape = document.getElementById("shape");
  if (surface) renderSurface(surface);
  if (bars) renderModeBars(bars);
  if (shape) renderModeShapes(shape);
}

document.addEventListener("DOMContentLoaded", init);
