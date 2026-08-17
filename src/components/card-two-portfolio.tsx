"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Cpu, Send, Mail, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { certifications } from "@/data/certifications";
import { THEMES } from "@/lib/themes";
import { ProjectsSection } from "@/components/projects/projects-section";
import { SkillsInteractiveSection } from "@/components/skills/skills-interactive-section";
import { CertCard } from "@/components/certifications/cert-card";
import { CertVerificationPanel } from "@/components/certifications/cert-verification-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { TendrilBorder } from "@/components/effects/tendril-border";
import { useSPDev } from "@/context/spdev-provider";

export function CardTwoPortfolio() {
  const { themeMode } = useSPDev();
  const theme = THEMES[themeMode];

  const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[number] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 2500);
      }
    } catch {
      setSubmitted(true);
    }
  };

  type TabId = "all" | "about" | "projects" | "skills" | "credentials" | "contact";
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    if (tabId !== "all") {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full pt-24 pb-20 px-6 sm:px-10 lg:px-16 text-slate-100 overflow-x-hidden transition-colors duration-500"
    >
      {/* Subtle Atmospheric Backdrop */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.18]">
          <Image
            src={themeMode === "venom" ? "/images/ven.jpg" : "/images/spidey-chest.jpg"}
            alt="Atmospheric wallpaper"
            fill
            priority
            className={`object-cover object-center ${themeMode === "venom" ? "opacity-35" : ""}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-bg)]/80 to-[var(--theme-bg)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1360px] space-y-20">
        {/* Clean Centered Segmented Navigation */}
        <div className="flex justify-center w-full border-b border-white/8 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-2xl shadow-lg">
            {([
              { id: "all", label: "Overview" },
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills & Experience" },
              { id: "credentials", label: "Certifications" },
              { id: "contact", label: "Contact" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`rounded-full px-4 sm:px-5 py-2 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--suit-accent)] text-[var(--suit-accent-ink)] shadow-md shadow-[var(--suit-glow)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 01: ABOUT */}
        {(activeTab === "all" || activeTab === "about") && (
          <section id="about" className="space-y-8">
            <SectionHeading
              code="01"
              eyebrow="About"
              title={theme.copy.aboutTitle}
              description="A focused engineering profile centered on AI/ML architectures, real-time computer vision pipelines, and production systems."
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl">
              <TendrilBorder />
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="space-y-6">
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
                    {theme.copy.aboutSummary}
                  </p>

                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-sm text-slate-300 italic">
                    &ldquo;{theme.copy.heroQuote}&rdquo;{" "}
                    <span className="not-italic font-semibold text-[var(--suit-accent)] ml-2">
                      {theme.copy.heroQuoteAuthor}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Code2 className="h-4 w-4 text-[var(--suit-accent)]" /> Multimodal RAG
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Vector indexing with ChromaDB, Model Context Protocol (MCP) tool schemas, and timestamp-aware clip retrieval.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Cpu className="h-4 w-4 text-[var(--suit-accent)]" /> Streaming Vision
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        YOLOv11 stream pipelines with thread-decoupled queue buffers for smooth live webcam and video inference.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spec Media Display — full-bleed image, no extra padding */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-xs font-mono text-slate-400 bg-gradient-to-b from-black/80 to-transparent">
                    <span className="font-semibold text-slate-200">Identity Spec // Core Mark</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-[var(--suit-success)] font-medium">
                      <CheckCircle2 className="h-3 w-3" /> Validated
                    </span>
                  </div>
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] overflow-hidden">
                    <Image
                      src={themeMode === "venom" ? "/images/venm.jpg" : "/images/spidey-chest.jpg"}
                      alt="Identity Emblem"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      className="object-cover object-top contrast-110 brightness-105 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 py-3 text-xs bg-gradient-to-t from-black to-transparent">
                      <span className="text-white font-semibold drop-shadow">Software Engineer — AI/ML</span>
                      <span className="text-[11px] font-mono text-slate-300">v2.5 Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {(activeTab === "all" || activeTab === "projects") && (
          <ProjectsSection />
        )}

        {/* SECTION 03: SKILLS & MISSIONS */}
        {(activeTab === "all" || activeTab === "skills") && (
          <SkillsInteractiveSection />
        )}

        {/* SECTION 04: CREDENTIALS */}
        {(activeTab === "all" || activeTab === "credentials") && (
          <section id="credentials" data-depth-reveal className="space-y-8">
            <SectionHeading
              align="center"
              code="04"
              eyebrow="Credentials"
              title={theme.copy.credentialsTitle}
              description="8 certifications across AI, cloud, networking and software technologies. Each is shown as self-reported unless a public verification source exists."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cred, index) => (
                <CertCard
                  key={cred.id}
                  certification={cred}
                  index={index}
                  onOpen={setSelectedCertification}
                />
              ))}
            </div>

            <CertVerificationPanel
              certification={selectedCertification}
              onClose={() => setSelectedCertification(null)}
            />
          </section>
        )}

        {/* SECTION 05: CONTACT */}
        {(activeTab === "all" || activeTab === "contact") && (
          <section id="contact" data-depth-reveal className="space-y-8">
            <SectionHeading
              code="05"
              eyebrow="Contact"
              title={theme.copy.contactTitle}
              description="Interested in collaborating, AI/CV engineering roles, or technical inquiries — send a direct message."
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl max-w-3xl">
              <TendrilBorder />
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-[var(--suit-success)] mx-auto" />
                  <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                  <p className="text-slate-300 text-sm">
                    Thank you! Your message has been received. Prathik Salla will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 text-sm">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-400 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-[var(--suit-accent)] focus:outline-none transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-[var(--suit-accent)] focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Discussing an opportunity, project proposal, or AI collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-[var(--suit-accent)] focus:outline-none resize-none transition"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <a href={`mailto:${profile.email}`} aria-label="Email Prathik" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/25 transition">
                        <Mail className="h-4 w-4 text-[var(--suit-accent)]" />
                      </a>
                      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/25 transition">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/25 transition">
                        <Linkedin className="h-4 w-4 text-[var(--suit-accent)]" />
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-8 py-3.5 font-semibold text-[var(--suit-accent-ink)] transition hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[var(--suit-glow)]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Minimal Footer */}
        <footer className="pt-12 pb-6 text-center text-xs text-slate-400 space-y-2 border-t border-white/6">
          <div className="text-[11px] text-slate-400 font-mono">
            {themeMode === "venom" ? "Venom Symbiote Mode // Active" : "Classic Mode // Active"}
          </div>
          <div className="text-[11px] text-slate-400">© 2026 Prathik Salla · Engineered with purpose & responsibility</div>
        </footer>
      </div>
    </motion.div>
  );
}