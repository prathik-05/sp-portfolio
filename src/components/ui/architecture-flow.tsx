"use client";

import { motion } from "framer-motion";

export function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <motion.div
          key={`${step}-${index}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.55 }}
          className="relative rounded-[1.35rem] bg-white/[0.07] p-4 text-sm font-semibold text-slate-100"
        >
          <span className="mb-4 block font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
          {step}
          {index < steps.length - 1 ? (
            <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan/50 lg:block" />
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
