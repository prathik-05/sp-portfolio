"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSPDev } from "@/context/spdev-provider";
import { cn } from "@/lib/utils";

interface TrailDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Burst {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
}

/**
 * Original spider-themed cursor (Classic: crimson/white web-head,
 * Venom: white/silver symbiote). Never shown on touch devices or when
 * prefers-reduced-motion is set — the native browser cursor is the fallback.
 */
export function SpiderCursor() {
  const { reducedMotion, themeMode } = useSPDev();
  const [isMounted, setIsMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [overIframe, setOverIframe] = useState(false);

  const spiderRef = useRef<HTMLDivElement | null>(null);
  const webRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const isVenom = themeMode === "venom";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || reducedMotion || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const isInteractive = (el: EventTarget | null): boolean => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest("a, button, input, textarea, select, [data-web-target='true'], [role='button']")
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setHovering(isInteractive(e.target));
    };
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    // Over an <iframe> (resume PDF viewer) the parent window stops receiving
    // mousemove, freezing the custom cursor. Restore the native cursor there
    // so the PDF keeps its own working pointer.
    const handleOver = (e: Event) => {
      const target = e.target as Element | null;
      setOverIframe(Boolean(target && target.closest("iframe")));
    };
    const handleOut = (e: Event) => {
      const target = e.target as Element | null;
      const related = (e as MouseEvent).relatedTarget as Element | null;
      const nextOverIframe = Boolean(
        related && (target?.closest("iframe") || related.closest("iframe"))
      );
      setOverIframe(nextOverIframe);
    };

    // Hide the native cursor only while the custom cursor is active.
    document.documentElement.classList.add("spider-cursor-active");

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });

    const dots: TrailDot[] = [];
    const bursts: Burst[] = [];
    const accent = isVenom ? "232,232,238" : "229,9,20";

    const spawnTrail = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) {
        if (dots.length > 40) break;
        dots.push({
          x: x + (Math.random() - 0.5) * 3,
          y: y + (Math.random() - 0.5) * 3,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          life: 0,
          maxLife: 14 + Math.random() * 6,
          size: 1 + Math.random() * 1.4
        });
      }
    };

    const spawnBurst = (x: number, y: number) => {
      const n = 6;
      for (let i = 0; i < n; i++) {
        bursts.push({
          x,
          y,
          angle: (i / n) * Math.PI * 2 + Math.random() * 0.4,
          speed: 1.6 + Math.random() * 1.6,
          life: 0,
          maxLife: 12
        });
      }
    };

    const onDown = () => {
      if (target.current.x > 0) spawnBurst(target.current.x, target.current.y);
    };

    let lastX = -100;
    let lastY = -100;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Lighter lerp keeps the spider crisp; the trail is the "web" lag.
      current.current.x += (target.current.x - current.current.x) * 0.5;
      current.current.y += (target.current.y - current.current.y) * 0.5;

      const cx = current.current.x;
      const cy = current.current.y;

      if (spiderRef.current) {
        spiderRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      if (webRef.current) {
        webRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }

      // Web trail — tiny, short-lived trailing dots.
      frame++;
      if (frame % 2 === 0) {
        const dist = Math.hypot(target.current.x - lastX, target.current.y - lastY);
        if (dist > 0.8) {
          spawnTrail(target.current.x, target.current.y);
          lastX = target.current.x;
          lastY = target.current.y;
        }
      }

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        d.life++;
        if (d.life >= d.maxLife) {
          dots.splice(i, 1);
          continue;
        }
        const t = 1 - d.life / d.maxLife;
        ctx.save();
        ctx.globalAlpha = t * 0.5;
        ctx.fillStyle = `rgba(${accent},1)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * t, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Click burst — tiny web-burst radial ticks.
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life++;
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        b.speed *= 0.88;
        if (b.life >= b.maxLife) {
          bursts.splice(i, 1);
          continue;
        }
        const t = 1 - b.life / b.maxLife;
        ctx.save();
        ctx.globalAlpha = t * 0.7;
        ctx.strokeStyle = `rgba(${accent},1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + Math.cos(b.angle) * 4, b.y + Math.sin(b.angle) * 4);
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(draw);
    };

    const raf = requestAnimationFrame(draw);
    window.addEventListener("mousedown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("spider-cursor-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", onDown);
    };
  }, [isMounted, reducedMotion, isVenom]);

  if (
    !isMounted ||
    reducedMotion ||
    typeof window === "undefined" ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return null;
  }

  return createPortal(
    <>
      {/* Web trail + click burst canvas */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[999999999]" />

      {/* Tiny web connection shown while hovering interactive elements */}
      <div
        ref={webRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[999999999] transition-opacity duration-200",
          hovering ? "opacity-70" : "opacity-0"
        )}
      >
        <svg
          viewBox="0 0 40 40"
          className={cn(
            "h-10 w-10",
            isVenom ? "text-white" : "text-[var(--suit-accent)]"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M20 20 L20 4" />
          <path d="M20 20 L32 8" />
          <path d="M20 20 L34 22" />
          <path d="M20 20 L6 12" />
          <path d="M20 20 L10 32" />
          <path d="M20 20 L30 34" />
          <path d="M20 20 L4 22" />
          <path d="M20 20 L16 4" />
          <path d="M7 12 A17 17 0 0 1 16 4" />
          <path d="M24 4 A17 17 0 0 1 33 12" />
          <path d="M33 22 A15 15 0 0 1 30 34" />
          <path d="M10 32 A15 15 0 0 1 7 22" />
        </svg>
      </div>

      {/* Original spider emblem — the cursor itself. */}
      <div
        ref={spiderRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[999999999] will-change-transform transition-[width,height,opacity] duration-200 ease-out",
          hovering ? "h-7 w-7" : "h-5 w-5",
          overIframe && "opacity-0"
        )}
        style={{ opacity: clicking ? 0.85 : 1 }}
      >
        <svg
          viewBox="0 0 32 32"
          className={cn(
            "h-full w-full drop-shadow",
            isVenom ? "text-white" : "text-[var(--suit-accent)]"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Body */}
          <ellipse cx="16" cy="19" rx="4.6" ry="6.4" />
          {/* Head */}
          <circle cx="16" cy="10" r="2.6" />
          {/* Legs — 4 per side */}
          <path d="M12 14.5 L7 10 L4 12" />
          <path d="M12 16.5 L6 15 L3 18" />
          <path d="M12 19.5 L6 20 L3.5 24" />
          <path d="M12 22.5 L7 24.5 L5 28" />
          <path d="M20 14.5 L25 10 L28 12" />
          <path d="M20 16.5 L26 15 L29 18" />
          <path d="M20 19.5 L26 20 L28.5 24" />
          <path d="M20 22.5 L25 24.5 L27 28" />
        </svg>
      </div>
    </>,
    document.body
  );
}