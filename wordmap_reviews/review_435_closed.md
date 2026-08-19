# Review 435 — new core word `fish`, drafted from sources rather than checked against them

**Date:** 2026-08-19
**Scope:** `words/fish.js` — the 34th concept, all 1,151 languages.
**Method:** the order was inverted relative to review 434. Every comparative
dataset carrying Concepticon FISH was pulled *first* and joined to LangMap codes
on `meta.iso6393`, producing a per-code hint table (841 of 1,151 codes had at
least one source hint). The draft was then written with those hints open, and
swept afterwards.

Sources:

- **ASJP** (`lexibank/asjp`, parameter 19) — 5,588 ISO-keyed languages; covers
  820 of our 999 ISO-coded rows, far better than its RED parameter did
- **ABVD** (`word.php?v=111`) — 2,082 Austronesian rows
- **IDS**, **NorthEuraLex**, **Bowern Pama-Nyungan**, Zgraggen Madang,
  Peiros Austroasiatic, Sidwell Bahnaric, Sagart/Sun Sino-Tibetan,
  Marrison Naga, Mann Burmish, Starostin Karen, Gerardi Tupí, Bantu BVD,
  Kraft Chadic, Chen Hmong-Mien
- Sinitic rows derived mechanically from HanMap's own 魚 readings, so each
  topolect carries its own citation tone rather than a copied one

**Result:** the ASJP sweep over 820 rows produced a handful of genuine
corrections (bsq, gbm, kfy, kfr, maw, xog, dyo, sdo, dbl) — against 180 for
`red`. Drafting with sources in hand is the cheaper order and should be the
default for the next concept. A second sweep over the 331 rows ASJP does not
reach found 5 mismatches, all transcription-level.

## Two guards that paid for themselves

- `guc` (Wayuu) carried a **Cyrillic е** inside the IPA field ("himе"). Invisible
  on screen; caught by the non-IPA-script check.
- `vi_nom` needs **𩵜** (U+29D5C, chữ Nôm *cá*), which was outside the
  self-hosted Nôm subset. Regenerated from NomNaTong-Regular v5.13 to 28
  codepoints; `unicode-range` extended in `wordmap.html` and `hanmap.html`.
- 99 IPA cells were written with affricate tie bars and stripped to the
  project's bare-digraph convention.

## Concept boundary

"Fish" here is the live animal, singular — not fish as food where the language
separates the two (Spanish *pescado*, Korean 생선), not the verb, and not a
species. Spanish therefore reads `pez`, Korean `물고기`; Japanese 魚 covers both
senses and needs no split.
