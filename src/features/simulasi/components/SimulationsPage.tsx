"use client";

import Link from "next/link";

const SIMS = [
  {
    id: "race",
    icon: "🏎️",
    title: "Balapan GLB vs GLBB",
    desc: "Bandingkan langsung gerak konstan vs gerak berakselerasi dalam satu lintasan. Atur kecepatan dan percepatan sendiri.",
    tags: ["GLB", "GLBB", "Grafik v-t"],
  },
  {
    id: "fall",
    icon: "🍎",
    title: "Jatuh Bebas",
    desc: "Jatuhkan dua bola dengan massa berbeda dan amati apakah massa mempengaruhi waktu jatuh.",
    tags: ["GJB", "Gravitasi", "Trail"],
  },
  {
    id: "vertikal",
    icon: "🏀",
    title: "Gerak Vertikal",
    desc: "Lempar bola ke atas dengan kecepatan awal yang kamu tentukan. Amati vektor kecepatan dan jalur prediksi.",
    tags: ["Gerak Vertikal", "h_maks", "Vektor"],
  },
  {
    id: "elevator",
    icon: "🛗",
    title: "Lift & Percepatan",
    desc: "Rasakan bagaimana percepatan lift mengubah berat semu penumpang. Visualisasi gaya normal secara real-time.",
    tags: ["GLBB", "Gaya Normal", "Berat Semu"],
  },
  {
    id: "multiball",
    icon: "🎳",
    title: "Bola Jatuh Multi-Planet",
    desc: "Jatuhkan bola yang sama di Bulan, Mars, Bumi, dan Jupiter bersamaan — lihat perbedaan gravitasi secara visual.",
    tags: ["GJB", "Gravitasi Planet", "Perbandingan"],
  },
  {
    id: "landing",
    icon: "✈️",
    title: "Pendaratan Pesawat",
    desc: "Simulasi pesawat mendekati landasan (GLB) lalu mengerem hingga berhenti (GLBB). Lengkap dengan grafik posisi, kecepatan, dan percepatan real-time.",
    tags: ["GLB", "GLBB", "Grafik x-t v-t a-t"],
  },
];

export default function SimulationsPage() {
  return (
    <main className="pt-[62px] min-h-screen">
      <div
        className="pt-[5.5rem] pb-12 px-6 text-center border-b"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,107,107,0.18) 0%, transparent 70%)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2"
          style={{ color: "var(--color-teal-400)" }}
        >
          // {SIMS.length} Simulasi Interaktif
        </div>
        <h1
          className="font-display font-black tracking-tight mb-3"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "var(--color-text-bright)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          Lab Fisika Virtual
        </h1>
        <p
          className="text-base max-w-[560px] mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          Atur parameter, jalankan simulasi, dan amati bagaimana hukum fisika
          bekerja — semuanya real-time dan interaktif.
        </p>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SIMS.map((s) => (
              <Link
                key={s.id}
                href={`/simulasi/${s.id}`}
                className="flex flex-col gap-3 p-7 rounded-[var(--radius-lg)] border no-underline relative overflow-hidden transition-all duration-300 group"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-teal-600)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-teal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[350ms]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-teal-600), var(--color-teal-300))",
                  }}
                />
                <div className="text-[2rem]">{s.icon}</div>
                <div
                  className="font-display font-black text-[1.05rem]"
                  style={{ color: "var(--color-text-bright)" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-[0.83rem] leading-[1.65]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {s.desc}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.63rem] border rounded px-2 py-0.5"
                      style={{
                        color: "var(--color-teal-500)",
                        background: "rgba(26,184,176,0.07)",
                        borderColor: "var(--color-teal-900)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="font-mono text-[0.7rem] flex items-center gap-1"
                  style={{ color: "var(--color-teal-400)" }}
                >
                  Buka Simulasi →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
