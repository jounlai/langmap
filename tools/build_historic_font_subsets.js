#!/usr/bin/env node
/*
 * build_historic_font_subsets.js — self-host the historic-script fonts.
 *
 * font_coverage_check.js only verifies that a *name* like "Noto Sans Old
 * Turkic" appears in the four font chains. Those are SYSTEM fonts: desktop
 * Linux ships them, but iOS / Windows / most Android ship almost none, so the
 * astral historic scripts (Tangut 西夏, Old Turkic 突厥, Egyptian, Cuneiform,
 * Yi, Vai, Mongolian, …) rendered as tofu on phones. The Brahmic scripts were
 * already fixed this way (fonts/NotoSans{Javanese,Brahmi,…}-subset.woff2 under
 * the 'Brahmic Subset' family); this does the same for the remaining historic
 * blocks, cutting each Noto face to exactly the codepoints the word data uses
 * and serving them under one 'Historic Script Subset' family, unicode-range
 * scoped so each loads only when its script actually appears on the page.
 *
 * Source: notofonts.github.io (SIL OFL) via jsDelivr. Run from repo root:
 *   node tools/build_historic_font_subsets.js
 * Requires pyftsubset (fonttools) and network access. Writes fonts/*.woff2 and
 * prints the @font-face CSS block to paste into wordmap.html.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const FONTS = path.join(ROOT, 'fonts');
const TMP = process.env.FONTBUILD_TMP || '/tmp/fontbuild';
fs.mkdirSync(TMP, { recursive: true });

// script key -> { repo: notofonts folder, out: woff2 basename, range: CSS
// unicode-range (whole Unicode block(s)), lo/hi: numeric block bounds used to
// collect the codepoints actually present in the data }.
const SCRIPTS = [
  { key: 'Mandaic',        repo: 'NotoSansMandaic',              range: 'U+0840-085F', blocks: [[0x0840,0x085F]] },
  { key: 'Limbu',          repo: 'NotoSansLimbu',                range: 'U+1900-194F', blocks: [[0x1900,0x194F]] },
  { key: 'Mongolian',      repo: 'NotoSansMongolian',            range: 'U+1800-18AF', blocks: [[0x1800,0x18AF]] },
  { key: 'Coptic',         repo: 'NotoSansCoptic',               range: 'U+2C80-2CFF', blocks: [[0x2C80,0x2CFF]] },
  { key: 'Yi',             repo: 'NotoSansYi',                   range: 'U+A000-A4CF', blocks: [[0xA000,0xA4CF]] },
  { key: 'Vai',            repo: 'NotoSansVai',                  range: 'U+A500-A63F', blocks: [[0xA500,0xA63F]] },
  { key: 'LinearB',        repo: 'NotoSansLinearB',              range: 'U+10000-1013F', blocks: [[0x10000,0x1013F]] },
  { key: 'Gothic',         repo: 'NotoSansGothic',               range: 'U+10330-1034F', blocks: [[0x10330,0x1034F]] },
  { key: 'Ugaritic',       repo: 'NotoSansUgaritic',             range: 'U+10380-1039F', blocks: [[0x10380,0x1039F]] },
  { key: 'OldPersian',     repo: 'NotoSansOldPersian',           range: 'U+103A0-103DF', blocks: [[0x103A0,0x103DF]] },
  { key: 'ImperialAramaic',repo: 'NotoSansImperialAramaic',      range: 'U+10840-1085F', blocks: [[0x10840,0x1085F]] },
  { key: 'Phoenician',     repo: 'NotoSansPhoenician',           range: 'U+10900-1091F', blocks: [[0x10900,0x1091F]] },
  { key: 'Meroitic',       repo: 'NotoSansMeroitic',             range: 'U+10980-109FF', blocks: [[0x10980,0x109FF]] },
  { key: 'OldSouthArabian',repo: 'NotoSansOldSouthArabian',      range: 'U+10A60-10A7F', blocks: [[0x10A60,0x10A7F]] },
  { key: 'Avestan',        repo: 'NotoSansAvestan',              range: 'U+10B00-10B3F', blocks: [[0x10B00,0x10B3F]] },
  { key: 'InscPahlavi',    repo: 'NotoSansInscriptionalPahlavi', range: 'U+10B60-10B7F', blocks: [[0x10B60,0x10B7F]] },
  { key: 'OldTurkic',      repo: 'NotoSansOldTurkic',            range: 'U+10C00-10C4F', blocks: [[0x10C00,0x10C4F]] },
  { key: 'Cuneiform',      repo: 'NotoSansCuneiform',            range: 'U+12000-1247F', blocks: [[0x12000,0x1247F]] },
  { key: 'EgyptianHiero',  repo: 'NotoSansEgyptianHieroglyphs',  range: 'U+13000-1342F', blocks: [[0x13000,0x1342F]] },
  { key: 'AnatolianHiero', repo: 'NotoSansAnatolianHieroglyphs', range: 'U+14400-1467F', blocks: [[0x14400,0x1467F]] },
  { key: 'Tangut',         repo: 'NotoSerifTangut',              range: 'U+17000-18AFF', blocks: [[0x17000,0x18AFF]] },
];

// Collect the codepoints each script actually needs from the word data.
global.window = {}; global.WORDS = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))) {
  eval(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
}
const need = new Map(SCRIPTS.map(s => [s.key, new Set()]));
for (const w of Object.keys(WORDS)) {
  const data = WORDS[w].data || {};
  for (const code of Object.keys(data)) {
    const cell = data[code];
    const surf = Array.isArray(cell) ? cell[0] : (cell && cell.form);
    if (!surf) continue;
    for (const ch of surf) {
      const cp = ch.codePointAt(0);
      for (const s of SCRIPTS) if (s.blocks.some(([lo, hi]) => cp >= lo && cp <= hi)) need.get(s.key).add(cp);
    }
  }
}

const jsd = repo => `https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io@main/fonts/${repo}/hinted/ttf/${repo}-Regular.ttf`;
const css = [];
const skipped = [];
for (const s of SCRIPTS) {
  const cps = [...need.get(s.key)].sort((a, b) => a - b);
  if (!cps.length) { skipped.push(`${s.key} (no codepoints in data)`); continue; }
  const ttf = path.join(TMP, `${s.repo}.ttf`);
  if (!fs.existsSync(ttf)) {
    execFileSync('curl', ['-sSL', '-f', '-o', ttf, jsd(s.repo)], { stdio: ['ignore', 'ignore', 'inherit'] });
  }
  const out = path.join(FONTS, `${s.repo}-subset.woff2`);
  const unicodes = cps.map(c => 'U+' + c.toString(16).toUpperCase()).join(',');
  execFileSync('pyftsubset', [ttf,
    `--unicodes=${unicodes}`,
    '--layout-features=*',   // keep GSUB/GPOS for shaping (Mongolian, Limbu…)
    '--flavor=woff2',
    `--output-file=${out}`], { stdio: ['ignore', 'ignore', 'inherit'] });
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.error(`  ${s.key.padEnd(18)} ${cps.length} glyphs -> ${path.basename(out)} (${kb} KB)`);
  css.push(
    `        @font-face {\n` +
    `            font-family: 'Historic Script Subset'; font-style: normal; font-weight: 400; font-display: swap;\n` +
    `            src: url('fonts/${s.repo}-subset.woff2') format('woff2');\n` +
    `            unicode-range: ${s.range};\n` +
    `        }`);
}
console.error('\nSkipped:', skipped.join(', ') || '(none)');
console.log(css.join('\n'));
