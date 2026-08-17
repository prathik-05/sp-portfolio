"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useSPDev } from "@/context/spdev-provider";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { reducedMotion, currentCard } = useSPDev();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true
    });

    // Expose for programmatic card/modal jump animations (see spdev-provider).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenis.destroy();
    };
  }, [reducedMotion]);

  // Lock the scroll engine only while the fixed hero card (Card 1) is actually
  // mounted on the home page. On standalone pages (project case studies, notes)
  // there is no hero card, so scrolling must remain fully free.
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!lenis) return;
    const heroCardPresent = Boolean(document.querySelector("[data-hero-card]"));
    if (currentCard === 1 && heroCardPresent) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [currentCard, reducedMotion]);

  return children;
}