"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Skull } from "lucide-react";
import { useSPDev } from "@/context/spdev-provider";
import { playClick } from "@/lib/spidey-audio";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useSPDev();
  const isVenom = themeMode === "venom";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    const rect = e.currentTarget.getBoundingClientRect();
    setThemeMode(isVenom ? "classic" : "venom", {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  };

  return (
    <button
      role="switch"
      aria-checked={isVenom}
      onClick={handleToggle}
      aria-label="Toggle Theme Mode (Classic vs Venom Symbiote)"
      title="Toggle Theme Mode (Classic vs Venom Symbiote)"
      className={cn(
        "group relative flex items-center rounded-full border p-1 backdrop-blur-md transition-all duration-300",
        isVenom
          ? "border-white/40 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/70"
          : "border-white/12 bg-white/[0.04] shadow-lg hover:border-white/25"
      )}
    >
      {/* Sliding Knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={cn(
          "absolute top-1 bottom-1 z-0 w-[calc(50%-2px)] rounded-full",
          isVenom
            ? "left-[calc(50%+1px)] bg-gradient-to-br from-white/90 to-slate-400/90 shadow-[0_0_16px_rgba(255,255,255,0.5)]"
            : "left-1 bg-gradient-to-br from-red-500/90 to-red-700/90 shadow-[0_0_16px_rgba(229,9,20,0.6)]"
        )}
      />

      {/* Classic Side */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider transition-all duration-300",
          isVenom ? "text-slate-500 hover:text-slate-300" : "text-white"
        )}
      >
        <motion.span
          animate={isVenom ? { rotate: 0, scale: 0.85, opacity: 0.45 } : { rotate: 360, scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex"
        >
          <Zap className="h-3.5 w-3.5" />
        </motion.span>
        CLASSIC
      </span>

      {/* Venom Side */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider transition-all duration-300",
          isVenom ? "text-white" : "text-slate-500 hover:text-slate-300"
        )}
      >
        <motion.span
          animate={isVenom ? { rotate: [0, -12, 10, 0], scale: 1, opacity: 1 } : { rotate: 0, scale: 0.85, opacity: 0.45 }}
          transition={{ duration: 0.5 }}
          className="inline-flex"
        >
          <Skull className="h-3.5 w-3.5" />
        </motion.span>
        VENOM
      </span>

      {/* Drip drop that appears briefly when entering Venom */}
      <AnimatePresence>
        {isVenom ? (
          <motion.span
            initial={{ y: -4, opacity: 0, scale: 0.6 }}
            animate={{ y: 8, opacity: [0, 0.9, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-1.5 right-3 z-20 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
        ) : null}
      </AnimatePresence>
    </button>
  );
}
