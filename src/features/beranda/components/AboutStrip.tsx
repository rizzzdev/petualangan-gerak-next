const PILLS = [
  "GLB", "GLBB", "Gerak Jatuh Bebas", "Gerak Vertikal", "5 Simulasi", "10 Soal Kuis",
];

export default function AboutStrip() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Visual — hidden on mobile */}
          <div className="hidden md:flex justify-center items-center">
            <div
              className="w-[260px] h-[260px] rounded-full relative flex items-center justify-center"
              style={{ border: "1.5px solid var(--color-teal-800)" }}
            >
              {/* Inner dashed ring */}
              <div
                className="absolute inset-5 rounded-full"
                style={{
                  border: "1px dashed var(--color-teal-700)",
                  animation: "spin-slow 20s linear infinite",
                }}
              />
              {/* Orbit dot */}
              <div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: "var(--color-teal-400)",
                  boxShadow: "0 0 10px var(--color-teal-400)",
                  animation: "orbit 6s linear infinite",
                }}
              />
              {/* Center text */}
              <div className="text-center leading-none">
                <div
                  className="font-display font-black text-[4rem]"
                  style={{ color: "var(--color-teal-300)" }}
                >
                  g
                </div>
                <div
                  className="text-[0.9rem]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  = 10 m/s²
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div
              className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2"
              style={{ color: "var(--color-teal-400)" }}
            >
              // Tentang Website Ini
            </div>
            <h2
              className="font-display font-black tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "var(--color-text-bright)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Kenapa Fisika Gerak Itu Penting?
            </h2>
            <p
              className="text-[0.95rem] leading-[1.85] mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Fisika gerak bukan hanya soal rumus di papan tulis. Setiap hari
              kita mengalaminya — saat bus kota berakselerasi dari halte, saat
              bola melambung di lapangan basket, bahkan saat koin jatuh dari
              saku kita.
            </p>
            <p
              className="text-[0.95rem] leading-[1.85]"
              style={{ color: "var(--color-text-muted)" }}
            >
              Di sini, kamu tidak sekadar menghafal rumus. Kamu akan{" "}
              <strong style={{ color: "var(--color-teal-400)" }}>
                memahami mengapa
              </strong>{" "}
              benda bergerak seperti itu, melalui cerita nyata, analogi
              sederhana, dan simulasi yang bisa kamu mainkan sendiri.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[0.68rem] border rounded-[6px] px-3 py-1"
                  style={{
                    color: "var(--color-teal-400)",
                    background: "rgba(26,184,176,0.07)",
                    borderColor: "var(--color-teal-800)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
