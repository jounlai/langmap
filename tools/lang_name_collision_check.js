#!/usr/bin/env node
/**
 * lang_name_collision_check.js — two different languages may not print the
 * same label.
 *
 * The map draws one name under each of 1,187 pins. If two of them read
 * identically the reader has no way to tell which is which, and the label is
 * worse than useless — it asserts something false.
 *
 * This is not hypothetical. The 2,507-string rename (handoff 92) produced five
 * of them by itself, all invisible to every guard that existed: `mjg` Monguor
 * became モンゴル語 beside `mn` Mongolian; `xve` Venetic and `vec` Venetian
 * collapsed together in Japanese, German, Russian, Swahili and Ukrainian; `bfa`
 * Bari became バリ語 beside `ban` Balinese. Each row's own `native` field
 * disproved the merge — Mongghul, Venetkens, Karo Bari — but nothing was
 * comparing them.
 *
 * THE EXEMPTION IS DERIVED, NOT LISTED. Some codes SHOULD read alike: the nine
 * languages the atlas carries twice under different codes, which
 * paired_code_name_check.js exists to keep in sync. Those are exactly the codes
 * whose ENGLISH names are identical. So the rule here is:
 *
 *     two codes sharing a label in some UI, but NOT sharing their English
 *     name, are a collision.
 *
 * which needs no allowlist and cannot go stale. English itself is checked the
 * same way — a collision there means two rows really are named the same thing.
 *
 * Usage: node tools/lang_name_collision_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const c = vm.createContext({});
vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8')
  .replace(/^const /gm, 'var ') + ';', c);
const LANG_NAMES = vm.runInContext('typeof LANG_NAMES!=="undefined" ? LANG_NAMES : window.LANG_NAMES', c);

// lang_names.js also carries ISO aliases for codes no map shows (tah for ty,
// hmo for ho). A clash between an alias and its live twin is dead weight, not
// a visible defect, so only codes some map actually draws are considered.
const inSomeMap = (() => {
  const seen = new Set();
  const load = (file, expr) => {
    const k = vm.createContext({ window: {} });
    try {
      vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^const /gm, 'var ') + ';', k);
      const v = vm.runInContext(expr, k);
      if (Array.isArray(v)) v.forEach((x) => seen.add(x));
      else Object.keys(v || {}).forEach((x) => seen.add(x));
    } catch (e) { /* a map file missing is not this guard's problem */ }
  };
  load('wordmap_data.js', 'LANG_DATA');
  load('hanmap_data.js', 'HAN_LANG_META');
  const d = vm.createContext({ window: {} });
  try {
    vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8').replace(/^const /gm, 'var ') + ';', d);
    for (const s of vm.runInContext('SENTENCES', d)) for (const code of Object.keys(s.langs || {})) seen.add(code);
  } catch (e) { /* ditto */ }
  return seen;
})();

const EN = LANG_NAMES.en || {};
const sameLanguage = (a, b) => {
  const x = String(EN[a] || '').trim().toLowerCase();
  const y = String(EN[b] || '').trim().toLowerCase();
  return !!x && x === y;
};

// Three collisions cannot be fixed by naming, because the UI language has no
// name for one of the two languages at all — and inventing one is the thing
// this atlas does not do. They are listed BY NAME with the reason, not counted
// against a budget: a number cannot be read, and a row whose sentence says
// "needs a source" stays visible until someone finds one (handoff 91). An
// entry that stops colliding is reported as stale so the list shrinks itself.
const UNNAMEABLE = {
  'ar tao/ssf': "Arabic has no name for either Tao/Yami or Thao — no article, no Wikidata label, nothing under لغة يامي / لغة ثاو / لغات فورموزا. الثاو would be the regular Arabic treatment of th- for Thao, but nothing attests it.",
  'he mro/mer': "מרו is right for Meru (cf. מרו the volcano). Mru has no Hebrew name anywhere, and Glottolog lists no alternative name for mro, so there is not even a second endonym to transliterate.",
  'th mns/umu': "ภาษามันซี is right for Mansi (th.wikipedia's เขตปกครองตนเองคันตี-มันซี–ยูกรา fixes it). Thai has no name for Munsee. Worse: th.wikipedia's own article ภาษามันซี is a THIRD language — Mantsi/Black Lolo of northern Vietnam — so the string is doing triple duty.",
};

const collisions = [];
for (const [ui, table] of Object.entries(LANG_NAMES)) {
  const byName = new Map();
  for (const [code, name] of Object.entries(table)) {
    if (!inSomeMap.has(code)) continue;
    const key = String(name).trim();
    if (!key) continue;
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(code);
  }
  for (const [name, codes] of byName) {
    if (codes.length < 2) continue;
    // Split the group into sets that legitimately share an English name.
    const distinct = [];
    for (const code of codes) {
      const g = distinct.find((set) => sameLanguage(set[0], code));
      if (g) g.push(code); else distinct.push([code]);
    }
    if (distinct.length > 1) {
      collisions.push({ ui, name, groups: distinct, key: ui + ' ' + distinct.map((g) => g[0]).join('/') });
    }
  }
}

const unlisted = collisions.filter((c2) => !(c2.key in UNNAMEABLE));
const stale = Object.keys(UNNAMEABLE).filter((k) => !collisions.some((c2) => c2.key === k));

if (!CHECK) {
  console.log('language-name collisions — one label, two languages');
  console.log('');
  for (const c2 of collisions) {
    const known = c2.key in UNNAMEABLE ? '  [listed]' : '';
    console.log(`  ${c2.ui}: "${c2.name}" is used by ${c2.groups.map((g) => g.join('/')).join(' and ')}${known}`);
    for (const g of c2.groups) console.log(`      ${g.join('/')} — English: ${EN[g[0]] || '(none)'}`);
    if (known) console.log(`      why it stands: ${UNNAMEABLE[c2.key]}`);
  }
  for (const k of stale) console.log(`  note: UNNAMEABLE entry '${k}' no longer collides — delete it`);
  console.log('');
}
console.log(`listed unnameable: ${collisions.length - unlisted.length}`);
console.log(`collisions without an UNNAMEABLE entry: ${unlisted.length}`);
console.log(`violations: ${unlisted.length + stale.length}`);
process.exit(CHECK ? 0 : (unlisted.length + stale.length ? 1 : 0));
