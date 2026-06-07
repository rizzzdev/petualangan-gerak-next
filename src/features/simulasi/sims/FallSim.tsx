"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "~/components/SimulationShell";
import { InfoBar, CtrlGrid, CtrlGroup, SimBtns, StatsRow } from "./RaceSim";

const DRAG_LABELS = ["Tidak Ada", "Sangat Ringan (bulu)", "Ringan", "Sedang"];

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

export default function FallSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);
  const trailRef = useRef<number[]>([]);

  const [height, setHeight] = useState(100);
  const [gravity, setGravity] = useState(10);
  const [drag, setDrag] = useState(0);
  const [stats, setStats] = useState({ time: "0.0", vel: "0", dist: "0", rem: "100" });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fit = useCallback(() => {
    const cv = cvRef.current;
    if (!cv?.parentElement) return;
    cv.width = cv.parentElement.offsetWidth - 2;
  }, []);

  const drawScene = useCallback(
    (t: number, dist: number, vel: number, H0: number) => {
      const cv = cvRef.current;
      if (!cv) return;
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#090f18";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#ffffff33";
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 173 + 41) % W), sy = ((i * 97 + 23) % (H * 0.75));
        ctx.beginPath();
        ctx.arc(sx, sy, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      const GY = H - 50, scale = Math.min((GY - 40) / H0, 3);
      ctx.fillStyle = "#162616";
      ctx.fillRect(0, GY, W, H - GY);
      ctx.fillStyle = "#1ab8b066";
      ctx.fillRect(0, GY, W, 2);

      const BH = H0 * scale, BX = 40;
      ctx.fillStyle = "#1a2a2a";
      ctx.fillRect(BX, GY - BH, 42, BH);
      ctx.strokeStyle = "#1e3a3a";
      ctx.lineWidth = 1;
      ctx.strokeRect(BX, GY - BH, 42, BH);
      for (let wy = GY - BH + 8; wy < GY - 8; wy += 16) {
        for (let wx = BX + 6; wx < BX + 36; wx += 16) {
          ctx.fillStyle = Math.random() > 0.5 ? "#1ab8b033" : "#0a1a1a";
          ctx.fillRect(wx, wy, 10, 8);
        }
      }

      const step = Math.ceil(H0 / 5 / 10) * 10 || 10;
      for (let h = 0; h <= H0; h += step) {
        const my = GY - h * scale;
        if (my < 20) break;
        ctx.strokeStyle = "#1a3030";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(90, my);
        ctx.lineTo(W - 10, my);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#3a5a5a";
        ctx.font = "9px 'Space Mono'";
        ctx.fillText(`${h}m`, 94, my - 3);
      }

      const dragFactor = drag === 0 ? 1 : drag === 1 ? 0.85 : drag === 2 ? 0.65 : 0.45;
      const dist2 = dist * dragFactor, vel2 = vel * dragFactor;

      ctx.globalAlpha = 0.4;
      trailRef.current.forEach((tr, i) => {
        const a = i / trailRef.current.length;
        ctx.fillStyle = `rgba(26,184,176,${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(W * 0.42, tr, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,140,66,${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(W * 0.58, tr + (dist2 - dist) * scale, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const b1y = Math.min(GY - 18, GY - (H0 - dist) * scale);
      glowBall(ctx, W * 0.42, b1y, 18, "#14908a", "#1ab8b0");
      ctx.fillStyle = "#ccc";
      ctx.font = "bold 10px 'DM Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Berat", W * 0.42, b1y - 24);

      const b2y = Math.min(GY - 18, GY - (H0 - dist2) * scale);
      glowBall(ctx, W * 0.58, b2y, 18, "#993300", "#ff8c42");
      ctx.textAlign = "center";
      ctx.fillText(drag === 0 ? "Ringan (sama!)" : "Ringan", W * 0.58, b2y - 24);
      ctx.textAlign = "left";

      if (dist >= H0 && t > 0) {
        ring(ctx, W * 0.42, GY, "#1ab8b0");
        ctx.fillStyle = "#1ab8b0";
        ctx.font = "bold 12px 'Syne'";
        ctx.textAlign = "center";
        ctx.fillText(`💥 ${vel.toFixed(1)} m/s`, W * 0.42, GY + 30);
        ctx.textAlign = "left";
      }
      if (dist2 >= H0 && t > 0) {
        ring(ctx, W * 0.58, GY, "#ff8c42");
        ctx.fillStyle = "#ff8c42";
        ctx.font = "bold 12px 'Syne'";
        ctx.textAlign = "center";
        ctx.fillText(`💥 ${vel2.toFixed(1)} m/s`, W * 0.58, GY + 30);
        ctx.textAlign = "left";
      }
    },
    [drag],
  );

  useEffect(() => {
    fit();
    drawScene(0, 0, 0, height);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit, drawScene, height]);

  const pause = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    setSimStatus("paused");
  };

  const start = () => {
    if (runRef.current) return;
    runRef.current = true;
    if (simStatus !== "paused") { tRef.current = 0; trailRef.current = []; }
    setSimStatus("running");
    const H0 = height, g = gravity;
    let last: number | null = null;

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      const dist = Math.min(0.5 * g * t * t, H0);
      const vel = g * t;
      const cv = cvRef.current!;
      const GY = cv.height - 50, scale = Math.min((GY - 40) / H0, 3);
      trailRef.current.push(GY - (H0 - dist) * scale);
      if (trailRef.current.length > 50) trailRef.current.shift();
      setStats({
        time: t.toFixed(1),
        vel: vel.toFixed(1),
        dist: dist.toFixed(1),
        rem: Math.max(H0 - dist, 0).toFixed(1),
      });
      drawScene(t, dist, vel, H0);
      if (dist < H0) {
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
    trailRef.current = [];
    setSimStatus("idle");
    setStats({ time: "0.0", vel: "0", dist: "0", rem: String(height) });
    drawScene(0, 0, 0, height);
  }, [drawScene, height]);

  return (
    <SimulationShell title="🍎 Gerak Jatuh Bebas — Semua Benda Jatuh Sama Cepat">
      <InfoBar>Jatuhkan dua benda berbeda berat secara bersamaan dari ketinggian yang sama. Amati — apakah benda berat jatuh lebih cepat? Ini membuktikan teori Galileo!</InfoBar>

      <canvas ref={cvRef} height={380} className="w-full rounded-xl block" style={{ border: "1px solid var(--color-border)" }} />

      <CtrlGrid>
        <CtrlGroup label="Ketinggian" val={`${height} m`}>
          <input type="range" min={20} max={250} value={height} onChange={(e) => { setHeight(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Gravitasi (g)" val={`${gravity} m/s²`}>
          <input type="range" min={1} max={25} value={gravity} onChange={(e) => { setGravity(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Hambatan Udara" val={DRAG_LABELS[drag]}>
          <input type="range" min={0} max={3} step={1} value={drag} onChange={(e) => { setDrag(+e.target.value); reset(); }} />
        </CtrlGroup>
      </CtrlGrid>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Jatuhkan!"} />

      <StatsRow items={[
        { label: "Waktu", val: stats.time, unit: "s" },
        { label: "Kecepatan", val: stats.vel, unit: "m/s" },
        { label: "Jarak Jatuh", val: stats.dist, unit: "m" },
        { label: "Sisa Tinggi", val: stats.rem, unit: "m" },
      ]} />
    </SimulationShell>
  );
}
