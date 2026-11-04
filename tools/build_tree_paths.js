#!/usr/bin/env node
/*
 * build_tree_paths.js — the family tree page's branches, from Glottolog.
 *
 * Why: tree.html used to split each row's free-text meta.family ("Indo-European
 * (Germanic, West)", "Niger-Congo (Mande)", "Italic (or an independent IE
 * branch — debated)") into branches. 562 distinct strings gave 89 top-level
 * nodes, the same branch under two names (Niger-Congo / Atlantic-Congo,
 * West / West Germanic, NW / Northwestern), prose as branch names, and all
 * proto-languages in one "Proto-language" box. Owner 2026-11-04: 「ツリーを
 * きれいに整理して欲しい」.
 *
 * Now each row's branch comes from its Glottolog classification (via its
 * glottocode or ISO 639-3 code), compressed for display:
 *   - a Glottolog level is shown only where it actually splits the rows on
 *     this site (≥2 branches) and carries at least MINLEAF of them;
 *   - technical Glottolog labels are renamed to the usual name or skipped
 *     (RENAME, null = skip the level);
 *   - at most CAP levels;
 *   - creoles and pidgins form one group, split by lexifier (Glottolog files
 *     them under their lexifier languages, which put Tok Pisin inside
 *     Germanic); isolates, constructed and sign languages get their own groups;
 *   - proto-languages sit at the top of the family they reconstruct
 *     (TREE_PROTO lets the page list them first).
 * Regional varieties are not here: tree.html still groups them under their
 * base row (meta.parentCode / code prefix). A row missing from the lineage
 * file falls back to the old meta.family parsing in tree.html.
 *
 * Usage:
 *   node tools/build_tree_paths.js --glottolog=<dir with languages.csv, values.csv>
 *        refresh data/glottolog_tree.json from glottolog-cldf's cldf/ folder
 *        (https://github.com/glottolog/glottolog-cldf), then write tree_paths.js
 *   node tools/build_tree_paths.js          rebuild tree_paths.js from the JSON
 *   node tools/build_tree_paths.js --check  exit 1 if tree_paths.js is stale
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const LINEAGE = path.join(ROOT, 'data', 'glottolog_tree.json');
const OUT = path.join(ROOT, 'tree_paths.js');
const MINLEAF = 3, CAP = 6;

// Macrolanguage and retired ISO codes → the Glottolog individual language used.
const MACRO = { swa: 'swh', mlg: 'plt', que: 'quz', hmn: 'hnj', aze: 'azj', orm: 'gaz', yid: 'ydd', est: 'ekk',
    grn: 'gug', ori: 'ory', srd: 'src', iku: 'ike', kon: 'kng', oji: 'ojg', luy: 'bxk', kau: 'knc', kok: 'gom',
    mwr: 'rwr', bal: 'bgp', fas: 'pes', ara: 'arb', zho: 'cmn', msa: 'zsm', sqi: 'als', lav: 'lvs', nep: 'npi',
    uzb: 'uzn', pus: 'pbu', kur: 'kmr', mon: 'khk', zza: 'diq', lah: 'pnb' };
// Rows with no usable code of their own: an ISO code whose lineage they share.
const CODE_ISO = { lb: 'ltz', hai: 'hdn', na: 'nau', kpe: 'xpe', mixtec: 'mig', h_tagalog: 'tgl', sukh: 'tha',
    h_vedic: 'vsn', oko: 'kor', h_goguryeo: 'kor', okz: 'khm', xqa: 'uig', xsc: 'oss', omy: 'zsm', cmg: 'khk',
    ms: 'zsm', otk: 'uig', p_toc: 'xto' };
// Proto-languages: the Glottolog family they reconstruct (they become its first child).
const PROTO_FAMILY = { p_ine: 'indo1319', p_jpn: 'japo1237', p_kor: 'kore1284', ptrk: 'turk1311', pmng: 'mong1329',
    p_tun: 'tung1282', p_aav: 'aust1305', p_viet: 'viet1250', ptai: 'taik1256', p_hmx: 'hmon1336', pafa: 'afro1255',
    pkar: 'kart1248', pmay: 'maya1287', puaz: 'utoa1244', pban: 'narr1281', p_sit: 'sino1245', psem: 'semi1276',
    pura: 'ural1272', p_dra: 'drav1251', paus: 'aust1307', p_ryu: 'ryuk1243', xli: 'indo1319' };
const PROTO_OF_ISO = { p_toc: true };   // anchored by CODE_ISO, still a proto-language
const FIXED = { p_jpk: ['Japonic–Koreanic (proposed)'] };

// Glottolog top-level pseudo-families.
const SPECIAL = { 'Artificial Language': 'Constructed', 'Sign Language': 'Sign languages',
    'Bookkeeping': null, 'Unclassifiable': null, 'Speech Register': null, 'Mixed Language': 'Creoles and pidgins',
    'Pidgin': 'Creoles and pidgins' };
// Usual names for Glottolog's technical labels; null = skip that level.
const RENAME = {
    'Classical Indo-European': null, 'Imperial Latin': 'Romance', 'Northwest Germanic': null, 'Graeco-Phrygian': null,
    'South Greek': 'Greek', 'Early Old Tibetan': 'Tibetic', 'Late Old Tibetan': null, 'Middle Old Tibetan': null,
    'Middle-Modern Sinitic': null, 'Northern Chinese': 'Mandarin and Jin', 'Insular Celtic': 'Celtic',
    'Iranian-Nuristani': 'Iranian', 'Eastern Baltic': 'Baltic', 'Mongolic-Khitan': 'Mongolic',
    'Nakh-Daghestanian': 'Northeast Caucasian', 'Abkhaz-Adyge': 'Northwest Caucasian', 'Tai-Kadai': 'Kra-Dai',
    'Athabaskan-Eyak-Tlingit': 'Na-Dene', 'Nuclear Trans New Guinea': 'Trans-New Guinea', 'Nuclear-Macro-Je': 'Macro-Jê',
    'Naduhup': 'Nadahup', 'Chicham': 'Jivaroan', 'Kxa': 'Kxʼa', 'Nuclear Torricelli': 'Torricelli', 'Songhay': 'Songhai',
    'Narrow Bantu': 'Bantu', 'Central Iranian PBS': 'Northwestern Iranian', 'Middle-Modern Indo-Aryan': null,
    'Continental Indo-Aryan': null, 'Indo-Aryan Central zone': 'Central Indo-Aryan',
    'Indo-Aryan Northern zone': 'Northern Indo-Aryan', 'Indo-Aryan Southern zone': 'Southern Indo-Aryan',
    'Midlands Indo-Aryan': null, 'Shaurasenic': null, 'Gauda-Kamrupa': null, 'Oriya-Gauda-Kamrupa': 'Eastern Indo-Aryan',
    'Gauda-Banga': null, 'Modern Dutch': 'Low Franconian', 'Later Anglic': null, 'Middle-Modern High German': null,
    'Modern High German': null, 'West Middle German': null, 'Middle German': null, 'Altsächsisch': 'Low German',
    'Kwa Volta-Congo': 'Kwa', 'Volta-Congo': null, 'Daic': 'Tai', 'Central-Southwestern Tai': 'Southwestern Tai',
    'Southwestern Tai P': null, 'Wenma-Southwestern Tai': null, 'Kam-Tai': null, 'Tokharian': 'Tocharian',
    'Neva': null, 'Coastal Finnic': null, 'Nuclear Finnish': null, 'North Finnic': null, 'Ladogan': null,
    'Nuclear Oghuz': null, 'Modern Turkestan': 'Karluk', 'Kipchak-Turkestan': null, 'Common Turkic': null,
    'Modern Goidelic': null, 'Kabyle-Atlas Berber': null, 'Greater Zenatic': 'Zenati', 'Lowland East Cushitic': null,
    'Mainstream Lowland East Cushitic': null, 'West Semitic': null, 'Algonquian-Blackfoot': null,
    'Northern Eastern Algonquian': null, 'Core Mayan': null, 'Mundaic': 'Munda', 'Greater Barito linkage': 'Barito',
    'Central Pacific linkage': 'Central Pacific', 'Western Oceanic linkage': 'Western Oceanic',
    'North-Central Atlantic': 'Atlantic', 'Nuclear Malayic': null, 'Nuclear Mranmaic': null,
    'Nuclear Oti-Volta Occidental': null, 'Nuclear Polynesian': null, 'Tokalau Fijian': null,
    'Shifted Western Romance': null, 'Northwestern Shifted Romance': null, 'Southwestern Shifted Romance': null,
    'Italo-Western Romance': null, 'Middle-Modern Aramaic': null, 'Imperial-Middle-Modern Aramaic': null,
    'Middle-Modern Persian': null, 'Modern Southwestern Iranian': null, 'Western Middle Arabic': null,
    'Ni-Li-Kazhouish': null, 'Eastern Samur': null, 'Tabasaran-Aghul-Lezgi': null, 'Farsic': 'Persian',
    'Tamil-Irula': null, 'Tamil-Kodagu': null, 'Bisayan': 'Visayan', 'Oil': 'Oïl' };

const read = (p) => fs.readFileSync(p, 'utf8');
function loadRows() {
    const c = { window: {} }; vm.createContext(c);
    vm.runInContext(read(path.join(ROOT, 'wordmap_data.js')) + ';this.LD=LANG_DATA;', c);
    vm.runInContext(read(path.join(ROOT, 'wordmap_meta_lite.js')), c);
    return c.LD;
}
// Rows the tree lists on their own (varieties hang under their base row).
function treeRows(LD) {
    const out = [];
    for (const k of Object.keys(LD)) {
        const pc = LD[k].meta && LD[k].meta.parentCode;
        if (pc && LD[pc] && pc !== k) continue;
        const us = k.indexOf('_');
        if (us > 0 && LD[k.slice(0, us)]) continue;
        out.push(k);
    }
    return out;
}

function refreshLineage(dir, LD) {
    const parseCSV = (line) => { const r = []; let cur = '', q = false;
        for (const ch of line) { if (ch === '"') q = !q; else if (ch === ',' && !q) { r.push(cur); cur = ''; } else cur += ch; }
        r.push(cur); return r; };
    const langs = read(path.join(dir, 'languages.csv')).split('\n'), head = parseCSV(langs[0]);
    const iID = head.indexOf('ID'), iName = head.indexOf('Name'), iIso = head.indexOf('ISO639P3code'), iLev = head.indexOf('Level'), iArea = head.indexOf('Macroarea');
    const name = {}, level = {}, iso = {}, area = {};
    for (const l of langs.slice(1)) { if (!l) continue; const r = parseCSV(l);
        name[r[iID]] = r[iName]; level[r[iID]] = r[iLev]; area[r[iID]] = r[iArea]; if (r[iIso]) iso[r[iIso]] = r[iID]; }
    const cls = {};
    for (const l of read(path.join(dir, 'values.csv')).split('\n')) {
        const r = l.split(','); if (r[2] === 'classification') cls[r[1]] = r[3].split('/'); }
    const fam = (gc) => (cls[gc] || []).filter((x) => level[x] === 'family');
    const lin = {}, used = new Set(), macro = {};
    for (const k of treeRows(LD)) {
        const m = LD[k].meta || {};
        let L = null;
        let gc = null;
        if (PROTO_FAMILY[k]) { L = [...fam(PROTO_FAMILY[k]), PROTO_FAMILY[k]]; gc = PROTO_FAMILY[k]; }
        else {
            let code = CODE_ISO[k] || MACRO[m.iso6393] || m.iso6393;
            gc = (!CODE_ISO[k] && m.glottocode) || iso[code] || iso[k];
            if (gc) L = fam(gc);
        }
        if (gc && area[gc]) macro[k] = area[gc];
        if (!L) continue;
        // Glottolog's bookkeeping boxes: fall back to the family named in meta.family.
        if (L.length && SPECIAL[name[L[0]]] === null) {
            const top = String(m.family || '').replace(/\s*\(.*$/, '').trim();
            const gc = Object.keys(name).find((x) => level[x] === 'family' && !(cls[x] || []).length && name[x] === top);
            L = gc ? [gc] : [L[0]];
        }
        lin[k] = L; L.forEach((x) => used.add(x));
    }
    const names = {}; for (const x of used) names[x] = name[x];
    fs.writeFileSync(LINEAGE, JSON.stringify({ source: 'glottolog-cldf cldf/languages.csv + values.csv (classification)',
        names, lineage: lin, macroarea: macro }, null, 0) + '\n');
}

function build(LD) {
    const { names, lineage, macroarea } = JSON.parse(read(LINEAGE));
    const rows = treeRows(LD);
    const proto = new Set(Object.keys(PROTO_FAMILY).concat(Object.keys(PROTO_OF_ISO)).filter((k) => lineage[k] && /^p/.test(k)));
    const isCreole = (k) => /creole|pidgin/i.test(String((LD[k].meta || {}).family));
    const cnt = {}, kids = {};
    for (const k of rows) {
        const L = lineage[k]; if (!L || isCreole(k) || FIXED[k]) continue;
        const p = ['ROOT', ...L];
        p.forEach((x, i) => { cnt[x] = (cnt[x] || 0) + 1; (kids[x] = kids[x] || new Set()).add(i + 1 < p.length ? p[i + 1] : 'L:' + k); });
    }
    const label = (gc) => { const n = names[gc]; if (n in SPECIAL) return SPECIAL[n]; return n in RENAME ? RENAME[n] : n; };
    const paths = {};
    for (const k of rows) {
        if (FIXED[k]) { paths[k] = FIXED[k]; continue; }
        if (isCreole(k)) {
            const f = String(LD[k].meta.family), m = f.match(/(English|French|Portuguese|Spanish|Dutch|Arabic|Malay|Iberian)[- ]based/i);
            paths[k] = ['Creoles and pidgins', m ? m[1][0].toUpperCase() + m[1].slice(1).toLowerCase() + '-based'
                : /pidgin/i.test(f) ? 'Pidgins' : 'Other creoles'];
            continue;
        }
        const L = lineage[k]; if (!L) continue;
        if (!L.length) { paths[k] = ['Language isolate']; continue; }
        const keep = [L[0]];
        for (const x of L.slice(1)) if (kids[x].size >= 2 && cnt[x] >= MINLEAF && cnt[x] < cnt[keep[keep.length - 1]]) keep.push(x);
        let p = keep.map(label).filter(Boolean).filter((n, i, a) => n !== a[i - 1]);
        if (!p.length) p = ['Unclassified'];
        paths[k] = p.slice(0, CAP);
    }
    // Families with fewer than MINLEAF rows here go under one "Smaller families"
    // group per macro-area, so the top level lists the big families only.
    const topCount = {};
    for (const p of Object.values(paths)) topCount[p[0]] = (topCount[p[0]] || 0) + 1;
    const KEEP_TOP = new Set(['Creoles and pidgins', 'Language isolate', 'Constructed', 'Sign languages', 'Unclassified',
        'Japonic', 'Koreanic', 'Japonic–Koreanic (proposed)', 'Ainu']);
    const AREA = { 'Eurasia': 'Eurasia', 'Africa': 'Africa', 'North America': 'North America', 'South America': 'South America',
        'Papunesia': 'New Guinea and the Pacific', 'Australia': 'Australia' };
    for (const [k, p] of Object.entries(paths)) {
        if (topCount[p[0]] >= MINLEAF || KEEP_TOP.has(p[0])) continue;
        const a = String((macroarea || {})[k] || '').split(';')[0];
        paths[k] = ['Smaller families', AREA[a] || 'Other', ...p].slice(0, CAP);
    }
    const sorted = {}; for (const k of Object.keys(paths).sort()) sorted[k] = paths[k];
    return '/* tree_paths.js — GENERATED by tools/build_tree_paths.js from data/glottolog_tree.json. DO NOT EDIT. */\n'
        + 'window.TREE_PATHS = ' + JSON.stringify(sorted) + ';\n'
        + 'window.TREE_PROTO = ' + JSON.stringify([...proto].sort()) + ';\n';
}

const LD = loadRows();
const g = process.argv.find((a) => a.startsWith('--glottolog='));
if (g) refreshLineage(g.slice(12), LD);
const text = build(LD);
if (process.argv.includes('--check')) {
    const cur = fs.existsSync(OUT) ? read(OUT) : '';
    const stale = cur !== text;
    console.log('tree_paths.js ' + (stale ? 'stale' : 'fresh') + '\nviolations: ' + (stale ? 1 : 0));
    process.exit(stale ? 1 : 0);
}
fs.writeFileSync(OUT, text);
const P = JSON.parse(text.match(/TREE_PATHS = (\{.*\});/)[1]);
const tops = new Set(Object.values(P).map((p) => p[0]));
console.log(`tree_paths.js: ${Object.keys(P).length} rows, ${tops.size} top-level groups`);
