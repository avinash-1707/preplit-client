// The hero visual: a voice "bloom". Radial waveform bars around a core,
// two counter-rotating layers, dashed orbits. Reads as a voice print:
// you talk, it listens. Purely decorative, parent hides it from AT.

const CX = 240;
const CY = 240;

type Bar = { x1: number; y1: number; x2: number; y2: number; gold: boolean };

function radialBars(count: number, inner: number, seed: number): Bar[] {
  const bars: Bar[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    // Layered sines give an organic, speech-like envelope.
    const len =
      14 +
      30 * Math.abs(Math.sin(angle * 3 + seed)) +
      22 * Math.abs(Math.sin(angle * 7 + seed * 2)) +
      10 * Math.abs(Math.sin(angle * 13 + seed * 3));
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    bars.push({
      x1: CX + cos * inner,
      y1: CY + sin * inner,
      x2: CX + cos * (inner + len),
      y2: CY + sin * (inner + len),
      gold: i % 9 === 0,
    });
  }
  return bars;
}

const OUTER_BARS = radialBars(96, 128, 1.7);
const INNER_BARS = radialBars(64, 92, 4.2);

export function VoiceBloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 480" fill="none" className={className}>
      {/* faint outer orbit with sparse ticks */}
      <circle
        cx={CX}
        cy={CY}
        r={226}
        stroke="#27272a"
        strokeWidth="1"
        strokeDasharray="2 14"
      />

      {/* outer bloom, slow clockwise */}
      <g className="bloom-rotate">
        {OUTER_BARS.map((b, i) => (
          <line
            key={i}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke={b.gold ? "#E8A33D" : "#52525b"}
            strokeWidth={b.gold ? 2 : 1.25}
            strokeLinecap="round"
            opacity={b.gold ? 0.95 : 0.5}
          />
        ))}
      </g>

      {/* inner bloom, slower counter-rotation for depth */}
      <g className="bloom-rotate-rev">
        {INNER_BARS.map((b, i) => (
          <line
            key={i}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke={b.gold ? "#E8A33D" : "#3f3f46"}
            strokeWidth={b.gold ? 1.75 : 1}
            strokeLinecap="round"
            opacity={b.gold ? 0.8 : 0.55}
          />
        ))}
      </g>

      {/* dashed inner orbits */}
      <circle
        cx={CX}
        cy={CY}
        r={78}
        stroke="#3f3f46"
        strokeWidth="1"
        strokeDasharray="3 7"
      />
      <circle
        cx={CX}
        cy={CY}
        r={56}
        stroke="#27272a"
        strokeWidth="1"
        strokeDasharray="1 6"
      />

      {/* core: a speaking mouth of centered bars */}
      <g>
        {[18, 30, 42, 30, 18].map((h, i) => (
          <rect
            key={i}
            className="wave-bar"
            style={{ animationDelay: `${i * 140}ms` }}
            x={CX - 22 + i * 9}
            y={CY - h / 2}
            width="4"
            height={h}
            rx="2"
            fill="#E8A33D"
          />
        ))}
      </g>
    </svg>
  );
}
