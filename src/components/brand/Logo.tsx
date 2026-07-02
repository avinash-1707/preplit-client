import type { SVGProps } from "react";

/**
 * Preplit logo: a gold tile carrying a waveform. Matches app/icon.svg.
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
