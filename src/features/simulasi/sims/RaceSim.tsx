"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimulationShell from "~/components/SimulationShell";

interface Stats {
  time: string;
  distGLB: string;
  distGLBB: string;
  velGLBB: string;
  status: string;
}

function drawCar(ctx: CanvasRenderingContext2D, x: number, y: number, body: string, dark: string) {
  ctx.fillStyle = body;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(x - 28, y - 10, 56, 20, 4);
  ctx.fill();
  ctx.fillStyle = dark;
  ctx.beginPath();
  (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(x - 10, y - 20, 24, 12, 3);
  ctx.fill();
  for (const [wx, wy] of [[x - 16, y + 10], [x + 14, y + 10]]) {
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(wx as number, wy as number, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(wx as number, wy as number, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#ffd700aa";
  ctx.beginPath();
  ctx.arc(x + 28, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

export default function RaceSim() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const grRef = useRef<HTMLCanvasElement>(null);
  const afRef = useRef<number>(0);
  const runRef = useRef(false);
  const tRef = useRef(0);

  const [vGLB, setVGLB] = useState(22);
  const [v0GLBB, setV0GLBB] = useState(0);
  const [aGLBB, setAGLBB] = useState(5);
  const [stats, setStats] = useState<Stats>({ time: "0.0", distGLB: "0", distGLBB: "0", velGLBB: "0", status: "Menunggu" });
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "paused">("idle");

  const fitCanvas = useCallback(() => {
    [cvRef, grRef].forEach((r) => {
      if (!r.current?.parentElement) return;
      const w = r.current.parentElement.offsetWidth - 2;
      r.current.width = w;
    });
  }, []);

  const drawScene = useCallback((dGLB: number, dGLBB: number, t: number) => {
    const cv = cvRef.current;
    const gr = grRef.current;
    if (!cv || !gr) return;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext("2d")!;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0c1a1a";
    ctx.fillRect(0, 0, W, H);

    const l1Y = H * 0.32, l2Y = H * 0.72;
    for (const [y, c] of [[l1Y, "#1ab8b0"], [l2Y, "#ff8c42"]] as [number, string][]) {
      ctx.fillStyle = "#0e2020";
      ctx.fillRect(0, y - 28, W, 56);
      ctx.strokeStyle = c + "22";
      ctx.lineWidth = 1;
      ctx.setLineDash([20, 15]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.font = "11px 'Space Mono'";
    ctx.fillStyle = "#1ab8b0";
    ctx.fillText("GLB", 8, l1Y - 16);
    ctx.fillStyle = "#ff8c42";
    ctx.fillText("GLBB", 8, l2Y - 16);

    const fx = W - 36;
    for (let y = 0; y < H; y += 14) {
      ctx.fillStyle = Math.floor(y / 14) % 2 === 0 ? "#ffffff22" : "#00000022";
      ctx.fillRect(fx, y, 14, 14);
    }
    ctx.fillStyle = "#ffffff33";
    ctx.font = "9px 'Space Mono'";
    ctx.fillText("FINISH", fx - 4, 12);

    const TRACK = W - 80, scale = TRACK / 800;
    const x1 = Math.min(40 + dGLB * scale, fx - 16);
    const x2 = Math.min(40 + dGLBB * scale, fx - 16);

    for (const [x, y, c] of [[x1, l1Y, "#1ab8b0"], [x2, l2Y, "#ff8c42"]] as [number, number, string][]) {
      const g = ctx.createLinearGradient(40, 0, x, 0);
      g.addColorStop(0, "transparent");
      g.addColorStop(1, c + "55");
      ctx.fillStyle = g;
      ctx.fillRect(40, y - 4, x - 40, 8);
    }

    drawCar(ctx, x1, l1Y, "#1ab8b0", "#0a4040");
    drawCar(ctx, x2, l2Y, "#ff8c42", "#5c2000");

    if (dGLB >= 800 || dGLBB >= 800) {
      const win =
        dGLB >= 800 && dGLBB >= 800 ? "🏁 SERI!" : dGLB >= 800 ? "🔵 GLB MENANG!" : "🟠 GLBB MENANG!";
      ctx.fillStyle = "rgba(0,0,0,.7)";
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(W / 2 - 100, H / 2 - 20, 200, 44, 8);
      ctx.fill();
      ctx.strokeStyle = "#1ab8b0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect(W / 2 - 100, H / 2 - 20, 200, 44, 8);
      ctx.stroke();
      ctx.fillStyle = "#e8f2f2";
      ctx.font = "bold 13px 'Syne'";
      ctx.textAlign = "center";
      ctx.fillText(win, W / 2, H / 2 + 7);
      ctx.textAlign = "left";
    }

    // Graph
    const GW = gr.width, GH = gr.height;
    const gCtx = gr.getContext("2d")!;
    gCtx.clearRect(0, 0, GW, GH);
    gCtx.fillStyle = "#090e0e";
    gCtx.fillRect(0, 0, GW, GH);

    const vGlbMs = vGLB / 3.6, v0Ms = v0GLBB / 3.6, aMs = aGLBB;
    const maxT = 40, maxV = Math.max(vGlbMs, v0Ms + aMs * maxT) * 1.2;
    const px = (t: number) => 10 + (t / maxT) * (GW - 20);
    const py = (v: number) => GH - 10 - (v / maxV) * (GH - 20);

    gCtx.strokeStyle = "#1a2828";
    gCtx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const gx = px(i * 10);
      gCtx.beginPath();
      gCtx.moveTo(gx, 0);
      gCtx.lineTo(gx, GH);
      gCtx.stroke();
      const gy = py((i * maxV) / 4);
      gCtx.beginPath();
      gCtx.moveTo(0, gy);
      gCtx.lineTo(GW, gy);
      gCtx.stroke();
    }
    gCtx.strokeStyle = "#1ab8b0";
    gCtx.lineWidth = 2;
    gCtx.beginPath();
    gCtx.moveTo(px(0), py(vGlbMs));
    gCtx.lineTo(px(Math.min(t, maxT)), py(vGlbMs));
    gCtx.stroke();
    gCtx.strokeStyle = "#ff8c42";
    gCtx.lineWidth = 2;
    gCtx.beginPath();
    gCtx.moveTo(px(0), py(v0Ms));
    for (let pt = 0; pt <= Math.min(t, maxT); pt += 0.5) {
      gCtx.lineTo(px(pt), py(Math.min(v0Ms + aMs * pt, maxV)));
    }
    gCtx.stroke();
    gCtx.font = "9px 'Space Mono'";
    gCtx.fillStyle = "#1ab8b0";
    gCtx.fillText("GLB", GW - 30, 16);
    gCtx.fillStyle = "#ff8c42";
    gCtx.fillText("GLBB", GW - 38, 28);
  }, [vGLB, v0GLBB, aGLBB]);

  useEffect(() => {
    fitCanvas();
    drawScene(0, 0, 0);
    window.addEventListener("resize", fitCanvas);
    return () => window.removeEventListener("resize", fitCanvas);
  }, [fitCanvas, drawScene]);

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
    const vGlbMs = vGLB, v0Ms = v0GLBB;
    let last: number | null = null;

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      tRef.current += dt;
      const t = tRef.current;
      const dGLB = Math.min(vGlbMs * t, 800);
      const dGLBB = Math.min(v0Ms * t + 0.5 * aGLBB * t * t, 800);
      const vNow = v0Ms + aGLBB * t;
      setStats({
        time: t.toFixed(1),
        distGLB: dGLB.toFixed(0),
        distGLBB: dGLBB.toFixed(0),
        velGLBB: vNow.toFixed(1),
        status: dGLBB > dGLB ? "🟠 GLBB Unggul" : dGLB > dGLBB ? "🔵 GLB Unggul" : "⚖️ Sejajar",
      });
      drawScene(dGLB, dGLBB, t);
      if (dGLB < 800 || dGLBB < 800) {
        afRef.current = requestAnimationFrame(frame);
      } else {
        runRef.current = false;
      }
    };
    afRef.current = requestAnimationFrame(frame);
  };

  const reset = () => {
    cancelAnimationFrame(afRef.current);
    runRef.current = false;
    tRef.current = 0;
    setSimStatus("idle");
    setStats({ time: "0.0", distGLB: "0", distGLBB: "0", velGLBB: "0", status: "Menunggu" });
    drawScene(0, 0, 0);
  };

  return (
    <SimulationShell title="🏁 Balapan GLB vs GLBB — Siapa yang Menang?">
      <InfoBar>Simulasi ini menunjukkan perbedaan GLB (kecepatan tetap, biru) dan GLBB (percepatan konstan, oranye). Atur parameternya dan perhatikan kapan GLBB bisa menyalip GLB!</InfoBar>

      <div className="canvas-wrap">
        <canvas ref={cvRef} height={200} className="w-full rounded-xl" style={{ border: "1px solid var(--color-border)", display: "block" }} />
      </div>

      <CtrlGrid>
        <CtrlGroup label="Kecepatan GLB" val={`${vGLB} m/s`}>
          <input type="range" min={5} max={45} value={vGLB} onChange={(e) => { setVGLB(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Kecepatan Awal GLBB" val={`${v0GLBB} m/s`}>
          <input type="range" min={0} max={30} value={v0GLBB} onChange={(e) => { setV0GLBB(+e.target.value); reset(); }} />
        </CtrlGroup>
        <CtrlGroup label="Percepatan GLBB" val={`${aGLBB} m/s²`}>
          <input type="range" min={1} max={20} value={aGLBB} onChange={(e) => { setAGLBB(+e.target.value); reset(); }} />
        </CtrlGroup>
      </CtrlGrid>

      <SimBtns onStart={start} onStop={pause} onReset={reset} running={simStatus === "running"} startLabel={simStatus === "paused" ? "▶ Lanjutkan" : "▶ Mulai Balapan"} />

      <StatsRow items={[
        { label: "Waktu", val: stats.time, unit: "s" },
        { label: "Jarak GLB", val: stats.distGLB, unit: "m" },
        { label: "Jarak GLBB", val: stats.distGLBB, unit: "m" },
        { label: "Kec. GLBB", val: stats.velGLBB, unit: "m/s" },
        { label: "Status", val: stats.status, unit: "" },
      ]} />

      <div className="mt-4 rounded-xl overflow-hidden" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
        <div className="flex border-b" style={{ borderColor: "var(--color-border)" }}>
          <span className="font-mono text-[0.68rem] px-4 py-2" style={{ color: "var(--color-teal-300)", borderBottom: "2px solid var(--color-teal-500)" }}>
            Grafik v-t (Kecepatan vs Waktu)
          </span>
        </div>
        <div className="p-3">
          <canvas ref={grRef} height={120} className="w-full" style={{ display: "block" }} />
        </div>
      </div>
    </SimulationShell>
  );
}

/* ─── shared sub-components ─── */
function InfoBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-[10px] px-5 py-3 mb-5 text-[0.82rem] leading-relaxed"
      style={{ background: "rgba(26,184,176,0.05)", border: "1px solid var(--color-teal-800)", color: "var(--color-text-muted)" }}>
      <span className="flex-shrink-0 mt-[0.05rem]">💡</span>
      <span>{children}</span>
    </div>
  );
}
export { InfoBar };

function CtrlGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">{children}</div>;
}
export { CtrlGrid };

function CtrlGroup({ label, val, children }: { label: string; val: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center font-mono text-[0.7rem]" style={{ color: "var(--color-text-muted)" }}>
        <span>{label}</span>
        <span className="font-bold" style={{ color: "var(--color-teal-300)" }}>{val}</span>
      </div>
      {children}
    </div>
  );
}
export { CtrlGroup };

function SimBtns({ onStart, onStop, onReset, running = false, startLabel = "▶ Mulai" }: { onStart: () => void; onStop?: () => void; onReset: () => void; running?: boolean; startLabel?: string }) {
  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      <button onClick={running ? onStop : onStart} className="font-mono text-[0.78rem] px-5 py-2 rounded-lg border cursor-pointer transition-all duration-200"
        style={{ background: "var(--color-teal-600)", borderColor: "var(--color-teal-400)", color: "var(--color-text-bright)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-teal-500)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,184,176,0.3)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-teal-600)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
        {running ? "⏸ Hentikan" : startLabel}
      </button>
      <button onClick={onReset} className="font-mono text-[0.78rem] px-5 py-2 rounded-lg border cursor-pointer transition-all duration-200"
        style={{ background: "transparent", borderColor: "var(--color-border-2)", color: "var(--color-text-muted)" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-teal-700)"; e.currentTarget.style.color = "var(--color-text)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-2)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}>
        ↺ Reset
      </button>
    </div>
  );
}
export { SimBtns };

interface StatItem { label: string; val: string; unit: string; }
function StatsRow({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-[10px] px-3.5 py-2.5" style={{ background: "var(--color-bg-2)", border: "1px solid var(--color-border)" }}>
          <div className="font-mono text-[0.64rem] uppercase tracking-[0.07em]" style={{ color: "var(--color-text-faint)" }}>{s.label}</div>
          <div className="font-mono text-[1.05rem] font-bold mt-0.5" style={{ color: "var(--color-teal-300)" }}>
            {s.val} {s.unit && <span className="text-[0.65rem]" style={{ color: "var(--color-text-faint)" }}>{s.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
export { StatsRow };
