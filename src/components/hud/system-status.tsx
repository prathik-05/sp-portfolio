"use client";

import React from "react";
import { Activity, ShieldCheck } from "lucide-react";
import { useSPDev } from "@/context/spdev-provider";

export function SystemStatus() {
  const { themeMode } = useSPDev();

  return (
    <div className="pointer-events-none fixed top-[4.25rem] left-4 z-40 hidden lg:flex items-center gap-2.5 rounded-full border border-[var(--suit-border)] bg-black/85 px-3 py-1 font-mono text-[10px] text-slate-300 backdrop-blur-md shadow-md">
      <Activity className="h-3 w-3 text-[var(--suit-web)] animate-pulse" />
      <span>SYS_STATUS:</span>
      <span className="font-bold text-[var(--suit-success)] flex items-center gap-1">
        <ShieldCheck className="h-3 w-3" />
        {themeMode === "venom" ? "SYMBIOTE OVERCLOCK" : "OPTIMAL 60 FPS"}
      </span>
    </div>
  );
}
