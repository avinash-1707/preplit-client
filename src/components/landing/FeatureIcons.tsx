// Consistent icon set — 32×32 viewport, 1.5px stroke, square caps, 3px corner radius on geometric shapes
// All icons share the same visual language

export function VoiceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Mic body */}
      <rect x="12" y="3" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Mic stand arc */}
      <path d="M8 16c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      {/* Stand */}
      <line x1="16" y1="24" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="11" y1="29" x2="21" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      {/* Sound wave lines */}
      <line x1="5" y1="13" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="2" y1="15" x2="2" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="27" y1="13" x2="27" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="30" y1="15" x2="30" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Editor window */}
      <rect x="2" y="4" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Title bar */}
      <line x1="2" y1="11" x2="30" y2="11" stroke="currentColor" strokeWidth="1.5" />
      {/* Traffic dots */}
      <circle cx="7" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="7.5" r="1.5" fill="currentColor" />
      {/* Code lines */}
      <line x1="7" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="7" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="10" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      {/* Cursor blink */}
      <rect x="20" y="14" width="3" height="4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function EvalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Clipboard */}
      <rect x="5" y="5" width="22" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Clip */}
      <rect x="11" y="3" width="10" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Check lines */}
      <polyline points="10,14 13,17 22,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* Score bars */}
      <line x1="10" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="10" y1="25" x2="17" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function SystemDesignIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Central node */}
      <rect x="13" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-left node */}
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-right node */}
      <rect x="23" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottom node */}
      <rect x="13" y="23" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Connections */}
      <line x1="9" y1="6" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="23" y1="6" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="16" y1="19" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function DSAIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Binary tree structure */}
      {/* Root */}
      <circle cx="16" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Level 2 */}
      <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Level 3 */}
      <circle cx="5" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Edges */}
      <line x1="14" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="18" y1="7" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="7" y1="16" x2="6" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="10" y1="16" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="25" y1="16" x2="27" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function TimerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Clock face */}
      <circle cx="16" cy="18" r="11" stroke="currentColor" strokeWidth="1.5" />
      {/* Crown */}
      <line x1="16" y1="7" x2="16" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="13" y1="4" x2="19" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="12" y1="5" x2="11" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="20" y1="5" x2="21" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      {/* Hands */}
      <line x1="16" y1="18" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <line x1="16" y1="18" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      {/* Center dot */}
      <circle cx="16" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}
