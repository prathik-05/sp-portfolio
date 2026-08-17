"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SiteChrome } from "@/components/site-chrome";
import { Hero } from "@/components/sections/hero";
import { CardTwoPortfolio } from "@/components/card-two-portfolio";
import { useSPDev } from "@/context/spdev-provider";

function HomeContent() {
  const { currentCard, setCard } = useSPDev();

  // Card 1 (hero) is a fully fixed, locked landing view — never scrolls.
  // Unlocking swaps to Card 2 (portfolio), which restores document scroll.
  useEffect(() => {
    document.body.style.overflow = currentCard === 1 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentCard]);

  // Deep links like /#projects must land on Card 2 scrolled to the section,
  // never on the locked hero (Card 1).
  useEffect(() => {
    const SECTIONS = ["about", "projects", "skills", "credentials", "contact"];

    const goToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!SECTIONS.includes(hash)) return;
      setCard(2);
      // Wait for the card swap to finish before scrolling into the section.
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    };

    goToHash();
    window.addEventListener("hashchange", goToHash);
    return () => window.removeEventListener("hashchange", goToHash);
  }, [setCard]);

  return (
    <div className="relative w-full">
      {/* CARD 1 — Hero landing (fixed, locked, cinematic) */}
      <motion.div
        data-hero-card
        initial={false}
        animate={{
          opacity: currentCard === 1 ? 1 : 0,
          scale: currentCard === 1 ? 1 : 1.05,
          filter: currentCard === 1 ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: currentCard === 1 ? "auto" : "none" }}
        className="fixed inset-0 z-30 overflow-hidden"
        aria-hidden={currentCard !== 1}
      >
        <Hero />
      </motion.div>

      {/* CARD 2 — Full portfolio (scrollable, always in DOM for SEO/ATS) */}
      <motion.div
        initial={false}
        animate={{ opacity: currentCard === 2 ? 1 : 0, y: currentCard === 2 ? 0 : 24 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full"
        aria-hidden={currentCard !== 2}
      >
        <CardTwoPortfolio />
      </motion.div>
    </div>
  );
}

export function HomeView() {
  return (
    <SiteChrome>
      <HomeContent />
    </SiteChrome>
  );
}