import type { Metadata } from "next";
import { ProfilePageContent } from "~/features/profil";

export const metadata: Metadata = {
  title: "Profil Pengembang — Petualangan Gerak",
  description:
    "Kenali pengembang di balik Petualangan Gerak — web developer yang membangun simulasi fisika interaktif untuk pembelajaran.",
};

export default function ProfilPage() {
  return <ProfilePageContent />;
}
