"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  scan?: boolean;
}

export function HudFrame({ children, className }: HudFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}