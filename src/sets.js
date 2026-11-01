// Icon sets. Rows mirror the preview canvases; null = empty slot.
// Each key: id (file name), theme, glyph ('name' or 'name:arg'), badge, title (sample Stream Deck title on previews).

const I = (id, theme, glyph, badge, title) => ({ id, theme, glyph, badge, title });

const INSTRUMENTS = [
  [I('grand-piano', 'piano', 'grand', null, 'Grand piano'),
    I('steinway-d-ny', 'piano', 'grand', 'NY', 'Steinway NY'), I('steinway-d-hh', 'piano', 'grand', 'HH', 'Steinway HH'),
    I('upright', 'piano', 'upright', null, 'Upright'), I('upright-u4', 'piano', 'upright', 'U4', 'Upright U4'),
    I('cp80', 'piano', 'cp80', 'CP', 'CP-80'),
    I('tines', 'electric', 'tines', null, 'Tines'),
    I('tines-mk1', 'electric', 'tines', 'MK1', 'Tines MK1'), I('tines-mk2', 'electric', 'tines', 'MK2', 'Tines MK2'),
    I('reeds', 'electric', 'reeds', null, 'Reeds')],
  [I('pianet-n', 'hohner', 'planet:N', null, 'Pianet N'), I('pianet-t', 'hohner', 'planet:T', null, 'Pianet T'),
    I('electra-piano', 'hohner', 'electra', null, 'Electra'), I('clavinet-d6', 'hohner', 'clavinet', 'D6', 'Clavinet'),
    I('syngular-keys', 'synth', 'synth', null, 'Keys'), I('syngular-pad', 'synth', 'pad', null, 'Pad'),
    I('syngular-bass', 'synth', 'bass', null, 'Bass'), I('syngular-lead', 'synth', 'lead', null, 'Lead'),
    I('syngular-core', 'synth', 'core', null, 'Core'), I('syngular-brass', 'synth', 'brass', null, 'Brass')],
  [I('guitar-classical', 'guitar', 'guitar', 'tl:CG', 'Classical'), I('guitar-12', 'guitar', 'guitar12', 'tl:12', '12-string'),
    I('guitar-jazz', 'guitar', 'jazzGuitar', 'tl:JG', 'Jazz guitar'),
    I('harp-concert', 'guitar', 'harp:concert', 'br:CON', 'Concert harp'), I('harp-celtic', 'guitar', 'harp:celtic', 'br:CEL', 'Celtic harp'),
    I('harp-triple', 'guitar', 'harp:triple', 'br:TRI', 'Triple harp'),
    I('vibes-vb', 'vibesB', 'vibes', 'VB', 'Vibes V-B'), I('vibes-vm', 'vibesM', 'vibes', 'VM', 'Vibes V-M'),
    I('xylophone', 'xylo', 'mallets:xylo', null, 'Xylophone'), I('bass-marimba', 'xylo', 'mallets:marimba', null, 'Bass marimba')],
  [I('celesta', 'celeste', 'celesta', null, 'Celesta'), I('toy-piano', 'celeste', 'toyPiano', null, 'Toy Piano'),
    I('glockenspiel', 'celeste', 'glockenspiel', null, 'Glockenspiel'), I('tubular-bells', 'celeste', 'tubularBells', null, 'Tubular'),
    I('church-bells', 'celeste', 'churchBells', null, 'Church bells'), I('kalimba', 'celeste', 'kalimba', null, 'Kalimba'),
    I('champagne-flutes', 'celeste', 'champagne', null, 'Champagne'), null, null, null],
  [I('steel-drum', 'steel', 'steelDrum', null, 'Steel Drum'), I('spacedrum', 'steel', 'spacedrum', null, 'Spacedrum'),
    I('hand-pan', 'steel', 'handpan', null, 'Hand Pan'), I('tank-drum', 'steel', 'tankDrum', null, 'Tank Drum'),
    null, null, null, null, null, null],
];

// Function keys. F = one-shot (single state), T = toggle (exported as -off / -on).
const F = (id, theme, glyph, title) => ({ id, theme, glyph, badge: null, title, toggle: false });
const T = (id, theme, glyph, title) => ({ ...F(id, theme, glyph, title), toggle: true });

const FUNCTIONS = [
  [F('page-instruments', 'black', 'gotoInstruments', 'Sounds'), F('page-functions', 'black', 'gotoFunctions', 'Control'),
    F('instrument-prev', 'nav', 'arrowL', 'Instr. ◀'), F('instrument-next', 'nav', 'arrowR', 'Instr. ▶'),
    F('preset-prev', 'nav', 'presetL', 'Preset ◀'), F('preset-next', 'nav', 'presetR', 'Preset ▶'),
    F('favourite-prev', 'nav', 'favL', 'Fav ◀'), F('favourite-next', 'nav', 'favR', 'Fav ▶'),
    F('ab-switch', 'nav', 'abSwitch', 'A/B'), F('ab-copy', 'nav', 'abCopy', 'A → B')],
  [F('transport-prev', 'rec', 'recPrev', 'Prev'), F('transport-next', 'rec', 'recNext', 'Next'), F('stop', 'rec', 'recStop', 'Stop'),
    T('play', 'rec', 'recPlay', 'Play'), T('record', 'rec', 'recRecord', 'Record'), T('repeat', 'rec', 'recRepeat', 'Repeat')],
  [T('mute-all', 'rec', 'mute', 'Mute all'), T('hold', 'rec', 'hold', 'Hold'), T('metronome', 'rec', 'metronome', 'Metronome'),
    F('midi-panic', 'rec', 'midiPanic', 'MIDI panic'), F('random', 'nav', 'dice', 'Random'),
    F('full-screen', 'rec', 'fullscreen', 'Full screen'), F('reverb', 'rec', 'reverb', 'Reverb')],
  [F('mute-hammer', 'rec', 'muteHammer', 'Hammer'), F('mute-damper', 'rec', 'muteDamper', 'Damper'),
    F('mute-release', 'rec', 'muteRelease', 'Release'), F('mute-pedal', 'rec', 'mutePedal', 'Pedal'),
    F('freeze', 'nav', 'freeze', 'Freeze'), F('undo', 'nav', 'undo', 'Undo'), F('redo', 'nav', 'redo', 'Redo'),
    T('mute-all-black', 'black', 'mute', 'Mute (black)')],
];

// Generic instruments usable in layers: [file name, theme, glyph, short title].
const GEN = {
  grand: ['grand-piano', 'piano', 'grand', 'Grand'], upright: ['upright', 'piano', 'upright', 'Upright'],
  cp80: ['cp80', 'piano', 'cp80', 'CP-80'], tines: ['tines', 'electric', 'tines', 'Tines'], reeds: ['reeds', 'electric', 'reeds', 'Reeds'],
  clavinet: ['clavinet', 'hohner', 'clavinet', 'Clavinet'], vibes: ['vibes', 'vibesB', 'vibes', 'Vibes'],
  xylo: ['xylophone', 'xylo', 'mallets:xylo', 'Xylo'], marimba: ['bass-marimba', 'xylo', 'mallets:marimba', 'Marimba'],
  guitar: ['classical-guitar', 'guitar', 'guitar', 'Guitar'], harp: ['harp', 'guitar', 'harp:concert', 'Harp'],
  celtic: ['celtic-harp', 'guitar', 'harp:celtic', 'Celtic'], celesta: ['celesta', 'celeste', 'celesta', 'Celesta'],
  toy: ['toy-piano', 'celeste', 'toyPiano', 'Toy'], glock: ['glockenspiel', 'celeste', 'glockenspiel', 'Glock'],
  tubular: ['tubular-bells', 'celeste', 'tubularBells', 'Tubular'], church: ['church-bells', 'celeste', 'churchBells', 'Bells'],
  kalimba: ['kalimba', 'celeste', 'kalimba', 'Kalimba'], handpan: ['hand-pan', 'steel', 'handpan', 'Hand Pan'],
  steeldrum: ['steel-drum', 'steel', 'steelDrum', 'Steel'], pad: ['pad', 'synth', 'padWaves', 'Pad'],
};
const part = k => ({ theme: GEN[k][1], glyph: GEN[k][2] });
const L = (a, b) => ({ id: `layer-${GEN[a][0]}-${GEN[b][0]}`, a: part(a), b: part(b), title: `${GEN[a][3]} + ${GEN[b][3]}` });

const LAYERS = [
  // + Syngular pad
  L('grand', 'pad'), L('upright', 'pad'), L('tines', 'pad'), L('reeds', 'pad'), L('vibes', 'pad'),
  L('harp', 'pad'), L('celtic', 'pad'), L('kalimba', 'pad'), L('handpan', 'pad'),
  // grand piano
  L('grand', 'cp80'), L('grand', 'tines'), L('grand', 'reeds'), L('grand', 'clavinet'), L('grand', 'vibes'),
  L('grand', 'harp'), L('grand', 'celesta'), L('grand', 'glock'), L('grand', 'tubular'), L('grand', 'church'),
  L('grand', 'kalimba'), L('grand', 'handpan'),
  // upright
  L('upright', 'tines'), L('upright', 'reeds'), L('upright', 'clavinet'), L('upright', 'vibes'), L('upright', 'toy'),
  // electric
  L('tines', 'reeds'), L('tines', 'clavinet'), L('reeds', 'clavinet'), L('tines', 'vibes'), L('tines', 'xylo'),
  L('reeds', 'xylo'), L('glock', 'tines'),
  // mallets, plucked, steel
  L('xylo', 'vibes'), L('vibes', 'steeldrum'), L('steeldrum', 'marimba'), L('harp', 'celesta'), L('kalimba', 'guitar'),
];

module.exports = { INSTRUMENTS, FUNCTIONS, LAYERS };
