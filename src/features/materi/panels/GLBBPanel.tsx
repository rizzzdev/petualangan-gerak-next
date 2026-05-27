"use client";

import {
  FenomenaCard,
  AnalogiCard,
  ConceptBox,
  ConceptList,
  FormulaGrid,
  FormulaCard,
  ContentSection,
  MateriNav,
} from "../components/MateriBlocks";

export default function GLBBPanel() {
  return (
    <>
      <div className="mb-12">
        <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2" style={{ color: "var(--color-teal-400)" }}>
          // 02 — Gerak Lurus Berubah Beraturan
        </div>
        <h2 className="font-display font-black tracking-tight mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--color-text-bright)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          GLBB: Ketika Kecepatan<br />Berubah Secara Teratur
        </h2>
        <p className="text-[1.05rem] leading-[1.8]" style={{ color: "var(--color-text-muted)", maxWidth: 640 }}>
          Kebanyakan gerak di dunia nyata melibatkan perubahan kecepatan. Saat mobil berakselerasi dari lampu merah, saat pesawat menambah kecepatan di landasan — semua ini adalah GLBB.
        </p>
      </div>

      <FenomenaCard title="Mengapa Pesawat Membutuhkan Landasan yang Sangat Panjang?">
        <p>Pernahkah kamu bertanya-tanya mengapa bandara memiliki landasan pacu yang bisa sepanjang 3–4 kilometer? Pesawat Boeing 737, misalnya, membutuhkan kecepatan sekitar 250 km/jam sebelum bisa mengudara.</p>
        <p>Inilah GLBB dalam skala besar. Dari keadaan diam (v₀ = 0), dengan percepatan sekitar 2–3 m/s², pesawat membutuhkan waktu sekitar 30–40 detik dan jarak 1–2 kilometer untuk mencapai kecepatan tinggal landas.</p>
        <p>Contoh sehari-hari lainnya: saat kamu menginjak gas dari lampu merah, mobil berakselerasi secara teratur. Saat mengerem dengan intensitas sama, mobil melambat secara teratur.</p>
      </FenomenaCard>

      <ContentSection title="🎯 Apa Sebenarnya GLBB?">
        <p>GLBB adalah gerak dalam lintasan <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>lurus</em> di mana <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>kecepatannya berubah secara teratur</em> setiap satuan waktu. Besaran yang menyatakan perubahan kecepatan per satuan waktu ini disebut <strong style={{color:"var(--color-text)",fontWeight:500}}>percepatan (a)</strong>, yang nilainya konstan.</p>
        <p>GLBB terbagi dua: <strong style={{color:"var(--color-text)",fontWeight:500}}>GLBB dipercepat</strong> (kecepatan bertambah, a positif) dan <strong style={{color:"var(--color-text)",fontWeight:500}}>GLBB diperlambat</strong> (kecepatan berkurang, a negatif).</p>
      </ContentSection>

      <AnalogiCard>
        Bayangkan eskalator yang terus bertambah cepat. Setiap detik, kecepatannya naik 2 anak tangga per detik. Pertambahan kecepatannya selalu sama = 2 anak tangga per detik setiap detiknya. Itulah percepatan konstan dalam GLBB!
      </AnalogiCard>

      <ContentSection title="📊 Ciri-Ciri dan Grafik GLBB">
        <ConceptBox title="Ciri-ciri GLBB:">
          <ConceptList items={[
            <>Lintasan berupa garis <strong style={{color:"var(--color-text)",fontWeight:500}}>lurus</strong></>,
            <>Kecepatan <strong style={{color:"var(--color-text)",fontWeight:500}}>berubah secara teratur</strong> — bertambah atau berkurang dengan jumlah sama setiap detik</>,
            <>Percepatan (<em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>a</em>) bernilai <strong style={{color:"var(--color-text)",fontWeight:500}}>konstan, tidak nol</strong></>,
            <>Grafik <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>v-t</em>: berupa <strong style={{color:"var(--color-text)",fontWeight:500}}>garis miring lurus</strong> — miring naik jika dipercepat, miring turun jika diperlambat</>,
            <>Grafik <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>s-t</em>: berupa <strong style={{color:"var(--color-text)",fontWeight:500}}>parabola</strong> — melengkung, bukan garis lurus</>,
            <>Luas area di bawah grafik v-t = <strong style={{color:"var(--color-text)",fontWeight:500}}>jarak yang ditempuh</strong></>,
          ]} />
        </ConceptBox>
      </ContentSection>

      <div className="mb-12">
        <h3 className="font-display font-bold text-[1.2rem] mb-5 flex items-center gap-2" style={{ color: "var(--color-text-bright)" }}>
          📐 Rumus-Rumus GLBB
        </h3>
        <FormulaGrid>
          <FormulaCard name="Kecepatan Akhir" eq="vₜ = v₀ + a·t" desc="Kecepatan setelah waktu t detik" vars="vₜ (m/s) · v₀ (m/s) · a (m/s²) · t (s)" />
          <FormulaCard name="Jarak Tempuh" eq="s = v₀t + ½at²" desc="Jarak total selama waktu t" vars="Bergantung pada v₀ dan a" />
          <FormulaCard name="Kecepatan vs Jarak" eq="vₜ² = v₀² + 2as" desc="Tanpa perlu tahu waktu" vars="Berguna saat t tidak diketahui" />
          <FormulaCard name="Percepatan" eq="a = (vₜ - v₀) / t" desc="Perubahan kecepatan per satuan waktu" vars="a (m/s²) · Δv (m/s) · t (s)" />
          <FormulaCard name="Jarak per Selang Waktu" eq="sₙ = v₀ + a(2n-1)/2" desc="Jarak pada detik ke-n" vars="n = nomor detik ke-" />
          <FormulaCard name="Kecepatan Rata-rata" eq="v̄ = (v₀ + vₜ) / 2" desc="Rata-rata kecepatan awal dan akhir" vars="Hanya berlaku untuk GLBB" />
        </FormulaGrid>
      </div>

      <ContentSection title="🧮 Contoh Soal & Pembahasan">
        <ConceptBox title="Contoh 1: Motor Berakselerasi">
          <ConceptList items={[
            "Motor bergerak dari diam dengan percepatan 3 m/s². Berapa kecepatan dan jarak setelah 8 detik?",
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Diketahui:</strong> v₀ = 0 m/s, a = 3 m/s², t = 8 s</>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Kecepatan:</strong> vₜ = v₀ + at = 0 + 3×8 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>24 m/s</em></>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Jarak:</strong> s = v₀t + ½at² = 0 + ½×3×64 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>96 m</em></>,
          ]} />
        </ConceptBox>
        <div className="mt-4">
          <ConceptBox title="Contoh 2: Mobil Direm">
            <ConceptList items={[
              "Mobil melaju 20 m/s lalu direm dengan perlambatan 4 m/s². Berapa jarak pengereman sampai berhenti?",
              <><strong style={{color:"var(--color-text)",fontWeight:500}}>Diketahui:</strong> v₀ = 20 m/s, vₜ = 0, a = -4 m/s²</>,
              <><strong style={{color:"var(--color-text)",fontWeight:500}}>Pakai:</strong> vₜ² = v₀² + 2as → 0 = 400 + 2(-4)s → s = 400/8 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>50 m</em></>,
            ]} />
          </ConceptBox>
        </div>
      </ContentSection>

      <MateriNav prev="/materi/glb" prevLabel="GLB" next="/materi/gjb" nextLabel="Lanjut ke Jatuh Bebas" />
    </>
  );
}
