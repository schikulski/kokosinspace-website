import type { Metadata } from "next";
import { Anton, Shadows_Into_Light } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const shadows = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kokos in Space Records",
  description: "Independent label and studio, Oslo. Six bands and a cat.",
  metadataBase: new URL("https://kokosinspace.com"),
  openGraph: {
    title: "Kokos in Space Records",
    description: "Independent label and studio, Oslo. Six bands and a cat.",
    url: "https://kokosinspace.com",
    siteName: "Kokos in Space Records",
    images: [{ url: "/images/patch-color.png", width: 900, height: 900 }],
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${shadows.variable}`}>
      <body>{children}</body>
    </html>
  );
}
