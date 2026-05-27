"use client";

import Link from "next/link";

const TOPICS = [
  {
    slug: "glb",
    num: "// 01",
    icon: "🚂",
    title: "Gerak Lurus Beraturan (GLB)",
    desc: `Belajar tentang gerak paling "ideal" — benda yang bergerak lurus dengan kecepatan yang tidak pernah berubah.`,
    tags: ["v = konstan", "a = 0", "s = v·t"],
  },
  {
    slug: "glbb",
    num: "// 02",
    icon: "🚗",
    title: "Gerak Lurus Berubah Beraturan (GLBB)",
    desc: "Gerak benda dengan percepatan konstan — saat gas mobil diinjak, saat rem digunakan, dan perubahan kecepatan yang teratur.",
    tags: ["a = konstan", "vt = v₀ + at", "s = v₀t + ½at²"],
  },
  {
    slug: "gjb",
    num: "// 03",
    icon: "🍎",
    title: "Gerak Jatuh Bebas",
    desc: "Dari apel yang jatuh menginspirasi Newton, hingga eksperimen legendaris Galileo di Menara Pisa.",
    tags: ["v₀ = 0", "a = g = 10 m/s²", "h = ½gt²"],
  },
  {
    slug: "gv",
    num: "// 04",
    icon: "🏀",
    title: "Gerak Vertikal",
    desc: "Saat bola basket melayang ke ring, roket diluncurkan ke langit, atau batu dilempar ke bawah sumur.",
    tags: ["Ke atas & ke bawah", "v₀ ≠ 0", "h_max = v₀²/2g"],
  },
];

export default function MateriPageContent() {
  return (
    <main className="pt-[62px] min-h-screen">
      <div
        className="pt-[5.5rem] pb-14 px-6 text-center border-b"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,107,107,0.18) 0%, transparent 70%)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2" style={{ color: "var(--color-teal-400)" }}>
          // Pilih Sub-Materi
        </div>
        <h1
          className="font-display font-black tracking-tight mb-3"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--color-text-bright)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          Materi Fisika Gerak
        </h1>
        <p className="text-base max-w-[520px] mx-auto" style={{ color: "var(--color-text-muted)" }}>
          Pilih salah satu topik di bawah untuk mulai membaca materi yang ingin kamu pelajari.
        </p>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TOPICS.map((t) => (
              <Link
                key={t.slug}
                href={`/materi/${t.slug}`}
                className="flex flex-col gap-3 p-8 rounded-[var(--radius-lg)] border text-left no-underline relative overflow-hidden transition-all duration-300 group"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border)", color: "inherit" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-teal-600)";
                  e.currentTarget.style.transform = "translateY(-5px)";
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
                  style={{ background: "linear-gradient(90deg, var(--color-teal-600), var(--color-teal-300))" }}
                />
                <div className="font-mono text-[0.68rem]" style={{ color: "var(--color-teal-600)" }}>{t.num}</div>
                <div className="text-[2.5rem]">{t.icon}</div>
                <div className="font-display font-black text-[1.1rem]" style={{ color: "var(--color-text-bright)" }}>{t.title}</div>
                <div className="text-[0.83rem] leading-[1.65]" style={{ color: "var(--color-text-muted)" }}>{t.desc}</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.63rem] border rounded px-2 py-0.5"
                      style={{ color: "var(--color-teal-500)", background: "rgba(26,184,176,0.07)", borderColor: "var(--color-teal-900)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[0.72rem] flex items-center gap-1 mt-auto" style={{ color: "var(--color-teal-400)" }}>
                  Baca Materi <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
