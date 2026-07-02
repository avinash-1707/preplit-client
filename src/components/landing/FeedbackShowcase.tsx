import { fraunces } from "./fonts";
import { ScrollReveal } from "./ScrollReveal";
import { ScoreBar } from "./ScoreBar";

const SCORES = [
  {
    label: "Problem solving",
    score: 88,
    note: "Found the best approach with little help.",
  },
  {
    label: "Communication",
    score: 74,
    note: "You went quiet while coding. Keep narrating.",
  },
  {
    label: "Code quality",
    score: 92,
    note: "Clean and readable. No notes.",
  },
  {
    label: "Handling pressure",
    score: 68,
    note: "You rushed the last ten minutes.",
  },
];

export function FeedbackShowcase() {
  return (
    <section
      id="report"
      className="scroll-mt-24 border-t border-zinc-900 bg-zinc-950 py-28 md:py-40"
      aria-labelledby="report-heading"
    >
      <div className="mx-auto grid max-w-[1180px] gap-16 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <ScrollReveal>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#E8A33D]">
              The report
            </div>
            <h2
              id="report-heading"
              className={`${fraunces.className} text-3xl text-zinc-50 sm:text-4xl md:text-5xl`}
            >
              A report that actually tells you something.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
              Every session ends with a written breakdown. Where you lost
              points, and what to change next time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div
            className="rounded-2xl border border-zinc-800 bg-black/40 p-6 sm:p-8"
            aria-hidden="true"
          >
            <div className="mb-6 flex items-center justify-between border-b border-zinc-900 pb-5">
              <div>
                <div className="text-sm font-semibold text-zinc-100">
                  Session report
                </div>
                <div className="text-xs text-zinc-600">
                  DSA · Medium · 42 min
                </div>
              </div>
              <div className={`${fraunces.className} text-3xl text-[#E8A33D]`}>
                81
              </div>
            </div>

            <div className="space-y-6">
              {SCORES.map((s, i) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-4">
                    <span className="text-sm text-zinc-300">{s.label}</span>
                    <span className="text-xs tabular-nums text-zinc-500">
                      {s.score}
                    </span>
                  </div>
                  <ScoreBar score={s.score} delay={i * 130} />
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
