import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Journal & Technical Writeups | Prathik Salla",
  description: "Technical articles on sub-200ms video RAG indexing, low-latency YOLOv11 vision queues, and data health scoring."
};

const notes = [
  {
    slug: "sub-200ms-video-rag",
    title: "Engineering Sub-200ms Search Latency in Multimodal Video RAG Pipelines",
    date: "August 2026",
    category: "AI & Vector Search",
    summary: "How localized frame sampling, sliding-window transcript chunking, and ChromaDB vector caching enabled conversational video clip retrieval in under 200ms."
  },
  {
    slug: "cognito-eda-schema-safety",
    title: "CognitoEDA: Automated Dataset Intelligence & ML Schema Crash Prevention",
    date: "July 2026",
    category: "Data Engineering",
    summary: "Designing an automated profiling engine that detects toxic nulls, class imbalances, and data type mismatches before model training."
  }
];

export default function NotesIndexPage() {
  return (
    <main className="min-h-screen w-full bg-black text-slate-100 px-4 sm:px-8 py-16 font-mono text-xs">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-accent)] bg-[var(--suit-accent)]/20 px-4 py-2 font-bold text-white transition hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← RETURN TO PORTFOLIO</span>
          </Link>
          <span className="text-[var(--suit-web)] font-bold">TECHNICAL JOURNAL // MDX ARTICLES</span>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-border)] bg-[var(--suit-panel)] px-4 py-1 text-xs text-[var(--suit-web)] uppercase font-bold">
            <BookOpen className="h-4 w-4 text-[var(--suit-gold)]" />
            ENGINEERING NOTES
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            TECHNICAL <span className="text-[var(--suit-accent)]">WRITEUPS</span>
          </h1>
          <p className="text-slate-300 font-sans text-sm max-w-2xl leading-relaxed">
            In-depth engineering notes on AI systems, RAG video indexing, computer vision streaming performance, and data architecture.
          </p>
        </div>

        {/* Notes List */}
        <div className="grid gap-6">
          {notes.map((note) => (
            <div key={note.slug} className="rounded-2xl border border-white/15 bg-white/5 p-6 space-y-3">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-2">
                <span className="text-[var(--suit-web)] font-bold uppercase">{note.category}</span>
                <span>{note.date}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white leading-snug">
                {note.title}
              </h2>
              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {note.summary}
              </p>
              <div className="pt-2">
                <Link
                  href={`/notes/${note.slug}`}
                  className="inline-flex items-center gap-2 text-[var(--suit-accent)] font-bold hover:text-white transition"
                >
                  <span>READ FULL WRITEUP</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
