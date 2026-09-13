# Review 536 — closed

**Question:** For each of the 546 rows whose `iso6393` is supplied by the identity backfill — "a
three-letter row code is its own ISO 639-3" — is the code really that language's?

**537 of 546 clean (98.4%). Nine are not.** No code in the set is nonexistent or retired; all 805
three-letter top-level row codes are live ISO 639-3 identifiers. **The defect is always a code that
exists and denotes something else**, which is why nothing caught it: the field looks perfectly
well-formed.

## Wrong — the code belongs to a different language

| code | the row is | ISO says the code is | now set to |
|---|---|---|---|
| `asu` | Asu/Chasu, Bantu E.31, South Pare, **Tanzania** | Tocantins Asurini, Tupian, **Brazil** | `asa` |
| `aja` | Aja/Ajagbe, Gbe, **Benin** | Aja, Ubangian, **South Sudan** | `ajg` |
| `mvf` | Mongghul, Shirongol Mongolic, Huzhu Qinghai | Peripheral Mongolian, Inner Mongolia | `mjg` |
| `zts` | Tlacolula Valley Zapotec, San Lucas Quiaviní | Tilquiapan Zapotec, Ocotlán district | `zab` |
| `bik` | Central Bikol (Bikol Naga), one language | the Bikol **macrolanguage**, eight members | `bcl` |

`zts` is the `itb` shape exactly — a Zapotec 19 km away, close enough that a glance passes it. `bik`
is the macrolanguage-as-individual shape, and the atlas already carries `bto`, one of `bik`'s own
members, as a sibling row. **`mvf` now claims `mjg` knowingly**: review 534 established that `mvf`
and `mjg` are the same language under two codes, so both rows claiming `mjg` states the truth and
makes the duplication visible instead of hiding it behind two wrong codes.

**The corrections exposed a second defect the moment they landed.** `source_link_check.js` went from
0 to 5: every one of those rows' Ethnologue links still pointed at the old, wrong code — five links
sending a reader to the wrong language's catalogue page. Repointed.

## Doubtful — a real relative, but not what the row says it is

Listed in `ISO_IDENTITY_EXCEPT` with the reason; no code assigned, because in each case the thing
the row actually is has no single ISO code.

- **`cnp`** — the row is Pinghua as a whole, anchored on **Nanning** = Southern Ping `csp` (28 km);
  `cnp` is Northern Ping, Guilin (322 km). A separate `cnp_gl` Guilin row already exists, so `cnp`
  is doing double duty.
- **`thr`** — the row is the Tharu cluster anchored on Dang = `thl` Dangaura (29 km); `thr` is Rana
  Tharu (130 km). Its forms look eastern (Chitwania/Kochila) and fit neither, which is a separate
  provenance question.
- **`arc`** — ISO scopes `arc` to Imperial Aramaic, 700–300 BCE. The row spans Biblical to
  Neo-Aramaic and its forms (ܡܝܐ *majjaː*, ܒܝܬܐ *bajtaː*) are **Classical Syriac** = `syc`, which is
  already a separate row.
- **`mzh`** — the row is Wichí at group level; `mzh` is only the Güisnay variety. Lowest confidence
  of the nine, flagged so it is not mistaken for sourced.

## The five Han-Map-only codes

`mnz`, `msj`, `phm`, `pko` and `pst` reuse strings ISO assigned to Moni, Ma, Phimbi, Pökoot and
Central Pashto. None makes a false claim today and **the backfill cannot reach them** — it iterates
`LANG_DATA` from `wordmap_data.js` and none is there. But that safety is **accidental, not
structural**: the branch fires on any three-letter top-level key, so the day one of them gets a Word
Map row it is silently stamped Phimbi or Central Pashto. All five are listed pre-emptively.

## On the convention itself

**Keep the identity rule with an exception list; do not replace it with 546 hand-sourced values.**
That would re-enter the same facts by hand with 546 chances to typo, for a rule that is 98.4% right.

What this round argues for instead is a **deterministic checker rather than another rally**: fail any
row whose `iso6393` shares no name token with `iso-639-3.tab`'s `Ref_Name`, *or* whose coordinate
sits more than 300 km from Glottolog's for that code. Both signals independently caught all of the
hard errors here — the geo check alone surfaced `asu` at 9,718 km, `aja` at 2,632 km and `mvf` at
909 km as the only large-distance outliers whose names also disagreed — and both would run in a
second on every future row. It needs the two tables vendored into the repo, which is the only reason
it is recorded here rather than built.

Three independent passes agreed on the nine: name-token overlap, a full manual read of a
Levenshtein-ranked row-name vs `Ref_Name` table for all 546, and great-circle distance to
Glottolog's CLDF coordinate. Sources fetched: SIL `iso-639-3.tab` / `_Name_Index.tab` /
`_Retirements.tab` (current to 2026-07-15), the per-code pages for asu/aja/mjg/zts,
`glottolog-cldf/cldf/languages.csv`, and SIL Mexico on Tilquiapan vs Western Tlacolula Valley
Zapotec.
