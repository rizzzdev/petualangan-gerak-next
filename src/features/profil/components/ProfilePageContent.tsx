"use client";

import PageHero from "~/components/PageHero";

const CONTACTS = [
  { label: "Instagram", href: "https://instagram.com/akufebryyy_", icon: "🅾" },
  { label: "Email", href: "mailto:rizqonmaulana05@gmail.com", icon: "✉" },
  {
    label: "Whatsapp",
    href: "https://wa.me/62895339885323",
    icon: "✆",
  },
];

export default function ProfilePageContent() {
  return (
    <main>
      <PageHero
        tag="// Pengembang"
        title="Dwi Febry Triananda Putri"
        subtitle="Mahasiswa pendidikan fisika semester akhir yang sedang menempuh tugas akhir."
      />

      {/* Bio Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Avatar Visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
              {/* Outer orbit ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid var(--color-teal-800)",
                }}
              />
              {/* Inner dashed ring */}
              <div
                className="absolute inset-[28px] rounded-full"
                style={{
                  border: "1px dashed var(--color-teal-700)",
                  animation: "spin-slow 20s linear infinite",
                }}
              />
              {/* Orbiting dot */}
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: "var(--color-teal-400)",
                  boxShadow: "0 0 12px var(--color-teal-400)",
                  top: "18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  animation: "orbit 8s linear infinite",
                }}
              />
              {/* Avatar center */}
              <div
                className="relative z-10 w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 30%, rgba(26,184,176,0.18) 0%, var(--color-card) 70%)",
                  border: "1.5px solid var(--color-teal-800)",
                  boxShadow: "0 0 40px rgba(26,184,176,0.1)",
                }}
              >
                <span
                  className="font-display font-black leading-none"
                  style={{
                    fontSize: "3.5rem",
                    color: "var(--color-teal-300)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  DFTP
                </span>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="flex flex-col gap-5">
            <div
              className="font-mono text-[0.68rem] tracking-[0.14em] uppercase"
              style={{ color: "var(--color-teal-400)" }}
            >
              // Tentang Saya
            </div>

            <h2
              className="font-display font-black tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--color-text-bright)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              Halo, saya Febry 👋
            </h2>

            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.85 }}>
              Saya seorang mahasiswa yang tertarik pada persimpangan antara
              teknologi dan pendidikan. Proyek{" "}
              <span style={{ color: "var(--color-teal-300)" }}>
                Petualangan Gerak
              </span>{" "}
              lahir dari keresahan bahwa pelajaran fisika seringkali terasa
              abstrak — saya percaya simulasi interaktif bisa membuat konsep
              yang rumit jadi terasa nyata.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Fisika", "Edukasi", "Simulasi Interaktif"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.68rem] px-3 py-1 rounded-full"
                  style={{
                    color: "var(--color-teal-400)",
                    background: "rgba(26,184,176,0.08)",
                    border: "1px solid var(--color-teal-800)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--color-border)" }} />

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--color-border)" }} />

      {/* Project Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div
            className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-3"
            style={{ color: "var(--color-teal-400)" }}
          >
            // Proyek Ini
          </div>
          <h2
            className="font-display font-black tracking-tight"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              color: "var(--color-text-bright)",
              letterSpacing: "-0.025em",
            }}
          >
            Tentang Petualangan Gerak
          </h2>
        </div>

        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)] p-10 md:p-14 text-center"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(14,107,107,0.18) 0%, var(--color-card) 70%)",
            border: "1px solid var(--color-border-2)",
            boxShadow: "var(--shadow-teal)",
          }}
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-teal-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-teal-400) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <div
              className="font-mono text-[0.68rem] tracking-[0.12em] uppercase px-4 py-1.5 rounded-full"
              style={{
                color: "var(--color-teal-400)",
                background: "rgba(26,184,176,0.1)",
                border: "1px solid var(--color-teal-800)",
              }}
            >
              ⚡ Open Source · Next.js · TypeScript
            </div>

            <p
              className="text-base"
              style={{ color: "var(--color-text-muted)", lineHeight: 1.85 }}
            >
              Website ini dibuat sebagai proyek pembelajaran mandiri. Semua
              simulasi fisika ditulis dari nol menggunakan React dan canvas API
              — tanpa library fisika eksternal. Kode sumber terbuka dan dapat
              dijadikan referensi.
            </p>

            <div className="flex flex-wrap gap-3 justify-center text-[0.72rem] font-mono">
              {[
                "4 Topik Materi",
                "6 Simulasi Interaktif",
                "Kuis Adaptif",
                "Fully Responsive",
              ].map((feat) => (
                <span
                  key={feat}
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    color: "var(--color-text-muted)",
                    background: "rgba(26,184,176,0.05)",
                    border: "1px solid var(--color-border-2)",
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--color-border)" }} />

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div
          className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-3"
          style={{ color: "var(--color-teal-400)" }}
        >
          // Kontak
        </div>
        <h2
          className="font-display font-black tracking-tight mb-3"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            color: "var(--color-text-bright)",
            letterSpacing: "-0.025em",
          }}
        >
          Mari Terhubung
        </h2>
        <p
          className="max-w-[440px] mx-auto mb-10"
          style={{ color: "var(--color-text-muted)" }}
        >
          Punya pertanyaan tentang proyek ini, atau ingin berkolaborasi? Jangan
          ragu untuk menghubungi saya.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {CONTACTS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-mono text-[0.8rem] px-6 py-3 rounded-xl transition-all duration-200 no-underline"
              style={{
                color: "var(--color-teal-300)",
                background: "rgba(26,184,176,0.07)",
                border: "1px solid var(--color-teal-800)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(26,184,176,0.14)";
                el.style.borderColor = "var(--color-teal-600)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(26,184,176,0.07)";
                el.style.borderColor = "var(--color-teal-800)";
                el.style.transform = "translateY(0)";
              }}
            >
              <span style={{ color: "var(--color-teal-400)" }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
