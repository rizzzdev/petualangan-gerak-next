"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "~/components/SimulationShell";
import { InfoBar, CtrlGrid, CtrlGroup, SimBtns, StatsRow } from "./RaceSim";

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, label: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy);
  if (l > 5) {
    const ux = dx / l, uy = dy / l;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * 10 - uy * 5, y2 - uy * 10 + ux * 5);
    ctx.lineTo(x2 - ux * 10 + uy * 5, y2 - uy * 10 - ux * 5);
    ctx.fill();
  }
  if (label) {
    ctx.fillStyle = color;
    ctx.font = "9px 'Space Mono'";
    ctx.fillText(label, x2 + 6, (y1 + y2) / 2);
  }
}

export default function LiftSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);

  const [mass, setMass] = useState(60);
  const [accel, setAccel] = useState(2);
  const [floors, setFloors] = useState(5);
  const [stats, setStats] = useState({ time: "0.0", vel: "0", wNormal: "—", wSemu: "—", diff: "—" });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fit = useCallback(() => {
    const cv = cvRef.current;
    if (!cv?.parentElement) return;
    cv.width = cv.parentElement.offsetWidth - 2;
  }, []);

  const drawScene = useCallback(
    (pos: number, phase: string, massVal: number, accelVal: number, floorsVal: number) => {
      const cv = cvRef.current;
      if (!cv) return;
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0f0a";
      ctx.fillRect(0, 0, W, H);

      const g = 10;
      const SX = W * 0.3, SW = W * 0.4, SH = H - 40, SY = 20;
      ctx.fillStyle = "#111b1b";
      ctx.fillRect(SX, SY, SW, SH);
      ctx.strokeStyle = "#1a3333";
      ctx.lineWidth = 1;
      ctx.strokeRect(SX, SY, SW, SH);

      const FH = SH / floorsVal;
      for (let f = 0; f <= floorsVal; f++) {
        const fy = SY + SH - f * FH;
        ctx.strokeStyle = "#1e3535";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(SX, fy);
        ctx.lineTo(SX + SW, fy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#3a5a5a";
        ctx.font = "9px 'Space Mono'";
        ctx.fillText(`Lt ${f}`, SX - 32, fy + 4);
      }

      const maxY = SH - 30, LH = 50, LW = SW - 16;
      const carpPos = SY + SH - 30 - pos * maxY - LH / 2;
      const LX = SX + 8, LY = Math.max(SY + 5, Math.min(carpPos, SY + SH - LH - 5));

      ctx.strokeStyle = "#3a5a5a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(SX + SW * 0.33, SY);
      ctx.lineTo(SX + SW * 0.33, LY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(SX + SW * 0.67, SY);
      ctx.lineTo(SX + SW * 0.67, LY);
      ctx.stroke();

      ctx.fillStyle = "#1a3040";
      ctx.fillRect(LX, LY, LW, LH);
      ctx.strokeStyle = "#1ab8b0";
      ctx.lineWidth = 2;
      ctx.strokeRect(LX, LY, LW, LH);
      ctx.strokeStyle = "#22d4cc44";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(LX + LW / 2, LY + 5);
      ctx.lineTo(LX + LW / 2, LY + LH - 5);
      ctx.stroke();

      const px = LX + LW / 2, py = LY + LH / 2;
      ctx.fillStyle = "#e8c8a0";
      ctx.beginPath();
      ctx.arc(px, py - 14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a6080";
      ctx.fillRect(px - 8, py - 8, 16, 22);
      ctx.fillStyle = "#2a4060";
      ctx.fillRect(px - 7, py + 14, 6, 10);
      ctx.fillRect(px + 1, py + 14, 6, 10);

      const W_real = massVal * g, W_semu = massVal * (g + accelVal);
      const arrowX = LX + LW + 15;
      const wlen = 40;
      drawArrow(ctx, arrowX, py, arrowX, py + wlen, "#ff6b6b", `W=${W_real.toFixed(0)}N`);
      const nlen = Math.max(5, Math.abs(W_semu) * wlen / W_real);
      const ncol = W_semu > W_real ? "#22d4cc" : W_semu < W_real ? "#ffd700" : "#7ee8fa";
      drawArrow(ctx, arrowX, py, arrowX, py - nlen * Math.sign(W_semu || 1), ncol, `N=${W_semu.toFixed(0)}N`);

      const IX = SX + SW + 60, IW = Math.min(180, W - IX - 10);
      ctx.fillStyle = "#0f1f20";
      ctx.strokeStyle = "#1a3535";
      ctx.lineWidth = 1;
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(IX, SY, IW, 200, 8);
      ctx.fill();
      ctx.stroke();
      ctx.font = "10px 'Space Mono'";
      ctx.fillStyle = "#3a6060";
      ctx.fillText("FASE:", IX + 10, SY + 22);
      const phaseText = phase === "accel" ? "Akselerasi ↑" : phase === "decel" ? "Deselerasi" : "Diam";
      ctx.fillStyle = "#1ab8b0";
      ctx.font = "bold 11px 'Space Mono'";
      ctx.fillText(phaseText, IX + 10, SY + 40);
      ctx.fillStyle = "#3a6060";
      ctx.font = "10px 'Space Mono'";
      ctx.fillText("Percepatan:", IX + 10, SY + 62);
      ctx.fillStyle = accelVal > 0 ? "#22d4cc" : accelVal < 0 ? "#ff8c42" : "#7ee8fa";
      ctx.font = "bold 12px 'Space Mono'";
      ctx.fillText(`${accelVal} m/s²`, IX + 10, SY + 80);
      ctx.fillStyle = "#3a6060";
      ctx.font = "10px 'Space Mono'";
      ctx.fillText("Berat normal:", IX + 10, SY + 104);
      ctx.fillStyle = "#c8d8d8";
      ctx.fillText(`${W_real.toFixed(0)} N`, IX + 10, SY + 122);
      ctx.fillStyle = "#3a6060";
      ctx.fillText("Berat semu:", IX + 10, SY + 146);
      const semuColor = W_semu > W_real ? "#22d4cc" : W_semu < W_real ? "#ff6b6b" : "#7ee8fa";
      ctx.fillStyle = semuColor;
      ctx.font = "bold 12px 'Space Mono'";
      ctx.fillText(`${W_semu.toFixed(0)} N`, IX + 10, SY + 164);
      const diff = (((W_semu - W_real) / W_real) * 100).toFixed(0);
      ctx.fillStyle = "#5a7878";
      ctx.font = "9px 'Space Mono'";
      ctx.fillText(`${Number(diff) > 0 ? "+" : ""}${diff}% dari normal`, IX + 10, SY + 186);

      ctx.fillStyle = "#c8d8d8";
      ctx.font = "9px 'Space Mono'";
      ctx.textAlign = "center";
      ctx.fillText(`Lantai ${(pos * floorsVal).toFixed(1)}`, LX + LW / 2, LY - 6);
      ctx.textAlign = "left";
    },
    [],
  );

  useEffect(() => {
    fit();
    drawScene(0, "idle", mass, accel, floors);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit, drawScene, mass, accel, floors]);

  const pause = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    setSimStatus("paused");
  };

  const start = () => {
    if (runRef.current) return;
    runRef.current = true;
    if (simStatus !== "paused") tRef.current = 0;
    setSimStatus("running");
    const g = 10, W_normal = mass * g, W_semu = mass * (g + accel);
    let last: number | null = null;
    const pct = (((W_semu - W_normal) / W_normal) * 100).toFixed(0);
    setStats({
      time: "0.0", vel: "0",
      wNormal: W_normal.toFixed(0),
      wSemu: W_semu.toFixed(0),
      diff: `${Number(pct) > 0 ? "+" : ""}${pct}% ${W_semu > W_normal ? "😬 Lebih berat" : "😌 Lebih ringan"}`,
    });

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      const liftV = accel * t;
      const liftY = 0.5 * accel * t * t;
      const pos = Math.max(0, Math.min(1, liftY / 80));
      setStats((s) => ({ ...s, time: t.toFixed(1), vel: liftV.toFixed(1) }));
      drawScene(pos, accel > 0 ? "accel" : accel < 0 ? "decel" : "idle", mass, accel, floors);
      if (pos < 1) {
        afRef.current = requestAnimationFrame(frame);
      } else {
        runRef.current = false;
        drawScene(1, "idle", mass, accel, floors);
      }
    };
    afRef.current = requestAnimationFrame(frame);
  };

  const reset = useCallback(() => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    tRef.current = 0;
    setSimStatus("idle");
    setStats({ time: "0.0", vel: "0", wNormal: "—", wSemu: "—", diff: "—" });
    drawScene(0, "idle", mass, accel, floors);
  }, [drawScene, mass, accel, floors]);

  return (
    <SimulationShell title="🛗 Lift & Percepatan — Mengapa Kamu Terasa Lebih Berat di Lift?">
      <InfoBar>Saat lift berakselerasi ke atas, kamu merasa lebih berat. Saat lift melambat, kamu merasa lebih ringan. Ini menunjukkan gaya normal yang bekerja pada penumpang — GLBB dalam kehidupan nyata!</InfoBar>

      <canvas ref={cvRef} height={420} className="w-full rounded-xl block" style={{ border: "1px solid var(--color-border)" }} />

      <CtrlGrid>
        <CtrlGroup label="Massa Penumpang" val={`${mass} kg`}>
          <input type="range" min={30} max={120} value={mass} onChange={(e) => { setMass(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Percepatan Lift" val={`${accel} m/s²`}>
          <input type="range" min={-5} max={5} step={0.5} value={accel} onChange={(e) => { setAccel(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Lantai Tujuan" val={String(floors)}>
          <input type="range" min={2} max={20} value={floors} onChange={(e) => { setFloors(+e.target.value); reset(); }} />
        </CtrlGroup>
      </CtrlGrid>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Naik Lift!"} />

      <StatsRow items={[
        { label: "Waktu", val: stats.time, unit: "s" },
        { label: "Kecepatan Lift", val: stats.vel, unit: "m/s" },
        { label: "Berat Normal", val: stats.wNormal, unit: "N" },
        { label: "Berat Semu", val: stats.wSemu, unit: "N" },
        { label: "Perubahan", val: stats.diff, unit: "" },
      ]} />
    </SimulationShell>
  );
}
