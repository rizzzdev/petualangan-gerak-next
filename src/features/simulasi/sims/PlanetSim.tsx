"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "../../shared/components/SimulationShell";
import { InfoBar, CtrlGroup, SimBtns, StatsRow } from "./RaceSim";

const PLANETS = [
  { id: "moon",  name: "Bulan",   g: 1.6,  color: "#7ee8fa", emoji: "🌙", xFrac: 0.15 },
  { id: "mars",  name: "Mars",    g: 3.72, color: "#ff8c42", emoji: "🔴", xFrac: 0.38 },
  { id: "earth", name: "Bumi",    g: 9.8,  color: "#22d4cc", emoji: "🌍", xFrac: 0.62 },
  { id: "jup",   name: "Jupiter", g: 24.8, color: "#ffd700", emoji: "🟠", xFrac: 0.85 },
];

function glowBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, dark: string, light: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
  g.addColorStop(0, light + "55");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(x - r * 2, y - r * 2, r * 4, r * 4);
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(x - r / 3, y - r / 3, r / 3, 0, Math.PI * 2);
  ctx.fill();
}

function ring(ctx: CanvasRenderingContext2D, x: number, y: number, c: string) {
  for (let r = 1; r <= 3; r++) {
    ctx.strokeStyle = c;
    ctx.lineWidth = 2;
    ctx.globalAlpha = (4 - r) * 0.25;
    ctx.beginPath();
    ctx.arc(x, y, r * 16, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export default function PlanetSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);
  const trailsRef = useRef<Record<string, number[]>>({});

  const [fallHeight, setFallHeight] = useState(100);
  const [velStats, setVelStats] = useState<Record<string, string>>({
    moon: "0", mars: "0", earth: "0", jup: "0",
  });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fit = useCallback(() => {
    const cv = cvRef.current;
    if (!cv?.parentElement) return;
    cv.width = cv.parentElement.offsetWidth - 2;
  }, []);

  const drawScene = useCallback(
    (t: number, dists: Record<string, number>, H0: number) => {
      const cv = cvRef.current;
      if (!cv) return;
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#060810");
      bg.addColorStop(1, "#080c0c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff33";
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 173 + 41) % W), sy = ((i * 97 + 23) % (H * 0.85));
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      const GY = H - 40, scale = Math.min((GY - 50) / H0, 2.5);

      PLANETS.forEach((p) => {
        const x = W * p.xFrac;
        ctx.fillStyle = p.color + "22";
        ctx.fillRect(x - 30, GY, 60, H - GY);
        ctx.fillStyle = p.color + "55";
        ctx.fillRect(x - 30, GY, 60, 3);
        ctx.fillStyle = p.color;
        ctx.font = "bold 10px 'Syne'";
        ctx.textAlign = "center";
        ctx.fillText(`${p.emoji} ${p.name}`, x, H - 15);
        ctx.fillStyle = p.color + "aa";
        ctx.font = "9px 'Space Mono'";
        ctx.fillText(`g=${p.g}`, x, H - 4);
        ctx.textAlign = "left";
      });

      PLANETS.forEach((p) => {
        const x = W * p.xFrac;
        const dist = dists[p.id] || 0;
        const by = Math.min(GY - 16, GY - (H0 - dist) * scale);

        ctx.globalAlpha = 0.4;
        const trail = trailsRef.current[p.id] || [];
        trail.forEach((ty, i) => {
          const a = i / trail.length;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = a * 0.4;
          ctx.beginPath();
          ctx.arc(x, ty, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        glowBall(ctx, x, by, 14, p.color + "88", p.color);

        if (t > 0 && dist > 0) {
          const v = (p.g * t).toFixed(1);
          ctx.fillStyle = p.color;
          ctx.font = "bold 9px 'Space Mono'";
          ctx.textAlign = "center";
          ctx.fillText(`${v} m/s`, x, Math.max(by - 20, 20));
          ctx.textAlign = "left";
        }

        if (dist >= H0 && t > 0) ring(ctx, x, GY, p.color);
      });

      const step = Math.ceil(H0 / 4 / 10) * 10 || 10;
      for (let h = 0; h <= H0; h += step) {
        const my = GY - h * scale;
        if (my < 20) break;
        ctx.strokeStyle = "#1a2828";
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 8]);
        ctx.beginPath();
        ctx.moveTo(5, my);
        ctx.lineTo(W - 5, my);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#2a4040";
        ctx.font = "8px 'Space Mono'";
        ctx.fillText(`${h}m`, 5, my - 2);
      }
    },
    [],
  );

  useEffect(() => {
    PLANETS.forEach((p) => { trailsRef.current[p.id] = []; });
    fit();
    drawScene(0, {}, fallHeight);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit, drawScene, fallHeight]);

  const pause = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    setSimStatus("paused");
  };

  const start = () => {
    if (runRef.current) return;
    runRef.current = true;
    if (simStatus !== "paused") { tRef.current = 0; PLANETS.forEach((p) => { trailsRef.current[p.id] = []; }); }
    setSimStatus("running");
    const H0 = fallHeight;
    let last: number | null = null;

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      const dists: Record<string, number> = {};
      let anyMoving = false;
      const cv = cvRef.current!;
      const GY = cv.height - 40, scale = Math.min((GY - 50) / H0, 2.5);
      const newVels: Record<string, string> = {};

      PLANETS.forEach((p) => {
        const d = Math.min(0.5 * p.g * t * t, H0);
        dists[p.id] = d;
        const by = Math.min(GY - 16, GY - (H0 - d) * scale);
        trailsRef.current[p.id].push(by);
        if (trailsRef.current[p.id].length > 60) trailsRef.current[p.id].shift();
        if (d < H0) anyMoving = true;
        newVels[p.id] = (p.g * t).toFixed(1);
      });
      setVelStats(newVels);
      drawScene(t, dists, H0);
      if (anyMoving) {
        afRef.current = requestAnimationFrame(frame);
      } else {
        runRef.current = false;
      }
    };
    afRef.current = requestAnimationFrame(frame);
  };

  const reset = useCallback(() => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    tRef.current = 0;
    PLANETS.forEach((p) => { trailsRef.current[p.id] = []; });
    setSimStatus("idle");
    setVelStats({ moon: "0", mars: "0", earth: "0", jup: "0" });
    drawScene(0, {}, fallHeight);
  }, [drawScene, fallHeight]);

  return (
    <SimulationShell title="🎳 Jatuh Bebas di Berbagai Planet — Bandingkan Gravitasi!">
      <InfoBar>Jatuhkan bola yang sama dari ketinggian sama di 4 planet berbeda secara bersamaan! Perhatikan betapa berbedanya kecepatan jatuh di setiap planet.</InfoBar>

      <canvas ref={cvRef} height={380} className="w-full rounded-xl block" style={{ border: "1px solid var(--color-border)" }} />

      <div className="grid grid-cols-1 gap-4 mt-5">
        <CtrlGroup label="Ketinggian Jatuh" val={`${fallHeight} m`}>
          <input type="range" min={50} max={300} value={fallHeight} onChange={(e) => { setFallHeight(+e.target.value); reset(); }} />
        </CtrlGroup>
      </div>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Jatuhkan di Semua Planet!"} />

      <StatsRow items={[
        { label: "🌙 Bulan (1.6)", val: velStats.moon, unit: "m/s" },
        { label: "🔴 Mars (3.7)",  val: velStats.mars, unit: "m/s" },
        { label: "🌍 Bumi (9.8)",  val: velStats.earth, unit: "m/s" },
        { label: "🟠 Jupiter (24.8)", val: velStats.jup, unit: "m/s" },
      ]} />

      <div className="flex flex-wrap gap-3 mt-3">
        {PLANETS.map((p) => (
          <div key={p.id} className="flex items-center gap-2 font-mono text-[0.7rem]" style={{ color: "var(--color-text-faint)" }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </SimulationShell>
  );
}
