"use client";

import Link from "next/link";

/* Reusable content blocks used inside every materi panel */

export function MateriNav({
  prev, prevLabel, next, nextLabel,
}: {
  prev?: string; prevLabel?: string; next?: string; nextLabel?: string;
}) {
  return (
    <div
      className="flex justify-between items-center pt-8 mt-12 flex-wrap gap-4"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {prev ? (
        <Link
          href={prev}
          className="font-mono text-[0.75rem] px-5 py-2.5 rounded-lg border no-underline transition-all duration-200"
          style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border-2)", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-teal-600)"; e.currentTarget.style.color = "var(--color-teal-300)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-2)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
        >
          ← {prevLabel}
        </Link>
      ) : <span />}
      {next ? (
        <Link
          href={next}
          className="font-mono text-[0.75rem] px-5 py-2.5 rounded-lg border no-underline transition-all duration-200"
          style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border-2)", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-teal-600)"; e.currentTarget.style.color = "var(--color-teal-300)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-2)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
        >
          {nextLabel} →
        </Link>
      ) : <span />}
    </div>
  );
}

export function FenomenaCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-8 mb-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,107,107,0.15) 0%, rgba(26,184,176,0.05) 100%)",
        border: "1px solid var(--color-teal-800)",
      }}
    >
      <div
        className="font-mono text-[0.62rem] tracking-[0.12em] uppercase mb-3"
        style={{ color: "var(--color-teal-500)" }}
      >
        🔭 FENOMENA NYATA
      </div>
      <h3
        className="font-display font-bold text-[1.2rem] mb-3"
        style={{ color: "var(--color-text-bright)", lineHeight: 1.1 }}
      >
        {title}
      </h3>
      <div
        className="text-[0.93rem] leading-[1.85] space-y-3"
        style={{ color: "var(--color-text-muted)" }}
      >
        {children}
      </div>
    </div>
  );
}

export function AnalogiCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-r-[var(--radius)] px-7 py-5 my-8"
      style={{
        borderLeft: "4px solid var(--color-teal-400)",
        background: "rgba(26,184,176,0.05)",
      }}
    >
      <div
        className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-2"
        style={{ color: "var(--color-teal-400)" }}
      >
        💡 ANALOGI SEHARI-HARI
      </div>
      <p
        className="text-[0.93rem] leading-[1.85] m-0"
        style={{ color: "var(--color-text)" }}
      >
        {children}
      </p>
    </div>
  );
}

export function ConceptBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[var(--radius-lg)] px-7 py-6 my-8"
      style={{
        background: "var(--color-bg-2)",
        border: "1px solid var(--color-border-2)",
      }}
    >
      <h4
        className="font-display font-bold text-base mb-3"
        style={{ color: "var(--color-teal-300)" }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

export function ConceptList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-none flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-[0.9rem] flex items-start gap-2.5 leading-[1.6]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span
            className="flex-shrink-0 mt-[0.05rem]"
            style={{ color: "var(--color-teal-500)" }}
          >
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FormulaGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
      {children}
    </div>
  );
}

export function FormulaCard({
  name,
  eq,
  desc,
  vars,
}: {
  name: string;
  eq: string;
  desc: string;
  vars: string;
}) {
  return (
    <div
      className="rounded-[var(--radius)] px-5 py-5 transition-all duration-300"
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border-2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-teal-700)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(26,184,176,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-2)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        className="font-mono text-[0.68rem] uppercase tracking-[0.07em] mb-1.5"
        style={{ color: "var(--color-text-faint)" }}
      >
        {name}
      </div>
      <div
        className="font-mono font-bold text-[1.15rem] mb-1.5"
        style={{ color: "var(--color-teal-300)" }}
      >
        {eq}
      </div>
      <div
        className="text-[0.78rem] leading-[1.6] mb-1.5"
        style={{ color: "var(--color-text-muted)" }}
      >
        {desc}
      </div>
      <div
        className="font-mono text-[0.73rem]"
        style={{ color: "var(--color-text-faint)" }}
      >
        {vars}
      </div>
    </div>
  );
}

export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-r-[var(--radius)] px-6 py-5 my-6"
      style={{
        background: "rgba(251,191,36,0.06)",
        border: "1px solid rgba(251,191,36,0.25)",
        borderLeft: "4px solid #fbbf24",
      }}
    >
      <div
        className="font-mono text-[0.62rem] tracking-[0.1em] uppercase mb-2"
        style={{ color: "#fbbf24" }}
      >
        ⚠️ PERHATIAN
      </div>
      <p
        className="text-[0.88rem] leading-[1.75] m-0"
        style={{ color: "var(--color-text-muted)" }}
      >
        {children}
      </p>
    </div>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h3
        className="font-display font-bold text-[1.35rem] mb-4 flex items-center gap-2.5"
        style={{ color: "var(--color-text-bright)" }}
      >
        {title}
      </h3>
      <div
        className="text-[0.95rem] leading-[1.85] space-y-3.5"
        style={{ color: "var(--color-text-muted)" }}
      >
        {children}
      </div>
    </div>
  );
}
