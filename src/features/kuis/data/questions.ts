export interface Question {
  topic: string;
  q: string;
  opts: string[];
  ans: number;
  feedback: {
    ok: string;
    ng: string;
    explain: string;
    concept: string;
    formula: string;
  };
}

export const QUESTIONS: Question[] = [
  {
    topic: "GLB",
    q: "Sebuah bus bergerak di jalan tol dengan speedometer yang menunjukkan angka tetap di 90 km/jam selama 20 menit. Apa yang bisa disimpulkan tentang gerak bus tersebut?",
    opts: [
      "Bus mengalami percepatan karena bergerak",
      "Bus bergerak dengan GLB karena kecepatan konstan dan percepatan = 0",
      "Bus bergerak dengan GLBB karena jaraknya terus bertambah",
      "Bus bergerak melingkar karena mengikuti lengkung bumi",
    ],
    ans: 1,
    feedback: {
      ok: "Tepat sekali! Speedometer diam di 90 km/jam berarti kecepatan konstan.",
      ng: "Perhatikan kata kunci: speedometer menunjukkan angka tetap — artinya kecepatan tidak berubah = GLB.",
      explain: "GLB (Gerak Lurus Beraturan) terjadi ketika kecepatan benda konstan sepanjang waktu. Speedometer tidak bergerak (menunjukkan 90 km/jam terus), berarti tidak ada perubahan kecepatan, sehingga percepatan = 0. Jarak terus bertambah bukan ciri GLBB — dalam GLB pun jarak selalu bertambah, hanya saja secara linear.",
      concept: "Konsep yang diuji: Definisi GLB — benda bergerak lurus dengan kecepatan konstan dan percepatan nol. Perbedaan utama GLB vs GLBB adalah ada/tidaknya percepatan.",
      formula: "s = v × t",
    },
  },
  {
    topic: "GLB",
    q: "Kereta ekspres bergerak GLB menempuh jarak 360 km dalam 4 jam. Berapakah kecepatan kereta dan jarak yang ditempuh dalam 30 menit pertama?",
    opts: [
      "v = 90 km/jam, s = 90 km",
      "v = 90 km/jam, s = 45 km",
      "v = 80 km/jam, s = 40 km",
      "v = 120 km/jam, s = 60 km",
    ],
    ans: 1,
    feedback: {
      ok: "Sempurna! v = 360/4 = 90 km/jam, lalu s = 90 × 0.5 = 45 km.",
      ng: "Ingat: v = s/t = 360/4 = 90 km/jam. Untuk 30 menit = 0,5 jam: s = 90 × 0,5 = 45 km.",
      explain: "Langkah 1: v = total jarak / total waktu = 360 km / 4 jam = 90 km/jam. Langkah 2: Dalam GLB, kecepatan selalu sama, jadi s = v × t = 90 km/jam × 0,5 jam = 45 km. Perlu diingat untuk mengkonversi 30 menit = 0,5 jam sebelum menghitung!",
      concept: "Konsep yang diuji: Rumus GLB s = v × t dan konversi satuan waktu. Dalam GLB, kecepatan bisa dihitung dari seluruh perjalanan, lalu digunakan untuk mencari jarak di selang waktu manapun.",
      formula: "v = s/t = 360/4 = 90 km/jam → s = 90 × 0,5 = 45 km",
    },
  },
  {
    topic: "GLBB",
    q: "Mobil balap berakselerasi dari diam dengan percepatan konstan 8 m/s². Berapa kecepatan dan jarak yang ditempuh setelah 5 detik?",
    opts: [
      "v = 40 m/s, s = 100 m",
      "v = 40 m/s, s = 200 m",
      "v = 35 m/s, s = 100 m",
      "v = 40 m/s, s = 150 m",
    ],
    ans: 0,
    feedback: {
      ok: "Benar! vₜ = 0 + 8×5 = 40 m/s dan s = 0 + ½×8×25 = 100 m.",
      ng: "Gunakan rumus GLBB: vₜ = v₀ + at = 0 + 8×5 = 40 m/s. Untuk jarak: s = v₀t + ½at² = 0 + ½×8×5² = 4×25 = 100 m.",
      explain: "Ini adalah GLBB dipercepat dari keadaan diam (v₀ = 0). Rumus kecepatan: vₜ = v₀ + at = 0 + 8×5 = 40 m/s. Rumus jarak: s = v₀t + ½at² = 0×5 + ½×8×5² = 0 + ½×8×25 = 100 m.",
      concept: "Konsep yang diuji: Rumus GLBB vₜ = v₀ + at dan s = v₀t + ½at². Saat v₀ = 0 (dari keadaan diam), rumus jarak menjadi s = ½at².",
      formula: "vₜ = v₀ + at | s = v₀t + ½at²",
    },
  },
  {
    topic: "GLBB",
    q: "Sebuah mobil yang melaju 72 km/jam direm dan berhenti dalam 4 detik. Berapakah perlambatan (deselerasi) dan jarak pengereman?",
    opts: [
      "a = -4 m/s², s = 30 m",
      "a = -5 m/s², s = 40 m",
      "a = -5 m/s², s = 50 m",
      "a = -4 m/s², s = 40 m",
    ],
    ans: 1,
    feedback: {
      ok: "Tepat! v₀ = 72/3,6 = 20 m/s. a = (0-20)/4 = -5 m/s². s = 20×4 + ½×(-5)×16 = 80-40 = 40 m.",
      ng: "Pertama konversi: v₀ = 72 km/jam ÷ 3,6 = 20 m/s. Lalu a = (vₜ-v₀)/t = (0-20)/4 = -5 m/s². s = 20×4 - ½×5×16 = 40 m.",
      explain: "Langkah 1: Konversi — v₀ = 72 km/jam ÷ 3,6 = 20 m/s. vₜ = 0, t = 4 s. Langkah 2: a = (vₜ - v₀)/t = (0 - 20)/4 = -5 m/s² (negatif = perlambatan). Langkah 3: s = v₀t + ½at² = 20(4) + ½(-5)(16) = 80 - 40 = 40 m.",
      concept: "Konsep yang diuji: GLBB diperlambat (deselerasi) dan konversi satuan km/jam ke m/s. Rumus v̄ = (v₀+vₜ)/2 sangat praktis saat mencari jarak.",
      formula: "a = Δv/t | s = v₀t + ½at² atau s = v̄×t",
    },
  },
  {
    topic: "GLBB",
    q: "Grafik v-t (kecepatan terhadap waktu) sebuah benda berbentuk garis miring ke bawah dimulai dari v = 30 m/s hingga v = 0. Ini menunjukkan...",
    opts: [
      "Benda bergerak GLB karena ada dalam grafik v-t",
      "Benda bergerak GLBB dipercepat",
      "Benda bergerak GLBB diperlambat (deselerasi)",
      "Benda bergerak melingkar dengan kecepatan berkurang",
    ],
    ans: 2,
    feedback: {
      ok: "Betul! Garis miring turun pada grafik v-t = kecepatan berkurang = GLBB diperlambat.",
      ng: "Garis miring pada grafik v-t menunjukkan percepatan (gradien = a). Jika miring turun → kecepatan berkurang → GLBB diperlambat.",
      explain: "Cara membaca grafik v-t: (1) Garis HORIZONTAL = GLB (a=0). (2) Garis miring NAIK = GLBB dipercepat (a positif). (3) Garis miring TURUN = GLBB diperlambat (a negatif). Gradien (kemiringan) garis v-t = percepatan (a).",
      concept: "Konsep yang diuji: Membaca dan menafsirkan grafik v-t. Gradien grafik v-t = percepatan (a), dan luas di bawah grafik v-t = jarak yang ditempuh.",
      formula: "Gradien v-t = a | Luas bawah v-t = s",
    },
  },
  {
    topic: "GJB",
    q: "Batu dijatuhkan dari menara setinggi 45 m tanpa kecepatan awal. Dengan g = 10 m/s², berapa lama batu jatuh dan berapa kecepatannya saat menyentuh tanah?",
    opts: [
      "t = 2 s, v = 20 m/s",
      "t = 3 s, v = 30 m/s",
      "t = 3 s, v = 45 m/s",
      "t = 4,5 s, v = 45 m/s",
    ],
    ans: 1,
    feedback: {
      ok: "Sempurna! t = √(2h/g) = √(90/10) = √9 = 3 s. v = gt = 10×3 = 30 m/s.",
      ng: "Gunakan: h = ½gt² → t = √(2h/g) = √(2×45/10) = √9 = 3 s. Lalu v = gt = 10×3 = 30 m/s.",
      explain: "GJB: v₀ = 0, a = g = 10 m/s². Waktu jatuh: t = √(2h/g) = √(2×45/10) = √9 = 3 detik. Kecepatan di tanah: v = gt = 10×3 = 30 m/s. Verifikasi: v² = 2gh = 2×10×45 = 900 → v = 30 m/s ✓",
      concept: "Konsep yang diuji: Gerak Jatuh Bebas sebagai kasus khusus GLBB. GJB memiliki v₀ = 0 dan a = g.",
      formula: "t = √(2h/g) | v = gt | v² = 2gh",
    },
  },
  {
    topic: "GJB",
    q: "Dua bola dijatuhkan bersamaan dari ketinggian sama: bola A bermassa 2 kg dan bola B bermassa 200 gram. Mengabaikan hambatan udara, mana yang mendarat lebih dulu?",
    opts: [
      "Bola A (2 kg) karena lebih berat",
      "Bola B (200 g) karena lebih ringan dan lebih mudah dipercepat",
      "Keduanya mendarat bersamaan",
      "Bergantung pada bentuk bola",
    ],
    ans: 2,
    feedback: {
      ok: "Benar! Galileo sudah membuktikan ini — semua benda jatuh dengan percepatan yang sama (g), tanpa pengaruh massa.",
      ng: "Ingat prinsip Galileo: dalam kondisi tanpa hambatan udara, semua benda jatuh dengan percepatan yang sama = g, tidak peduli massanya.",
      explain: "Percepatan gravitasi (g) bekerja sama pada semua benda, tanpa memandang massa. Rumus GJB: h = ½gt² — tidak ada variabel massa! Astronot Apollo 15 membuktikan ini di Bulan (tanpa atmosfer) dengan menjatuhkan palu dan bulu bersamaan.",
      concept: "Konsep yang diuji: Prinsip Galileo tentang Gerak Jatuh Bebas — percepatan gravitasi (g) tidak bergantung pada massa benda.",
      formula: "h = ½gt² → percepatan g sama untuk semua massa",
    },
  },
  {
    topic: "GJB",
    q: "Sebuah benda jatuh bebas dan mencapai kecepatan 60 m/s. Berapa ketinggian awalnya? (g = 10 m/s²)",
    opts: ["150 m", "180 m", "200 m", "360 m"],
    ans: 1,
    feedback: {
      ok: "Tepat! v² = 2gh → h = v²/2g = 3600/20 = 180 m.",
      ng: "Gunakan v² = 2gh. Maka h = v²/(2g) = 60²/(2×10) = 3600/20 = 180 m.",
      explain: "Dari rumus v² = 2gh: h = v²/(2g) = (60)²/(2×10) = 3600/20 = 180 m. Ingat bahwa 60² = 3600, bukan 360. Rumus ini menghubungkan kecepatan dan ketinggian secara langsung tanpa variabel waktu.",
      concept: "Konsep yang diuji: Rumus v² = 2gh pada GJB. Berguna saat waktu tidak diketahui atau tidak diperlukan.",
      formula: "v² = 2gh → h = v²/2g = 3600/20 = 180 m",
    },
  },
  {
    topic: "Gerak Vertikal",
    q: "Bola dilempar vertikal ke atas dengan kecepatan awal 20 m/s. Berapa ketinggian maksimum yang dicapai dan waktu yang dibutuhkan untuk mencapainya? (g = 10 m/s²)",
    opts: [
      "h_maks = 40 m, t = 4 s",
      "h_maks = 20 m, t = 2 s",
      "h_maks = 30 m, t = 3 s",
      "h_maks = 20 m, t = 4 s",
    ],
    ans: 1,
    feedback: {
      ok: "Sempurna! h_maks = v₀²/2g = 400/20 = 20 m. t_puncak = v₀/g = 20/10 = 2 s.",
      ng: "h_maks = v₀²/(2g) = 20²/(2×10) = 400/20 = 20 m. t_puncak = v₀/g = 20/10 = 2 s.",
      explain: "Pada gerak vertikal ke atas, di titik tertinggi v = 0. Waktu ke puncak: dari v = v₀ - gt → 0 = 20 - 10t → t = 2 s. Ketinggian maks: h = v₀²/(2g) = (20)²/(2×10) = 20 m.",
      concept: "Konsep yang diuji: Gerak Vertikal ke Atas — ketinggian maks dan waktu ke puncak. Di titik tertinggi, kecepatan = 0 (sesaat).",
      formula: "h_maks = v₀²/2g | t_puncak = v₀/g",
    },
  },
  {
    topic: "Gerak Vertikal",
    q: "Bola dilempar vertikal ke atas dengan v₀ = 30 m/s. Berapakah waktu total bola di udara (dari dilempar hingga kembali ke posisi semula)? (g = 10 m/s²)",
    opts: ["3 detik", "6 detik", "9 detik", "4 detik"],
    ans: 1,
    feedback: {
      ok: "Benar! t_naik = v₀/g = 30/10 = 3 s. Karena t_naik = t_turun, total = 2 × 3 = 6 s.",
      ng: "Waktu ke puncak: t_naik = v₀/g = 30/10 = 3 s. Karena gerak vertikal simetris (t_naik = t_turun), waktu total = 2 × 3 = 6 s.",
      explain: "Sifat simetri gerak vertikal ke atas: waktu naik = waktu turun. Waktu ke puncak: t_puncak = v₀/g = 30/10 = 3 s. Waktu total = 2 × t_puncak = 6 s. Bukti: v = v₀ - g(t_total) → -30 = 30 - 10t → t = 6 s ✓",
      concept: "Konsep yang diuji: Sifat simetri gerak vertikal ke atas. Waktu naik = waktu turun, dan kecepatan saat kembali = kecepatan awal (besar sama).",
      formula: "t_total = 2v₀/g = 2×30/10 = 6 s",
    },
  },
];
