"use client";

import Link from "next/link";

const TOPICS = [
  {
    num: "// 01",
    icon: "🚂",
    name: "Gerak Lurus Beraturan (GLB)",
    desc: "Benda bergerak lurus dengan kecepatan konstan. Percepatan = 0. Dasar dari segalanya.",
    href: "/materi#glb",
  },
  {
    num: "// 02",
    icon: "🚗",
    name: "Gerak Lurus Berubah Beraturan (GLBB)",
    desc: "Kecepatan berubah secara teratur setiap detiknya. Percepatan konstan ≠ 0.",
    href: "/materi#glbb",
  },
  {
    num: "// 03",
    icon: "🍎",
    name: "Gerak Jatuh Bebas",
    desc: "GLBB khusus: benda jatuh hanya karena gravitasi, tanpa kecepatan awal.",
    href: "/materi#gjb",
  },
  {
    num: "// 04",
    icon: "🏀",
    name: "Gerak Vertikal",
    desc: "Benda dilempar ke atas atau ke bawah. Melibatkan kecepatan awal dan gravitasi.",
    href: "/materi#gv",
  },
];

export default function TopicsOverview() {
  return (
    <section className="pb-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-12">
          <div
            className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2"
            style={{ color: "var(--color-teal-400)" }}
          >
            // Peta Materi
          </div>
          <h2
            className="font-display font-black tracking-tight mb-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--color-text-bright)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Apa Saja yang Akan Dipelajari?
          </h2>
          <p
            className="max-w-[480px] mx-auto text-[0.95rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Empat topik utama yang tersusun dari yang paling dasar, siap
            mengantarkanmu memahami gerak secara menyeluruh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex flex-col gap-2 p-6 rounded-[var(--radius-lg)] border no-underline relative overflow-hidden transition-all duration-300 group"
              style={{
                background: "var(--color-card)",
                borderColor: "var(--color-border)",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-teal-700)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "var(--shadow-teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                style={{
                  background: "linear-gradient(90deg, var(--color-teal-600), var(--color-teal-400))",
                }}
              />
              <div
                className="font-mono text-[0.68rem]"
                style={{ color: "var(--color-teal-600)" }}
              >
                {t.num}
              </div>
              <div className="text-[1.8rem]">{t.icon}</div>
              <div
                className="font-display font-bold text-[0.98rem]"
                style={{ color: "var(--color-text-bright)" }}
              >
                {t.name}
              </div>
              <div
                className="text-[0.8rem] leading-[1.6]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
