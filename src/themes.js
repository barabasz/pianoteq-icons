// Colour themes. bg = vertical gradient, fg = glyph, key/keyDark = mini keyboard, detail = cut-outs inside glyphs.
const THEMES = {
  piano:    { bg: ['#3a3a40', '#0d0d10'], fg: '#f3efe6', key: '#f3efe6', keyDark: '#111' },
  electric: { bg: ['#b3261e', '#4a0907'], fg: '#ffe8e3', key: '#fff4f1', keyDark: '#3a0705' },
  hohner:   { bg: ['#e3a312', '#7a4a00'], fg: '#ffffff', key: '#ffffff', keyDark: '#3d2600' },
  guitar:   { bg: ['#8a5530', '#2a1306'], fg: '#fff6e6', key: '#fff6e6', keyDark: '#2a1306' },
  vibesB:   { bg: ['#8d97a5', '#2b313a'], fg: '#ffffff', key: '#ffffff', keyDark: '#2b313a' },
  vibesM:   { bg: ['#8d97a5', '#2b313a'], fg: '#ffffff', key: '#ffffff', keyDark: '#2b313a' },
  xylo:     { bg: ['#b97a3a', '#4d2a0c'], fg: '#ffffff', key: '#ffffff', keyDark: '#4d2a0c' },
  steel:    { bg: ['#16b3a0', '#044a42'], fg: '#ffffff', key: '#ffffff', keyDark: '#044a42' },
  celeste:  { bg: ['#3b8fe0', '#0b2c66'], fg: '#ffffff', key: '#ffffff', keyDark: '#0b2c66' },
  synth:    { bg: ['#8a4bdb', '#2b0f55'], fg: '#f1e6ff', key: '#f1e6ff', keyDark: '#2b0f55' },
  nav:      { bg: ['#2f3a48', '#11161c'], fg: '#9fd3ff', key: '#9fd3ff', keyDark: '#11161c' },
  black:    { bg: ['#000000', '#000000'], fg: '#f2f2f2', key: '#f2f2f2', keyDark: '#000000' },
  rec:      { bg: ['#2a2a2a', '#0a0a0a'], fg: '#f2f2f2', key: '#f2f2f2', keyDark: '#0a0a0a' },
};

// Fill in the detail colour (defaults to keyDark).
const theme = name => ({ detail: THEMES[name].keyDark, ...THEMES[name] });

// Active (pressed) state: white background, glyph in the theme's dark colour.
const invertTheme = t => ({ ...t, bg: ['#ffffff', '#d6d6d6'], fg: t.bg[1], key: '#ffffff', keyDark: t.bg[1], detail: '#ffffff' });

module.exports = { THEMES, theme, invertTheme };
