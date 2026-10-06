// Illustrations produit vectorielles (démo hors-ligne, style cohérent).
const BG = {
  blue: ['#E3EFFB', '#C6DDF4'],
  sky: ['#EAF3FC', '#D3E6F8'],
  sand: ['#F7F0E6', '#EEDFC8'],
  mint: ['#E5F4EE', '#CDE8DC'],
  rose: ['#FBEBEE', '#F5D5DB'],
};

const shade = '#0B2347';

function Art({ kind, accent = '#1464A5' }) {
  switch (kind) {
    case 'phone':
      return (
        <g>
          <rect x="138" y="28" width="124" height="244" rx="26" fill={accent} />
          <rect x="138" y="28" width="124" height="244" rx="26" fill="url(#gloss)" />
          <rect x="150" y="40" width="58" height="62" rx="16" fill="#fff" opacity=".16" />
          <circle cx="166" cy="58" r="11" fill={shade} /><circle cx="166" cy="58" r="5" fill="#2F7FC0" />
          <circle cx="192" cy="58" r="11" fill={shade} /><circle cx="192" cy="58" r="5" fill="#2F7FC0" />
          <circle cx="179" cy="84" r="11" fill={shade} /><circle cx="179" cy="84" r="5" fill="#2F7FC0" />
          <circle cx="226" cy="52" r="5" fill="#fff" opacity=".8" />
          <circle cx="200" cy="170" r="20" fill="#fff" opacity=".18" />
        </g>
      );
    case 'laptop':
      return (
        <g>
          <rect x="92" y="62" width="216" height="134" rx="12" fill={accent} />
          <rect x="102" y="72" width="196" height="114" rx="6" fill="#0E2A4D" />
          <rect x="102" y="72" width="196" height="114" rx="6" fill="url(#screen)" />
          <rect x="120" y="94" width="70" height="8" rx="4" fill="#fff" opacity=".85" />
          <rect x="120" y="112" width="110" height="6" rx="3" fill="#fff" opacity=".4" />
          <rect x="120" y="126" width="90" height="6" rx="3" fill="#fff" opacity=".4" />
          <rect x="240" y="104" width="44" height="60" rx="8" fill="#fff" opacity=".2" />
          <path d="M60 200h280l-14 20a10 10 0 0 1-8 4H82a10 10 0 0 1-8-4z" fill={accent} />
          <rect x="170" y="200" width="60" height="6" rx="3" fill="#000" opacity=".15" />
        </g>
      );
    case 'dress':
      return (
        <g>
          <path d="M176 50l8-24M224 50l-8-24" stroke={accent} strokeWidth="5" strokeLinecap="round" />
          <path d="M166 54q34 30 68 0l-6 82h-56z" fill={accent} />
          <path d="M172 136h56l72 132q-100 22-200 0z" fill={accent} />
          <path d="M172 136h56l72 132q-100 22-200 0z" fill="url(#gloss)" />
          <rect x="168" y="130" width="64" height="12" rx="6" fill="#fff" opacity=".5" />
          <path d="M200 146l-26 118M200 146l26 118M200 146v124" stroke="#fff" strokeOpacity=".2" strokeWidth="3" />
        </g>
      );
    case 'shoes':
      return (
        <g>
          <path d="M62 200q0-52 44-54l36 10q36 36 80 20l30-12q70 4 80 44v28H62z" fill={accent} />
          <path d="M62 200q0-52 44-54l36 10q36 36 80 20l30-12q70 4 80 44v28H62z" fill="url(#gloss)" />
          <path d="M150 158l18-14M172 172l18-14M194 180l18-14" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
          <rect x="56" y="218" width="296" height="24" rx="12" fill="#fff" />
          <rect x="56" y="232" width="296" height="10" rx="5" fill="#0B2347" opacity=".08" />
          <path d="M270 190q40-6 74 10" stroke="#fff" strokeOpacity=".5" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'sofa':
      return (
        <g>
          <rect x="84" y="96" width="232" height="96" rx="30" fill={accent} opacity=".85" />
          <rect x="56" y="138" width="46" height="98" rx="20" fill={accent} />
          <rect x="298" y="138" width="46" height="98" rx="20" fill={accent} />
          <rect x="82" y="168" width="236" height="62" rx="20" fill={accent} />
          <rect x="82" y="168" width="236" height="62" rx="20" fill="url(#gloss)" />
          <path d="M200 172v54" stroke="#000" strokeOpacity=".12" strokeWidth="3" />
          <rect x="92" y="236" width="12" height="20" rx="5" fill={shade} /><rect x="296" y="236" width="12" height="20" rx="5" fill={shade} />
          <rect x="108" y="116" width="62" height="40" rx="14" fill="#fff" opacity=".25" />
        </g>
      );
    case 'car':
      return (
        <g>
          <path d="M52 196l14-34q6-14 24-18l40-8 30-30q14-12 34-12h36q22 0 38 14l28 28 40 8q26 4 28 30l2 22q0 8-8 8H58q-10 0-6-8z" fill={accent} />
          <path d="M52 196l14-34q6-14 24-18l40-8 30-30q14-12 34-12h36q22 0 38 14l28 28 40 8q26 4 28 30l2 22q0 8-8 8H58q-10 0-6-8z" fill="url(#gloss)" />
          <path d="M158 114l20-20q8-6 20-6h18v50h-76z" fill="#EAF4FF" opacity=".9" />
          <path d="M240 88h6q14 2 24 12l20 22h-50z" fill="#EAF4FF" opacity=".9" />
          <rect x="324" y="168" width="22" height="9" rx="4" fill="#FFE9A8" /><rect x="52" y="172" width="16" height="9" rx="4" fill="#FF8A8A" />
          {[122, 288].map((x) => (
            <g key={x}><circle cx={x} cy="214" r="30" fill={shade} /><circle cx={x} cy="214" r="15" fill="#E7EEF7" /><circle cx={x} cy="214" r="5" fill={shade} /></g>
          ))}
        </g>
      );
    case 'apartment':
      return (
        <g>
          <rect x="250" y="120" width="90" height="140" rx="6" fill={accent} opacity=".45" />
          <rect x="116" y="38" width="150" height="222" rx="8" fill={accent} />
          <rect x="116" y="38" width="150" height="222" rx="8" fill="url(#gloss)" />
          {Array.from({ length: 5 }).map((_, r) =>
            [0, 1, 2].map((c) => (
              <rect key={r + '-' + c} x={134 + c * 42} y={56 + r * 36} width="28" height="22" rx="4" fill="#fff" opacity={(r + c) % 3 === 0 ? 0.95 : 0.4} />
            ))
          )}
          <rect x="170" y="226" width="42" height="34" rx="6" fill={shade} opacity=".8" />
          {[262, 290, 318].map((x) => <rect key={x} x={x} y="136" width="14" height="14" rx="3" fill="#fff" opacity=".55" />)}
          <rect x="60" y="256" width="290" height="6" rx="3" fill={shade} opacity=".12" />
        </g>
      );
    case 'land':
      return (
        <g>
          <path d="M0 222q90-60 200-30t200-14V300H0z" fill={accent} opacity=".35" />
          <path d="M0 250q120-50 230-20t170-8V300H0z" fill={accent} opacity=".55" />
          <rect x="196" y="116" width="8" height="120" rx="3" fill={shade} opacity=".75" />
          <rect x="140" y="82" width="120" height="58" rx="10" fill="#fff" />
          <rect x="150" y="92" width="100" height="38" rx="6" fill="#1464A5" />
          <text x="200" y="117" textAnchor="middle" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="15" fill="#fff">À VENDRE</text>
          {[60, 90, 120, 280, 310, 340].map((x) => <rect key={x} x={x} y="226" width="6" height="28" rx="2" fill={shade} opacity=".35" />)}
        </g>
      );
    case 'tools':
      return (
        <g>
          <rect x="86" y="126" width="228" height="108" rx="14" fill={accent} />
          <rect x="86" y="126" width="228" height="108" rx="14" fill="url(#gloss)" />
          <rect x="100" y="140" width="96" height="60" rx="8" fill="#fff" opacity=".22" />
          <circle cx="262" cy="170" r="24" fill="#fff" opacity=".9" /><path d="M262 170l12-14" stroke="#C23B3B" strokeWidth="4" strokeLinecap="round" />
          <rect x="116" y="96" width="50" height="34" rx="6" fill={accent} opacity=".7" />
          <rect x="106" y="234" width="16" height="22" rx="4" fill={shade} /><rect x="278" y="234" width="16" height="22" rx="4" fill={shade} />
          <circle cx="116" cy="216" r="5" fill="#9BE3B0" /><circle cx="134" cy="216" r="5" fill="#FFD27A" />
          <g transform="translate(330 70)" opacity=".85">
            <circle r="26" fill="none" stroke={accent} strokeWidth="10" strokeDasharray="10 8" />
            <circle r="8" fill={accent} />
          </g>
        </g>
      );
    case 'food':
      return (
        <g>
          <circle cx="160" cy="130" r="30" fill="#F0932B" /><circle cx="218" cy="118" r="32" fill="#E55039" />
          <circle cx="262" cy="144" r="26" fill="#F6B93B" /><circle cx="196" cy="102" r="22" fill="#78B857" />
          <path d="M196 80q6-14 22-16" stroke="#3D7A2B" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M100 150h200l-22 100q-2 10-12 10H134q-10 0-12-10z" fill={accent} />
          <path d="M100 150h200l-22 100q-2 10-12 10H134q-10 0-12-10z" fill="url(#gloss)" />
          <path d="M126 176h148M134 206h132M142 236h116" stroke="#fff" strokeOpacity=".35" strokeWidth="4" />
          <rect x="94" y="142" width="212" height="16" rx="8" fill={accent} />
        </g>
      );
    case 'service':
      return (
        <g>
          <g transform="rotate(-38 200 150)">
            <rect x="188" y="110" width="24" height="150" rx="12" fill={accent} />
            <circle cx="200" cy="96" r="38" fill={accent} />
            <rect x="188" y="46" width="24" height="46" rx="4" fill={BG.blue[1]} />
          </g>
          <g transform="rotate(38 200 150)">
            <rect x="193" y="60" width="14" height="140" rx="5" fill="#fff" opacity=".9" />
            <rect x="184" y="196" width="32" height="68" rx="14" fill="#E0A94A" />
          </g>
          <circle cx="200" cy="154" r="9" fill={shade} />
        </g>
      );
    case 'kids':
      return (
        <g>
          <circle cx="148" cy="96" r="22" fill={accent} /><circle cx="252" cy="96" r="22" fill={accent} />
          <circle cx="148" cy="96" r="11" fill="#fff" opacity=".4" /><circle cx="252" cy="96" r="11" fill="#fff" opacity=".4" />
          <circle cx="200" cy="124" r="62" fill={accent} />
          <ellipse cx="200" cy="248" rx="62" ry="22" fill="#000" opacity=".08" />
          <ellipse cx="200" cy="206" rx="60" ry="56" fill={accent} />
          <ellipse cx="200" cy="214" rx="34" ry="36" fill="#fff" opacity=".35" />
          <ellipse cx="200" cy="140" rx="26" ry="20" fill="#fff" opacity=".75" />
          <circle cx="178" cy="116" r="6" fill={shade} /><circle cx="222" cy="116" r="6" fill={shade} />
          <ellipse cx="200" cy="134" rx="9" ry="6" fill={shade} />
          <circle cx="132" cy="196" r="20" fill={accent} /><circle cx="268" cy="196" r="20" fill={accent} />
        </g>
      );
    case 'beauty':
      return (
        <g>
          <rect x="150" y="104" width="100" height="144" rx="22" fill={accent} opacity=".92" />
          <rect x="150" y="104" width="100" height="144" rx="22" fill="url(#gloss)" />
          <rect x="176" y="62" width="48" height="46" rx="10" fill={shade} />
          <rect x="188" y="40" width="24" height="26" rx="6" fill={shade} opacity=".85" />
          <rect x="166" y="144" width="68" height="56" rx="10" fill="#fff" opacity=".85" />
          <rect x="176" y="158" width="48" height="6" rx="3" fill={accent} /><rect x="176" y="172" width="34" height="5" rx="2.5" fill={accent} opacity=".5" />
          <rect x="272" y="150" width="28" height="100" rx="12" fill="#fff" opacity=".9" />
          <rect x="272" y="122" width="28" height="36" rx="8" fill={accent} />
          <path d="M276 122q10-22 20 0z" fill="#C23B3B" />
        </g>
      );
    default:
      return <rect x="140" y="80" width="120" height="120" rx="20" fill={accent} />;
  }
}

export default function ProductArt({ kind = 'phone', tone = 'blue', accent, className = '' }) {
  const [a, b] = BG[tone] || BG.blue;
  const gid = `bg-${tone}`;
  return (
    <svg className={`art ${className}`} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".16" /></linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2F7FC0" /><stop offset="1" stopColor="#0B2347" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <circle cx="330" cy="50" r="90" fill="#fff" opacity=".35" />
      <circle cx="40" cy="270" r="70" fill="#fff" opacity=".25" />
      <ellipse cx="200" cy="262" rx="120" ry="12" fill="#0B2347" opacity=".12" />
      <Art kind={kind} accent={accent} />
    </svg>
  );
}
