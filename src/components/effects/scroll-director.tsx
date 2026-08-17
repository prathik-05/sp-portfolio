"use client";

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSPDev } from "@/context/spdev-provider";

gsap.registerPlugin(ScrollTrigger);

export function ScrollDirector() {
  const { reducedMotion } = useSPDev();
  const ready = !reducedMotion;

  // Keep ScrollTrigger measurements honest after the layout settles.
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
  }, [ready]);

  useGSAP(
    () => {
      if (!ready) return;

      gsap.utils.toArray<HTMLElement>("[data-depth-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const speed = Number(element.dataset.parallax || 80);
        gsap.to(element, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    },
    { dependencies: [ready] }
  );

  return null;
}