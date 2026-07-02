"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { LogoTile } from "@/components/brand/Logo";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#report", label: "The report" },
  { href: "#why", label: "Why it works" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Threshold-crossing scroll state (not a per-frame binding) — the capsule
  // settles into a "scrolled" look once, rather than tracking scroll
  // continuously, so this stays a single discrete transition.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Escape to close, collapse on resize to desktop, and lock background
  // scroll while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const capsuleTransition = {
    type: "spring" as const,
    duration: shouldReduceMotion ? 0 : 0.4,
    bounce: 0,
  };

  const hoverTransition = {
    type: "spring" as const,
    duration: shouldReduceMotion ? 0 : 0.35,
    bounce: shouldReduceMotion ? 0 : 0.1,
  };

  const menuCardTransition = {
    type: "spring" as const,
    duration: shouldReduceMotion ? 0 : 0.4,
    bounce: shouldReduceMotion ? 0 : 0.05,
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        aria-label="Main navigation"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: -16, filter: "blur(6px)" }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          paddingTop: scrolled ? 5 : 8,
          paddingBottom: scrolled ? 5 : 8,
          paddingLeft: scrolled ? 6 : 8,
          paddingRight: scrolled ? 6 : 8,
          backgroundColor: scrolled
            ? "rgba(9, 9, 11, 0.88)"
            : "rgba(9, 9, 11, 0.55)",
          boxShadow: scrolled
            ? "0 18px 40px -18px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 10px 30px -18px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={capsuleTransition}
        className="relative z-30 flex w-fit items-center rounded-full border border-white/10 backdrop-blur-xl"
      >
        <Link
          href="/"
          className={`group flex items-center gap-2 rounded-full px-3 py-2 text-base font-bold tracking-tight text-zinc-100 transition-colors duration-200 hover:text-white ${FOCUS_RING}`}
        >
          <LogoTile className="h-5 w-5 shrink-0 text-zinc-100 transition-transform duration-300 group-hover:scale-110 md:h-6 md:w-6" />
          <span>
            preplit<span className="text-[#E8A33D]">.</span>
          </span>
        </Link>

        <div
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative">
              {hoveredLink === link.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-[#E8A33D]/10 ring-1 ring-inset ring-[#E8A33D]/25"
                  transition={hoverTransition}
                />
              )}
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onFocus={() => setHoveredLink(link.href)}
                onBlur={() => setHoveredLink(null)}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${FOCUS_RING} ${
                  hoveredLink === link.href
                    ? "text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        <span
          className="mx-2 hidden h-5 w-px bg-white/10 md:block"
          aria-hidden="true"
        />

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={`rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100 ${FOCUS_RING}`}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={`rounded-full bg-[#E8A33D] px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0b354] hover:shadow-[0_10px_28px_-8px_rgba(232,163,61,0.55)] active:translate-y-0 active:scale-[0.97] ${FOCUS_RING}`}
          >
            Get started
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className={`ml-1 flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition-colors duration-200 hover:bg-white/5 hover:text-white md:hidden ${FOCUS_RING}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.8, rotate: -45 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="flex"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.8, rotate: 45 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -45 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="flex"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              aria-hidden="true"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-10 cursor-default bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="mobile-nav-menu"
              id="mobile-nav-menu"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.95, y: -8, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, y: -6, filter: "blur(2px)" }}
              transition={menuCardTransition}
              style={{ transformOrigin: "top center" }}
              className="absolute top-full left-1/2 z-20 mt-3 w-[min(88vw,320px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.05 + index * 0.04,
                      duration: shouldReduceMotion ? 0 : 0.25,
                    }}
                    className={`rounded-2xl px-4 py-3 text-sm text-zinc-300 transition-colors duration-150 hover:bg-white/5 hover:text-white ${FOCUS_RING}`}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.05 + NAV_LINKS.length * 0.04,
                    duration: shouldReduceMotion ? 0 : 0.25,
                  }}
                  className="my-2 h-px bg-white/10"
                />

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.09 + NAV_LINKS.length * 0.04,
                    duration: shouldReduceMotion ? 0 : 0.25,
                  }}
                  className="flex flex-col gap-2 p-1"
                >
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={`rounded-2xl px-4 py-3 text-center text-sm text-zinc-300 transition-colors duration-150 hover:bg-white/5 hover:text-white ${FOCUS_RING}`}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className={`rounded-2xl bg-[#E8A33D] px-4 py-3 text-center text-sm font-semibold text-black transition-all duration-200 hover:bg-[#f0b354] active:scale-[0.97] ${FOCUS_RING}`}
                  >
                    Get started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
