"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import {
  skills,
  experiences
} from "@/data/portfolio";
import { useSPDev } from "@/context/spdev-provider";
import { THEMES } from "@/lib/themes";
import { SectionHeading } from "@/components/ui/section-heading";

export function SkillsInteractiveSection() {
  const { themeMode } = useSPDev();
  const theme = THEMES[themeMode];
  const isVenom = themeMode === "venom";

  return (
    <section id="skills" data-depth-reveal className="space-y-10">
      {/* Clean Section Heading */}
      <SectionHeading
        align="center"
        code="03"
        eyebrow={isVenom ? "ARSENAL" : "SKILLS & EXPERIENCE"}
        title={theme.copy.skillsTitle}
        description="Core technical capabilities grouped by domain, backed by demonstrable open-source implementations and verified benchmarks."
      />

      {/* Clean Recruiter-Standard Categories Grid — NO ARBITRARY PERCENTAGE BARS */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
        {skills.map((cat, catIdx) => {
          const CatIcon = cat.icon;
          return (
            <motion.div
              key={cat.id || cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (catIdx % 2) * 0.07 }}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.025] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-[var(--suit-accent)]/30 hover:shadow-[0_0_30px_var(--suit-glow)] ${
                catIdx === 4 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--suit-accent)]/15 border border-[var(--suit-accent)]/30 text-[var(--suit-accent)] transition-transform duration-300 group-hover:scale-105">
                    <CatIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{cat.title}</h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Practical Proof Badge */}
                <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--suit-accent)]" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Proof:</span>
                  <span className="font-semibold text-white truncate max-w-[170px] sm:max-w-[210px]">{cat.proofProject}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Tag Chips with Practical Application Proofs */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="group/skill inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-[var(--suit-accent)]/40 hover:text-white hover:bg-[var(--suit-accent)]/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--suit-accent)]/70 group-hover/skill:bg-[var(--suit-accent)]" />
                    <span className="font-semibold text-slate-200">{item.name}</span>
                    {item.proof && (
                      <span className="hidden sm:inline text-[10px] font-mono text-slate-500 border-l border-white/10 pl-1.5 group-hover/skill:text-slate-400">
                        {item.proof}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Clean Recruiter Summary Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Core Languages", value: "Java · Python · SQL", detail: "JavaScript · R · HTML/CSS" },
          { label: "Computer Science", value: "DSA · OOP · DBMS", detail: "47 Passing Tests · Algorithmic" },
          { label: "AI & Vision", value: "RAG · YOLOv11 · PyTorch", detail: "Streamlit · OpenCV · ChromaDB" },
          { label: "Cloud & Tooling", value: "Git · OCI · GCP · MCP", detail: "Spring Boot · REST APIs · JUnit" }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-center"
          >
            <p className="font-display text-base sm:text-lg font-bold text-white truncate">{stat.value}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 truncate">{stat.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="pt-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--suit-accent)]/15 border border-[var(--suit-accent)]/30 text-[var(--suit-accent)]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {theme.copy.timelineTitle}
            </h3>
            <p className="text-xs font-mono text-slate-400">Engineering Work History & Internships</p>
          </div>
        </div>

        <div className="relative ml-2 space-y-6 border-l-2 border-[var(--suit-accent)]/25 pl-8">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="relative group"
            >
              <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-[var(--suit-accent)] bg-[var(--theme-bg)] shadow-[0_0_12px_var(--suit-glow)] transition-transform duration-300 group-hover:scale-125" />
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-md space-y-3 transition-all duration-300 hover:border-[var(--suit-accent)]/40 hover:bg-white/[0.04]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/6 pb-3">
                  <span className="font-semibold text-white text-sm sm:text-base">{item.title}</span>
                  <span className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/8 rounded-full px-2.5 py-1">{item.period}</span>
                </div>
                <p className="text-xs font-semibold text-[var(--suit-accent)] font-mono">{item.company}</p>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">{item.summary}</p>
                <ul className="space-y-1.5 pt-1">
                  {item.highlights.map((h, hidx) => (
                    <li key={hidx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--suit-accent)] shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed text-slate-300">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
