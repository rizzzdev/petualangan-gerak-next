"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "../../shared/components/SimulationShell";
import { InfoBar, CtrlGrid, CtrlGroup, SimBtns, StatsRow } from "./RaceSim";

// ─── Types ───────────────────────────────────────────────────────────────────

type HistPoint = { t: number; s: number; x: number; y: number; v: number; a: number };

// ─── Physics ─────────────────────────────────────────────────────────────────

const H0_M = 100;

function getPhys(v0: number, angDeg: number, ab: number) {
  const ar = (angDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(ar);
  const vy = v0 * Math.sin(ar);
  const t_td = H0_M / vy;
  const x_td = vx * t_td;
  const v_td = vx;
  const s_td = v0 * t_td;
  const t_brake = v_td / ab;
  const s_brake = (v_td * v_td) / (2 * ab);
  return {
    vx, vy, ab,
    t_td, x_td, v_td, s_td,
    t_brake, s_brake,
    total_x: x_td + s_brake,
    total_s: s_td + s_brake,
    total_t: t_td + t_brake,
  };
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────

function drawPlane(ctx: CanvasRenderingContext2D, cx: number, cy: number, angDeg: number, sz: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-angDeg * Math.PI) / 180);
  ctx.fillStyle = "#c8dde8";
  ctx.beginPath();
  ctx.ellipse(0, 0, sz * 2.2, sz * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(sz * 2.2, sz * 0.48);
  ctx.lineTo(sz * 3.2, 0);
  ctx.lineTo(sz * 2.2, -sz * 0.48);
  ctx.fill();
  ctx.fillStyle = "#a0bcc8";
  ctx.beginPath();
  ctx.moveTo(sz * 0.4, -sz * 0.1);
  ctx.lineTo(sz * 0.9, -sz * 2.0);
  ctx.lineTo(sz * 1.6, -sz * 2.0);
  ctx.lineTo(sz * 1.4, -sz * 0.1);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-sz * 1.8, -sz * 0.1);
  ctx.lineTo(-sz * 2.0, -sz * 1.1);
  ctx.lineTo(-sz * 1.0, -sz * 1.1);
  ctx.lineTo(-sz * 0.9, -sz * 0.1);
  ctx.fill();
  ctx.fillStyle = "#88ccee";
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(sz * 0.3 + i * sz * 0.55, -sz * 0.15, sz * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const puffs: [number, number, number][] = [
    [0, 0, r], [r * 0.85, r * 0.25, r * 0.72], [-r * 0.7, r * 0.25, r * 0.65], [r * 0.1, r * 0.5, r * 0.58],
  ];
  ctx.fillStyle = "rgba(160,190,210,0.18)";
  for (const [dx, dy, dr] of puffs) {
    ctx.beginPath();
    ctx.arc(x + dx, y + dy, dr, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGraph(
  cv: HTMLCanvasElement,
  hist: HistPoint[],
  key: "s" | "v" | "a",
  title: string,
  unit: string,
  color: string,
  maxT: number,
  minVal: number,
  maxVal: number,
  tdT: number,
) {
  const W = cv.width, H = cv.height;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#060c18";
  ctx.fillRect(0, 0, W, H);

  const P = { t: 20, r: 12, b: 28, l: 42 };
  const gW = W - P.l - P.r, gH = H - P.t - P.b;
  if (gW <= 0 || gH <= 0) return;

  const toX = (t: number) => P.l + (t / maxT) * gW;
  const range = maxVal - minVal || 1;
  const toY = (v: number) => P.t + gH - ((v - minVal) / range) * gH;

  // Touchdown vertical line
  if (tdT > 0 && tdT < maxT) {
    ctx.strokeStyle = "#ffa50044";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(toX(tdT), P.t);
    ctx.lineTo(toX(tdT), P.t + gH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#ffa500bb";
    ctx.font = "7px 'Space Mono'";
    ctx.textAlign = "left";
    ctx.fillText("TD", toX(tdT) + 2, P.t + 9);
  }

  // Horizontal grid lines + y-axis labels
  ctx.font = "7px 'Space Mono'";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const gy = P.t + (i / 4) * gH;
    ctx.strokeStyle = "#0c1525";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(P.l, gy);
    ctx.lineTo(P.l + gW, gy);
    ctx.stroke();
    const val = maxVal - (i / 4) * (maxVal - minVal);
    ctx.fillStyle = "#334455";
    ctx.fillText(val.toFixed(0), P.l - 3, gy + 3);
  }
  ctx.textAlign = "left";

  // Zero line if range straddles 0
  if (minVal < 0 && maxVal > 0) {
    const zy = toY(0);
    ctx.strokeStyle = "#1a2535";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(P.l, zy);
    ctx.lineTo(P.l + gW, zy);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Axes
  ctx.strokeStyle = "#182535";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(P.l, P.t);
  ctx.lineTo(P.l, P.t + gH);
  ctx.lineTo(P.l + gW, P.t + gH);
  ctx.stroke();

  // Data line + current dot
  if (hist.length > 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < hist.length; i++) {
      const pt = hist[i];
      const px = toX(pt.t), py = toY(pt[key]);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    const last = hist[hist.length - 1];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(toX(last.t), toY(last[key]), 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title
  ctx.fillStyle = color + "cc";
  ctx.font = "bold 10px 'Syne'";
  ctx.textAlign = "center";
  ctx.fillText(title, P.l + gW / 2, P.t - 5);
  ctx.textAlign = "left";

  // Axis labels
  ctx.fillStyle = "#334455";
  ctx.font = "7px 'Space Mono'";
  ctx.fillText("t (s)", P.l + gW - 22, P.t + gH + 20);
  ctx.save();
  ctx.translate(11, P.t + gH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillStyle = color + "88";
  ctx.font = "7px 'Space Mono'";
  ctx.fillText(unit, 0, 0);
  ctx.restore();
}

const CLOUDS = [
  { x: 0.1, y: 0.18, r: 28 }, { x: 0.35, y: 0.12, r: 20 },
  { x: 0.62, y: 0.22, r: 24 }, { x: 0.83, y: 0.1, r: 17 },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function PlaneSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const gPosRef = useRef<HTMLCanvasElement>(null);
  const gVelRef = useRef<HTMLCanvasElement>(null);
  const gAccRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);
  const histRef = useRef<HistPoint[]>([]);
  const phaseRef = useRef("ready");

  const [v0, setV0] = useState(80);
  const [angleDeg, setAngleDeg] = useState(5);
  const [aBrake, setABrake] = useState(4);
  const [stats, setStats] = useState({ time: "0.0", s: "0", v: "0", a: "0", fase: "Siap" });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fitAll = useCallback(() => {
    for (const ref of [cvRef, gPosRef, gVelRef, gAccRef]) {
      if (ref.current?.parentElement) {
        ref.current.width = ref.current.parentElement.offsetWidth - 2;
      }
    }
  }, []);

  const drawMain = useCallback(
    (hist: HistPoint[], phase: string) => {
      const cv = cvRef.current;
      if (!cv) return;
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext("2d")!;
      const phys = getPhys(v0, angleDeg, aBrake);

      ctx.clearRect(0, 0, W, H);

      // Sky
      const sg = ctx.createLinearGradient(0, 0, 0, H * 0.8);
      sg.addColorStop(0, "#04080f");
      sg.addColorStop(1, "#091822");
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, H);

      const GY = H - 52;

      // Stars
      ctx.fillStyle = "#ffffff22";
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(((i * 137 + 29) % W), ((i * 97 + 17) % (GY * 0.65)), 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Clouds
      for (const c of CLOUDS) drawCloud(ctx, c.x * W, c.y * GY, c.r);

      // Ground
      const gg = ctx.createLinearGradient(0, GY, 0, H);
      gg.addColorStop(0, "#182218");
      gg.addColorStop(1, "#0a1008");
      ctx.fillStyle = gg;
      ctx.fillRect(0, GY, W, H - GY);

      // Ground texture strips
      ctx.fillStyle = "#1c2c1c";
      for (let gx = 0; gx < W; gx += 44) ctx.fillRect(gx, GY, 22, 3);

      // Ground line
      ctx.strokeStyle = "#1ab8b033";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GY);
      ctx.lineTo(W, GY);
      ctx.stroke();

      // Runway
      const RWS = W * 0.38, RWE = W - 18, RWH = 18;
      ctx.fillStyle = "#24242e";
      ctx.fillRect(RWS, GY - RWH / 2, RWE - RWS, RWH);
      ctx.strokeStyle = "#ffffa055";
      ctx.lineWidth = 2;
      ctx.setLineDash([22, 14]);
      ctx.beginPath();
      ctx.moveTo(RWS + 20, GY);
      ctx.lineTo(RWE - 20, GY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#ffffffaa";
      for (let i = 0; i < 5; i++) ctx.fillRect(RWS + 8, GY - RWH / 2 + i * 3.5, 20, 2);

      // Canvas geometry
      const TD_CX = RWS + 42;
      const P0X = W * 0.02, P0Y = GY * 0.08;

      // Glide slope indicator
      ctx.strokeStyle = "rgba(26,184,176,0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.moveTo(P0X, P0Y);
      ctx.lineTo(TD_CX, GY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Touchdown marker "TD"
      ctx.fillStyle = "#ffa500aa";
      ctx.font = "7px 'Space Mono'";
      ctx.textAlign = "center";
      ctx.fillText("TD", TD_CX, GY + 22);
      ctx.textAlign = "left";

      const cxRange = RWE - 28 - P0X;

      function toCanvasXY(x_real: number, y_real: number): [number, number] {
        const cx = P0X + (x_real / phys.total_x) * cxRange;
        const cy = y_real <= 0 ? GY : GY - (y_real / H0_M) * (GY - P0Y - 12);
        return [cx, cy];
      }

      // Trail
      if (hist.length > 2) {
        const trailStart = Math.max(0, hist.length - 70);
        ctx.strokeStyle = "rgba(26,184,176,0.22)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = trailStart; i < hist.length; i++) {
          const [hcx, hcy] = toCanvasXY(hist[i].x, hist[i].y);
          if (i === trailStart) ctx.moveTo(hcx, hcy);
          else ctx.lineTo(hcx, hcy);
        }
        ctx.stroke();
      }

      // Braking smoke/dust
      const lastPt = hist.length > 0 ? hist[hist.length - 1] : null;
      if (phase === "braking" && lastPt && lastPt.v > 3) {
        const [lcx] = toCanvasXY(lastPt.x, 0);
        const alpha = Math.min(lastPt.v / phys.v_td, 1);
        for (let i = 0; i < 7; i++) {
          ctx.fillStyle = `rgba(180,160,100,${alpha * 0.1 * (7 - i) / 7})`;
          ctx.beginPath();
          ctx.arc(lcx - i * 12, GY - 7, 8 + i * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Plane
      const x_real = lastPt ? lastPt.x : 0;
      const y_real = lastPt ? lastPt.y : H0_M;
      const [pcx, pcy] = toCanvasXY(x_real, y_real);
      const planeAng = phase === "approach" ? angleDeg : 0;
      const sz = Math.max(W / 55, 9);
      drawPlane(ctx, pcx, pcy, planeAng, sz);

      // Speed label above plane
      if (lastPt && phase !== "ready") {
        ctx.fillStyle = "#7aabaa";
        ctx.font = "9px 'Space Mono'";
        ctx.textAlign = "center";
        ctx.fillText(`${lastPt.v.toFixed(0)} m/s`, pcx, pcy - sz * 2.8);
        ctx.textAlign = "left";
      }

      // Altitude label (during approach)
      if (phase === "approach" && lastPt && lastPt.y > 5) {
        ctx.fillStyle = "#556677";
        ctx.font = "8px 'Space Mono'";
        ctx.textAlign = "center";
        ctx.fillText(`${lastPt.y.toFixed(0)} m`, pcx, pcy + sz * 1.8);
        ctx.textAlign = "left";
      }

      // Phase label (top-right)
      const LABELS: Record<string, string> = {
        ready: "Siap untuk pendaratan",
        approach: "Fase 1: Pendekatan (GLB)",
        braking: "Fase 2: Pengereman (GLBB)",
        stopped: "Pesawat telah berhenti",
      };
      ctx.fillStyle = "#1ab8b0cc";
      ctx.font = "bold 12px 'Syne'";
      ctx.textAlign = "right";
      ctx.fillText(LABELS[phase] ?? phase, W - 14, 26);
      ctx.textAlign = "left";
    },
    [v0, angleDeg, aBrake],
  );

  const drawAll = useCallback(
    (hist: HistPoint[], phase: string) => {
      drawMain(hist, phase);
      const phys = getPhys(v0, angleDeg, aBrake);
      const maxT = phys.total_t * 1.06;
      if (gPosRef.current)
        drawGraph(gPosRef.current, hist, "s", "Posisi (Jarak)", "m", "#1ab8b0", maxT, 0, phys.total_s * 1.05, phys.t_td);
      if (gVelRef.current)
        drawGraph(gVelRef.current, hist, "v", "Kecepatan", "m/s", "#4fc3f7", maxT, 0, v0 * 1.05, phys.t_td);
      if (gAccRef.current)
        drawGraph(gAccRef.current, hist, "a", "Percepatan", "m/s²", "#ef5350", maxT, -aBrake * 1.3, aBrake * 0.3, phys.t_td);
    },
    [drawMain, v0, angleDeg, aBrake],
  );

  useEffect(() => {
    fitAll();
    histRef.current = [];
    drawAll([], "ready");
    const onResize = () => {
      fitAll();
      drawAll(histRef.current, phaseRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fitAll, drawAll]);

  const pause = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    setSimStatus("paused");
  };

  const start = () => {
    if (runRef.current) return;
    runRef.current = true;
    if (simStatus !== "paused") { tRef.current = 0; histRef.current = [{ t: 0, s: 0, x: 0, y: H0_M, v: v0, a: 0 }]; }
    setSimStatus("running");
    const phys = getPhys(v0, angleDeg, aBrake);
    let last: number | null = null;

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      let s: number, x: number, y: number, v: number, a: number, phase: string;

      if (t <= phys.t_td) {
        phase = "approach";
        x = phys.vx * t;
        y = Math.max(0, H0_M - phys.vy * t);
        s = v0 * t;
        v = v0;
        a = 0;
      } else {
        const tb = t - phys.t_td;
        v = Math.max(0, phys.v_td - phys.ab * tb);
        x = phys.x_td + phys.v_td * tb - 0.5 * phys.ab * tb * tb;
        y = 0;
        s = phys.s_td + phys.v_td * tb - 0.5 * phys.ab * tb * tb;
        a = v > 0 ? -phys.ab : 0;
        phase = v > 0 ? "braking" : "stopped";
      }

      phaseRef.current = phase;
      histRef.current.push({ t, s, x, y, v, a });

      setStats({
        time: t.toFixed(1),
        s: s.toFixed(0),
        v: v.toFixed(1),
        a: a.toFixed(1),
        fase: phase === "approach" ? "Pendekatan" : phase === "braking" ? "Pengereman" : "Berhenti",
      });

      drawAll(histRef.current, phase);

      if (phase !== "stopped") {
        afRef.current = requestAnimationFrame(frame);
      } else {
        runRef.current = false;
        drawAll(histRef.current, "stopped");
      }
    };
    afRef.current = requestAnimationFrame(frame);
  };

  const reset = useCallback(() => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    tRef.current = 0;
    histRef.current = [];
    phaseRef.current = "ready";
    setSimStatus("idle");
    setStats({ time: "0.0", s: "0", v: "0", a: "0", fase: "Siap" });
    drawAll([], "ready");
  }, [drawAll]);

  return (
    <SimulationShell title="✈️ Simulasi Pendaratan Pesawat — Pendekatan & Pengereman">
      <InfoBar>
        Pesawat melakukan pendekatan dengan kecepatan konstan sepanjang jalur glide <strong>(Fase 1 — GLB)</strong>, lalu menyentuh landasan dan mengerem dengan perlambatan konstan hingga berhenti <strong>(Fase 2 — GLBB)</strong>. Amati ketiga grafik untuk memahami hubungan posisi, kecepatan, dan percepatan!
      </InfoBar>

      <canvas
        ref={cvRef}
        height={340}
        className="w-full rounded-xl block"
        style={{ border: "1px solid var(--color-border)" }}
      />

      <CtrlGrid>
        <CtrlGroup label="Kecepatan Pendekatan (v₀)" val={`${v0} m/s`}>
          <input
            type="range" min={50} max={120} value={v0}
            onChange={(e) => { setV0(+e.target.value); reset(); }}
          />
        </CtrlGroup>
        <CtrlGroup label="Sudut Glide (θ)" val={`${angleDeg}°`}>
          <input
            type="range" min={2} max={8} value={angleDeg}
            onChange={(e) => { setAngleDeg(+e.target.value); reset(); }}
          />
        </CtrlGroup>
        <CtrlGroup label="Perlambatan Rem (a)" val={`${aBrake} m/s²`}>
          <input
            type="range" min={2} max={8} value={aBrake}
            onChange={(e) => { setABrake(+e.target.value); reset(); }}
          />
        </CtrlGroup>
      </CtrlGrid>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Mulai Pendaratan"} />

      <StatsRow items={[
        { label: "Waktu", val: stats.time, unit: "s" },
        { label: "Jarak", val: stats.s, unit: "m" },
        { label: "Kecepatan", val: stats.v, unit: "m/s" },
        { label: "Percepatan", val: stats.a, unit: "m/s²" },
        { label: "Fase", val: stats.fase, unit: "" },
      ]} />

      <div className="mt-5">
        <div
          className="font-mono text-[0.68rem] uppercase tracking-[0.12em] mb-3"
          style={{ color: "var(--color-teal-400)" }}
        >
          // Grafik Real-Time — Posisi · Kecepatan · Percepatan
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <canvas
              ref={gPosRef} height={148}
              className="w-full rounded-lg block"
              style={{ border: "1px solid var(--color-border)" }}
            />
          </div>
          <div>
            <canvas
              ref={gVelRef} height={148}
              className="w-full rounded-lg block"
              style={{ border: "1px solid var(--color-border)" }}
            />
          </div>
          <div>
            <canvas
              ref={gAccRef} height={148}
              className="w-full rounded-lg block"
              style={{ border: "1px solid var(--color-border)" }}
            />
          </div>
        </div>
      </div>
    </SimulationShell>
  );
}
