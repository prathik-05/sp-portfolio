"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  FolderGit2,
  Cpu,
  Award,
  Send,
  FileText,
  X
} from "lucide-react";
import { useSPDev } from "@/context/spdev-provider";

export function CommandCenter() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    currentCard,
    setCard
  } = useSPDev();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const actions = [
    {
      category: "Navigation",
      items: [
        { label: "Projects & Architecture", icon: FolderGit2, href: "#projects" },
        { label: "Skills & Capabilities", icon: Cpu, href: "#skills" },
        { label: "Experience Timeline", icon: Terminal, href: "#skills" },
        { label: "Certifications & Credentials", icon: Award, href: "#credentials" },
        { label: "About Me", icon: FileText, href: "#about" },
        { label: "Contact & Inquiries", icon: Send, href: "#contact" }
      ]
    }
  ];

  const filtered = actions.map((group) => ({
    category: group.category,
    items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  }));

  const handleSelect = (item: { href?: string; action?: () => void }) => {
    setCommandPaletteOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      if (item.href.startsWith("#")) {
        const targetId = item.href.slice(1);
        const glideToSection = () => {
          const element = document.getElementById(targetId);
          const lenis = (window as unknown as { __lenis?: { scrollTo: (t: unknown, o?: Record<string, unknown>) => void } }).__lenis;
          if (lenis && element) {
            lenis.scrollTo(element, { offset: -96, duration: 1.15 });
          } else if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.location.hash = `#${targetId}`;
          }
        };
        if (currentCard === 1) {
          setCard(2);
          setTimeout(glideToSection, 260);
        } else {
          glideToSection();
        }
      } else {
        window.location.hash = item.href;
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl"
        >
          {/* Search Header */}
          <div className="relative flex items-center border-b border-white/8 pb-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search sections, projects, or tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.04] text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="mt-4 max-h-[340px] overflow-y-auto space-y-4 pr-1">
            {filtered.map((group) =>
              group.items.length > 0 ? (
                <div key={group.category}>
                  <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-500 px-3 mb-1.5">
                    {group.category}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(item)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          <Icon className="h-4 w-4 text-[var(--suit-accent)]" />
                          <span className="flex-1 font-medium">{item.label}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Jump →</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>

          <div className="mt-4 border-t border-white/8 pt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Spotlight Navigation</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
