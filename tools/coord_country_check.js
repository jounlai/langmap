#!/usr/bin/env node
/**
 * coord_country_check.js — a language's pin must stand in a country its own
 * meta.countries names.
 *
 * The marker is the most visible thing the atlas asserts and nothing checked
 * it. countries.geojson is already in the repo for the country tints, so the
 * test is a real point-in-polygon, not a bounding box.
 *
 * Four rows were placed in a country their metadata did not mention, and in
 * every case the record contradicted ITSELF — meta.description named the
 * country that meta.countries left out (review 466):
 *
 *   ker  pin in Cameroon,   said Chad     — desc: "Chad and northern Cameroon"
 *   mev  pin in Guinea,     said Liberia  — desc: "Liberia, Guinea, and Côte d'Ivoire converge"
 *   tkr  pin in Azerbaijan, said Russia   — desc: "southern Daghestan and adjacent NE Azerbaijan"
 *   ahk  pin in Myanmar,    said China    — desc: "Yunnan (China), Myanmar's Shan State, …"
 *
 * Two whole classes are skipped rather than whitelisted row by row, so the
 * exemption cannot rot as languages are added:
 *
 *   HISTORICAL   meta.period exists. Latin sits in Italy and says "Roman
 *                Empire"; Gothic sits in Crimea and says "Gothic kingdoms".
 *                A dead language's territory is not a modern country.
 *   SUPRANATIONAL  countries reads as a scope rather than a list — worldwide,
 *                international, empire, ancient, hypothetical, diaspora,
 *                across, Europe-wide, "22 Arab League states". Esperanto and
 *                Proto-Uralic have no country to be wrong about.
 *
 * A point that falls in NO polygon is not judged either: countries.geojson is
 * simplified, so coastal capitals (Reykjavík, Colombo, Nuuk, San Juan) land
 * just offshore. 61 of 1,164 rows are offshore that way.
 *
 * Usage: node tools/coord_country_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8').replace(/^const /gm, 'var '), ctx);
const LANG_DATA = vm.runInContext('LANG_DATA', ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8').replace(/^const /gm, 'var '), ctx);

const gj = JSON.parse(fs.readFileSync(path.join(ROOT, 'countries.geojson'), 'utf8'));
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
const feats = gj.features.map((f) => ({
  name: f.properties.name,
  rings: f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates,
}));

function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const containing = (lng, lat) => feats.filter((f) => f.rings.some((poly) => {
  if (!inRing(lng, lat, poly[0])) return false;
  for (let h = 1; h < poly.length; h++) if (inRing(lng, lat, poly[h])) return false;
  return true;
})).map((f) => f.name);

// Natural Earth's names against the atlas's. Overseas territories resolve to
// their sovereign, which is why France covers French Guiana.
const ALIAS = {
  unitedstatesofamerica: ['us', 'usa', 'unitedstates'],
  unitedkingdom: ['uk', 'britain', 'england', 'scotland', 'wales', 'northernireland'],
  republicofserbia: ['serbia'], macedonia: ['northmacedonia'], czechrepublic: ['czechia'],
  swaziland: ['eswatini'], myanmar: ['burma'], easttimor: ['timorleste'],
  ivorycoast: ['cotedivoire'], caboverde: ['capeverde'], turkey: ['turkiye'],
  democraticrepublicofthecongo: ['drcongo', 'congokinshasa'], republicofcongo: ['congobrazzaville'],
  unitedrepublicoftanzania: ['tanzania'], thebahamas: ['bahamas'], vatican: ['vaticancity'],
  hongkongsar: ['hongkong'], macaosar: ['macau', 'macao'],
  france: ['frenchguiana', 'frenchpolynesia', 'reunion', 'martinique', 'guadeloupe', 'mayotte', 'newcaledonia', 'wallisfutuna'],
  denmark: ['faroeislands', 'greenland'], netherlands: ['friesland'],
};
const declaredHas = (declared, countryName) => {
  const d = norm(declared), n = norm(countryName);
  const strip = (x) => x.replace(/^(the|republicof|unitedrepublicof|kingdomof|stateof|federal)/, '');
  if (d.includes(n) || n.includes(d)) return true;
  if (strip(d).includes(strip(n)) || strip(n).includes(strip(d))) return true;
  for (const part of String(declared).split(/[,;()/]|\band\b/)) {
    const q = norm(part);
    if (q && (q.includes(n) || n.includes(q) || strip(n).includes(strip(q)))) return true;
  }
  return (ALIAS[n] || []).some((alt) => d.includes(alt));
};
const SUPRANATIONAL = /worldwide|international|empire|ancient|historical|hypothetical|diaspora|across|wide|global|sphere|civilization|kingdom|dynasty|khanate|caliphate|league|region of|steppe|basin|peninsula|archipelago|colonial|fandom|online|readership|francophone|countries$/i;

// Territories whose boundary countries.geojson draws differently from the way
// meta.countries describes them. The metadata is the atlas's own statement and
// is NOT adjusted to the basemap: the pin and the description agree with each
// other, and only the polygon underneath disagrees. Listed explicitly so the
// exemption is visible rather than silently swallowed by a regex.
const BASEMAP_BOUNDARY = new Map([
  ['ab', 'meta.countries names Abkhazia; the basemap has no such feature and draws the area as Georgia'],
  ['crh', 'meta.countries names Ukraine (Crimea); the basemap assigns the peninsula elsewhere'],
]);

let judged = 0, agree = 0, offshore = 0, skipped = 0;
const boundarySeen = new Set();
const violations = [];
for (const code of Object.keys(LANG_DATA)) {
  const L = LANG_DATA[code];
  const meta = L.meta || {};
  if (!meta.countries || typeof L.lat !== 'number' || typeof L.lng !== 'number') continue;
  if (meta.period || SUPRANATIONAL.test(String(meta.countries))) { skipped++; continue; }
  const inside = containing(L.lng, L.lat);
  if (!inside.length) { offshore++; continue; }
  judged++;
  if (inside.some((n) => declaredHas(meta.countries, n))) { agree++; continue; }
  if (BASEMAP_BOUNDARY.has(code)) { boundarySeen.add(code); continue; }
  violations.push({ code, name: L.name, pt: L.lat + ',' + L.lng, inside: inside.join('/'), declared: String(meta.countries) });
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations)
    console.log(`  ${v.code} ${v.name} at ${v.pt} stands in ${v.inside} — meta.countries says "${v.declared.slice(0, 60)}"`);
  if (boundarySeen.size) console.log(`  boundary: ${boundarySeen.size} row(s) where the basemap draws the territory differently (${[...boundarySeen].sort().join(' ')})`);
  for (const k of [...BASEMAP_BOUNDARY.keys()].filter((k) => !boundarySeen.has(k)))
    console.log(`  note: BASEMAP_BOUNDARY entry '${k}' no longer differs — drop it from the list`);
  if (!violations.length) console.log(`  ${agree}/${judged} pins inside a declared country; ${skipped} historical/supranational, ${offshore} offshore`);
  process.exit(0);
}
console.log('coordinate vs declared country — point-in-polygon against countries.geojson\n');
console.log(`  judged      ${judged}\n  agree       ${agree}\n  skipped     ${skipped} (historical or supranational scope)\n  offshore    ${offshore} (simplified coastline)\n`);
if (!violations.length) console.log('clean — every judged pin stands in a country its metadata names.');
for (const v of violations)
  console.log(`  ${v.code.padEnd(11)} ${String(v.name).slice(0, 24).padEnd(25)} ${v.pt.padEnd(17)} in ${v.inside.padEnd(26)} declared: ${v.declared.slice(0, 50)}`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
