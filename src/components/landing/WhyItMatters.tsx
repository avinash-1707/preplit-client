import { fraunces } from "./fonts";
import { ScrollReveal } from "./ScrollReveal";
import { Waveform } from "./Glyphs";

const SIGNALS = [
  {
    title: "The clock changes how you think",
    body: "Untimed practice feels nothing like a running clock.",
  },
  {
    title: "The problem moves under you",
    body: "Real interviewers add constraints while you are still coding.",
  },
  {
    title: "Explaining is graded too",
    body: "How you talk through a decision counts as much as the code.",
  },
];

export function WhyItMatters() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-zinc-900 bg-black py-28 md:py-40"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <ScrollReveal>
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#E8A33D]">
                Why it works
              </div>
              <h2
                id="why-heading"
                className={`${fraunces.className} text-3xl text-zinc-50 sm:text-4xl md:text-5xl`}
              >
                Solving alone and performing live are different skills.
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                You can grind problems by yourself and still freeze when
                someone is listening. The fix is simple. Have the
                conversation before it counts.
              </p>
              <Waveform
                aria-hidden="true"
                className="mt-12 h-12 w-56 text-[#E8A33D]"
              />
            </div>
          </ScrollReveal>

          <div className="space-y-12 lg:pt-6">
            {SIGNALS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="group border-l border-zinc-800 pl-6 transition-colors duration-300 hover:border-[#E8A33D]/60">
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
