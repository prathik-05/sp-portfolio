"use client";

import React, { useState } from "react";
import { Download, ExternalLink, X, FileText } from "lucide-react";
import { DetailPortal } from "@/components/ui/detail-portal";

interface ResumeViewerProps {
  trigger?: React.ReactNode;
  label?: string;
}

const RESUME_URL = "/resume.pdf";

export function ResumeViewer({ trigger, label = "View Résumé" }: ResumeViewerProps) {
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const handleOpen = () => {
    // Mobile fallback: open the PDF directly in a new tab.
    if (isMobile) {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setLoadError(false);
    setOpen(true);
  };

  return (
    <>
      {trigger ? (
        <button
          type="button"
          onClick={handleOpen}
          aria-haspopup="dialog"
          aria-label="Open résumé viewer"
        >
          {trigger}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
        >
          <FileText className="h-4 w-4 text-[var(--suit-accent)]" />
          <span>{label}</span>
        </button>
      )}

      <DetailPortal
        open={open}
        onClose={() => setOpen(false)}
        label="Résumé"
        className="h-[85vh] max-w-4xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--suit-accent)]/15 text-[var(--suit-accent)]">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-base font-bold leading-tight text-white">
                Résumé
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Prathik Salla
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              download="Prathik_Salla_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-4 py-2 text-xs font-semibold text-[var(--suit-accent-ink)] transition hover:opacity-95"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open résumé in a new tab"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close résumé viewer"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="relative h-[calc(100%-4.25rem)] bg-slate-950">
          {loadError ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-sm text-slate-300">
                Unable to preview the résumé in the browser.
              </p>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-5 py-2.5 text-xs font-semibold text-[var(--suit-accent-ink)] transition hover:opacity-95"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open PDF
              </a>
            </div>
          ) : (
            <iframe
              src={RESUME_URL}
              title="Prathik Salla — Résumé"
              className="h-full w-full"
              onError={() => setLoadError(true)}
            />
          )}
        </div>
      </DetailPortal>
    </>
  );
}