# Wordmap review #413 — Luwian (xlu): the hieroglyphs were invented

## How this was found
A reader reported that Luwian rendered as tofu boxes (□□□) on iPhone. That turned out to be true and fixable — the page requested webfonts for only 8 of the 18 astral-plane scripts the data uses, and Anatolian Hieroglyphs was one of the ten missing. But fixing the font would have made the real problem *visible* rather than solved: **the hieroglyphs were fabricated.**

## The evidence
The whole 25-word row is built from **seven distinct Anatolian Hieroglyph signs**, permuted:

| codepoint | Unicode name | real value |
|---|---|---|
| U+1446F | ANATOLIAN HIEROGLYPH A100 | not confirmable |
| U+145EC | A439 | **wa/i** (syllabogram) |
| U+144F7 | A215A | not confirmable |
| U+145BB | A391 | **mi** (syllabogram, L.391) |
| U+144EF | A209 | not confirmable |
| U+14596 | A360 | **DEUS** — the *divine determinative*, not a sound at all |
| U+1446D | A098A | not confirmable |

Three of them are enough to settle it:

- **A439 = /wa/** appears in *eat, eye, father, fire, heart, house, love, moon, name, star, sun, two, water, you* — almost none of which contain a /w/.
- **A360 is the DEUS determinative**, a marker meaning "the following is a god's name". It sits inside *eye* (`hidu`), *fire* and *star*.
- **A391 = /mi/** appears in *I*, *love*, *moon*, *name*, *star*, none of which contain /mi/.

Seven signs cannot spell twenty-two phonologically unrelated words. And the permutation shows through: *mother* was `A100 A100`; *one* was the single sign `A100`; *father* was `A100 A100 A439`.

The smoking gun needed no linguistics at all: the `good` cell read **`wāsu 𔓷𔖻`** — the Latin romanization jammed in front of two signs.

The language's `native` name, `𔖻𔑯𔗬𔖻𔓯`, was made of the same seven signs.

## What was genuine
The transliterations beside the glyphs are largely real, and they are what the row is worth keeping for: `zuwana-` dog, `tati-` father, `anni-` mother, `parna-` house, `amu` I, `arma-` moon, `ādman-` name, `Tiwad-` sun, `wasu-` good, `ad-` eat, `tu` you. `tati-` and `amu` are specifically *Hieroglyphic* Luwian, which is a real signal that a person once put correct data here and something else later filled the surface column.

## Why the fix is transliteration, not correct hieroglyphs
Hieroglyphic Luwian is a **mixed logographic–syllabic** script, and the words in a Swadesh-style list are exactly the ones the corpus writes **logographically**: dog is the CANIS logogram, sun is (DEUS)SOL, father/mother/house appear as logograms with phonetic complements. For *one, love, tree, two, star* there is no securely sourced Hieroglyphic Luwian spelling at all. Producing per-word sign sequences would mean inventing them — which is the bug being fixed.

So the surface is now the **scholarly transliteration**, and `meta.script` says so. This matches what the atlas already does for Kusunda, whose script field reads "Usually unwritten (romanized transcription shown)".

## Changes

**Surfaces** — all 22 fabricated glyph strings replaced with their transliteration.

**Corrected while there** (the row mixed Hittite and Cuneiform-Luwian forms into a nominally Hieroglyphic-Luwian row):

| cell | was | now | why |
|---|---|---|---|
| eye | `hidu` | `tawi-` | *hidu* is not an Anatolian word for eye; Luwian is *tawi-* |
| hand | `issa` | `iššari-` | the attested stem |
| mother | `anna` | `anni-` | attested Luwian is *anni-* |
| water | `wadar` | `wār` | *wātar* is **Hittite**; Luwian is *wār(sa)* |

**Blanked** — `—`, the atlas's explicit "unattested" marker, permitted for historical languages:

`heart` (was `kard`, which is Hittite; Luwian *zart-* could not be sourced), `one` (`as`, unsourceable), `love` (`walahi` — *walh-* means *strike*), `tree` (`alana`, unsourceable), `two` (`tuwi`, plausible from Anatolian \*duwo- but unattested), `star` (`hastar` reflects Hittite *ḫašter-*).

**Metadata** — `native` `𔖻𔑯𔗬𔖻𔓯` → `Luwili`. `script` `'Cuneiform Luwian'` → `'Anatolian hieroglyphs (Hieroglyphic Luwian) and cuneiform (Cuneiform Luwian); scholarly transliteration shown'`, which is both true and no longer contradicts the surfaces.

`drink` (`aku-`) and `fire` (`pāhur`) are kept: they are Cuneiform Luwian / Hittite in origin, and this row explicitly covers both Luwian epigraphic traditions.

## The font bug, separately
Ten scripts present in the data had no webfont and tofu'd on iOS and Windows: Anatolian Hieroglyphs, Cuneiform, Brahmi, Linear B, Old Persian, Avestan, Old South Arabian, Inscriptional Pahlavi, Phoenician, Gothic, Ugaritic. All are now requested. Desktop Linux ships the Noto historic fonts, which is why nobody noticed. New guard: [`tools/font_coverage_check.js`](../tools/font_coverage_check.js) walks every word surface, buckets astral codepoints by Unicode block, and fails if a block has no font in `wordmap.html`.

## Worker response (作業者)
Applied 22 cells via `tools/apply_word_patch.js`, plus the two metadata fields. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass.

**File status: CLOSED**
