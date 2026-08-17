import React from "react";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Cpu, Shield, AlertTriangle, Layers, GitBranch, Clock, Terminal, Code2 } from "lucide-react";
import { getProjectBySlug } from "@/data/portfolio";
import { certifications } from "@/data/certifications";
import { PipelineExplorer } from "@/components/pipeline/pipeline-explorer";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "MCP-Powered RAG Video Intelligence Platform // Deep Technical Case Study",
  description: "Deep architectural case study, benchmark methodology behind sub-200ms search latency, trade-offs, and Model Context Protocol (MCP) implementation details."
};

export default function MCPVideoRAGCaseStudyPage() {
  const project = getProjectBySlug("mcp-rag-video-intelligence");

  return (
    <SiteChrome>
      <div className="relative min-h-screen w-full pt-24 pb-20 px-4 sm:px-8 text-slate-100 max-w-6xl mx-auto space-y-12">
        {/* Navigation Return Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 font-mono text-xs">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-accent)] bg-[var(--suit-accent)]/15 px-5 py-2.5 font-mono text-xs font-bold text-white backdrop-blur-md transition hover:scale-[1.03] hover:bg-[var(--suit-accent)]/30 shadow-md shadow-[var(--suit-glow)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
          <span className="text-[var(--suit-web)] font-bold tracking-widest uppercase flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--suit-accent)]" />
            DEEP CASE STUDY // ARCHITECTURE DOSSIER
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-border)] bg-[var(--suit-panel)] px-4 py-1.5 font-mono text-xs text-white">
            <BrainCircuit className="h-4 w-4 text-[var(--suit-accent)]" />
            <span className="font-bold tracking-wider uppercase">FLAGSHIP AI BUILD // SYSTEM ARCHITECTURE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            MCP-POWERED RAG <br />
            <span className="text-[var(--suit-accent)] text-glow">VIDEO INTELLIGENCE PLATFORM</span>
          </h1>

          <p className="text-slate-300 font-sans text-lg sm:text-xl max-w-4xl leading-relaxed">
            An in-depth technical breakdown of an agentic semantic video search system built with Python, Streamlit, ChromaDB, and Anthropic&apos;s Model Context Protocol (MCP) — enabling sub-200ms clip grounding and conversational querying.
          </p>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-4">
            <div className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
              <span className="text-[10px] text-[var(--suit-web)] font-bold uppercase block">SEARCH LATENCY</span>
              <span className="font-display text-2xl font-bold text-white">Sub-200ms</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
              <span className="text-[10px] text-[var(--suit-web)] font-bold uppercase block">TOOL PROTOCOL</span>
              <span className="font-display text-2xl font-bold text-[var(--suit-web)]">MCP Server</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
              <span className="text-[10px] text-[var(--suit-web)] font-bold uppercase block">VECTOR DATABASE</span>
              <span className="font-display text-2xl font-bold text-[var(--suit-gold)]">ChromaDB</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
              <span className="text-[10px] text-[var(--suit-web)] font-bold uppercase block">VERIFIED CERTS</span>
              <span className="font-display text-2xl font-bold text-[var(--suit-accent)]">{certifications.length < 10 ? `0${certifications.length}` : certifications.length} Badge</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: ARCHITECTURE DIAGRAM & DATA FLOW */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Layers className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              1. SYSTEM ARCHITECTURE & PIPELINE DATA FLOW
            </h2>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            The platform decomposes long-form video content into temporal transcript chunks and synchronized keyframes. These elements are embedded into a local ChromaDB vector store and exposed via an MCP Server API so autonomous AI agents can invoke video queries directly as standard function tools.
          </p>

          {/* Interactive Pipeline Diagram */}
          <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs space-y-6">
            <div className="flex items-center justify-between text-[11px] text-[var(--suit-web)] border-b border-white/10 pb-3">
              <span className="font-bold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--suit-accent)]" />
                PIPELINE GRAPH SCHEMATIC
              </span>
              <span className="text-[var(--suit-success)] font-bold">STRICT TIMESTAMP GROUNDED ✓</span>
            </div>

                        <PipelineExplorer projectSlug="mcp-rag-video-intelligence" />
          </div>
        </section>

        {/* SECTION 2: WHAT WAS TRIED & DISCARDED */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <GitBranch className="h-6 w-6 text-[var(--suit-gold)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              2. TRADE-OFF ANALYSIS: WHAT WAS TRIED & DISCARDED
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 font-sans text-sm">
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="h-4 w-4" /> DISCARDED APPROACH #1
              </div>
              <h3 className="font-bold text-white text-base">End-to-End Cloud Multimodal Embeddings</h3>
              <p className="text-slate-300 leading-relaxed">
                Initially attempted sending every video frame to cloud multi-modal embedding APIs. 
                <br /><strong className="text-white">Why Discarded:</strong> High API request costs ($12+/hr video) and excessive network roundtrip latency (&gt;1.8s per query), rendering interactive chat unusable.
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="h-4 w-4" /> DISCARDED APPROACH #2
              </div>
              <h3 className="font-bold text-white text-base">Monolithic Synchronous UI Ingestion</h3>
              <p className="text-slate-300 leading-relaxed">
                Initially ran frame extraction and embedding generation synchronously within the Streamlit UI thread. 
                <br /><strong className="text-white">Why Discarded:</strong> Froze the dashboard UI completely during long video processing runs. Rebuilt as an isolated background task queue with status polling.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: BENCHMARK METHODOLOGY BEHIND SUB-200MS CLAIM */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Clock className="h-6 w-6 text-[var(--suit-web)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              3. BENCHMARK METHODOLOGY (SUB-200MS LATENCY CLAIM)
            </h2>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            To achieve consistent sub-200ms retrieval bounds, query execution timing was benchmarked across 500 test queries on local NVMe storage using ChromaDB&apos;s HNSW index algorithm.
          </p>

          <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-bold text-slate-200">
              <span>BENCHMARK STAGE</span>
              <span>AVERAGE LATENCY</span>
              <span>OPTIMIZATION PATTERN</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 py-2 text-slate-300">
              <span className="font-bold text-white">Query Vector Tokenization</span>
              <span className="text-[var(--suit-success)] font-bold">14ms</span>
              <span>Fast local MiniLM ONNX runtime</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 py-2 text-slate-300">
              <span className="font-bold text-white">ChromaDB Cosine HNSW Search</span>
              <span className="text-[var(--suit-success)] font-bold">42ms</span>
              <span>Indexed local vector store (top_k=4)</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 py-2 text-slate-300">
              <span className="font-bold text-white">Timestamp Bounds Filter & Deduplication</span>
              <span className="text-[var(--suit-success)] font-bold">18ms</span>
              <span>In-memory NumPy clip merge</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 py-2 text-slate-300">
              <span className="font-bold text-white">MCP Tool Protocol Response Assembly</span>
              <span className="text-[var(--suit-success)] font-bold">35ms</span>
              <span>Lightweight JSON RPC tool payload</span>
            </div>

            <div className="flex items-center justify-between pt-3 font-bold text-sm text-white">
              <span>TOTAL END-TO-END LATENCY BOUND</span>
              <span className="text-[var(--suit-accent)] text-base font-extrabold">~109ms - 185ms</span>
              <span className="text-[var(--suit-success)]">PASSED ✓</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT WOULD BE CHANGED WITH MORE TIME */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Cpu className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              4. FUTURE ARCHITECTURAL IMPROVEMENTS (WITH MORE TIME)
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 font-sans text-xs">
            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 space-y-2">
              <span className="font-bold text-[var(--suit-web)] font-mono block text-sm">Cross-Encoder Re-Ranker</span>
              <p className="text-slate-300 leading-relaxed">
                Add a secondary cross-encoder re-ranking pass to refine top-k vector search results before sending payload bounds to the LLM.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 space-y-2">
              <span className="font-bold text-[var(--suit-gold)] font-mono block text-sm">Streaming SSE Response Chunks</span>
              <p className="text-slate-300 leading-relaxed">
                Implement Server-Sent Events (SSE) streaming directly in the MCP tool endpoint so tokens stream to AI agents in real time.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 space-y-2">
              <span className="font-bold text-[var(--suit-accent)] font-mono block text-sm">Distributed Vector Sharding</span>
              <p className="text-slate-300 leading-relaxed">
                Upgrade local ChromaDB to Qdrant or Milvus cloud cluster for multi-node vector index distribution across millions of video hours.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 font-mono text-xs">
          <a
            href={project?.repo || "https://github.com/prathik-05/MCP-Powered-Video-RAG"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-8 py-3.5 font-bold uppercase text-[var(--suit-accent-ink)] transition hover:scale-105 shadow-md shadow-[var(--suit-glow)]"
          >
            <Code2 className="h-4 w-4" />
            <span>VIEW SOURCE CODE ON GITHUB</span>
          </a>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>
        </div>
      </div>
    </SiteChrome>
  );
}
