"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command, ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSPDev } from "@/context/spdev-provider";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { playClick } from "@/lib/spidey-audio";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    currentCard,
    setCard,
    setCommandPaletteOpen,
    themeMode
  } = useSPDev();
  const isVenom = themeMode === "venom";

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:px-8">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/8 bg-black/35 px-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-300 sm:px-4"
        )}
      >
        {/* SP//DEV Insignia */}
        <button
          onClick={() => setCard(1)}
          className="flex items-center gap-2.5 group text-left"
        >
          <div
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full transition-all duration-300",
              isVenom
                ? "bg-white text-black border border-white/40"
                : "bg-[var(--suit-accent)] text-[var(--suit-accent-ink)] shadow-md shadow-[var(--suit-glow)]"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="9" r="2.4" />
              <path d="M12 11.4 L12 20" />
              <path d="M12 12.8 Q12 15 14 16" />
              <path d="M12 12.8 Q12 15 10 16" />
              <path d="M9.6 9 Q7 8.2 5 9" />
              <path d="M9.6 9 Q7 9.8 5 9" />
              <path d="M14.4 9 Q17 8.2 19 9" />
              <path d="M14.4 9 Q17 9.8 19 9" />
              <path d="M10.5 10.5 Q8.5 11 7.5 12.5" />
              <path d="M13.5 10.5 Q15.5 11 16.5 12.5" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span
              className="block text-sm font-bold tracking-wide text-white"
              style={{ fontFamily: "var(--font-display-aggressive)" }}
            >
              {isVenom ? "PRATHIK" : "Prathik Salla"}
            </span>
          </div>
        </button>

        {/* Card Actions */}
        {currentCard === 2 ? (
          <div className="hidden items-center gap-1.5 text-xs sm:flex">
            <ResumeViewer
              trigger={
                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium text-slate-300 transition hover:text-white">
                  <FileText className="h-3.5 w-3.5 text-[var(--suit-accent)]" /> Résumé
                </span>
              }
            />
            <button
              onClick={() => {
                playClick();
                setCard(1);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Hero Landing
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-1.5 text-xs sm:flex">
            <ResumeViewer
              trigger={
                <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium text-slate-300 transition hover:text-white">
                  <FileText className="h-3.5 w-3.5 text-[var(--suit-accent)]" /> Résumé
                </span>
              }
            />
            <button
              onClick={() => {
                playClick();
                setCard(2);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--suit-accent)] px-4 py-1.5 font-semibold text-[var(--suit-accent-ink)] shadow-md shadow-[var(--suit-glow)] transition hover:opacity-95"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Persistent Theme Toggle + Tools */}
        <div className="flex items-center gap-1">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Command Palette trigger */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setCommandPaletteOpen(true);
            }}
            className="hidden sm:grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Open Command Palette"
            title="Command Palette (Cmd+K)"
          >
            <Command className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-white/[0.06] hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 grid max-w-5xl gap-1 rounded-2xl p-3 md:hidden text-xs border border-white/8 bg-black/70 backdrop-blur-2xl shadow-2xl shadow-black/40"
          >
            <ResumeViewer
              label="View Résumé"
              trigger={
                <span className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 font-medium text-slate-200 hover:bg-white/[0.08]">
                  <span>View Résumé</span>
                  <FileText className="h-4 w-4 text-[var(--suit-accent)]" />
                </span>
              }
            />
            <button
              onClick={() => {
                setCard(currentCard === 1 ? 2 : 1);
                setOpen(false);
              }}
              className="rounded-xl px-4 py-3 font-semibold text-center text-[var(--suit-accent-ink)] bg-[var(--suit-accent)]"
            >
              {currentCard === 1 ? "Explore Full Portfolio →" : "← Back to Hero Landing"}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}