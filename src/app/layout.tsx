import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Bangers } from "next/font/google";
import { Anton } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", preload: true });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", preload: true });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers", preload: true });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", preload: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL("https://prathik-05.vercel.app"),
  title: {
    default: "Prathik Salla",
    template: "%s | Prathik Salla"
  },
  description:
    "Portfolio of Prathik Salla, a Software Engineer specializing in AI/ML, Agentic RAG architectures, computer vision pipelines, and scalable backend applications.",
  keywords: [
    "Prathik Salla",
    "Software Engineer",
    "AI/ML Engineer",
    "Machine Learning",
    "Computer Vision",
    "RAG",
    "Python",
    "Next.js",
    "Portfolio"
  ],
  authors: [{ name: "Prathik Salla", url: "https://github.com/prathik-05" }],
  creator: "Prathik Salla",
  openGraph: {
    title: "Prathik Salla",
    description:
      "Modern portfolio showcasing AI/ML applications, RAG video intelligence, computer vision pipelines, and curated certifications.",
    url: "https://prathik-05.vercel.app",
    siteName: "Prathik Salla Portfolio",
    images: [
      {
        url: "/images/spidey-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Prathik Salla Software Engineer Portfolio"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathik Salla",
    description:
      "Software engineering portfolio featuring real-world AI/ML systems and production-oriented architectures.",
    images: ["/images/spidey-hero.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${bangers.variable} ${anton.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
