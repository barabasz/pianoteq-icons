// Glyph library: each glyph is (theme, arg) => SVG markup in a 144x144 box (drawn inside translate(0,10)).

// Mini keyboard: n white keys between x..x+w, height h.
function keys(t, x, y, w, h, n) {
  const kw = w / n;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${t.key}" rx="1.5" stroke="${t.keyDark}" stroke-width="1"/>`;
  for (let i = 1; i < n; i++) s += `<line x1="${x + i * kw}" y1="${y}" x2="${x + i * kw}" y2="${y + h}" stroke="${t.keyDark}" stroke-width="1.2"/>`;
  const pattern = [1, 1, 0, 1, 1, 1, 0]; // black key after white key i (C D E F G A B)
  for (let i = 0; i < n - 1; i++) {
    if (!pattern[i % 7]) continue;
    const bw = kw * 0.6;
    s += `<rect x="${x + (i + 1) * kw - bw / 2}" y="${y}" width="${bw}" height="${h * 0.6}" fill="${t.keyDark}"/>`;
  }
  return s;
}

// Red "off" mark (circle with slash) for noise-mute keys.
const slashMark = () => `<circle cx="106" cy="26" r="14" fill="none" stroke="#ff3b30" stroke-width="4.5"/><line x1="96" y1="36" x2="116" y2="16" stroke="#ff3b30" stroke-width="4.5"/>`;
// Piano pedal (lyre rod + foot) centred at cx, cy.
const pedal = (t, cx, cy) => `<rect x="${cx - 3.5}" y="${cy - 46}" width="7" height="24" rx="2" fill="${t.fg}"/>
  <path d="M${cx - 12} ${cy - 24} L${cx + 12} ${cy - 24} L${cx + 17} ${cy + 18} Q${cx + 17} ${cy + 28} ${cx} ${cy + 28} Q${cx - 17} ${cy + 28} ${cx - 17} ${cy + 18} Z" fill="${t.fg}"/>`;

const GLYPHS = {
  grand: t => `
    <path d="M40 84 L40 24 Q40 14 51 14 Q66 14 72 32 Q79 52 98 60 Q106 64 106 74 L106 84 Z" fill="${t.fg}"/>
    <path d="M47 78 L47 26 Q47 21 52 21 Q62 21 66 34 Q73 55 94 66 Q99 69 99 74 L99 78 Z" fill="none" stroke="${t.detail}" stroke-width="1.5" opacity=".35"/>
    ${keys(t, 36, 84, 74, 10, 10)}
    <rect x="36" y="84" width="74" height="10" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>`,
  upright: t => `<g transform="translate(11.5 16) scale(.84)">
    <path d="M36 70 L36 26 Q36 16 46 16 L98 16 Q108 16 108 26 L108 70 Z" fill="${t.fg}"/>
    <rect x="50" y="30" width="44" height="16" rx="2" fill="${t.detail}" opacity=".35"/>
    <rect x="30" y="70" width="84" height="5" fill="${t.fg}"/>
    ${keys(t, 34, 75, 76, 11, 10)}
    <rect x="34" y="75" width="76" height="11" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>
    <rect x="38" y="86" width="6" height="8" fill="${t.fg}"/><rect x="100" y="86" width="6" height="8" fill="${t.fg}"/></g>`,
  tines: t => `
    <rect x="22" y="34" width="100" height="22" rx="5" fill="${t.fg}"/>
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${32 + i * 6.7}" y1="40" x2="${32 + i * 6.7}" y2="${50 - (i % 3) * 2}" stroke="${t.detail}" stroke-width="2" stroke-linecap="round" opacity=".55"/>`).join('')}
    <rect x="22" y="56" width="100" height="26" rx="3" fill="${t.fg}"/>
    ${keys(t, 27, 59, 90, 19, 12)}
    <rect x="27" y="59" width="90" height="19" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>
    <rect x="30" y="82" width="5" height="12" fill="${t.fg}"/><rect x="109" y="82" width="5" height="12" fill="${t.fg}"/>`,
  reeds: t => `
    <path d="M24 66 L24 46 Q24 28 46 26 L98 26 Q120 28 120 46 L120 66 Z" fill="${t.fg}"/>
    <path d="M40 38 L104 38" stroke="${t.detail}" stroke-width="2" opacity=".4" stroke-linecap="round"/>
    ${keys(t, 30, 50, 84, 14, 11)}
    <rect x="30" y="50" width="84" height="14" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>
    <path d="M44 66 L58 94 M58 66 L44 94 M86 66 L100 94 M100 66 L86 94" stroke="${t.fg}" stroke-width="4" stroke-linecap="round"/>`,
  clavinet: t => `
    <path d="M22 70 L28 32 L116 32 L122 70 Z" fill="${t.fg}"/>
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${36 + i * 9}" y1="38" x2="${42 + i * 9}" y2="54" stroke="${t.detail}" stroke-width="1.4" opacity=".9"/>`).join('')}
    ${keys(t, 26, 56, 92, 14, 12)}
    <rect x="26" y="56" width="92" height="14" fill="none" stroke="${t.fg}" stroke-width="1.5"/>
    <rect x="30" y="70" width="5" height="24" fill="${t.fg}"/><rect x="109" y="70" width="5" height="24" fill="${t.fg}"/>`,
  planet: (t, letter) => `
    <circle cx="72" cy="48" r="26" fill="${t.fg}"/>
    <ellipse cx="72" cy="48" rx="44" ry="11" fill="none" stroke="${t.fg}" stroke-width="4" transform="rotate(-18 72 48)"/>
    <path d="M45 40 A27 27 0 0 1 99 40" fill="none" stroke="${t.bg[0]}" stroke-width="0" />
    <text x="72" y="58" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${t.detail}">${letter}</text>
    ${keys(t, 34, 80, 76, 12, 10)}
    <rect x="34" y="80" width="76" height="12" fill="none" stroke="${t.fg}" stroke-width="1.5"/>`,
  synth: t => `
    <rect x="18" y="20" width="108" height="56" rx="8" fill="none" stroke="${t.fg}" stroke-width="2.5" opacity=".5"/>
    <path d="M26 48 C34 22 42 22 50 48 S66 74 74 48 L74 48 L98 26 L98 70 L118 26" fill="none" stroke="${t.fg}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  guitar: t => `
    <g transform="rotate(28 72 54)">
      <rect x="68" y="2" width="8" height="40" rx="1.5" fill="${t.fg}"/>
      <rect x="65" y="-6" width="14" height="14" rx="2.5" fill="${t.fg}"/>
      <circle cx="68.5" cy="-1" r="1.6" fill="${t.detail}"/><circle cx="75.5" cy="-1" r="1.6" fill="${t.detail}"/>
      <circle cx="68.5" cy="4" r="1.6" fill="${t.detail}"/><circle cx="75.5" cy="4" r="1.6" fill="${t.detail}"/>
      <ellipse cx="72" cy="50" rx="17" ry="16" fill="${t.fg}"/>
      <ellipse cx="72" cy="78" rx="23" ry="21" fill="${t.fg}"/>
      <rect x="62" y="56" width="20" height="10" fill="${t.fg}"/>
      <circle cx="72" cy="58" r="7.5" fill="${t.detail}"/>
      <circle cx="72" cy="58" r="10" fill="none" stroke="${t.detail}" stroke-width="1.2" opacity=".5"/>
      <rect x="62" y="82" width="20" height="5" rx="1.5" fill="${t.detail}"/>
      ${[69.5, 71, 72.5, 74].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="84" stroke="${t.detail}" stroke-width=".7" opacity=".6"/>`).join('')}
    </g>`,
  electra: t => `
    <rect x="34" y="18" width="76" height="46" rx="4" fill="${t.fg}"/>
    ${[28, 35, 42, 49].map(y => `<line x1="44" y1="${y}" x2="100" y2="${y}" stroke="${t.detail}" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>`).join('')}
    <rect x="28" y="64" width="88" height="6" rx="1.5" fill="${t.fg}"/>
    ${keys(t, 32, 70, 80, 12, 10)}
    <rect x="32" y="70" width="80" height="12" fill="none" stroke="${t.fg}" stroke-width="1.5"/>
    <path d="M40 82 L36 96 M104 82 L108 96" stroke="${t.fg}" stroke-width="4.5" stroke-linecap="round"/>`,
  vibes: t => {
    let g = `<g transform="translate(14 18) scale(.8)"><rect x="18" y="58" width="108" height="4" rx="2" fill="${t.fg}" opacity=".8"/>`;
    for (let i = 0; i < 9; i++) {
      const x = 20 + i * 11.6, h = 44 - i * 2.6;
      g += `<rect x="${x + 3.2}" y="${20 + h}" width="3.4" height="${74 - 20 - h}" rx="1.7" fill="${t.fg}" opacity=".55"/>`;
      g += `<rect x="${x}" y="20" width="9.8" height="${h}" rx="2.5" fill="${t.fg}" stroke="${t.detail}" stroke-width="1"/>`;
      g += `<circle cx="${x + 4.9}" cy="25" r="1.3" fill="${t.detail}" opacity=".6"/>`;
    }
    g += `<path d="M24 74 L24 94 M120 74 L120 94 M20 74 L124 74" stroke="${t.fg}" stroke-width="4" stroke-linecap="round"/></g>`;
    return g;
  },
  flute: t => `
    <g transform="rotate(-18 72 52)">
      <rect x="14" y="46" width="116" height="11" rx="5.5" fill="${t.fg}"/>
      <rect x="34" y="44" width="4" height="15" rx="1.5" fill="${t.detail}" opacity=".5"/>
      <ellipse cx="28" cy="51.5" rx="3.2" ry="2.4" fill="${t.detail}"/>
      ${[56, 66, 76, 92, 102, 112].map(x => `<circle cx="${x}" cy="51.5" r="3" fill="${t.detail}"/>`).join('')}
    </g>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  pad: t => `
    ${[0, 1, 2].map(i => `<path d="M18 ${36 + i * 12} C40 ${18 + i * 12} 56 ${54 + i * 12} 72 ${36 + i * 12} S104 ${18 + i * 12} 126 ${36 + i * 12}" fill="none" stroke="${t.fg}" stroke-width="${6 - i * 1.5}" stroke-linecap="round" opacity="${1 - i * 0.3}"/>`).join('')}
    ${keys(t, 30, 82, 84, 12, 11)}`,
  bass: t => `
    <circle cx="52" cy="38" r="8" fill="${t.fg}"/>
    <path d="M47 32 C54 14 90 16 90 40 C90 60 72 72 46 80" fill="none" stroke="${t.fg}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="104" cy="30" r="5" fill="${t.fg}"/><circle cx="104" cy="50" r="5" fill="${t.fg}"/>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  favL: t => `<path d="M58 38 L40 58 L58 78 M84 38 L66 58 L84 78" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M102 33 C88 24 90 13 97 14 C100 14 102 17 102 19 C102 17 104 14 107 14 C114 13 116 24 102 33 Z" fill="#ff5a7a"/>`,
  favR: t => `<path d="M60 38 L78 58 L60 78 M86 38 L104 58 L86 78" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 33 C28 24 30 13 37 14 C40 14 42 17 42 19 C42 17 44 14 47 14 C54 13 56 24 42 33 Z" fill="#ff5a7a"/>`,
  mute: t => `<path d="M36 44 L50 44 L68 28 L68 84 L50 68 L36 68 Z" fill="${t.fg}" stroke="${t.fg}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M82 42 L106 70 M106 42 L82 70" stroke="#ff3b30" stroke-width="8" stroke-linecap="round"/>`,
  fullscreen: t => `<path d="M38 44 L38 30 L52 30 M92 30 L106 30 L106 44 M106 68 L106 82 L92 82 M52 82 L38 82 L38 68" fill="none" stroke="${t.fg}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="52" y="44" width="40" height="24" rx="3" fill="${t.fg}" opacity=".35"/>`,
  gotoFunctions: t => {
    const cells = [[48, 32], [96, 32], [48, 78], [96, 78]];
    let g = cells.map(([cx, cy]) => `<rect x="${cx - 21}" y="${cy - 20}" width="42" height="40" rx="8" fill="#ffffff" opacity=".1"/>`).join('');
    g += `<rect x="40" y="24" width="16" height="16" rx="2.5" fill="${t.fg}"/>`;
    g += `<circle cx="96" cy="32" r="10" fill="#ff3b30"/>`;
    g += `<path d="M38 82 A10 10 0 1 1 48 88" fill="none" stroke="#ffb340" stroke-width="4.5" stroke-linecap="round"/><path d="M33 76 L38 83 L45 78" fill="none" stroke="#ffb340" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<path d="M90 68 L106 78 L90 88 Z" fill="#34c759" stroke="#34c759" stroke-width="3" stroke-linejoin="round"/>`;
    return g;
  },
  gotoInstruments: t => {
    const tiles = [[27, 12, '#4a4a52'], [75, 12, '#b3261e'], [27, 58, '#e3a312'], [75, 58, '#8a4bdb']];
    const w = { key: '#ffffff', keyDark: '#222' };
    return tiles.map(([x, y, c]) => `<rect x="${x}" y="${y}" width="42" height="40" rx="8" fill="${c}"/>${keys(w, x + 7, y + 13, 28, 14, 5)}`).join('');
  },
  dice: t => `
    <g transform="rotate(-16 54 62)"><rect x="30" y="38" width="46" height="46" rx="9" fill="${t.fg}" opacity=".45"/></g>
    <g transform="rotate(12 86 46)"><rect x="62" y="22" width="48" height="48" rx="10" fill="#ffffff"/>
      ${[[74, 34], [98, 34], [86, 46], [74, 58], [98, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="${t.keyDark}"/>`).join('')}</g>`,
  cp80: t => `
    <path d="M30 54 L40 34 L104 34 L114 54 Z" fill="${t.fg}"/>
    ${[52, 62, 72, 82, 92].map(x => `<line x1="${x}" y1="40" x2="${x - 4}" y2="50" stroke="${t.detail}" stroke-width="1.6" opacity=".45"/>`).join('')}
    <rect x="22" y="54" width="100" height="7" rx="1.5" fill="${t.fg}"/>
    ${keys(t, 26, 61, 92, 16, 12)}
    <rect x="26" y="61" width="92" height="16" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>
    <rect x="30" y="77" width="6" height="17" fill="${t.fg}"/><rect x="108" y="77" width="6" height="17" fill="${t.fg}"/>`,
  jazzGuitar: t => `
    <g transform="rotate(28 72 54)">
      <rect x="68" y="0" width="8" height="44" rx="1.5" fill="${t.fg}"/>
      <path d="M64 -10 L80 -10 L79 6 L65 6 Z" fill="${t.fg}"/>
      ${[-6, -1, 4].map(y => `<circle cx="67.5" cy="${y}" r="1.5" fill="${t.detail}"/><circle cx="76.5" cy="${y}" r="1.5" fill="${t.detail}"/>`).join('')}
      <path d="M66 40 C50 36 44 54 56 62 C40 70 44 102 72 102 C100 102 104 70 88 62 C95 57 97 49 93 42 C89 47 84 48 80 40 Z" fill="${t.fg}"/>
      <path d="M58 64 c-4 6 4 10 0 17 M86 64 c-4 6 4 10 0 17" fill="none" stroke="${t.detail}" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="63" y="76" width="18" height="3.5" rx="1.5" fill="${t.detail}"/>
      <path d="M66 96 L78 96 L76 86 L68 86 Z" fill="${t.detail}"/>
      ${[69.5, 71, 72.5, 74].map(x => `<line x1="${x}" y1="-4" x2="${x}" y2="88" stroke="${t.detail}" stroke-width=".7" opacity=".6"/>`).join('')}
    </g>`,
  celesta: t => `
    <path d="M40 56 L40 32 Q40 18 72 18 Q104 18 104 32 L104 56 Z" fill="${t.fg}"/>
    <path d="M72 26 L75 34 L83 37 L75 40 L72 48 L69 40 L61 37 L69 34 Z" fill="${t.detail}" opacity=".6"/>
    <rect x="34" y="56" width="76" height="5" fill="${t.fg}"/>
    ${keys(t, 38, 61, 68, 11, 8)}
    <rect x="38" y="61" width="68" height="11" fill="none" stroke="${t.keyDark}" stroke-width="1.5"/>
    <rect x="42" y="72" width="60" height="10" fill="${t.fg}"/>
    <path d="M46 82 Q44 90 40 95 M98 82 Q100 90 104 95" stroke="${t.fg}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  toyPiano: t => {
    const kx = i => 40 + i * 13.2;
    return `<rect x="30" y="22" width="84" height="60" rx="16" fill="${t.fg}"/>
    <path d="M72 28 L74.5 34 L81 35 L76 39 L77.5 45.5 L72 42 L66.5 45.5 L68 39 L63 35 L69.5 34 Z" fill="${t.detail}" opacity=".7"/>
    <rect x="38" y="50" width="68" height="26" rx="4" fill="${t.keyDark}"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${kx(i)}" y="52" width="11.4" height="22" rx="2" fill="${t.key}"/>`).join('')}
    ${[1, 2, 4].map(i => `<rect x="${kx(i) - 4.5}" y="52" width="7" height="13" rx="1.5" fill="${t.keyDark}"/>`).join('')}
    <circle cx="44" cy="88" r="6" fill="${t.fg}"/><circle cx="100" cy="88" r="6" fill="${t.fg}"/>`;
  },
  churchBells: t => {
    const bell = (x, y, sc, rot) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">
      <rect x="-5" y="-38" width="10" height="9" rx="2" fill="${t.fg}"/>
      <path d="M-5 -30 L5 -30 C18 -28 20 -12 22 6 C23 14 28 18 31 20 L31 25 L-31 25 L-31 20 C-28 18 -23 14 -22 6 C-20 -12 -18 -28 -5 -30 Z" fill="${t.fg}" stroke="${t.detail}" stroke-width="2.5"/>
      <rect x="-31" y="17" width="62" height="3" fill="${t.detail}" opacity=".45"/>
      <circle cx="0" cy="31" r="6" fill="${t.fg}" stroke="${t.detail}" stroke-width="2"/></g>`;
    return `<path d="M24 14 L120 14" stroke="${t.fg}" stroke-width="5" stroke-linecap="round"/>` + bell(96, 54, .78, 12) + bell(52, 58, .95, -10);
  },
  kalimba: t => {
    let g = `<rect x="30" y="16" width="84" height="80" rx="16" fill="${t.fg}"/><circle cx="72" cy="80" r="8" fill="${t.detail}"/>`;
    for (let i = 0; i < 9; i++) {
      const len = 22 + 6 * (4 - Math.abs(i - 4));
      g += `<rect x="${38 + i * 8.2}" y="24" width="4.6" height="${len}" rx="2.3" fill="${t.detail}" opacity=".85"/>`;
    }
    g += `<rect x="34" y="34" width="76" height="6" rx="2" fill="${t.detail}"/>`;
    return g;
  },
  glockenspiel: t => {
    let g = `<path d="M18 22 L126 32 L126 72 L18 82 Z" fill="none" stroke="${t.fg}" stroke-width="3.5" stroke-linejoin="round"/>`;
    for (let i = 0; i < 9; i++) {
      const x = 26 + i * 11, h = 50 - i * 2.4;
      g += `<rect x="${x}" y="${52 - h / 2}" width="8" height="${h}" rx="1.5" fill="${t.fg}"/>`;
    }
    g += `<path d="M58 98 L84 60 M92 98 L108 62" stroke="${t.fg}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="85" cy="58" r="5.5" fill="${t.fg}" stroke="${t.keyDark}" stroke-width="1.5"/><circle cx="109" cy="60" r="5.5" fill="${t.fg}" stroke="${t.keyDark}" stroke-width="1.5"/>`;
    return g;
  },
  tubularBells: t => {
    let g = `<path d="M22 96 L22 12 L122 12 L122 96 M14 96 L30 96 M114 96 L130 96" stroke="${t.fg}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    for (let i = 0; i < 7; i++) {
      const x = 32 + i * 12.5, h = 72 - i * 5;
      g += `<line x1="${x + 4}" y1="12" x2="${x + 4}" y2="18" stroke="${t.fg}" stroke-width="2"/>`;
      g += `<rect x="${x}" y="18" width="8" height="${h}" rx="2" fill="${t.fg}" stroke="${t.detail}" stroke-width="1"/>`;
      g += `<rect x="${x - 1}" y="20" width="10" height="3" rx="1" fill="${t.detail}" opacity=".6"/>`;
    }
    return g;
  },
  lead: t => `
    <path d="M20 70 L46 26 L46 70 L72 26 L72 70 L98 26 L98 70 L124 30" fill="none" stroke="${t.fg}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  // Wooden mallet instruments: xylophone (many narrow bars, short resonators), bass marimba (few wide bars, long resonators).
  mallets: (t, kind) => {
    const m = kind === 'marimba'
      ? { n: 7, w: 13, step: 15.2, h0: 30, dh: 2.2, top: 18, tube: 5, tubeEnd: () => 88, rail: 88 }
      : { n: 11, w: 7.6, step: 9.6, h0: 36, dh: 1.6, top: 22, tube: 3.2, tubeEnd: (y) => y + 12, rail: 70 };
    let g = '';
    const width = (m.n - 1) * m.step + m.w, x0 = 72 - width / 2;
    for (let i = 0; i < m.n; i++) {
      const x = x0 + i * m.step, h = m.h0 - i * m.dh, yb = m.top + h;
      const end = m.tubeEnd(yb) - (kind === 'marimba' ? i * 3 : 0);
      g += `<rect x="${x + m.w / 2 - m.tube / 2}" y="${yb}" width="${m.tube}" height="${end - yb}" rx="${m.tube / 2}" fill="${t.fg}" opacity=".6"/>`;
      g += `<rect x="${x}" y="${m.top}" width="${m.w}" height="${h}" rx="2" fill="${t.fg}" stroke="${t.detail}" stroke-width="1"/>`;
    }
    g += `<path d="M${x0 - 4} ${m.rail} L${x0 + width + 4} ${m.rail} M${x0} ${m.rail} L${x0} 96 M${x0 + width} ${m.rail} L${x0 + width} 96" stroke="${t.fg}" stroke-width="4" stroke-linecap="round"/>`;
    return g;
  },
  // Harps (side view): pillar left, diagonal soundboard right, S-shaped neck on top, vertical strings.
  harp: (t, kind) => {
    const k = {
      concert: { px: 38, top: 14, amp: 8, sb: [58, 88, 108, 24], step: 5, crown: true, pedals: true, curved: false },
      celtic:  { px: 44, top: 30, amp: 6, sb: [62, 88, 104, 40], step: 6, crown: false, pedals: false, curved: true },
      triple:  { px: 40, top: 8, amp: 10, sb: [60, 88, 104, 18], step: 2.6, crown: false, pedals: false, curved: false },
    }[kind];
    const [sx1, sy1, sx2, sy2] = k.sb;
    const neckY = x => k.top + k.amp * Math.sin(Math.PI * 2 * (x - k.px) / (sx2 - k.px) * 0.75);
    const sbY = x => x <= sx1 ? sy1 : sy1 + (sy2 - sy1) * (x - sx1) / (sx2 - sx1);
    let g = '';
    for (let x = k.px + 7, i = 0; x < sx2 - 2; x += k.step, i++) {
      g += `<line x1="${x}" y1="${neckY(x) + 3}" x2="${x}" y2="${sbY(x) - 3}" stroke="${t.fg}" stroke-width="${kind === 'triple' ? 1 : 1.3}" opacity="${kind === 'triple' && i % 3 ? .55 : .85}"/>`;
    }
    const neck = Array.from({ length: 25 }, (_, i) => { const x = k.px + (sx2 - k.px) * i / 24; return `${i ? 'L' : 'M'}${x.toFixed(1)} ${neckY(x).toFixed(1)}`; }).join(' ');
    g += `<path d="${neck}" fill="none" stroke="${t.fg}" stroke-width="6" stroke-linecap="round"/>`;
    g += `<path d="M${sx1} ${sy1} L${sx2} ${sy2}" stroke="${t.fg}" stroke-width="${kind === 'celtic' ? 10 : 9}" stroke-linecap="round"/>`;
    g += k.curved
      ? `<path d="M${k.px + 2} 88 Q${k.px - 16} ${(88 + k.top) / 2} ${k.px} ${k.top}" fill="none" stroke="${t.fg}" stroke-width="6" stroke-linecap="round"/>`
      : `<rect x="${k.px - 3}" y="${k.top}" width="6.5" height="${88 - k.top}" rx="2" fill="${t.fg}"/>`;
    if (k.crown) g += `<path d="M${k.px - 7} ${k.top - 2} L${k.px + 7} ${k.top - 2} L${k.px + 5} ${k.top - 10} L${k.px} ${k.top - 5} L${k.px - 5} ${k.top - 10} Z" fill="${t.fg}"/>`;
    if (k.curved) g += Array.from({ length: 6 }, (_, i) => { const x = k.px + 10 + i * 9; return `<circle cx="${x}" cy="${neckY(x) + 5}" r="1.8" fill="${t.fg}"/>`; }).join('');
    g += `<rect x="${k.px - 8}" y="86" width="${sx1 - k.px + 18}" height="${k.pedals ? 9 : 6}" rx="2" fill="${t.fg}"/>`;
    if (k.pedals) g += [0, 1, 2, 3].map(i => `<rect x="${k.px - 4 + i * 8}" y="95" width="5" height="3" fill="${t.fg}"/>`).join('');
    return g;
  },
  // Steelpans family.
  steelDrum: t => `
    <path d="M28 40 L28 64 Q28 80 72 80 Q116 80 116 64 L116 40" fill="${t.fg}" opacity=".55"/>
    <ellipse cx="72" cy="40" rx="44" ry="18" fill="${t.fg}"/>
    <ellipse cx="72" cy="40" rx="38" ry="14" fill="none" stroke="${t.detail}" stroke-width="1.5" opacity=".5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * Math.PI * 2; return `<ellipse cx="${(72 + Math.cos(a) * 27).toFixed(1)}" cy="${(40 + Math.sin(a) * 9.5).toFixed(1)}" rx="7" ry="3.4" fill="none" stroke="${t.detail}" stroke-width="1.6"/>`; }).join('')}
    <ellipse cx="72" cy="40" rx="8" ry="3.5" fill="none" stroke="${t.detail}" stroke-width="1.6"/>
    <path d="M44 96 L62 50 M100 96 L82 50" stroke="${t.fg}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="62" cy="50" r="4.5" fill="${t.fg}" stroke="${t.detail}" stroke-width="1.5"/><circle cx="82" cy="50" r="4.5" fill="${t.fg}" stroke="${t.detail}" stroke-width="1.5"/>`,
  spacedrum: t => `
    <circle cx="72" cy="54" r="40" fill="${t.fg}"/>
    <circle cx="72" cy="54" r="13" fill="none" stroke="${t.detail}" stroke-width="2.5"/>
    <circle cx="72" cy="54" r="6" fill="${t.detail}" opacity=".35"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * 360; return `<ellipse cx="72" cy="27" rx="5.5" ry="7.5" fill="none" stroke="${t.detail}" stroke-width="2" transform="rotate(${a} 72 54)"/>`; }).join('')}`,
  handpan: t => `
    <path d="M18 58 Q72 24 126 58 Q72 92 18 58 Z" fill="${t.fg}"/>
    <path d="M58 40 Q72 26 86 40" fill="${t.fg}"/>
    <path d="M22 58 L122 58" stroke="${t.detail}" stroke-width="2" opacity=".5"/>
    <ellipse cx="44" cy="50" rx="6" ry="2.6" fill="none" stroke="${t.detail}" stroke-width="1.6"/>
    <ellipse cx="100" cy="50" rx="6" ry="2.6" fill="none" stroke="${t.detail}" stroke-width="1.6"/>
    <ellipse cx="72" cy="44" rx="9" ry="3" fill="none" stroke="${t.detail}" stroke-width="1.6"/>`,
  tankDrum: t => `
    <circle cx="72" cy="54" r="40" fill="${t.fg}"/>
    <circle cx="72" cy="54" r="34" fill="none" stroke="${t.detail}" stroke-width="1.2" opacity=".4"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * 360 + 22.5; return `<path d="M66 54 L66 ${32 - (i % 2) * 4} Q66 ${26 - (i % 2) * 4} 72 ${26 - (i % 2) * 4} Q78 ${26 - (i % 2) * 4} 78 ${32 - (i % 2) * 4} L78 44" fill="none" stroke="${t.detail}" stroke-width="2" stroke-linecap="round" transform="rotate(${a} 72 54)"/>`; }).join('')}
    <circle cx="72" cy="54" r="5" fill="${t.detail}"/>`,
  guitar12: t => `
    <g transform="rotate(28 72 54)">
      <rect x="66" y="2" width="12" height="40" rx="1.5" fill="${t.fg}"/>
      <rect x="63" y="-12" width="18" height="20" rx="2.5" fill="${t.fg}"/>
      ${[-9, -5, -1, 3].map(y => `<circle cx="66.5" cy="${y}" r="1.3" fill="${t.detail}"/><circle cx="77.5" cy="${y}" r="1.3" fill="${t.detail}"/><circle cx="60.5" cy="${y + 1}" r="1.8" fill="${t.fg}"/><circle cx="83.5" cy="${y + 1}" r="1.8" fill="${t.fg}"/>`).join('')}
      <ellipse cx="72" cy="50" rx="18" ry="16" fill="${t.fg}"/>
      <ellipse cx="72" cy="78" rx="24" ry="21" fill="${t.fg}"/>
      <rect x="61" y="56" width="22" height="10" fill="${t.fg}"/>
      <circle cx="72" cy="58" r="7.5" fill="${t.detail}"/>
      <rect x="61" y="82" width="22" height="5" rx="1.5" fill="${t.detail}"/>
      ${Array.from({ length: 12 }, (_, i) => 67.6 + i * 0.8).map(x => `<line x1="${x}" y1="-2" x2="${x}" y2="84" stroke="${t.detail}" stroke-width=".45" opacity=".6"/>`).join('')}
    </g>`,
  core: t => `
    <path d="M18 46 C24 26 32 26 38 46 S52 66 58 46" fill="none" stroke="${t.fg}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M64 46 L64 30 L76 30 L76 62 L88 62 L88 46" fill="none" stroke="${t.fg}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M94 46 L102 30 L118 62 L126 46" fill="none" stroke="${t.fg}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  brass: t => `
    ${Array.from({ length: 9 }, (_, i) => { const h = 16 + 34 * (1 - Math.abs(i - 4) / 4); const x = 30 + i * 9.6; return `<rect x="${x}" y="${72 - h}" width="7.2" height="${h}" rx="2" fill="${t.fg}"/><path d="M${x + 1.5} ${72 - h * 0.28} L${x + 5.7} ${72 - h * 0.28}" stroke="${t.detail}" stroke-width="2"/>`; }).join('')}
    <rect x="26" y="72" width="92" height="5" rx="1.5" fill="${t.fg}"/>
    ${keys(t, 30, 82, 84, 12, 11)}`,
  // Function-set additions.
  midiPanic: t => `
    <circle cx="66" cy="56" r="32" fill="none" stroke="${t.fg}" stroke-width="6"/>
    ${[180, 225, 270, 315, 0].map(a => { const r = a * Math.PI / 180; return `<circle cx="${(66 + Math.cos(r) * 18).toFixed(1)}" cy="${(56 + Math.sin(r) * 18).toFixed(1)}" r="4" fill="${t.fg}"/>`; }).join('')}
    <rect x="61" y="80" width="10" height="8" fill="${t.fg}"/>
    <circle cx="104" cy="24" r="15" fill="#ff3b30"/><rect x="101.5" y="13" width="5" height="14" rx="2" fill="#fff"/><circle cx="104" cy="32" r="2.8" fill="#fff"/>`,
  undo: t => `<path d="M44 40 L86 40 Q108 40 108 62 Q108 84 86 84 L56 84" fill="none" stroke="${t.fg}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M58 24 L42 40 L58 56" fill="none" stroke="${t.fg}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  redo: t => `<path d="M100 40 L58 40 Q36 40 36 62 Q36 84 58 84 L88 84" fill="none" stroke="${t.fg}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M86 24 L102 40 L86 56" fill="none" stroke="${t.fg}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  freeze: t => `<g transform="translate(72 54)">${[0, 60, 120].map(a => `<g transform="rotate(${a})">
    <line x1="0" y1="-38" x2="0" y2="38" stroke="${t.fg}" stroke-width="6" stroke-linecap="round"/>
    <path d="M-10 -30 L0 -20 L10 -30 M-10 30 L0 20 L10 30" fill="none" stroke="${t.fg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`).join('')}</g>`,
  abSwitch: t => `<text x="34" y="68" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" fill="${t.fg}">A</text>
    <text x="110" y="68" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" fill="${t.fg}">B</text>
    <path d="M60 40 L84 40 M78 33 L85 40 L78 47 M84 62 L60 62 M66 55 L59 62 L66 69" fill="none" stroke="#ffd166" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  abCopy: t => `<text x="38" y="68" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" fill="${t.fg}">A</text>
    <rect x="86" y="30" width="38" height="44" rx="6" fill="none" stroke="${t.fg}" stroke-width="4" stroke-dasharray="6 4"/>
    <text x="105" y="66" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${t.fg}">B</text>
    <path d="M56 52 L80 52 M72 44 L80 52 L72 60" fill="none" stroke="#ffd166" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  muteHammer: t => `<g transform="translate(-12 8)"><line x1="34" y1="92" x2="76" y2="50" stroke="${t.fg}" stroke-width="6" stroke-linecap="round"/>
    <rect x="62" y="22" width="40" height="24" rx="10" fill="${t.fg}" transform="rotate(-45 82 34)"/></g>${slashMark()}`,
  muteDamper: t => `<rect x="60" y="22" width="24" height="18" rx="2" fill="${t.fg}" opacity=".7"/>
    <rect x="52" y="40" width="40" height="24" rx="4" fill="${t.fg}"/>
    <path d="M22 70 L122 70 M22 78 L122 78" stroke="${t.fg}" stroke-width="3" stroke-linecap="round"/>${slashMark()}`,
  muteRelease: t => `<rect x="24" y="66" width="84" height="16" rx="3" fill="${t.fg}"/>
    <path d="M48 58 L48 24 M36 36 L48 24 L60 36" fill="none" stroke="${t.fg}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>${slashMark()}`,
  mutePedal: t => `${pedal(t, 62, 64)}${slashMark()}`,
  reverb: t => `<circle cx="34" cy="56" r="8" fill="${t.fg}"/>
    ${[18, 32, 46, 60].map((r, i) => `<path d="M${(34 + r * Math.cos(-0.9)).toFixed(1)} ${(56 + r * Math.sin(-0.9)).toFixed(1)} A${r} ${r} 0 0 1 ${(34 + r * Math.cos(0.9)).toFixed(1)} ${(56 + r * Math.sin(0.9)).toFixed(1)}" fill="none" stroke="${t.fg}" stroke-width="${6 - i}" stroke-linecap="round" opacity="${1 - i * 0.2}"/>`).join('')}`,
  metronome: t => `<path d="M44 94 L58 16 L86 16 L100 94 Z" fill="${t.fg}"/>
    ${[30, 40, 50, 60].map(y => `<line x1="68" y1="${y}" x2="76" y2="${y}" stroke="${t.detail}" stroke-width="2" opacity=".5"/>`).join('')}
    <line x1="72" y1="82" x2="94" y2="22" stroke="${t.detail}" stroke-width="4" stroke-linecap="round"/>
    <rect x="80" y="40" width="12" height="9" rx="2" fill="${t.detail}" transform="rotate(20 86 44)"/>
    <rect x="50" y="76" width="44" height="6" fill="${t.detail}" opacity=".4"/>`,
  hold: t => `${pedal(t, 56, 64)}
    <path d="M92 38 L92 30 Q92 20 102 20 Q112 20 112 30 L112 38" fill="none" stroke="${t.fg}" stroke-width="4.5"/>
    <rect x="86" y="38" width="32" height="24" rx="4" fill="${t.fg}"/><circle cx="102" cy="49" r="3.5" fill="${t.detail}"/>`,
  // Two champagne flutes touching at the rims, with bubbles.
  champagne: t => {
    const flute = rot => `<g transform="rotate(${rot} 72 96)">
      <path d="M62 14 L82 14 L79 48 Q77 58 72 60 Q67 58 65 48 Z" fill="${t.fg}"/>
      <path d="M64.5 26 L79.5 26" stroke="${t.detail}" stroke-width="1.5" opacity=".45"/>
      <rect x="70.5" y="59" width="3" height="27" fill="${t.fg}"/>
      <ellipse cx="72" cy="88" rx="11" ry="3.5" fill="${t.fg}"/></g>`;
    return `<g transform="translate(-29 0)">${flute(12)}</g><g transform="translate(29 0)">${flute(-12)}</g>
      ${[[72, 6, 2.6], [66, 0, 1.8], [78, 1, 2], [56, 32, 1.6], [61, 40, 1.4], [86, 30, 1.6], [83, 40, 1.4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${t.fg}" opacity=".85"/>`).join('')}`;
  },
  // navigation
  arrowL: t => `<path d="M80 26 L50 54 L80 82" fill="none" stroke="${t.fg}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,
  arrowR: t => `<path d="M64 26 L94 54 L64 82" fill="none" stroke="${t.fg}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,
  presetL: t => `<path d="M62 30 L40 54 L62 78 M92 30 L70 54 L92 78" fill="none" stroke="#ffd166" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  presetR: t => `<path d="M52 30 L74 54 L52 78 M82 30 L104 54 L82 78" fill="none" stroke="#ffd166" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  // recorder
  recPrev: t => `<rect x="34" y="32" width="9" height="44" rx="2" fill="${t.fg}"/><path d="M76 32 L46 54 L76 76 Z M108 32 L78 54 L108 76 Z" fill="${t.fg}" stroke="${t.fg}" stroke-width="3" stroke-linejoin="round"/>`,
  recNext: t => `<rect x="101" y="32" width="9" height="44" rx="2" fill="${t.fg}"/><path d="M36 32 L66 54 L36 76 Z M68 32 L98 54 L68 76 Z" fill="${t.fg}" stroke="${t.fg}" stroke-width="3" stroke-linejoin="round"/>`,
  recStop: t => `<rect x="48" y="30" width="48" height="48" rx="6" fill="${t.fg}"/>`,
  recRecord: t => `<circle cx="72" cy="54" r="27" fill="#ff3b30"/><circle cx="72" cy="54" r="33" fill="none" stroke="#ff3b30" stroke-width="2.5" opacity=".45"/>`,
  recRepeat: t => `
    <path d="M42 62 L42 50 Q42 36 56 36 L96 36" fill="none" stroke="#ffb340" stroke-width="7" stroke-linecap="round"/>
    <path d="M90 26 L102 36 L90 46" fill="none" stroke="#ffb340" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M102 46 L102 58 Q102 72 88 72 L48 72" fill="none" stroke="#ffb340" stroke-width="7" stroke-linecap="round"/>
    <path d="M54 62 L42 72 L54 82" fill="none" stroke="#ffb340" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
  recPlay: t => `<path d="M54 28 L98 54 L54 80 Z" fill="#34c759" stroke="#34c759" stroke-width="6" stroke-linejoin="round"/>`,
};

module.exports = { GLYPHS, keys };
