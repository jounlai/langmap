#!/usr/bin/env node
/**
 * hanmap_group_coverage_check.js — every Han Map row must sit in one filter
 * group (HAN_GROUPS in hanmap.html), and every group member must be a row.
 * za_sd was a row with no group from its creation until 2026-10-06, so the
 * filter could not show or hide it (owner report).
 *   node tools/hanmap_group_coverage_check.js [--check]
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'hanmap.html'), 'utf8');
const i = html.indexOf('const HAN_GROUPS'), j = html.indexOf('];', i);
const g = vm.createContext({}); vm.runInContext(html.slice(i, j + 2).replace('const HAN_GROUPS', 'this.G'), g);
const inG = new Map();
for (const grp of g.G) for (const k of ['modern', 'historical']) for (const c of (grp[k] || [])) inG.set(c, (inG.get(c) || 0) + 1);
const d = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8').replace(/^const /gm, 'var '), d);
const rows = d.HAN_LANGS.map(x => x.code || x);
const missing = rows.filter(c => !inG.has(c));
const stale = [...inG.keys()].filter(c => !rows.includes(c));
const dup = [...inG.entries()].filter(([, n]) => n > 1).map(([c]) => c);
for (const c of missing) console.log('  ✗ row not in any filter group:', c);
for (const c of stale) console.log('  ✗ group member is not a row:', c);
for (const c of dup) console.log('  ✗ row in more than one group:', c);
console.log(`violations: ${missing.length + stale.length + dup.length}`);
if (process.argv.includes('--check') && missing.length + stale.length + dup.length) process.exitCode = 0;
