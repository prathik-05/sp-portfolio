"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";
import { playWebShooter } from "@/lib/spidey-audio";

interface ActiveWeb {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isRightWrist: boolean;
}

const NEST_RADII = [46, 34, 22, 11];
const SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const SPARK_ANGLES = [15, 60, 105, 150, 195, 240, 285, 330];

const ENERGY_BARS = [
  { dur: 1.4, delay: 0 },
  { dur: 1.6, delay: 0.2 },
  { dur: 1.3, delay: 0.4 }
];

function digitPrecision(num: number): number {
  return Math.round(num * 10) / 10;
}

function curvedFilament(x1: number, y1: number, x2: number, y2: number, sagRatio: number = 0.08): string {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const perpX = -dy / (len || 1);
  const perpY = dx / (len || 1);
  const sag = len * sagRatio;
  const ctrlX = digitPrecision(midX + perpX * sag);
  const ctrlY = digitPrecision(midY + perpY * sag);
  return `M ${digitPrecision(x1)} ${digitPrecision(y1)} Q ${ctrlX} ${ctrlY} ${digitPrecision(x2)} ${digitPrecision(y2)}`;
}

function waveFilament(x1: number, y1: number, x2: number, y2: number, offsetRatio: number = 0.12): string {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / (len || 1);
  const dy = (y2 - y1) / (len || 1);
  const px = -dy * len * offsetRatio;
  const py = dx * len * offsetRatio;

  const c1x = digitPrecision(x1 + (x2 - x1) * 0.33 + px);
  const c1y = digitPrecision(y1 + (y2 - y1) * 0.33 + py);
  const c2x = digitPrecision(x1 + (x2 - x1) * 0.66 - px);
  const c2y = digitPrecision(y1 + (y2 - y1) * 0.66 - py);

  return `M ${digitPrecision(x1)} ${digitPrecision(y1)} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${digitPrecision(x2)} ${digitPrecision(y2)}`;
}

function curvedArc(radius: number, angle1: number, angle2: number, dipRatio: number = 0.72): string {
  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = (angle2 * Math.PI) / 180;
  const x1 = digitPrecision(Math.cos(rad1) * radius);
  const y1 = digitPrecision(Math.sin(rad1) * radius);
  const x2 = digitPrecision(Math.cos(rad2) * radius);
  const y2 = digitPrecision(Math.sin(rad2) * radius);

  const midAngle = ((angle1 + angle2) / 2) * (Math.PI / 180);
  const dipR = radius * dipRatio;
  const cx = digitPrecision(Math.cos(midAngle) * dipR);
  const cy = digitPrecision(Math.sin(midAngle) * dipR);

  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function WebShooter() {
  const { webShooterTarget, shootWebAt, themeMode, reducedMotion } = useSPDev();
  const [activeWebs, setActiveWebs] = useState<ActiveWeb[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const isRightWristRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!webShooterTarget || typeof window === "undefined") return;

    playWebShooter();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isRight = isRightWristRef.current;
    isRightWristRef.current = !isRight;

    const startX = isRight ? w - 30 : 30;
    const startY = h - 20;

    const targetX = Math.max(20, Math.min(w - 20, webShooterTarget.x));
    const targetY = Math.max(20, Math.min(h - 20, webShooterTarget.y));

    const webId = `web-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newWeb: ActiveWeb = {
      id: webId,
      startX,
      startY,
      endX: targetX,
      endY: targetY,
      isRightWrist: isRight
    };

    setActiveWebs((prev) => [...prev, newWeb]);

    setTimeout(() => {
      setActiveWebs((prev) => prev.filter((item) => item.id !== webId));
    }, 450);
  }, [webShooterTarget]);

  const handleShootRandom = () => {
    if (typeof window === "undefined") return;
    const targets = document.querySelectorAll(
      "h1, h2, h3, button, a, [data-web-target='true']"
    );
    if (targets.length > 0) {
      const idx = Math.floor(Math.random() * targets.length);
      shootWebAt(targets[idx] as HTMLElement);
    }
  };

  if (!isMounted) return null;

  const accentRGB = themeMode === "venom" ? "232,232,238" : "0,240,255";
  const accentSolid = themeMode === "venom" ? "#e8e8ee" : "#00f0ff";

  return (
    <>
      {/* Floating Web-Shooter Gauntlet Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="spdev-web-shooter-btn"
          onClick={handleShootRandom}
          className="webshooter-gauntlet hud-glass-panel group flex items-center gap-3 rounded-2xl border-2 border-[var(--suit-accent)] bg-black/90 px-4 py-2.5 font-mono text-xs font-bold text-white transition-all hover:scale-105 hover:border-[var(--suit-web)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--suit-accent)]"
          aria-label="Fire Spider-Man Web Shooters"
        >
          {/* Shooter nozzle core */}
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--suit-accent)]/30 to-[var(--suit-web)]/10 border border-[var(--suit-web)]/40 overflow-hidden">
            <span
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ background: `radial-gradient(circle at 50% 40%, ${accentSolid}22, transparent 70%)` }}
            />
            <motion.span
              className="relative h-3 w-3 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 30%, #ffffff, ${accentSolid} 65%)`,
                boxShadow: `0 0 12px ${accentSolid}, 0 0 26px ${accentSolid}88`
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-white/30"
              animate={{ scale: [0.4, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            />
            {themeMode !== "venom" && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[var(--suit-accent)] animate-ping" />
            )}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-white font-extrabold tracking-wider">{"// THWIP! WEB SHOOTER"}</span>
            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[var(--suit-web)]">
              {ENERGY_BARS.map((bar, i) => (
                <motion.span
                  key={i}
                  className="inline-block h-[6px] w-[6px] rounded-sm"
                  style={{ background: accentSolid }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
                  transition={{ duration: bar.dur, repeat: Infinity, delay: bar.delay }}
                />
              ))}
              Charge On
            </span>
          </span>
        </button>
      </div>

      {/* Spider Web Netting & Curved SVG Web Overlay */}
      {!reducedMotion && (
        <svg className="pointer-events-none fixed inset-0 z-[999998] h-full w-full">
          <defs>
            <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`rgb(${accentRGB})`} stopOpacity="0.9" />
              <stop offset="100%" stopColor={`rgb(${accentRGB})`} stopOpacity="0" />
            </radialGradient>
          </defs>

          <AnimatePresence>
            {activeWebs.map((web) => (
              <motion.g
                key={web.id}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none"
              >
                {/* Muzzle burst at the wrist */}
                {[
                  { x: web.startX, y: web.startY },
                  { x: web.endX, y: web.endY }
                ].map((p, i) => (
                  <motion.circle
                    key={`burst-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r={i === 0 ? 9 : 12}
                    fill={`rgb(${accentRGB})`}
                    initial={{ opacity: 0.85, scale: 0.4 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  />
                ))}

                {/* Outer glow energy trail */}
                <motion.path
                  d={waveFilament(web.startX, web.startY, web.endX, web.endY, 0.1)}
                  stroke={`rgb(${accentRGB})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.35"
                  fill="none"
                  style={{ filter: `drop-shadow(0 0 6px rgb(${accentRGB}))` }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />

                {/* Main curved web filament with a subtle sag */}
                <motion.path
                  d={curvedFilament(web.startX, web.startY, web.endX, web.endY, web.isRightWrist ? -0.05 : 0.06)}
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.9))" }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                />

                {/* Secondary S-wave fiber */}
                <motion.path
                  d={waveFilament(web.startX, web.startY, web.endX, web.endY, 0.16)}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeOpacity="0.75"
                  strokeDasharray="7 4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />

                {/* Trailing web residue droplets along the filament */}
                {[0.18, 0.4, 0.62, 0.84].map((t, i) => (
                  <motion.circle
                    key={`drop-${i}`}
                    cx={digitPrecision(web.startX + (web.endX - web.startX) * t)}
                    cy={digitPrecision(web.startY + (web.endY - web.startY) * t)}
                    r={t * 2.2}
                    fill="#ffffff"
                    opacity="0.85"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  />
                ))}

                {/* Impact zone */}
                <g transform={`translate(${web.endX}, ${web.endY})`}>
                  <motion.circle
                    r="30"
                    fill="url(#webGlow)"
                    initial={{ opacity: 0.5, scale: 0.3 }}
                    animate={{ opacity: 0, scale: 1.25 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                  <motion.circle
                    r="6"
                    fill="none"
                    stroke={`rgb(${accentRGB})`}
                    strokeWidth="2.5"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    initial={{ opacity: 0.9, scale: 0.4 }}
                    animate={{ opacity: 0, scale: 1.75 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                  {SPARK_ANGLES.map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const dist = 18 + (i % 3) * 6;
                    return (
                      <motion.circle
                        key={`spark-${i}`}
                        r={1.8}
                        fill="#FFFFFF"
                        initial={{ cx: 0, cy: 0, opacity: 1 }}
                        animate={{ cx: Math.cos(rad) * dist, cy: Math.sin(rad) * dist, opacity: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                      />
                    );
                  })}
                </g>

                {/* Curved 8-spoke spider web nest at target */}
                <g transform={`translate(${web.endX}, ${web.endY}) rotate(22.5)`} style={{ filter: `drop-shadow(0 0 6px rgb(${accentRGB}))` }} className="pointer-events-none">
                  {/* 8 radial spokes */}
                  {SPOKE_ANGLES.map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <motion.line
                        key={`spoke-${i}`}
                        x1="0"
                        y1="0"
                        x2={digitPrecision(Math.cos(rad) * NEST_RADII[0])}
                        y2={digitPrecision(Math.sin(rad) * NEST_RADII[0])}
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.95 }}
                        transition={{ duration: 0.16 }}
                      />
                    );
                  })}

                  {/* Concave curved netting loops */}
                  {NEST_RADII.map((r, rIdx) => {
                    const arcs = SPOKE_ANGLES.map((a, sIdx) => {
                      const next = SPOKE_ANGLES[(sIdx + 1) % SPOKE_ANGLES.length];
                      return ({ key: `arc-${rIdx}-${sIdx}`, d: curvedArc(r, a, next) });
                    });
                    return arcs.map((arc) => (
                      <motion.path
                        key={arc.key}
                        d={arc.d}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                        strokeOpacity={0.85 - rIdx * 0.12}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.85 - rIdx * 0.12 }}
                        transition={{ duration: 0.22, delay: 0.05 + rIdx * 0.035 }}
                      />
                    ));
                  })}

                  {/* Target web impact anchor core */}
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="4.5"
                    fill="#FFFFFF"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.6, 1] }}
                    transition={{ duration: 0.16 }}
                  />
                </g>
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>
      )}
    </>
  );
}