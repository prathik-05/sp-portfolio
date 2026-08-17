"use client";

import React from "react";
import { BadgeCheck, ShieldQuestion, ExternalLink, X } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { DetailPortal } from "@/components/ui/detail-portal";

interface CertVerificationPanelProps {
  certification: Certification | null;
  onClose: () => void;
}

export function CertVerificationPanel({ certification, onClose }: CertVerificationPanelProps) {
  const verified = certification?.verificationStatus === "verified";

  return (
    <DetailPortal
      open={Boolean(certification)}
      onClose={onClose}
      label={`${certification?.title ?? "Certification"} — verification details`}
      className="max-w-md"
    >
      {certification ? (
        <>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 sm:p-7">
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--suit-accent)]">
                {certification.issuer}
              </p>
              <h2 className="font-display text-xl font-bold leading-tight text-white">
                {certification.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close credential details"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 p-6 sm:p-7">
            <dl className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Issued
                </dt>
                <dd className="text-sm font-medium text-white">
                  {certification.yearIssued ?? "Not provided"}
                </dd>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Status
                </dt>
                <dd
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                    verified ? "text-[var(--suit-success)]" : "text-slate-200"
                  }`}
                >
                  {verified ? (
                    <BadgeCheck className="h-4 w-4" />
                  ) : (
                    <ShieldQuestion className="h-4 w-4" />
                  )}
                  {verified ? "Verified" : "Self-reported"}
                </dd>
              </div>

              {certification.credentialId ? (
                <div className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Credential ID
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs text-[var(--suit-web)]">
                    {certification.credentialId}
                  </dd>
                </div>
              ) : null}
            </dl>

            {verified && certification.verificationUrl ? (
              <a
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--suit-accent)] px-6 py-3.5 font-semibold text-[var(--suit-accent-ink)] transition hover:opacity-95"
              >
                View Credential
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-slate-400">
                No public verification is currently available. This credential is self-reported.
              </p>
            )}
          </div>
        </>
      ) : null}
    </DetailPortal>
  );
}