"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldQuestion, ChevronRight } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { useSPDev } from "@/context/spdev-provider";

interface CertCardProps {
  certification: Certification;
  index: number;
  onOpen: (certification: Certification) => void;
}

export function CertCard({ certification, index, onOpen }: CertCardProps) {
  const { reducedMotion } = useSPDev();
  const verified = certification.verificationStatus === "verified";

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
        className="group relative flex h-full w-full flex-col justify-between gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-[var(--suit-web)] focus-visible:outline-offset-2"
      >
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {certification.issuer}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-white">
            {certification.title}
          </h3>
        </div>

        <div className="flex items-center justify-between border-t border-white/6 pt-3 text-xs">
          <span className="font-mono text-slate-400">
            {certification.yearIssued ?? "Not provided"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium ${
              verified
                ? "border-[var(--suit-success)]/30 bg-[var(--suit-success)]/10 text-[var(--suit-success)]"
                : "border-white/10 bg-white/[0.03] text-slate-300"
            }`}
          >
            {verified ? (
              <BadgeCheck className="h-3 w-3" />
            ) : (
              <ShieldQuestion className="h-3 w-3" />
            )}
            {verified ? "Verified" : "Self-reported"}
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-4 right-4 hidden text-slate-500 transition-colors group-hover:text-[var(--suit-accent)] sm:inline-flex">
          <ChevronRight className="h-4 w-4" />
        </span>
      </button>
    </motion.div>
  );
}