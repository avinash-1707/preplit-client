import { fraunces } from "./fonts";
import { InterviewMock } from "./InterviewMock";
import { ScrollReveal } from "./ScrollReveal";

export function SessionShowcase() {
  return (
    <section
      id="session"
      className="scroll-mt-24 border-t border-zinc-900 bg-zinc-950 py-28 md:py-40"
      aria-labelledby="session-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-xl text-center md:mb-20">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#E8A33D]">
              Mid session
            </div>
            <h2
              id="session-heading"
              className={`${fraunces.className} text-3xl text-zinc-50 sm:text-4xl md:text-5xl`}
            >
              This is what it feels like.
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mx-auto max-w-[640px]" aria-hidden="true">
            <InterviewMock />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
