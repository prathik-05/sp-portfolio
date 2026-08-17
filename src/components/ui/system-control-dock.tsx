"use client";

import React from "react";
import { ArrowUp, Terminal } from "lucide-react";
import { useSPDev } from "@/context/spdev-provider";
import { playClick } from "@/lib/spidey-audio";

export function SystemControlDock() {
  const { setCommandPaletteOpen } = useSPDev();

  const scrollToTop = () => {
    playClick();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 font-mono">
      <button
        onClick={() => {
          playClick();
          setCommandPaletteOpen(true);
        }}
        className="hud-glass-panel grid h-9 w-9 place-items-center rounded-full border border-[var(--suit-border)] bg-black/80 text-white shadow-lg transition hover:scale-110"
        title="Open Command Console (Cmd+K)"
        aria-label="Open Command Console"
      >
        <Terminal className="h-4 w-4 text-[var(--suit-web)]" />
      </button>

      <button
        onClick={scrollToTop}
        className="hud-glass-panel grid h-9 w-9 place-items-center rounded-full border border-[var(--suit-border)] bg-black/80 text-white shadow-lg transition hover:scale-110"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4 text-[var(--suit-accent)]" />
      </button>
    </div>
  );
}