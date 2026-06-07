"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "~/components/SimulationShell";
import { InfoBar, CtrlGrid, CtrlGroup, SimBtns, StatsRow } from "./RaceSim";

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

export default function VerticalSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);
  const trailRef = useRef<number[]>([]);
  const maxHRef = useRef(0);

  const [v0, setV0] = useState(25);
  const [grav, setGrav] = useState(10);
  const [stats, setStats] = useState({ time: "0.00", h: "0", v: "0", hmax: "—", fase: "Siap" });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fit = useCallback(() => {
    const cv = cvRef.current;
    if (!cv?.parentElement) return;
    cv.width = cv.parentElement.offsetWidth - 2;
  }, []);

  const drawScene = useCallback(
    (t: number, h: number, vel: number, hmax: number, v0Val: number, gVal: number) => {
      const cv = cvRef.current;
      if (!cv) return;
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#080c18";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff22";
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137 + 29) % W), sy = ((i * 79 + 11) % (H * 0.9));
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      const HMAX = (v0Val * v0Val) / (2 * gVal);
      const GY = H - 50, scale = Math.min((GY - 60) / (HMAX * 1.15), 6);

      ctx.fillStyle = "#1a2f1a";
      ctx.fillRect(0, GY, W, H - GY);
      ctx.fillStyle = "#1ab8b066";
      ctx.fillRect(0, GY, W, 2);

      const step = Math.ceil(HMAX / 5 / 5) * 5 || 5;
      for (let mh = 0; mh <= HMAX * 1.15; mh += step) {
        const my = GY - mh * scale;
        if (my < 20) break;
        ctx.strokeStyle = "#1a2030";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(60, my);
        ctx.lineTo(W - 10, my);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#3a5070";
        ctx.font = "9px 'Space Mono'";
        ctx.fillText(`${mh}m`, 8, my + 4);
      }

      if (hmax > 0) {
        const hy = GY - hmax * scale;
        ctx.strokeStyle = "#ffd70066";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(60, hy);
        ctx.lineTo(W - 10, hy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffd700aa";
        ctx.font = "10px 'Space Mono'";
        ctx.textAlign = "right";
        ctx.fillText(`h_maks=${hmax.toFixed(1)}m`, W - 12, hy - 5);
        ctx.textAlign = "left";
      }

      ctx.strokeStyle = "rgba(26,184,176,0.1)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const ttotal = (2 * v0Val) / gVal;
      for (let pt = 0; pt <= ttotal; pt += ttotal / 100) {
        const ph = v0Val * pt - 0.5 * gVal * pt * pt;
        const py = GY - ph * scale;
        if (pt === 0) ctx.moveTo(W * 0.45, py);
        else ctx.lineTo(W * 0.45, py);
      }
      ctx.stroke();

      const BX = W * 0.45;
      ctx.globalAlpha = 0.5;
      trailRef.current.forEach((ty, i) => {
        const a = i / trailRef.current.length;
        ctx.fillStyle = `rgba(26,184,176,${a * 0.6})`;
        ctx.beginPath();
        ctx.arc(BX, ty, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const BY = Math.max(Math.min(GY - h * scale, GY - 18), 14);
      glowBall(ctx, BX, BY, 16, "#0d5555", "#1ab8b0");

      if (t > 0) {
        const dir = vel >= 0 ? -1 : 1;
        const len = Math.min(Math.abs(vel) * 3, 70);
        const ax = BX + 28, ay = BY, ex = ax, ey = ay + dir * len;
        ctx.strokeStyle = vel >= 0 ? "#22d4cc" : "#ff6b6b";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.fillStyle = vel >= 0 ? "#22d4cc" : "#ff6b6b";
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - 5, ey - dir * 10);
        ctx.lineTo(ex + 5, ey - dir * 10);
        ctx.fill();
        ctx.font = "9px 'Space Mono'";
        ctx.fillStyle = vel >= 0 ? "#22d4cc" : "#ff6b6b";
        ctx.fillText(`${Math.abs(vel).toFixed(1)} m/s`, ex + 8, ey - dir * 5);
      }

      if (h <= 0 && t > 0.2) {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.beginPath();
        (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(W / 2 - 130, 20, 260, 56, 10);
        ctx.fill();
        ctx.strokeStyle = "#1ab8b0";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(W / 2 - 130, 20, 260, 56, 10);
        ctx.stroke();
        ctx.fillStyle = "#1ab8b0";
        ctx.font = "bold 13px 'Syne'";
        ctx.textAlign = "center";
        ctx.fillText(`🏀 h_maks = ${hmax.toFixed(1)} m`, W / 2, 44);
        ctx.fillStyle = "#8aabab";
        ctx.font = "10px 'Space Mono'";
        ctx.fillText(`t_total = ${((2 * v0Val) / gVal).toFixed(2)} s`, W / 2, 62);
        ctx.textAlign = "left";
      }
    },
    [],
  );

  useEffect(() => {
    fit();
    drawScene(0, 0, 0, 0, v0, grav);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit, drawScene, v0, grav]);

  const pause = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    setSimStatus("paused");
  };

  const start = () => {
    if (runRef.current) return;
    runRef.current = true;
    if (simStatus !== "paused") { tRef.current = 0; trailRef.current = []; maxHRef.current = 0; }
    setSimStatus("running");
    const hmax = (v0 * v0) / (2 * grav);
    setStats((s) => ({ ...s, hmax: hmax.toFixed(1) }));
    let last: number | null = null;

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      const h = Math.max(v0 * t - 0.5 * grav * t * t, 0);
      const vel = v0 - grav * t;
      if (h > maxHRef.current) maxHRef.current = h;
      const cv = cvRef.current!;
      const GY = cv.height - 50, scale = Math.min((GY - 60) / (hmax * 1.15), 6);
      trailRef.current.push(Math.max(Math.min(GY - h * scale, GY - 18), 14));
      if (trailRef.current.length > 80) trailRef.current.shift();
      const fase = vel > 0.5 ? "⬆️ Naik" : vel < -0.5 ? "⬇️ Turun" : "⏸️ Puncak";
      setStats({ time: t.toFixed(2), h: h.toFixed(1), v: vel.toFixed(1), hmax: hmax.toFixed(1), fase });
      drawScene(t, h, vel, maxHRef.current, v0, grav);
      if (h > 0 || t < v0 / grav + 0.1) {
        afRef.current = requestAnimationFrame(frame);
      } else {
        drawScene(t, 0, vel, maxHRef.current, v0, grav);
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
    maxHRef.current = 0;
    setSimStatus("idle");
    setStats({ time: "0.00", h: "0", v: "0", hmax: "—", fase: "Siap" });
    drawScene(0, 0, 0, 0, v0, grav);
  }, [drawScene, v0, grav]);

  return (
    <SimulationShell title="🏀 Gerak Vertikal — Lempar Ke Atas dengan Kecepatan Awal">
      <InfoBar>Bola dilempar vertikal ke atas. Perhatikan tanda panah vektor kecepatan — naik saat ke atas, nol di puncak, lalu berbalik ke bawah. Garis putus-putus adalah jalur prediksi!</InfoBar>

      <canvas ref={cvRef} height={420} className="w-full rounded-xl block" style={{ border: "1px solid var(--color-border)" }} />

      <CtrlGrid>
        <CtrlGroup label="Kecepatan Awal v₀" val={`${v0} m/s`}>
          <input type="range" min={5} max={60} value={v0} onChange={(e) => { setV0(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Gravitasi (g)" val={`${grav} m/s²`}>
          <input type="range" min={1} max={25} value={grav} onChange={(e) => { setGrav(+e.target.value); reset(); }} />
        </CtrlGroup>
      </CtrlGrid>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Lempar Bola!"} />

      <StatsRow items={[
        { label: "Waktu", val: stats.time, unit: "s" },
        { label: "Ketinggian", val: stats.h, unit: "m" },
        { label: "Kecepatan", val: stats.v, unit: "m/s" },
        { label: "H Maks", val: stats.hmax, unit: "m" },
        { label: "Fase", val: stats.fase, unit: "" },
      ]} />
    </SimulationShell>
  );
}
