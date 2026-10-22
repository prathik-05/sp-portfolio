"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Cpu,
  Award,
  Send,
  FileText,
  X,
  Sparkles,
  Github,
  Linkedin,
  Copy,
  Check
} from "lucide-react";
import { useSPDev } from "@/context/spdev-provider";

export function CommandCenter() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    currentCard,
    setCard,
    themeMode,
    setThemeMode
  } = useSPDev();

  const [query, setQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const navigateToSection = (targetId: string) => {
    setCommandPaletteOpen(false);
    const glide = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = `#${targetId}`;
      }
    };

    if (currentCard === 1) {
      setCard(2);
      setTimeout(glide, 260);
    } else {
      glide();
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("s.prathik1745@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setCommandPaletteOpen(false);
    }, 1200);
  };

  const actions = [
    {
      category: "Sections",
      items: [
        { label: "About & Engineering Profile", icon: FileText, action: () => navigateToSection("about"), hint: "01" },
        { label: "Featured Projects & Architecture", icon: FolderGit2, action: () => navigateToSection("projects"), hint: "02" },
        { label: "Skills & Technical Arsenal", icon: Cpu, action: () => navigateToSection("skills"), hint: "03" },
        { label: "Certifications & Credentials", icon: Award, action: () => navigateToSection("credentials"), hint: "04" },
        { label: "Contact & Transmission", icon: Send, action: () => navigateToSection("contact"), hint: "05" }
      ]
    },
    {
      category: "Quick Actions",
      items: [
        {
          label: `Switch Theme to ${themeMode === "venom" ? "Spider-Man (Classic)" : "Venom Mode"}`,
          icon: Sparkles,
          action: () => {
            setThemeMode(themeMode === "venom" ? "classic" : "venom");
            setCommandPaletteOpen(false);
          },
          hint: "Theme"
        },
        {
          label: "View / Open Résumé (PDF)",
          icon: FileText,
          action: () => {
            setCommandPaletteOpen(false);
            window.open("/resume.pdf", "_blank");
          },
          hint: "PDF"
        },
        {
          label: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email (s.prathik1745@gmail.com)",
          icon: copiedEmail ? Check : Copy,
          action: copyEmail,
          hint: "Copy"
        },
        {
          label: "GitHub Profile (@prathik-05)",
          icon: Github,
          action: () => {
            setCommandPaletteOpen(false);
            window.open("https://github.com/prathik-05", "_blank");
          },
          hint: "External"
        },
        {
          label: "LinkedIn Profile",
          icon: Linkedin,
          action: () => {
            setCommandPaletteOpen(false);
            window.open("https://www.linkedin.com/in/prathik-s07/", "_blank");
          },
          hint: "External"
        }
      ]
    }
  ];

  const filtered = actions
    .map((group) => ({
      category: group.category,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter((group) => group.items.length > 0);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
        onClick={() => setCommandPaletteOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -14 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/95 p-5 sm:p-6 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {/* Search Header */}
          <div className="relative flex items-center border-b border-white/10 pb-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or jump to section... (e.g. projects, resume)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-slate-400 hover:text-white transition"
              aria-label="Close Command Palette"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="mt-4 max-h-[380px] overflow-y-auto space-y-4 pr-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No commands matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((group) => (
                <div key={group.category}>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 mb-1.5">
                    {group.category}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={item.action}
                          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs text-slate-200 transition hover:bg-white/[0.08] hover:text-white group"
                        >
                          <Icon className="h-4 w-4 text-[var(--suit-accent)] transition-transform group-hover:scale-110" />
                          <span className="flex-1 font-medium">{item.label}</span>
                          <span className="text-[10px] text-slate-500 font-mono group-hover:text-slate-300">
                            {item.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-white/8 pt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd> or <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px]">Ctrl+K</kbd> to toggle
            </span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
