"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronRight, Shield } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { useSPDev } from "@/context/spdev-provider";

interface CertCardProps {
  certification: Certification;
  index: number;
  onOpen: (certification: Certification) => void;
}

export function CertCard({ certification, index, onOpen }: CertCardProps) {
  const { reducedMotion } = useSPDev();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: (index % 2) * 0.05 }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(certification)}
        aria-haspopup="dialog"
        aria-label={`Open ${certification.title} details`}
        className="group relative flex h-full w-full flex-col justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-[var(--suit-web)] focus-visible:outline-offset-2"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--suit-accent)] font-semibold">
              {certification.issuer}
            </p>
            <span className="font-mono text-[10px] text-slate-400">
              {certification.yearIssued}
            </span>
          </div>

          <h3 className="text-sm font-semibold leading-snug text-white group-hover:text-white">
            {certification.title}
          </h3>

          {certification.credentialId && (
            <p className="font-mono text-[10px] text-slate-400 flex items-center gap-1 pt-1 truncate">
              <Shield className="h-3 w-3 text-[var(--suit-accent)] shrink-0" />
              <span className="text-slate-500">ID:</span>
              <span className="text-slate-300 truncate">{certification.credentialId}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/6 pt-3 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium ${
              certification.verificationUrl
                ? "border-[var(--suit-success)]/30 bg-[var(--suit-success)]/10 text-[var(--suit-success)]"
                : "border-white/10 bg-white/[0.03] text-slate-300"
            }`}
          >
            {certification.verificationUrl ? (
              <BadgeCheck className="h-3.5 w-3.5" />
            ) : (
              <Shield className="h-3.5 w-3.5 text-[var(--suit-accent)]" />
            )}
            {certification.verificationUrl
              ? "Verified Credential"
              : certification.credentialId
              ? "Credential ID"
              : "Coursework Completed"}
          </span>

          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-[var(--suit-accent)] transition-colors">
            Details <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
