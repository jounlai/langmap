#!/usr/bin/env node
/**
 * validate_wordmap_data.js — static checker for the Word Map data layer.
 *
 * Run:
 *   node validate_wordmap_data.js
 * or: bun validate_wordmap_data.js
 *
 * Checks (per wordmap-check.md §2):
 *   1. WORD_LIST has 20 entries
 *   2. Every LANG_DATA[code].words contains every WORD_LIST id
 *   3. Each word entry is a 2-element [surface, ipa] array of strings
 *   4. surface or ipa equal to "—" → INFO if both (explicit unattested in
 *      historical lang); ERROR if modern lang or one-sided dash
 *   5. lat/lng are finite numbers in valid ranges
 *   6. Duplicate exact (lat,lng) pairs → info (often expected for parent/dialect)
 *   7. Every LANG_DATA code has a meta entry in wordmap_meta.js
 *   8. No code has duplicate meta assignments (silent overwrites)
 *   9. EXCLUDED_CODES ⊇ HIST_DESCENDANT keys (historical langs are excluded)
 *  10. Every meta.speakers is parseable into a tier (or known annotation)
 *  11. meta.family / meta.script top-level tokens are in an allow-list
 *  12. README/HTML lang count matches actual LANG_DATA count
 *  13. No code is defined twice in LANG_DATA source (silent JS overwrite — audit §6.28)
 *  14. 3+ codes sharing one (lat,lng) — flag as warning unless historical-progression cluster (audit §7.6)
 *  15. Same (name, lat, lng) under different codes — likely ISO code conflict (Session 8 mon/mnw)
 *  16. HIST_DESCENDANT codes must have DATA_STATUS_OVERRIDES entry (Session 27 invariant)
 *  17. DATA_STATUS_OVERRIDES (non-modern) → must be in HIST_DESCENDANT (Session 29 inverse)
 *  18. wordEvidence schema: keys exist in words; evidence enum valid (Phase 2)
 *
 * Convention: WARN/ERROR messages from a specific check should prefix `[#N]`
 * to make the source check identifiable in output (Session 30). Newer checks
 * (#13-17) follow this convention; older checks (#1-12) can be migrated
 * incrementally. Allowlist substring matching tolerates the prefix.
 *
 * Allowlist: ALLOWLIST (top of file) suppresses known WARN/ERROR messages
 * by substring match, downgrading them to INFO with [allowlisted] reason+ref.
 * Use this for issues intentionally deferred (e.g., needs linguist consultation).
 *   - `match` accepts a string or string[] (any matches → fires).
 *   - `created: 'YYYY-MM-DD'` records when the entry was added (age tracking).
 *   - `expires: 'YYYY-MM-DD'` re-promotes the entry to WARN/ERROR after the
 *     date passes; within EXPIRES_LEAD_DAYS adds a ⚠ "N days left" note.
 *   - Unused entries (no match fires) listed under UNUSED ALLOWLIST ENTRIES.
 *   - Entries 1+ year old surfaced in INFOS as long-standing tech debt.
 *
 * Exit code: 0 on no errors (warnings allowed), 1 on errors.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.dirname(__filename);
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ---- Load source files into a single sandbox ----------------------------
const dataSrc = read('wordmap_data.js');
const metaSrc = read('wordmap_meta.js');
const htmlSrc = read('wordmap.html');
const readmeSrc = read('README.md');

// Strip the lazy-loader window assignments at end of meta_js so we can eval
const metaSrcStripped = metaSrc
    .replace(/window\._wmMetaLoaded\s*=\s*true\s*;?/g, '')
    .replace(/if\s*\(\s*window\._wmMetaResolve\s*\)[^\n]*/g, '');

// Use vm module so const/let bindings stick on the context object,
// then we can read them as ctx.LANG_DATA etc.
const vm = require('vm');
const ctx = { window: {}, document: { createElement: () => ({}) } };
vm.createContext(ctx);
vm.runInContext(dataSrc + '\n;this.LANG_DATA=LANG_DATA;this.EXCLUDED_CODES=EXCLUDED_CODES;this.WORD_LIST=typeof WORD_LIST!==\'undefined\'?WORD_LIST:undefined;this.WM_UI_LABELS=WM_UI_LABELS;this.WM_UI=WM_UI;this.DATA_STATUS_OVERRIDES=typeof DATA_STATUS_OVERRIDES!==\'undefined\'?DATA_STATUS_OVERRIDES:undefined;this.HIST_DESCENDANT=typeof HIST_DESCENDANT!==\'undefined\'?HIST_DESCENDANT:undefined;', ctx);

// Per-word file split: WORD_LIST + per-language words/altWordForms now
// live in word_manifest.js + words/*.js. Load them into ctx and
// reconstruct WORD_LIST + merge WORDS data back into ctx.LANG_DATA so
// later checks in this validator see the same shape they always did.
try {
    const manifestSrc = read('word_manifest.js');
    vm.runInContext(manifestSrc + '\n;this.WORD_ORDER=WORD_ORDER;', ctx);
} catch (e) { /* manifest not present yet during early migration */ }

try {
    // Pre-seed WORDS so per-word files can assign WORDS.<id> = {...}.
    vm.runInContext('this.WORDS = WORDS = window.WORDS = {};', ctx);
    const wordsDir = path.join(__dirname, 'words');
    if (fs.existsSync(wordsDir)) {
        for (const f of fs.readdirSync(wordsDir).filter(f => f.endsWith('.js'))) {
            vm.runInContext(fs.readFileSync(path.join(wordsDir, f), 'utf8'), ctx);
        }
    }
} catch (e) { /* words/ not present yet during early migration */ }

// Rebuild WORD_LIST from WORD_ORDER + WORDS for downstream checks.
if (Array.isArray(ctx.WORD_ORDER) && ctx.WORDS) {
    ctx.WORD_LIST = ctx.WORD_ORDER.map(id => {
        const w = ctx.WORDS[id] || {};
        return { id, label: w.label || {}, definition: w.definition || {} };
    });
}

// Merge per-word data back into LANG_DATA[code].words / .altWordForms.
if (ctx.WORDS && Array.isArray(ctx.WORD_ORDER) && ctx.LANG_DATA) {
    for (const id of ctx.WORD_ORDER) {
        const w = ctx.WORDS[id];
        if (!w || !w.data) continue;
        for (const [code, entry] of Object.entries(w.data)) {
            const lang = ctx.LANG_DATA[code];
            if (!lang) continue;
            lang.words = lang.words || {};
            if (Array.isArray(entry)) {
                lang.words[id] = entry;
            } else {
                lang.words[id] = [entry.form || '', entry.ipa || ''];
                if (entry.alt && entry.alt.length) {
                    lang.altWordForms = lang.altWordForms || {};
                    lang.altWordForms[id] = entry.alt;
                }
            }
        }
    }
}

vm.runInContext(metaSrcStripped, ctx);
// Load lang_names.js if present
let LANG_NAMES = null;
try {
    const langNamesSrc = read('lang_names.js');
    vm.runInContext(langNamesSrc + ';this.LANG_NAMES=LANG_NAMES;', ctx);
    LANG_NAMES = ctx.LANG_NAMES;
} catch (e) {
    // lang_names.js may not exist in older trees
}

// HIST_DESCENDANT is now in wordmap_data.js (Audit Task 122). Pull from
// the evaluated data context. Fall back to regex scrape of wordmap.html if
// not found there (legacy compatibility during migration).
let HIST_KEYS, HIST_SET;
if (ctx.HIST_DESCENDANT && typeof ctx.HIST_DESCENDANT === 'object') {
    HIST_KEYS = Object.keys(ctx.HIST_DESCENDANT);
    HIST_SET = new Set(HIST_KEYS);
} else {
    const histMatch = htmlSrc.match(/const HIST_DESCENDANT\s*=\s*\{([\s\S]*?)\n\s*\};/);
    if (!histMatch) { console.error('FATAL: could not locate HIST_DESCENDANT'); process.exit(2); }
    const HIST_BODY = histMatch[1].split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
    HIST_KEYS = [...HIST_BODY.matchAll(/(?:^|[\s,{])([a-z][a-z_0-9]*)\s*:/g)].map(m => m[1]);
    HIST_SET = new Set(HIST_KEYS);
}

// === Allowlist of known WARN/ERROR messages that are deliberately deferred ===
// Each entry:
//   - match:   substring match against the message. Either a string or an array
//              of strings (any one matches → entry fires; useful for grouping
//              related messages from the same root cause).
//   - reason:  why this is intentionally suppressed
//   - ref:     audit/session reference for context
//   - created: ISO date (YYYY-MM-DD) when the entry was added; used to track
//              age of unresolved tech debt (validator INFO summarises ages).
//   - expires: ISO date (YYYY-MM-DD); past this date, the entry is treated as
//              EXPIRED and the underlying WARN/ERROR is re-promoted (forces
//              periodic review). Entries with no expires field never expire.
//              When within EXPIRES_LEAD_DAYS of expiry, an INFO line is added.
//
// Add an entry when you intentionally accept a known issue that needs research
// before it can be properly fixed (e.g., requires a linguist consultation).
const EXPIRES_LEAD_DAYS = 30;

const ALLOWLIST = [
    // [mon, mnw] resolved Session 51 (user-discovered duplicate): mon entry
    // removed; mnw kept as canonical Mon-language ISO 639-3 code; omx HIST_-
    // DESCENDANT now points at mnw. mn (Mongolian) unaffected.
];

const TODAY_ISO = new Date().toISOString().slice(0, 10);
const TODAY_MS = Date.parse(TODAY_ISO);
const allowlistFired = new Set();

// Normalize match field to array
function entryMatches(entry, msg) {
    const patterns = Array.isArray(entry.match) ? entry.match : [entry.match];
    return patterns.some(p => msg.includes(p));
}

function checkAllowlist(msg) {
    for (const a of ALLOWLIST) {
        if (entryMatches(a, msg)) {
            allowlistFired.add(a);
            if (a.expires && a.expires < TODAY_ISO) {
                return { ...a, _expired: true };
            }
            return a;
        }
    }
    return null;
}

function daysBetween(isoFrom, isoTo) {
    return Math.round((Date.parse(isoTo) - Date.parse(isoFrom)) / 86400000);
}

const errors = [];
const warns  = [];
const infos  = [];
const allowlisted = [];
const E = m => {
    const al = checkAllowlist(m);
    if (al && !al._expired) { allowlisted.push({msg: m, ...al}); return; }
    if (al && al._expired) {
        errors.push(m + ` [ALLOWLIST EXPIRED ${al.expires}; re-promoted to ERROR]`);
        return;
    }
    errors.push(m);
};
const W = m => {
    const al = checkAllowlist(m);
    if (al && !al._expired) { allowlisted.push({msg: m, ...al}); return; }
    if (al && al._expired) {
        warns.push(m + ` [ALLOWLIST EXPIRED ${al.expires}; re-promoted to WARN]`);
        return;
    }
    warns.push(m);
};
const I = m => infos.push(m);

// ---- 1. WORD_LIST has 20 entries ----------------------------------------
if (!Array.isArray(ctx.WORD_LIST) || ctx.WORD_LIST.length !== 31) {
    E(`WORD_LIST length ${ctx.WORD_LIST?.length} (expected 31)`);
}
const WORD_IDS = (ctx.WORD_LIST || []).map(w => w.id);
// Partial words (WORDS.<id>.partial === true) are NOT required for every
// language — they are plotted only where a real, sourced form exists (the
// cuckoo, whose range is Eurasia/Africa, is the first). The map plotter and
// compare table already skip a language that lacks the current word.
const PARTIAL_WORD_IDS = new Set(WORD_IDS.filter(id => ctx.WORDS && ctx.WORDS[id] && ctx.WORDS[id].partial === true));

// ---- 2-4. Per-language word-entry checks --------------------------------
let dashCount = 0;
const codes = Object.keys(ctx.LANG_DATA);
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    if (!lang.words) { E(`${code}: missing .words`); continue; }
    for (const id of WORD_IDS) {
        const e = lang.words[id];
        if (e === undefined) {
            if (PARTIAL_WORD_IDS.has(id)) continue;  // partial word: absence is allowed
            E(`${code}.words.${id} missing`); continue;
        }
        if (!Array.isArray(e) || e.length !== 2) {
            E(`${code}.words.${id} is not [surface, ipa]: ${JSON.stringify(e)}`);
            continue;
        }
        const [surface, ipa] = e;
        if (typeof surface !== 'string' || typeof ipa !== 'string') {
            E(`${code}.words.${id} non-string: ${JSON.stringify(e)}`);
            continue;
        }
        if (surface === '—' || ipa === '—' || !surface || !ipa) dashCount++;
    }
    // 5. lat/lng
    if (!Number.isFinite(lang.lat) || lang.lat < -90 || lang.lat > 90) {
        E(`${code}: lat out of range: ${lang.lat}`);
    }
    if (!Number.isFinite(lang.lng) || lang.lng < -180 || lang.lng > 180) {
        E(`${code}: lng out of range: ${lang.lng}`);
    }
}
if (dashCount > 0) I(`${dashCount} word entries contain "—" (explicitly unattested; hidden from map labels per §3)`);

// ---- 4b. IPA field — detect non-IPA scripts (per wordmap-data-audit-1 §5.1) ----
// IPA uses Latin + Greek-letter conventions (θ β χ φ etc.). Cyrillic, Han,
// Arabic, Devanagari, etc. should NEVER appear in the IPA field. This catches
// cases like vec.house where the surface-form Cyrillic accidentally bled into
// the IPA column.
const NON_IPA_SCRIPT_RE = /[Ѐ-ӿ一-鿿぀-ゟ゠-ヿ֐-׿؀-ۿऀ-ॿঀ-৿฀-๿가-힯]/;
let nonIpaInIpaField = 0;
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    if (!lang.words) continue;
    for (const id of WORD_IDS) {
        const e = lang.words[id];
        if (!Array.isArray(e) || e.length !== 2) continue;
        const ipa = e[1];
        if (typeof ipa !== 'string') continue;
        if (NON_IPA_SCRIPT_RE.test(ipa)) {
            E(`${code}.words.${id}: IPA field contains non-IPA script chars: ${JSON.stringify(ipa)}`);
            nonIpaInIpaField++;
        }
    }
}

// ---- 4c. Same-form/same-IPA duplicates within a language (per §4) ----
// A language using the exact same [surface, ipa] for two different concepts
// is often a copy-paste error (Palauan dog/cat both 'katuu'; Navajo eat/drink
// both 'yishą́'). Some collisions are legitimate (greetings doubling as thanks),
// so this is INFO-level — surface them for human review.
const dupForms = [];
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    if (!lang.words) continue;
    const seen = new Map();  // "surface||ipa" → [concept]
    for (const id of WORD_IDS) {
        const e = lang.words[id];
        if (!Array.isArray(e) || e.length !== 2) continue;
        if (isUnattestedEntry(e)) continue;
        const k = e[0] + '||' + e[1];
        if (!seen.has(k)) seen.set(k, []);
        seen.get(k).push(id);
    }
    for (const [k, ids] of seen) {
        if (ids.length < 2) continue;
        dupForms.push(`${code}: ${ids.join('/')} share form ${k.split('||').map(x => JSON.stringify(x)).join(' ')}`);
    }
}
function isUnattestedEntry(entry) {
    if (!Array.isArray(entry) || entry.length !== 2) return true;
    const [w, ipa] = entry;
    return (!w || w === '—') && (!ipa || ipa === '—');
}

// ---- 6. Duplicate (lat,lng) groups --------------------------------------
const coordGroups = new Map();
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    const k = `${lang.lat},${lang.lng}`;
    if (!coordGroups.has(k)) coordGroups.set(k, []);
    coordGroups.get(k).push(code);
}
const dupGroups = [...coordGroups.values()].filter(g => g.length > 1);
if (dupGroups.length) I(`${dupGroups.length} duplicate-coordinate groups (often expected for parent/dialect pairs)`);
// Audit §7.6: 3+ codes at one coord — usually a UI cluster issue.
// Historical-progression (parent + descendants at same city) is OK; flag the rest.
const HIST_PROGRESSION_OK = new Set(['en/en_ang/en_ck/enm', 'ko/ko_em/ko_mid']);
for (const g of dupGroups) {
    if (g.length < 3) continue;
    const key = g.slice().sort().join('/');
    if (HIST_PROGRESSION_OK.has(key)) continue;
    W(`[#14] coord cluster: ${g.length} codes at one (lat,lng): ${g.join(', ')} — consider distinct representative points`);
}

// ---- 15. Same name + same coord, different codes — likely code conflict (Session 8) ----
// Catches the mon/mnw class of bug: two LANG_DATA entries with identical
// `.name` AND identical `(lat,lng)` but distinct codes. Almost always means
// either ISO code confusion or accidental duplicate.
{
    const nameCoordGroups = new Map();
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const k = `${lang.name}@${lang.lat},${lang.lng}`;
        if (!nameCoordGroups.has(k)) nameCoordGroups.set(k, []);
        nameCoordGroups.get(k).push(code);
    }
    for (const [k, group] of nameCoordGroups) {
        if (group.length < 2) continue;
        W(`[#15] same (name, lat, lng) under different codes: [${group.join(', ')}] all map to "${k}" — likely ISO code conflict or accidental duplicate (audit Session 8)`);
    }
}

// ---- 13. Source-level duplicate LANG_DATA keys (audit §6.28) -----------
// JS object literal silently overwrites earlier `code: {...}` with later `code: {...}`,
// so the validator's runtime view (codes[]) can't see the orphaned earlier entries.
// Scan source text directly. Pattern: `^  code: { name:` at column 2 (data style).
{
    const dataLineKeyRe = /^  ([\w-]+):\s*\{\s*name:/gm;
    const seen = {};
    let mm;
    while ((mm = dataLineKeyRe.exec(dataSrc)) !== null) {
        const code = mm[1];
        seen[code] = (seen[code] || 0) + 1;
    }
    const dupKeys = Object.entries(seen).filter(([, n]) => n > 1);
    for (const [c, n] of dupKeys) E(`[#13] LANG_DATA: code "${c}" defined ${n} times in source (silent JS overwrite — earlier definition is dead code)`);
}

// ---- 7. Every code has meta + 8. no duplicate meta assignments ----------
const codesWithMeta = codes.filter(c => ctx.LANG_DATA[c].meta);
const missingMeta = codes.filter(c => !ctx.LANG_DATA[c].meta);
for (const c of missingMeta) E(`${c}: no meta entry`);

// Count meta assignments. Strip line comments first (entire `// ...` lines and
// trailing `// ...` portions), then run the regex over the FULL stripped text
// — not line-by-line — so multi-line `LANG_DATA['x'] && (\n  LANG_DATA['x'].meta = {...}\n);`
// patterns are caught (per wordmap-check-2.md §3).
const metaAssignCount = {};
const stripFullLineComments = s => s.split('\n').filter(l => !l.trimStart().startsWith('//')).join('\n');
const stripTrailingLineComments = s => s.replace(/(^|[^:'"])\/\/[^\n]*$/gm, '$1');
const metaSrcForCount = stripTrailingLineComments(stripFullLineComments(metaSrcStripped));
const assignRe = /LANG_DATA\['([\w-]+)'\](?:\s*&&\s*\(\s*LANG_DATA\['\1'\])?\.meta\s*=/g;
let mm;
while ((mm = assignRe.exec(metaSrcForCount)) !== null) {
    metaAssignCount[mm[1]] = (metaAssignCount[mm[1]] || 0) + 1;
}
const dupAssign = Object.entries(metaAssignCount).filter(([, n]) => n > 1);
for (const [c, n] of dupAssign) E(`${c}: ${n} meta assignments (silent overwrite)`);

// ---- 9. EXCLUDED_CODES vs HIST_DESCENDANT -------------------------------
// Audit Task 199 (2026-05-07): a `dataStatus: 'fragmentary'` row may
// appear in HIST_DESCENDANT (to clear the Session-29 inverse-invariant
// [#17] warning) without being in EXCLUDED_CODES — fragmentary entries
// like Yuchi (yuc) or Kusunda (kgg) are still living languages and
// should remain visible on the default modern map. The classic
// invariant ("historical-stage rows must be excluded from the modern
// view") still applies to all other HIST_DESCENDANT entries.
const dsoForHist = ctx.DATA_STATUS_OVERRIDES || {};
const histInData = HIST_KEYS.filter(c => ctx.LANG_DATA[c]);
const histNotExcl = histInData.filter(c => !ctx.EXCLUDED_CODES.has(c));
for (const c of histNotExcl) {
    const ds = dsoForHist[c] || ctx.LANG_DATA[c]?.meta?.dataStatus;
    if (ds === 'fragmentary') {
        // Allowed: fragmentary living language flagged via HIST_DESCENDANT
        // for [#17] visibility, not hidden via EXCLUDED_CODES.
        continue;
    }
    E(`${c}: in HIST_DESCENDANT but not EXCLUDED_CODES`);
}
// HIST entries that don't even exist in LANG_DATA (stale)
const histStale = HIST_KEYS.filter(c => !ctx.LANG_DATA[c]);
for (const c of histStale) W(`${c}: in HIST_DESCENDANT but not in LANG_DATA (stale)`);

// ---- 10. Speaker-tier parseability --------------------------------------
function parseTierLite(s) {
    if (!s) return null;
    const lower = String(s).toLowerCase();
    if (/extinct/.test(lower) && !/[\d]/.test(s)) return 'extinct';
    if (/liturgical/.test(lower) && !/[\d]/.test(s)) return 'liturgical';
    const m = String(s).match(/[\d.]+\s*[KMB]?/);
    return m ? 'numeric' : null;
}
let unparseable = 0;
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta;
    if (!m || !m.speakers) continue;
    if (!parseTierLite(m.speakers)) unparseable++;
}
if (unparseable) W(`${unparseable} meta.speakers strings cannot be parsed by lightweight tier parser`);

// ---- 11. family / script top-level allow-list ---------------------------
const FAMILY_TOP_ALLOW = new Set([
    'Indo-European','Romance','Germanic','Slavic','Celtic','Baltic','Hellenic','Italic','Anatolian','Indo-Aryan','Iranian',
    'Sino-Tibetan','Sinitic','Japonic','Koreanic','Turkic','Mongolic','Tungusic',
    'Afro-Asiatic','Semitic','Cushitic','Dravidian','Austroasiatic','Austronesian','Hmong-Mien','Kra-Dai',
    'Niger-Congo','Bantu','Nilo-Saharan','Khoisan','Khoe-Kwadi','Atlantic',
    'Uralic','Kartvelian','NE Caucasian','NW Caucasian',
    'Eskimo-Aleut','Algic','Iroquoian','Siouan','Salishan','Wakashan','Na-Dené','Muskogean','Uto-Aztecan','Oto-Manguean','Mayan','Tsimshianic',
    'Quechuan','Aymaran','Tupian','Araucanian','Arawakan','Chibchan','Chocoan','Mura',
    'Pama-Nyungan','Trans-New Guinea','Iwaidjan or unclassified',
    'Yeniseian','Chukotko-Kamchatkan','Hurro-Urartian','Meroitic','Yukaghir','Pano',
    'Language isolate','Constructed','Creole','English-based creole','French-based creole','Iberian-based creole','Pidgin','Mixed','Proto-language',
    'Tocharian','Anatolian (Indo-European)','Indo-European (Armenian)','Indo-European (isolate branch)','Tocharian (Indo-European)',
    'Germanic (East)','Germanic (creole-influenced)',
    'Hurro-Urartian (separate from IE/Semitic)',
    'Indo-Aryan (NW, Pahari/Punjabi-related)',
    'Mongolic (Western, Oirat)',
    'Sino-Tibetan (Naic/Loloish)',
    'Proto-language (reconstructed)',
    'Austronesian (Pidgin)',
    // Audit Task 149/150: new family top-tokens introduced
    'Atlantic-Congo',                  // Bantu E70/JE Runyakitara cluster
    'Portuguese-based creole',         // kea Cape Verdean
    'Spanish-based creole',            // cbk Chavacano (Zamboangueño)
    'Kiowa-Tanoan',                    // kio Kiowa (Plains-Pueblo connection)
    'Songhai',                         // ses Koyraboro Senni — genealogically isolated
    // Pass 35: new family top-tokens
    'Tyrsenian',                       // ett Etruscan + (potentially) Lemnian/Raetic
    'Disputed',                        // txr Tartessian — affiliation contested
    'Romance',                         // lld Ladin (Rhaeto-Romance) — already in list above; redundant but explicit
    // Audit Task 159: jiv Shuar Jivaroan — South American small family
    'Jivaroan',                        // jiv Shuar (Jivaroan, Ecuador/Peru)
    // Pass 36: legitimately-missing small/regional families surfaced by the
    // family-top-token allow-list audit (formerly hidden inside long descriptive strings).
    'Cariban',                         // car Galibí, mch Maquiritari — Northern Amazonian family
    'Misumalpan',                      // sum Sumo — small Central American family (Sumo + Miskito)
    'Mataco-Mataguayan',               // mzh Wichí — small Gran Chaco family of South America
    'Barbacoan',                       // gum Guambiano — small Andean-foothill family (Colombia/Ecuador)
    'Totonacan',                       // toc Totonac — small Mesoamerican family (Totonac + Tepehua)
    'Otomanguean',                     // zts Tilquiapan Zapotec, mxv Metlatónoc Mixtec, otq Querétaro Otomi (alt spelling of Oto-Manguean already on list)
    'Algonquian',                      // abe Western Abenaki, arp Arapaho — major branch of Algic, commonly used as top-level
    'Athabaskan',                      // nv Navajo — Na-Dene major branch, commonly used as top-level family token
    'Mande',                           // men/dyu/kpe/mnk — Mande family of West Africa
    'Nilotic',                         // laj/teo — Nilotic family (Sudanic, East Africa)
    'Eskimo–Aleut',                    // esu — Yupik branch of Eskimo-Aleut family
    'Mochica',                         // omc — Mochica/Yunga, likely isolate, NW Peruvian coast (extinct ~late 19c.)
]);
const familyTopHits = {};
let familyOutsideAllow = 0;
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta;
    if (!m || !m.family) continue;
    const top = String(m.family).split('(')[0].trim();
    familyTopHits[top] = (familyTopHits[top] || 0) + 1;
    if (!FAMILY_TOP_ALLOW.has(top)) familyOutsideAllow++;
}
if (familyOutsideAllow) W(`${familyOutsideAllow} languages have meta.family with a top token outside the allow-list`);

// ---- 12. Doc-vs-data lang count (Audit Task 107) ----------------------
// Only check counts that are plausibly Word-Map related (within 100 of actual)
// to avoid false positives from index.html / Word Order Map mentions.
const N = codes.length;
const reN = /(\d{3,4})\s*(?:languages|言語|languages\/varieties)/g;
function checkCounts(src, where) {
    const seen = new Set();
    let m;
    while ((m = reN.exec(src)) !== null) {
        const n = +m[1];
        if (seen.has(n)) continue;
        seen.add(n);
        if (Math.abs(n - N) > 100) continue; // skip clearly different scope
        if (n !== N) W(`${where} mentions "${n} languages" but actual count is ${N}`);
    }
}
checkCounts(htmlSrc,    'wordmap.html');
checkCounts(readmeSrc,  'README.md');
const headerN = (dataSrc.match(/(\d{3,4})\s*languages/) || [])[1];
if (headerN && +headerN !== N) E(`wordmap_data.js header says ${headerN} languages, actual ${N}`);

// Audit Task 107: explicitly cross-check meta description / OG / Twitter tags
// that are externally visible (SEO/social previews) and easy to miss.
const seoTags = [
    { re: /<title>[^<]*?(\d{3,4})\s*Languages/i,                                   label: '<title>' },
    { re: /<meta\s+name="description"\s+content="[^"]*?(\d{3,4})\s*languages/i,    label: '<meta name="description">' },
    { re: /<meta\s+property="og:description"\s+content="[^"]*?(\d{3,4})\s*languages/i, label: '<meta og:description>' },
    { re: /<meta\s+name="twitter:description"\s+content="[^"]*?(\d{3,4})\s*languages/i, label: '<meta twitter:description>' },
];
for (const t of seoTags) {
    const m = htmlSrc.match(t.re);
    if (m && +m[1] !== N) W(`wordmap.html ${t.label} mentions ${m[1]} languages but actual count is ${N} (Audit Task 107)`);
}

// ---- 18a. Trust-label UI coverage (Audit Task 92) --------------------
// The trust-system UI uses several inline JS constants in wordmap.html
// (PRONUNCIATION_LABEL, COVERAGE_LABEL, LOCATION_BASIS_LABEL, etc.).
// They MUST cover at least { en, ja, ko, zh } so the modal labels stay
// localized in priority UI languages. WARN if any are missing.
const TRUST_LABEL_CONSTS = [
    'PRONUNCIATION_LABEL', 'PRONUNCIATION_HEADER',
    'COVERAGE_LABEL', 'COVERAGE_HEADER',
    'LOCATION_BASIS_LABEL', 'LOCATION_BASIS_HEADER',
    'LANGUAGE_KIND_BADGE',
    'REVIEW_STATUS_LABEL', 'REVIEW_STATUS_HEADER',  // Audit Task 108
    'SURFACE_TYPE_LABEL', 'SURFACE_TYPE_HEADER',    // Audit Task 84/89
];
const TRUST_LABEL_PRIORITY_UI = ['en', 'ja', 'ko', 'zh'];
for (const constName of TRUST_LABEL_CONSTS) {
    const re = new RegExp(`const\\s+${constName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\s{8}\\};`);
    const m = htmlSrc.match(re);
    if (!m) {
        W(`[#18a] wordmap.html missing const ${constName} (Audit Task 92)`);
        continue;
    }
    const body = m[1];
    // Extract leaf objects: each line that contains an inner { en: '...', ja: '...', ... }
    // We match `entryName: { ... }` blocks OR direct `en:`/`ja:` keys at top level.
    // Simple heuristic: count occurrences of priority UI keys inside the const body.
    for (const ui of TRUST_LABEL_PRIORITY_UI) {
        const keyRe = new RegExp(`\\b${ui}\\s*:`);
        if (!keyRe.test(body)) {
            W(`[#18a] ${constName} missing priority UI lang '${ui}' (Audit Task 92)`);
        }
    }
}

// Audit Task 92: required WM_UI table/modal keys must exist in en.
// (WM_UI lives in wordmap_data.js; I18N_STRINGS for messages lives in
// wordmap.html and is checked separately below via regex.)
const REQUIRED_WM_UI_KEYS = [
    'word', 'ipa', 'wordCol', 'ipaCol', 'concept', 'native', 'name',
    'family', 'speakers', 'countries', 'official', 'script', 'modern', 'historical',
];
const wmUi = ctx.WM_UI || {};
if (wmUi.en) {
    for (const key of REQUIRED_WM_UI_KEYS) {
        if (wmUi.en[key] === undefined) {
            W(`[#18b] WM_UI.en missing required key '${key}' (Audit Task 92)`);
        }
    }
} else {
    W(`[#18b] WM_UI.en not found — UI labels likely broken (Audit Task 92)`);
}
// Audit Task 92: required I18N_STRINGS keys (in wordmap.html). Use a regex
// on the source — running the inline JS would require executing the full
// page. Each key needs en at minimum; ja/ko/zh expected for priority langs.
const REQUIRED_I18N_KEYS = [
    'noMatch', 'eraFilterOffHint', 'eraHelpModern', 'eraHelpHistorical', 'sources',
    'modernDescendant', 'historicalAncestors',
    'searchPlaceholder',
    // Audit Task 106 ARIA labels
    'ariaSelectWord', 'ariaUiLanguage', 'ariaMapZoom', 'ariaZoomIn', 'ariaZoomOut',
    'aria2D3D', 'ariaToggleForm', 'ariaTogglePron', 'ariaToggleName',
    'ariaNameGroup', 'ariaFontSize', 'ariaCloseInfo', 'ariaEraGroup',
];
const i18nBlock = htmlSrc.match(/const\s+I18N_STRINGS\s*=\s*\{([\s\S]*?)\n\s{8}\};/);
if (!i18nBlock) {
    W(`[#18b] wordmap.html: I18N_STRINGS not found (Audit Task 92)`);
} else {
    for (const key of REQUIRED_I18N_KEYS) {
        const re = new RegExp(`\\b${key}\\s*:\\s*\\{[^}]*\\ben\\s*:`);
        if (!re.test(i18nBlock[1])) {
            W(`[#18b] I18N_STRINGS missing required key '${key}' with en value (Audit Task 92)`);
        }
    }
}

// ---- 19. Cache-buster registry drift (Audit Tasks 134 / 198) ---------
// Compare static <script>/<link> ?v= versions in wordmap.html against the
// central WM_ASSET_VERSION object so drift is caught at validation time.
//
// Audit Task 198 (2026-05-07): strict mode promotes drift WARNs to
// ERRORs for CI gating. Activate with env `WM_VALIDATE_STRICT=1` (the
// GitHub Actions workflow sets it). Local dev keeps the relaxed WARN
// behavior so iteration is not blocked while a contributor is mid-bump.
//
// Monotonic-baseline check: each WM_ASSET_VERSION value must be ≥ the
// minimum baseline below. Prevents accidental version rollback (e.g.
// merge conflict resolved the wrong way). Update WM_VERSION_FLOOR
// when the current value of a key exceeds the floor by ≥ 10 to keep
// the floor approximately current without micro-tracking.
const STRICT = process.env.WM_VALIDATE_STRICT === '1';
const driftReporter = STRICT ? E : W;
const WM_VERSION_FLOOR = {
    // Baseline frozen 2026-05-07; update when a key bumps past floor + 10.
    styles:   54,
    data:    120,
    metaI18n:  8,
    filter:   24,
    names:    26,
    meta:     70,
};
const ASSET_KEY_BY_PATH = {
    'styles.css':         'styles',
    'wordmap_data.js':    'data',
    'meta_i18n_ext.js':   'metaI18n',
    'lang-filter.js':     'filter',
    // wordmap.html no longer loads the whole lang_names.js; it loads a shim
    // plus lang_names/<ui>.js. Both still carry the `names` version, and the
    // early UI picker document.write()s the second one, so only the English
    // table is a literal <script src> here.
    'lang_names/en.js':   'names',
    'wordmap_meta.js':    'meta',
    'wordmap_trivia.js':  'trivia',
    'meta_i18n_coverage.js': 'metaI18nCoverage',
    'word_manifest.js':   'words',
    'words/*.js':         'words',   // glob: every concept file
    'word_labels.js':     'labels',  // generated: label+definition of all 25
};
// These are fetched at runtime via assetUrl(path, key), not by a <script src>.
const LAZY_VIA_ASSET_URL = new Set([
    'wordmap_meta.js', 'meta_i18n_ext.js', 'meta_i18n_coverage.js', 'wordmap_trivia.js',
]);
const versionRegistryMatch = htmlSrc.match(/const\s+WM_ASSET_VERSION\s*=\s*\{([^}]+)\}/);
if (!versionRegistryMatch) {
    driftReporter(`[#19] wordmap.html missing WM_ASSET_VERSION registry (Audit Task 134)`);
} else {
    const registry = {};
    for (const m of versionRegistryMatch[1].matchAll(/(\w+)\s*:\s*(\d+)/g)) {
        registry[m[1]] = +m[2];
    }
    // Audit Task 198: monotonic-baseline guard. Always ERROR (regardless
    // of strict mode) — a rollback below the floor is never legitimate.
    for (const [key, floor] of Object.entries(WM_VERSION_FLOOR)) {
        if (registry[key] !== undefined && registry[key] < floor) {
            E(`[#19] WM_ASSET_VERSION.${key}=${registry[key]} is below the recorded floor of ${floor} — version rolled back? (Audit Task 198)`);
        }
    }
    for (const [pathPattern, key] of Object.entries(ASSET_KEY_BY_PATH)) {
        if (registry[key] === undefined) {
            driftReporter(`[#19] WM_ASSET_VERSION missing key '${key}' for ${pathPattern}`);
            continue;
        }
        if (pathPattern.includes('*')) {
            // Glob check: every <script src="words/<id>.js?v=N"> must use the
            // current registry value. Scanning is done with a regex built
            // from the pattern.
            const re = new RegExp(
                `<script[^>]+src=["']${pathPattern.replace(/[.+]/g, '\\$&').replace('*', '[^"\']+')}\\?v=(\\d+)["']`,
                'g',
            );
            let m;
            while ((m = re.exec(htmlSrc)) !== null) {
                if (+m[1] !== registry[key]) {
                    driftReporter(`[#19] ${m[0]}: ?v=${m[1]} != WM_ASSET_VERSION.${key}=${registry[key]}`);
                }
            }
            // Synthesized loader path: any words/${id}.js?v=${variable} is OK if
            // it's referenced via the loader. Skip — we trust the loader.
            continue;
        }
        // Files loaded on demand carry their version through assetUrl(path, key)
        // rather than a literal ?v=N in a <script src>. Accept that form: the
        // registry is still the single source of truth for their version.
        // (wordmap_meta.js always did this; meta_i18n_ext.js,
        // meta_i18n_coverage.js and wordmap_trivia.js joined it when they were
        // moved off the critical path.)
        if (LAZY_VIA_ASSET_URL.has(pathPattern)) {
            const esc = pathPattern.replace(/\./g, '\\.');
            const dyn = new RegExp(`assetUrl\\(\\s*['"]${esc}['"]\\s*,\\s*['"]${key}['"]\\s*\\)`).test(htmlSrc);
            if (!dyn) {
                driftReporter(`[#19] ${pathPattern}: no assetUrl('${pathPattern}', '${key}') call found in wordmap.html`);
            }
            continue;
        }
        const re = new RegExp(`${pathPattern.replace(/\./g, '\\.')}\\?v=(\\d+)`, 'g');
        const matches = [...htmlSrc.matchAll(re)];
        if (matches.length === 0) {
            driftReporter(`[#19] ${pathPattern}: no cache-buster found in wordmap.html`);
            continue;
        }
        const expected = registry[key];
        for (const m of matches) {
            const got = +m[1];
            if (got !== expected) {
                driftReporter(`[#19] ${pathPattern}?v=${got} in wordmap.html doesn't match WM_ASSET_VERSION.${key}=${expected}`);
            }
        }
    }
    if (STRICT) {
        I(`cache-buster strict mode active (WM_VALIDATE_STRICT=1) — drift escalates to ERROR (Audit Task 198)`);
    }
}

// ---- 12b. WORD_LIST.label shape (per wordmap-check-2.md §6) ----------
// Each entry: { id, label: { en, ja, ko, zh, de, fr, ... } }
// label.en is required; label.ja/ko/zh/de/fr strongly recommended.
// 'ind' as a key is forbidden (legacy; should be 'id' Indonesian).
const wlSeenIds = new Set();
const wlMustHave = ['en', 'ja', 'ko', 'zh', 'de', 'fr'];
for (const w of (ctx.WORD_LIST || [])) {
    if (!w.id || typeof w.id !== 'string') E(`WORD_LIST: entry missing string id: ${JSON.stringify(w)}`);
    else if (wlSeenIds.has(w.id)) E(`WORD_LIST: duplicate id "${w.id}"`);
    else wlSeenIds.add(w.id);
    if (!w.label || typeof w.label !== 'object') {
        E(`WORD_LIST entry "${w.id}" missing .label object`);
        continue;
    }
    if ('ind' in w.label) E(`WORD_LIST entry "${w.id}" still uses legacy key 'ind' (use 'id' for Indonesian)`);
    for (const k of wlMustHave) {
        if (!w.label[k]) E(`WORD_LIST entry "${w.id}" missing label.${k}`);
    }
    // es_eu/es_mx fall back to es; pt_eu/pt_br fall back to pt
    if (!w.label.es && (w.label.es_eu || w.label.es_mx)) W(`WORD_LIST entry "${w.id}" has es_eu/es_mx but no base 'es' for fallback`);
    if (!w.label.pt && (w.label.pt_eu || w.label.pt_br)) W(`WORD_LIST entry "${w.id}" has pt_eu/pt_br but no base 'pt' for fallback`);

    // ---- 12b'. WORD_LIST.definition shape (audit Task 82/86/176) ----
    // Required shape: { en, ja, ko, zh } (multilingual object). Plain strings
    // are rejected so future Claude sessions don't accidentally regress.
    // Audit Task 176: track 21-UI-lang coverage as a coverage-line metric
    // (not yet WARN-gated; the policy is "promote to WARN once Phase 1/2/3
    // translations land"). Covered langs match the 21 in lang_names.js.
    if (w.definition !== undefined) {
        if (typeof w.definition === 'string') {
            W(`[#12b'] WORD_LIST entry "${w.id}" has string definition; expected object { en, ja, ko, zh }`);
        } else if (typeof w.definition !== 'object' || w.definition === null) {
            E(`[#12b'] WORD_LIST entry "${w.id}".definition is not an object`);
        } else {
            if (!w.definition.en) E(`[#12b'] WORD_LIST entry "${w.id}".definition missing .en`);
            for (const k of ['ja', 'ko', 'zh']) {
                if (!w.definition[k]) W(`[#12b'] WORD_LIST entry "${w.id}".definition missing priority UI lang .${k}`);
            }
        }
    }
}

// ---- 12b". WORD_LIST.definition 21-UI-lang coverage (audit Task 176) ----
// Coverage line that mirrors WORD_LIST.label coverage (Task 175). Once
// every UI lang reaches 20/20 the line shows "21/21 UI langs fully
// covered" and the team can flip the WARN gate on.
if (Array.isArray(ctx.WORD_LIST)) {
    const definitionUiLangs = ['en','ja','ko','zh','yue','vi','th','id','hi','de','fr','it','es_eu','es_mx','pt_eu','pt_br','ru','uk','ar','he','sw'];
    const defCoverage = {};
    for (const ui of definitionUiLangs) defCoverage[ui] = 0;
    for (const w of ctx.WORD_LIST) {
        if (!w.definition || typeof w.definition !== 'object') continue;
        const baseFallback = (k) => w.definition[k] || w.definition[k.split('_')[0]];
        for (const ui of definitionUiLangs) {
            if (baseFallback(ui)) defCoverage[ui] += 1;
        }
    }
    const fullyCovered = definitionUiLangs.filter(ui => defCoverage[ui] === ctx.WORD_LIST.length).length;
    I(`WORD_LIST.definition coverage: ${fullyCovered}/${definitionUiLangs.length} UI langs fully covered across all ${ctx.WORD_LIST.length} concepts (Audit Task 176)`);
    const partial = definitionUiLangs.filter(ui => defCoverage[ui] > 0 && defCoverage[ui] < ctx.WORD_LIST.length);
    if (partial.length > 0) {
        const detail = partial.map(ui => `${ui} ${defCoverage[ui]}/${ctx.WORD_LIST.length}`).join(', ');
        I(`  partial coverage: ${detail}`);
    }
}

// ---- 12c. LANG_NAMES coverage per UI lang (per wordmap-check-2.md §4) -------
const langNamesCoverage = {};
const langNamesUis = ['en','ja','ko','zh','yue','vi','th','id','hi','de','fr','it','es_eu','es_mx','pt_eu','pt_br','ru','uk','ar','he','sw'];
if (LANG_NAMES) {
    for (const ui of langNamesUis) {
        const dict = LANG_NAMES[ui] || {};
        const present = codes.filter(c => dict[c]).length;
        langNamesCoverage[ui] = present;
        if (present < codes.length) {
            const missing = codes.filter(c => !dict[c]);
            const which = missing.slice(0, 3).join(', ') + (missing.length > 3 ? `, …${missing.length - 3} more` : '');
            W(`lang_names.${ui}: ${present}/${codes.length} (missing: ${which})`);
        }
    }
} else {
    W('lang_names.js not loaded — coverage check skipped');
}

// ---- 12d. Word-entry "—" severity split (per wordmap-check-2.md §7) ----
// modern lang + any "—" entry → ERROR
// historical lang + both "—" → OK (explicitly unattested)
// historical lang + one-sided "—" → ERROR
// Pass 35: also allow `dataStatus: 'fragmentary'` (e.g. critically-endangered
// living isolates with very limited documentation) to use both-'—' cells.
// Review #118 issue 1: also allow both-'—' for a modern language when
// meta.unattestedReason[concept] === 'cultural-absence' — i.e. the language
// is well-documented but has no conventionalized fixed lexeme for that concept
// (e.g. Warlpiri hello/thanks; Laughren & Hoogenraad Warlpiri Encyclopaedic
// Dictionary confirms no culturally fixed greeting or thanks word). This is a
// documented linguistic fact, not a data gap, so it must not trigger the CI gate.
let modernDashErrors = 0, oneSidedDashErrors = 0;
const dso = ctx.DATA_STATUS_OVERRIDES || {};
for (const code of codes) {
    const isHist = HIST_SET.has(code);
    const status = dso[code] || ctx.LANG_DATA[code]?.meta?.dataStatus;
    const isFragmentary = status === 'fragmentary';
    const lang = ctx.LANG_DATA[code];
    for (const id of WORD_IDS) {
        const e = lang.words[id];
        if (!Array.isArray(e) || e.length !== 2) continue;
        const [w, ipa] = e;
        const isDash = v => v === '—' || v === '-' || v === '';
        const wDash = isDash(w);
        const iDash = isDash(ipa);
        if (!wDash && !iDash) continue;
        if (wDash && iDash) {
            const unattestedReason = lang.meta?.unattestedReason?.[id];
            const isCulturalAbsence = unattestedReason === 'cultural-absence';
            if (!isHist && !isFragmentary && !isCulturalAbsence) {
                E(`${code}.words.${id}: both '—' but language is modern (unattested-marker only allowed for historical or fragmentary)`);
                modernDashErrors++;
            }
        } else {
            E(`${code}.words.${id}: one-sided dash/empty: ${JSON.stringify(e)}`);
            oneSidedDashErrors++;
        }
    }
}

// ---- 13. Description i18n coverage (per wordmap-check.md §10) ----------
const UI_LANGS = ['en','ja','ko','zh','yue','vi','th','id','hi','de','fr','it','es_eu','es_mx','pt_eu','pt_br','ru','uk','ar','he','sw'];
const i18nCoverage = {};
for (const ui of UI_LANGS) i18nCoverage[ui] = { covered: 0, missing: [] };
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta;
    if (!m || !m.description) continue;
    if (typeof m.description !== 'object') continue; // legacy single-string desc — counts as `en` only
    for (const ui of UI_LANGS) {
        if (m.description[ui]) i18nCoverage[ui].covered++;
        else i18nCoverage[ui].missing.push(code);
    }
}
const totalDescCodes = codes.filter(c => {
    const m = ctx.LANG_DATA[c].meta;
    return m && typeof m.description === 'object';
}).length;
// Legacy string-desc count + enumeration (Audit Task 145)
const legacyDescCodesList = codes.filter(c => {
    const m = ctx.LANG_DATA[c].meta;
    return m && typeof m.description === 'string';
});
if (legacyDescCodesList.length) {
    // Audit Task 145 Phase C: enumerate ALL offenders. Past truncation
    // ("…87 more") hid the migration scope; full list lets a contributor
    // batch-convert in one mechanical pass.
    W(`${legacyDescCodesList.length} languages still have description as a string (not object): ${legacyDescCodesList.join(', ')} (Audit Task 145)`);
}

// ---- 13b'. Description i18n coverage threshold warnings (Audit Task 121) ----
// Phase 1: WARN if any UI lang's description coverage falls below 95%.
// UI now visibly labels English fallback (Task 121 UI), but we still want
// to surface low-coverage UI langs so future translation work is targeted.
const DESC_COVERAGE_THRESHOLD = 0.95;
for (const ui of UI_LANGS) {
    if (ui === 'en') continue;
    if (!totalDescCodes) break;
    const c = i18nCoverage[ui];
    const pct = c.covered / totalDescCodes;
    if (pct < DESC_COVERAGE_THRESHOLD) {
        const missingPreview = c.missing.slice(0, 5).join(', ') + (c.missing.length > 5 ? `, …${c.missing.length - 5} more` : '');
        W(`[#13b'] description i18n: ${ui} coverage ${(pct*100).toFixed(0)}% (${c.covered}/${totalDescCodes}) below ${(DESC_COVERAGE_THRESHOLD*100).toFixed(0)}% threshold — missing: ${missingPreview}`);
    }
}

// ---- 13b. Optional schema fields (per "all A" decision) ----------------
// New optional fields — if present, must have correct shape:
//   meta.speakerBasis : 'L1' | 'total' | 'regional-population' | 'aggregate' | 'liturgical' | 'extinct' | 'uncertain'
//   meta.speakerSource: free string (citation)
//   meta.speakerYear  : number (4-digit year)
//   meta.iso6393      : 3-letter ISO 639-3 code
//   meta.glottocode   : Glottocode (8-char)
//   meta.parentCode   : code in LANG_DATA (for varieties)
//   meta.locationBasis: 'capital' | 'prestige-center' | 'historical-site' | 'largest-city' | 'approx-region'
//                       (CANONICAL — Audit Task 131; lang.locationBasis kept as legacy alias only)
//   meta.sources      : Array<{ type, title, url?, accessed? }>
// Audit Task 149: 'L2' added for constructed/auxiliary IALs (vo, ia, eo, etc.)
const SPEAKER_BASIS = new Set(['L1','L2','total','regional-population','aggregate','liturgical','extinct','uncertain']);
const LOCATION_BASIS = new Set(['capital','prestige-center','historical-site','largest-city','approx-region']);
let withSpeakerBasis = 0, withSources = 0, withIso = 0, withPronType = 0;
const pronTypeCounts = {};
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    const m = lang.meta || {};
    if (m.speakerBasis !== undefined) {
        if (!SPEAKER_BASIS.has(m.speakerBasis)) E(`${code}: meta.speakerBasis "${m.speakerBasis}" not in enum`);
        else withSpeakerBasis++;
    }
    if (m.speakerYear !== undefined && (typeof m.speakerYear !== 'number' || m.speakerYear < 1900 || m.speakerYear > 2100)) {
        E(`${code}: meta.speakerYear "${m.speakerYear}" not a 4-digit year`);
    }
    if (m.iso6393 !== undefined) {
        if (typeof m.iso6393 !== 'string' || !/^[a-z]{3}$/.test(m.iso6393)) E(`${code}: meta.iso6393 "${m.iso6393}" not a 3-letter code`);
        else withIso++;
    }
    if (m.glottocode !== undefined && (typeof m.glottocode !== 'string' || !/^[a-z]{4}\d{4}$/.test(m.glottocode))) {
        E(`${code}: meta.glottocode "${m.glottocode}" not a Glottocode`);
    }
    if (m.parentCode !== undefined && !ctx.LANG_DATA[m.parentCode]) {
        E(`${code}: meta.parentCode "${m.parentCode}" not in LANG_DATA`);
    }
    if (m.dataStatus !== undefined) {
        const allowed = new Set(['modern','attested','fragmentary','reconstructed','undeciphered','partly-understood','pedagogical']);
        if (!allowed.has(m.dataStatus)) E(`${code}: meta.dataStatus "${m.dataStatus}" not in enum`);
    }
    if (m.pronunciationType !== undefined) {
        const allowed = new Set(['ipa','broad','romanization','orthography','mixed','unknown']);
        if (!allowed.has(m.pronunciationType)) E(`[#13d] ${code}: meta.pronunciationType "${m.pronunciationType}" not in enum`);
        else { withPronType++; pronTypeCounts[m.pronunciationType] = (pronTypeCounts[m.pronunciationType] || 0) + 1; }
    }
    if (m.coverage !== undefined) {
        const allowed = new Set(['full','partial','accent-only','base-copy-with-notes']);
        if (!allowed.has(m.coverage)) E(`[#13e] ${code}: meta.coverage "${m.coverage}" not in enum`);
        if (m.coverage === 'base-copy-with-notes' && !m.baseLang) {
            W(`[#13e] ${code}: coverage='base-copy-with-notes' requires meta.baseLang`);
        }
    }
    if (m.surfaceType !== undefined) {
        const allowed = new Set(['native-script','standard-orthography','romanization','phonetic','mixed','unknown']);
        if (!allowed.has(m.surfaceType)) E(`[#13g] ${code}: meta.surfaceType "${m.surfaceType}" not in enum`);
    }
    if (m.languageKind !== undefined) {
        const allowed = new Set(['natural','constructed','pidgin-creole','pedagogical-stage','reconstructed-proto','historical-attested']);
        if (!allowed.has(m.languageKind)) E(`[#13h] ${code}: meta.languageKind "${m.languageKind}" not in enum`);
    }
    if (m.aliases !== undefined) {
        if (!Array.isArray(m.aliases)) E(`[#13k] ${code}: meta.aliases is not an array (Audit Task 114)`);
        else for (const a of m.aliases) {
            if (typeof a !== 'string' || !a.trim()) E(`[#13k] ${code}: meta.aliases entry not a non-empty string: ${JSON.stringify(a)}`);
        }
    }
    // Audit Task 220: structured speakerCount object (Phase 2 pilot).
    // Schema enforced when the field is present; pilot rows checked here,
    // full migration produces the field on every row.
    //   speakerCount: {
    //       l1?, total?, range, rangeMin?, rangeMax?,
    //       l1RangeMin?, l1RangeMax?,
    //       year, source, exact?, vitality?, notes?
    //   }
    if (m.speakerCount !== undefined) {
        const sc = m.speakerCount;
        if (typeof sc !== 'object' || sc === null || Array.isArray(sc)) {
            E(`[#220] ${code}: meta.speakerCount must be a plain object (Audit Task 220)`);
        } else {
            // [#220a] required: range
            const RANGE_KIND = new Set(['point', 'range']);
            if (!RANGE_KIND.has(sc.range)) {
                E(`[#220a] ${code}: speakerCount.range "${sc.range}" not in {'point','range'} (Audit Task 220)`);
            }
            // [#220b] range === 'range' requires rangeMin and rangeMax
            if (sc.range === 'range') {
                if (typeof sc.rangeMin !== 'number' || typeof sc.rangeMax !== 'number') {
                    E(`[#220b] ${code}: speakerCount.range='range' requires numeric rangeMin and rangeMax (Audit Task 220)`);
                } else if (sc.rangeMin > sc.rangeMax) {
                    E(`[#220b] ${code}: speakerCount.rangeMin (${sc.rangeMin}) > rangeMax (${sc.rangeMax}) (Audit Task 220)`);
                }
            }
            // [#220c] year required and 4-digit; future-dated → ERROR
            if (typeof sc.year !== 'number' || sc.year < 1900 || sc.year > 2100) {
                E(`[#220c] ${code}: speakerCount.year "${sc.year}" not a 4-digit year (Audit Task 220)`);
            } else if (sc.year > 2026) {
                E(`[#220c] ${code}: speakerCount.year ${sc.year} is future-dated (Audit Task 220)`);
            }
            // [#220] source required (string)
            if (typeof sc.source !== 'string' || !sc.source.trim()) {
                E(`[#220] ${code}: speakerCount.source missing or empty (Audit Task 220)`);
            }
            // [#220] numeric fields must be numbers
            for (const k of ['l1', 'total', 'rangeMin', 'rangeMax', 'l1RangeMin', 'l1RangeMax']) {
                if (sc[k] !== undefined && (typeof sc[k] !== 'number' || sc[k] < 0)) {
                    E(`[#220] ${code}: speakerCount.${k} must be a non-negative number, got ${JSON.stringify(sc[k])} (Audit Task 220)`);
                }
            }
            // [#220] l1Range pair must be consistent
            if ((sc.l1RangeMin !== undefined) !== (sc.l1RangeMax !== undefined)) {
                E(`[#220] ${code}: speakerCount.l1RangeMin/l1RangeMax must come as a pair (Audit Task 220)`);
            }
            if (sc.l1RangeMin !== undefined && sc.l1RangeMax !== undefined && sc.l1RangeMin > sc.l1RangeMax) {
                E(`[#220] ${code}: speakerCount.l1RangeMin > l1RangeMax (Audit Task 220)`);
            }
            // [#220] vitality enum mirror (when present, must match meta.vitality if both set)
            if (sc.vitality !== undefined) {
                const allowed = new Set(['safe','vulnerable','definitely-endangered','severely-endangered','critically-endangered','extinct']);
                if (!allowed.has(sc.vitality)) {
                    E(`[#220] ${code}: speakerCount.vitality "${sc.vitality}" not in enum (Audit Task 220)`);
                }
            }
            // [#220] at least one numeric field required (l1, total, or range)
            const hasNumeric = sc.l1 !== undefined || sc.total !== undefined || sc.range === 'range' || sc.l1RangeMin !== undefined;
            if (!hasNumeric) {
                W(`[#220] ${code}: speakerCount has no numeric value (l1/total/rangeMin/l1RangeMin); structure is empty (Audit Task 220)`);
            }
            // [#220d] magnitude sanity: when both prose `meta.speakers` and
            // structured `speakerCount` are present, their order-of-magnitude
            // should agree. Catches off-by-1000 import bugs (e.g. "5K" prose
            // accidentally encoded as `l1: 5_000_000`). Only checks the
            // canonical numeric: l1 ?? total ?? rangeMax. Skip when either is
            // 0 (extinct), since prose like "Extinct" has no numeric to compare.
            if (m.speakers) {
                const canonical = sc.l1 ?? sc.total ?? sc.rangeMax ?? sc.l1RangeMax;
                if (typeof canonical === 'number' && canonical > 0) {
                    // Extract first M/K/B-tagged number from prose for comparison.
                    const proseStr = (typeof m.speakers === 'object'
                        ? (m.speakers.en || Object.values(m.speakers)[0] || '')
                        : String(m.speakers));
                    // Only check K/M/B-suffixed numbers — plain digits in
                    // prose can refer to ethnic population, year ranges, etc.
                    // (e.g. yux: prose mentions ~1,597 ethnic Kolyma but L1 is 50).
                    const um = proseStr.match(/(\d+(?:[.,]\d+)?)\s*([KMB])\b/i);
                    let proseN = null;
                    if (um) {
                        const n = parseFloat(um[1].replace(/,/g, ''));
                        const u = um[2].toUpperCase();
                        proseN = n * (u === 'B' ? 1e9 : u === 'M' ? 1e6 : 1e3);
                    }
                    if (typeof proseN === 'number' && proseN > 0) {
                        const ratio = canonical / proseN;
                        // Warn on >10× drift in either direction (off-by-magnitude bugs).
                        if (ratio > 10 || ratio < 0.1) {
                            W(`[#220d] ${code}: speakerCount canonical (${canonical.toLocaleString()}) drifts >10× from prose meta.speakers (~${proseN.toLocaleString()}) — possible import bug (Audit Task 220)`);
                        }
                    }
                }
            }
        }
    }
    // Audit Task 103/104: wordEvidence.formType enum (when present)
    // Audit Task 97 / 195: split evidence enum.
    //   Legacy stream names (Task 97): formEvidence / pronunciationEvidence / conceptEvidence
    //   Pilot stream names (Task 195): languageEvidence / pronunciationEvidence / semanticEvidence
    // Both are accepted by the validator. The pilot uses the new names
    // for clearer semantics (form is *language-shaped*; concept is
    // *semantic-shaped*); the legacy names are retained for the cells
    // already migrated under Task 97.
    if (lang.wordEvidence && typeof lang.wordEvidence === 'object') {
        const FT_ENUM = new Set(['free-word','bound-stem','root','inflected-form','phrase','reconstructed-root','agreement-stem','greeting-formula','thanks-formula','compound','light-verb-construction','connective-te','connective-eo-a']);
        const SPLIT_EV_ENUM = new Set(['direct','proxy','reconstructed','inferred','disputed','pedagogical','noted']);
        const LEGACY_SPLIT = ['formEvidence', 'pronunciationEvidence', 'conceptEvidence'];
        const PILOT_SPLIT  = ['languageEvidence', 'pronunciationEvidence', 'semanticEvidence'];
        const ALL_SPLIT    = new Set([...LEGACY_SPLIT, ...PILOT_SPLIT]);
        for (const k of Object.keys(lang.wordEvidence)) {
            const ev = lang.wordEvidence[k];
            if (!ev) continue;
            if (ev.formType !== undefined && !FT_ENUM.has(ev.formType)) {
                E(`[#13q] ${code}: wordEvidence.${k}.formType "${ev.formType}" not in enum (Audit Task 103/104)`);
            }
            // Audit Task 97 / 195: split-evidence enum check (when present)
            for (const split of ALL_SPLIT) {
                if (ev[split] !== undefined && !SPLIT_EV_ENUM.has(ev[split])) {
                    E(`[#13r] ${code}: wordEvidence.${k}.${split} "${ev[split]}" not in enum (Audit Task 97/195)`);
                }
            }
            // Audit Task 195: a cell that uses pilot stream names should
            // not also set legacy stream names. Mixing the two within a
            // single cell makes the modal renderer pick a non-deterministic
            // stream label. WARN so existing cells aren't broken.
            const usesPilot  = PILOT_SPLIT.some(s => ev[s] !== undefined && s !== 'pronunciationEvidence');
            const usesLegacy = LEGACY_SPLIT.some(s => ev[s] !== undefined && s !== 'pronunciationEvidence');
            if (usesPilot && usesLegacy) {
                W(`[#195] ${code}: wordEvidence.${k} mixes pilot (languageEvidence/semanticEvidence) and legacy (formEvidence/conceptEvidence) stream names — pick one (Audit Task 195)`);
            }
            // Audit Task 97: url must be http(s) when present
            if (ev.url !== undefined) {
                if (typeof ev.url !== 'string' || !/^https?:\/\//i.test(ev.url)) {
                    E(`[#13r] ${code}: wordEvidence.${k}.url "${ev.url}" not http(s) (Audit Task 97)`);
                }
            }
            // Audit Task 189: accessed required when url is present, must be
            // ISO 8601 (YYYY-MM-DD), and must not be future-dated.
            // Without accessed-on, link rot makes citations un-verifiable.
            if (ev.url !== undefined && ev.accessed === undefined) {
                W(`[#189] ${code}: wordEvidence.${k}.url is set but .accessed is missing — add ISO 8601 date (Audit Task 189)`);
            }
            if (ev.accessed !== undefined) {
                if (typeof ev.accessed !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(ev.accessed)) {
                    E(`[#189] ${code}: wordEvidence.${k}.accessed "${ev.accessed}" not ISO 8601 YYYY-MM-DD (Audit Task 189)`);
                } else {
                    // Future-dated → ERROR. Past > 1 year → INFO (review hint).
                    const today = new Date().toISOString().slice(0, 10);
                    if (ev.accessed > today) {
                        E(`[#189] ${code}: wordEvidence.${k}.accessed "${ev.accessed}" is in the future (today=${today}) (Audit Task 189)`);
                    } else {
                        const accessedDate = new Date(ev.accessed + 'T00:00:00Z');
                        const oneYearAgo = new Date();
                        oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);
                        if (accessedDate < oneYearAgo) {
                            // Hold quiet; counted in the coverage line below.
                        }
                    }
                }
            }
            // Audit Task 133: structured citation object (when present).
            // Migration-safe: legacy `source` string still supported, but
            // when `citation` is set it must follow the schema.
            if (ev.citation !== undefined) {
                const CIT_TYPE = new Set(['dictionary','grammar','inscription','wordlist','database','article','internal-review','reference']);
                const cit = ev.citation;
                if (!cit || typeof cit !== 'object') {
                    E(`[#13t] ${code}: wordEvidence.${k}.citation must be an object (Audit Task 133)`);
                } else {
                    if (!cit.short || typeof cit.short !== 'string') {
                        E(`[#13t] ${code}: wordEvidence.${k}.citation missing 'short' display label (Audit Task 133)`);
                    }
                    if (!cit.type || !CIT_TYPE.has(cit.type)) {
                        E(`[#13t] ${code}: wordEvidence.${k}.citation.type "${cit.type}" not in enum (Audit Task 133)`);
                    }
                    if (cit.year !== undefined && (typeof cit.year !== 'number' || cit.year < 0 || cit.year > 2100)) {
                        W(`[#13t] ${code}: wordEvidence.${k}.citation.year invalid (Audit Task 133)`);
                    }
                    if (cit.url !== undefined && (typeof cit.url !== 'string' || !/^https?:\/\//i.test(cit.url))) {
                        E(`[#13t] ${code}: wordEvidence.${k}.citation.url not http(s) (Audit Task 133)`);
                    }
                    // Audit Task 189: citation.accessed has the same rules
                    // as wordEvidence.accessed — required when citation.url
                    // is set, ISO 8601, not future-dated.
                    if (cit.url !== undefined && cit.accessed === undefined) {
                        W(`[#189] ${code}: wordEvidence.${k}.citation.url set but .citation.accessed missing (Audit Task 189)`);
                    }
                    if (cit.accessed !== undefined) {
                        if (typeof cit.accessed !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(cit.accessed)) {
                            E(`[#189] ${code}: wordEvidence.${k}.citation.accessed "${cit.accessed}" not ISO 8601 YYYY-MM-DD (Audit Task 189)`);
                        } else {
                            const today = new Date().toISOString().slice(0, 10);
                            if (cit.accessed > today) {
                                E(`[#189] ${code}: wordEvidence.${k}.citation.accessed "${cit.accessed}" is in the future (today=${today}) (Audit Task 189)`);
                            }
                        }
                    }
                }
            }
        }
    }
    // Audit Task 108: meta.reviewStatus enum
    if (m.reviewStatus !== undefined) {
        const RS_ENUM = new Set(['unreviewed','machine-seeded','human-reviewed','source-checked','needs-rebuild']);
        if (!RS_ENUM.has(m.reviewStatus)) E(`[#13p] ${code}: meta.reviewStatus "${m.reviewStatus}" not in enum (Audit Task 108)`);
        if (m.reviewStatus === 'source-checked' && !Array.isArray(m.sources) && !Array.isArray(m.references)) {
            W(`[#13p] ${code}: reviewStatus='source-checked' but no meta.sources or meta.references (Audit Task 108)`);
        }
    }
    // Audit Task 126: varietyRole enum
    if (m.varietyRole !== undefined) {
        const VR_ENUM = new Set(['base','base-variety','regional-variety','dialect','sibling-language','continuum-member','historical-stage']);
        if (!VR_ENUM.has(m.varietyRole)) E(`[#13n] ${code}: meta.varietyRole "${m.varietyRole}" not in enum (Audit Task 126)`);
        if (m.varietyRole === 'regional-variety' && !m.parentCode) {
            W(`[#13n] ${code}: varietyRole='regional-variety' should also set parentCode (Audit Task 126)`);
        }
    }
    // Audit Task 115: meta.disambiguator can be a plain string or {en, ja, ...} object
    if (m.disambiguator !== undefined) {
        if (typeof m.disambiguator === 'string') {
            // ok
        } else if (typeof m.disambiguator === 'object' && m.disambiguator) {
            if (!m.disambiguator.en || typeof m.disambiguator.en !== 'string') {
                W(`[#13m] ${code}: meta.disambiguator missing 'en' fallback (Audit Task 115)`);
            }
        } else {
            E(`[#13m] ${code}: meta.disambiguator must be string or object`);
        }
    }
    // Audit Task 119: scriptDisplayPolicy shape check (when present)
    if (lang.scriptDisplayPolicy !== undefined) {
        const sdp = lang.scriptDisplayPolicy;
        const PRIMARY = new Set(['modern-standard','romanization','scholarly-transcription','reconstructed-transcription']);
        const SECONDARY = new Set(['traditional-script','historical-script','none']);
        if (!sdp || typeof sdp !== 'object') {
            E(`[#13o-policy] ${code}: scriptDisplayPolicy must be an object (Audit Task 119)`);
        } else {
            if (sdp.primary && !PRIMARY.has(sdp.primary)) {
                E(`[#13o-policy] ${code}: scriptDisplayPolicy.primary "${sdp.primary}" not in enum (Audit Task 119)`);
            }
            if (sdp.secondary && !SECONDARY.has(sdp.secondary)) {
                E(`[#13o-policy] ${code}: scriptDisplayPolicy.secondary "${sdp.secondary}" not in enum (Audit Task 119)`);
            }
            if (sdp.secondary && sdp.secondary !== 'none' && (!sdp.note || !sdp.note.en)) {
                W(`[#13o-policy] ${code}: scriptDisplayPolicy.secondary set but no explanatory note.en (Audit Task 119)`);
            }
        }
    }
    // Audit Task 119 / user request 2026-05-06: altWordForms shape check
    if (lang.altWordForms !== undefined) {
        if (typeof lang.altWordForms !== 'object' || Array.isArray(lang.altWordForms)) {
            E(`[#13o] ${code}: altWordForms must be an object keyed by concept`);
        } else {
            const wordIds = new Set(ctx.WORD_LIST.map(w => w.id));
            for (const k of Object.keys(lang.altWordForms)) {
                if (!wordIds.has(k)) E(`[#13o] ${code}: altWordForms key "${k}" not a valid concept id`);
                const v = lang.altWordForms[k];
                if (!Array.isArray(v)) { E(`[#13o] ${code}: altWordForms.${k} must be an array`); continue; }
                for (const a of v) {
                    if (!a || typeof a !== 'object') { E(`[#13o] ${code}: altWordForms.${k} entry not an object`); continue; }
                    if (!a.form || typeof a.form !== 'string') E(`[#13o] ${code}: altWordForms.${k} missing 'form'`);
                    if (!a.script || typeof a.script !== 'string') W(`[#13o] ${code}: altWordForms.${k} missing 'script'`);
                    if (!a.source || typeof a.source !== 'string') W(`[#13o] ${code}: altWordForms.${k} missing 'source' (Audit Task 119: alt-script forms must be source-confirmed)`);
                }
            }
        }
    }
    // Audit Task 130: meta.scriptTags must be Array<string> from the allowed enum
    if (m.scriptTags !== undefined) {
        const SCRIPT_TAG_ENUM = new Set([
            'Latin','Han','Kana','Hangul','Cyrillic','Arabic-derived','Hebrew','Syriac','Brahmic','Tibetan','Greek',
            'Armenian','Georgian','Ethiopic','Coptic','Cherokee','Tifinagh','Yi','Canadian Aboriginal Syllabics',
            'Mongolian-derived','Cuneiform','Hieroglyphs','Aegean syllabary','Mayan','Old Turkic','Tangut',
            'Khitan','Jurchen','Aramaic-derived','Other historical','None / reconstructed','N\'Ko','Other'
        ]);
        if (!Array.isArray(m.scriptTags)) E(`[#13l] ${code}: meta.scriptTags is not an array (Audit Task 130)`);
        else for (const t of m.scriptTags) {
            if (!SCRIPT_TAG_ENUM.has(t)) W(`[#13l] ${code}: meta.scriptTags entry "${t}" not in enum (Audit Task 130)`);
        }
    }
    if (m.codeType !== undefined) {
        const allowed = new Set(['iso','regional-variant','historical-stage','pedagogical-stage','script-variant','constructed','custom']);
        if (!allowed.has(m.codeType)) E(`[#13i] ${code}: meta.codeType "${m.codeType}" not in enum`);
    }
    // Audit Task 109: underscore codes need a non-iso codeType + ideally parentCode/historical-stage
    if (code.includes('_')) {
        if (!m.codeType) {
            W(`[#13i] ${code}: underscore code lacks meta.codeType (Audit Task 109)`);
        } else if (m.codeType === 'iso') {
            W(`[#13i] ${code}: underscore code can't have codeType='iso'`);
        } else if (m.codeType === 'regional-variant' && !m.parentCode) {
            // ja_mvi/ja_rys are regional-variant but might be ISO 639-3 of their own; tolerate
            // when canonicalCode exists and differs from parent
        }
    }
    if (m.canonicalCode && m.iso6393 && m.canonicalCode !== m.iso6393) {
        W(`[#13i] ${code}: canonicalCode='${m.canonicalCode}' disagrees with iso6393='${m.iso6393}'`);
    }
    if (m.baseLang !== undefined && !ctx.LANG_DATA[m.baseLang]) {
        E(`[#13e] ${code}: meta.baseLang "${m.baseLang}" not in LANG_DATA`);
    }
    if (lang.locationBasis !== undefined) {
        if (!LOCATION_BASIS.has(lang.locationBasis)) {
            E(`${code}: locationBasis "${lang.locationBasis}" not in enum`);
        } else {
            W(`[#13f] ${code}: top-level locationBasis is deprecated — use meta.locationBasis (Audit Task 131)`);
        }
    }
    if (m.locationBasis !== undefined && !LOCATION_BASIS.has(m.locationBasis)) {
        E(`[#13f] ${code}: meta.locationBasis "${m.locationBasis}" not in enum`);
    }
    if (lang.locationBasis && m.locationBasis && lang.locationBasis !== m.locationBasis) {
        W(`[#13f] ${code}: lang.locationBasis="${lang.locationBasis}" differs from meta.locationBasis="${m.locationBasis}" — meta is canonical (Audit Task 99/131)`);
    }
    if (m.sources !== undefined) {
        if (!Array.isArray(m.sources)) E(`${code}: meta.sources is not an array`);
        else {
            for (const s of m.sources) {
                if (!s || typeof s !== 'object' || !s.type || !s.title) {
                    E(`${code}: meta.sources entry missing type/title: ${JSON.stringify(s)}`);
                }
                // Audit Task 96: only allow http/https URLs in sources;
                // anything else (javascript:, data:, mailto:, etc.) is rejected
                // because the modal turns URLs into <a href> targets.
                if (s && s.url && !/^https?:\/\//i.test(s.url)) {
                    E(`[#13j'] ${code}: meta.sources URL "${s.url}" not http(s) — rejected (Audit Task 96)`);
                }
            }
            withSources++;
        }
    }
    // Audit Task 91: detect references vs sources drift. References is the
    // legacy string-only display field; sources is the structured canonical
    // field. Both renderable in the modal footer, but flag duplicates and
    // disagreements for cleanup.
    if (Array.isArray(m.references) && Array.isArray(m.sources)) {
        const refTitles = new Set(m.references.map(r => typeof r === 'string' ? r : (r && r.title) || ''));
        const srcTitles = new Set(m.sources.map(s => (s && s.title) || ''));
        for (const t of refTitles) {
            if (t && srcTitles.has(t)) {
                W(`[#13j] ${code}: "${t}" appears in both meta.references and meta.sources — drop the references duplicate (Audit Task 91)`);
            }
        }
    }
}

// ---- 13c. dataStatus breakdown + DATA_STATUS_OVERRIDES sanity ----------
// Per wordmap-check-3.md §11. Tally meta.dataStatus values across all
// languages, and verify every code in DATA_STATUS_OVERRIDES exists in
// LANG_DATA (a typo there silently disables the override).
const dataStatusCounts = {};
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    const s = m.dataStatus || 'modern';  // unset = modern by default
    dataStatusCounts[s] = (dataStatusCounts[s] || 0) + 1;
}
if (typeof ctx.DATA_STATUS_OVERRIDES !== 'undefined') {
    for (const c of Object.keys(ctx.DATA_STATUS_OVERRIDES)) {
        if (!ctx.LANG_DATA[c]) E(`DATA_STATUS_OVERRIDES has code "${c}" not in LANG_DATA`);
    }
    // ---- 16. HIST_DESCENDANT codes must have DATA_STATUS_OVERRIDES entry --
    // Per Session 27: ensures historical languages don't silently default to
    // 'modern' in dataStatus stats (HIST_DESCENDANT membership doesn't auto-
    // promote). Adding a new historical lang requires explicit classification.
    const dsoKeys = new Set(Object.keys(ctx.DATA_STATUS_OVERRIDES));
    const histMissing = HIST_KEYS.filter(c => ctx.LANG_DATA[c] && !dsoKeys.has(c));
    for (const c of histMissing) {
        W(`[#16] ${c}: in HIST_DESCENDANT but missing DATA_STATUS_OVERRIDES entry — ` +
          `defaults to 'modern' in stats (Session 27 normalization invariant)`);
    }
    // ---- 17. DATA_STATUS_OVERRIDES (non-modern) → must be in HIST_DESCENDANT ----
    // Per Session 28 #4 / Session 29: complementary invariant to check #16.
    // If a code has dataStatus=fragmentary/attested/partly-understood/etc but
    // isn't in HIST_DESCENDANT, the UI's "modern/historical" filter will
    // misclassify it (e.g. show in modern list despite being historical).
    const histSet = new Set(HIST_KEYS);
    for (const [c, status] of Object.entries(ctx.DATA_STATUS_OVERRIDES)) {
        if (status === 'modern') continue;  // 'modern' override is consistent with non-HIST
        if (!ctx.LANG_DATA[c]) continue;    // already caught by check #13c above
        if (!histSet.has(c)) {
            W(`[#17] ${c}: DATA_STATUS_OVERRIDES = '${status}' but NOT in HIST_DESCENDANT — ` +
              `UI filter will treat as modern (Session 29 inverse invariant)`);
        }
    }
}

// ---- 18. wordEvidence schema validation (Schema Revolution Phase 2) -----
// Per-cell evidence overlay: each lang may have `wordEvidence: { <concept>: {evidence, source?, note?} }`.
// Validate: (a) concept keys exist in words; (b) evidence is in the enum.
const VALID_EVIDENCE = new Set(['direct', 'proxy', 'reconstructed', 'inferred', 'disputed', 'pedagogical']);
let wordEvidenceLangs = 0;
let wordEvidenceCells = 0;
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    if (!lang.wordEvidence) continue;
    wordEvidenceLangs++;
    for (const [concept, ev] of Object.entries(lang.wordEvidence)) {
        wordEvidenceCells++;
        if (!lang.words || !(concept in lang.words)) {
            E(`[#18] ${code}.wordEvidence: concept "${concept}" not in words`);
        }
        if (!ev || typeof ev !== 'object') {
            E(`[#18] ${code}.wordEvidence.${concept}: not an object`);
            continue;
        }
        if (!VALID_EVIDENCE.has(ev.evidence)) {
            E(`[#18] ${code}.wordEvidence.${concept}: evidence "${ev.evidence}" not in enum (${[...VALID_EVIDENCE].join('|')})`);
        }
    }
}
if (wordEvidenceLangs > 0) I(`wordEvidence overlay: ${wordEvidenceLangs} languages, ${wordEvidenceCells} cells annotated (Schema Revolution Phase 2)`);
if (withPronType > 0) {
    const breakdown = Object.entries(pronTypeCounts).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}=${v}`).join(', ');
    I(`pronunciationType coverage: ${withPronType}/${codes.length} languages (${breakdown}) — Audit Task 76`);
}
// Audit Task 104: phrase-vs-word policy.
// Multiword cells (containing a space in the surface form) are normal for
// hello/thanks/eat/drink in many languages but suspicious for typically
// lexical concepts like water/fire/tree/hand/eye/one. Warn only the latter.
const LEXICAL_CONCEPTS = new Set(['water','fire','tree','hand','eye','one','sun','moon','heart','dog','cat','house']);
const phraseCounts = {};
for (const code of codes) {
    const lang = ctx.LANG_DATA[code];
    const wEv = lang.wordEvidence || {};
    for (const w of ctx.WORD_LIST) {
        const e = lang.words && lang.words[w.id];
        if (!Array.isArray(e)) continue;
        const surf = e[0] || '';
        if (!surf || surf === '—') continue;
        if (!/\s/.test(surf)) continue;
        phraseCounts[w.id] = (phraseCounts[w.id] || 0) + 1;
        if (LEXICAL_CONCEPTS.has(w.id)) {
            const ev = wEv[w.id];
            const hasFormType = ev && (ev.formType === 'phrase' || ev.formType === 'compound' || ev.formType === 'light-verb-construction');
            const hasNote = ev && ev.note;
            if (!hasFormType && !hasNote) {
                W(`[#13s] ${code}.${w.id}: lexical concept has multiword value "${surf}" but no wordEvidence.formType / note (Audit Task 104)`);
            }
        }
    }
}
{
    const breakdown = Object.entries(phraseCounts).sort((a,b)=>b[1]-a[1])
        .map(([k,n])=>`${k}=${n}`).join(', ');
    if (breakdown) I(`multiword surface forms by concept: ${breakdown} (Audit Task 104)`);
}

// === Script/font rendering audit (Audit Task 116) ====================
// Detect which Unicode scripts the data uses, then warn when a script
// appears but the font stack in wordmap.html doesn't load a font that
// covers it. This catches "tofu" (missing-glyph) regressions when fonts
// are reorganized or when a new script is added without font coverage.
{
    // Map Unicode block prefix → human script name → required font family
    const SCRIPT_FONT = [
        { name: 'Tangut',                range: /[\u{17000}-\u{187FF}\u{18800}-\u{18AFF}]/u, font: 'Noto Serif Tangut' },
        { name: 'Khitan Small Script',   range: /[\u{18B00}-\u{18CFF}]/u,                    font: 'Noto Sans Khitan Small Script' },
        { name: 'Manichaean',            range: /[\u{10AC0}-\u{10AFF}]/u,                    font: 'Noto Sans Manichaean' },
        { name: 'Coptic',                range: /[Ⲁ-⳿\u{102E0}-\u{102FF}]/u,       font: 'Noto Sans Coptic' },
        { name: 'Egyptian Hieroglyphs',  range: /[\u{13000}-\u{1342F}]/u,                    font: 'Noto Sans Egyptian Hieroglyphs' },
        { name: 'Meroitic',              range: /[\u{10980}-\u{109FF}]/u,                    font: 'Noto Sans Meroitic' },
        { name: 'Old Turkic',            range: /[\u{10C00}-\u{10C4F}]/u,                    font: 'Noto Sans Old Turkic' },
        { name: 'Mongolian',             range: /[᠀-᢯]/u,                          font: 'Noto Sans Mongolian' },
        { name: 'Sogdian',               range: /[\u{10F30}-\u{10F6F}]/u,                    font: 'Noto Sans Sogdian' },
        { name: 'Phags-pa',              range: /[ꡀ-꡿]/u,                          font: 'Noto Sans Phags Pa' },
        { name: 'Tibetan',               range: /[ༀ-࿿]/u,                          font: 'Noto Serif Tibetan' },
        { name: 'Tagalog',               range: /[ᜀ-ᜟ]/u,                          font: 'Noto Sans Tagalog' },
        { name: 'Sundanese',             range: /[ᮀ-ᮿ]/u,                          font: 'Noto Sans Sundanese' },
        { name: 'New Tai Lue',           range: /[ᦀ-᧟]/u,                          font: 'Noto Sans New Tai Lue' },
    ];
    const fontStackMatch = htmlSrc.match(/font-family:[^;}]+/g) || [];
    const fontStack = fontStackMatch.join(' ');
    const usedScripts = new Set();
    for (const code of codes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        const native = ctx.LANG_DATA[code]?.native || '';
        const sample = native + ' ' + Object.values(w).flat().join(' ');
        for (const s of SCRIPT_FONT) {
            if (s.range.test(sample)) usedScripts.add(s.name);
        }
    }
    if (usedScripts.size > 0) {
        I(`scripts in use: ${[...usedScripts].sort().join(', ')} (Audit Task 116)`);
    }
    for (const s of SCRIPT_FONT) {
        if (!usedScripts.has(s.name)) continue;
        if (fontStack.indexOf(s.font) === -1) {
            W(`[#116] script ${s.name} appears in data but wordmap.html font stack lacks "${s.font}" (Audit Task 116)`);
        }
    }
    // NFC normalization check: warn if any cell has un-normalized Unicode
    let nfcIssues = 0;
    for (const code of codes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            for (const v of w[k]) {
                if (typeof v === 'string' && v && v.normalize('NFC') !== v) {
                    nfcIssues++;
                    if (nfcIssues <= 3) W(`[#116] ${code}.${k}: word value not in Unicode NFC form (Audit Task 116)`);
                }
            }
        }
    }
    if (nfcIssues > 3) W(`[#116] (${nfcIssues - 3} more NFC issues — fix all)`);
}

// === ASCII uppercase A-Z residue in 'ipa'-tagged rows (Audit Task 160) ===
// Strict IPA has no ASCII uppercase letters. The IPA small-caps (ɴ ɪ ʏ ʊ ʟ ɢ ʀ
// ʁ ɶ etc.) are all U+02xx codepoints, not ASCII A-Z, so flagging A-Z catches
// real residue (Pass-2 leftover capital N, Baxter-Sagart X/H tone letters).
// 'mixed'/'romanization'/'broad'/'orthography' rows are exempt — they
// legitimately carry transcription conventions outside strict IPA.
{
    const ipaCodes = codes.filter(c => ctx.LANG_DATA[c]?.meta?.pronunciationType === 'ipa');
    let asciiResidue = 0;
    for (const code of ipaCodes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const ipa = w[k][1];
            if (typeof ipa !== 'string' || ipa === '—' || !ipa) continue;
            if (/[A-Z]/.test(ipa)) {
                asciiResidue++;
                if (asciiResidue <= 5) W(`[#160] ${code}.${k}: ASCII uppercase A-Z in IPA "${ipa}" — strict IPA uses small-cap codepoints (Audit Task 160)`);
            }
        }
    }
    if (asciiResidue > 5) W(`[#160] (${asciiResidue - 5} more ASCII-A-Z residue cells in 'ipa' rows)`);
}

// === Affricate tie-bar enforcement for 'ipa'-tagged rows (Audit Task 163) ===
// Strict IPA requires t͡s/d͡z/t͡ʃ/d͡ʒ/t͡ɕ/d͡ʑ/t͡ʂ/d͡ʐ (with U+0361 COMBINING DOUBLE
// INVERTED BREVE) instead of bare ASCII digraphs. Apply only to rows whose
// pronunciationType is 'ipa'. Rows tagged 'broad'/'romanization'/'orthography'
// or untagged are exempt — broad transcription legitimately uses bare digraphs.
{
    const ipaCodes = codes.filter(c => ctx.LANG_DATA[c]?.meta?.pronunciationType === 'ipa');
    const affricates = ['ts','dz','tʃ','dʒ','tɕ','dʑ','tʂ','dʐ'];
    let bareCount = 0, totalIpaCells = 0, tieBarredCells = 0;
    for (const code of ipaCodes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const ipa = w[k][1];
            if (typeof ipa !== 'string' || ipa === '—' || !ipa) continue;
            totalIpaCells++;
            if (ipa.indexOf('͡') !== -1) tieBarredCells++;
            for (const a of affricates) {
                let idx = -1;
                while ((idx = ipa.indexOf(a, idx+1)) !== -1) {
                    // Skip if already tie-barred (preceded by U+0361)
                    if (idx > 0 && ipa.charCodeAt(idx-1) === 0x0361) continue;
                    bareCount++;
                    if (bareCount <= 5) W(`[#163] ${code}.${k}: bare ASCII affricate "${a}" in IPA "${ipa}" — strict IPA requires tie-bar (Audit Task 163)`);
                    break;
                }
            }
        }
    }
    if (bareCount > 5) W(`[#163] (${bareCount - 5} more bare-affricate issues in 'ipa' rows — fix all)`);
    I(`affricate tie-bar coverage: ${tieBarredCells}/${totalIpaCells} cells in 'ipa' rows contain U+0361 (Audit Task 163)`);
}

// === Reconstructed-form notation consistency (Audit Task 164) ===
// Option C: surface keeps `*` reconstruction marker and `-` bound-stem suffix;
// IPA strips both. Logographic-surface rows (Chinese characters as surface)
// are exempt — they cannot carry `*`, so the IPA column is the only place to
// signal reconstruction. Enforce only when surface uses Latin script.
{
    const dso = ctx.DATA_STATUS_OVERRIDES || {};
    const reconCodes = codes.filter(c => {
        const m = ctx.LANG_DATA[c]?.meta;
        return (m && m.dataStatus === 'reconstructed') || dso[c] === 'reconstructed';
    });
    let inconsistencies = 0;
    for (const code of reconCodes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const [s, i] = w[k];
            if (s === '—' || i === '—' || !s || !i) continue;
            // Skip logographic-surface rows: surface contains CJK characters
            if (/[一-鿿]/.test(s)) continue;
            const sStar = s.startsWith('*');
            const iStar = i.startsWith('*');
            const sDash = s.endsWith('-');
            const iDash = i.endsWith('-');
            if (sStar && iStar) {
                inconsistencies++;
                if (inconsistencies <= 5) W(`[#164] ${code}.${k}: both surface "${s}" and IPA "${i}" carry "*" — Option C strips from IPA (Audit Task 164)`);
            }
            if (sDash && iDash) {
                inconsistencies++;
                if (inconsistencies <= 5) W(`[#164] ${code}.${k}: both surface "${s}" and IPA "${i}" carry trailing "-" — Option C strips from IPA (Audit Task 164)`);
            }
        }
    }
    if (inconsistencies > 5) W(`[#164] (${inconsistencies - 5} more recon-notation issues — fix all)`);
    I(`reconstructed-form notation: ${reconCodes.length} 'reconstructed' rows audited (Option C: */- in surface only) (Audit Task 164)`);
}

// === Underscore-code parentCode/varietyRole completeness (Audit Task 170) ===
// Every underscore code (regional variant or historical stage) must have either
// `parentCode` (regional variant of an attested parent) or `varietyRole`
// (sibling-language / continuum-member / base-variety / historical-stage).
{
    const VARIETY_ROLE_ENUM = new Set(['base','base-variety','regional-variety','dialect','sibling-language','continuum-member','historical-stage']);
    const underscoreCodes = codes.filter(c => c.includes('_'));
    let missingTotal = 0;
    let badParent = 0;
    let badRole = 0;
    for (const code of underscoreCodes) {
        const m = ctx.LANG_DATA[code]?.meta;
        if (!m) continue;
        const hasParent = m.parentCode !== undefined;
        const hasRole = m.varietyRole !== undefined;
        if (!hasParent && !hasRole) {
            missingTotal++;
            if (missingTotal <= 5) W(`[#170] ${code}: underscore code without parentCode or varietyRole (Audit Task 170)`);
        }
        if (hasParent && !ctx.LANG_DATA[m.parentCode]) {
            badParent++;
            W(`[#170] ${code}: parentCode='${m.parentCode}' not in LANG_DATA (Audit Task 170)`);
        }
        if (hasRole && !VARIETY_ROLE_ENUM.has(m.varietyRole)) {
            badRole++;
            W(`[#170] ${code}: varietyRole='${m.varietyRole}' not in enum (Audit Task 170)`);
        }
    }
    if (missingTotal > 5) W(`[#170] (${missingTotal - 5} more underscore codes missing parentCode/varietyRole)`);
    const covered = underscoreCodes.length - missingTotal;
    I(`underscore-code parentCode/varietyRole coverage: ${covered}/${underscoreCodes.length} (Audit Task 170)`);
}

// === Tone-bar within-row notation consistency (Audit Task 187) ===
// A row that mixes single (˥) and doubled (˥˥) level tones for the SAME pitch is
// internally inconsistent. Pass 32 normalized 11 tonal rows to doubled; warn if
// any future edit reintroduces the mix.
{
    let mixed = 0;
    for (const code of codes) {
        const w = ctx.LANG_DATA[code]?.words || {};
        const singles = new Set(), doubles = new Set();
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const ipa = w[k][1];
            if (typeof ipa !== 'string') continue;
            const runs = ipa.match(/[˥˦˧˨˩]+/g) || [];
            for (const r of runs) {
                if (r.length === 1) singles.add(r);
                else if (r.length === 2 && r[0] === r[1]) doubles.add(r);
            }
        }
        for (const s of singles) if (doubles.has(s + s)) {
            mixed++;
            if (mixed <= 5) W(`[#187] ${code}: row mixes "${s}" and "${s+s}" level-tone notations (Audit Task 187)`);
            break;
        }
    }
    if (mixed > 5) W(`[#187] (${mixed - 5} more rows mix single/doubled tone letters)`);
}

// === Disambiguator coverage for shared-native-name pairs (Audit Task 188) ===
{
    const byNative = {};
    for (const code of codes) {
        const native = ctx.LANG_DATA[code]?.native;
        if (!native) continue;
        if (!byNative[native]) byNative[native] = [];
        byNative[native].push(code);
    }
    let covered = 0, total = 0, missing = 0;
    for (const native of Object.keys(byNative)) {
        const group = byNative[native];
        if (group.length < 2) continue;
        for (const code of group) {
            total++;
            const m = ctx.LANG_DATA[code]?.meta;
            if (m && m.disambiguator) covered++;
            else {
                missing++;
                if (missing <= 5) W(`[#188] ${code}: shares native name "${native}" with ${group.filter(c=>c!==code).join('/')} but has no meta.disambiguator (Audit Task 188)`);
            }
        }
    }
    if (missing > 5) W(`[#188] (${missing - 5} more shared-native rows missing disambiguator)`);
    I(`disambiguator coverage on shared-native rows: ${covered}/${total} (Audit Task 188)`);
}

// === Vitality coverage (Audit Task 190) ===
{
    const VITALITY_ENUM = new Set(['safe','vulnerable','definitely-endangered','severely-endangered','critically-endangered','extinct','unknown']);
    const counts = {};
    let total = 0, missing = 0, badEnum = 0;
    for (const code of codes) {
        const m = ctx.LANG_DATA[code]?.meta;
        if (!m) continue;
        const v = m.vitality;
        if (!v) {
            missing++;
            if (missing <= 5) W(`[#190] ${code}: missing meta.vitality (Audit Task 190)`);
            continue;
        }
        if (!VITALITY_ENUM.has(v)) {
            badEnum++;
            if (badEnum <= 5) W(`[#190] ${code}: meta.vitality '${v}' not in enum (Audit Task 190)`);
            continue;
        }
        counts[v] = (counts[v] || 0) + 1;
        total++;
    }
    if (missing > 5) W(`[#190] (${missing - 5} more rows missing vitality)`);
    if (badEnum > 5) W(`[#190] (${badEnum - 5} more rows with bad vitality enum)`);
    const breakdown = Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `${k}=${v}`).join(', ');
    I(`vitality coverage: ${total}/${codes.length} (${breakdown}) (Audit Task 190)`);
}

// === Multi-word formType coverage (Audit Task 194) ===
{
    let total = 0, withFt = 0, missing = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        if (!lang) continue;
        const w = lang.words || {};
        const we = lang.wordEvidence || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const surface = w[k][0];
            if (typeof surface !== 'string' || surface === '—' || !/\s/.test(surface)) continue;
            total++;
            if (we[k] && we[k].formType) withFt++;
            else {
                missing++;
                if (missing <= 5) W(`[#194] ${code}.${k}: multi-word surface "${surface}" without formType (Audit Task 194)`);
            }
        }
    }
    if (missing > 5) W(`[#194] (${missing - 5} more multi-word cells without formType)`);
    I(`multi-word formType coverage: ${withFt}/${total} (Audit Task 194)`);
}

// === RTL textDirection backfill audit (Audit Task 193) ===
// Detect rows whose surface uses RTL Unicode blocks; verify meta.textDirection='rtl'
// is set (the runtime initializer in wordmap_meta.js does this automatically).
{
    const RTL_RE = /[֐-׿؀-ۿ܀-ݏݐ-ݿހ-޿߀-߿ࠀ-࠿ࡀ-࡟ࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
    let rtlCount = 0, rtlMarked = 0, missing = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        if (!lang) continue;
        const w = lang.words || {};
        let isRtl = false;
        for (const k of Object.keys(w)) {
            if (Array.isArray(w[k]) && typeof w[k][0] === 'string' && RTL_RE.test(w[k][0])) { isRtl = true; break; }
        }
        if (!isRtl) continue;
        rtlCount++;
        const td = lang.meta && lang.meta.textDirection;
        if (td === 'rtl') rtlMarked++;
        else {
            missing++;
            if (missing <= 5) W(`[#193] ${code}: surface uses RTL script but meta.textDirection != 'rtl' (Audit Task 193)`);
        }
    }
    if (missing > 5) W(`[#193] (${missing - 5} more RTL rows missing textDirection)`);
    I(`textDirection='rtl' coverage: ${rtlMarked}/${rtlCount} RTL-script rows (Audit Task 193)`);
}

// === formType coverage for hyphen/star surface cells (Audit Task 191) ===
// Surface forms starting with '*' or ending with '-' or starting with '-' should
// have wordEvidence.formType set ('reconstructed-root' / 'bound-stem' / etc.).
{
    let total = 0, withForm = 0, missing = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        if (!lang) continue;
        const w = lang.words || {};
        const we = lang.wordEvidence || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const surface = w[k][0];
            if (typeof surface !== 'string' || surface === '—') continue;
            if (!/^\*|^-|-$/.test(surface)) continue;
            total++;
            if (we[k] && we[k].formType) withForm++;
            else {
                missing++;
                if (missing <= 5) W(`[#191] ${code}.${k}: hyphen/star surface "${surface}" without wordEvidence.formType (Audit Task 191)`);
            }
        }
    }
    if (missing > 5) W(`[#191] (${missing - 5} more hyphen/star cells without formType)`);
    I(`formType coverage on hyphen/star cells: ${withForm}/${total} (Audit Task 191)`);
}

// === Unattested-cell reason documentation (Audit Task 162) ===
// Every `—` cell must have meta.unattestedReason[concept] set to one of the
// allowed reasons. The runtime initializer in wordmap_meta.js applies sensible
// defaults so this should be 0 missing in normal operation; warn if any cell
// slipped through (e.g., a new `—` added without re-running the initializer).
{
    const REASON_ENUM = new Set(['cultural-absence','unsourced','recent-loanword','has-only-derived-form','unknown']);
    let dashTotal = 0, withReason = 0, badEnum = 0, missing = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        if (!lang) continue;
        const w = lang.words || {};
        const reasons = lang.meta?.unattestedReason || {};
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k]) || w[k][0] !== '—') continue;
            dashTotal++;
            const r = reasons[k];
            if (!r) {
                missing++;
                if (missing <= 5) W(`[#162] ${code}.${k}: '—' cell without meta.unattestedReason (Audit Task 162)`);
            } else if (!REASON_ENUM.has(r)) {
                badEnum++;
                if (badEnum <= 5) W(`[#162] ${code}.${k}: meta.unattestedReason='${r}' not in enum (Audit Task 162)`);
            } else {
                withReason++;
            }
        }
    }
    if (missing > 5) W(`[#162] (${missing - 5} more '—' cells without unattestedReason)`);
    if (badEnum > 5) W(`[#162] (${badEnum - 5} more cells with bad enum value)`);
    I(`unattestedReason coverage: ${withReason}/${dashTotal} '—' cells documented (Audit Task 162)`);
}

// === source-checked rows must have ~20-cell wordEvidence coverage (Audit Task 173) ===
// Per audit: source-checked is a strong claim and should be backed by per-cell evidence.
// WARN when a row claims source-checked but has < 20 cells annotated. Coverage info shows
// the gap so reviewers can prioritize backfill.
{
    let scTotal = 0, scFull = 0, scShort = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const m = lang?.meta || {};
        if (m.reviewStatus !== 'source-checked') continue;
        scTotal++;
        const we = lang?.wordEvidence || {};
        const weCount = Object.keys(we).length;
        if (weCount >= 20) {
            scFull++;
        } else {
            scShort++;
            if (scShort <= 5) W(`[#173] ${code}: reviewStatus='source-checked' but only ${weCount}/20 cells of wordEvidence (Audit Task 173)`);
        }
    }
    if (scShort > 5) W(`[#173] (${scShort - 5} more 'source-checked' rows with < 20-cell wordEvidence — backfill needed)`);
    I(`source-checked wordEvidence coverage: ${scFull}/${scTotal} rows with full 20-cell evidence (Audit Task 173)`);
}

// === Split evidence schemas adoption (Audit Task 195) ===
// Tracks how many wordEvidence cells use the split form vs the legacy
// unified `{ evidence, source }` form. Two stream-naming conventions are
// counted separately so the team can see the pilot landing:
//   - legacy   (Task 97):  formEvidence / pronunciationEvidence / conceptEvidence
//   - pilot    (Task 195): languageEvidence / pronunciationEvidence / semanticEvidence
// `pronunciationEvidence` is shared between the two; for stream
// identification we look at the form/concept slot names.
// Coverage of `pilot` languages is tracked too (target: 5 languages
// per the Task 195 pilot scope). Once 5 languages × 20 cells use the
// pilot form, the validator can flip the legacy-form INFO into WARN.
{
    let splitCount = 0;
    let legacyCount = 0;
    let pilotCount = 0;
    let unifiedCount = 0;
    let totalCells = 0;
    let citationCount = 0;
    const pilotLangs = new Set();
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const we = lang?.wordEvidence;
        if (!we || typeof we !== 'object') continue;
        for (const k of Object.keys(we)) {
            const ev = we[k];
            if (!ev || typeof ev !== 'object') continue;
            totalCells += 1;
            const hasLegacySplit = ev.formEvidence !== undefined ||
                                   ev.conceptEvidence !== undefined;
            const hasPilotSplit  = ev.languageEvidence !== undefined ||
                                   ev.semanticEvidence !== undefined;
            const hasAnySplit    = hasLegacySplit || hasPilotSplit ||
                                   ev.pronunciationEvidence !== undefined;
            const hasUnified     = ev.evidence !== undefined;
            if (hasAnySplit) splitCount += 1;
            if (hasLegacySplit) legacyCount += 1;
            if (hasPilotSplit) {
                pilotCount += 1;
                pilotLangs.add(code);
            }
            if (!hasAnySplit && hasUnified) unifiedCount += 1;
            if (ev.citation !== undefined) citationCount += 1;
        }
    }
    I(`split-evidence adoption: ${splitCount}/${totalCells} cells use split schema (legacy=${legacyCount}, pilot=${pilotCount}); ${unifiedCount} still on unified { evidence, source } form (Audit Task 97/195)`);
    I(`split-evidence pilot coverage: ${pilotLangs.size}/5 pilot languages adopted (Audit Task 195)`);
    if (pilotLangs.size > 0) {
        I(`  pilot languages: ${[...pilotLangs].slice(0, 10).join(', ')}${pilotLangs.size > 10 ? `, …${pilotLangs.size - 10} more` : ''}`);
    }
    I(`structured citation adoption: ${citationCount}/${totalCells} cells use citation object (Audit Task 133/195)`);
}

// === Runtime overlay → static migration tracker (Audit Task 192) ===
// Detects each `for (const code of Object.keys(<MAP>))` overlay setter
// pattern still present in wordmap_meta.js. Each detected pattern is a
// candidate for static migration. INFO-level so existing setters keep
// running; the team can promote to WARN as overlays are migrated.
{
    const fs = require('fs');
    let metaSrc = '';
    try { metaSrc = fs.readFileSync('wordmap_meta.js', 'utf-8'); }
    catch (e) { /* skip if file unreadable */ }
    if (metaSrc) {
        const overlayPattern = /for \(const code of Object\.keys\(([A-Z_]+)\)\)/g;
        const found = new Set();
        let m;
        while ((m = overlayPattern.exec(metaSrc)) !== null) found.add(m[1]);
        // Filter out non-overlay loops (overlays write into LANG_DATA[code].meta.X)
        const KNOWN_OVERLAYS = [
            'PRONUNCIATION_TYPE', 'COVERAGE', 'LOCATION_BASIS_OVERRIDES',
            'SURFACE_TYPE', 'LANGUAGE_KIND', 'CANONICAL_CODE', 'ALIASES',
            'FORM_TYPE_OVERLAY', 'SPEAKER_BACKFILL', 'UNATTESTED_REASON_DEFAULTS',
            'REVIEW_STATUS', 'VARIETY_REL', 'DISAMBIGUATORS', 'SOURCE_BACKFILL',
            'SCRIPT_TAGS', 'DESC_JKZ', 'DATA_STATUS_OVERRIDES',
        ];
        const remaining = KNOWN_OVERLAYS.filter(o => found.has(o));
        const migrated = KNOWN_OVERLAYS.filter(o => !found.has(o));
        I(`runtime overlay maps remaining: ${remaining.length}/${KNOWN_OVERLAYS.length} (Audit Task 192)`);
        if (migrated.length > 0) {
            I(`  migrated: ${migrated.join(', ')}`);
        }
        if (remaining.length > 0) {
            I(`  remaining: ${remaining.join(', ')}`);
        }
    }
}

// === wordEvidence.accessed ISO 8601 backfill (Audit Task 189) ===
// Tracks coverage of `accessed` dates across all wordEvidence cells
// that carry a `url`. Promote the WARN to ERROR once Phase 1 backfill
// reaches 100%. Stale-date INFO is a hint to re-verify.
{
    let urlCells = 0;
    let urlWithAccessed = 0;
    let staleDates = 0;
    let citationUrls = 0;
    let citationUrlWithAccessed = 0;
    const today = new Date().toISOString().slice(0, 10);
    const oneYearAgoStr = (() => {
        const d = new Date();
        d.setUTCFullYear(d.getUTCFullYear() - 1);
        return d.toISOString().slice(0, 10);
    })();
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const we = lang?.wordEvidence;
        if (!we || typeof we !== 'object') continue;
        for (const k of Object.keys(we)) {
            const ev = we[k];
            if (!ev || typeof ev !== 'object') continue;
            if (ev.url) {
                urlCells += 1;
                if (typeof ev.accessed === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(ev.accessed)) {
                    urlWithAccessed += 1;
                    if (ev.accessed < oneYearAgoStr) staleDates += 1;
                }
            }
            if (ev.citation && typeof ev.citation === 'object' && ev.citation.url) {
                citationUrls += 1;
                if (typeof ev.citation.accessed === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(ev.citation.accessed)) {
                    citationUrlWithAccessed += 1;
                    if (ev.citation.accessed < oneYearAgoStr) staleDates += 1;
                }
            }
        }
    }
    const totalUrls = urlCells + citationUrls;
    const totalWithAccessed = urlWithAccessed + citationUrlWithAccessed;
    I(`wordEvidence.accessed coverage: ${totalWithAccessed}/${totalUrls} URL-bearing cells have accessed date (wordEvidence=${urlWithAccessed}/${urlCells}, citation=${citationUrlWithAccessed}/${citationUrls}) (Audit Task 189)`);
    if (staleDates > 0) {
        I(`  ${staleDates} accessed date(s) older than 1 year — consider re-verifying source URL (today=${today})`);
    }
}

// === reviewStatus distribution + consistency (Audit Task 172) ===
// Every row should have an explicit reviewStatus after the 172 backfill.
// Cross-check: rows with rich evidence (sources or wordEvidence) should not be
// 'unreviewed' or 'machine-seeded'.
{
    const counts = {};
    let missingTotal = 0;
    let inconsistencies = 0;
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const m = lang?.meta || {};
        const rs = m.reviewStatus;
        if (!rs) {
            missingTotal++;
            if (missingTotal <= 5) W(`[#172] ${code}: missing reviewStatus after backfill (Audit Task 172)`);
            continue;
        }
        counts[rs] = (counts[rs] || 0) + 1;
        const we = lang?.wordEvidence || {};
        // Substantive evidence count: skip auto-tagged Task 194 entries
        let weCount = 0;
        for (const k of Object.keys(we)) {
            if (we[k] && we[k].autoTag) continue;
            weCount++;
        }
        const hasSources = m.sources && m.sources.length > 0;
        if ((rs === 'unreviewed' || rs === 'machine-seeded') && (hasSources || weCount > 0)) {
            inconsistencies++;
            if (inconsistencies <= 5) W(`[#172] ${code}: reviewStatus='${rs}' but has sources/wordEvidence — promote to human-reviewed or higher (Audit Task 172)`);
        }
    }
    if (missingTotal > 5) W(`[#172] (${missingTotal - 5} more rows missing reviewStatus)`);
    if (inconsistencies > 5) W(`[#172] (${inconsistencies - 5} more rows with rs/evidence mismatch)`);
    const breakdown = Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([k,v]) => `${k}=${v}`).join(', ');
    I(`reviewStatus coverage: ${codes.length - missingTotal}/${codes.length} (${breakdown}) (Audit Task 172)`);
}

// === WORD_LIST.label UI lang coverage vs lang_names.js (Audit Task 175) ===
// Every UI lang in lang_names.js must have a label entry in every WORD_LIST entry.
// Otherwise users see English fallback for that UI lang's concept labels.
{
    // Discover UI langs from lang_names.js — top-level keys of `LANG_NAMES = { uilang: {...}, ... }`.
    let uiLangs = new Set();
    try {
        const namesSrc = fs.readFileSync('lang_names.js', 'utf-8');
        // Find the LANG_NAMES = { ... } block, scan for top-level `<key>: {`
        const blockMatch = namesSrc.match(/const\s+LANG_NAMES\s*=\s*\{([\s\S]*?)\n\};/);
        if (blockMatch) {
            const block = blockMatch[1];
            // Top-level keys appear at line-start indented by 4 spaces (per file convention)
            const re = /^\s{4}([a-z][a-z0-9_]*):\s*\{/gm;
            let m;
            while ((m = re.exec(block)) !== null) {
                uiLangs.add(m[1]);
            }
        }
    } catch (e) { /* skip if unreadable */ }
    if (uiLangs.size > 0) {
        const wl = ctx.WORD_LIST || [];
        let missingTotal = 0;
        const perLangMissing = {};
        for (const w of wl) {
            const lbl = w.label || {};
            for (const ui of uiLangs) {
                if (!lbl[ui]) {
                    perLangMissing[ui] = (perLangMissing[ui] || 0) + 1;
                    missingTotal++;
                }
            }
        }
        const missingLangs = Object.keys(perLangMissing).filter(l => perLangMissing[l] > 0);
        for (const l of missingLangs) {
            W(`[#175] WORD_LIST.label missing UI lang '${l}' on ${perLangMissing[l]}/20 entries (Audit Task 175)`);
        }
        const covered = uiLangs.size - missingLangs.length;
        I(`WORD_LIST.label coverage: ${covered}/${uiLangs.size} UI langs fully covered across all ${wl.length} concepts (Audit Task 175)`);
    }
}

// === Row-fingerprint comparison (Audit Task 90) =====================
// Detect duplicate / near-duplicate word rows so reviewers don't rely on
// ad hoc scripts. Three checks:
//   exact:        all 20 [surface, pronunciation] pairs identical
//   surface-only: all 20 surface values identical, pronunciation differs
//   high-overlap: 18+ of 20 cells identical (excluding exact)
// Exact duplicates warn unless every non-primary row has coverage+baseLang.
// Parent/child overlap is INFO if coverage exists, WARN otherwise.
{
    const wordIds = ctx.WORD_LIST.map(w => w.id);
    function fingerprint(c) {
        const w = ctx.LANG_DATA[c]?.words;
        if (!w) return null;
        return wordIds.map(k => Array.isArray(w[k]) ? w[k].join('||') : '').join('');
    }
    function surfaceFingerprint(c) {
        const w = ctx.LANG_DATA[c]?.words;
        if (!w) return null;
        return wordIds.map(k => (Array.isArray(w[k]) ? (w[k][0] || '') : '')).join('');
    }
    function overlapCount(a, b) {
        const wa = ctx.LANG_DATA[a]?.words || {};
        const wb = ctx.LANG_DATA[b]?.words || {};
        let same = 0;
        for (const k of wordIds) {
            if (Array.isArray(wa[k]) && Array.isArray(wb[k])
                && wa[k][0] === wb[k][0] && wa[k][1] === wb[k][1]) same++;
        }
        return same;
    }
    // Group by exact fingerprint
    const fpGroups = {};
    for (const c of codes) {
        const fp = fingerprint(c);
        if (!fp) continue;
        (fpGroups[fp] = fpGroups[fp] || []).push(c);
    }
    const exactDupGroups = Object.values(fpGroups).filter(g => g.length > 1);
    if (exactDupGroups.length > 0) {
        for (const grp of exactDupGroups) {
            const members = grp.join(', ');
            // First member is treated as the "primary"; all others must have
            // coverage + baseLang to suppress warning.
            const [primary, ...rest] = grp;
            const unlabeled = rest.filter(c => {
                const m = ctx.LANG_DATA[c].meta || {};
                return !m.coverage || !m.baseLang;
            });
            if (unlabeled.length > 0) {
                W(`[#90] exact duplicate word rows: ${members} (20/20) — non-primary need meta.coverage + meta.baseLang (Audit Task 90)`);
            } else {
                I(`[#90] exact duplicate word rows: ${members} (20/20) — all labeled with coverage/baseLang`);
            }
        }
    }
    // Surface-only duplicates (same spelling, different pronunciation)
    const sfGroups = {};
    for (const c of codes) {
        const sf = surfaceFingerprint(c);
        if (!sf) continue;
        (sfGroups[sf] = sfGroups[sf] || []).push(c);
    }
    const surfaceOnlyGroups = Object.values(sfGroups)
        .filter(g => g.length > 1 && fpGroups[fingerprint(g[0])] !== g);
    for (const grp of surfaceOnlyGroups) {
        // De-duplicate against exact-dup groups
        const fp0 = fingerprint(grp[0]);
        if (fpGroups[fp0] && fpGroups[fp0].length === grp.length) continue;
        I(`[#90] surface-only duplicate word rows: ${grp.join(', ')} (same spellings, different pronunciation)`);
    }
    // Parent/child high-overlap: child shares 18+ cells with declared parent
    for (const c of codes) {
        const m = ctx.LANG_DATA[c].meta || {};
        if (!m.parentCode) continue;
        if (!ctx.LANG_DATA[m.parentCode]) continue;
        const ov = overlapCount(c, m.parentCode);
        if (ov >= 18) {
            const tag = `parentCode=${m.parentCode}`;
            if (m.coverage) {
                I(`[#90] parent/child high overlap: ${c} vs ${m.parentCode} (${ov}/20; ${tag}, coverage=${m.coverage})`);
            } else {
                W(`[#90] parent/child high overlap: ${c} vs ${m.parentCode} (${ov}/20; ${tag}) — needs meta.coverage (Audit Task 90)`);
            }
        }
    }
}

// === Romanization-vs-IPA audit (Audit Task 94) =====================
// Non-Latin-script rows whose pronunciation column is ASCII-only are
// usually romanization (not strict IPA). Surface this so reviewers can
// label pronunciationType honestly instead of leaving the column
// implying narrow IPA.
{
    const candidates = [];
    for (const code of codes) {
        const lang = ctx.LANG_DATA[code];
        const m = lang.meta || {};
        if (m.pronunciationType) continue; // already labeled
        const w = lang.words || {};
        let nonLatin = 0, asciiIpa = 0, total = 0;
        for (const k of Object.keys(w)) {
            if (!Array.isArray(w[k])) continue;
            const surf = w[k][0] || '', ipa = w[k][1] || '';
            if (surf === '—') continue;
            total++;
            if (/[^\x00-\x7f]/.test(surf)) nonLatin++;
            if (ipa && /^[\x00-\x7f]+$/.test(ipa)) asciiIpa++;
        }
        if (total > 0 && nonLatin >= total * 0.5 && asciiIpa >= total * 0.5) {
            candidates.push(code);
        }
    }
    if (candidates.length > 0) {
        W(`[#94] ${candidates.length} unlabeled non-Latin-script rows have ASCII-only IPA — likely romanization. Set meta.pronunciationType. Codes: ${candidates.slice(0, 8).join(', ')}${candidates.length > 8 ? `, …${candidates.length - 8} more` : ''} (Audit Task 94)`);
    }
}

// Audit Task 99: locationBasis coverage tally
let withLocationBasis = 0;
const locBasisCounts = {};
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    const lb = m.locationBasis || ctx.LANG_DATA[code].locationBasis;
    if (lb) {
        withLocationBasis++;
        locBasisCounts[lb] = (locBasisCounts[lb] || 0) + 1;
    }
}
if (withLocationBasis > 0) {
    const breakdown = Object.entries(locBasisCounts).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}=${v}`).join(', ');
    I(`locationBasis coverage: ${withLocationBasis}/${codes.length} languages (${breakdown}) — Audit Task 99`);
}
// Audit Task 84: surfaceType coverage tally
let withSurfaceType = 0;
const surfaceTypeCounts = {};
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    if (m.surfaceType) {
        withSurfaceType++;
        surfaceTypeCounts[m.surfaceType] = (surfaceTypeCounts[m.surfaceType] || 0) + 1;
    }
}
if (withSurfaceType > 0) {
    const breakdown = Object.entries(surfaceTypeCounts).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}=${v}`).join(', ');
    I(`surfaceType coverage: ${withSurfaceType}/${codes.length} languages (${breakdown}) — Audit Task 84`);
}
// Audit Task 220 Phase 5: speakerCount coverage tally + structured-vs-prose diagnostics
let withSpeakerCount = 0;
let withSpeakersProse = 0;
let scShapeCounts = { point: 0, range: 0 };
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    if (m.speakerCount && typeof m.speakerCount === 'object') {
        withSpeakerCount++;
        if (m.speakerCount.range === 'range') scShapeCounts.range++;
        else scShapeCounts.point++;
    }
    if (m.speakers) withSpeakersProse++;
}
if (withSpeakerCount > 0) {
    const pct = (100 * withSpeakerCount / codes.length).toFixed(1);
    I(`speakerCount coverage: ${withSpeakerCount}/${codes.length} languages (${pct}%) — point=${scShapeCounts.point}, range=${scShapeCounts.range} — Audit Task 220`);
    const lacking = withSpeakersProse - withSpeakerCount;
    if (lacking > 0) {
        I(`  · ${lacking} rows have prose meta.speakers but no structured speakerCount (manual review pending — see /tmp/task220_unparseable.txt)`);
    }
}
// Audit Task 118: languageKind coverage tally
let withLanguageKind = 0;
const languageKindCounts = {};
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    if (m.languageKind) {
        withLanguageKind++;
        languageKindCounts[m.languageKind] = (languageKindCounts[m.languageKind] || 0) + 1;
    }
}
if (withLanguageKind > 0) {
    const breakdown = Object.entries(languageKindCounts).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}=${v}`).join(', ');
    I(`languageKind coverage: ${withLanguageKind}/${codes.length} languages (${breakdown}) — Audit Task 118`);
}
// Audit Task 109/178: codeType / iso6393 coverage tally (canonicalCode deprecated post-178)
let withCodeType = 0, withIso6393 = 0, withCanonicalCode = 0;
const codeTypeCounts = {};
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    if (m.codeType) {
        withCodeType++;
        codeTypeCounts[m.codeType] = (codeTypeCounts[m.codeType] || 0) + 1;
    }
    if (m.iso6393) withIso6393++;
    if (m.canonicalCode) withCanonicalCode++;
}
if (withCodeType > 0) {
    const breakdown = Object.entries(codeTypeCounts).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}=${v}`).join(', ');
    I(`codeType coverage: ${withCodeType}/${codes.length} languages (${breakdown}); iso6393 set on ${withIso6393}; canonicalCode (deprecated) set on ${withCanonicalCode} — Audit Tasks 109/178`);
}
// Audit Task 178: warn if canonicalCode is still used in static data
if (withCanonicalCode > 0) {
    W(`[#178] canonicalCode is deprecated — ${withCanonicalCode} rows still use it; migrate to iso6393 (Audit Task 178)`);
}

// ---- 13d. 100M+ tier requires speakerBasis (per wordmap-check-3.md §7) -
// Languages with first numeric value ≥100M must have speakerBasis declared
// so the tier comparison is honest about what's being counted.
function firstNumericTier(s) {
    if (!s) return 0;
    const str = String(s);
    // Skip historical/extinct/liturgical entries — date ranges like
    // "Extinct (~1500 BCE-3rd c. CE)" would otherwise be parsed as 1500M.
    if (/^(extinct|liturgical|extinct\b)/i.test(str.trim())) return 0;
    // Require an explicit K/M/B unit so "20 (severely endangered)" isn't 20M.
    const m = str.match(/(\d+(?:\.\d+)?)\s*([KMB])\b/);
    if (!m) return 0;
    const n = parseFloat(m[1]);
    const unit = m[2];
    if (unit === 'B') return n * 1e9;
    if (unit === 'M') return n * 1e6;
    if (unit === 'K') return n * 1e3;
    return n;
}
let bigButNoBasis = 0;
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta || {};
    if (!m.speakers) continue;
    const tier = firstNumericTier(m.speakers);
    if (tier >= 100e6 && !m.speakerBasis) {
        W(`${code}: 100M+ tier (${m.speakers}) without speakerBasis`);
        bigButNoBasis++;
    }
}

// ---- 14. Family top-token allow-list outliers (detail) -----------------
const familyOutsideList = [];
for (const code of codes) {
    const m = ctx.LANG_DATA[code].meta;
    if (!m || !m.family) continue;
    const top = String(m.family).split('(')[0].trim();
    if (!FAMILY_TOP_ALLOW.has(top)) familyOutsideList.push(`${code}: "${m.family}"`);
}
if (familyOutsideList.length && familyOutsideList.length <= 8) {
    for (const f of familyOutsideList) I(`family outside allow-list: ${f}`);
}

// ---- 201. Per-batch cross-cutting gates (Audit Task 197 / 201) --------
// Detect language codes added since the base ref (default origin/main)
// and run Task 197's cross-cutting rules against each. Phase 1 = WARN
// so a regressive PR is visible without immediately blocking merge.
// Promote to ERROR in a later phase once the team agrees the warnings
// are routinely cleared per batch.
//
// Activate by env:
//   WM_BASE_REF=origin/main   compare against this ref (default)
//   WM_BATCH_GATE=1           force-enable even when no codes detected
//   WM_BATCH_GATE=0           skip entirely (also auto-skipped when git
//                             is unavailable or the ref doesn't exist)
//
// Detection: parses the diff for added object literal keys at the top
// of LANG_DATA in wordmap_data.js — `<code>: { name: '...'`. Falls
// back to "no diff" silently if `git` is unreachable.
{
    const cp = require('child_process');
    const baseRef = process.env.WM_BASE_REF || 'origin/main';
    const skip = process.env.WM_BATCH_GATE === '0';

    function gitDiffText(ref) {
        try {
            return cp.execSync(`git diff ${ref}..HEAD -- wordmap_data.js`, {
                encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'],
                maxBuffer: 32 * 1024 * 1024,
            });
        } catch (e) { return null; }
    }

    let added = [];
    if (!skip) {
        const diff = gitDiffText(baseRef);
        if (diff !== null) {
            // Match additions that look like new top-level LANG_DATA entries.
            // Pattern: a `+` line containing `  <code>: { name: '...'` (2-space
            // indent inside `const LANG_DATA = {`). Excludes WM_UI / WM_UI_LABELS
            // entries (which use `native:` not `name:` as the first key).
            const re = /^\+\s+([a-z][a-z0-9_]*):\s*\{\s*name:/gm;
            const seen = new Set();
            let m;
            while ((m = re.exec(diff)) !== null) {
                if (!seen.has(m[1])) { seen.add(m[1]); added.push(m[1]); }
            }
        }
    }

    if (added.length === 0) {
        I(`Per-batch gate (Task 201): no new LANG_DATA entries vs ${baseRef} (or git unavailable / WM_BATCH_GATE=0)`);
    } else {
        I(`Per-batch gate (Task 201): ${added.length} new lang(s) vs ${baseRef} — ${added.slice(0, 10).join(', ')}${added.length > 10 ? `, …${added.length - 10} more` : ''}`);

        // Resolve the 21-UI-lang section list once for [#201a].
        const UI21 = ['en','ja','ko','zh','yue','vi','th','id','hi','de','fr','it','es_eu','es_mx','pt_eu','pt_br','ru','uk','ar','he','sw'];

        // Cache native-name multimap to detect collisions for [#201f].
        const nativeNameMap = new Map();
        for (const c of codes) {
            const n = ctx.LANG_DATA[c]?.native;
            if (!n) continue;
            if (!nativeNameMap.has(n)) nativeNameMap.set(n, []);
            nativeNameMap.get(n).push(c);
        }

        for (const code of added) {
            const lang = ctx.LANG_DATA[code];
            if (!lang) {
                W(`[#201z] new code "${code}" detected in diff but missing from current LANG_DATA — likely a rename or revert (Audit Task 201)`);
                continue;
            }
            const m = lang.meta || {};

            // [#201a] lang_names.js — all 21 UI sections must have an entry.
            if (LANG_NAMES) {
                const missingUi = UI21.filter(ui => !(LANG_NAMES[ui] && LANG_NAMES[ui][code]));
                if (missingUi.length > 0) {
                    W(`[#201a] new lang "${code}": missing lang_names entries in ${missingUi.length}/21 UI sections (${missingUi.slice(0, 5).join(', ')}${missingUi.length > 5 ? `, …${missingUi.length - 5} more` : ''}) (Audit Task 201)`);
                }
            }

            // [#201b] meta.description — multilingual object form.
            if (!m.description) {
                W(`[#201b] new lang "${code}": meta.description missing (Audit Task 201)`);
            } else if (typeof m.description === 'string') {
                W(`[#201b] new lang "${code}": meta.description is a string; expected { en, ja, ko, zh } object (Audit Task 145/201)`);
            } else {
                const baseUi = ['en', 'ja', 'ko', 'zh'];
                const missingDesc = baseUi.filter(ui => !m.description[ui]);
                if (missingDesc.length > 0) {
                    W(`[#201b] new lang "${code}": meta.description missing baseline UI lang(s) ${missingDesc.join(', ')} (Audit Task 201)`);
                }
            }

            // [#201c] meta.scriptTags — typed array required (Audit Task 130).
            if (!Array.isArray(m.scriptTags) || m.scriptTags.length === 0) {
                W(`[#201c] new lang "${code}": meta.scriptTags missing or empty — must be a non-empty array (Audit Task 130/201)`);
            }

            // [#201d] meta.parentCode or meta.varietyRole — required if the
            // code carries an underscore (regional variant). Non-underscore
            // codes can leave both unset.
            if (code.includes('_')) {
                if (!m.parentCode && !m.varietyRole) {
                    W(`[#201d] new lang "${code}" has underscore code but neither meta.parentCode nor meta.varietyRole is set (Audit Task 170/201)`);
                }
            }

            // [#201e] meta.family — must be present and not introduce a brand-new
            // top token. The full taxonomy check is upstream ([#14]); here we
            // only flag if `family` is missing entirely on a new lang.
            if (!m.family) {
                W(`[#201e] new lang "${code}": meta.family missing (Audit Task 159/201)`);
            }

            // [#201f] disambiguator — required if the row's native name
            // collides with any other row (Audit Task 188).
            const native = lang.native;
            if (native && nativeNameMap.get(native) && nativeNameMap.get(native).length > 1) {
                if (!m.disambiguator) {
                    const others = nativeNameMap.get(native).filter(c => c !== code);
                    W(`[#201f] new lang "${code}": shares native name "${native}" with ${others.join(', ')} but has no meta.disambiguator (Audit Task 188/201)`);
                }
            }
        }
    }
}

// ---------- per-word file split (Audit Task 235) ------------------
function checkPerWordSplit() {
    const manifestPath = 'word_manifest.js';
    const wordsDir     = 'words';

    if (!fs.existsSync(manifestPath)) {
        E(`[#WS1] ${manifestPath} not found`);
        return;
    }
    if (!fs.existsSync(wordsDir)) {
        E(`[#WS2] ${wordsDir}/ not found`);
        return;
    }

    const order = ctx.WORD_ORDER;
    if (!Array.isArray(order)) {
        E(`[#WS3] ${manifestPath} did not define WORD_ORDER as an array`);
        return;
    }

    const WORDS = ctx.WORDS;
    const LANG_DATA = ctx.LANG_DATA;
    const files = fs.readdirSync(wordsDir).filter(f => f.endsWith('.js'));

    // (1) Forward coverage
    for (const id of order) {
        if (!WORDS[id]) E(`[#WS4] WORD_ORDER lists '${id}' but words/${id}.js did not define WORDS.${id}`);
        if (!fs.existsSync(path.join(wordsDir, `${id}.js`))) {
            E(`[#WS5] WORD_ORDER lists '${id}' but words/${id}.js is missing`);
        }
    }

    // (2) Reverse coverage
    for (const f of files) {
        const id = f.replace(/\.js$/, '');
        if (!order.includes(id)) E(`[#WS6] words/${f} not registered in WORD_ORDER`);
    }

    // (3) Language-code integrity
    for (const id of order) {
        const w = WORDS[id];
        if (!w || !w.data) continue;
        for (const code of Object.keys(w.data)) {
            if (!LANG_DATA[code]) {
                E(`[#WS7] words/${id}.js references unknown language code '${code}'`);
            }
        }
    }

    // (4) Label / definition completeness
    for (const id of order) {
        const w = WORDS[id] || {};
        if (!w.label || !w.label.en || !w.label.ja) E(`[#WS8] words/${id}.js missing label.en or label.ja`);
        if (!w.definition || !w.definition.en || !w.definition.ja) E(`[#WS9] words/${id}.js missing definition.en or definition.ja`);
    }

    // (5) Entry shape integrity
    for (const id of order) {
        const w = WORDS[id];
        if (!w || !w.data) continue;
        for (const [code, val] of Object.entries(w.data)) {
            if (Array.isArray(val)) {
                if (val.length !== 2 || !val[0]) {
                    E(`[#WS10] words/${id}.js: ${code} tuple must be [form, ipa] with non-empty form`);
                }
            } else if (val && typeof val === 'object') {
                if (!val.form) E(`[#WS11] words/${id}.js: ${code} object form must have non-empty .form`);
                if (val.alt && !Array.isArray(val.alt)) E(`[#WS12] words/${id}.js: ${code}.alt must be an array`);
                if (Array.isArray(val.alt)) {
                    for (const a of val.alt) {
                        if (!a.form || !a.script) {
                            E(`[#WS13] words/${id}.js: ${code}.alt entry missing form or script`);
                        }
                    }
                }
            } else {
                E(`[#WS14] words/${id}.js: ${code} must be a tuple or object`);
            }
        }
    }
}
checkPerWordSplit();

// ---- Check LANG_CODES.md staleness (Task 12) ----------------------
function checkLangCodesMdFresh() {
    const file = 'docs/words/LANG_CODES.md';
    if (!fs.existsSync(path.join(ROOT, file))) {
        W(`[#WS15] ${file} not found — run tools/generate_lang_codes_md.mjs`);
        return;
    }
    // Back up the current (checked-in) version, regenerate, and compare
    // against the fresh version. If they differ (modulo the date line),
    // the original was stale.
    const fullPath = path.join(ROOT, file);
    const backup = fs.readFileSync(fullPath, 'utf8');
    try {
        const { execSync } = require('child_process');
        execSync('node tools/generate_lang_codes_md.mjs', { stdio: 'pipe' });
    } catch (e) {
        W(`[#WS17] could not regenerate LANG_CODES.md: ${e.message}`);
        return;
    }
    const fresh = fs.readFileSync(fullPath, 'utf8');
    const stripDate = s => s.replace(/Auto-generated.*\n/, '');
    if (stripDate(backup) !== stripDate(fresh)) {
        E(`[#WS16] docs/words/LANG_CODES.md was stale — regenerate with: node tools/generate_lang_codes_md.mjs (fresh version now on disk)`);
    }
}
checkLangCodesMdFresh();

// ------------------------------------------------------------------

// ---- Report -------------------------------------------------------------
console.log('=== Word Map data validation ===');
console.log(`Languages: ${N} (modern: ${N - histInData.length}, historical: ${histInData.length})`);
console.log(`WORD_LIST: ${ctx.WORD_LIST.length} entries`);
console.log(`Word entries with "—": ${dashCount}`);
console.log(`Duplicate-coordinate groups: ${dupGroups.length}`);
console.log(`Codes with meta: ${codesWithMeta.length}/${codes.length}`);
console.log(`Distinct family top-tokens: ${Object.keys(familyTopHits).length}`);
console.log(`Optional schema adoption: speakerBasis ${withSpeakerBasis}, iso6393 ${withIso}, sources ${withSources}`);
// Audit Task 220 Phase 2: speakerCount adoption tally
let speakerCountTotal = 0, speakerCountRange = 0, speakerCountL1 = 0;
for (const code of codes) {
    const sc = (ctx.LANG_DATA[code].meta || {}).speakerCount;
    if (!sc) continue;
    speakerCountTotal++;
    if (sc.range === 'range') speakerCountRange++;
    if (sc.l1 !== undefined || sc.l1RangeMin !== undefined) speakerCountL1++;
}
console.log(`speakerCount adoption (Audit Task 220): ${speakerCountTotal}/${codes.length} rows (point=${speakerCountTotal - speakerCountRange}, range=${speakerCountRange}, with l1=${speakerCountL1})`);
console.log('');
console.log('Data status breakdown:');
const statusOrder = ['modern','attested','fragmentary','reconstructed','undeciphered','partly-understood','pedagogical'];
for (const s of statusOrder) {
    if (dataStatusCounts[s]) console.log(`  ${s.padEnd(20)} ${dataStatusCounts[s]}`);
}
for (const s of Object.keys(dataStatusCounts)) {
    if (!statusOrder.includes(s)) console.log(`  ${s.padEnd(20)} ${dataStatusCounts[s]} (unexpected)`);
}
console.log('');
if (dupForms.length) {
    console.log(`Same-form/same-IPA duplicates within a language (${dupForms.length}):`);
    for (const d of dupForms) console.log('  · ' + d);
    console.log('');
}
console.log('Description i18n coverage:');
for (const ui of UI_LANGS) {
    const c = i18nCoverage[ui];
    const pct = totalDescCodes ? Math.round(c.covered/totalDescCodes*100) : 0;
    console.log(`  ${ui.padEnd(6)} ${c.covered}/${totalDescCodes}  (${pct}%)`);
}
console.log('');
// ── Self-hosted subset-font coverage guard (iPhone tofu prevention) ──
// Chữ Nôm (CJK Ext B+, ≥U+20000) and Old Hangul conjoining jamo (U+1100–11FF)
// render as tofu on iOS unless served by the self-hosted @font-face subsets
// (fonts/NomNaTong-subset.woff2, fonts/NotoSerifKR-OldHangul-subset.ttf). Those
// subsets are pinned to the exact codepoints in the data, so any NEW special
// codepoint added to words/*.js without regenerating the subset font silently
// breaks iPhone. This guard fails the build if that happens.
(function checkSubsetFontCoverage() {
    let html;
    try { html = read('wordmap.html'); } catch (e) { return; } // skip if absent
    // 1) codepoints declared in @font-face unicode-range blocks
    const covered = new Set(), rngs = [];
    for (const blk of (html.match(/@font-face\s*{[^}]*}/g) || [])) {
        const ur = blk.match(/unicode-range:\s*([^;]+);/i);
        if (!ur) continue;
        for (const tok of ur[1].split(',')) {
            const m = tok.trim().match(/^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/);
            if (!m) continue;
            const lo = parseInt(m[1], 16);
            if (m[2]) rngs.push([lo, parseInt(m[2], 16)]); else covered.add(lo);
        }
    }
    const inDeclared = cp => covered.has(cp) || rngs.some(([a, b]) => cp >= a && cp <= b);
    // 2) ACTUAL glyph set of the Old Hangul subset .ttf (the U+1100–11FF range
    //    is broad but the subset only carries the glyphs it was built with —
    //    read the real cmap, dependency-free).
    let jamoCmap = null;
    try {
        const b = fs.readFileSync(path.join(__dirname, 'fonts', 'NotoSerifKR-OldHangul-subset.ttf'));
        const u16 = o => b.readUInt16BE(o), u32 = o => b.readUInt32BE(o);
        let cmapOff = 0; const nt = u16(4);
        for (let i = 0; i < nt; i++) { const o = 12 + i*16; if (b.toString('ascii', o, o+4) === 'cmap') cmapOff = u32(o+8); }
        if (cmapOff) {
            const nSub = u16(cmapOff+2); let best = 0, bestFmt = -1;
            for (let i = 0; i < nSub; i++) { const o = cmapOff+4+i*8, plat = u16(o), enc = u16(o+2), off = u32(o+4), fmt = u16(cmapOff+off);
                if (((plat===3 && (enc===1||enc===10)) || plat===0) && fmt >= bestFmt) { bestFmt = fmt; best = cmapOff+off; } }
            const set = new Set(), fmt = u16(best);
            if (fmt === 4) { const segX2 = u16(best+6), segc = segX2/2, endO = best+14, startO = endO+segX2+2, deltaO = startO+segX2, rangeO = deltaO+segX2;
                for (let s = 0; s < segc; s++) { const end = u16(endO+s*2), start = u16(startO+s*2), delta = u16(deltaO+s*2), ro = u16(rangeO+s*2);
                    for (let c = start; c <= end && c !== 0xffff; c++) { let g; if (ro === 0) g = (c+delta)&0xffff; else { const gi = rangeO+s*2+ro+(c-start)*2; if (gi+1 >= b.length) continue; g = u16(gi); if (g) g = (g+delta)&0xffff; } if (g) set.add(c); } } }
            else if (fmt === 12) { const ng = u32(best+12); for (let g = 0; g < ng; g++) { const o = best+16+g*12, sc = u32(o), ec = u32(o+4); for (let c = sc; c <= ec; c++) set.add(c); } }
            jamoCmap = set;
        }
    } catch (e) { /* ttf missing — fall back to declared range */ }
    // 3) scan word surfaces; assert every special codepoint is covered
    const WORDS = ctx.WORDS || {};
    let scanned = 0, uncovered = 0;
    for (const id of Object.keys(WORDS)) {
        const d = WORDS[id] && WORDS[id].data; if (!d) continue;
        for (const code of Object.keys(d)) {
            const surf = d[code] && d[code][0]; if (typeof surf !== 'string') continue;
            for (const ch of surf) {
                const cp = ch.codePointAt(0);
                const isNom = cp >= 0x20000, isJamo = cp >= 0x1100 && cp <= 0x11FF;
                if (!isNom && !isJamo) continue;
                scanned++;
                const ok = (isJamo && jamoCmap) ? jamoCmap.has(cp) : inDeclared(cp);
                if (!ok) {
                    uncovered++;
                    const kind = isNom ? 'Chữ Nôm (CJK Ext B+)' : 'Old Hangul jamo';
                    E(`subset-font coverage: ${kind} U+${cp.toString(16).toUpperCase()} "${ch}" in ${id}.${code} surface "${surf}" is NOT in the self-hosted subset font → tofu on iPhone. Regenerate the fonts/ subset and its @font-face unicode-range (wordmap.html + hanmap.html) to include it.`);
                }
            }
        }
    }
    infos.push(`subset-font coverage: scanned ${scanned} Nôm/Old-Hangul codepoints in word surfaces, ${uncovered} uncovered`);
})();
console.log(`ERRORS (${errors.length}):`);
for (const m of errors) console.log('  ✗ ' + m);
console.log('');
console.log(`WARNINGS (${warns.length}):`);
for (const m of warns) console.log('  ! ' + m);
console.log('');
if (allowlisted.length) {
    console.log(`ALLOWLISTED (${allowlisted.length}) — known issues, intentionally suppressed:`);
    for (const a of allowlisted) {
        console.log('  ⊘ ' + a.msg);
        console.log('      reason:  ' + a.reason);
        console.log('      ref:     ' + a.ref);
        if (a.created) console.log('      created: ' + a.created);
        if (a.expires) {
            const daysLeft = daysBetween(TODAY_ISO, a.expires);
            const note = daysLeft <= EXPIRES_LEAD_DAYS ? `  ⚠ ${daysLeft} days left` : '';
            console.log('      expires: ' + a.expires + note);
        }
    }
    console.log('');
}
const unusedAllowlist = ALLOWLIST.filter(a => !allowlistFired.has(a));
if (unusedAllowlist.length) {
    console.log(`UNUSED ALLOWLIST ENTRIES (${unusedAllowlist.length}) — match string never fired, may be safe to remove:`);
    for (const a of unusedAllowlist) {
        const matchStr = Array.isArray(a.match) ? a.match.join(' | ') : a.match;
        console.log('  ? match: "' + matchStr + '"');
        console.log('      ref: ' + a.ref);
    }
    console.log('');
}
// Lead-time summary as INFO (Session 16 #1)
{
    const expiringSoon = allowlisted.filter(a => a.expires && daysBetween(TODAY_ISO, a.expires) <= EXPIRES_LEAD_DAYS && daysBetween(TODAY_ISO, a.expires) >= 0);
    if (expiringSoon.length) {
        infos.push(`${expiringSoon.length} ALLOWLIST entries expire within ${EXPIRES_LEAD_DAYS} days — review before they re-promote`);
    }
    // Age summary (Session 16, technical debt visibility)
    const aged = allowlisted.filter(a => a.created).map(a => ({a, days: daysBetween(a.created, TODAY_ISO)}));
    const longstanding = aged.filter(x => x.days >= 365);
    if (longstanding.length) {
        infos.push(`${longstanding.length} ALLOWLIST entries are 1+ years old — consider scheduling resolution`);
    }
}
console.log(`INFOS (${infos.length}):`);
for (const m of infos) console.log('  · ' + m);
console.log('');
console.log(errors.length ? 'FAIL' : 'PASS');
process.exit(errors.length ? 1 : 0);
