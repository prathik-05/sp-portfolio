"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";

export function ScrollProgress() {
  const { currentCard, themeMode } = useSPDev();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

  // Only show on Card 2 (where normal document scroll is active)
  if (currentCard !== 2) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed left-0 right-0 top-0 z-[99999] h-[3px] origin-left ${
        themeMode === "venom" ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" : "bg-[var(--suit-accent)] shadow-[0_0_12px_var(--suit-glow)]"
      }`}
    />
  );
}
