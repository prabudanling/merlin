import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/merlin/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MERLIN 2030 — Masyarakat Ekosistem Rumput Laut Indonesia",
  description:
    "MERLIN 2030: Ekosistem terpadu rumput laut Indonesia senilai Rp680 Triliun — 40 Eco Blue Industrial Park, 40 Blue Tourism, 100+ produk hilir, 5 juta lapangan kerja, 12 juta ton CO2/tahun. Indonesia menjadi Pusat Industri Hilirisasi Rumput Laut Dunia 2030.",
  keywords: [
    "MERLIN",
    "MERLIN 2030",
    "rumput laut",
    "seaweed",
    "blue economy",
    "ekonomi biru",
    "eco blue industrial park",
    "blue tourism",
    "blue carbon",
    "hilirisasi",
    "Indonesia",
    "karagenan",
    "bioplastic",
    "sovereign",
  ],
  authors: [{ name: "MERLIN — Dewan Pakar 46 Lintas Bidang" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MERLIN 2030 — Laut Berkemakmuran, Nusantara Berdaulat",
    description:
      "Master Document 165 PGA. Grand Design Ekosistem Rumput Laut Indonesia. 20 Domain × 165 Dokumen. Rp680 Triliun investasi menuju Indonesia Pusat Industri Rumput Laut Dunia 2030.",
    siteName: "MERLIN 2030",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERLIN 2030",
    description: "Masyarakat Ekosistem Rumput Laut Indonesia — Sovereign-Grade Seaweed Ecosystem",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
