// Thin-stroke decorative glyphs for the landing sections. Purely visual,
// always rendered with aria-hidden by the parent.

import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

export function AskGlyph({ ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 8v-8h0a4 4 0 0 1-4-4V12Z" />
      <path d="M20 16.5a4 4 0 1 1 5.5 3.7c-1 .4-1.5 1-1.5 2.3" />
      <circle cx="24" cy="26.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function TalkGlyph({ ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      {...props}
    >
      <path d="M8 20v8" />
      <path d="M14 14v20" />
      <path d="M20 18v12" />
      <path d="M26 10v28" />
      <path d="M32 16v16" />
      <path d="M38 21v6" />
    </svg>
  );
}

export function CodeGlyph({ ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 14 6 24l10 10" />
      <path d="m32 14 10 10-10 10" />
      <path d="m27 8-6 32" />
    </svg>
  );
}

export function ReportGlyph({ ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="9" y="6" width="30" height="36" rx="3" />
      <path d="M16 30v-6" />
      <path d="M24 30V18" />
      <path d="M32 30v-9" />
      <path d="M16 37h16" />
    </svg>
  );
}

// Horizontal voice waveform used as a decorative divider.
export function Waveform({ ...props }: GlyphProps) {
  const bars = [
    10, 16, 8, 22, 14, 30, 18, 26, 38, 24, 32, 16, 28, 12, 20, 8, 14, 6, 10, 5,
  ];
  return (
    <svg
      viewBox="0 0 240 48"
      fill="none"
      {...props}
      preserveAspectRatio="xMinYMid meet"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          className="wave-bar"
          style={{ animationDelay: `${i * 110}ms` }}
          x={i * 12 + 2}
          y={24 - h / 2}
          width="3.5"
          height={h}
          rx="1.75"
          fill="currentColor"
          opacity={i === 8 || i === 10 ? 1 : 0.35}
        />
      ))}
    </svg>
  );
}
