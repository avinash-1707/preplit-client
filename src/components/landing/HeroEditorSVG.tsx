"use client";

import { useEffect, useState } from "react";

export function HeroEditorSVG() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 620 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto max-w-[620px]"
    >
      {/* Window chrome */}
      <rect width="620" height="480" rx="8" fill="#111111" />
      <rect width="620" height="480" rx="8" stroke="#2a2a2a" strokeWidth="1" />

      {/* Title bar */}
      <rect width="620" height="36" rx="8" fill="#161616" />
      <rect y="28" width="620" height="8" fill="#161616" />

      {/* Traffic lights */}
      <circle cx="20" cy="18" r="5.5" fill="#ff5f56" />
      <circle cx="38" cy="18" r="5.5" fill="#ffbd2e" />
      <circle cx="56" cy="18" r="5.5" fill="#27c93f" />

      {/* Tab bar */}
      <rect x="80" y="6" width="140" height="24" rx="4" fill="#1a1a1a" />
      <text x="100" y="22" fontFamily="monospace" fontSize="11" fill="#888888">interview_session.py</text>

      {/* Divider */}
      <line x1="0" y1="36" x2="620" y2="36" stroke="#2a2a2a" strokeWidth="1" />

      {/* Sidebar – file tree */}
      <rect x="0" y="36" width="160" height="444" fill="#0e0e0e" />
      <line x1="160" y1="36" x2="160" y2="480" stroke="#2a2a2a" strokeWidth="1" />

      {/* File tree entries */}
      <text x="16" y="62" fontFamily="monospace" fontSize="10" fill="#555555">EXPLORER</text>
      <text x="16" y="84" fontFamily="monospace" fontSize="11" fill="#666666">▾ preplit/</text>
      <text x="28" y="102" fontFamily="monospace" fontSize="11" fill="#888888">▾ session/</text>
      <rect x="28" y="110" width="120" height="16" rx="2" fill="#1e2a1e" />
      <text x="40" y="122" fontFamily="monospace" fontSize="11" fill="#4afa8a">interview.py</text>
      <text x="40" y="140" fontFamily="monospace" fontSize="11" fill="#666666">evaluator.py</text>
      <text x="40" y="158" fontFamily="monospace" fontSize="11" fill="#666666">scorecard.py</text>
      <text x="28" y="176" fontFamily="monospace" fontSize="11" fill="#666666">▸ problems/</text>
      <text x="28" y="194" fontFamily="monospace" fontSize="11" fill="#666666">▸ voice/</text>

      {/* Line numbers background */}
      <rect x="160" y="36" width="44" height="444" fill="#0f0f0f" />

      {/* Line numbers */}
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((n, i) => (
        <text
          key={n}
          x="190"
          y={66 + i * 20}
          fontFamily="monospace"
          fontSize="11"
          fill={n === 7 ? "#4afa8a" : "#383838"}
          textAnchor="end"
        >
          {n}
        </text>
      ))}

      {/* Active line highlight */}
      <rect x="204" y="144" width="416" height="20" fill="#1e2a1e" opacity="0.5" />

      {/* Code content area */}
      <rect x="204" y="36" width="416" height="444" fill="#0a0a0a" />

      {/* Code lines – syntax highlighted */}
      {/* Line 1: import */}
      <text x="216" y="66" fontFamily="monospace" fontSize="12" fill="#7b7bff">from</text>
      <text x="252" y="66" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> typing </text>
      <text x="318" y="66" fontFamily="monospace" fontSize="12" fill="#7b7bff">import</text>
      <text x="364" y="66" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> List, Optional</text>

      {/* Line 2: blank */}

      {/* Line 3: def */}
      <text x="216" y="106" fontFamily="monospace" fontSize="12" fill="#7b7bff">def</text>
      <text x="240" y="106" fontFamily="monospace" fontSize="12" fill="#4afa8a"> two_sum</text>
      <text x="320" y="106" fontFamily="monospace" fontSize="12" fill="#e4e4e4">(</text>
      <text x="328" y="106" fontFamily="monospace" fontSize="12" fill="#ff6b35">nums</text>
      <text x="364" y="106" fontFamily="monospace" fontSize="12" fill="#e4e4e4">: List[</text>
      <text x="418" y="106" fontFamily="monospace" fontSize="12" fill="#7b7bff">int</text>
      <text x="440" y="106" fontFamily="monospace" fontSize="12" fill="#e4e4e4">], </text>
      <text x="460" y="106" fontFamily="monospace" fontSize="12" fill="#ff6b35">target</text>
      <text x="508" y="106" fontFamily="monospace" fontSize="12" fill="#e4e4e4">: </text>
      <text x="520" y="106" fontFamily="monospace" fontSize="12" fill="#7b7bff">int</text>
      <text x="542" y="106" fontFamily="monospace" fontSize="12" fill="#e4e4e4">):</text>

      {/* Line 4: docstring */}
      <text x="228" y="126" fontFamily="monospace" fontSize="12" fill="#555555">    &quot;&quot;&quot;O(n) approach using hash map — O(n²) brute force was too slow&quot;&quot;&quot;</text>

      {/* Line 5: blank */}

      {/* Line 6: seen = {} */}
      <text x="228" y="166" fontFamily="monospace" fontSize="12" fill="#e4e4e4">    seen = </text>
      <text x="304" y="166" fontFamily="monospace" fontSize="12" fill="#7b7bff">{}</text>

      {/* Line 7: for i (active) */}
      <text x="228" y="166" fontFamily="monospace" fontSize="12" fill="#e4e4e4">    seen = </text>
      <text x="304" y="166" fontFamily="monospace" fontSize="12" fill="#e4e4e4">{"{}"}</text>
      <text x="228" y="186" fontFamily="monospace" fontSize="12" fill="#7b7bff">    for</text>
      <text x="264" y="186" fontFamily="monospace" fontSize="12" fill="#ff6b35"> i</text>
      <text x="278" y="186" fontFamily="monospace" fontSize="12" fill="#e4e4e4">, </text>
      <text x="292" y="186" fontFamily="monospace" fontSize="12" fill="#ff6b35">num</text>
      <text x="322" y="186" fontFamily="monospace" fontSize="12" fill="#7b7bff"> in</text>
      <text x="346" y="186" fontFamily="monospace" fontSize="12" fill="#4afa8a"> enumerate</text>
      <text x="440" y="186" fontFamily="monospace" fontSize="12" fill="#e4e4e4">(nums):</text>

      {/* Line 8: complement */}
      <text x="228" y="206" fontFamily="monospace" fontSize="12" fill="#e4e4e4">        complement = target </text>
      <text x="452" y="206" fontFamily="monospace" fontSize="12" fill="#7b7bff">-</text>
      <text x="464" y="206" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> num</text>

      {/* Line 9: if complement */}
      <text x="228" y="226" fontFamily="monospace" fontSize="12" fill="#7b7bff">        if</text>
      <text x="268" y="226" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> complement </text>
      <text x="360" y="226" fontFamily="monospace" fontSize="12" fill="#7b7bff">in</text>
      <text x="382" y="226" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> seen:</text>

      {/* Line 10: return */}
      <text x="228" y="246" fontFamily="monospace" fontSize="12" fill="#7b7bff">            return</text>
      <text x="344" y="246" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> [seen[complement], i]</text>

      {/* Line 11: seen[num] = i */}
      <text x="228" y="266" fontFamily="monospace" fontSize="12" fill="#e4e4e4">        seen[num] </text>
      <text x="356" y="266" fontFamily="monospace" fontSize="12" fill="#7b7bff">=</text>
      <text x="368" y="266" fontFamily="monospace" fontSize="12" fill="#e4e4e4"> i</text>

      {/* Blinking cursor on line 12 */}
      {cursorVisible && (
        <rect x="228" y="276" width="8" height="14" fill="#4afa8a" opacity="0.9" />
      )}

      {/* Bottom status bar */}
      <rect x="160" y="458" width="460" height="22" fill="#161616" />
      <line x1="160" y1="458" x2="620" y2="458" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="160" y="458" width="100" height="22" fill="#1e3a1e" />
      <text x="170" y="473" fontFamily="monospace" fontSize="10" fill="#4afa8a">● Python 3.11</text>
      <text x="390" y="473" fontFamily="monospace" fontSize="10" fill="#555555">Ln 12, Col 1</text>
      <text x="490" y="473" fontFamily="monospace" fontSize="10" fill="#555555">UTF-8</text>

      {/* AI chat panel overlay in bottom right */}
      <rect x="350" y="280" width="258" height="165" rx="4" fill="#111111" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="350" y="280" width="258" height="22" rx="4" fill="#161616" />
      <rect x="350" y="294" width="258" height="8" fill="#161616" />
      <text x="362" y="295" fontFamily="monospace" fontSize="10" fill="#555555">AI Interviewer</text>
      <circle cx="592" cy="291" r="4" fill="#4afa8a" />

      {/* Chat messages */}
      <rect x="362" y="312" width="192" height="36" rx="3" fill="#1a1a1a" />
      <text x="370" y="325" fontFamily="monospace" fontSize="9.5" fill="#888888">Good. Now what&apos;s the time</text>
      <text x="370" y="339" fontFamily="monospace" fontSize="9.5" fill="#888888">complexity of this approach?</text>

      <rect x="374" y="358" width="186" height="26" rx="3" fill="#1e2a1e" />
      <text x="382" y="371" fontFamily="monospace" fontSize="9.5" fill="#4afa8a">O(n) — one pass, single hash</text>
      <text x="382" y="384" fontFamily="monospace" fontSize="9.5" fill="#4afa8a">lookup is O(1) average</text>

      {/* typing indicator */}
      <text x="362" y="428" fontFamily="monospace" fontSize="9" fill="#555555">interviewer is typing</text>
      <circle cx="430" cy="424" r="2" fill="#555555" opacity="0.6" />
      <circle cx="438" cy="424" r="2" fill="#555555" opacity="0.8" />
      <circle cx="446" cy="424" r="2" fill="#555555" opacity="1.0" />
    </svg>
  );
}
