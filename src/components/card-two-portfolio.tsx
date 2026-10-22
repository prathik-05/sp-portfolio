"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Send,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle
} from "lucide-react";
import { profile, education } from "@/data/portfolio";
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
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const featuredCerts = certifications.filter((c) => c.featured);
  const secondaryCerts = certifications.filter((c) => !c.featured);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3500);
      } else {
        setErrorMessage(data.error || "Failed to transmit message. Please try emailing directly.");
      }
    } catch {
      setErrorMessage("Network error transmitting message. Please email s.prathik1745@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
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
        <div className="absolute inset-0 opacity-[0.16]">
          <Image
            src={themeMode === "venom" ? "/images/ven.jpg" : "/images/spidey-chest.jpg"}
            alt="Atmospheric wallpaper"
            fill
            priority
            className={`object-cover object-center ${themeMode === "venom" ? "opacity-30" : ""}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-bg)]/85 to-[var(--theme-bg)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1360px] space-y-20">
        {/* Clean Centered Segmented Navigation */}
        <div className="flex justify-center w-full border-b border-white/8 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-2xl shadow-lg">
            {([
              { id: "all", label: "Overview" },
              { id: "about", label: "About & Education" },
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

        {/* SECTION 01: ABOUT & EDUCATION */}
        {(activeTab === "all" || activeTab === "about") && (
          <section id="about" className="space-y-10">
            <SectionHeading
              code="01"
              eyebrow="Profile"
              title={theme.copy.aboutTitle}
              description="A focused engineering profile centered on AI/ML architectures, real-time computer vision pipelines, and production systems."
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl">
              <TendrilBorder />
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div className="space-y-6">
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
                    {theme.copy.aboutSummary}
                  </p>

                  {/* Core Specialization Pillars */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Code2 className="h-4 w-4 text-[var(--suit-accent)]" /> Multimodal Video RAG
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Vector indexing with ChromaDB, Model Context Protocol (MCP) tool schemas, and timestamp-aware clip retrieval.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Cpu className="h-4 w-4 text-[var(--suit-accent)]" /> Streaming Vision Pipelines
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        YOLOv11 stream pipelines with thread-decoupled queue buffers achieving sustained 45+ FPS webcam inference.
                      </p>
                    </div>
                  </div>

                  {/* High-Impact Education & Academic Credentials */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/8 pb-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--suit-accent)]/15 border border-[var(--suit-accent)]/30 text-[var(--suit-accent)]">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                          Academic Background
                        </h4>
                        <p className="text-xs text-slate-400 font-sans">
                          Undergraduate Education & Milestones
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-1">
                      {education.map((edu, idx) => (
                        <div key={idx} className="space-y-1.5 border-l-2 border-[var(--suit-accent)]/30 pl-4 py-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold text-white text-sm">
                              {edu.degree}
                            </span>
                            <span className="font-mono text-xs text-[var(--suit-accent)] font-bold">
                              {edu.score}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-mono">
                            {edu.institution} · <span className="text-slate-400">{edu.period} ({edu.status})</span>
                          </p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {edu.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Engineering Visual Frame */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-xs font-mono text-slate-300 bg-gradient-to-b from-black/90 to-transparent">
                    <span className="font-semibold text-white">Prathik Salla</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[var(--suit-accent)] font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Open to Roles
                    </span>
                  </div>
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] overflow-hidden">
                    <Image
                      src={themeMode === "venom" ? "/images/venm.jpg" : "/images/spidey-chest.jpg"}
                      alt="Engineering portrait"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      className="object-cover object-top contrast-110 brightness-105 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 py-3 text-xs bg-gradient-to-t from-black to-transparent">
                      <span className="text-white font-semibold drop-shadow font-sans">Software Engineer — AI/ML</span>
                      <span className="text-[11px] font-mono text-slate-300">Ace Eng. College &apos;27</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 02: PROJECTS */}
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
              description="Verified certifications and academy credentials across AI, cloud architectures, and software systems. 4 featured credentials with verifiable IDs."
            />

            {/* Featured Credentials Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredCerts.map((cred, index) => (
                <CertCard
                  key={cred.id}
                  certification={cred}
                  index={index}
                  onOpen={setSelectedCertification}
                />
              ))}
            </div>

            {/* Additional Collapsible Credentials */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="mx-auto flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-xs font-mono font-medium text-slate-300 transition hover:border-[var(--suit-accent)] hover:text-white hover:bg-white/[0.06]"
              >
                <span>
                  {showAllCerts ? "Collapse Additional Certifications" : "View Additional Academy Certifications (4)"}
                </span>
                {showAllCerts ? (
                  <ChevronUp className="h-4 w-4 text-[var(--suit-accent)]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[var(--suit-accent)]" />
                )}
              </button>

              <AnimatePresence>
                {showAllCerts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden pt-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      {secondaryCerts.map((cred, index) => (
                        <CertCard
                          key={cred.id}
                          certification={cred}
                          index={index + 4}
                          onOpen={setSelectedCertification}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              description="Interested in collaborating, hiring for AI/ML and software engineering roles, or technical inquiries — send a direct message."
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl max-w-3xl">
              <TendrilBorder />

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-[var(--suit-success)] mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white">Transmission Successful</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you! Your message has been routed to Prathik Salla (s.prathik1745@gmail.com). You will receive a response shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 text-sm">
                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

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
                      placeholder="Discussing a software engineering opportunity, AI project proposal, or collaboration..."
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
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-8 py-3.5 font-semibold text-[var(--suit-accent-ink)] transition hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[var(--suit-glow)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Clean Professional Footer */}
        <footer className="pt-12 pb-6 text-center text-xs text-slate-400 space-y-2 border-t border-white/6">
          <div className="text-xs text-slate-300 font-medium">
            Prathik Salla · Software Engineer — AI/ML · Hyderabad, India
          </div>
          <div className="text-[11px] text-slate-500">
            Ace Engineering College (B.Tech &apos;27) · Open to Software & AI/ML Roles
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
