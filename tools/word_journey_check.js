#!/usr/bin/env node
/**
 * word_journey_check.js — the "word journey" arrows must stand on the map's own
 * data and on a source.
 *
 * A route word (coffee, tea, …) may carry `journey: { <route>: { steps, sources } }`.
 * word_journey.js plays it as arrows on the flat map: step 1's arrows, then
 * step 2's, and so on. Each arrow is a claim — "language B took the word from
 * language A" — so it is held to the same rule as a cell: never invented.
 *
 *   steps    [[["from","to"], …], …]  one array of [from, to] pairs per step
 *   sources  [{ title, url }, …]       where the arrows come from
 *
 * Checked here:
 *   1. every code is a language row with coordinates;
 *   2. every code has a non-blank cell for this word (the label shows that
 *      cell's form — the journey never prints a form the map does not hold);
 *   3. every `to` is on the journey's route (family or family2): an arrow
 *      into a language the map colours as another route contradicts the map;
 *   4. an arrow starts from a language already reached — an origin of step 1,
 *      or the `to` of an earlier step — so the animation never jumps;
 *   5. no language is reached twice (one donor per language: where sources
 *      disagree on the donor, the language is left out, not given two);
 *   6. at least one source, each with a title and an https URL;
 *   7. the route key exists in the word's `routes`.
 *
 * Usage:
 *   node tools/word_journey_check.js           # report
 *   node tools/word_journey_check.js --check   # print "violations: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8') + '\nthis.LANG_DATA = LANG_DATA;', ctx, { filename: 'wordmap_data.js' });
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f });
const W = ctx.WORDS, LD = ctx.LANG_DATA;

const blank = (e) => {
  const s = Array.isArray(e) ? e[0] : (e && e.form);
  return !s || /^[\s—–-]*$/.test(String(s));
};
const routesOf = (w, c) => [w.family && w.family[c], w.family2 && w.family2[c]].filter(Boolean);

const bad = [];
let journeys = 0, arrows = 0;
for (const [id, w] of Object.entries(W)) {
  if (!w || !w.journey) continue;
  for (const [route, j] of Object.entries(w.journey)) {
    journeys++;
    const at = `${id}.journey.${route}`;
    if (!w.routes || !w.routes[route]) bad.push(`${at}: route "${route}" is not in routes`);
    if (!Array.isArray(j.steps) || !j.steps.length) { bad.push(`${at}: no steps`); continue; }
    const reached = new Set(), seenTo = new Set();
    j.steps.forEach((step, si) => {
      if (!Array.isArray(step) || !step.length) { bad.push(`${at} step ${si + 1}: empty`); return; }
      const newly = [];
      for (const pair of step) {
        arrows++;
        if (!Array.isArray(pair) || pair.length !== 2) { bad.push(`${at} step ${si + 1}: not a [from, to] pair`); continue; }
        const [a, b] = pair;
        for (const c of [a, b]) {
          if (!LD[c] || typeof LD[c].lat !== 'number') bad.push(`${at}: ${c} is not a mapped language`);
          else if (!w.data || blank(w.data[c])) bad.push(`${at}: ${c} has no ${id} cell`);
        }
        if (!routesOf(w, b).includes(route)) bad.push(`${at}: ${b} is routed ${JSON.stringify(routesOf(w, b))}, not ${route}`);
        if (si === 0) reached.add(a);
        else if (!reached.has(a)) bad.push(`${at} step ${si + 1}: ${a}→${b} starts from a language not reached yet`);
        if (seenTo.has(b) || (si > 0 && reached.has(b) && !seenTo.has(b))) bad.push(`${at}: ${b} is reached twice`);
        seenTo.add(b); newly.push(b);
      }
      newly.forEach((c) => reached.add(c));
    });
    const src = Array.isArray(j.sources) ? j.sources : [];
    if (!src.length) bad.push(`${at}: no sources`);
    src.forEach((s, i) => {
      if (!s || !s.title || !/^https:\/\//.test(s.url || '')) bad.push(`${at}: source ${i + 1} needs a title and an https url`);
    });
  }
}

if (CHECK) {
  if (bad.length) bad.forEach((b) => console.log('  ' + b));
  console.log(`journeys: ${journeys}, arrows: ${arrows}`);
  console.log(`violations: ${bad.length}`);
} else {
  console.log(`${journeys} journeys, ${arrows} arrows`);
  bad.forEach((b) => console.log('  ' + b));
  console.log(bad.length ? `${bad.length} problems` : 'all journeys stand on the map and a source');
  process.exitCode = bad.length ? 1 : 0;
}
