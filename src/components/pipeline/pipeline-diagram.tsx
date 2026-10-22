"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectPipeline, PipelineNode } from "@/data/project-pipelines";
import { useSPDev } from "@/context/spdev-provider";
import { cn } from "@/lib/utils";

interface PipelineDiagramProps {
  pipeline: ProjectPipeline;
  onNodeClick: (node: PipelineNode) => void;
  activeIndex?: number | null;
}

export function PipelineDiagram({ pipeline, onNodeClick, activeIndex = null }: PipelineDiagramProps) {
  const { reducedMotion } = useSPDev();
  const nodes = pipeline.nodes;

  return (
    <div className="relative">
      {/* Soft connector flow line behind the nodes (desktop: horizontal, mobile: vertical). */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-[var(--suit-accent)]/20"
      >
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--suit-accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--suit-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--suit-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          className="hidden md:block"
          stroke="url(#flow-grad)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, delay: 0.3 }}
        />
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          className="md:hidden"
          stroke="url(#flow-grad)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, delay: 0.3 }}
        />
      </svg>

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-7">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeIndex === index;
          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => onNodeClick(node)}
              aria-label={`Inspect ${node.label} pipeline stage`}
              aria-current={isActive ? "true" : undefined}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: index * 0.07, ease: "easeOut" }
              }
              className={cn(
                "group relative flex flex-col items-start gap-3.5 rounded-2xl border p-6 text-left transition-all duration-300",
                "border-white/8 bg-white/[0.02] backdrop-blur-md",
                isActive
                  ? "border-[var(--suit-accent)]/50 bg-[var(--suit-accent)]/[0.06] shadow-[0_0_28px_var(--suit-glow)]"
                  : "hover:border-[var(--suit-accent)]/30 hover:bg-white/[0.04]",
                isActive && "scale-[1.02]",
                "focus-visible:outline-2 focus-visible:outline-[var(--suit-web)] focus-visible:outline-offset-2",
                index === nodes.length - 1 && "sm:col-span-2 xl:col-span-3 2xl:col-span-1"
              )}
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-all duration-300",
                    isActive
                      ? "border-[var(--suit-accent)] bg-[var(--suit-accent)] text-[var(--suit-accent-ink)] shadow-[0_0_20px_var(--suit-glow)]"
                      : "border-[var(--suit-accent)]/25 bg-[var(--suit-accent)]/10 text-[var(--suit-accent)] group-hover:shadow-[0_0_14px_var(--suit-glow)]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "font-display text-lg font-black tracking-tight",
                    isActive ? "text-[var(--suit-accent)]" : "text-white/90"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <span
                className={cn(
                  "font-display text-[15px] font-bold leading-snug text-white",
                  isActive && "text-[var(--suit-accent)]"
                )}
              >
                {node.label}
              </span>
              <span className="text-[13px] leading-relaxed text-slate-400">{node.sublabel}</span>

              <span
                className={cn(
                  "mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide transition-opacity duration-200",
                  isActive ? "text-[var(--suit-web)] opacity-100" : "text-[var(--suit-web)] opacity-60 group-hover:opacity-100"
                )}
              >
                Inspect spec
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}