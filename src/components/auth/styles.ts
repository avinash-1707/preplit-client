// Shared Tailwind class strings for the auth pages (login, signup,
// reset-password) so the three pages stay visually identical without each
// repeating the same long utility lists.

export const authInputClass =
  "h-11 border-zinc-800 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-600 transition-colors duration-200 focus-visible:border-[#E8A33D] focus-visible:ring-[#E8A33D]/30";

export const authPrimaryButtonClass =
  "h-11 w-full rounded-full bg-[#E8A33D] text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0b354] hover:shadow-[0_12px_32px_-10px_rgba(232,163,61,0.55)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none";

export const authOutlineButtonClass =
  "h-11 w-full justify-center gap-3 border-zinc-800 bg-zinc-950/40 text-sm font-medium text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-50";

export const authLinkClass =
  "font-medium text-zinc-200 transition-colors duration-200 hover:text-[#E8A33D]";
