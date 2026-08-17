import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  ShieldCheck,
  Layers,
  BrainCircuit,
  GitBranch,
  Cpu,
  Boxes,
  Activity,
  Sparkles,
  Terminal
} from "lucide-react";
import { getProjectBySlug } from "@/data/portfolio";
import { PipelineExplorer } from "@/components/pipeline/pipeline-explorer";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "Tic-Tac-Toe with Minimax AI // Engineering Case Study",
  description:
    "Java 21 Swing Tic-Tac-Toe with an immutable game-state model, unbeatable Minimax AI with alpha-beta pruning, MVC architecture, asynchronous AI computation, and exhaustive game-tree verification."
};

const MINIMAX_STEPS = [
  "CURRENT BOARD",
  "GENERATE LEGAL MOVES",
  "SIMULATE EACH MOVE",
  "MINIMAX SEARCH",
  "ALPHA-BETA PRUNING",
  "EVALUATE TERMINAL STATES",
  "SELECT BEST MOVE"
];

const SCORES = [
  { label: "AI WIN", value: "+10 − depth" },
  { label: "DRAW", value: "0" },
  { label: "AI LOSS", value: "depth − 10" }
];

const CONCURRENCY_STEPS = [
  "PLAYER MOVE",
  "UPDATE BOARD",
  "AI THINKING",
  "BACKGROUND WORKER",
  "MINIMAX + ALPHA-BETA",
  "SESSION CHECK",
  "EDT UPDATE",
  "RENDER AI MOVE"
];

const ARCHITECTURE = [
  { code: "01", label: "GAME STATE", detail: "Immutable Board", meta: ["Cell[9] state model", "Defensive copying"] },
  { code: "02", label: "CONTROLLER", detail: "Game Controller", meta: ["Turn & input orchestration", "Session protection"] },
  { code: "03", label: "MINIMAX ENGINE", detail: "Minimax Engine", meta: ["Alpha-Beta pruning", "Depth-aware scoring"] },
  { code: "04", label: "SWING VIEW", detail: "Custom Swing UI", meta: ["Async AI state", "Custom 2D rendering"] },
  { code: "05", label: "VERIFICATION", detail: "AI Verification", meta: ["Exhaustive game-tree search", "47 automated tests"] }
];

const VERIFICATION_STATS = [
  { label: "TESTS PASSED", value: "47", accent: "text-[var(--suit-accent)]" },
  { label: "AI LOSSES", value: "0", accent: "text-[var(--suit-success)]" },
  { label: "WINNING LINES", value: "8", accent: "text-[var(--suit-gold)]" },
  { label: "AI SIDES TESTED", value: "X + O", accent: "text-[var(--suit-web)]" }
];

const IMPLEMENTATION = [
  "Modeled the board as an immutable Cell[9] state with defensive copying and terminal-state evaluation.",
  "Implemented recursive Minimax with depth-aware scoring and alpha-beta pruning.",
  "Built a custom Swing board with hover states, winning-line rendering, and responsive resizing.",
  "Added asynchronous AI computation with session-generation protection against stale results."
];

const RESULTS = [
  "47 automated tests covering board validation, all eight winning configurations, draws, immutability, Minimax decisions, controller flow, and concurrency.",
  "Exhaustive game-tree verification confirmed that the AI never loses when playing optimally as either X or O.",
  "Alpha-beta search was validated against unpruned Minimax for equivalent decisions and reduced node exploration.",
  "The Swing UI remains responsive while AI calculations execute asynchronously."
];

const LESSONS = [
  "Immutable game states simplify recursive game-tree exploration because hypothetical moves never mutate the original board.",
  "Minimax becomes substantially easier to reason about when terminal evaluation, maximizing/minimizing behavior, and depth scoring are separated.",
  "Alpha-beta pruning improves search efficiency without changing the optimal decision.",
  "Asynchronous computation introduces a second problem beyond algorithm correctness: stale results must be prevented from modifying newer application state."
];

const STACK = ["Java 21", "Swing", "Minimax", "Alpha-Beta Pruning", "MVC", "JUnit 5", "Maven"];

export default function TicTacToeCaseStudyPage() {
  const project = getProjectBySlug("tic-tac-toe-minimax");

  return (
    <SiteChrome>
      <div className="relative min-h-screen w-full pt-24 pb-20 px-4 sm:px-8 text-slate-100 max-w-6xl mx-auto space-y-12">
        {/* Navigation Return Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 font-mono text-xs">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-accent)] bg-[var(--suit-accent)]/15 px-5 py-2.5 font-mono text-xs font-bold text-white backdrop-blur-md transition hover:scale-[1.03] hover:bg-[var(--suit-accent)]/30 shadow-md shadow-[var(--suit-glow)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <span className="text-[var(--suit-web)] font-bold tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--suit-accent)]" />
            ENGINEERING CASE STUDY // VERIFIED BUILD
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--suit-border)] bg-[var(--suit-panel)] px-4 py-1.5 font-mono text-xs text-white">
            <Code2 className="h-4 w-4 text-[var(--suit-accent)]" />
            <span className="font-bold tracking-wider uppercase">JAVA / GAME DEVELOPMENT</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            TIC-TAC-TOE WITH <br />
            <span className="text-[var(--suit-accent)] text-glow">MINIMAX AI</span>
          </h1>

          <p className="text-slate-300 font-sans text-lg sm:text-xl max-w-4xl leading-relaxed">
            Built a Java 21 Swing Tic-Tac-Toe application with an immutable game-state model, unbeatable
            Minimax AI with alpha-beta pruning, MVC architecture, asynchronous AI computation, and
            exhaustive game-tree verification.
          </p>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-4">
            {VERIFICATION_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
                <span className="text-[10px] text-[var(--suit-web)] font-bold uppercase block">{stat.label}</span>
                <span className={`font-display text-2xl font-bold ${stat.accent}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 1: ARCHITECTURE */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Layers className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              1. ARCHITECTURE & PIPELINE
            </h2>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            Game state, search logic, and UI responsibilities are cleanly separated. The board is immutable,
            the Minimax engine is independent of Swing, and the view renders AI decisions computed
            asynchronously off the Event Dispatch Thread.
          </p>

          {/* Architecture cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ARCHITECTURE.map((card) => (
              <div
                key={card.code}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 space-y-2 transition-all duration-300 hover:border-[var(--suit-accent)]/40 hover:bg-white/[0.06]"
              >
                <span className="font-mono text-[10px] text-[var(--suit-accent)] font-bold">{card.code}</span>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-white">{card.label}</p>
                <p className="text-xs font-semibold text-[var(--suit-web)]">{card.detail}</p>
                <ul className="space-y-1 pt-1">
                  {card.meta.map((m) => (
                    <li key={m} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <span className="h-1 w-1 rounded-full bg-[var(--suit-accent)]/60 mt-1 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interactive Pipeline Diagram */}
          <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs space-y-6">
            <div className="flex items-center justify-between text-[11px] text-[var(--suit-web)] border-b border-white/10 pb-3">
              <span className="font-bold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--suit-accent)]" />
                PIPELINE GRAPH SCHEMATIC
              </span>
              <span className="text-[var(--suit-success)] font-bold">ZERO LOSS VERIFIED ✓</span>
            </div>

            <PipelineExplorer projectSlug="tic-tac-toe-minimax" />
          </div>
        </section>

        {/* SECTION 2: OVERVIEW */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Boxes className="h-6 w-6 text-[var(--suit-gold)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              2. OVERVIEW
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 font-sans text-sm">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-2">
              <span className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase block">CHALLENGE</span>
              <p className="text-slate-300 leading-relaxed">
                Implement an interactive game where the AI must make mathematically optimal decisions while
                keeping game state, search logic, and UI responsibilities cleanly separated.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-2">
              <span className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase block">SOLUTION</span>
              <p className="text-slate-300 leading-relaxed">
                Built an immutable board model and recursive Minimax engine with alpha-beta pruning, connected
                through an MVC controller and responsive Swing interface. The AI was exhaustively tested against
                every legal opponent response.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-2">
              <span className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase block">STATUS</span>
              <p className="text-slate-300 leading-relaxed">
                Completed · <span className="text-[var(--suit-success)] font-bold">47 Tests Passing</span>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW MINIMAX WORKS */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <BrainCircuit className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              3. HOW MINIMAX WORKS
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            {/* Flow steps */}
            <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-[var(--suit-web)] border-b border-white/10 pb-3">
                <span className="font-bold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[var(--suit-accent)]" />
                  SEARCH FLOW
                </span>
              </div>
              <div className="pt-4 space-y-2">
                {MINIMAX_STEPS.map((step, i) => (
                  <div key={step}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-slate-200">
                      <span className="font-mono text-[10px] text-[var(--suit-accent)] font-bold w-4">
                        {i + 1}
                      </span>
                      <span className="font-semibold tracking-wide">{step}</span>
                    </div>
                    {i < MINIMAX_STEPS.length - 1 && (
                      <div className="ml-7 h-3 w-px bg-[var(--suit-accent)]/40" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring explanation */}
            <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs self-start">
              <div className="flex items-center justify-between text-[11px] text-[var(--suit-web)] border-b border-white/10 pb-3">
                <span className="font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--suit-gold)]" />
                  SCORE RULES
                </span>
              </div>
              <div className="pt-4 space-y-2">
                {SCORES.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="font-bold text-slate-200">{s.label}</span>
                    <span className="text-[var(--suit-accent)] font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                Depth-aware scoring prefers faster wins and slower losses, and alpha-beta pruning drops
                branches that cannot improve the current best decision.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONCURRENCY */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Cpu className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              4. CONCURRENCY MODEL
            </h2>
          </div>

          <div className="rounded-2xl border border-white/15 bg-black/80 p-6 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-[var(--suit-web)] border-b border-white/10 pb-3">
              <span className="font-bold flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-[var(--suit-accent)]" />
                ASYNC AI FLOW
              </span>
              <span className="text-[var(--suit-success)] font-bold">EDT RESPONSIVE ✓</span>
            </div>
            <div className="pt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {CONCURRENCY_STEPS.map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-slate-200"
                >
                  <span className="font-mono text-[10px] text-[var(--suit-accent)] font-bold">{i + 1}</span>
                  <span className="font-semibold text-[11px] tracking-wide">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            AI computation runs outside the Swing Event Dispatch Thread, while session-generation checks
            prevent stale calculations from modifying a restarted game.
          </p>
        </section>

        {/* SECTION 5: IMPLEMENTATION / RESULTS / LESSONS */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Layers className="h-6 w-6 text-[var(--suit-gold)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              5. BUILD LOG
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 font-sans text-xs">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-3">
              <p className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase tracking-widest">
                IMPLEMENTATION
              </p>
              <ul className="space-y-2.5">
                {IMPLEMENTATION.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <span className="h-1 w-1 rounded-full bg-[var(--suit-accent)] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-3">
              <p className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase tracking-widest">
                RESULTS
              </p>
              <ul className="space-y-2.5">
                {RESULTS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <span className="h-1 w-1 rounded-full bg-[var(--suit-success)] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 space-y-3">
              <p className="text-[10px] text-[var(--suit-web)] font-mono font-bold uppercase tracking-widest">
                LESSONS LEARNED
              </p>
              <ul className="space-y-2.5">
                {LESSONS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <span className="h-1 w-1 rounded-full bg-[var(--suit-gold)] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: VERIFICATION */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <ShieldCheck className="h-6 w-6 text-[var(--suit-success)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              6. VERIFICATION
            </h2>
          </div>

          <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            Every claim above is backed by an exhaustive game-tree search across all legal opponent response
            sequences for both AI=X and AI=O, plus 47 automated JUnit 5 tests.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {VERIFICATION_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-black/80 p-5 text-center">
                <span className={`font-display text-3xl font-bold ${stat.accent}`}>{stat.value}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="hud-glass-panel rounded-[2.5rem] border border-white/12 p-6 sm:p-10 bg-black/70 backdrop-blur-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <Code2 className="h-6 w-6 text-[var(--suit-accent)]" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              TECH STACK
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-xs font-semibold text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-slate-400 font-sans text-xs leading-relaxed">
            Zero runtime dependencies beyond Java/Swing; Maven and JUnit 5 are part of the development
            environment only. Immutability and concurrency are covered in the case-study sections above.
          </p>
        </section>

        {/* Footer Actions */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project?.repo || "https://github.com/prathik-05/tic-tac-toe-minimax"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--suit-accent)] px-8 py-3.5 font-bold uppercase text-[var(--suit-accent-ink)] transition hover:scale-105 shadow-md shadow-[var(--suit-glow)]"
            >
              <Code2 className="h-4 w-4" />
              <span>VIEW SOURCE ON GITHUB</span>
            </a>
            <a
              href={project?.live || project?.repo || "https://github.com/prathik-05/tic-tac-toe-minimax"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20"
            >
              <span>PREVIEW</span>
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>
        </div>
      </div>
    </SiteChrome>
  );
}