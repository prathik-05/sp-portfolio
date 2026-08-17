"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { SpiderCursor } from "@/components/effects/spider-cursor";
import { WebShooter } from "@/components/effects/web-shooter";
import { HangingSpider } from "@/components/effects/hanging-spider";
import { WebCorners } from "@/components/effects/web-corners";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CommandCenter } from "@/components/navigation/command-center";
import { SystemControlDock } from "@/components/ui/system-control-dock";
import { CinematicBackdrop } from "@/components/effects/cinema-backdrop";
import { SymbioteTransition } from "@/components/effects/symbiote-transition";
import { SPDevProvider, useSPDev } from "@/context/spdev-provider";

// Venom Mode 2D Metaball Canvas background lazy-loaded only when Venom Mode is active (0 bundle cost for Classic mode)
const LazyVenomMetaballs = dynamic(
  () => import("@/components/effects/venom-metaballs").then((m) => m.VenomMetaballs),
  {
    ssr: false,
    loading: () => null
  }
);

// GSAP scroll choreography split out so gsap/ScrollTrigger never touches main bundle.
const ScrollDirector = dynamic(() => import("@/components/effects/scroll-director").then((m) => m.ScrollDirector), {
  ssr: false,
  loading: () => null
});

function SiteChromeContent({ children }: { children: React.ReactNode }) {
  const { currentCard, themeMode } = useSPDev();

  return (
    <main className="web-background relative isolate min-h-screen text-slate-100 transition-colors duration-500">
      {/* Background: Classic 2D Backdrop vs Lazy-Loaded Venom 2D Canvas Metaballs */}
      {themeMode === "venom" ? <LazyVenomMetaballs /> : <CinematicBackdrop />}

      {/* Full-Screen Symbiote Dark Liquid Consume Transition Canvas */}
      <SymbioteTransition />

      {/* Cinematic grade overlay: vignette + legibility tint */}
      <div aria-hidden className="cinematic-vignette pointer-events-none fixed inset-0 z-[3]" />

      {/* Original spider-themed cursor — one cursor for both themes (native fallback preserved). */}
      <SpiderCursor />

      <WebShooter />
      <HangingSpider key={`spider-${currentCard}`} />
      <CommandCenter />
      <Navbar />
      <SystemControlDock />
      <ScrollDirector />

      {/* Main Portfolio Content */}
      <div className="relative z-10">
        <SmoothScroll>
          <WebCorners />
          {children}
        </SmoothScroll>
      </div>
    </main>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <SPDevProvider>
      <SiteChromeContent>{children}</SiteChromeContent>
    </SPDevProvider>
  );
}