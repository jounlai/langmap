# Wordmap Reviewer #100 — the `n99` word, end to end

Scope: every cell of `words/n99.js` (108 languages, 11 route categories) plus the
`family`→`routes` classification and the route definitions. Nothing else on the map.
This is the newest word on the atlas and had never been reviewed, so the point was to
audit it before it accumulates more rows on top of unverified ones.

The deterministic half of the audit is `~/langmap-work/n99_audit.js`, re-runnable.

---

## A. Deterministic checks — all clean

| check | result |
|---|---|
| cell whose code is not a LANG_DATA row | 0 |
| cell with no `family` / `family` with no cell | 0 / 0 |
| `family` value with no route / route with no language | 0 / 0 |
| empty or `—` cell | 0 |
| tie bar, ASCII digit, superscript digit or `*` in IPA | 0 |
| Chao tone letter in a surface | 0 |
| leading/trailing or doubled space | 0 |
| same surface under two concepts in one row | 0 |

## B. Identical cells across rows — 4 pairs, all genuine

`ms`/`id`, `hr`/`bs`, `yue`/`yue_zs`, `nan_te`/`nan_zz` share a cell exactly. None is a
copy-paste. Measured against the rest of the row the four pairs are only 71%, 57%, 51%
and **22%** identical overall, so the rows are distinct and it is this particular word
that coincides. For the two Sinitic pairs MCPDict confirms the coincidence at source:
廣州 and 中山 both give 九 kɐu / 十 sɐp, and 潮州 and 漳州 both give 九 kau / 十 tsap.
Malay/Indonesian and Croatian/Bosnian coinciding on a numeral needs no explanation.

## C. Classification audit — ONE error found and fixed

Every `dec` and `mult` assignment was re-derived from the criterion in the file header
("is the language's ordinary free word for TEN visible in the decade?").

**`sv` Swedish was wrong: `dec` → `mult`.** I had judged *nittio* fused, looking at it
alone, where the nine is reduced to *ni-*. The series gives it away: *femtio* is fem +
tio, *åttio* is åtta + tio, *sextio* is sex + tio — **tio 'ten' is visible in every
decade**, including this one. Only the unit is reduced, and the criterion is about the
ten. Verified against Wiktionary: tio 'ten', femtio 'fifty', åttio 'eighty', nittio
'ninety'.

The lesson generalises: **judge a decade against its own series, not in isolation.** A
single decade can look opaque through phonological reduction while the paradigm it sits
in is transparent.

The other 107 hold. Spot-checked hardest cases: `hu` kilencven (-ven is a decade suffix,
Hungarian ten is tíz — correctly `dec`), `haw` kanaiwa (contains iwa 'nine' but kana- is
a decade prefix and ten is ʻumi — correctly `dec`), `ig` iri itoolu (decade-word first,
still 9×10 — correctly `mult`), `so` sagaashan (ten is toban — correctly `dec`),
`is` níutíu (tíu — correctly `mult`).

## D. Route membership — consistent

`sub` la/ne/yo/or all "one from a hundred"; `quin` km/wo both nine = 5+4; `plural` he/ar/mt
all the Semitic plural suffix; `unit` de/nl/af all 9-and-90; `vig` fr/eu/ka/br all built on
a score, with Basque berrogei 2×20 and Breton daou-ugent 2×20 / tri-ugent 3×20 confirming
the base outright; `half` da; `vig15` nci; `subunit` zu; `opaque` hi/bn/ur.

## E. Standing notes (not defects in this word)

- `la` and `nci` are historical-only, so `vig15` has no member on the modern map. The
  colour key now filters by era, so the row is hidden there rather than pointing at nothing.
- Two cells are marked `inferred` in wordEvidence and say so on the map: `yo` and `nci`,
  plus `wo` and `zu`. Each is a documented rule applied to documented parts, with the
  reasoning in the row's `note`.
- `zh_wh` 吃 is transcribed tʂʰʅ although Wuhan has no retroflex series — a neighbouring
  cell, logged in flags.md, not touched here.

**Outcome: 1 defect found, 1 fixed. 108 cells, 11 routes, all guards green.**
