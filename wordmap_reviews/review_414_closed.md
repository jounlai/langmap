# Wordmap review #414 — romanized cells in native-script rows, and a second fabricated row (Meroitic)

## Why this review exists
A reader noticed that some words in Ancient Egyptian were showing as bare Latin transliteration next to hieroglyphs. A script-aware scan (classify every surface by Unicode block; find rows whose 20 older words are overwhelmingly one non-Latin script but whose newer cells are Latin) turned up **46 cells across 10 languages** — almost all of them the five words added later: `i`, `you`, `two`, `name`, `star`.

Japanese and its dialects looked like offenders too and are not: `わし`, `あんた`, `たーち` are kana, which is exactly right.

## Method
Each language went to a researcher who was given the row's existing 20 native-script cells (to learn the orthographic conventions actually in use) and required to cite every spelling, mark anything **composed** from a romanization rather than copied from an attestation, and return `null` rather than invent.

Every codepoint returned was then re-verified here, mechanically: `unicodedata.name()` on each character, and a check that it falls inside the script's Unicode block. That caught nothing this round — but the researcher for Vai/Limbu/Javanese reported catching several bad codepoints from its own sub-model (Vai `tɔ` given as U+A7CB, which is not even in the Vai block; Javanese cecak given as U+A9C1 where the row uses U+A981), which is precisely why the check exists.

## Converted (37 cells)

**Ancient Egyptian** `egy` — 6 cells, all sourced (Wiktionary Egyptian entries, Faulkner, Gardiner):
`dog` 𓃛𓅱𓃛𓅱𓃡 (E9-G43-E9-G43-E14), `i` 𓇋𓏌𓎡, `you` 𓈖𓏏𓎡, `two` 𓌢𓏌𓏤𓏤, `name` 𓂋𓈖, `star` 𓋴𓃀𓄿𓇼.
The judgment worth recording: for `jnk` 'I' the researcher **rejected the textbook-looking 𓇋𓈖𓎡** (M17-N35-V31) because Middle Egyptian writes that *n* with the nw-pot W24, and no source attests the N35 form. It chose 𓇋𓏌𓎡.

**Mandaic** `myz` — 5 cells. `name` ࡔࡅࡌࡀ and `star` ࡊࡅࡊࡁࡀ copied from attested Wiktionary headwords; `i` ࡀࡍࡀ, `you` ࡀࡍࡀࡕ, `two` ࡕࡓࡉࡍ composed from Macuch's *Handbook* (§104, §105, §179), whose transliteration is explicitly 1:1.

**Khotanese** `kho` — 4 of 5. `you` 𑀢𑀽, `two` 𑀤𑀼𑀯, `name` 𑀦𑀸𑀫, `star` 𑀲𑁆𑀢𑀸𑀭 composed in Brahmi using the row's own virama-conjunct mechanism. **`i` (aä) left romanized**: its reduced second vowel *ä* has no reliable Unicode Brahmi representation, and composing an akṣara for it would have been a guess.

**Vai** `vai`, **Limbu** `lif`, **Kawi/Old Javanese** `kaw` — 15 cells, all composed and marked as such. Two real linguistic decisions rather than mechanical transliteration: Vai distinguishes ⟨OO⟩=/ɔ/ from ⟨O⟩=/o/, so `tɔ` 'name' is TOO (U+A57F) while `tolo` 'star' takes the close-o TO/LO; and Limbu /ɛ/ takes SIGN E (U+1927), not the SIGN EE (U+1923) the row uses for its genuine /e/ cells, with the final glottal of `kʰɛnɛʔ` written with mukphreng ᤹.

**Baybayin** `otl` — 5 cells. The final-consonant question answered itself: all 20 existing cells write final consonants with the krus-kudlit virama (`araw` ᜀᜇᜏ᜔, `salamat` ᜐᜎᜋᜆ᜔), so the new cells do too. Pre-colonial Baybayin would drop those finals; that would be a different, internally inconsistent atlas.

**Tai Lue** `khb` — 4 of 5. **Tai Dam** `blt` — 3 of 5. `you`, `two`, `star` (and khb `name`) are attested via the Thai cognate entries on Wiktionary, which give the Lü and Tai Dam forms directly.

## Left romanized on purpose (3 cells)

- `blt` `i`, `khb` `i` — the atlas says the word is **`kau` /kaw/**, but Proto-Tai reconstructs \*kuːᴬ for the 1sg, and Wiktionary's descendants of Thai กู give **Lü ᦅᦴ (kuu)** and **Tai Dam ꪀꪴ**. Meanwhile Tai Lue ᦂᧁᧉ /kaw/ is the numeral **nine**. So `kau` may be the wrong *word*, not just the wrong script. Giving a doubtful word a beautiful native spelling would entrench the error; the cells stay romanized and are flagged for a lexical review.
- `blt` `name` — the researcher could find no Tai Dam attestation (only the Lü cognate), and was unsure of both the affricate letter and the vowel sign. Left alone.
- `kho` `i` — see above.

## The second fabricated row: Meroitic (`xmr`)

While converting Meroitic's five romanized cells, all five turned out not to be Meroitic words at all. Meroitic is only partially deciphered — roughly 100 words are securely translated — and `i` (a), `you` (e), `two` (aro), `name` (eri), `star` (wis) are among the meanings that are **not deciphered**. All five are now `—`, the atlas's explicit unattested marker.

That prompted a sign-by-sign audit of the five cells that *did* have Meroitic script. It found the same pattern as Luwian (review #413) — plausible-looking glyphs that decode to gibberish:

| cell | was | decodes to | actual problem |
|---|---|---|---|
| father | 𐦡𐦢 "qor" | `ei` | **qore means "king"**, a royal title, not a kinship term — and the glyphs don't even spell it |
| mother | 𐦢𐦫𐦡𐦡 "kdke" | `iree` | **kdke = kandake, "queen"** — likewise a title, likewise misspelled |
| good | 𐦞𐦢𐦮𐦤 "akheniska" | symbol-i-hh-ya | invented word, and the string illegally mixes a **hieroglyphic symbol** into a cursive spelling |
| sun | 𐦨𐦬 "ms" | `mal` | `ms`/`masa` 'sun (sun-god)' **is** attested; the second sign was LA where it must be SA |
| water | 𐦠𐦴 "at" | `ata` | `ato` 'water' is attested; `ata` with TA is the attested word for **bread** |

`father`, `mother` and `good` are blanked. `sun` → 𐦨𐦯 /ˈmasa/ and `water` → 𐦠𐦶 /ato/ repair one sign each against citation.

Meroitic now carries 22 `—` cells out of 25. That is the honest state of a partially deciphered language.

## Worker response (作業者)
Applied 51 cells across `words/*.js` via `tools/apply_word_patch.js`, with every codepoint independently verified by Unicode name and block. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass.

**File status: CLOSED**
