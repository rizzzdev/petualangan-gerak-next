interface PageHeroProps {
  tag: string;
  title: string;
  subtitle: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <div
      className="pt-[5.5rem] pb-14 px-6 text-center border-b"
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
        {tag}
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
        {title}
      </h1>
      <p
        className="text-base max-w-[560px] mx-auto"
        style={{ color: "var(--color-text-muted)" }}
      >
        {subtitle}
      </p>
    </div>
  );
}
