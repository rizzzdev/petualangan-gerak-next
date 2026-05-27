interface SimulationShellProps {
  title: string;
  children: React.ReactNode;
}

export default function SimulationShell({ title, children }: SimulationShellProps) {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-default)",
      }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-4 px-[1.4rem] py-[0.9rem] border-b"
        style={{
          background: "var(--color-bg-2)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex gap-[6px]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="font-mono text-[0.78rem]"
          style={{ color: "var(--color-text-faint)" }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">{children}</div>
    </div>
  );
}
