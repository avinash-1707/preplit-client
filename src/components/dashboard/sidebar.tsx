"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";

/**
 * Dashboard sidebar primitive — adapted from the Aceternity UI collapsible
 * sidebar pattern for Preplit's dark zinc + gold aesthetic.
 *
 * Desktop: a slim icon-only rail that animates its width open on hover.
 * Mobile: a hamburger trigger that opens a full-height drawer with an
 * animated slide-in. All motion respects `prefers-reduced-motion`.
 */

const RAIL_COLLAPSED = 76;
const RAIL_EXPANDED = 264;

// Matches the easing already used for reveals on the landing page
// (see `.landing-rise` in globals.css) so dashboard motion feels consistent.
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

interface SidebarContextValue {
  /** Desktop rail hover-expanded state. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Mobile drawer open state. */
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  reduceMotion: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within <Sidebar>");
  }
  return ctx;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());

  // Close on Escape and lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, mobileOpen, setMobileOpen, reduceMotion }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
}

function DesktopSidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen, reduceMotion } = useSidebar();

  return (
    <motion.aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      animate={{ width: open ? RAIL_EXPANDED : RAIL_COLLAPSED }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }
      }
      className={cn(
        "relative z-30 hidden h-full shrink-0 flex-col overflow-x-hidden border-r border-border bg-background md:flex",
        className
      )}
    >
      {children}
    </motion.aside>
  );
}

function MobileSidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { mobileOpen, setMobileOpen, reduceMotion } = useSidebar();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        className="fixed left-4 top-20 z-30 flex size-10 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm backdrop-blur transition-colors hover:border-[#E8A33D]/40 hover:text-[#E8A33D]"
      >
        <MenuIcon className="size-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }
              }
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{
                x: "-100%",
                transition: reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.2, ease: EASE_IN },
              }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
              }
              className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[82vw] flex-col border-r border-border bg-background px-3 py-5",
                className
              )}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="absolute right-3 top-5 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <CloseIcon className="size-4" />
              </button>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface SidebarLinkData {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export function SidebarLink({
  link,
  className,
}: {
  link: SidebarLinkData;
  className?: string;
}) {
  const { open, mobileOpen, setMobileOpen, reduceMotion } = useSidebar();
  // Labels show whenever the desktop rail is hover-expanded, or whenever
  // we're rendering inside the always-expanded mobile drawer.
  const showLabel = open || mobileOpen;

  const handleClick = () => {
    link.onClick?.();
    setMobileOpen(false);
  };

  const rowClassName = cn(
    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 outline-none transition-colors duration-150",
    "focus-visible:ring-2 focus-visible:ring-[#E8A33D]/50",
    link.active
      ? "text-[#E8A33D]"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
    className
  );

  const inner = (
    <>
      {link.active && (
        <motion.span
          initial={{ opacity: 0, scaleY: 0.3 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }
          }
          className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-[#E8A33D]"
        />
      )}
      <span className="flex size-5 shrink-0 items-center justify-center">
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: reduceMotion ? "inline-block" : showLabel ? "inline-block" : "none",
          opacity: reduceMotion ? 1 : showLabel ? 1 : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.15, ease: EASE_OUT, delay: open ? 0.08 : 0 }
        }
        className="truncate text-sm font-medium whitespace-nowrap"
      >
        {link.label}
      </motion.span>
    </>
  );

  if (link.href) {
    return (
      <Link href={link.href} onClick={handleClick} className={rowClassName}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={rowClassName}>
      {inner}
    </button>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </svg>
  );
}
