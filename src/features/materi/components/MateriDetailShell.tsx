"use client";

import Link from "next/link";

const TOPICS = [
  { slug: "glb",  icon: "🚂", label: "GLB" },
  { slug: "glbb", icon: "🚗", label: "GLBB" },
  { slug: "gjb",  icon: "🍎", label: "Gerak Jatuh Bebas" },
  { slug: "gv",   icon: "🏀", label: "Gerak Vertikal" },
];

export default function MateriDetailShell({
  activeSlug,
  children,
}: {
  activeSlug: string;
  children: React.ReactNode;
}) {
  return (
    <main className="pt-[62px] min-h-screen">
      <div className="px-6 pb-20">
        <div className="max-w-[1080px] mx-auto">
          {/* Back */}
          <div className="pt-8 mb-10">
            <Link
              href="/materi"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] px-4 py-2 rounded-lg border no-underline transition-all duration-200"
              style={{ color: "var(--color-text-muted)", background: "transparent", borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-teal-700)"; e.currentTarget.style.color = "var(--color-teal-300)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
            >
              ← Kembali ke Pilihan Materi
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 items-start">
            <div style={{ animation: "scaleIn 0.35s ease" }}>{children}</div>

            {/* Sticky sidebar TOC */}
            <aside
              className="hidden lg:block sticky top-20 rounded-[var(--radius)] p-5 text-[0.78rem]"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <div
                className="font-mono text-[0.66rem] uppercase tracking-[0.1em] mb-3"
                style={{ color: "var(--color-text-faint)" }}
              >
                Sub-Materi
              </div>
              <div className="flex flex-col gap-1">
                {TOPICS.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/materi/${t.slug}`}
                    className="text-left px-2 py-1.5 rounded-md border-l-2 transition-all duration-150 font-mono text-[0.72rem] no-underline"
                    style={{
                      color: activeSlug === t.slug ? "var(--color-teal-300)" : "var(--color-text-muted)",
                      borderColor: activeSlug === t.slug ? "var(--color-teal-500)" : "transparent",
                      background: activeSlug === t.slug ? "rgba(26,184,176,0.06)" : "transparent",
                    }}
                  >
                    {t.icon} {t.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                <Link href="/kuis" className="font-mono text-[0.7rem] no-underline" style={{ color: "var(--color-teal-400)" }}>
                  → Lanjut ke Kuis
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
