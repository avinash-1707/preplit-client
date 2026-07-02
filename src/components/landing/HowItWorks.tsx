import { fraunces } from "./fonts";
import { ScrollReveal } from "./ScrollReveal";
import { AskGlyph, TalkGlyph, CodeGlyph, ReportGlyph } from "./Glyphs";

const STEPS = [
  {
    number: "01",
    title: "You get a problem, not a packet",
    body: "Hear it the way you would face to face. Ask questions first.",
    Glyph: AskGlyph,
  },
  {
    number: "02",
    title: "You think out loud",
    body: "Explain as you go. The interviewer follows up.",
    Glyph: TalkGlyph,
  },
  {
    number: "03",
    title: "You write real code",
    body: "Talking and coding in the same place, at the same time.",
    Glyph: CodeGlyph,
  },
  {
    number: "04",
    title: "You get a straight answer",
    body: "A written breakdown, minutes after you finish.",
    Glyph: ReportGlyph,
  },
];

const PRACTICE_TYPES = [
  "Data structures & algorithms",
  "System design",
  "Backend & APIs",
  "Behavioral (soon)",
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-zinc-900 bg-black py-28 md:py-40"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-20 max-w-xl md:mb-28">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#E8A33D]">
              How it works
            </div>
            <h2
              id="how-it-works-heading"
              className={`${fraunces.className} text-3xl text-zinc-50 sm:text-4xl md:text-5xl`}
            >
              What actually happens in a session.
            </h2>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-zinc-900 border-y border-zinc-900">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 80}>
              <div className="group grid grid-cols-[3rem_1fr] items-center gap-6 py-10 sm:grid-cols-[5rem_1fr_auto] sm:gap-10 md:py-14">
                <span
                  className={`${fraunces.className} text-3xl text-zinc-700 transition-colors duration-300 group-hover:text-[#E8A33D] sm:text-4xl`}
                >
                  {step.number}
                </span>
                <div className="max-w-xl">
                  <h3 className="text-lg font-semibold text-zinc-100 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-base">
                    {step.body}
                  </p>
                </div>
                <step.Glyph
                  aria-hidden="true"
                  className="hidden h-12 w-12 text-zinc-700 transition-all duration-300 group-hover:scale-110 group-hover:text-[#E8A33D] sm:block md:h-14 md:w-14"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={340}>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500">
            <span className="text-zinc-600">Practice</span>
            {PRACTICE_TYPES.map((type, i) => (
              <span key={type} className="flex items-center gap-3">
                {i > 0 && <span className="text-zinc-800">·</span>}
                <span>{type}</span>
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
