#!/usr/bin/env node
/*
 * langmap_role_check.js — deterministic role-integrity guard for LangMap (data.js).
 *
 * Every word-order segment is [role, text]; role may be compound ("A|E"). Each
 * sub-role must be a key in that sentence's `segments` colour map — otherwise the
 * segment has no colour and renders black (the same class as the SEO compound-role
 * bug). Also flags empty role / empty text.
 *
 * Diagnostic only. Run: node tools/langmap_role_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = {}; vm.createContext(ctx);
vm.runInContext('var window=this;' + fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8') +
  "\nthis.S=(typeof SENTENCES!=='undefined')?SENTENCES:window.SENTENCES;", ctx);
const S = ctx.S;

const orphan = [], emptyRole = [], emptyText = [], unusedRole = [];
let segTot = 0;
for (const s of S) {
  const seg = s.segments || {};
  const used = new Set();
  for (const l of Object.keys(s.langs || {})) {
    for (const [role, text] of (s.langs[l] || [])) {
      segTot++;
      if (text == null || String(text).trim() === '') emptyText.push({ id: s.id, lang: l, role });
      if (role == null || role === '') { emptyRole.push({ id: s.id, lang: l, text }); continue; }
      for (const sub of String(role).split('|')) { used.add(sub); if (!(sub in seg)) orphan.push({ id: s.id, lang: l, role, sub, text }); }
    }
  }
  // roles defined in the colour map but never used by any language (dead entries)
  for (const r of Object.keys(seg)) if (!used.has(r)) unusedRole.push({ id: s.id, role: r });
}

const report = (name, list, fmt) => { console.log(`${name}: ${list.length}`); for (const x of list.slice(0, 40)) console.log('   ' + fmt(x)); if (list.length > 40) console.log(`   …(+${list.length - 40})`); console.log(''); };
console.log(`Scanned ${S.length} sentences, ${segTot} segments.\n`);
report('ORPHAN_ROLE (sub-role not in segments map → renders uncolored)', orphan, o => `sent ${o.id} ${o.lang}: role ${JSON.stringify(o.role)} sub ${JSON.stringify(o.sub)} missing  [${JSON.stringify(o.text)}]`);
report('EMPTY_ROLE', emptyRole, o => `sent ${o.id} ${o.lang}: text ${JSON.stringify(o.text)}`);
report('EMPTY_TEXT', emptyText, o => `sent ${o.id} ${o.lang}: role ${JSON.stringify(o.role)}`);
report('UNUSED_ROLE (defined colour never used — informational)', unusedRole, o => `sent ${o.id}: role ${JSON.stringify(o.role)}`);

fs.writeFileSync('/tmp/langmap_issues.json', JSON.stringify({ orphan, emptyRole, emptyText, unusedRole }, null, 1));
const actionable = orphan.length + emptyRole.length + emptyText.length;
console.log(`actionable: ${actionable}  (UNUSED_ROLE is informational)`);
