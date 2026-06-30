// Radar/spider chart for interview evaluation scorecard
// 5 axes: Problem Solving, Communication, Code Quality, Optimization, Edge Cases
// Scores: 88, 74, 92, 68, 80

export function ScorecardSVG({ className }: { className?: string }) {
  const cx = 200;
  const cy = 200;
  const maxR = 130;
  const levels = 5;

  const axes = [
    { label: "Problem Solving", score: 0.88, angle: -90 },
    { label: "Code Quality", score: 0.92, angle: -18 },
    { label: "Edge Cases", score: 0.80, angle: 54 },
    { label: "Communication", score: 0.74, angle: 126 },
    { label: "Optimization", score: 0.68, angle: 198 },
  ];

  const toXY = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Build web grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const r = (maxR * (i + 1)) / levels;
    return axes.map((a) => toXY(a.angle, r)).map((p) => `${p.x},${p.y}`).join(" ");
  });

  // Score polygon
  const scorePoints = axes.map((a) => toXY(a.angle, maxR * a.score)).map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className ?? "w-full h-auto max-w-[400px]"}
    >
      {/* Background */}
      <rect width="400" height="400" rx="6" fill="#111111" />
      <rect width="400" height="400" rx="6" stroke="#2a2a2a" strokeWidth="1" />

      {/* Title bar */}
      <rect width="400" height="34" rx="6" fill="#161616" />
      <rect y="26" width="400" height="8" fill="#161616" />
      <line x1="0" y1="34" x2="400" y2="34" stroke="#2a2a2a" strokeWidth="1" />
      <text x="16" y="22" fontFamily="monospace" fontSize="11" fill="#555555">evaluation_report.json</text>
      <rect x="336" y="10" width="48" height="14" rx="2" fill="#1e2a1e" />
      <text x="344" y="21" fontFamily="monospace" fontSize="9" fill="#4afa8a">PASSED</text>

      {/* Grid rings */}
      {gridPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          stroke="#222222"
          strokeWidth="1"
          fill="none"
        />
      ))}

      {/* Axis spokes */}
      {axes.map((a) => {
        const outer = toXY(a.angle, maxR);
        return (
          <line
            key={a.label}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="#272727"
            strokeWidth="1"
          />
        );
      })}

      {/* Score polygon fill */}
      <polygon
        points={scorePoints}
        fill="#4afa8a"
        fillOpacity="0.08"
        stroke="#4afa8a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {axes.map((a) => {
        const p = toXY(a.angle, maxR * a.score);
        return (
          <circle key={a.label} cx={p.x} cy={p.y} r="4" fill="#4afa8a" />
        );
      })}

      {/* Axis labels */}
      {axes.map((a) => {
        const labelR = maxR + 22;
        const p = toXY(a.angle, labelR);
        const score = Math.round(a.score * 100);
        return (
          <g key={a.label}>
            <text
              x={p.x}
              y={p.y - 4}
              fontFamily="monospace"
              fontSize="9.5"
              fill="#888888"
              textAnchor="middle"
            >
              {a.label}
            </text>
            <text
              x={p.x}
              y={p.y + 9}
              fontFamily="monospace"
              fontSize="10"
              fill="#4afa8a"
              textAnchor="middle"
            >
              {score}
            </text>
          </g>
        );
      })}

      {/* Center point */}
      <circle cx={cx} cy={cy} r="3" fill="#2a2a2a" />

      {/* Legend / scores strip */}
      <rect x="16" y="350" width="368" height="32" rx="3" fill="#161616" />
      <line x1="16" y1="350" x2="384" y2="350" stroke="#2a2a2a" strokeWidth="1" />

      {axes.map((a, i) => {
        const score = Math.round(a.score * 100);
        const barW = 44;
        const x = 24 + i * 74;
        const label = a.label.split(" ")[0];
        const barFill = score >= 85 ? "#4afa8a" : score >= 70 ? "#7b7bff" : "#ff6b35";
        return (
          <g key={a.label}>
            <text x={x + barW / 2} y={363} fontFamily="monospace" fontSize="8" fill="#555555" textAnchor="middle">{label}</text>
            <text x={x + barW / 2} y={377} fontFamily="monospace" fontSize="10" fill={barFill} textAnchor="middle" fontWeight="bold">{score}</text>
          </g>
        );
      })}

      {/* Overall score */}
      <text x="200" y="196" fontFamily="monospace" fontSize="11" fill="#444444" textAnchor="middle">overall</text>
      <text x="200" y="214" fontFamily="monospace" fontSize="20" fill="#e4e4e4" textAnchor="middle">80.4</text>
    </svg>
  );
}
