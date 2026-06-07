"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Title } from "~/features/beranda/components/Hero";

const NAV_LINKS = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/materi", label: "Materi", icon: "📚" },
  { href: "/simulasi", label: "Simulasi", icon: "🎮" },
  { href: "/kuis", label: "Kuis", icon: "🧠" },
  { href: "/profil", label: "Profil", icon: "👤" },
];

export const HomeLink = () => {
  return (
    <Link
      href="/"
      className="w-fit flex items-center justify-center gap-2 text-xl font-display font-black tracking-tight no-underline "
      style={{ letterSpacing: "-0.02em" }}
    >
      ⚡ <Title type="link" />
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] h-[62px] flex items-center justify-between px-8 border-b transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(8,13,13,0.97)" : "rgba(8,13,13,0.88)",
          backdropFilter: "blur(24px)",
          borderColor: "var(--color-border)",
        }}
      >
        <HomeLink />
        {/* Desktop links */}
        <ul className="hidden md:flex gap-1 list-none items-center">
          {NAV_LINKS.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 font-mono text-[0.72rem] px-4 py-1.5 rounded-lg border transition-all duration-200 no-underline"
                  style={{
                    color: active
                      ? "var(--color-teal-300)"
                      : "var(--color-text-muted)",
                    background: active ? "rgba(26,184,176,0.1)" : "transparent",
                    borderColor: active
                      ? "var(--color-teal-700)"
                      : "transparent",
                  }}
                >
                  <span className="text-[0.9rem]">{icon}</span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-[5px] bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-[22px] h-[2px] rounded-sm transition-all duration-300"
            style={{
              background: "var(--color-teal-400)",
              transform: menuOpen
                ? "rotate(45deg) translate(5px,5px)"
                : undefined,
            }}
          />
          <span
            className="block w-[22px] h-[2px] rounded-sm transition-all duration-300"
            style={{
              background: "var(--color-teal-400)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-[22px] h-[2px] rounded-sm transition-all duration-300"
            style={{
              background: "var(--color-teal-400)",
              transform: menuOpen
                ? "rotate(-45deg) translate(5px,-5px)"
                : undefined,
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed top-[62px] left-0 right-0 z-[499] flex flex-col gap-1 px-6 py-4 border-b md:hidden"
          style={{
            background: "rgba(10,16,16,0.98)",
            borderColor: "var(--color-border)",
          }}
        >
          {NAV_LINKS.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-[0.8rem] px-4 py-3 rounded-lg border transition-all duration-200 no-underline"
                style={{
                  color: active
                    ? "var(--color-teal-300)"
                    : "var(--color-text-muted)",
                  background: active
                    ? "var(--color-teal-glow-subtle)"
                    : "transparent",
                  borderColor: active ? "var(--color-teal-800)" : "transparent",
                }}
              >
                {icon} {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
