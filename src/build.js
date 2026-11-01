#!/usr/bin/env node
// Build Pianoteq Stream Deck icons (PNG) and preview canvases from SVG sources.
// Usage: node src/build.js [icons|previews|all] [--size=96] [--out=.]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { THEMES } = require('./themes');
const { keySvg, layerSvg } = require('./svg');
const { INSTRUMENTS, FUNCTIONS, LAYERS } = require('./sets');

const args = process.argv.slice(2);
const opt = (name, def) => (args.find(a => a.startsWith(`--${name}=`)) || '').split('=')[1] || def;
const target = args.find(a => !a.startsWith('--')) || 'all';
const SIZE = Number(opt('size', 96));
const ROOT = path.resolve(opt('out', path.join(__dirname, '..')));

// Bundled Inter font (SIL OFL, src/fonts) embedded as data URIs, so no system font is needed.
const FONT_WEIGHTS = { SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
const FONT_CSS = Object.entries(FONT_WEIGHTS).map(([name, w]) => {
  const data = fs.readFileSync(path.join(__dirname, 'fonts', `Inter-${name}.otf`)).toString('base64');
  return `@font-face{font-family:'Inter';font-weight:${w};src:url(data:font/otf;base64,${data}) format('opentype')}`;
}).join('');

// Load a page with the bundled font once; later calls only swap the body.
async function setBody(page, body, bodyStyle = 'margin:0') {
  if (page.__fontPage !== bodyStyle) {
    await page.setContent(`<html><head><style>${FONT_CSS}</style></head><body style="${bodyStyle}"></body></html>`);
    page.__fontPage = bodyStyle;
  }
  await page.evaluate(html => { document.body.innerHTML = html; }, body);
  await page.evaluate(() => document.fonts.ready);
}

const resize = (svg, size) => svg.replace('width="144" height="144"', `width="${size}" height="${size}"`);

// Every PNG file to export: [set folder, file name, svg].
function exportList() {
  const files = [];
  for (const k of INSTRUMENTS.flat().filter(Boolean)) {
    files.push(['instruments', `${k.id}-off`, keySvg(k, false)], ['instruments', `${k.id}-on`, keySvg(k, true)]);
  }
  for (const k of FUNCTIONS.flat().filter(Boolean)) {
    if (k.toggle) files.push(['functions', `${k.id}-off`, keySvg(k, false)], ['functions', `${k.id}-on`, keySvg(k, true)]);
    else files.push(['functions', k.id, keySvg(k, false)]);
  }
  for (const l of LAYERS) files.push(['layers', l.id, layerSvg(l, false)]);
  return files;
}

async function buildIcons(page) {
  const sets = ['instruments', 'functions', 'layers'];
  for (const s of sets) {
    const dir = path.join(ROOT, 'icons', s);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.setViewportSize({ width: SIZE, height: SIZE });
  const files = exportList();
  for (const [set, name, svg] of files) {
    await setBody(page, resize(svg, SIZE));
    await page.screenshot({ path: path.join(ROOT, 'icons', set, `${name}.png`), clip: { x: 0, y: 0, width: SIZE, height: SIZE } });
  }
  for (const s of sets) console.log(`icons/${s}: ${files.filter(f => f[0] === s).length} files (${SIZE}px)`);
}

// Preview canvas: sections of key grids with sample titles as the Stream Deck overlays them.
async function canvas(page, file, cols, sections) {
  const K = 144, GAP = 18;
  const html = sections.map(([title, cells]) => `<h2>${title}</h2><div class="g">${cells.map(c => (c
    ? `<div class="k">${c.svg}<span style="color:${c.dark ? '#222' : '#fff'}">${c.title}</span></div>`
    : '<div class="k empty"></div>')).join('')}</div>`).join('');
  await page.setViewportSize({ width: 80 + cols * K + (cols - 1) * GAP, height: 100 });
  await setBody(page, `<style>h2{color:#ddd;font:600 24px Inter;margin:30px 0 14px}
    .g{display:grid;grid-template-columns:repeat(${cols},${K}px);gap:${GAP}px}
    .k{position:relative;width:${K}px;height:${K}px;border-radius:14px;overflow:hidden;background:#000}
    .k svg{display:block}.k span{position:absolute;left:0;right:0;bottom:9px;text-align:center;font:700 16px Inter;opacity:.9}
    .empty{background:#0a0a0a;box-shadow:inset 0 0 0 1px #262626}</style>${html}`,
    'margin:0;background:#0e0e0e;font-family:Inter;padding:10px 40px 40px');
  await page.screenshot({ path: path.join(ROOT, 'previews', file), fullPage: true });
  console.log(`previews/${file}`);
}

async function buildPreviews(page) {
  fs.mkdirSync(path.join(ROOT, 'previews'), { recursive: true });
  const cell = (k, on, uid) => k && { svg: keySvg(k, on, uid), title: k.title, dark: on };
  const instr = on => INSTRUMENTS.flat().map(k => cell(k, on, '-p'));
  await canvas(page, 'instruments.png', 10, [['Instruments: normal', instr(false)], ['Instruments: active (-on)', instr(true)]]);
  const fn = FUNCTIONS.flatMap(row => {
    const cells = row.flatMap(k => (k.toggle ? [cell(k, false, '-p'), { ...cell(k, true, '-p'), title: `${k.title} (on)` }] : [cell(k, false, '-p')]));
    return [...cells, ...Array((10 - cells.length % 10) % 10).fill(null)];
  });
  await canvas(page, 'functions.png', 10, [['Functions (toggles shown as -off / -on pairs)', fn]]);
  await canvas(page, 'layers.png', 10, [['Layers', LAYERS.map(l => ({ svg: layerSvg(l, false, '-p'), title: l.title }))]]);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  if (target === 'icons' || target === 'all') await buildIcons(page);
  if (target === 'previews' || target === 'all') await buildPreviews(page);
  await browser.close();
})();
