import { notFound } from "next/navigation";
import MateriDetailShell from "@/features/materi/components/MateriDetailShell";
import GLBPanel from "@/features/materi/panels/GLBPanel";
import GLBBPanel from "@/features/materi/panels/GLBBPanel";
import GJBPanel from "@/features/materi/panels/GJBPanel";
import GVPanel from "@/features/materi/panels/GVPanel";

const META: Record<string, { title: string; desc: string }> = {
  glb:  { title: "GLB — Gerak Lurus Beraturan", desc: "Benda yang bergerak lurus dengan kecepatan konstan dan percepatan nol." },
  glbb: { title: "GLBB — Gerak Lurus Berubah Beraturan", desc: "Gerak benda dengan percepatan konstan." },
  gjb:  { title: "Gerak Jatuh Bebas", desc: "Benda jatuh hanya dipengaruhi gravitasi, tanpa hambatan udara." },
  gv:   { title: "Gerak Vertikal", desc: "Gerak benda ke atas atau ke bawah dengan kecepatan awal tertentu." },
};

export async function generateStaticParams() {
  return [{ slug: "glb" }, { slug: "glbb" }, { slug: "gjb" }, { slug: "gv" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = META[slug];
  if (!meta) return {};
  return { title: `${meta.title} — Petualangan Gerak`, description: meta.desc };
}

export default async function MateriDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const panel =
    slug === "glb"  ? <GLBPanel /> :
    slug === "glbb" ? <GLBBPanel /> :
    slug === "gjb"  ? <GJBPanel /> :
    slug === "gv"   ? <GVPanel /> :
    null;

  if (!panel) notFound();

  return (
    <MateriDetailShell activeSlug={slug}>
      {panel}
    </MateriDetailShell>
  );
}
