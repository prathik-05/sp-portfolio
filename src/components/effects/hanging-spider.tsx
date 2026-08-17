"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSPDev } from "@/context/spdev-provider";

const HANG_DURATION_MS = 25000;

const paletteBySuit = {
  classic: {
    body: "#d4001a",
    dark: "#8a000f",
    web: "#ffffff",
    eye: "#ffffff",
    thread: "rgba(255,255,255,0.85)",
    glow: "rgba(229,9,20,0.5)"
  },
  cyber: {
    body: "#00F0FF",
    dark: "#0080FF",
    web: "#00F0FF",
    eye: "#ffffff",
    thread: "rgba(0,240,255,0.85)",
    glow: "rgba(0,240,255,0.5)"
  },
  stealth: {
    body: "#0f0f14",
    dark: "#050508",
    web: "#d9d9e3",
    eye: "#FF1E27",
    thread: "rgba(220,220,230,0.65)",
    glow: "rgba(150,150,170,0.45)"
  }
} as const;

// Classic spider legs
const LEGS = [
  "M46 30 Q28 16 17 13 Q9 10 6 16",
  "M44 38 Q22 30 13 34 Q6 36 5 44",
  "M44 46 Q20 50 13 56 Q8 61 7 68",
  "M46 54 Q26 68 18 74 Q12 79 10 86"
];

// Venom Symbiote sharp angular tendril legs
const VENOM_LEGS = [
  "M46 26 L30 12 L18 8 L6 16 L14 20 L22 17 L40 28",
  "M44 34 L24 26 L12 28 L2 40 L12 42 L24 36 L42 40",
  "M44 46 L22 52 L10 60 L4 74 L14 70 L24 62 L42 52",
  "M46 54 L28 66 L16 74 L8 86 L18 84 L28 76 L44 62"
];

function VenomSpiderGraphic() {
  return (
    <svg
      width="104"
      height="150"
      viewBox="0 0 104 150"
      fill="none"
      className="block filter drop-shadow-[0_6px_22px_rgba(255,255,255,0.4)] shrink-0"
    >
      {/* Silver-White Glow Aura */}
      <circle cx="52" cy="52" r="44" fill="rgba(232,232,238,0.14)" filter="blur(14px)" />

      {/* Symbiote Sharp Legs — Left (jagged tendrils) */}
      <g stroke="#111111" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" fill="none">
        {VENOM_LEGS.map((d, i) => (
          <path key={`VL${i}`} d={d} />
        ))}
      </g>
      <g stroke="#2a2a2a" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none">
        {VENOM_LEGS.map((d, i) => (
          <path key={`VLH${i}`} d={d} />
        ))}
      </g>

      {/* Symbiote Sharp Legs — Right (Mirrored) */}
      <g
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        transform="translate(104, 0) scale(-1, 1)"
      >
        {VENOM_LEGS.map((d, i) => (
          <path key={`VR${i}`} d={d} />
        ))}
      </g>
      <g
        stroke="#2a2a2a"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        transform="translate(104, 0) scale(-1, 1)"
      >
        {VENOM_LEGS.map((d, i) => (
          <path key={`VRH${i}`} d={d} />
        ))}
      </g>

      {/* Black Liquid Symbiote Abdomen */}
      <ellipse cx="52" cy="72" rx="22" ry="30" fill="#000000" stroke="#3f3f46" strokeWidth="1.2" />
      <ellipse cx="52" cy="72" rx="16" ry="22" fill="#08080a" />
      {/* Symbiote sheen */}
      <ellipse cx="44" cy="62" rx="8" ry="16" fill="#1a1a1f" opacity="0.6" />

      {/* White Venom Spider Emblem (classic V-style) */}
      <g fill="#ffffff">
        <path d="M52 54 L45 68 L52 92 L59 68 Z" />
        <path d="M52 62 L30 54 L28 60 L52 68 Z" />
        <path d="M52 62 L74 54 L76 60 L52 68 Z" />
        <path d="M52 78 L28 86 L28 80 L52 72 Z" />
        <path d="M52 78 L76 86 L76 80 L52 72 Z" />
        <path d="M46 62 L44 50 M58 62 L60 50" stroke="#ffffff" strokeWidth="3" strokeLinecap="square" />
      </g>

      {/* Cephalothorax / Head with jagged symbiote edges */}
      <path
        d="M38 44 Q36 28 52 24 Q68 28 66 44 Q70 40 74 46 Q66 48 66 50 Q60 54 52 54 Q44 54 38 50 Q38 48 30 46 Q34 40 38 44 Z"
        fill="#000000"
        stroke="#3f3f46"
        strokeWidth="1.2"
      />
      <path
        d="M40 44 Q40 30 52 26 Q64 30 64 44"
        fill="#08080a"
        stroke="none"
      />

      {/* Large Jagged Venom Eyes (white, furious) */}
      <path d="M36 36 Q44 30 50 38 Q44 44 38 42 Z" fill="#ffffff" />
      <path d="M68 36 Q60 30 54 38 Q60 44 66 42 Z" fill="#ffffff" />
      <path d="M38 40 L32 36 M44 40 L48 35" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="square" />

      {/* Dripping symbiote goo from the head */}
      <path d="M40 46 Q39 54 41 58 Q40 54 42 48" fill="#050505" />
      <path d="M64 46 Q65 56 63 60 Q64 56 62 48" fill="#050505" />
    </svg>
  );
}

function SpiderGraphic() {
  const p = paletteBySuit.classic;

  return (
    <svg
      width="92"
      height="126"
      viewBox="0 0 92 126"
      fill="none"
      className="block filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] shrink-0"
    >
      {/* Glow aura */}
      <circle cx="46" cy="48" r="38" fill={p.glow} opacity="0.3" filter="blur(10px)" />

      {/* Legs — Left */}
      <g stroke={p.body} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {LEGS.map((d, i) => (
          <path key={`L${i}`} d={d} />
        ))}
      </g>

      {/* Legs — Right (mirrored) */}
      <g
        stroke={p.body}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(92, 0) scale(-1, 1)"
      >
        {LEGS.map((d, i) => (
          <path key={`R${i}`} d={d} />
        ))}
      </g>

      {/* Abdomen */}
      <ellipse cx="46" cy="62" rx="17" ry="24" fill={p.body} />
      <ellipse cx="46" cy="62" rx="14" ry="20" fill={p.dark} opacity="0.45" />

      {/* Cephalothorax */}
      <circle cx="46" cy="38" r="13" fill={p.body} />
      <circle cx="46" cy="38" r="10" fill={p.dark} opacity="0.4" />

      {/* Spider emblem on abdomen */}
      <path
        d="M46 48 L42 58 L46 76 L50 58 Z"
        fill={p.web}
        opacity="0.9"
      />
      <path
        d="M46 54 L34 50 M46 54 L58 50 M46 64 L32 68 M46 64 L60 68"
        stroke={p.web}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Fangs */}
      <path d="M42 27 Q44 21 45 24 M50 27 Q48 21 47 24" stroke={p.web} strokeWidth="2.2" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="41" cy="34" rx="2.5" ry="3.5" fill={p.eye} />
      <ellipse cx="51" cy="34" rx="2.5" ry="3.5" fill={p.eye} />
      <circle cx="36" cy="36" r="1.4" fill={p.eye} opacity="0.8" />
      <circle cx="56" cy="36" r="1.4" fill={p.eye} opacity="0.8" />
    </svg>
  );
}

export function HangingSpider() {
  const { themeMode, reducedMotion } = useSPDev();
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [mounted, setMounted] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPhase("enter");
    setMounted(true);

    timerRef.current = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => setMounted(false), 900);
    }, HANG_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted) return null;

  const isVenom = themeMode === "venom";
const threadColor = isVenom ? "rgba(232, 232, 238, 0.9)" : paletteBySuit.classic.thread;
const threadGlow = isVenom ? "rgba(232, 232, 238, 0.45)" : paletteBySuit.classic.glow;

  return (
    <div aria-hidden className="pointer-events-none fixed top-20 right-3 z-30 sm:right-10">
      <motion.div
        animate={reducedMotion ? {} : { rotate: [0, -7, 6, -5, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
        className="flex flex-col items-center"
      >
        {/* Curved silk thread */}
        <svg
          className="block w-[10px] h-[26vh] shrink-0"
          viewBox="0 0 10 400"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <motion.path
            d="M5 0 C 2 90, 9 220, 5 400"
            stroke={threadColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            fill="none"
            style={{ filter: `drop-shadow(0 0 6px ${threadGlow})` }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase === "exit" ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>

        {/* Spider body (drops in, bobs, then recedes) */}
        <motion.div
          className="-mt-[18px]"
          initial={reducedMotion ? false : { y: -120, opacity: 0 }}
          animate={phase === "exit" ? { y: -46, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={
            phase === "exit"
              ? { duration: 0.75, ease: "easeIn" }
              : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }
          }
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -5, 2, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {isVenom ? <VenomSpiderGraphic /> : <SpiderGraphic />}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
