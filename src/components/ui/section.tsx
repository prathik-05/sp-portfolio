"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} data-depth-reveal className={cn("section-shell scroll-mt-28 py-20 sm:py-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-10 max-w-3xl"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
          {eyebrow}
        </p>
        <h2 className="display-soft font-display text-[clamp(2.25rem,4.7vw,4.8rem)] text-ink dark:text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            {description}
          </p>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
}
