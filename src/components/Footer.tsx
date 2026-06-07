"use client";

import Link from "next/link";
import { HomeLink } from "~/components/Navbar";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/materi", label: "Materi" },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/kuis", label: "Kuis" },
];

export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col justify-center items-center border-t px-6 py-10 text-center mt-20 "
      style={{
        background: "var(--color-bg-2)",
        borderColor: "var(--color-border)",
      }}
    >
      <HomeLink />
      <p
        className="mt-4 text-[0.82rem]"
        style={{ color: "var(--color-text-faint)" }}
      >
        Website Fisika Interaktif — Gerak Lurus &amp; Gravitasi
      </p>
      <p
        className=" text-[0.75rem]"
        style={{ color: "var(--color-text-faint)" }}
      >
        Semua nilai g = 10 m/s² (pendekatan untuk pembelajaran). Simulasi adalah
        idealisasi tanpa hambatan udara.
      </p>
      <div className="flex gap-6 justify-center mt-4">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-mono text-[0.72rem] no-underline transition-colors duration-200"
            style={{ color: "var(--color-text-faint)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-teal-400)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-faint)")
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
