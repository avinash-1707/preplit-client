"use client";

import { useEffect, useRef, useState } from "react";

// Waveform bars — static heights for AI interviewer voice
const AI_BARS = [3, 7, 12, 18, 24, 20, 14, 8, 5, 10, 16, 22, 18, 12, 6, 4, 9, 15, 20, 17, 11, 7, 3, 8, 14, 19, 16, 10, 5, 2];
const CAND_BARS = [2, 5, 9, 14, 20, 26, 22, 16, 10, 6, 3, 8, 13, 19, 24, 21, 15, 9, 4, 2, 7, 12, 18, 23, 20, 14, 8, 4, 2, 1];

export function ConversationSVG({ className }: { className?: string }) {
  const [activeBar, setActiveBar] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = (frame + 1) % AI_BARS.length;
      setActiveBar(frame);
      rafRef.current = window.setTimeout(tick, 80);
    };
    rafRef.current = window.setTimeout(tick, 80);
    return () => {
      if (rafRef.current !== null) clearTimeout(rafRef.current);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 560 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className ?? "w-full h-auto max-w-[560px]"}
    >
      {/* Background */}
      <rect width="560" height="320" rx="6" fill="#111111" />
      <rect width="560" height="320" rx="6" stroke="#2a2a2a" strokeWidth="1" />

      {/* Header */}
      <rect width="560" height="34" rx="6" fill="#161616" />
      <rect y="26" width="560" height="8" fill="#161616" />
      <line x1="0" y1="34" x2="560" y2="34" stroke="#2a2a2a" strokeWidth="1" />
      <circle cx="20" cy="17" r="5" fill="#ff5f56" />
      <circle cx="36" cy="17" r="5" fill="#ffbd2e" />
      <circle cx="52" cy="17" r="5" fill="#27c93f" />
      <text x="72" y="22" fontFamily="monospace" fontSize="11" fill="#555555">mock_interview — DSA · Two Sum · 14:22 elapsed</text>
      {/* Live indicator */}
      <circle cx="530" cy="17" r="4" fill="#ff4444" />
      <text x="538" y="22" fontFamily="monospace" fontSize="10" fill="#ff4444">REC</text>

      {/* AI side label */}
      <text x="24" y="60" fontFamily="monospace" fontSize="10" fill="#555555">AI INTERVIEWER</text>
      <circle cx="140" cy="56" r="4" fill="#7b7bff" opacity="0.8" />

      {/* AI Waveform */}
      {AI_BARS.map((h, i) => {
        const x = 24 + i * 10;
        const isActive = i <= activeBar;
        return (
          <rect
            key={i}
            x={x}
            y={85 - h}
            width="6"
            height={h * 2}
            rx="2"
            fill={isActive ? "#7b7bff" : "#222222"}
            opacity={isActive ? 0.9 : 1}
          />
        );
      })}

      {/* AI message bubble */}
      <rect x="24" y="102" width="480" height="54" rx="4" fill="#1a1a25" stroke="#2a2a40" strokeWidth="1" />
      <text x="36" y="122" fontFamily="monospace" fontSize="11.5" fill="#a0a0cc">
        &quot;Your O(n²) solution works. Can you now optimize it to O(n)?
      </text>
      <text x="36" y="140" fontFamily="monospace" fontSize="11.5" fill="#a0a0cc">
        Think about what data structure would help here.&quot;
      </text>
      <text x="36" y="149" fontFamily="monospace" fontSize="9" fill="#3a3a5a">08:34 AM · 2.1s</text>

      {/* Divider */}
      <line x1="24" y1="170" x2="536" y2="170" stroke="#1e1e1e" strokeWidth="1" />

      {/* Candidate side label */}
      <text x="24" y="193" fontFamily="monospace" fontSize="10" fill="#555555">YOU</text>
      <circle cx="56" cy="189" r="4" fill="#4afa8a" opacity="0.8" />

      {/* Candidate waveform */}
      {CAND_BARS.map((h, i) => {
        const x = 24 + i * 10;
        return (
          <rect
            key={i}
            x={x}
            y={218 - h}
            width="6"
            height={h * 2}
            rx="2"
            fill="#4afa8a"
            opacity={0.3 + (h / 26) * 0.5}
          />
        );
      })}

      {/* Candidate message bubble */}
      <rect x="24" y="236" width="480" height="54" rx="4" fill="#1a2a1a" stroke="#2a402a" strokeWidth="1" />
      <text x="36" y="256" fontFamily="monospace" fontSize="11.5" fill="#80cc80">
        &quot;Right — I can use a hash map. Store each number as a key
      </text>
      <text x="36" y="274" fontFamily="monospace" fontSize="11.5" fill="#80cc80">
        with its index, then check if complement exists...&quot;
      </text>
      <text x="36" y="283" fontFamily="monospace" fontSize="9" fill="#2a4a2a">08:35 AM · 3.4s</text>

      {/* Bottom timer bar */}
      <rect x="0" y="304" width="560" height="16" rx="4" fill="#0e0e0e" />
      <rect y="304" width="560" height="12" fill="#0e0e0e" />
      <line x1="0" y1="304" x2="560" y2="304" stroke="#2a2a2a" strokeWidth="1" />
      {/* Progress bar */}
      <rect x="24" y="309" width="512" height="4" rx="2" fill="#1e1e1e" />
      <rect x="24" y="309" width="200" height="4" rx="2" fill="#4afa8a" opacity="0.6" />
      <text x="420" y="317" fontFamily="monospace" fontSize="8" fill="#444444">14:22 / 45:00</text>
    </svg>
  );
}
