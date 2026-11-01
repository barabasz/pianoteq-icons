// SVG composition: single-instrument / function keys and diagonal layer keys.
const { theme, invertTheme } = require('./themes');
const { GLYPHS } = require('./glyphs');

const header = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" width="144" height="144">';
const gradient = (id, t) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">` +
  `<stop offset="0" stop-color="${t.bg[0]}"/><stop offset="1" stop-color="${t.bg[1]}"/></linearGradient>`;

// Badge text may carry a position prefix: 'tl:' top-left, 'br:' bottom-right (above the title area); default top-right.
function badgeSvg(t, badge) {
  const [pos, txt] = badge.includes(':') ? badge.split(':') : ['tr', badge];
  const w = txt.length * 15 + 10;
  const x = pos === 'tl' ? 24 : 120 - w, y = pos === 'br' ? 74 : 0;
  return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="5" fill="${t.fg}"/>
    <text x="${x + w / 2}" y="${y + 23}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${t.detail}">${txt}</text>`;
}

const drawGlyph = (glyph, t) => { const [g, arg] = glyph.split(':'); return GLYPHS[g](t, arg); };

// Key with one glyph. on = inverted active state. No embedded title: Stream Deck overlays it at the bottom.
function keySvg(key, on = false, uid = '') {
  const t = on ? invertTheme(theme(key.theme)) : theme(key.theme);
  const id = `${key.id}${on ? '-on' : ''}${uid}`;
  return `${header}
  <defs>${gradient(`bg-${id}`, t)}</defs>
  <rect width="144" height="144" fill="url(#bg-${id})"/>
  <g transform="translate(0,10)">${drawGlyph(key.glyph, t)}${key.badge ? badgeSvg(t, key.badge) : ''}</g>
</svg>`;
}

// Syngular pad waves, used as the lower-right half of "+ Pad" layers.
const padWaves = t => [0, 1, 2].map(i => `<path d="M18 ${36 + i * 12} C40 ${18 + i * 12} 56 ${54 + i * 12} 72 ${36 + i * 12} ` +
  `S104 ${18 + i * 12} 126 ${36 + i * 12}" fill="none" stroke="${t.fg}" stroke-width="${7 - i * 1.5}" stroke-linecap="round" opacity="${1 - i * 0.3}"/>`).join('');

// Layer key: diagonal split bottom-left -> top-right. Upper-left = instrument a, lower-right = instrument b.
function layerSvg(layer, on = false, uid = '') {
  const id = `${layer.id}${on ? '-on' : ''}${uid}`;
  const prep = name => (on ? invertTheme(theme(name)) : theme(name));
  const ta = prep(layer.a.theme), tb = prep(layer.b.theme);
  const place = (cx, cy, sc) => `translate(${cx - 72 * sc} ${cy - 54 * sc}) scale(${sc})`;
  const draw = (glyph, t) => (glyph === 'padWaves' ? padWaves(t) : drawGlyph(glyph, t));
  const posB = layer.b.glyph === 'padWaves' ? place(104, 86, 0.56) : place(106, 90, 0.55);
  return `${header}
  <defs>${gradient(`la-${id}`, ta)}${gradient(`lb-${id}`, tb)}
    <clipPath id="ca-${id}"><polygon points="0,0 144,0 0,144"/></clipPath>
    <clipPath id="cb-${id}"><polygon points="144,0 144,144 0,144"/></clipPath></defs>
  <g clip-path="url(#ca-${id})"><rect width="144" height="144" fill="url(#la-${id})"/>
    <g transform="${place(40, 38, 0.62)}">${draw(layer.a.glyph, ta)}</g></g>
  <g clip-path="url(#cb-${id})"><rect width="144" height="144" fill="url(#lb-${id})"/>
    <g transform="${posB}">${draw(layer.b.glyph, tb)}</g></g>
  <line x1="0" y1="144" x2="144" y2="0" stroke="${on ? '#9a9a9a' : '#000000'}" stroke-width="3"/>
</svg>`;
}

module.exports = { keySvg, layerSvg };
