"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useSPDev } from "@/context/spdev-provider";
import { TendrilBorder } from "@/components/effects/tendril-border";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Bounded internal scroll range for Card 1 (~13vh of physical depth). */
const SCROLL_RATIO = 0.13;

const ROLES = [
  "Software Engineer — AI/ML",
  "Multimodal RAG Systems",
  "Real-Time Computer Vision (YOLOv11)",
  "Backend & Distributed Systems"
];

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span>
      {String(display).padStart(2, "0")}
      {suffix}
    </span>
  );
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function Hero() {
  const { themeMode, shootWebAt, setCard, reducedMotion, currentCard } = useSPDev();
  const theme = THEMES[themeMode];
  const isVenom = themeMode === "venom";

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const measure = () => setMaxScroll(Math.round(window.innerHeight * SCROLL_RATIO));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reducedMotion || currentCard !== 1) {
      targetRef.current = 0;
      currentRef.current = 0;
      applyTransforms(0);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let touchStartY = 0;
    let touchStartTarget = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      targetRef.current = clamp(targetRef.current + e.deltaY, 0, maxScroll);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTarget = targetRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      targetRef.current = clamp(touchStartTarget + dy, 0, maxScroll);
    };

    const onTouchEnd = () => {};

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });

    const tick = () => {
      const target = targetRef.current;
      currentRef.current += (target - currentRef.current) * 0.14;
      if (Math.abs(target - currentRef.current) < 0.1) currentRef.current = target;
      applyTransforms(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, currentCard, maxScroll]);

  const applyTransforms = (c: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${-c}px, 0)`;
    }
    if (bgRef.current) {
      bgRef.current.style.transform = `translate3d(0, ${-c * 0.5}px, 0)`;
    }
    if (titleRef.current) {
      titleRef.current.style.transform = `translate3d(0, ${c * 0.18}px, 0)`;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(0, ${-c * 0.18}px, 0)`;
    }
    if (statsRef.current) {
      statsRef.current.style.transform = `translate3d(0, ${c * 0.04}px, 0)`;
    }
  };

  const handleUnlockClick = (e: React.MouseEvent) => {
    shootWebAt(e.currentTarget as HTMLElement);
    setCard(2);
  };

  return (
    <section
      ref={rootRef}
      className="relative min-h-dvh w-full overflow-hidden overscroll-contain bg-[var(--theme-bg)] transition-colors duration-500"
      style={{ touchAction: "pan-y" }}
    >
      {/* Ambient backdrop */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={themeMode === "venom" ? "/images/venom.jpg" : "/images/spp.jpg"}
          alt={themeMode === "venom" ? "Venom background" : "Hero background"}
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover object-center",
            themeMode === "venom" ? "opacity-40" : "opacity-30"
          )}
        />
        <div
          className={cn(
            "absolute inset-0",
            themeMode === "venom"
              ? "bg-gradient-to-b from-black/85 via-black/60 to-black/95"
              : "bg-gradient-to-b from-black/70 via-black/45 to-black/90"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 mix-blend-screen",
            themeMode === "venom"
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(199,203,209,0.10),transparent_55%)]"
              : "bg-[radial-gradient(circle_at_25%_25%,rgba(229,9,20,0.16),transparent_60%)]"
          )}
        />
      </div>

      {/* Soft suit glow pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[68vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--suit-glow) 0%, transparent 66%)"
        }}
      />

      {/* Scrollable stage: min-h-dvh hero + a ~13vh continuation strip */}
      <div
        ref={contentRef}
        className="relative z-10 will-change-transform"
        style={{ height: `calc(100% + ${maxScroll}px)` }}
      >
        {/* Main hero composition: reserved pt-[88px] for fixed navbar */}
        <div className="grid min-h-dvh items-center px-6 pt-[88px] pb-6 sm:px-10 lg:px-16">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* Left: Editorial identity */}
            <div ref={titleRef} className="will-change-transform">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Status line */}
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--suit-success)]" />
                  <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-slate-300 uppercase">
                    Ace Engineering College &apos;27 // Software Engineer — AI/ML
                  </p>
                </div>

                {/* Main Name Heading */}
                <div className="space-y-4">
                  <h1
                    data-text={`${theme.copy.heroTitleFirst} ${theme.copy.heroTitleLast}`}
                    className="venom-glitch-text classic-pop-title font-display-aggressive text-[clamp(2.8rem,7.5vw,7.2rem)] font-bold leading-[0.88] tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display-aggressive)" }}
                  >
                    {theme.copy.heroTitleFirst}{" "}
                    <span className="text-[var(--suit-accent)]">
                      {theme.copy.heroTitleLast}
                    </span>
                  </h1>

                  {/* Dynamic Rotating Roles with fixed line-box */}
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 shrink-0 bg-[var(--suit-accent)]" />
                    <div className="relative h-8 leading-8 overflow-hidden w-full max-w-xl">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={roleIndex}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-y-0 left-0 flex items-center font-mono text-xs sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.22em] text-slate-200 uppercase whitespace-nowrap"
                        >
                          {ROLES[roleIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base font-sans">
                    {theme.copy.heroTagline}
                  </p>
                </div>

                {/* CTA group */}
                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
                  <button
                    onClick={handleUnlockClick}
                    aria-label="View Full Portfolio"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[var(--suit-accent)] px-8 py-4 text-sm font-semibold text-[var(--suit-accent-ink)] shadow-lg shadow-[var(--suit-glow)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
                  >
                    <TendrilBorder />
                    <span>{theme.copy.unlockLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <ResumeViewer
                    trigger={
                      <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-medium text-slate-200 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                        <FileText className="h-4 w-4 text-[var(--suit-accent)]" />
                        View Résumé
                      </span>
                    }
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Cinematic showcase panel sized dynamically from viewport */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15
              }}
              className="relative will-change-transform flex justify-center"
            >
              <div className="relative w-full max-w-[460px] flex justify-center">
                {/* Atmospheric glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-2xl"
                  style={{
                    background:
                      themeMode === "venom"
                        ? "radial-gradient(circle, rgba(199,203,209,0.2), transparent 65%)"
                        : "radial-gradient(circle, rgba(229,9,20,0.3), transparent 65%)"
                  }}
                />

                {/* Framed panel */}
                <div className="relative rounded-[2rem] border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-2.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
                  {/* Corner accents */}
                  <svg
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -left-3 -top-3 h-7 w-7",
                      isVenom ? "text-white" : "text-[var(--suit-accent)]"
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M2 22 L22 2 M6 22 L22 6 M10 22 L22 10 M14 22 L22 14 M2 18 L18 2 M2 14 L14 2" />
                  </svg>
                  <svg
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-3 -right-3 h-7 w-7",
                      isVenom ? "text-white" : "text-[var(--suit-accent)]"
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M2 22 L22 2 M6 22 L22 6 M10 22 L22 10 M14 22 L22 14 M2 18 L18 2 M2 14 L14 2" />
                  </svg>

                  {/* Responsive card sized from viewport: max 72dvh, maintains 3/4 aspect */}
                  <div className="relative h-[min(72dvh,620px)] aspect-[3/4] max-w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={themeMode === "venom" ? "/images/v.jpg" : "/images/spchest.jpg"}
                      alt="Hero showcase"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 460px"
                      className={cn(
                        "object-cover",
                        themeMode === "venom" ? "object-top" : "object-center"
                      )}
                    />
                    {/* Panel header strip */}
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300 bg-gradient-to-b from-black/70 to-transparent">
                      <span className="text-[var(--suit-accent)] font-semibold">
                        {themeMode === "venom" ? "Venom Protocol" : "Prathik Salla"}
                      </span>
                      <span className="text-slate-300">B.Tech &apos;27</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

                    {/* Single Clean Character Quote */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                      <p className="text-xs sm:text-sm italic leading-snug text-slate-200">
                        &ldquo;{theme.copy.heroQuote}&rdquo;
                      </p>
                      <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-[var(--suit-accent)]">
                        — {theme.copy.heroQuoteAuthor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Continuation strip — verified stats row */}
        <div
          ref={statsRef}
          style={{ height: maxScroll }}
          className="flex items-center border-t border-white/6 px-6 sm:px-10 lg:px-16 will-change-transform"
        >
          <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:divide-x sm:divide-white/10">
              <div className="sm:pr-8">
                <p className="font-display text-2xl font-bold text-white">
                  <CountUp value={projects.length} />
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Flagship Systems
                </p>
              </div>
              <div className="sm:px-8">
                <p className="font-display text-2xl font-bold text-[var(--suit-accent)]">
                  <CountUp value={45} suffix="+" />
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  FPS YOLOv11 Stream
                </p>
              </div>
              <div className="sm:px-8">
                <p className="font-display text-2xl font-bold text-white">
                  <CountUp value={47} />
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Passing Unit Tests
                </p>
              </div>
              <div className="sm:px-8">
                <p className="font-display text-2xl font-bold text-[var(--suit-accent)]">
                  <CountUp value={certifications.length} suffix="+" />
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Credentials & Badges
                </p>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 lg:flex">
              <span>Scroll to enter portfolio</span>
              <span className="grid h-7 w-4 place-items-center rounded-full border border-white/20">
                <span className="h-1.5 w-0.5 rounded-full bg-white/60 animate-bounce" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
