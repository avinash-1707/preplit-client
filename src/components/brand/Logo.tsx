import type { SVGProps } from "react";

/**
 * Preplit mark: a speech bubble carrying a waveform. Bubble strokes with
 * currentColor so it adapts to context; the bars stay brand gold.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 3.5C8.8 3.5 3 8.4 3 14.4c0 3.4 1.8 6.4 4.7 8.4L6.4 28.5l6.3-2.6c1 .2 2.1.3 3.3.3 7.2 0 13-4.9 13-10.9S23.2 3.5 16 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="10" y="11.5" width="3" height="6" rx="1.5" fill="#E8A33D" />
      <rect x="14.5" y="9" width="3" height="11" rx="1.5" fill="#E8A33D" />
      <rect x="19" y="11" width="3" height="7" rx="1.5" fill="#E8A33D" />
    </svg>
  );
}

/**
 * Solid gold tile variant for tiny sizes (favicons, avatars) where the
 * outlined bubble would smear.
 */
export function LogoTile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <rect width="32" height="32" rx="8" fill="#E8A33D" />
      <rect x="8.5" y="12" width="3.5" height="8" rx="1.75" fill="#09090b" />
      <rect x="14.25" y="8.5" width="3.5" height="15" rx="1.75" fill="#09090b" />
      <rect x="20" y="11" width="3.5" height="10" rx="1.75" fill="#09090b" />
    </svg>
  );
}
