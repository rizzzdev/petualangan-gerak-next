"use client";

import {
  FenomenaCard,
  AnalogiCard,
  ConceptBox,
  ConceptList,
  FormulaGrid,
  FormulaCard,
  NoteBox,
  ContentSection,
  MateriNav,
} from "../components/MateriBlocks";

export default function GJBPanel() {
  return (
    <>
      <div className="mb-12">
        <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2" style={{ color: "var(--color-teal-400)" }}>
          // 03 — Gerak Jatuh Bebas
        </div>
        <h2 className="font-display font-black tracking-tight mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--color-text-bright)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Gerak Jatuh Bebas:<br />Ketika Gravitasi Berkuasa
        </h2>
        <p className="text-[1.05rem] leading-[1.8]" style={{ color: "var(--color-text-muted)", maxWidth: 640 }}>
          Salah satu fenomena fisika paling intuitif sekaligus paling sering disalahpahami. Apakah benda berat jatuh lebih cepat dari benda ringan? Jawabannya akan mengejutkan kamu.
        </p>
      </div>

      <FenomenaCard title="Galileo Galilei vs. Aristoteles: Siapa yang Benar?">
        <p>Selama 2.000 tahun, manusia percaya pada ajaran Aristoteles bahwa benda yang lebih berat jatuh lebih cepat. Lalu datanglah Galileo Galilei pada akhir abad ke-16 yang menjatuhkan dua bola dari puncak Menara Pisa. Hasilnya: <strong style={{color:"var(--color-text-bright)",fontWeight:600}}>keduanya mendarat hampir bersamaan!</strong></p>
        <p>Galileo membuktikan bahwa dalam kondisi tanpa hambatan udara, <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>semua benda jatuh dengan percepatan yang sama</em> — yaitu g ≈ 10 m/s².</p>
        <p>Pembuktian paling dramatis terjadi pada tahun 1971 ketika astronot Apollo 15, David Scott, menjatuhkan palu dan bulu burung di permukaan Bulan — keduanya mendarat tepat bersamaan.</p>
      </FenomenaCard>

      <ContentSection title="🎯 Apa Itu Gerak Jatuh Bebas?">
        <p>GJB adalah gerak jatuhnya benda yang <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>hanya dipengaruhi gravitasi</em>, tanpa hambatan udara. Ini adalah kasus khusus dari GLBB dengan dua syarat:</p>
        <ConceptBox title="Syarat Gerak Jatuh Bebas:">
          <ConceptList items={[
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Kecepatan awal = 0</strong> (v₀ = 0): benda dilepas dari keadaan diam, tidak dilempar</>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Percepatan = g</strong>: satu-satunya percepatan adalah gravitasi bumi (g = 10 m/s²)</>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Arah gerak: ke bawah</strong> — searah dengan gaya gravitasi</>,
          ]} />
        </ConceptBox>
        <p>GJB adalah idealisasi. Dalam kehidupan nyata, hambatan udara selalu ada. Itulah mengapa bulu jatuh lebih lambat dari batu di udara — bukan karena gravitasinya berbeda, melainkan karena hambatan udara yang jauh lebih besar pada bulu.</p>
      </ContentSection>

      <AnalogiCard>
        Bayangkan kamu menjatuhkan koin dari jendela. Saat dilepas, gravitasi langsung bekerja. Setiap detik kecepatannya bertambah 10 m/s. Detik ke-1: 10 m/s. Detik ke-2: 20 m/s. Detik ke-3: 30 m/s. Makin lama makin cepat!
      </AnalogiCard>

      <ContentSection title="📊 Perkembangan Kecepatan dalam GJB">
        <p>Kecepatan bertambah <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>linear</em>, tetapi jarak bertambah <em style={{color:"var(--color-teal-400)",fontStyle:"normal",fontWeight:500}}>kuadratik</em>:</p>
        <ConceptBox title="Pertumbuhan kecepatan dan jarak (g = 10 m/s²):">
          <ConceptList items={[
            "t = 0 s → v = 0 m/s, h = 0 m",
            "t = 1 s → v = 10 m/s, h = 5 m",
            "t = 2 s → v = 20 m/s, h = 20 m",
            "t = 3 s → v = 30 m/s, h = 45 m",
            "t = 4 s → v = 40 m/s, h = 80 m",
            "t = 5 s → v = 50 m/s, h = 125 m",
          ]} />
        </ConceptBox>
      </ContentSection>

      <div className="mb-12">
        <h3 className="font-display font-bold text-[1.2rem] mb-5" style={{ color: "var(--color-text-bright)" }}>
          📐 Rumus Gerak Jatuh Bebas
        </h3>
        <FormulaGrid>
          <FormulaCard name="Kecepatan pada waktu t" eq="v = g · t" desc="Kecepatan bertambah 10 m/s setiap detik" vars="v (m/s) · g = 10 m/s² · t (s)" />
          <FormulaCard name="Jarak Jatuh" eq="h = ½ · g · t²" desc="Jarak jatuh sebanding dengan kuadrat waktu" vars="h (m) · g = 10 m/s² · t (s)" />
          <FormulaCard name="Kecepatan vs Ketinggian" eq="v² = 2 · g · h" desc="Mencari v tanpa harus tahu waktu" vars="v (m/s) · g = 10 m/s² · h (m)" />
          <FormulaCard name="Waktu Jatuh" eq="t = √(2h / g)" desc="Dari h = ½gt², cari t" vars="Akar dari (2h dibagi g)" />
        </FormulaGrid>
      </div>

      <NoteBox>
        Nilai g di Bumi ≈ 9,8 m/s², namun untuk mempermudah perhitungan, umumnya dibulatkan menjadi g = 10 m/s². Di Bulan g ≈ 1,6 m/s², di Mars g ≈ 3,7 m/s².
      </NoteBox>

      <ContentSection title="🧮 Contoh Soal">
        <ConceptBox title="Contoh: Batu Jatuh dari Tebing">
          <ConceptList items={[
            "Batu dilepas dari atas tebing setinggi 125 m. (g = 10 m/s²). Berapa lama batu jatuh?",
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Waktu:</strong> t = √(2h/g) = √(2×125/10) = √25 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>5 detik</em></>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Kecepatan:</strong> v = gt = 10×5 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>50 m/s</em></>,
            <>Atau: v² = 2gh = 2×10×125 = 2500 → v = √2500 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>50 m/s ✓</em></>,
          ]} />
        </ConceptBox>
      </ContentSection>

      <MateriNav prev="/materi/glbb" prevLabel="GLBB" next="/materi/gv" nextLabel="Lanjut ke Gerak Vertikal" />
    </>
  );
}
