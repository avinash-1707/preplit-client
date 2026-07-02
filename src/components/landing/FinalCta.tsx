import { Link } from "next-view-transitions";
import { fraunces } from "./fonts";
import { ScrollReveal } from "./ScrollReveal";

export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 py-32 md:py-44"
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A33D]/[0.07] blur-3xl"
      />
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-8 block h-2 w-2 rounded-full bg-[#E8A33D]"
            />
            <h2
              id="cta-heading"
              className={`${fraunces.className} text-4xl leading-[1.1] text-zinc-50 sm:text-5xl md:text-6xl`}
            >
              Practice before
              <br />
              <span className="italic text-zinc-400">it counts.</span>
            </h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-[#E8A33D] px-8 py-4 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0b354] hover:shadow-[0_12px_32px_-10px_rgba(232,163,61,0.55)] active:translate-y-0"
              >
                Start practicing
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-zinc-700 px-8 py-4 text-sm text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-zinc-50 active:translate-y-0"
              >
                Log in
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
