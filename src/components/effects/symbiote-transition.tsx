"use client";

import React, { useEffect, useRef } from "react";
import { useSPDev } from "@/context/spdev-provider";

export function SymbioteTransition() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeTransition, completeTransition, reducedMotion } = useSPDev();

  useEffect(() => {
    if (!activeTransition?.isTransitioning) return;

    if (reducedMotion) {
      completeTransition();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const originX = activeTransition.originX;
    const originY = activeTransition.originY;
    const maxRadius = Math.hypot(
      Math.max(originX, width - originX),
      Math.max(originY, height - originY)
    ) * 1.25;

    const startTime = performance.now();
    const duration = 850; // total transition duration in ms
    let swapped = false;
    let animFrameId: number;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, width, height);

      // Phase 1 (0 to 0.5): Expand dark liquid symbiote mass
      // Phase 2 (0.5 to 1.0): Recede dark liquid mass revealing new theme
      let currentRadius = 0;
      let alpha = 1;

      if (progress < 0.5) {
        const p1 = progress / 0.5;
        // Ease in quad
        currentRadius = maxRadius * (p1 * p1);
      } else {
        if (!swapped) {
          swapped = true;
          completeTransition();
        }
        const p2 = (progress - 0.5) / 0.5;
        // Ease out quad
        currentRadius = maxRadius * (1 - p2 * (2 - p2));
        alpha = 1 - p2;
      }

      // Draw dark organic symbiote circle mass with tendril distortions
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = activeTransition.targetMode === "venom" ? "#050505" : "#0a0c14";
      ctx.globalAlpha = Math.min(alpha, 1);

      // Draw main expanding circle
      ctx.arc(originX, originY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw organic tendril waves along edge
      if (currentRadius > 10) {
        ctx.beginPath();
        const tendrilCount = 24;
        for (let i = 0; i <= tendrilCount; i++) {
          const angle = (i / tendrilCount) * Math.PI * 2;
          const wobble = Math.sin(angle * 6 + progress * 12) * 18 * Math.sin(progress * Math.PI);
          const r = currentRadius + wobble;
          const x = originX + Math.cos(angle) * r;
          const y = originY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.fillStyle = activeTransition.targetMode === "venom" ? "#e8e8ee" : "#00f0ff";
        ctx.globalAlpha = 0.35 * Math.sin(progress * Math.PI);
        ctx.fill();
      }

      ctx.restore();

      if (progress < 1) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [activeTransition, completeTransition, reducedMotion]);

  if (!activeTransition?.isTransitioning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999999] h-full w-full"
    />
  );
}
