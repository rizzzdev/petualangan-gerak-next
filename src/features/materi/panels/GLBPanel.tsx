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

export default function GLBPanel() {
  return (
    <>
      <div className="mb-12">
        <div
          className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2"
          style={{ color: "var(--color-teal-400)" }}
        >
          // 01 — Gerak Lurus Beraturan
        </div>
        <h2
          className="font-display font-black tracking-tight mb-3"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            color: "var(--color-text-bright)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          GLB: Ketika Kecepatan
          <br />
          Tak Pernah Berubah
        </h2>
        <p
          className="text-[1.05rem] leading-[1.8]"
          style={{ color: "var(--color-text-muted)", maxWidth: 640 }}
        >
          Sebelum memahami gerak yang lebih kompleks, kita harus menguasai gerak
          paling "bersih" di fisika — gerak yang kecepatannya selalu konstan,
          tidak pernah naik, tidak pernah turun.
        </p>
      </div>

      <FenomenaCard title="Kereta Shinkansen di Jepang: Kecepatan yang Tidak Berubah">
        <p>
          Kereta peluru Shinkansen di Jepang dapat melaju hingga 320 km/jam.
          Saat kereta ini berada di bagian tengah perjalanannya — jauh dari
          stasiun awal dan belum dekat stasiun tujuan — kecepatannya dipertahankan
          tetap konstan oleh sistem komputer otomatis. Tidak ada percepatan, tidak
          ada pengereman.
        </p>
        <p>
          Inilah yang disebut Gerak Lurus Beraturan (GLB). Kamu yang duduk di
          dalamnya bahkan tidak merasakan gerakan sama sekali — seolah kereta
          diam, hanya pemandangan di luar yang bergerak melesat.
        </p>
        <p>
          Fenomena serupa bisa kamu temukan setiap hari: eskalator yang bergerak
          konstan di mal, ban berjalan di bandara, bahkan conveyor belt di pabrik.
          Semuanya adalah contoh GLB dalam kehidupan nyata.
        </p>
      </FenomenaCard>

      <ContentSection title="🎯 Apa Sebenarnya GLB?">
        <p>
          Gerak Lurus Beraturan (GLB) adalah gerak suatu benda pada lintasan{" "}
          <em style={{ color: "var(--color-teal-400)", fontStyle: "normal", fontWeight: 500 }}>lurus</em>{" "}
          dengan{" "}
          <em style={{ color: "var(--color-teal-400)", fontStyle: "normal", fontWeight: 500 }}>kecepatan yang selalu tetap</em>{" "}
          di setiap saat. Secara matematis, GLB terjadi ketika{" "}
          <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>percepatan (a) sama dengan nol</strong>.
        </p>
        <p>
          Ini sesuai dengan <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Hukum I Newton</strong>: "Benda yang
          bergerak akan tetap bergerak dengan kecepatan konstan jika tidak ada
          gaya neto yang bekerja padanya."
        </p>
        <p>
          Perlu dipahami bahwa GLB adalah{" "}
          <em style={{ color: "var(--color-teal-400)", fontStyle: "normal", fontWeight: 500 }}>idealisasi</em>{" "}
          — dalam dunia nyata, selalu ada gesekan dan hambatan udara.
        </p>
      </ContentSection>

      <AnalogiCard>
        Bayangkan kamu naik sepeda di jalan tol yang sangat panjang dan lurus,
        tanpa angin, tanpa tanjakan, tanpa turunan. Jarum speedometer tidak
        bergerak sama sekali — tetap di angka yang sama sejak awal. Itulah esensi
        GLB: kamu bergerak, tapi kecepatanmu tidak berubah.
      </AnalogiCard>

      <ContentSection title="📊 Ciri-Ciri dan Grafik GLB">
        <p>Ada beberapa ciri khas GLB yang harus kamu hafalkan dan pahami:</p>
        <ConceptBox title="Ciri-ciri GLB:">
          <ConceptList
            items={[
              <>Lintasan berupa garis <strong style={{color:"var(--color-text)",fontWeight:500}}>lurus</strong> — tidak menikung, tidak melengkung</>,
              <>Kecepatan (<em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>v</em>) selalu <strong style={{color:"var(--color-text)",fontWeight:500}}>konstan</strong> — tidak bertambah, tidak berkurang</>,
              <>Percepatan (<em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>a</em>) = <strong style={{color:"var(--color-text)",fontWeight:500}}>0</strong> (nol)</>,
              <>Grafik <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>v-t</em> berupa <strong style={{color:"var(--color-text)",fontWeight:500}}>garis horizontal lurus</strong></>,
              <>Grafik <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>s-t</em> berupa <strong style={{color:"var(--color-text)",fontWeight:500}}>garis miring lurus</strong> (gradien = v)</>,
              <>Jarak yang ditempuh setiap satuan waktu yang sama <strong style={{color:"var(--color-text)",fontWeight:500}}>selalu sama</strong></>,
            ]}
          />
        </ConceptBox>
      </ContentSection>

      <div className="mb-12">
        <h3
          className="font-display font-bold text-[1.2rem] mb-5 flex items-center gap-2"
          style={{ color: "var(--color-text-bright)" }}
        >
          📐 Rumus-Rumus GLB
        </h3>
        <FormulaGrid>
          <FormulaCard name="Jarak Tempuh" eq="s = v × t" desc="Jarak berbanding lurus dengan kecepatan dan waktu" vars="s (m) · v (m/s) · t (s)" />
          <FormulaCard name="Kecepatan" eq="v = s / t" desc="Kecepatan = jarak dibagi waktu" vars="Selalu konstan dalam GLB" />
          <FormulaCard name="Waktu Tempuh" eq="t = s / v" desc="Waktu = jarak dibagi kecepatan" vars="t (s) · s (m) · v (m/s)" />
          <FormulaCard name="Percepatan" eq="a = 0 m/s²" desc="Tidak ada percepatan dalam GLB — ini syarat utamanya" vars="Selalu nol" />
        </FormulaGrid>
      </div>

      <ContentSection title="🧮 Contoh Soal & Pembahasan">
        <ConceptBox title="Contoh 1: Kereta Cepat">
          <ConceptList
            items={[
              "Sebuah kereta bergerak GLB dengan kecepatan 72 km/jam. Berapa meter jarak yang ditempuh setelah 30 detik?",
              <><strong style={{color:"var(--color-text)",fontWeight:500}}>Langkah 1:</strong> Ubah satuan — v = 72 km/jam = 72 ÷ 3,6 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>20 m/s</em></>,
              <><strong style={{color:"var(--color-text)",fontWeight:500}}>Langkah 2:</strong> s = v × t = 20 × 30 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>600 m</em></>,
              <><strong style={{color:"var(--color-text)",fontWeight:500}}>Jawaban:</strong> Kereta menempuh jarak 600 meter dalam 30 detik.</>,
            ]}
          />
        </ConceptBox>
      </ContentSection>

      <NoteBox>
        Konversi satuan penting! Jika kecepatan dalam km/jam, bagi dengan 3,6
        untuk mendapat m/s. Misalnya: 10 m/s × 3,6 = 36 km/jam.
      </NoteBox>

      <MateriNav next="/materi/glbb" nextLabel="Lanjut ke GLBB" />
    </>
  );
}
