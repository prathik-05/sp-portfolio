"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";

// Static low-overhead background buildings for cinematic depth
const SKYLINE_FAR = [
  { left: 0, w: 12, h: 48 },
  { left: 14, w: 10, h: 62 },
  { left: 26, w: 16, h: 38 },
  { left: 44, w: 12, h: 54 },
  { left: 58, w: 18, h: 42 },
  { left: 78, w: 10, h: 58 },
  { left: 90, w: 10, h: 44 }
];

const SKYLINE = [
  { left: 0, w: 8, h: 65 },
  { left: 7, w: 10, h: 88 },
  { left: 16, w: 7, h: 52 },
  { left: 22, w: 12, h: 74 },
  { left: 33, w: 9, h: 96 },
  { left: 41, w: 14, h: 60 },
  { left: 54, w: 8, h: 82 },
  { left: 61, w: 11, h: 70 },
  { left: 71, w: 9, h: 90 },
  { left: 79, w: 12, h: 64 },
  { left: 90, w: 10, h: 78 }
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 5.8 + 2) % 96,
  dur: 10 + (i % 5) * 3,
  delay: (i % 6) * 1.8,
  size: 3 + (i % 3) * 2
}));

const SACS = [
  { id: 1, left: 18, top: 22, size: 48 },
  { id: 2, left: 74, top: 16, size: 64 },
  { id: 3, left: 46, top: 38, size: 36 }
];

const TENDRILS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: (i * 8.2 + 3) % 94,
  h: 30 + (i % 5) * 14,
  w: 2 + (i % 3) * 2,
  skew: (i % 2 === 0 ? 1 : -1) * (4 + (i % 4) * 3),
  sway: 6 + (i % 4) * 2.5
}));

export function CinematicBackdrop() {
  const { themeMode, reducedMotion } = useSPDev();
  const venom = themeMode === "venom";
  const reduce = reducedMotion;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ——— Night sky with suit-reactive ambience ——— */}
      <div
        className="absolute inset-0"
        style={{
          background: venom
            ? "radial-gradient(120% 85% at 72% 6%, rgba(30, 30, 36, 0.5), transparent 58%)," +
              "radial-gradient(95% 70% at 16% 96%, rgba(var(--suit-accent-rgb), 0.1), transparent 62%)," +
              "linear-gradient(to bottom, #000000 0%, #07070a 52%, #000000 100%)"
            : "radial-gradient(120% 85% at 72% 6%, rgba(var(--suit-secondary-rgb), 0.1), transparent 58%)," +
              "radial-gradient(95% 70% at 16% 96%, rgba(var(--suit-accent-rgb), 0.14), transparent 62%)," +
              "linear-gradient(to bottom, #05070d 0%, #070a13 52%, #04060d 100%)"
        }}
      />

      {/* ——— Venom wallpaper texture (venom only): ambient symbiote wallpaper across the scroll ——— */}
      {venom && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/venom.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* ——— Soft suit-glow pool behind the hero ——— */}
      <div
        className="absolute right-[-8%] top-1/2 h-[130%] w-[70%] -translate-y-1/2"
        style={{
          background: venom
            ? "radial-gradient(52% 58% at 55% 50%, rgba(232, 232, 238, 0.09), transparent 72%)"
            : "radial-gradient(52% 58% at 55% 50%, rgba(var(--suit-accent-rgb), 0.16), transparent 72%)"
        }}
      />

      {/* ——— Egg-sac orbs (venom only): infected nodes glowing in the sky ——— */}
      {venom &&
        SACS.map((s) => (
          <motion.span
            key={`sac-${s.id}`}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: "radial-gradient(circle, rgba(232,232,238,0.3), rgba(12,12,14,0) 70%)",
              boxShadow: "0 0 40px rgba(232,232,238,0.22)"
            }}
            animate={reduce ? {} : { scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: s.size / 14, repeat: Infinity, ease: "easeInOut", delay: s.id * 0.7 }}
          />
        ))}

      {/* ——— Rising ambient particles (CSS-float) ——— */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-2vh]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: venom ? "rgba(232, 232, 238, 0.75)" : "rgba(var(--suit-secondary-rgb), 0.9)",
            boxShadow: venom ? "0 0 8px rgba(232, 232, 238, 0.7)" : "0 0 6px rgba(var(--suit-secondary-rgb), 0.8)",
            borderRadius: venom ? "1px" : "9999px",
            transform: venom ? "rotate(45deg)" : "none"
          }}
          animate={
            reduce
              ? {}
              : { y: [0, -860], opacity: [0, 0.9, 0] }
          }
          transition={{ duration: p.dur, repeat: Infinity, ease: "linear", delay: p.delay }}
        />
      ))}

      {/* ——— Distant skyline band ——— */}
      <div className="absolute inset-x-0 bottom-0 h-[44vh]">
        {SKYLINE_FAR.map((b, i) => (
          <div
            key={`far-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${b.left}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              background: venom
                ? "linear-gradient(to top, #000000 0%, #0a0a0d 100%)"
                : "linear-gradient(to top, #04060b 0%, #080b16 100%)",
              opacity: 0.75
            }}
          />
        ))}
        {/* Far-band lit windows */}
        <div
          className="absolute inset-0"
          style={{
            opacity: venom ? 0.18 : 0.34,
            backgroundImage: venom
              ? "radial-gradient(circle at 30% 40%, rgba(232,232,238,0.5) 1px, transparent 1.4px)"
              : [
                  "radial-gradient(circle at 30% 40%, rgba(var(--suit-secondary-rgb), 0.9) 1px, transparent 1.4px)",
                  "radial-gradient(circle at 72% 62%, rgba(var(--suit-secondary-rgb), 0.7) 1px, transparent 1.4px)",
                  "radial-gradient(circle at 12% 80%, rgba(255,255,255,0.8) 1px, transparent 1.4px)"
                ].join(", "),
            backgroundSize: venom ? "70px 96px" : "46px 38px, 70px 56px, 96px 72px"
          }}
        />
      </div>

      {/* ——— Near skyline band ——— */}
      <div className="absolute inset-x-0 bottom-0 h-[34vh]">
        {SKYLINE.map((b, i) => (
          <div
            key={`near-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${b.left}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              background: venom
                ? "linear-gradient(to top, #000000 0%, #08080a 78%, #101014 100%)"
                : "linear-gradient(to top, #02030a 0%, #05070f 78%, #0a0d18 100%)"
            }}
          />
        ))}
        {/* Near-band lit windows + roof beacons */}
        <div
          className="absolute inset-0"
          style={{
            opacity: venom ? 0.22 : 0.5,
            backgroundImage: venom
              ? "radial-gradient(circle at 38% 48%, rgba(232,232,238,0.4) 1px, transparent 1.5px)"
              : "radial-gradient(circle at 38% 48%, rgba(var(--suit-secondary-rgb), 0.95) 1px, transparent 1.5px)," +
                "radial-gradient(circle at 66% 70%, rgba(var(--suit-accent-rgb), 0.8) 1px, transparent 1.5px)",
            backgroundSize: venom ? "70px 62px" : "42px 34px, 64px 44px",
            maskImage: "linear-gradient(to top, black 22%, transparent 78%)",
            WebkitMaskImage: "linear-gradient(to top, black 22%, transparent 78%)"
          }}
        />
        {SKYLINE.map((b, i) =>
          i % 4 === 1 ? (
            <motion.span
              key={`bc-${i}`}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${b.left + b.w / 2}%`,
                bottom: `${b.h + 0.6}%`,
                background: venom ? "#e8e8ee" : "#ff342f",
                boxShadow: venom ? "0 0 8px rgba(232,232,238,0.9)" : "0 0 6px rgba(255, 52, 47, 0.9)"
              }}
              animate={reduce ? {} : { opacity: [1, 0.2, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
            />
          ) : null
        )}

        {/* ——— Symbiote tendrils (venom only): goo climbing the towers ——— */}
        {venom &&
          TENDRILS.map((t) => (
            <div
              key={`tend-${t.id}`}
              className="absolute bottom-0"
              style={{
                left: `${t.left}%`,
                width: t.w,
                height: `${t.h}%`,
                transformOrigin: "bottom",
                transform: `skewX(${t.skew}deg) scaleX(${1 + (t.id % 3) * 0.3})`
              }}
            >
              <motion.span
                className="absolute bottom-0 left-0 right-0 top-0"
                style={{
                  transformOrigin: "bottom",
                  background: "linear-gradient(to top, transparent, rgba(232, 232, 238, 0.4) 82%)",
                  filter: "blur(0.4px)",
                  opacity: 0.7
                }}
                animate={reduce ? {} : { scaleY: [1, 0.82, 1] }}
                transition={{ duration: t.sway, repeat: Infinity, ease: "easeInOut", delay: t.id * 0.4 }}
              />
            </div>
          ))}
      </div>

      {/* ——— Top-down volumetric light beam over the hero area ——— */}
      <div
        className="absolute right-[6%] top-[-8%] h-[70%] w-[26%]"
        style={{
          background: venom
            ? "linear-gradient(to bottom, rgba(232, 232, 238, 0.07), transparent 82%)"
            : "linear-gradient(to bottom, rgba(var(--suit-secondary-rgb), 0.1), transparent 82%)",
          clipPath: venom ? "polygon(12% 0%, 88% 0%, 55% 100%, 24% 100%)" : "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
          opacity: venom ? 0.5 : 0.7
        }}
      />

      {/* ——— Bottom atmospheric haze ——— */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30vh]"
        style={{
          background: venom
            ? "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(to top, #04060d 0%, rgba(4,6,13,0.7) 100%)"
        }}
      />
    </div>
  );
}