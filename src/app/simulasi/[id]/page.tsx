import { notFound } from "next/navigation";
import Link from "next/link";
import SimulasiViewer from "@/features/simulasi/components/SimulasiViewer";

const META: Record<string, { title: string; desc: string }> = {
  race:      { title: "Balapan GLB vs GLBB", desc: "Bandingkan gerak konstan vs berakselerasi secara visual." },
  fall:      { title: "Jatuh Bebas", desc: "Amati apakah massa mempengaruhi waktu jatuh." },
  vertikal:  { title: "Gerak Vertikal", desc: "Lempar bola ke atas dan amati vektor kecepatan." },
  elevator:  { title: "Lift & Percepatan", desc: "Visualisasi berat semu saat lift berakselerasi." },
  multiball: { title: "Bola Jatuh Multi-Planet", desc: "Bandingkan gravitasi di 4 planet berbeda." },
  landing:   { title: "Pendaratan Pesawat", desc: "Simulasi pendekatan GLB dan pengereman GLBB pesawat saat mendarat." },
};

const VALID_IDS = ["race", "fall", "vertikal", "elevator", "multiball", "landing"];

export async function generateStaticParams() {
  return VALID_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meta = META[id];
  if (!meta) return {};
  return { title: `${meta.title} — Petualangan Gerak`, description: meta.desc };
}

export default async function SimulasiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!VALID_IDS.includes(id)) notFound();

  return (
    <main className="pt-[62px] min-h-screen">
      <div className="px-6 pb-20">
        <div className="max-w-[1080px] mx-auto">
          <div className="pt-8 mb-8">
            <Link
              href="/simulasi"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] px-4 py-2 rounded-lg border no-underline transition-colors duration-200"
              style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}
            >
              ← Semua Simulasi
            </Link>
          </div>
          <SimulasiViewer id={id} />
        </div>
      </div>
    </main>
  );
}
