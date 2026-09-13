# Review 533 — closed

**Question:** For every row on the map, does its displayed name name the same language as the row's
own record?

**1,238 rows checked** — 1,187 Word Map, 44 Han-Map-only, 7 Word-Order-Map-only. All 1,238 have a
display name in all 19 UIs; zero gaps. **Seven findings.**

This round exists because of `acw`, whose label said **Omani Arabic** in all 19 UIs while the row
said Hijazi everywhere — name, native الحجازية, Jeddah coordinates, `countries` Hejaz, and the
description in all 19 languages. Every guard was structurally blind to it, because each name is
internally fine; the defect only exists *between* `lang_names.js` and the row's own record.

## Method, and whether it would have caught acw unprompted

Five scripted passes: (1) normalised English display name vs the row's `name`; (2) display name
tokens vs the head of `meta_desc` `description.en`, stop-listing shared macro-language head nouns,
flag zero overlap; (3) the same pair where both share a head noun but each side carries a modifier
the other lacks — **the exact shape of Omani vs Hijazi**; (4) the authoritative SIL table (7,928
codes) vs the display name over the 1,100 rows with a resolvable ISO code; (5) a 130-entry demonym →
expected-country table checked against `countries`/`region`/`native`/description, then the same
demonyms against their ja/zh/ko renderings to catch single-UI drift.

**Three of the five flagged `acw` independently**, two of them in lists short enough to read by eye
(13 rows and 18 rows; the demonym pass returned 14 with `acw` the only true positive). The one check
that would *not* have found it is cross-UI comparison — all 19 said "Omani" consistently, which is
exactly why it survived.

## Fixed in all 19 UIs

- **`acw` → Hijazi Arabic.** ISO: `acw` = Hijazi, `acx` = Omani.
- **`ar_sa` → Najdi Arabic.** The record says Najdi everywhere — native اللهجة النجدية, Riyadh,
  `parentCode: ar_gulf`. This one **becomes actively false the moment `acw` is fixed**: "Saudi
  Arabic" at Riyadh standing next to "Hijazi Arabic" at Jeddah puts the broader label on the
  narrower row. Landed in the same commit, as the round asked.
- **`pi_edu` → Pedagogical Pali.** "Theravada Pali" distinguishes nothing from plain `pi` — all Pali
  is Theravāda Pali. The row's own name is Pedagogical Pali, it matches the `_edu` house convention
  (`sa_edu` is "Modern Spoken Sanskrit"), and `meta_desc/pi_edu.js` already renders it in all 19.
- **`wuu` en → Shanghai Wu.** 18 UIs already said Shanghai Wu; English alone said Shanghainese. The
  row's own cells settle it — 姆妈 *m̩ma*, 水 *sz̩˧˥* are Shanghai, not generic Wu. **This also
  un-suspends the `ja.wuu` nickname 上海語**, which round 527 dropped pending exactly this question.

## `itb`, and what it turned into

`itb` declared `iso6393: "itb"`, which is **Binongan Itneg**, a Cordilleran language ~400 km away in
Abra. Itbayaten has no ISO 639-3 code: ISO and Ethnologue subsume it under `ivv`, Glottolog gives it
`itba1237`. The row's own description asserts the opposite — "counted separately from Ivatan by ISO
and Ethnologue" — in all 19 languages. **Still open.**

Deleting the field did not stick, and chasing that is how the bigger finding surfaced:
`wordmap_meta.js` backfills "a three-letter row code is its own ISO 639-3", which supplies the
`iso6393` of **547 of the 1,187 rows**. Half the field is an assumption. `ISO_IDENTITY_EXCEPT` now
lets a row opt out by name with a reason; review 536 audited the other 546.

## Severe, and out of this round's scope

**`meta_desc/txg.js` is a byte-for-byte copy of `p_jpk`'s description** — open the Tangut pin, read
an essay on Proto-Japonic-Koreanic and Robbeets. The only duplicated body among 1,187 files. Fixed
separately, with a new guard.

## Recorded, not fixed

- **`afb`** — label and coordinates say Qatar, but `native خليجي`, `speakers ~36M (Gulf Arabic)` and
  the whole description are the Gulf macro-variety, and ISO `afb` *is* Gulf Arabic. Here the record
  should move, not the name.
- Four `LANG_NAMES` entries (`hmo`, `kau`, `smg`, `tah`) belong to no row on any map, and `smg` is
  displayed as "Sukuma" though ISO assigns that to `suk`.
- Five Han-Map internal codes reuse ISO strings for unrelated languages — see review 536.

## Caveat on transferability

The description-based passes only work where a `meta_desc` file exists. The 44 Han-Map-only rows and
7 Word-Order-Map-only codes have none, so they got passes 1, 4 and 5 only.
