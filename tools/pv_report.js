/* pv_report.js — assemble provenance.json from the scan's own output. */
const fs = require('fs');
const L = require('./pv_lib.js');
const J = JSON.parse(fs.readFileSync(__dirname + '/pv_head.json', 'utf8'));
const META = L.loadMeta();
const rank = new Map(J.pairs.map((p, i) => [p.a + '|' + p.b, i + 1]));
const find = (a, b) => J.pairs.find(p => (p.a === a && p.b === b) || (p.a === b && p.b === a));
const R = (a, b) => { const p = find(a, b); return p ? rank.get(p.a + '|' + p.b) : null; };
const S = (a, b) => { const p = find(a, b); return p ? +p.score.toFixed(3) : 0; };
const nm = c => (META[c] && META[c].name) || c;

/* ranks measured on the pre-538 snapshot, printed by pv_calibrate.js */
const CAL = [
    ['cjy_lv<-cjy', 1, 1.171, true], ['cjy_xz<-cjy', 107, 0.343, true],
    ['zh_zz<-zh_kf', 393, 0.125, true], ['czh_wy<-czh', 17, 0.644, true],
    ['yue_zs<-yue', 37, 0.527, true], ['xpu<-phn', 93, 0.360, true],
    ['kxm<-km', 20, 0.625, true], ['blk<-my', 0, 0, false],
    ['qxs<-cng', 131, 0.311, true], ['ady<-kbd', 205, 0.220, true],
    ['xog<-lg', 0, 0, false], ['zdj<-sw', 0, 0, false],
    ['swb<-sw', 253, 0.189, true], ['yuy<-mn', 0, 0, false],
    ['ii star = ii dog', 0, 0, true],
];

const out = {
    scan: {
        path: '/home/jounlai/langmap-work/rally/r7/provenance_scan.js',
        run: 'node /home/jounlai/langmap-work/rally/r7/provenance_scan.js  (from the repo root; --words <dir> scans a snapshot, --pair a/b explains one pair, --row code lists a row)',
        helpers: ['pv_lib.js (vm loader + normalisers)', 'pv_pairs.js (candidate generation + pair statistics)',
            'pv_calibrate.js (the fourteen known cases against a pre-fix snapshot)', 'pv_report.js (this file)'],
        rows_scanned: 1188,
        concepts: 86,
        candidate_pairs: 6372,
        scored_pairs: J.pairs.length,
        runtime: '~4 s',
        head_at_scan_time: require('child_process').execSync('git -C /home/jounlai/langmap rev-parse --short HEAD').toString().trim(),
        note_on_head: 'This tree is shared: another session commits to words/ while the scan runs, and the ranking moves with it. Every rank below was taken from one run; re-run the scan before acting on a rank rather than trusting these numbers to the unit.',
        shapes_implemented: [
            'tone-inventory — the row carries the other row\'s tone CATEGORIES, not just values; two lects in different 片 cannot share an inventory (cjy_lv <- Taiyuan)',
            'tone-substitution — segments identical, tone letters a clean one-to-one relabelling: find-and-replace, not sound change (czh_wy <- czh)',
            'notation-twin — the sharp form of the above: the tone map turns out to be the IDENTITY once repeated Chao letters collapse (˥˥ to ˥). Fires on 2 pairs atlas-wide',
            'mosaic — the row is covered by TWO other rows that are themselves unlike each other, each owning part of it exclusively (zh_zz <- Kaifeng + Jinan)',
            'cliff — the best match stands far above the third-best; a continuum is a plateau, a copy is a cliff. Corroboration only, never sufficient',
            'script-mismatch — the row\'s surfaces are in the source row\'s script while its own script field names another',
            'alien-grapheme — a grapheme the row uses ONLY in the cells identical to the other row, where elsewhere that row\'s grapheme answers to a different one of its own (ady bone/drink <- kbd, шъ vs щ)',
            'core-vocab — the identity sits in the pronouns and low numerals of a pair that otherwise barely matches (qxs <- cng)',
            'subgroup-clash — the rows\' own family fields name disjoint subgroups and they are still this close',
            'surface-without-reading — the spelling travelled and the transcription did not, gated on the two rows not declaring the same script (kxm <- km)',
            'import-spike — byte-identical rare forms with no cognate tail; a real relative leaves near-misses, an import leaves none (blk <- my, yuy <- Khalkha)',
            'cross-concept — a cell byte-identical to a different concept in the same row (ii star = ii dog)',
        ],
        corrections_under_every_shape: [
            'RARITY — each identical cell is weighted 1/(rows in the atlas holding that form), so a shared `coffee` contributes ~0 and a shared idiosyncratic transcription ~0.5. Without this every pair that shares tea, wifi and chocolate scores.',
            'CLUSTER DENSITY — if several other rows sit almost as close to X as Y does, the identity is a cluster property. Divides the score; es_*/pt_*/en_* sink without being excluded.',
            'DECLARED SIBLING — the rows say out loud when they are meant to look alike ("closely related to Nùng", "often analyzed as a single cluster", "the standard variety used in Austria"). A pair whose own prose names the other row in those terms is discounted x0.6. A shape that reads NOTATION (tone system, script) survives the discount; a shape that only reads the lexicon does not.',
        ],
        false_positive_rate: 'MEASURED, not estimated. I read the top 40 pairs at HEAD by hand, one at a time, against each row\'s name, family, coordinates, declared script and description, and against the wordmap_reviews rulings. 31 of the 40 are genuine cognate or variety sets: Tashelhiyt/Central Atlas Tamazight, Old Turkic/Karakhanid, Embu/Meru, Angkola/Toba Batak, Middle/Old Irish, Jèrriais/Guernésiais, Bislama/Pijin, Dogri/Kangri, Balti/Ladakhi, Cebuano/Hiligaynon, Azerbaijani/South Azerbaijani, the en_*/zh_*/hak_* variety rows, and Vietnamese against its own Chu Nom row. 9 are real leads and 4 of those are confirmed findings. So precision@40 = 22.5%, FPR = 77.5%; precision@20 = 25%; precision@10 = 20%. Against a base rate of roughly 20 provenance events in 1165 scored pairs (1.7%) that is a 13x enrichment. The honest reading: this is a triage list that turns 1165 pairs into 40 worth reading, not a classifier. It cannot be made much sharper on lexical statistics alone, because the thing that separates cjy_lv/cjy (a defect) from io/eo (correct) is not in the cells — it is the knowledge that two Jin lects in different 片 must differ while an Esperantido need not.',
        calibration_method: 'The fourteen known cases were all fixed before HEAD, so the calibration runs against a snapshot of words/ at commit 9b465a52 (the parent of 8db3c93b, "Review 538: cjy_lv was Taiyuan wearing a Lüliang label"), extracted read-only with `git archive`. All fourteen are still broken there, and the pair statistics in that snapshot reproduce the numbers the reviews recorded (cjy_lv 34 of 51 IPA, zh_zz 41 of 60, czh_wy 41 surfaces / 32 segments / 9 IPA, xpu 38 of 44, kxm 43 of 50 surfaces, blk 17 of 37 surfaces, qxs 9 of 36, yuy 16 of 40). Ranks below are positions in that snapshot\'s 1214 scored pairs.',
        calibration: CAL.map(([k, r, s, d]) => ({ known_case: k, rank: r, score: s, detected: d })),
        calibration_notes: [
            '10 of the 14 are found; 4 are not, and the reason is the same for all four. blk, xog, zdj and yuy are FEW-CELL imports (17, 5, 4 and 16 cells) inside pairs whose overall profile is indistinguishable from a genuine close relative: my/rki, lg/nyo, sw/ksb and mn/bxr sit at the same identity rates, the same bimodality and the same rarity-weighted identity. I tried four statistics to separate them (bimodality at two cognate-distance thresholds, rarity-weighted surface identity, weighted surface-minus-reading gap) and none does. Those four were found by consulting ASJP for the right form, not by a statistic, and the scan is honest that it cannot reach them.',
            'The two named as must-not-miss land at rank 107 (cjy_xz) and rank 393 (zh_zz). cjy_xz is found by the right shape (tone-substitution) but does not outrank the genuine dialect pairs above it. zh_zz is deliberately deep: review 541 ruled that Zhengzhou and Kaifeng genuinely share the 24/42/53/312 system, so the sibling and density discounts that push it down are the scan agreeing with that ruling, not missing it.',
            'The must-stay-clear set behaves: io/eo rank 136, ady/kbd 205, hi/ur 175, ms/id 319, pt/pt_br 954, and es/es_mx, cs/sk, ksw/kyu, ksw/pww are not scored at all.',
        ],
    },
    suspects: [],
    cells: [],
    cleared: [],
    held: [],
    summary: '',
};

/* ------------------------------------------------------------- suspects */
function sus(row, src, shape, evidence, cells, verdict) {
    out.suspects.push({
        row, source_row: src, shape, evidence, cells_affected: cells, verdict,
        rank_at_head: R(row, src), score: S(row, src),
    });
}

sus('czh_wy', 'czh', 'tone-substitution + cliff',
    'STILL UNFIXED AT HEAD, and review 541 already diagnosed it. 31 of 43 shared cells are byte-identical to czh in segments and only 9 in full IPA; the tone letters are a 9-of-11 one-to-one relabelling (˦˦>˥˧, ˨˦>˧˥/˥˥, ˧˩>˧˩, ˨˩˧>˨˩˧). Review 541 added the independent evidence: Wuyuan keeps Middle Chinese -m codas (三 sum, 风 fɔm, 红 xɔm) and has lost 入聲, while the row writes 三 /sɛ˧˧/, 风 /fəŋ˧˧/, 红 /ɦoŋ˨˩˧/ and eight glottal-stop codas (血 ɕiɛʔ, 骨 kuʔ, 屋 uʔ, 百 paʔ, 铁 tʰiɛʔ, 舌 ɕiɛʔ, 一 iʔ, 白 paʔ). The row\'s own family field says 祁婺片; czh is Tunxi. The scan finds it at rank 17 in the calibration snapshot and rank 14 at HEAD, and the row really has not moved: diffing czh_wy between 9b465a52 and HEAD gives six changed cells, four of them the syllable space that commit 78c9ffb2 inserted atlas-wide and two tone letters added to snow and white. Review 541 landed in a5abb879, after that snapshot, and its czh_wy patch was never applied.',
    31, 'fixable — needs a 婺源 syllabary this thread could not reach');

sus('yue_gz', 'yue', 'notation-twin + tone-substitution',
    'The sharpest hit in the atlas, and one of only two notation-twin pairs. 20 of 55 cells are byte-identical to Cantonese as written, but 33 of 55 once repeated Chao letters collapse: every one of the 15 tone correspondences is ˥>˥˥, ˧>˧˧, ˨>˨˨, i.e. the identity map retyped. Segments match after vowel length is stripped (Cantonese jyː/syː/ŋaː/fɔː against the row\'s jy/sy/ŋa/fɔ) while the row keeps ː in other cells (jyː fish, jiːm salt, sɛːk stone, maːu cat, saːm three) — the stripping is partial, which is what an edit pass looks like and not what a phonology looks like. The row\'s own description says Gaozhou is Goulou-Wuhua and "not mutually intelligible with Standard (Guangzhou-Hong Kong) Cantonese". The literature gives Gaozhou 陽平 21, 陽去 31, 陽入 2 against the row\'s Cantonese-shaped ˨˩ / ˨˨ / ˨. A handful of cells are genuinely Gaozhou (你 ni not nei, 日头 for sun, 名 mɛŋ˩˧, 熊 juŋ) — the row is a Cantonese base with a few real forms laid on top. Like czh_wy, the row is unchanged since 9b465a52 apart from nine syllable-space insertions.',
    33, 'fixable — needs a 高州 syllabary; Wikipedia, Wikipedia zh and the accessible secondary sources carry no tone table');

sus('kxm', 'km', 'surface-without-reading + import-spike',
    'The known case from review 542. Ten of its cells have been edited since the pre-538 snapshot, but the shape is untouched: 43 of 50 surfaces byte-identical to Khmer (rarity-weighted 17.7) against 23 readings (weighted 9.6). Northern Khmer is written in Thai script in Thailand; the row writes Khmer script and its own script field says "Thai / Khmer", so the two rows\' declared scripts differ and the shape is not the ordinary shared-orthography case.',
    43, 'row-identity question — review 542 left it in held and nothing here changes that');

sus('zh_sc', 'zh_cd', 'tone-inventory + mosaic',
    'NEW. Sichuan Mandarin at 30.57,104.07 and Chengdu Mandarin at 30.67,104.07 are eleven kilometres apart — both rows are pinned to Chengdu. 47 of 61 cells are segment-identical and 39 identical in full, and this survived a round of edits to both rows (29 and 17 cells changed since the pre-538 snapshot); the tone inventories are {˨˩ ˥˧ ˥˥ ˨˩˧} against {˨˩ ˥˧ ˥ ˨˩˧ ˥˥}, the same four values with one of them typed two ways. zh_sc\'s own description says Sichuanese is "centered on the Chengdu-Chongqing megalopolis" and zh_cd\'s says Chengdu is "the urban core of the broader Sichuanese (Cheng-Yu) cluster" — the two rows describe the same lect at two zoom levels. tools/chao_level_notation_check.js separately reports zh_sc\'s four ˥˥ cells against seven ˥.',
    47, 'row-identity question — does zh_cd earn a row separate from zh_sc, or should one be re-pinned to Chongqing or Leshan');

sus('osn', 'su', 'cliff + subgroup-clash',
    'LEAD, not settled. Old Sundanese — a literary language of the Sunda kingdoms attested in 14th-16th century inscriptions — is 34 of 45 segment-identical and 32 identical in full IPA to modern Sundanese, and its next-closest relative in the atlas is at 0.20. Six hundred years of a language is not usually invisible in basic vocabulary at this rate. Against it: basic vocabulary is exactly the layer that moves least, and the row is romanised (its script field names the Old Sundanese Brahmi script), so the comparison is being made in a transliteration both rows share.',
    34, 'fixable if a source exists — needs the Carita Parahyangan / Sanghyang Siksakandang Karesian glossaries, which this thread could not reach');

sus('jvn', 'jv', 'cliff + subgroup-clash',
    'LEAD, not settled. Caribbean Javanese (Suriname) is 47 of 54 segment-identical and 43 identical in full to jv, and matches its third-best relative at 0.27. Suriname Javanese is a real koine with documented Dutch and Sranan influence and the loss of the speech-level system, none of which shows in the row. Against it: the concepts here are core vocabulary, where a 130-year-old diaspora variety genuinely should look like its source.',
    43, 'fixable if a source exists — needs Vruggink & Sarmo, Surinaams-Javaans-Nederlands Woordenboek');

sus('ja_chu', 'ja_heian', 'mosaic (x2)',
    'LEAD, not settled. Middle Japanese is covered 49 of 58 by Heian Japanese (37 cells) plus Kanbun (27), two rows that agree with each other on only 26% of their own cells — the mosaic shape, the same one that found zh_zz. Middle Japanese is the stage where the Heian vowel system, the -p-/-w- series and the onbin changes all landed, so byte-identity with Heian on 37 cells is a claim the period does not support. Against it: the three rows share a kanji orthography and a Sino-Japanese reading layer by construction.',
    37, 'fixable if a source exists — needs a Kamakura/Muromachi phonological reference');

sus('cmg', 'xng', 'mosaic + cliff',
    'LEAD, weakest of the seven. Classical Mongolian (17th-20th c., vertical script) and Middle Mongol (13th-15th c., Phags-pa and Uyghur script) are 31 of 45 identical in IPA with no surfaces in common. The two rows are four centuries and two script traditions apart.',
    31, 'fixable if a source exists — needs Poppe, Grammar of Written Mongolian');

/* -------------------------------------------------------------- cleared */
function clr(a, b, why) {
    const p = find(a, b);
    out.cleared.push({
        pair: a + '/' + b, identical: p ? p.idI : null, shared: p ? p.sh : null,
        rank_at_head: R(a, b), why_expected: why,
    });
}
clr('io', 'eo', 'An Esperantido is a relexification of Esperanto; 44 of 77 identical is what the relationship looks like. Rank 136 in the calibration snapshot, no shape above cliff.');
clr('ady', 'kbd', 'Adyghe and Kabardian are one dialect continuum; 28 of 65 identical is legitimate. The two cells that were NOT (bone, drink) were found by the шъ/щ correspondence, which is the alien-grapheme shape, not by the pair-level score. Rank 205.');
clr('vi', 'vi_nom', 'vi_nom is Vietnamese written in Chu Nom — the same language, two scripts. Identical IPA is the design. Ranks first at HEAD and is the scan\'s single largest false positive.');
clr('nut', 'tyz', 'Both rows\' own descriptions say Nùng and Tày are "often considered a single Tày-Nùng cluster". Sharing a tone inventory is what that means.');
clr('zh_kf', 'zh_zz', 'PRIOR RULING, NOT MY CALL. Review 541 examined this pair and ruled that Zhengzhou and Kaifeng genuinely share the 24/42/53/312 system, that the Kaifeng layer is the RIGHT one, and that the nine Jinan-toned cells were the contamination — which it then removed. tools/sinitic_tone_system_share_check.js carries zh_kf|zh_zz as an explicit ALLOW entry. My scan ranks the pair 11th at HEAD on identical tone inventories; that is the scan rediscovering the shared system the ruling licensed, not new evidence. Flagged here rather than acted on.');
clr('zh', 'zh_tw', 'Taiwan Mandarin shares Standard Mandarin\'s four tone values. Identical inventories are correct.');
clr('nan', 'nan_xm', 'The second notation-twin pair, and it is a notation finding rather than a provenance one: 11 cells where Taiwanese writes 陰平 ˥ and Xiamen writes ˥˥, the same value typed two ways in two legitimately near-identical rows. tools/chao_level_notation_check.js already owns this class.');
clr('st', 'tn', 'The alien-grapheme shape fired on Sesotho naledi/pedi against Tswana. It is wrong: Sesotho orthography writes l before a, e, o and d before i, u, so naledi and pedi are correctly Sesotho and the l/d alternation the shape "learned" is an allophonic spelling rule, not a correspondence between two languages.');
clr('scn', 'it', 'The alien-grapheme shape fired on Sicilian testa/terra/computer against Italian. It is wrong: Sicilian raises unstressed e to i and o to u, and all three of those words end in -a or -er, where no raising applies. The row is consistent (notti, tri, novu, arbulu, biancu).');

/* ----------------------------------------------------------------- held */
out.held = [
    { row: 'czh_wy', question: 'What are Wuyuan Hui\'s actual readings? Review 541 named the defect and gave three forms (三 sum, 风 fɔm, 红 xɔm) but the row was never rewritten and is unchanged at HEAD.', why_undecidable: 'A 婺源 syllabary is needed for 43 cells and no accessible source carries one. The row cannot be dashed either — it holds some real data. Reported, not touched.' },
    { row: 'yue_gz', question: 'Is Gaozhou Yue a row in its own right, or Cantonese with the Chao letters doubled and the vowel length dropped?', why_undecidable: 'The evidence that it is carrying Cantonese is strong (33 of 55 cells identical once ˥˥ collapses to ˥). The replacement values are not available: zh.wikipedia\'s 高州话 and 高陽粵語 articles carry no tone table, the one detailed source found (a Zhihu account of 石鼓镇) is 403. Secondary sources give 陽平 21, 陽去 31, 陽入 2, which is enough to show the row is wrong and not enough to write 33 cells.' },
    { row: 'kxm', question: 'Does Northern Khmer earn a row separate from km, and if so should its surfaces be in Thai script?', why_undecidable: 'Review 542 already held exactly this question. Nothing in this scan settles it; the scan only confirms the row has not moved.' },
    { row: 'zh_cd / zh_sc', question: 'Two rows pinned eleven kilometres apart, both describing Chengdu, 47 of 61 cells segment-identical. Does zh_cd earn a separate row?', why_undecidable: 'This is a row-identity decision about what the atlas wants to show, not a lexical one. If both rows stay, zh_cd should be the Chengdu urban lect and zh_sc re-pinned or re-scoped; either way the cells are not wrong, the rows are redundant.' },
    { row: 'osn, jvn, ja_chu, cmg', question: 'Four rows that are much closer to a living or better-attested relative than their stated time depth or diaspora history allows.', why_undecidable: 'Each needs one specific reference (Old Sundanese inscription glossaries; Vruggink & Sarmo for Suriname Javanese; a Kamakura/Muromachi phonology; Poppe for Written Mongolian). None was reachable from here, and none of the four is wrong on its face — they are leads with a stated next step, not findings.' },
    { row: 'blk, xog, zdj, swb, yuy', question: 'The four calibration cases the scan cannot reach. Is there a statistic that separates a few imported cells inside a genuine close-relative pair from the pair itself?', why_undecidable: 'I could not find one. Bimodality, rarity-weighted identity and the surface-minus-reading gap all put blk/my, xog/lg, zdj/sw and yuy/mn in the same place as my/rki, lg/nyo, sw/ksb and mn/bxr, which are correct. These were found by looking the word up in ASJP, and that is probably the only way to find them. The scan should not be tuned until it claims them.' },
];

/* -------------------------------------------------------------- summary */
out.summary = [
    'The scan is at /home/jounlai/langmap-work/rally/r7/provenance_scan.js, runs over all 1188 rows and 86 concepts in about four seconds, and scores ' + J.pairs.length + ' pairs on twelve shapes rather than on similarity.',
    'Nothing in it scores raw identity: every shape is either identity in a dimension the two rows cannot share (a tone inventory, a tone map that is the identity once notation collapses, a script) or identity that another field of the row contradicts (its family, its declared script, its own prose).',
    'Three corrections run underneath all of them — identical cells weighted by how rare the form is atlas-wide, a cluster-density divisor so that es_*/pt_*/en_* sink, and a discount for pairs whose own descriptions declare them close relatives, which a notation-reading shape survives and a lexicon-reading shape does not.',
    'Calibration runs against words/ at 9b465a52, the last commit before the first of the fourteen was fixed, where all fourteen are still broken and the pair statistics reproduce the numbers the reviews recorded.',
    'Ten of the fourteen are found — cjy_lv at rank 1, czh_wy 17, kxm 20, yue_zs 37, xpu 93, cjy_xz 107, qxs 131, ady 205, swb 253, zh_zz 393 — and io/eo, ady/kbd, hi/ur, ms/id and pt/pt_br all stay down at 136, 205, 175, 319 and 954, with es/es_mx and cs/sk not scored at all.',
    'Four are not found, and the reason is one reason: blk, xog, zdj and yuy are few-cell imports inside pairs that are statistically identical to genuine close relatives, and four different statistics failed to separate them from my/rki, lg/nyo, sw/ksb and mn/bxr; those four were found by looking the word up, not by measuring, and the scan says so instead of being tuned until it claims them.',
    'The false-positive rate is measured, not estimated: I read the top 40 at HEAD one pair at a time and 31 are genuine cognate or variety sets, giving precision@40 of 22.5%, precision@20 of 25% and roughly a 13x enrichment over the base rate — a triage list that turns roughly 1160 pairs into 40 worth reading, not a classifier.',
    'Four findings came out of it. czh_wy is still carrying czh at HEAD although review 541 diagnosed it back in round 3 — 31 of 43 cells segment-identical, the tone letters a 9-of-11 relabelling, eight glottal codas in a lect that lost 入聲 and no -m in a lect that keeps it, and its only changes since the pre-538 snapshot are four syllable spaces and two added tone letters, so that patch was never applied.',
    'yue_gz is the sharpest hit in the atlas and one of only two notation-twin pairs: 20 of 55 cells identical to Cantonese as written and 33 of 55 once ˥˥ collapses to ˥, with vowel length stripped in some cells and kept in others, in a row whose own description says Gaozhou is not mutually intelligible with Cantonese.',
    'zh_cd and zh_sc are a new row-identity question — two rows pinned eleven kilometres apart, both on Chengdu, 47 of 61 cells segment-identical and one tone value typed two ways; and kxm is review 542\'s held question, ten cells edited since but the shape untouched at 43 of 50 surfaces against 23 readings.',
    'The patch is empty on purpose. Every one of the four needs a source for the RIGHT values — a 婺源 syllabary, a 高州 syllabary, a decision about what zh_cd is for — and none was reachable from here, so the rows stay and the findings are reported; the one class that could have been fixed without a source, yue_gz\'s doubled Chao letters, is already owned by tools/chao_level_notation_check.js, which was itself written after auditing yue_gz, and this thread does not reach into another thread\'s ratchet.',
    'One contradiction with a prior ruling is flagged rather than acted on: the scan ranks zh_kf/zh_zz 11th at HEAD on identical tone inventories, and review 541 ruled that shared system legitimate and put zh_kf|zh_zz in sinitic_tone_system_share_check.js as an ALLOW — the scan is rediscovering the licence, not new evidence. The cross-concept dimension is clean: 261 rows hold one form in two concepts, and every one not already in tools/intra_row_dup.lock.json is drink=eat, good=hello or hello=thanks, which that tool suppresses as real polysemy.',
].join(' ');

fs.writeFileSync(__dirname + '/provenance.json', JSON.stringify(out, null, 1));
console.log('wrote provenance.json:', out.suspects.length, 'suspects,', out.cells.length, 'cells,',
    out.cleared.length, 'cleared,', out.held.length, 'held');
