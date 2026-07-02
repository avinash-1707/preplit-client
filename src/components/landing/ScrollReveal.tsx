"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport. Fully inert (renders children already visible, no observer
 * attached) when the user prefers reduced motion.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.55s ${EASE}, transform 0.55s ${EASE}`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
