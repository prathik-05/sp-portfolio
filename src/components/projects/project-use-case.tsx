"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { getPipelineForProject } from "@/data/project-pipelines";
import { useSPDev } from "@/context/spdev-provider";

interface ProjectUseCaseProps {
  projectSlug: string;
  compact?: boolean;
}

/**
 * Concise, visual "how it works" flow derived directly from the authoritative
 * pipeline data (project-pipelines.ts). Never duplicates stage definitions.
 */
export function ProjectUseCase({ projectSlug, compact = false }: ProjectUseCaseProps) {
  const { reducedMotion } = useSPDev();
  const pipeline = getPipelineForProject(projectSlug);

  if (!pipeline) return null;

  return (
    <div className="w-full">
      <ol className="flex flex-col">
        {pipeline.nodes.map((node, index) => {
          const Icon = node.icon;
          const isLast = index === pipeline.nodes.length - 1;
          return (
            <li key={node.id} className="flex">
              <div className="flex flex-col items-center">
                <motion.span
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.35, delay: index * 0.06 }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--suit-accent)]/25 bg-[var(--suit-accent)]/10 text-[var(--suit-accent)]"
                >
                  <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
                </motion.span>
                {!isLast && (
                  <span className="my-1 h-5 w-px bg-gradient-to-b from-[var(--suit-accent)]/40 to-transparent" />
                )}
              </div>
              <div className="ml-3.5 pb-4">
                <p className={`font-semibold text-white ${compact ? "text-[13px]" : "text-sm"}`}>
                  {node.label.replace(/_/g, " ")}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{node.sublabel}</p>
                {!compact && !isLast && (
                  <ArrowDown className="mt-1 h-3.5 w-3.5 text-slate-600" />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
