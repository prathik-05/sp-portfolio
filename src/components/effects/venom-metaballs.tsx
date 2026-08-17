"use client";

import React, { useEffect, useRef } from "react";
import { useSPDev } from "@/context/spdev-provider";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function VenomMetaballs() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reducedMotion } = useSPDev();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 8 Organic metaball fluid circles in black symbiote & silver-white liquid
    const balls: Ball[] = [
      { x: width * 0.2, y: height * 0.3, vx: 0.4, vy: 0.3, radius: 180, color: "rgba(232, 232, 238, 0.14)" },
      { x: width * 0.7, y: height * 0.6, vx: -0.3, vy: 0.4, radius: 220, color: "rgba(156, 163, 175, 0.11)" },
      { x: width * 0.4, y: height * 0.8, vx: 0.5, vy: -0.3, radius: 160, color: "rgba(250, 250, 250, 0.06)" },
      { x: width * 0.8, y: height * 0.2, vx: -0.4, vy: -0.2, radius: 190, color: "rgba(5, 5, 5, 0.62)" },
      { x: width * 0.1, y: height * 0.7, vx: 0.3, vy: -0.4, radius: 150, color: "rgba(201, 205, 214, 0.08)" },
      { x: width * 0.5, y: height * 0.4, vx: -0.2, vy: 0.5, radius: 200, color: "rgba(30, 30, 36, 0.72)" }
    ];

    let animFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Move & bounce metaballs
      balls.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) ball.vx *= -1;
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) ball.vy *= -1;

        const grad = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
        grad.addColorStop(0, ball.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#050505] via-[#101014] to-[#000000] opacity-90 pointer-events-none" />
    );
  }

  return (
    <>
      {/* SVG contrast + blur filter for organic metaball fusion */}
      <svg className="hidden">
        <defs>
          <filter id="symbiote-metaball-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
              result="contrast"
            />
            <feBlend in="SourceGraphic" in2="contrast" />
          </filter>
        </defs>
      </svg>

      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-80"
        style={{ filter: "url(#symbiote-metaball-filter)" }}
      >
        <canvas ref={canvasRef} className="h-full w-full bg-[#000000]" />
      </div>
    </>
  );
}
