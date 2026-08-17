import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-slate-100 font-mono">
      <div className="hud-glass-panel rounded-3xl border-2 border-[var(--suit-accent)] p-8 sm:p-12 shadow-[0_0_50px_var(--suit-glow)] max-w-md w-full">
        <span className="text-[var(--suit-web)] font-bold text-xs uppercase tracking-[0.3em] block mb-2">
          {"// ROUTE SPECIFICATION"}
        </span>
        <h1 className="font-display text-5xl font-extrabold text-white mb-2">404</h1>
        <p className="text-slate-300 text-sm mb-6">
          The requested path was not found on this system.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-8 py-3.5 text-xs font-bold uppercase text-[var(--suit-accent-ink)] shadow-lg shadow-[var(--suit-glow)] transition hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
}
