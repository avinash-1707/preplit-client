"use client";

import { useEffect, useRef, useState } from "react";

// Fills from 0 to the score the first time it scrolls into view.
export function ScoreBar({
  score,
  delay = 0,
}: {
  score: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (grown) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [grown]);

  return (
    <div ref={ref} className="h-1 w-full rounded-full bg-zinc-900">
      <div
        className="h-full rounded-full bg-[#E8A33D] transition-[width] duration-1000 ease-out"
        style={{
          width: grown ? `${score}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}
