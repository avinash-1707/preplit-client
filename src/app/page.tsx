"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { UserButton } from "@/components/shared/UserButton";
import ThemeToggle from "@/components/ThemeToggle";
import { HeroEditorSVG } from "@/components/landing/HeroEditorSVG";
import { ScorecardSVG } from "@/components/landing/ScorecardSVG";
import { ConversationSVG } from "@/components/landing/ConversationSVG";
import {
  VoiceIcon,
  CodeIcon,
  EvalIcon,
  SystemDesignIcon,
  DSAIcon,
  TimerIcon,
} from "@/components/landing/FeatureIcons";

// ---------------------------------------------------------------------------
// Cursor blink hook — respects prefers-reduced-motion
// ---------------------------------------------------------------------------
function useCursorBlink() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return visible;
}

// ---------------------------------------------------------------------------
// Scroll reveal — returns { ref, revealed } where revealed is useState-driven.
// The ref is attached to a DOM element; revealed flips to true via
// IntersectionObserver callback (never synchronously in the effect body).
// Respects prefers-reduced-motion by starting revealed=true when motion
// is reduced (initialised via useState lazy initialiser, not in the effect).
// ---------------------------------------------------------------------------
function useReveal(threshold = 0.15) {
  const divRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean>(() => {
    // Initialise to true on the server and for users who prefer reduced motion
    // (window is undefined on server, so this is safe — it will be rechecked
    // client-side in the effect below).
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    // Already revealed (reduced-motion, SSR, or previously intersected)
    if (revealed) return;
    const el = divRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed, threshold]);

  return { ref: divRef, revealed };
}

// ---------------------------------------------------------------------------
// Animated stat counter
// ---------------------------------------------------------------------------
function AnimatedStat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const { ref, revealed } = useReveal(0.5);

  useEffect(() => {
    if (!revealed) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = mq.matches ? 0 : 1200;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = duration === 0 ? 1 : Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [revealed, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-mono text-4xl font-bold text-[#e4e4e4] tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="font-mono text-xs text-[#555] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// How it works — step
// ---------------------------------------------------------------------------
function Step({
  number,
  icon,
  title,
  description,
  timestamp,
  detail,
  last = false,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  detail: React.ReactNode;
  last?: boolean;
}) {
  const { ref, revealed } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="grid grid-cols-[48px_1fr] gap-6 relative"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${number * 80}ms`,
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 shrink-0 border border-[#2a2a2a] flex items-center justify-center font-mono text-xs font-bold text-[#4afa8a]"
          style={{ backgroundColor: "#111111" }}
        >
          {String(number).padStart(2, "0")}
        </div>
        {!last && (
          <div
            className="w-px flex-1 mt-2 bg-[#1e1e1e]"
            style={{ minHeight: "40px" }}
          />
        )}
      </div>
      <div className="pb-10">
        <div className="font-mono text-[10px] text-[#4afa8a] mb-1 tracking-widest">
          {timestamp}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#555] w-5 h-5">{icon}</span>
          <h3 className="font-mono text-lg text-[#e4e4e4]">{title}</h3>
        </div>
        <p className="font-mono text-sm text-[#666] leading-relaxed mb-4">
          {description}
        </p>
        {detail}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature card
// ---------------------------------------------------------------------------
function FeatureCard({
  icon,
  title,
  description,
  accent,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  delay?: number;
}) {
  const { ref, revealed } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="border border-[#1e1e1e] p-6 group relative overflow-hidden"
      style={{
        backgroundColor: "#0e0e0e",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(14px)",
        transition:
          "opacity 0.45s ease, transform 0.45s ease, border-color 0.3s ease",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accent;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
      }}
    >
      <div
        className="absolute top-0 left-0 w-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute top-0 left-0 h-8 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />
      <div className="w-8 h-8 mb-4" style={{ color: accent }}>
        {icon}
      </div>
      <h3 className="font-mono text-sm font-bold text-[#e4e4e4] mb-2">
        {title}
      </h3>
      <p className="font-mono text-xs text-[#555] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Terminal line
// ---------------------------------------------------------------------------
function TerminalLine({
  prompt,
  command,
  output,
  outputColor = "#555",
}: {
  prompt: string;
  command: string;
  output?: string;
  outputColor?: string;
}) {
  return (
    <div className="font-mono text-xs leading-6">
      <span className="text-[#555]">{prompt} </span>
      <span className="text-[#e4e4e4]">{command}</span>
      {output && <div style={{ color: outputColor }}>{output}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Landing page
// ---------------------------------------------------------------------------
export default function PreplitLanding() {
  const cursorVisible = useCursorBlink();
  const { ref: heroRef, revealed: heroRevealed } = useReveal(0.05);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0a", color: "#e4e4e4" }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 h-12 border-b border-[#1a1a1a]"
        style={{
          backgroundColor: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-sm font-bold text-[#e4e4e4] tracking-[0.12em] hover:text-[#4afa8a] transition-colors"
        >
          pre<span className="text-[#4afa8a]">plit</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors tracking-wider"
          >
            HOW IT WORKS
          </a>
          <a
            href="#features"
            className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors tracking-wider"
          >
            FEATURES
          </a>
          <a
            href="#evaluation"
            className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors tracking-wider"
          >
            EVALUATION
          </a>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center pt-12"
        aria-labelledby="hero-heading"
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">
            {/* Left */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed
                  ? "translateX(0)"
                  : "translateX(-20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <div
                className="inline-flex items-center gap-2 font-mono text-[10px] text-[#555] border border-[#1e1e1e] px-3 py-1.5 mb-8 tracking-widest uppercase"
                style={{ backgroundColor: "#0e0e0e" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4afa8a] shrink-0" />
                AI Technical Interview Simulator
              </div>

              <h1
                id="hero-heading"
                className="font-mono text-4xl md:text-5xl xl:text-6xl leading-[1.1] mb-6 text-[#e4e4e4]"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                Practice interviews
                <br />
                the way they&apos;re
                <br />
                <span className="text-[#4afa8a] relative">
                  actually run
                  <span
                    className="ml-1 inline-block w-[3px] h-[0.85em] align-middle"
                    style={{
                      backgroundColor: "#4afa8a",
                      opacity: cursorVisible ? 1 : 0,
                      verticalAlign: "middle",
                    }}
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="font-mono text-sm text-[#666] leading-7 mb-10 max-w-[440px]">
                Live voice interviews with an AI that talks, interrupts, adds
                constraints, and evaluates you — exactly like a real technical
                screen. Code in a real editor. Get structured feedback.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/signup"
                  className="font-mono text-sm font-bold px-6 py-3 text-[#0a0a0a] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#4afa8a" }}
                >
                  Start practicing free
                </Link>
                <Link
                  href="/login"
                  className="font-mono text-sm border border-[#2a2a2a] px-6 py-3 text-[#888] hover:text-[#e4e4e4] hover:border-[#444] transition-all duration-200"
                  style={{ backgroundColor: "#0e0e0e" }}
                >
                  Sign in
                </Link>
              </div>

              <div
                className="border border-[#1a1a1a] p-4"
                style={{ backgroundColor: "#0e0e0e" }}
              >
                <TerminalLine
                  prompt="$"
                  command="preplit start --type dsa --level medium"
                />
                <TerminalLine
                  prompt=""
                  command=""
                  output="→ Connecting to AI interviewer..."
                  outputColor="#555"
                />
                <TerminalLine
                  prompt=""
                  command=""
                  output="→ Session started. Good luck."
                  outputColor="#4afa8a"
                />
              </div>
            </div>

            {/* Right: Editor SVG */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
              aria-hidden="true"
            >
              <HeroEditorSVG />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div
        className="border-y border-[#1a1a1a]"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat value={5} suffix="+" label="Interview Types" />
          <AnimatedStat value={45} suffix="min" label="Full Sessions" />
          <AnimatedStat value={12} suffix="" label="Eval Dimensions" />
          <AnimatedStat value={100} suffix="%" label="Voice-first AI" />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 md:py-32"
        aria-labelledby="hiw-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
              Process
            </div>
            <h2
              id="hiw-heading"
              className="font-mono text-3xl md:text-4xl text-[#e4e4e4]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              How a session unfolds
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_380px] gap-16">
            <div>
              <Step
                number={1}
                icon={<TimerIcon className="w-full h-full" />}
                title="Problem reveal"
                description="You receive a partial problem — not the full statement. The AI describes it verbally, the way a human interviewer would."
                timestamp="00:00 — 02:00"
                detail={
                  <div
                    className="border border-[#1e1e1e] p-4 font-mono text-xs text-[#666]"
                    style={{ backgroundColor: "#0e0e0e" }}
                  >
                    <span className="text-[#555]">interviewer: </span>
                    <span className="text-[#888]">
                      &ldquo;Design a function that finds duplicate entries in a
                      large dataset. You have 45 minutes.&rdquo;
                    </span>
                  </div>
                }
              />
              <Step
                number={2}
                icon={<VoiceIcon className="w-full h-full" />}
                title="Clarify requirements"
                description="Ask questions over voice. The AI responds with constraints. This is where most candidates silently lose points."
                timestamp="02:00 — 08:00"
                detail={
                  <div
                    className="border border-[#1e1e1e] p-4 font-mono text-xs space-y-2"
                    style={{ backgroundColor: "#0e0e0e" }}
                  >
                    <div>
                      <span className="text-[#4afa8a]">you: </span>
                      <span className="text-[#888]">
                        &ldquo;Should I optimize for space or time?&rdquo;
                      </span>
                    </div>
                    <div>
                      <span className="text-[#555]">interviewer: </span>
                      <span className="text-[#888]">
                        &ldquo;Time is more critical here.&rdquo;
                      </span>
                    </div>
                  </div>
                }
              />
              <Step
                number={3}
                icon={<CodeIcon className="w-full h-full" />}
                title="Code in a real editor"
                description="Monaco editor — the same engine as VS Code. Think aloud, start with brute force, then optimize. The AI listens."
                timestamp="08:00 — 28:00"
                detail={
                  <div
                    className="border border-[#1e1e1e] p-4 font-mono text-xs"
                    style={{ backgroundColor: "#0e0e0e" }}
                  >
                    <span className="text-[#7b7bff]">
                      O(n&#178;) first &mdash; walk through this, then optimize
                    </span>
                    <br />
                    <span className="text-[#555]">
                      interviewer may ask about complexity at any moment
                    </span>
                  </div>
                }
              />
              <Step
                number={4}
                icon={<SystemDesignIcon className="w-full h-full" />}
                title="Handle follow-ups"
                description="Mid-solution, constraints shift. The AI interrupts with follow-ups, edge cases, scale questions. You adapt."
                timestamp="28:00 — 40:00"
                detail={
                  <div
                    className="border border-[#1e1e1e] p-4 font-mono text-xs space-y-2"
                    style={{ backgroundColor: "#0e0e0e" }}
                  >
                    <div>
                      <span className="text-[#555]">interviewer: </span>
                      <span className="text-[#888]">
                        &ldquo;What if the dataset doesn&apos;t fit in
                        memory?&rdquo;
                      </span>
                    </div>
                    <div>
                      <span className="text-[#4afa8a]">you: </span>
                      <span className="text-[#888]">
                        &ldquo;External sort with merge passes, reduce I/O with
                        buffering&mdash;&rdquo;
                      </span>
                    </div>
                  </div>
                }
              />
              <Step
                number={5}
                icon={<EvalIcon className="w-full h-full" />}
                title="Structured evaluation"
                description="Full scorecard across 5 dimensions. Not just getting it right — graded on communication, edge coverage, optimization decisions."
                timestamp="40:00 — 45:00"
                last
                detail={
                  <div className="font-mono text-xs text-[#4afa8a]">
                    → Evaluation report ready in /dashboard
                  </div>
                }
              />
            </div>

            {/* Conversation SVG */}
            <div
              className="hidden md:flex flex-col items-center justify-start pt-2"
              aria-hidden="true"
            >
              <div className="sticky top-20">
                <ConversationSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section
        id="features"
        className="py-24 md:py-32 border-t border-[#1a1a1a]"
        aria-labelledby="features-heading"
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
              Features
            </div>
            <h2
              id="features-heading"
              className="font-mono text-3xl md:text-4xl text-[#e4e4e4]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Everything a real interview has
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
            <FeatureCard
              icon={<VoiceIcon className="w-full h-full" />}
              title="Live voice AI interviewer"
              description="The AI speaks in real-time using ElevenLabs. It asks, interrupts, gives hints, and reacts to your code — not just chat."
              accent="#7b7bff"
              delay={0}
            />
            <FeatureCard
              icon={<CodeIcon className="w-full h-full" />}
              title="Monaco code editor"
              description="Full VS Code engine in-browser. Syntax highlighting, autocomplete, multi-language support. Exactly what real interviews use."
              accent="#4afa8a"
              delay={60}
            />
            <FeatureCard
              icon={<EvalIcon className="w-full h-full" />}
              title="12-dimension evaluation"
              description="Scored on problem solving, communication clarity, optimization decisions, edge case coverage, and code quality — not just correctness."
              accent="#ff6b35"
              delay={120}
            />
            <FeatureCard
              icon={<DSAIcon className="w-full h-full" />}
              title="DSA / LeetCode-style"
              description="Arrays, graphs, DP, trees, sorting. Medium and hard problems. Timed. The AI will ask for complexity analysis mid-solution."
              accent="#4afa8a"
              delay={180}
            />
            <FeatureCard
              icon={<SystemDesignIcon className="w-full h-full" />}
              title="System design rounds"
              description="Design Twitter, rate limiters, CDNs. The AI asks follow-up questions about scale, failure modes, and trade-offs."
              accent="#7b7bff"
              delay={240}
            />
            <FeatureCard
              icon={<TimerIcon className="w-full h-full" />}
              title="Real time pressure"
              description="45-minute sessions with a live countdown. You learn to manage cognitive load when the clock actually matters."
              accent="#ff6b35"
              delay={300}
            />
          </div>

          <div
            className="mt-10 border border-[#1a1a1a] p-6"
            style={{ backgroundColor: "#0e0e0e" }}
          >
            <div className="font-mono text-[10px] text-[#555] tracking-widest mb-4 uppercase">
              Available interview types
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "DSA · Medium",
                "DSA · Hard",
                "JavaScript",
                "TypeScript",
                "Python",
                "Backend / APIs",
                "System Design",
                "Behavioral (coming soon)",
              ].map((type) => (
                <span
                  key={type}
                  className="font-mono text-xs border border-[#2a2a2a] px-3 py-1 text-[#666]"
                  style={{ backgroundColor: "#111111" }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVALUATION / SCORECARD */}
      <section
        id="evaluation"
        className="py-24 md:py-32 border-t border-[#1a1a1a]"
        aria-labelledby="eval-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
                Evaluation
              </div>
              <h2
                id="eval-heading"
                className="font-mono text-3xl md:text-4xl text-[#e4e4e4] mb-6"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                Feedback that actually improves you
              </h2>
              <p className="font-mono text-sm text-[#666] leading-7 mb-8">
                Every session produces a structured scorecard. Five axes, each
                graded independently. You see exactly where you lost points and
                why — not a generic &ldquo;good job&rdquo;.
              </p>

              <div className="space-y-4">
                {[
                  {
                    dim: "Problem Solving",
                    score: 88,
                    color: "#4afa8a",
                    note: "Strong initial decomposition, good pivot to optimal",
                  },
                  {
                    dim: "Code Quality",
                    score: 92,
                    color: "#4afa8a",
                    note: "Clean variable names, consistent style throughout",
                  },
                  {
                    dim: "Edge Cases",
                    score: 80,
                    color: "#7b7bff",
                    note: "Caught null input; missed empty array scenario",
                  },
                  {
                    dim: "Communication",
                    score: 74,
                    color: "#7b7bff",
                    note: "Good walk-through but delayed on time complexity",
                  },
                  {
                    dim: "Optimization",
                    score: 68,
                    color: "#ff6b35",
                    note: "Arrived at O(n) but needed AI hint to get there",
                  },
                ].map(({ dim, score, color, note }) => (
                  <div key={dim}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-[#888]">
                        {dim}
                      </span>
                      <span
                        className="font-mono text-xs tabular-nums"
                        style={{ color }}
                      >
                        {score}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#1a1a1a] mb-1">
                      <div
                        className="h-full transition-all duration-700"
                        style={{ width: `${score}%`, backgroundColor: color }}
                      />
                    </div>
                    <div className="font-mono text-[10px] text-[#444]">
                      {note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true">
              <ScorecardSVG className="w-full h-auto max-w-[420px] mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY PREPLIT */}
      <section
        className="py-24 md:py-32 border-t border-[#1a1a1a]"
        aria-labelledby="philosophy-heading"
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-16">
            <div>
              <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
                Why Preplit
              </div>
              <h2
                id="philosophy-heading"
                className="font-mono text-3xl md:text-4xl text-[#e4e4e4] mb-8"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                You can solve LeetCode. You still fail interviews.
              </h2>
              <p className="font-mono text-sm text-[#666] leading-7">
                Interview performance is a distinct skill from problem-solving.
                Solving in silence builds one muscle. Performing under
                observation, speaking your reasoning aloud, adapting to an
                interviewer who just changed the constraints — that builds
                another. Preplit trains the second one.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  signal: "01",
                  problem: "Time freezes you",
                  detail:
                    "You know the solution but panic under a 45-minute countdown. Untimed practice doesn’t prepare you for real pressure.",
                },
                {
                  signal: "02",
                  problem: "Requirements shift mid-interview",
                  detail:
                    "Static problems can’t teach adaptation. Real interviewers add constraints, ask for optimization, change scope.",
                },
                {
                  signal: "03",
                  problem: "Explaining is harder than coding",
                  detail:
                    "Interviewers judge how you reason and communicate trade‑offs — not just whether your code is correct.",
                },
              ].map(({ signal, problem, detail }) => (
                <div
                  key={signal}
                  className="flex gap-6 border-l border-[#2a2a2a] pl-6"
                >
                  <div className="shrink-0">
                    <span className="font-mono text-[10px] text-[#333] tracking-widest">
                      {signal}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-[#e4e4e4] mb-1">
                      {problem}
                    </h3>
                    <p className="font-mono text-xs text-[#555] leading-relaxed">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section
        className="py-24 md:py-32 border-t border-[#1a1a1a]"
        aria-labelledby="audience-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
              Audience
            </div>
            <h2
              id="audience-heading"
              className="font-mono text-3xl md:text-4xl text-[#e4e4e4]"
            >
              Built for developers who know DSA
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
            {[
              {
                label: "Placement prep",
                detail:
                  "Final-year CS students preparing for product-company placements who already know the algorithms.",
              },
              {
                label: "Role transitions",
                detail:
                  "Developers with 1–5 years experience who want to move to a bigger company or higher level.",
              },
              {
                label: "Self-taught engineers",
                detail:
                  "Strong coders who lack the structured interview communication practice that CS grads get in class.",
              },
              {
                label: "Post-rejection",
                detail:
                  "Anyone rejected despite “getting the logic right” — who knows the gap is in performance, not knowledge.",
              },
            ].map(({ label, detail }) => (
              <div
                key={label}
                className="p-6"
                style={{ backgroundColor: "#0e0e0e" }}
              >
                <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-3">
                  {label}
                </div>
                <p className="font-mono text-xs text-[#555] leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-24 md:py-32 border-t border-[#1a1a1a]"
        aria-labelledby="cta-heading"
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="max-w-[640px]">
            <div className="font-mono text-[10px] text-[#4afa8a] tracking-widest uppercase mb-4">
              Get started
            </div>
            <h2
              id="cta-heading"
              className="font-mono text-3xl md:text-5xl text-[#e4e4e4] mb-6"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Your first interview is
              <br />
              <span className="text-[#4afa8a]">waiting right now</span>
            </h2>
            <p className="font-mono text-sm text-[#666] leading-7 mb-10">
              No warmup. No tutorial. An AI interviewer, a real editor, 45
              minutes. That&apos;s the only way to know if you&apos;re ready.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/signup"
                className="font-mono text-sm font-bold px-8 py-4 text-[#0a0a0a] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#4afa8a" }}
              >
                Start your first session
              </Link>
              <Link
                href="/login"
                className="font-mono text-sm border border-[#2a2a2a] px-8 py-4 text-[#888] hover:text-[#e4e4e4] hover:border-[#444] transition-all duration-200"
                style={{ backgroundColor: "#0e0e0e" }}
              >
                Sign in
              </Link>
            </div>
            <div
              className="border border-[#1a1a1a] p-4 inline-block"
              style={{ backgroundColor: "#0e0e0e" }}
            >
              <span className="font-mono text-xs text-[#555]">$ </span>
              <span className="font-mono text-xs text-[#e4e4e4]">
                preplit start --difficulty hard --type system-design
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t border-[#1a1a1a] py-10"
        style={{ backgroundColor: "#0a0a0a" }}
        role="contentinfo"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="font-mono text-sm font-bold text-[#e4e4e4] mb-1 tracking-[0.12em]">
                pre<span className="text-[#4afa8a]">plit</span>
              </div>
              <div className="font-mono text-xs text-[#444]">
                AI technical interview simulator
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link
                href="/signup"
                className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="font-mono text-xs text-[#555] hover:text-[#e4e4e4] transition-colors"
              >
                Dashboard
              </Link>
            </div>
            <div className="font-mono text-[10px] text-[#333]">
              Built by engineers who&apos;ve given interviews, for engineers
              preparing for them.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
