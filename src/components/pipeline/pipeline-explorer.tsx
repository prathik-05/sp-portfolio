"use client";

import React, { useState } from "react";
import type { PipelineNode } from "@/data/project-pipelines";
import { getPipelineForProject } from "@/data/project-pipelines";
import { PipelineDiagram } from "@/components/pipeline/pipeline-diagram";
import { PipelineNodeDetail } from "@/components/pipeline/pipeline-node-detail";

interface PipelineExplorerProps {
  projectSlug: string;
}

export function PipelineExplorer({ projectSlug }: PipelineExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const pipeline = getPipelineForProject(projectSlug);

  if (!pipeline) return null;

  const selectedNode = selectedIndex !== null ? pipeline.nodes[selectedIndex] : null;

  const handleNodeClick = (node: PipelineNode) => {
    setSelectedIndex(pipeline.nodes.findIndex((n) => n.id === node.id));
  };

  return (
    <>
      <PipelineDiagram pipeline={pipeline} onNodeClick={handleNodeClick} activeIndex={selectedIndex} />

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-slate-400">
        <span>CLICK ANY STAGE TO INSPECT ITS INPUT / OUTPUT SPEC</span>
        <span className="text-[var(--suit-accent)]">DATA FLOW {pipeline.nodes.length} STAGES ✓</span>
      </div>      <PipelineNodeDetail
        node={selectedNode}
        stage={selectedIndex !== null ? selectedIndex + 1 : 0}
        totalStages={pipeline.nodes.length}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}