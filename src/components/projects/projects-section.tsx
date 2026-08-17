"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { PipelineExplorer } from "@/components/pipeline/pipeline-explorer";
import { useSPDev } from "@/context/spdev-provider";
import { cn } from "@/lib/utils";

const ORDER = [
  "mcp-rag-video-intelligence",
  "real-time-object-detection",
  "cognito-eda",
  "employee-management-rest-api",
  "tic-tac-toe-minimax"
];

export function ProjectsSection() {
  const { reducedMotion } = useSPDev();

  // Featured carousel order: 01 MCP → 02 YOLO → 03 EDA.
  const ordered = ORDER.map((slug) => projects.find((p) => p.slug === slug) ?? projects[0]);

  return (
    <section id="projects" data-depth-reveal className="space-y-10">
      {/* Editorial header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
          Selected work
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-white">
          Projects I&rsquo;ve built
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Across AI systems, computer vision, and software engineering.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
          {String(ordered.length).padStart(2, "0")} projects · AI / Vision / Backend / Java
        </p>
      </motion.div>

      {/* Featured slide panel — arrows on the right side of the panel */}
      <FeaturedCarousel projects={ordered} />

      {/* Secondary — three clean supporting panels in sequence */}
      <div className="grid gap-5 md:grid-cols-3">
        {ordered.map((project, index) => (
          <ProjectPanel key={project.slug} project={project} index={index} />
        ))}
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

  // Keyboard arrows to navigate the slide panel.
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
                      <span className="text-[11px] text-slate-500">{p.status}</span>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-bold leading-[1.02] tracking-tight text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                        {p.subtitle}
                      </p>
                    </div>

                    <p className="max-w-lg text-[15px] leading-relaxed text-slate-300">
                      {p.description}
                    </p>

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
                      <span>View Case Study</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/[0.06]"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
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

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2 border-t border-white/8 py-4">
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

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const { reducedMotion } = useSPDev();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 sm:p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-300">
          {project.category}
        </span>
        <span className="font-mono text-xs tabular-nums text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-white">
        {project.title}
      </h3>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
        {project.subtitle}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[11px] text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-7">
        <a
          href={`/projects/${project.slug}`}
          className={cn(
            "group/cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
            "border border-white/12 bg-white/[0.03] text-slate-200 hover:border-white/30 hover:bg-white/[0.08]"
          )}
        >
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-slate-400 transition hover:text-white"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}