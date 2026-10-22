"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  id?: string;
}

export function SpotlightCard({
  children,
  className,
  glowColor,
  id
}: SpotlightCardProps) {
  const { themeMode } = useSPDev();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isVenom = themeMode === "venom";
  const defaultGlow = isVenom
    ? "rgba(255, 255, 255, 0.14)"
    : "rgba(229, 9, 20, 0.20)";

  const activeColor = glowColor ?? defaultGlow;
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${activeColor}, transparent 70%)`;

  return (
    <motion.div
      id={id}
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]",
        className
      )}
    >
      <motion.div
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
