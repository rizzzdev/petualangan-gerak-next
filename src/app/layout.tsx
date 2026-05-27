import type { Metadata } from "next";
import { Syne, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/features/navigation/components/Navbar";
import Footer from "@/features/shared/components/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Petualangan Gerak — Fisika Interaktif",
  description:
    "Belajar fisika tentang gerak lurus dari yang paling dasar sampai gerak jatuh bebas — dengan penjelasan sederhana, simulasi visual, dan kuis interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body
        className="min-h-screen overflow-x-hidden"
        style={{
          background: "var(--color-bg)",
          color: "var(--color-text)",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          lineHeight: 1.75,
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
