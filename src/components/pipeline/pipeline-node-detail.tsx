"use client";

import React from "react";
import { X, ArrowRight, Lightbulb } from "lucide-react";
import type { PipelineNode } from "@/data/project-pipelines";
import { DetailPortal } from "@/components/ui/detail-portal";

interface PipelineNodeDetailProps {
  node: PipelineNode | null;
  stage: number;
  totalStages: number;
  onClose: () => void;
}

export function PipelineNodeDetail({ node, stage, totalStages, onClose }: PipelineNodeDetailProps) {
  const Icon = node?.icon;

  return (
    <DetailPortal
      open={Boolean(node)}
      onClose={onClose}
      label={`${node?.label ?? "Pipeline stage"} — engineering spec`}
      className="max-w-md"
    >
      {node && Icon ? (
        <>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 sm:p-7">
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--suit-accent)]">
                Stage {String(stage).padStart(2, "0")} / {String(totalStages).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--suit-accent)]/30 bg-[var(--suit-accent)]/10 text-[var(--suit-accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-bold leading-tight text-white">
                  {node.label}
                </h2>
              </div>
              <p className="text-sm text-slate-400">{node.sublabel}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close pipeline stage details"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 p-6 sm:p-7">
            <p className="text-[15px] leading-relaxed text-slate-200">{node.purpose}</p>

            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Input
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--suit-web)]">{node.input}</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Output
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--suit-gold)]">{node.output}</p>
            </div>

            <div className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <Lightbulb className="h-4 w-4 shrink-0 text-[var(--suit-accent)]" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Why this choice
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-200">{node.whyThisChoice}</p>
              </div>
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between gap-4 border-t border-white/10 p-6 sm:p-7 pt-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              {stage === totalStages
                ? "Final output stage"
                : `${totalStages - stage} stage(s) remaining`}
            </span>
            {stage < totalStages ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--suit-web)]">
                Flows to stage {String(stage + 1).padStart(2, "0")}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--suit-success)]">
                End of pipeline
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </>
      ) : null}
    </DetailPortal>
  );
}