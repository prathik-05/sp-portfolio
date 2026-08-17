"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  code?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  code,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl", className)}
    >
      {/* Eyebrow */}
      <div className={cn("flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase", centered && "justify-center")}>
        {code && (
          <span className="font-bold text-[var(--suit-accent)]">{code}</span>
        )}
        {code && <span className="text-white/20">•</span>}
        <span className="text-slate-400 font-semibold tracking-[0.2em]">{eyebrow}</span>
      </div>

      {/* Title */}
      <div className="relative mt-3">
        <h2
          data-text={title}
          className="venom-glitch-text classic-pop-title text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-tight text-white leading-[1.05]"
          style={{ fontFamily: "var(--font-display-aggressive)" }}
        >
          {title} {accent && <span className="text-[var(--suit-accent)]">{accent}</span>}
        </h2>
      </div>

      {description ? (
        <p className={cn("mt-4 text-base sm:text-lg leading-relaxed text-slate-400 font-normal", centered && "mx-auto max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}