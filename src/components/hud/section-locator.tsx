"use client";

import React, { useEffect, useState } from "react";

// Decorative spatial anchors rendered by the HUD — each section is a point in the same
// cinematic grid the backdrop frames. (Cosmetic readout, not wired to a 3D camera.)
const SECTIONS = [
  { id: "home", label: "HERO LANDING", coords: "x0.0 y-0.1 z4.4" },
  { id: "about", label: "IDENTITY SPEC", coords: "x-1.8 y0.8 z2.8" },
  { id: "projects", label: "WEB OF PROJECTS", coords: "x0.0 y1.8 z1.2" },
  { id: "skills", label: "SUIT ARSENAL", coords: "x2.2 y1.0 z-0.8" },
  { id: "experience", label: "MISSION LOG", coords: "x0.0 y-0.6 z-2.8" },
  { id: "credentials", label: "CREDENTIAL VAULT", coords: "x-2.0 y0.5 z-4.2" },
  { id: "contact", label: "SIGNAL TRANSMISSION", coords: "x0.0 y0.3 z-5.8" }
] as const;

export function SectionLocator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
          if (idx >= 0) setActive(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const current = SECTIONS[active];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-20 hidden select-none lg:block"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 py-2 font-mono backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--suit-accent)] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--suit-accent)]" />
        </span>
        <div className="text-[10px] uppercase leading-none tracking-[0.16em]">
          <span className="text-slate-500">SECTOR</span>
          <span className="text-slate-600 mx-1.5">/</span>
          <span className="font-bold text-slate-100">{current.label}</span>
          <span className="text-slate-600 mx-1.5">/</span>
          <span className="text-[var(--suit-web)] font-bold tabular-nums">
            0{active + 1}—{SECTIONS.length}
          </span>
        </div>
        <span className="hidden text-[9px] text-slate-600 xl:block tabular-nums">{current.coords}</span>
      </div>
    </div>
  );
}