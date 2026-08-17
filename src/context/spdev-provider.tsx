"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, applyThemeCustomProperties } from "@/lib/themes";
import { setAudioEnabled as setAudioLibraryEnabled, playSuitSwitch } from "@/lib/spidey-audio";

interface SPDevContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode, transitionPoint?: { x: number; y: number }) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  currentCard: 1 | 2;
  setCard: (card: 1 | 2) => void;
  webShooterTarget: { x: number; y: number } | null;
  shootWebAt: (element: HTMLElement | { x: number; y: number }) => void;
  reducedMotion: boolean;
  activeTransition: {
    isTransitioning: boolean;
    targetMode: ThemeMode;
    originX: number;
    originY: number;
  } | null;
  completeTransition: () => void;
}

const SPDevContext = createContext<SPDevContextType | undefined>(undefined);

export function SPDevProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("classic");
  const [audioEnabled, setAudioState] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<1 | 2>(1);
  const [webShooterTarget, setWebShooterTarget] = useState<{ x: number; y: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [activeTransition, setActiveTransition] = useState<{
    isTransitioning: boolean;
    targetMode: ThemeMode;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Read stored theme selection
    try {
      const savedTheme = localStorage.getItem("spdev_theme_mode") as ThemeMode | null;
      if (savedTheme && (savedTheme === "classic" || savedTheme === "venom")) {
        setThemeModeState(savedTheme);
        applyThemeCustomProperties(savedTheme);
      } else {
        applyThemeCustomProperties("classic");
      }
    } catch {}

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const setThemeMode = (mode: ThemeMode, transitionPoint?: { x: number; y: number }) => {
    if (mode === themeMode) return;

    playSuitSwitch();
    const originX = transitionPoint?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const originY = transitionPoint?.y ?? (typeof window !== "undefined" ? 40 : 0);

    // Trigger dark liquid symbiote consume transition animation
    setActiveTransition({
      isTransitioning: true,
      targetMode: mode,
      originX,
      originY
    });
  };

  const completeTransition = () => {
    if (!activeTransition) return;
    const nextMode = activeTransition.targetMode;
    setThemeModeState(nextMode);
    applyThemeCustomProperties(nextMode);

    try {
      localStorage.setItem("spdev_theme_mode", nextMode);
    } catch {}

    setActiveTransition(null);
  };

  const handleSetAudioEnabled = (enabled: boolean) => {
    setAudioState(enabled);
    setAudioLibraryEnabled(enabled);
  };

  const setCard = (card: 1 | 2) => {
    setCurrentCard(card);
    if (card === 2 && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const shootWebAt = (target: HTMLElement | { x: number; y: number }) => {
    if ("getBoundingClientRect" in target) {
      const rect = target.getBoundingClientRect();
      setWebShooterTarget({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    } else {
      setWebShooterTarget(target);
    }
    setTimeout(() => {
      setWebShooterTarget(null);
    }, 1000);
  };

  return (
    <SPDevContext.Provider
      value={{
        themeMode,
        setThemeMode,
        audioEnabled,
        setAudioEnabled: handleSetAudioEnabled,
        commandPaletteOpen,
        setCommandPaletteOpen,
        currentCard,
        setCard,
        webShooterTarget,
        shootWebAt,
        reducedMotion,
        activeTransition,
        completeTransition
      }}
    >
      {children}
    </SPDevContext.Provider>
  );
}

export function useSPDev() {
  const context = useContext(SPDevContext);
  if (!context) {
    throw new Error("useSPDev must be used within an SPDevProvider");
  }
  return context;
}