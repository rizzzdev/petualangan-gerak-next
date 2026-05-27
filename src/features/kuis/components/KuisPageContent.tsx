"use client";

import { useState } from "react";
import { QUESTIONS } from "../data/questions";

type Screen = "start" | "quiz" | "result";

const TOPIC_COLORS: Record<string, string> = {
  GLB: "#1ab8b0",
  GLBB: "#ffd700",
  GJB: "#ff8c42",
  "Gerak Vertikal": "#7ee8fa",
};

function topicColor(topic: string) {
  return TOPIC_COLORS[topic] ?? "#1ab8b0";
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = total > 0 ? score / total : 0;
  const r = 52, circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const grade = pct >= 0.9 ? "A" : pct >= 0.7 ? "B" : pct >= 0.5 ? "C" : "D";
  const gradeColor = pct >= 0.7 ? "#1ab8b0" : pct >= 0.5 ? "#ffd700" : "#ff6b6b";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 130, height: 130 }}>
      <svg width={130} height={130} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={65} cy={65} r={r} fill="none" stroke="#1a2828" strokeWidth={10} />
        <circle
          cx={65} cy={65} r={r} fill="none"
          stroke={gradeColor} strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display font-black text-3xl" style={{ color: gradeColor }}>{grade}</span>
        <span className="font-mono text-[0.7rem]" style={{ color: "var(--color-text-muted)" }}>
          {score}/{total}
        </span>
      </div>
    </div>
  );
}

export default function KuisPageContent() {
  const [screen, setScreen] = useState<Screen>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [picked, setPicked] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = QUESTIONS[current];
  const score = answers.filter((a, i) => a === QUESTIONS[i].ans).length;
  const isLast = current === QUESTIONS.length - 1;

  const handlePick = (idx: number) => {
    if (showFeedback) return;
    setPicked(idx);
    setShowFeedback(true);
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (isLast) {
      setScreen("result");
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
      setShowFeedback(false);
    }
  };

  const restart = () => {
    setScreen("start");
    setCurrent(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setPicked(null);
    setShowFeedback(false);
  };

  if (screen === "start") {
    return (
      <main className="pt-[62px] min-h-screen flex flex-col">
        <div
          className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(14,107,107,0.18) 0%, transparent 70%)",
          }}
        >
          <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-3" style={{ color: "var(--color-teal-400)" }}>
            // Uji Pemahaman
          </div>
          <h1
            className="font-display font-black tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--color-text-bright)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            Kuis Gerak Lurus
          </h1>
          <p className="text-base max-w-[500px] mb-10" style={{ color: "var(--color-text-muted)" }}>
            {QUESTIONS.length} soal pilihan ganda mencakup GLB, GLBB, Gerak Jatuh Bebas, dan Gerak Vertikal.
            Setiap soal dilengkapi penjelasan mendalam setelah kamu menjawab.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {(["GLB", "GLBB", "GJB", "Gerak Vertikal"] as const).map((t) => (
              <span
                key={t}
                className="font-mono text-[0.72rem] px-3 py-1 rounded-full border"
                style={{ color: topicColor(t), borderColor: topicColor(t) + "44", background: topicColor(t) + "11" }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-[360px] w-full mb-10">
            {[
              { label: "Soal", val: String(QUESTIONS.length) },
              { label: "Topik", val: "4" },
              { label: "Tipe", val: "Pilgan" },
            ].map(({ label, val }) => (
              <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
                <div className="font-display font-black text-2xl" style={{ color: "var(--color-teal-400)" }}>{val}</div>
                <div className="font-mono text-[0.65rem] mt-1" style={{ color: "var(--color-text-faint)" }}>{label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setScreen("quiz")}
            className="font-mono text-sm px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: "var(--color-teal-600)",
              color: "var(--color-teal-300)",
              border: "1px solid var(--color-teal-500)",
              boxShadow: "var(--shadow-teal)",
            }}
          >
            ▶ Mulai Kuis
          </button>
        </div>
      </main>
    );
  }

  if (screen === "result") {
    const pct = score / QUESTIONS.length;
    const msg = pct >= 0.9 ? "Luar biasa! Pemahaman fisikamu sangat kuat." :
      pct >= 0.7 ? "Bagus! Kamu sudah menguasai sebagian besar materi." :
      pct >= 0.5 ? "Lumayan! Masih ada beberapa konsep yang perlu diperkuat." :
      "Yuk pelajari lagi! Cek penjelasan di setiap soal untuk memahami konsepnya.";

    return (
      <main className="pt-[62px] min-h-screen">
        <div className="max-w-[720px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-3" style={{ color: "var(--color-teal-400)" }}>
              // Hasil Kuis
            </div>
            <h1 className="font-display font-black text-4xl tracking-tight mb-2" style={{ color: "var(--color-text-bright)" }}>
              Selesai!
            </h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{msg}</p>
          </div>

          <div className="flex flex-col items-center mb-10">
            <ScoreRing score={score} total={QUESTIONS.length} />
            <div className="mt-4 font-mono text-sm" style={{ color: "var(--color-text-muted)" }}>
              {score} benar dari {QUESTIONS.length} soal
            </div>
          </div>

          {/* Per-topic breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-10 sm:grid-cols-4">
            {(["GLB", "GLBB", "GJB", "Gerak Vertikal"] as const).map((topic) => {
              const qs = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.topic === topic);
              const correct = qs.filter(({ i }) => answers[i] === QUESTIONS[i].ans).length;
              return (
                <div key={topic} className="rounded-xl p-3 text-center" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
                  <div className="font-mono text-[0.65rem] mb-1" style={{ color: topicColor(topic) }}>{topic}</div>
                  <div className="font-display font-black text-xl" style={{ color: "var(--color-text-bright)" }}>{correct}/{qs.length}</div>
                </div>
              );
            })}
          </div>

          {/* Answer review */}
          <div className="space-y-3 mb-10">
            <h2 className="font-mono text-[0.72rem] tracking-[0.1em] uppercase mb-4" style={{ color: "var(--color-text-faint)" }}>
              Review Jawaban
            </h2>
            {QUESTIONS.map((q, i) => {
              const userAns = answers[i];
              const correct = userAns === q.ans;
              return (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--color-card)",
                    border: `1px solid ${correct ? "#1ab8b033" : "#ff6b6b33"}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="font-mono text-[0.68rem] px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                      style={{
                        background: correct ? "#1ab8b022" : "#ff6b6b22",
                        color: correct ? "#1ab8b0" : "#ff6b6b",
                      }}
                    >
                      {correct ? "✓" : "✗"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[0.65rem] mb-1" style={{ color: topicColor(q.topic) }}>{q.topic}</div>
                      <p className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>{q.q}</p>
                      {!correct && userAns !== null && (
                        <p className="font-mono text-[0.7rem] mb-1" style={{ color: "#ff6b6b" }}>
                          Jawabanmu: {q.opts[userAns]}
                        </p>
                      )}
                      <p className="font-mono text-[0.7rem]" style={{ color: "#1ab8b0" }}>
                        Jawaban benar: {q.opts[q.ans]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={restart}
              className="font-mono text-sm px-6 py-3 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: "var(--color-teal-600)",
                color: "var(--color-teal-300)",
                border: "1px solid var(--color-teal-500)",
                boxShadow: "var(--shadow-teal)",
              }}
            >
              ↺ Ulangi Kuis
            </button>
            <a
              href="/materi"
              className="font-mono text-sm px-6 py-3 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: "transparent",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-2)",
              }}
            >
              ← Pelajari Lagi
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Quiz screen
  const isCorrect = picked === q.ans;

  return (
    <main className="pt-[62px] min-h-screen">
      <div className="max-w-[680px] mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((current) / QUESTIONS.length) * 100}%`, background: "var(--color-teal-500)" }}
            />
          </div>
          <span className="font-mono text-[0.68rem]" style={{ color: "var(--color-text-faint)" }}>
            {current + 1}/{QUESTIONS.length}
          </span>
        </div>

        {/* Topic badge */}
        <div className="mb-4">
          <span
            className="font-mono text-[0.68rem] px-2.5 py-1 rounded-full"
            style={{ background: topicColor(q.topic) + "18", color: topicColor(q.topic), border: `1px solid ${topicColor(q.topic)}44` }}
          >
            {q.topic}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-lg font-medium leading-snug mb-7" style={{ color: "var(--color-text-bright)" }}>
          {q.q}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.opts.map((opt, idx) => {
            let bg = "var(--color-card)";
            let border = "var(--color-border)";
            let textColor = "var(--color-text-muted)";

            if (showFeedback) {
              if (idx === q.ans) {
                bg = "#1ab8b015"; border = "#1ab8b044"; textColor = "#1ab8b0";
              } else if (idx === picked && idx !== q.ans) {
                bg = "#ff6b6b12"; border = "#ff6b6b44"; textColor = "#ff6b6b";
              }
            } else if (picked === idx) {
              bg = "rgba(26,184,176,0.08)"; border = "var(--color-teal-600)";
            }

            return (
              <button
                key={idx}
                onClick={() => handlePick(idx)}
                disabled={showFeedback}
                className="w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
                style={{ background: bg, border: `1px solid ${border}`, color: textColor, fontSize: "0.9rem" }}
              >
                <span className="font-mono text-[0.65rem] mr-2.5 opacity-50">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback panel */}
        {showFeedback && (
          <div
            className="rounded-xl p-5 mb-6"
            style={{
              background: isCorrect ? "#1ab8b00d" : "#ff6b6b0d",
              border: `1px solid ${isCorrect ? "#1ab8b033" : "#ff6b6b33"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: "1.1rem" }}>{isCorrect ? "✅" : "❌"}</span>
              <span className="font-display font-bold text-sm" style={{ color: isCorrect ? "#1ab8b0" : "#ff6b6b" }}>
                {isCorrect ? q.feedback.ok : q.feedback.ng}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>
              {q.feedback.explain}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              <div
                className="rounded-lg px-3 py-2.5"
                style={{ background: "rgba(26,184,176,0.07)", border: "1px solid rgba(26,184,176,0.15)" }}
              >
                <div className="font-mono text-[0.62rem] uppercase tracking-widest mb-1" style={{ color: "var(--color-teal-400)" }}>
                  Konsep
                </div>
                <p className="text-[0.78rem] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {q.feedback.concept}
                </p>
              </div>
              <div
                className="rounded-lg px-3 py-2.5"
                style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.18)" }}
              >
                <div className="font-mono text-[0.62rem] uppercase tracking-widest mb-1" style={{ color: "#ffd700" }}>
                  Rumus
                </div>
                <p className="font-mono text-[0.75rem]" style={{ color: "#ffd700bb" }}>
                  {q.feedback.formula}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.72rem]" style={{ color: "var(--color-text-faint)" }}>
            Skor sementara: {answers.filter((a, i) => a !== null && a === QUESTIONS[i].ans).length} benar
          </span>
          {showFeedback && (
            <button
              onClick={handleNext}
              className="font-mono text-sm px-6 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: "var(--color-teal-600)",
                color: "var(--color-teal-300)",
                border: "1px solid var(--color-teal-500)",
                boxShadow: "var(--shadow-teal)",
              }}
            >
              {isLast ? "Lihat Hasil →" : "Soal Berikutnya →"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
