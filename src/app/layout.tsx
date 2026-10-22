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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sp-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prathik Salla — Software Engineer (AI/ML & Systems)",
    template: "%s | Prathik Salla"
  },
  description:
    "Engineering portfolio of Prathik Salla, specializing in AI/ML architectures, agentic video RAG, real-time computer vision pipelines, and production backend systems.",
  keywords: [
    "Prathik Salla",
    "Software Engineer",
    "AI/ML Engineer",
    "Machine Learning",
    "Computer Vision",
    "YOLOv11",
    "RAG",
    "Python",
    "Java",
    "Spring Boot",
    "Streamlit",
    "Next.js",
    "Portfolio"
  ],
  authors: [{ name: "Prathik Salla", url: "https://github.com/prathik-05" }],
  creator: "Prathik Salla",
  openGraph: {
    title: "Prathik Salla — Software Engineer (AI/ML & Systems)",
    description:
      "Engineering portfolio showcasing agentic RAG video intelligence, real-time YOLOv11 streaming vision pipelines, automated dataset intelligence, and verified systems.",
    url: siteUrl,
    siteName: "Prathik Salla Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Prathik Salla Engineering Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathik Salla — Software Engineer (AI/ML & Systems)",
    description:
      "Software engineering portfolio featuring real-world AI/ML systems, computer vision streaming, and production-oriented architectures.",
    images: ["/opengraph-image"]
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
      <body className="antialiased selection:bg-red-600 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
