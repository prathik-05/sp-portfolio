export type ThemeMode = "classic" | "venom";

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  label: string;
  cssVars: Record<string, string>;
  copy: {
    heroTitleFirst: string;
    heroTitleLast: string;
    heroRole: string;
    heroTagline: string;
    heroQuote: string;
    heroQuoteAuthor: string;
    unlockLabel: string;
    unlockSubtitle: string;
    aboutTitle: string;
    aboutSummary: string;
    projectsTitle: string;
    skillsTitle: string;
    timelineTitle: string;
    credentialsTitle: string;
    contactTitle: string;
  };
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  classic: {
    id: "classic",
    name: "Classic Suit",
    label: "CLASSIC",
    cssVars: {
      "--theme-bg": "#080b10",
      "--theme-surface": "rgba(255, 255, 255, 0.035)",
      "--suit-accent": "#e50914",
      "--suit-accent-rgb": "229, 9, 20",
      "--suit-accent-ink": "#ffffff",
      "--suit-secondary": "#4c8dff",
      "--suit-secondary-rgb": "76, 141, 255",
      "--suit-web": "#4c8dff",
      "--suit-gold": "#d9a845",
      "--suit-panel": "rgba(255, 255, 255, 0.035)",
      "--suit-border": "rgba(255, 255, 255, 0.08)",
      "--suit-glow": "rgba(229, 9, 20, 0.10)",
      "--suit-success": "#34d399",
      "--font-display-theme": "var(--font-bangers)",
      "--font-mono-theme": "var(--font-mono)"
    },
    copy: {
      heroTitleFirst: "PRATHIK",
      heroTitleLast: "SALLA",
      heroRole: "Software Engineer — AI/ML",
      heroTagline: "Computer Science & Data Science undergraduate building RAG architectures, real-time vision pipelines, and production AI systems.",
      heroQuote: "With great power comes great responsibility.",
      heroQuoteAuthor: "— Peter Parker",
      unlockLabel: "View Full Portfolio",
      unlockSubtitle: "Explore projects, skills, credentials & more",
      aboutTitle: "About Me",
      aboutSummary: "Computer Science (Data Science) undergraduate with strong foundations in Python, Java, Data Structures & Algorithms, and backend development. Hands-on experience building AI-powered applications, real-time computer vision systems, and cloud-native tools.",
      projectsTitle: "Featured Projects",
      skillsTitle: "Skills & Experience",
      timelineTitle: "Experience",
      credentialsTitle: "Certifications",
      contactTitle: "Get In Touch"
    }
  },
  venom: {
    id: "venom",
    name: "Venom Symbiote",
    label: "VENOM",
    cssVars: {
      "--theme-bg": "#000000",
      "--theme-surface": "rgba(255, 255, 255, 0.035)",
      "--suit-accent": "#ffffff",
      "--suit-accent-rgb": "255, 255, 255",
      "--suit-accent-ink": "#050505",
      "--suit-secondary": "#c7cbd1",
      "--suit-secondary-rgb": "199, 203, 209",
      "--suit-web": "#c7cbd1",
      "--suit-gold": "#ffffff",
      "--suit-panel": "rgba(255, 255, 255, 0.035)",
      "--suit-border": "rgba(255, 255, 255, 0.08)",
      "--suit-glow": "rgba(220, 225, 230, 0.12)",
      "--suit-success": "#c7cbd1",
      "--font-display-theme": "var(--font-anton)",
      "--font-mono-theme": "var(--font-mono)"
    },
    copy: {
      heroTitleFirst: "PRATHIK",
      heroTitleLast: "SALLA",
      heroRole: "Software Engineer — AI/ML",
      heroTagline: "Data science practitioner specializing in real-time computer vision, autonomous RAG systems, and high-performance AI inference.",
      heroQuote: "We are Venom.",
      heroQuoteAuthor: "— Venom",
      unlockLabel: "Enter the System",
      unlockSubtitle: "Full project deep-dives, architecture breakdowns & credentials",
      aboutTitle: "About",
      aboutSummary: "Computer Science & Data Science specialist building at the edge of model performance — Python, PyTorch, YOLOv11 streaming vision, and Agentic RAG vector systems. Engineered for throughput, low-latency execution, and zero compromise.",
      projectsTitle: "Architecture",
      skillsTitle: "Arsenal",
      timelineTitle: "Experience",
      credentialsTitle: "Credentials",
      contactTitle: "Contact"
    }
  }
};

export function applyThemeCustomProperties(themeId: ThemeMode) {
  if (typeof document === "undefined") return;
  const theme = THEMES[themeId];
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-theme-mode", themeId);
}
