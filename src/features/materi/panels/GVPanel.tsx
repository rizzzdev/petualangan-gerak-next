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

export default function GVPanel() {
  return (
    <>
      <div className="mb-12">
        <div className="font-mono text-[0.68rem] tracking-[0.14em] uppercase mb-2" style={{ color: "var(--color-teal-400)" }}>
          // 04 — Gerak Vertikal
        </div>
        <h2 className="font-display font-black tracking-tight mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--color-text-bright)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Gerak Vertikal:<br />Melempar dan Gravitasi
        </h2>
        <p className="text-[1.05rem] leading-[1.8]" style={{ color: "var(--color-text-muted)", maxWidth: 640 }}>
          Ketika manusia melempar sesuatu ke atas atau ke bawah, terjadilah perpaduan antara kecepatan awal dan tarikan gravitasi yang konstan.
        </p>
      </div>

      <FenomenaCard title="Roket yang Gagal Melawan Gravitasi">
        <p>Pada tahun 2021, SpaceX menguji coba roket Starship secara vertikal ke atas. Saat bahan bakar habis, gravitasi mulai mendominasi — kecepatan roket berkurang, berhenti sesaat di titik tertinggi, lalu jatuh kembali ke bawah.</p>
        <p>Inilah gerak vertikal ke atas: benda memiliki kecepatan awal ke atas, namun gravitasi terus "menarik" ke bawah, sehingga kecepatan berkurang setiap saat. Pada titik tertinggi, kecepatan menjadi nol.</p>
        <p>Fenomena yang sama terjadi saat pemain basket melempar bola ke ring, saat anak kecil melempar batu ke atas, atau saat petasan meluncur ke langit malam.</p>
      </FenomenaCard>

      <ContentSection title="🎯 Dua Jenis Gerak Vertikal">
        <p>Berbeda dari Gerak Jatuh Bebas yang tidak memiliki kecepatan awal, Gerak Vertikal memiliki kecepatan awal (v₀ ≠ 0):</p>
        <ConceptBox title="1. Gerak Vertikal Ke Atas">
          <ConceptList items={[
            <>Benda dilempar/dilontarkan <strong style={{color:"var(--color-text)",fontWeight:500}}>ke atas</strong> dengan kecepatan awal v₀</>,
            <>Gravitasi bekerja <strong style={{color:"var(--color-text)",fontWeight:500}}>ke bawah</strong>, berlawanan dengan arah gerak awal</>,
            <>Kecepatan <strong style={{color:"var(--color-text)",fontWeight:500}}>berkurang</strong> setiap detik sebesar g = 10 m/s²</>,
            <>Di titik tertinggi: kecepatan = 0, tapi percepatan = g (tetap ke bawah!)</>,
            <>Waktu naik = Waktu turun (gerakannya simetris terhadap waktu)</>,
          ]} />
        </ConceptBox>
        <div className="mt-4">
          <ConceptBox title="2. Gerak Vertikal Ke Bawah">
            <ConceptList items={[
              <>Benda dilempar/didorong <strong style={{color:"var(--color-text)",fontWeight:500}}>ke bawah</strong> dengan kecepatan awal v₀</>,
              <>Gravitasi bekerja <strong style={{color:"var(--color-text)",fontWeight:500}}>ke bawah</strong>, <strong style={{color:"var(--color-text)",fontWeight:500}}>searah</strong> dengan gerak</>,
              <>Kecepatan <strong style={{color:"var(--color-text)",fontWeight:500}}>bertambah</strong> lebih cepat dari GJB (sudah ada v₀)</>,
            ]} />
          </ConceptBox>
        </div>
      </ContentSection>

      <AnalogiCard>
        Gerak vertikal ke atas itu seperti menyelam di kolam renang secara terbalik. Kamu menendang dari dinding kolam (kecepatan awal), lalu air resistansi melambatkanmu (gravitasi). Makin jauh kamu berenang, makin lambat. Akhirnya kamu berhenti sesaat, lalu kembali ke posisi awal. Simetrinya sempurna!
      </AnalogiCard>

      <ContentSection title="🔄 Sifat Simetri Gerak Vertikal Ke Atas">
        <ConceptBox title="Sifat-sifat Simetri:">
          <ConceptList items={[
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>t naik = t turun</strong>: waktu benda naik ke puncak sama persis dengan waktu turun kembali</>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>v kembali = v₀</strong>: kecepatan saat kembali ke posisi awal sama dengan kecepatan awalnya</>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Di puncak: v = 0</strong>, tapi benda tidak berhenti seterusnya — sesaat saja sebelum jatuh kembali</>,
          ]} />
        </ConceptBox>
      </ContentSection>

      <div className="mb-12">
        <h3 className="font-display font-bold text-[1.2rem] mb-5" style={{ color: "var(--color-text-bright)" }}>
          📐 Rumus Gerak Vertikal
        </h3>
        <FormulaGrid>
          <FormulaCard name="Kecepatan (Ke Atas)" eq="v = v₀ - g·t" desc="Kecepatan berkurang karena g berlawanan arah" vars="Tanda minus = perlambatan" />
          <FormulaCard name="Ketinggian pada waktu t" eq="h = v₀t - ½gt²" desc="Posisi benda di atas titik lempar" vars="h bernilai positif saat di atas" />
          <FormulaCard name="Tinggi Maksimum" eq="h_maks = v₀² / 2g" desc="Ketinggian tertinggi yang dicapai benda" vars="Saat v = 0" />
          <FormulaCard name="Waktu ke Puncak" eq="t_puncak = v₀ / g" desc="Waktu untuk mencapai titik tertinggi" vars="Dari v = v₀ - gt, saat v = 0" />
          <FormulaCard name="Waktu Total" eq="t_total = 2v₀ / g" desc="Waktu naik + waktu turun" vars="t_total = 2 × t_puncak" />
          <FormulaCard name="Gerak Vertikal ke Bawah" eq="v = v₀ + g·t" desc="Kecepatan bertambah (searah g)" vars="s = v₀t + ½gt²" />
        </FormulaGrid>
      </div>

      <ContentSection title="🧮 Contoh Soal Lengkap">
        <ConceptBox title="Bola Basket Dilempar ke Atas">
          <ConceptList items={[
            "Bola dilempar ke atas dengan v₀ = 20 m/s. (g = 10 m/s²)",
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Tinggi maksimum:</strong> h_maks = v₀²/2g = 400/20 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>20 m</em></>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Waktu ke puncak:</strong> t = v₀/g = 20/10 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>2 detik</em></>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Waktu total:</strong> t_total = 2×2 = <em style={{color:"var(--color-teal-400)",fontStyle:"normal"}}>4 detik</em></>,
            <><strong style={{color:"var(--color-text)",fontWeight:500}}>Catatan:</strong> Kecepatan di t=1s sama besarnya dengan di t=3s — ini simetri gerak vertikal!</>,
          ]} />
        </ConceptBox>
      </ContentSection>

      <NoteBox>
        Jangan bingung dengan tanda negatif pada kecepatan! Tanda negatif hanya menunjukkan arah — negatif berarti ke bawah, positif berarti ke atas. Besar kecepatan (tanpa tanda) = kelajuan (speed).
      </NoteBox>

      <MateriNav prev="/materi/gjb" prevLabel="Gerak Jatuh Bebas" next="/kuis" nextLabel="Uji Pemahaman di Kuis" />
    </>
  );
}
