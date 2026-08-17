import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050508",
        midnight: "#07070b",
        graphite: "#0e0f19",
        slatefilm: "#161a2b",
        ink: "#050508",
        cloud: "#f8fafc",
        electric: "#e50914",
        cyan: "#00a2ff",
        spideyRed: "#e50914",
        spideyCrimson: "#ff1e27",
        webCyan: "#00f0ff",
        starkGold: "#ffb700",
        spiderDark: "#0a0c14",
        spiderPanel: "rgba(18, 21, 38, 0.75)",
        spiderBorder: "rgba(0, 240, 255, 0.2)"
      },
      boxShadow: {
        glow: "0 0 60px rgba(229, 9, 20, 0.35)",
        webGlow: "0 0 40px rgba(0, 240, 255, 0.4)",
        glass: "0 24px 80px rgba(9, 17, 31, 0.4)"
      },
      opacity: {
        0: "0",
        2: "0.02",
        3: "0.03",
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
        18: "0.18",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
        95: "0.95"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter Tight", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display-theme)", "var(--font-display)", "Satoshi", "Inter Tight", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(24px, -18px, 0) scale(1.04)" }
        },
        grid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(48px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" }
        },
        spiderSenseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(1.8)", opacity: "0" }
        },
        hudScan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" }
        }
      },
      animation: {
        drift: "drift 12s ease-in-out infinite",
        grid: "grid 5s linear infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        spiderSenseRing: "spiderSenseRing 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite",
        hudScan: "hudScan 3s linear infinite"
      }
    }
  },
  plugins: [typography]
};

export default config;
