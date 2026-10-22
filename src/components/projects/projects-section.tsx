"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { PipelineExplorer } from "@/components/pipeline/pipeline-explorer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useSPDev } from "@/context/spdev-provider";
import { cn } from "@/lib/utils";

const ORDER = [
  "mcp-rag-video-intelligence",
  "real-time-object-detection",
  "cognito-eda",
  "employee-management-rest-api",
  "tic-tac-toe-minimax"
];

type FilterTab = "All" | "AI" | "Vision" | "Backend";

export function ProjectsSection() {
  const { reducedMotion } = useSPDev();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const ordered = useMemo(
    () => ORDER.map((slug) => projects.find((p) => p.slug === slug) ?? projects[0]),
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return ordered;
    return ordered.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter, ordered]);

  return (
    <section id="projects" data-depth-reveal className="space-y-12">
      {/* Editorial header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-xs font-mono uppercase tracking-[0.24em] text-[var(--suit-accent)] font-semibold">
          Flagship Systems
        </p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-white">
          Engineered Projects & Pipelines
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          Real-time computer vision, agentic video RAG, automated dataset intelligence, and verified algorithm engines.
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
          {String(ordered.length).padStart(2, "0")} Systems Verified · 47 Tests Passing · Sub-25ms Latencies
        </p>
      </motion.div>

      {/* Featured Architecture Carousel with Interactive Pipeline Explorer */}
      <FeaturedCarousel projects={ordered} />

      {/* Filterable Compact Grid Section Header */}
      <div className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              All Systems Index
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Filter by engineering domain or explore full case studies
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-xl">
            {(
              [
                { id: "All", label: "All (5)" },
                { id: "AI", label: "AI & RAG (2)" },
                { id: "Vision", label: "Vision (1)" },
                { id: "Backend", label: "Backend (2)" }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                  activeFilter === tab.id
                    ? "bg-[var(--suit-accent)] text-[var(--suit-accent-ink)] font-semibold shadow-sm shadow-[var(--suit-glow)]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filterable Grid of Spotlight Cards */}
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-300">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[var(--suit-accent)] font-semibold">
                      {project.metrics.latency}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight text-white group-hover:text-white">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--suit-accent)]">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  {/* Quantified Metrics Highlight Badge */}
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/6 bg-white/[0.02] p-2.5 font-mono text-[10px]">
                    <div>
                      <span className="text-slate-500 uppercase block">Throughput:</span>
                      <span className="text-slate-200 font-semibold truncate block">
                        {project.metrics.throughput}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase block">Benchmark:</span>
                      <span className="text-[var(--suit-accent)] font-semibold truncate block">
                        {project.metrics.accuracy}
                      </span>
                    </div>
                  </div>

                  {/* Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer actions */}
                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <a
                      href={`/projects/${project.slug}`}
                      className="group/cta inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-[var(--suit-accent)] hover:bg-[var(--suit-accent)]/15"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-slate-400 transition hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                      <ArrowUpRight className="h-3 w-3 text-slate-500" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const { reducedMotion, themeMode } = useSPDev();
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="relative">
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
      >
        {/* Slide track */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex items-stretch"
            style={{ width: `${total * 100}%` }}
            animate={{ x: `-${(index / total) * 100}%` }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
            }
          >
            {projects.map((p) => (
              <div
                key={p.slug}
                className="shrink-0 grid lg:grid-cols-[1fr_1.1fr]"
                style={{ width: `${100 / total}%` }}
              >
                {/* Editorial column */}
                <div className="flex flex-col justify-between gap-8 p-8 sm:p-12 lg:p-14">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200">
                        {p.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--suit-accent)] font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> {p.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-bold leading-[1.02] tracking-tight text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--suit-accent)]">
                        {p.subtitle}
                      </p>
                    </div>

                    <p className="max-w-lg text-[15px] leading-relaxed text-slate-300">
                      {p.description}
                    </p>

                    {/* Quantified Outcome Stats */}
                    <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Latency</span>
                        <span className="font-bold text-white text-sm">{p.metrics.latency}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Throughput</span>
                        <span className="font-bold text-slate-200 text-sm truncate block">{p.metrics.throughput}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Outcome</span>
                        <span className="font-bold text-[var(--suit-accent)] text-sm truncate block">{p.metrics.accuracy}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-xs text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`/projects/${p.slug}`}
                      className={cn(
                        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
                        themeMode === "venom"
                          ? "bg-white text-black hover:bg-slate-200"
                          : "bg-[var(--suit-accent)] text-[var(--suit-accent-ink)] hover:opacity-95"
                      )}
                    >
                      <span>Interactive Case Study</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/[0.06]"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Pipeline column — the technical centerpiece */}
                <div className="relative border-t border-white/8 bg-black/40 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]"
                  />
                  <div className="relative h-full">
                    <PipelineExplorer projectSlug={p.slug} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slide dots and nav */}
        <div className="flex items-center justify-between border-t border-white/8 px-6 py-4">
          <div className="font-mono text-xs text-slate-500">
            Slide {index + 1} of {total} · {projects[index].category}
          </div>
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show project ${i + 1}: ${p.title}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? cn("w-7", themeMode === "venom" ? "bg-white" : "bg-[var(--suit-accent)]")
                    : "w-3 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </motion.article>

      {/* Arrows on the right side of the panel */}
      <div className="absolute -right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 sm:-right-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95",
            "border-white/15 bg-black/70 text-white shadow-lg shadow-black/40",
            "hover:border-white/40 hover:bg-black/90"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95",
            "border-white/15 bg-black/70 text-white shadow-lg shadow-black/40",
            "hover:border-white/40 hover:bg-black/90"
          )}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
