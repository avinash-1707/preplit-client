import { Link } from "next-view-transitions";
import { fraunces } from "./fonts";
import { VoiceBloom } from "./VoiceBloom";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <div
            className="landing-rise mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
            For technical interviews
          </div>

          <h1
            id="hero-heading"
            className={`${fraunces.className} landing-rise text-5xl leading-[1.06] text-zinc-50 sm:text-6xl md:text-7xl`}
            style={{ animationDelay: "90ms" }}
          >
            Practice the
            <br />
            conversation.
            <br />
            <span className="italic text-[#E8A33D]">Not just</span>
            <span className="italic text-zinc-500"> the problem.</span>
          </h1>

          <p
            className="landing-rise mt-8 max-w-[36ch] text-base leading-relaxed text-zinc-400 md:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            A real mock interview, out loud. It listens, pushes back, and
            scores you at the end.
          </p>

          <div
            className="landing-rise mt-12 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "270ms" }}
          >
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

        <div
          className="landing-rise relative mx-auto w-full max-w-[420px] lg:max-w-none"
          style={{ animationDelay: "200ms" }}
          aria-hidden="true"
        >
          <div className="absolute inset-[12%] -z-10 rounded-full bg-[#E8A33D]/10 blur-3xl" />
          <VoiceBloom className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
