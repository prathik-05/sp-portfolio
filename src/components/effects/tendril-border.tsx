"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";

export function TendrilBorder() {
  const { themeMode, reducedMotion } = useSPDev();

  if (themeMode !== "venom" || reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] overflow-hidden rounded-t-[inherit]">
      <motion.div
        className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--suit-accent)]/60 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
