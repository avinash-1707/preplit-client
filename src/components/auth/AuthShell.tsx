// Shared chrome for the auth pages (login, signup, reset-password): a
// decorative side panel reusing the landing page's VoiceBloom visual on
// desktop, collapsing to a single centered column on mobile. Pages supply
// their own form content as children so state-specific copy (e.g. signup's
// "check your email" view) still lives with its logic.

import type { ReactNode } from "react";
import { Link } from "next-view-transitions";
import { fraunces } from "@/components/landing/fonts";
import { VoiceBloom } from "@/components/landing/VoiceBloom";
import { LogoTile } from "@/components/brand/Logo";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-100"
    >
      <LogoTile aria-hidden="true" className="h-6 w-6" />
      preplit<span className="text-[#E8A33D]">.</span>
    </Link>
  );
}

export function AuthShell({
  children,
  asideCaption = "A real mock interview, out loud. It listens, pushes back, and scores you at the end.",
}: {
  children: ReactNode;
  asideCaption?: string;
}) {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
      />

      {/* Decorative panel, desktop only */}
      <aside className="relative hidden w-[40%] max-w-[520px] shrink-0 flex-col justify-between overflow-hidden border-r border-zinc-900 bg-zinc-950/50 px-12 py-12 lg:flex">
        <div className="landing-rise" style={{ animationDelay: "0ms" }}>
          <Logo />
        </div>

        <div
          className="landing-rise relative mx-auto w-full max-w-[300px]"
          style={{ animationDelay: "120ms" }}
          aria-hidden="true"
        >
          <div className="absolute inset-[10%] -z-10 rounded-full bg-[#E8A33D]/10 blur-3xl" />
          <VoiceBloom className="h-auto w-full" />
        </div>

        <p
          className="landing-rise max-w-[34ch] text-sm leading-relaxed text-zinc-500"
          style={{ animationDelay: "220ms" }}
        >
          {asideCaption}
        </p>
      </aside>

      {/* Content */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex items-center px-6 py-6 md:px-10 lg:hidden">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AuthHeader({
  eyebrow,
  title,
  subtitle,
  delay = 0,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  delay?: number;
}) {
  return (
    <div
      className="landing-rise mb-8 text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
          {eyebrow}
        </div>
      )}
      <h1 className={`${fraunces.className} text-3xl text-zinc-50 sm:text-4xl`}>
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-sm text-zinc-400">{subtitle}</p>}
    </div>
  );
}
