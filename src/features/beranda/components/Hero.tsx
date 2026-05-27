"use client";

import Link from "next/link";

const HERO_CARDS = [
  {
    icon: "📖",
    title: "Materi Lengkap",
    desc: "4 sub-materi dengan penjelasan mendalam, fenomena nyata, analogi, dan rumus-rumus fisika.",
    cta: "Baca Materi →",
    href: "/materi",
  },
  {
    icon: "🔬",
    title: "5 Simulasi Fisika",
    desc: "Simulasi interaktif yang bisa kamu atur sendiri — rasakan fisika bergerak secara langsung!",
    cta: "Coba Simulasi →",
    href: "/simulasi",
  },
  {
    icon: "🧠",
    title: "Kuis & Pembahasan",
    desc: "10 soal pilihan ganda dengan pembahasan detail dan penjelasan konsep di tiap jawaban.",
    cta: "Mulai Kuis →",
    href: "/kuis",
  },
];

const FLOATERS = [
  {
    w: 8,
    top: "20%",
    left: "12%",
    dur: "7s",
    delay: "0s",
    opacity: 0.5,
    color: "var(--color-teal-400)",
  },
  {
    w: 5,
    top: "65%",
    left: "6%",
    dur: "9s",
    delay: "2s",
    opacity: 0.3,
    color: "var(--color-teal-300)",
  },
  {
    w: 6,
    top: "30%",
    right: "8%",
    dur: "8s",
    delay: "1s",
    opacity: 0.4,
    color: "var(--color-teal-400)",
  },
  {
    w: 4,
    top: "75%",
    right: "15%",
    dur: "6s",
    delay: "3s",
    opacity: 0.35,
    color: "var(--color-teal-300)",
  },
];

export const Title = ({ type = "hero" }: { type?: "hero" | "link" }) => {
  return (
    <h1
      className={`font-display font-black leading-[1.05]  w-full flex ${type === "hero" ? "flex-col mb-4 sm:mb-6" : "flex-row"} gap-2 justify-center items-center ${type === "hero" ? "text-4xl md:text-7xl" : "text-sm md:text-xl"}`}
      style={{
        letterSpacing: "-0.03em",
        animation: "fadeUp 0.8s 0.1s ease both",
      }}
    >
      <span>Petualangan</span>
      <span className="w-fit relative flex flex-col justify-center items-center text-teal-300">
        Gerak
        <span
          className={`w-full ${type === "hero" ? "h-1 md:h-2" : "h-0.5"} rounded-sm`}
          style={{
            background:
              "linear-gradient(90deg, var(--color-teal-400), transparent)",
          }}
        />
      </span>
    </h1>
  );
};

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
      style={{ paddingTop: "calc(62px + 3.5rem)", paddingBottom: "3.5rem" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 38%, rgba(14,107,107,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 85% 75%, rgba(26,184,176,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 60%, rgba(26,184,176,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
          opacity: 0.5,
        }}
      />

      {/* Floating particles */}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.w,
            height: f.w,
            background: f.color,
            top: f.top,
            left: "left" in f ? f.left : undefined,
            right: "right" in f ? (f as { right?: string }).right : undefined,
            opacity: f.opacity,
            animation: `float ${f.dur} ease-in-out ${f.delay} infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full text-center max-w-[820px] mx-auto">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] sm:text-[0.72rem] border rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-9"
          style={{
            color: "var(--color-text-muted)",
            background: "rgba(26,184,176,0.07)",
            borderColor: "var(--color-teal-800)",
            animation: "fadeUp 0.8s ease both",
          }}
        >
          ⚡ Website Fisika Interaktif untuk Murid SMA
        </div>

        {/* Title */}
        <Title />

        {/* Subtitle */}
        <p
          className="text-[0.95rem] sm:text-[1.1rem] max-w-[560px] mx-auto mb-8 sm:mb-12 leading-[1.75]"
          style={{
            color: "var(--color-text-muted)",
            animation: "fadeUp 0.8s 0.2s ease both",
          }}
        >
          Belajar fisika tentang gerak dari yang paling dasar sampai gerak jatuh
          bebas — dengan penjelasan sederhana, analogi sehari-hari, simulasi
          visual, dan kuis interaktif.
        </p>

        {/* CTA buttons */}
        <div
          className="flex gap-3 justify-center flex-wrap mb-10 sm:mb-16"
          style={{ animation: "fadeUp 0.8s 0.3s ease both" }}
        >
          <Link
            href="/materi"
            className="inline-flex items-center gap-2 text-[0.85rem] sm:text-[0.9rem] font-medium px-5 sm:px-7 py-2.5 sm:py-3 rounded-[10px] no-underline border transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--color-teal-600), var(--color-teal-500))",
              color: "var(--color-text-bright)",
              borderColor: "var(--color-teal-500)",
              boxShadow: "0 4px 20px rgba(26,184,176,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(26,184,176,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(26,184,176,0.2)";
            }}
          >
            📚 Mulai Belajar Materi
          </Link>
          <Link
            href="/simulasi"
            className="inline-flex items-center gap-2 text-[0.85rem] sm:text-[0.9rem] font-medium px-5 sm:px-7 py-2.5 sm:py-3 rounded-[10px] no-underline border transition-all duration-300"
            style={{
              background: "transparent",
              color: "var(--color-text-muted)",
              borderColor: "var(--color-border-2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-teal-600)";
              e.currentTarget.style.color = "var(--color-teal-300)";
              e.currentTarget.style.background =
                "var(--color-teal-glow-subtle)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-2)";
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            🎮 Langsung ke Simulasi
          </Link>
        </div>

        {/* Hero cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          style={{ animation: "fadeUp 0.8s 0.4s ease both" }}
        >
          {HERO_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col items-start gap-3 p-6 rounded-[var(--radius-lg)] border no-underline transition-all duration-300 relative overflow-hidden"
              style={{
                background: "var(--color-card)",
                borderColor: "var(--color-border)",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-teal-700)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-teal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="text-[2rem]">{card.icon}</div>
              <div
                className="font-display font-bold text-[1.05rem]"
                style={{ color: "var(--color-text-bright)" }}
              >
                {card.title}
              </div>
              <div
                className="text-[0.83rem] leading-[1.65]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {card.desc}
              </div>
              <div
                className="font-mono text-[0.7rem] mt-auto"
                style={{ color: "var(--color-teal-400)" }}
              >
                {card.cta}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60"
        style={{ animation: "fadeUp 1s 0.8s ease both" }}
      >
        <span
          className="font-mono text-[0.62rem] tracking-[0.1em]"
          style={{ color: "var(--color-text-faint)" }}
        >
          SCROLL
        </span>
        <div
          className="w-5 h-5 border-r-2 border-b-2"
          style={{
            borderColor: "var(--color-teal-600)",
            transform: "rotate(45deg)",
            animation: "bounce-arrow 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
