import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";

interface NoteArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
}

const articlesMap: Record<string, NoteArticle> = {
  "sub-200ms-video-rag": {
    slug: "sub-200ms-video-rag",
    title: "Engineering Sub-200ms Search Latency in Multimodal Video RAG Pipelines",
    category: "AI & Vector Search",
    date: "August 2026",
    readTime: "5 min read",
    summary: "How localized frame sampling, sliding-window transcript chunking, and ChromaDB vector caching enabled conversational video clip retrieval in under 200ms.",
    content: [
      "Traditional video searching requires manual timeline scrubbing or full-file transcript inspection. Converting dense video data into a conversational vector database introduces two primary bottlenecks: high embedding generation latency and timestamp hallucination.",
      "To solve this, I designed a multi-stage ingestion pipeline. First, audio streams are transcribed using OpenAI Whisper and segmented into overlapping 256-token sliding windows. Concurrently, video keyframes are sampled every 2 seconds.",
      "By storing localized vector embeddings in a ChromaDB database running on memory-mapped storage, query semantic similarity calculation completes in under 15ms.",
      "To prevent timestamp hallucination, every chunk vector carries hard metadata bounds (start_second, end_second). When an LLM generates a response, it is constrained to cite exact localized video ranges.",
      "Standardizing this pipeline as an Anthropic Model Context Protocol (MCP) server enables autonomous AI agents to invoke query_video_timeline as a native executable tool call."
    ]
  },
  "cognito-eda-schema-safety": {
    slug: "cognito-eda-schema-safety",
    title: "CognitoEDA: Automated Dataset Intelligence & ML Schema Crash Prevention",
    category: "Data Engineering",
    date: "July 2026",
    readTime: "4 min read",
    summary: "Designing an automated profiling engine that detects toxic nulls, class imbalances, and data type mismatches before model training.",
    content: [
      "Exploratory Data Analysis (EDA) is often repetitive, yet skipping thorough dataset inspection leads to unexpected schema mismatches that crash downstream ML training pipelines.",
      "CognitoEDA automates tabular profiling in a single Python execution pass using vectorized Pandas aggregations.",
      "The system computes a Data Health Score (0-100) based on null ratios, skewness, and cardinality. If toxic schema anomalies are detected, it alerts the developer before model training begins."
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(articlesMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesMap[slug];
  if (!article) return { title: "Note Not Found" };
  return {
    title: `${article.title} | Prathik Salla Technical Notes`,
    description: article.summary
  };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesMap[slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-black text-slate-100 px-4 sm:px-8 py-16 font-sans">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-accent)] bg-[var(--suit-accent)]/20 px-4 py-2 font-bold text-white transition hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← ALL TECHNICAL NOTES</span>
          </Link>
          <span className="text-[var(--suit-web)] font-bold">{article.category}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 font-mono">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-border)] bg-[var(--suit-panel)] px-4 py-1 text-xs text-[var(--suit-web)] uppercase font-bold">
            <BookOpen className="h-4 w-4 text-[var(--suit-gold)]" />
            {article.category}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-400 border-t border-b border-white/10 py-3">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-[var(--suit-accent)]" /> Prathik Salla
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[var(--suit-gold)]" /> {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Article Body */}
        <article className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-sans border-b border-white/15 pb-10">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center font-mono text-xs">
          <Link href="/" className="text-[var(--suit-web)] font-bold hover:text-white transition">
            ← RETURN TO HOME PORTFOLIO
          </Link>
          <Link href="/notes" className="text-[var(--suit-accent)] font-bold hover:text-white transition">
            MORE TECHNICAL NOTES →
          </Link>
        </div>
      </div>
    </main>
  );
}
