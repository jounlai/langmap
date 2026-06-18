#!/usr/bin/env node
/*
 * variant_integrity_check.js — deterministic structural auditor for HanMap
 * 文白異讀 / variant entries (HAN_VARIANTS).
 *
 * Flags, per (char, variety):
 *   LONE_REDUNDANT  a lone labeled variant byte-identical to the MAIN reading and
 *               with no contrasting sibling (informational — the label restates
 *               main; a variant==main that DOES have a differing sibling is an
 *               intentional 文白 pair and is NOT reported)
 *   COLLISION   two variants byte-identical to each other (e.g. a 白/文 swap that
 *               collapsed them, or a duplicate entry)
 *   DUP_LABEL   the same non-empty label used by ≥2 variants in one cell
 *   EMPTY_PROMOTE  a lone empty-label variant where MAIN is absent → should be
 *               promoted into the main reading
 *   EMPTY_MERGE    a lone empty-label variant where MAIN is partial (e.g. surface
 *               but no ipa) and the variant supplies the missing field
 *   EMPTY_LABEL    an empty-label variant that coexists with a real main reading
 *               and differs from it → genuinely needs a label (manual)
 *
 * A KNOWN_PATTERNS allow-list carries the Sino-Xenic single-reading varieties
 * (generic `ja`) that intentionally store their lone on'yomi as an empty-label
 * variant, so the checker reports only the actionable structural defects.
 *
 * Diagnostic only. Run: node tools/variant_integrity_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.D=HAN_DATA;this.V=HAN_VARIANTS;this.L=HAN_LIST;', ctx);
const D = ctx.D, V = ctx.V;

// Varieties that legitimately keep their single reading in a lone empty-label
// variant (no main) — generic `ja` on'yomi. Not a defect.
const KNOWN_EMPTY_LONE = new Set(['ja']);

const out = [];
for (const c of Object.keys(V)) {
  for (const l of Object.keys(V[c])) {
    const arr = V[c][l] || [];
    if (!arr.length) continue;
    const ms = (D[c].surface || {})[l], mi = (D[c].ipa || {})[l];
    const sig = v => `${v.surface}${v.ipa}`;
    // variant == main: a defect only when LONE + labeled (the label merely restates
    // main). When a differing sibling exists it is an intentional 文白 pair → skip.
    const hasDiffSibling = arr.some(v => !(v.surface === ms && v.ipa === mi));
    for (const v of arr)
      if (v.surface === ms && v.ipa === mi && ms != null && !hasDiffSibling && (v.label || '') !== '')
        out.push({ kind: 'LONE_REDUNDANT', char: c, lang: l, label: v.label, detail: `lone [${v.label}] == main ${JSON.stringify(ms)}/${JSON.stringify(mi)} (label restates main)` });
    // COLLISION between variants
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++)
      if (sig(arr[i]) === sig(arr[j]))
        out.push({ kind: 'COLLISION', char: c, lang: l, detail: `[${arr[i].label}]==[${arr[j].label}] ${JSON.stringify(arr[i].surface)}/${JSON.stringify(arr[i].ipa)}` });
    // DUP_LABEL
    const lc = {}; for (const v of arr) { const k = v.label || ''; if (k) lc[k] = (lc[k] || 0) + 1; }
    for (const [k, n] of Object.entries(lc)) if (n > 1) out.push({ kind: 'DUP_LABEL', char: c, lang: l, label: k, detail: `${n}× label ${JSON.stringify(k)}` });
    // empty-label handling
    const empties = arr.filter(v => v.label === '' || v.label == null);
    for (const v of empties) {
      if (KNOWN_EMPTY_LONE.has(l) && arr.length === 1 && ms == null) continue; // ja on'yomi pattern
      if (v.surface === ms && v.ipa === mi) continue; // identical to main: handled by 文白-pair logic above
      if (ms == null && mi == null && arr.length === 1)
        out.push({ kind: 'EMPTY_PROMOTE', char: c, lang: l, detail: `main absent; promote lone variant ${JSON.stringify(v.surface)}/${JSON.stringify(v.ipa)}` });
      else if (ms != null && mi == null && v.surface === ms && v.ipa != null)
        out.push({ kind: 'EMPTY_MERGE', char: c, lang: l, detail: `main ${JSON.stringify(ms)} lacks ipa; variant supplies ${JSON.stringify(v.ipa)}` });
      else
        out.push({ kind: 'EMPTY_LABEL', char: c, lang: l, detail: `empty label coexists with main ${JSON.stringify(ms)}/${JSON.stringify(mi)}; variant ${JSON.stringify(v.surface)}/${JSON.stringify(v.ipa)} — needs a label` });
    }
  }
}

const byKind = {}; for (const o of out) (byKind[o.kind] = byKind[o.kind] || []).push(o);
console.log(`Variant structural issues: ${out.length}\n`);
for (const k of ['LONE_REDUNDANT', 'COLLISION', 'DUP_LABEL', 'EMPTY_PROMOTE', 'EMPTY_MERGE', 'EMPTY_LABEL']) {
  const list = byKind[k] || [];
  console.log(`${k}: ${list.length}`);
  for (const o of list) console.log(`   ${o.char} ${o.lang}  ${o.detail}`);
  console.log('');
}
fs.writeFileSync('/tmp/variant_issues.json', JSON.stringify(out, null, 1));
console.log('issues -> /tmp/variant_issues.json');
