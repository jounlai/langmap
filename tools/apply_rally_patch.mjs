#!/usr/bin/env node
/*
 * apply_rally_patch.mjs — write a review-rally patch into words/*.js.
 *
 * Rounds 1-5 rewrote this applier from scratch every time and each rewrite
 * reintroduced a bug someone had already fixed: a regex with no left boundary
 * so `ki` matched the tail of `ja_oki`, a backreference numbered off by one, a
 * `current` parser that split `kich / áám /kitʃ / æːm/` in the wrong place. It lives
 * here now so the next round inherits the fixes instead of the bugs.
 *
 * Two things it will not do.
 *
 * It will not write a cell whose recorded prior value has drifted. Every patch
 * entry carries what the auditor saw; if the data has moved since — because
 * another thread committed, or because an earlier pass in the same session
 * already fixed it — the entry is refused and named, never merged blind. Across
 * rounds 3 and 4 that gate refused 11 entries and every one was right to refuse.
 *
 * It will not write prose into an IPA field. On 2026-09-17 an auditor that had
 * found a real notation problem but could not decide the value wrote its
 * reasoning into the `ipa` slot — "hmam or m̥am — one notation, not three" —
 * and the applier of the day wrote it verbatim into words/blood.js. The same
 * three tests as tools/ipa_is_not_prose_check.js run here, before the write,
 * because a guard that catches it afterwards has already let it reach a commit.
 *
 * Patch format: JSON array of
 *   { concept, code, oldS, oldI, newS, newI }
 * `oldS`/`oldI` are the gate. Entries where new equals old are reported as
 * no-ops rather than written.
 *
 * Usage: node tools/apply_rally_patch.mjs <patch.json> [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WORDS_DIR = path.join(ROOT, 'words');
const [patchPath] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const DRY = process.argv.includes('--dry-run');
if (!patchPath) {
    console.error('usage: node tools/apply_rally_patch.mjs <patch.json> [--dry-run]');
    process.exit(2);
}

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(WORDS_DIR).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
const WORDS = ctx.WORDS;

/* Same three tests as ipa_is_not_prose_check.js, and for the same reason. */
const PROSE = /[,;—–]/;
function notIpa(v) {
    if (PROSE.test(v)) return 'sentence punctuation';
    if (/ or /.test(v)) return 'the word "or"';
    if ([...v].length > 50) return `${[...v].length} characters, cap 50`;
    return null;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
const byFile = {};
for (const x of patch) (byFile[x.concept] = byFile[x.concept] || []).push(x);

let written = 0;
const refused = [];
for (const [concept, entries] of Object.entries(byFile)) {
    const file = path.join(WORDS_DIR, concept + '.js');
    if (!fs.existsSync(file) || !WORDS[concept]) {
        for (const x of entries) refused.push(`${concept} ${x.code}: no such concept`);
        continue;
    }
    let src = fs.readFileSync(file, 'utf8');
    const before = src;
    for (const x of entries) {
        const e = WORDS[concept].data && WORDS[concept].data[x.code];
        if (!e) { refused.push(`${concept} ${x.code}: no such cell`); continue; }
        const liveS = Array.isArray(e) ? e[0] : e.form;
        const liveI = Array.isArray(e) ? e[1] : e.ipa;
        if (liveS !== x.oldS || liveI !== x.oldI) {
            refused.push(`${concept} ${x.code}: drifted — file has ["${liveS}","${liveI}"], patch expected ["${x.oldS}","${x.oldI}"]`);
            continue;
        }
        if (x.newS === x.oldS && x.newI === x.oldI) { refused.push(`${concept} ${x.code}: no-op`); continue; }
        const bad = notIpa(x.newI);
        if (bad) { refused.push(`${concept} ${x.code}: proposed IPA is ${bad} — /${x.newI}/`); continue; }
        if (!x.newS || !x.newS.trim()) { refused.push(`${concept} ${x.code}: empty surface`); continue; }
        // The key may be bare, "double" or 'single'-quoted; the left boundary
        // stops `ki` matching the tail of `ja_oki`.
        const re = new RegExp(
            '((?:"' + esc(x.code) + '"|\'' + esc(x.code) + '\'|(?<![A-Za-z0-9_])' + esc(x.code) + ')\\s*:\\s*\\[\\s*)'
            + '(["\'])' + esc(x.oldS) + '\\2(\\s*,\\s*)(["\'])' + esc(x.oldI) + '\\4');
        if (!re.test(src)) { refused.push(`${concept} ${x.code}: pattern miss (escaped quote in the source?)`); continue; }
        src = src.replace(re, (_m, pre, q1, sep, q2) => pre + q1 + x.newS + q1 + sep + q2 + x.newI + q2);
        written++;
    }
    if (src !== before && !DRY) fs.writeFileSync(file, src);
}

console.log(`${DRY ? 'would apply' : 'applied'}: ${written}   refused: ${refused.length}`);
for (const r of refused) console.log('  ! ' + r);
process.exit(0);
