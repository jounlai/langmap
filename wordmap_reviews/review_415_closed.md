# Wordmap review #415 — Luwian (xlu): the hieroglyphs come back, sourced this time

## Why this review exists
Review #413 removed the Luwian hieroglyphs because they were fabricated — the whole 25-word row was built from seven Anatolian Hieroglyph signs, permuted, with `good` reading literally `wāsu 𔓷𔖻`. The surfaces were replaced with scholarly transliteration.

The site owner pushed back, and was right:

> "Isn't that odd? The transliteration itself was produced by reading the script. Saying we don't know the script makes no sense."

That objection is correct. The script is readable. What #413 actually established was narrower — that *those particular* sign strings were invented — and the fix over-corrected. This review goes back to the sources and restores the script wherever a spelling is published.

## Why "just write the transliteration in hieroglyphs" is not a thing
Three obstacles, and they are different per word:

1. **A dictionary headword is not a spelling.** `tati-`, `parna-`, `ādman-` — the hyphen marks a stem. Luwian nouns are never attested bare; the corpus has inflected forms. So the object "the citation form written in hieroglyphs" does not exist. What exists is `tá-ti-i-sa`, the nominative singular.
2. **Much of the writing is logographic.** House is normally `DOMUS-na-za`: the DOMUS logogram plus phonetic complements. There is exactly **one** fully syllabic spelling of "house" in the entire corpus (`(DOMUS)pa+ra/i-ní`, KARATEPE 1 Ho. §58). Sun is `(DEUS)SOL` — a logogram, never spelled out.
3. **The row mixes two corpora.** Luwian is attested in Anatolian hieroglyphs *and* in cuneiform, and several of these words are attested only in the cuneiform corpus — or turn out not to be Luwian at all.

## Method
Three researchers worked the primary sources: **eDiAna** (Digital Philological-Etymological Dictionary of the Minor Ancient Anatolian Corpus Languages, LMU Munich — which tags every attestation `hieroglyphic` or `cuneiform` and cites the inscription), **Melchert's *Cuneiform Luvian Lexicon***, **Werner's *A Brief Introduction to Hieroglyphic Luwian***, Hawkins's **CHLI** conventions, and Osborne et al. (2020) on TÜRKMEN-KARAHÖYÜK 1.

Then — and this is the part that makes the result checkable — the transliterated sign values were mapped to Unicode **mechanically, not by eye**. The official Unicode `NamesList.txt` annotates the Anatolian Hieroglyphs block with each sign's value: `U+1441E ANATOLIAN HIEROGLYPH A029 = syllabic tá`, `U+14519 … A247 = domus`, `U+14596 … A360 = deus`. Every character below was looked up by the value the source prints, and then round-trip-verified against its own annotation.

(The Unicode `Annn` numbers *are* Laroche's `*nnn` sign numbers, which is what makes this mapping possible at all.)

## Restored to hieroglyphs (6 cells)

| cell | glyphs | transliteration | form | source |
|---|---|---|---|---|
| father | 𔐞𔑣𔓯𔗔 | `tá-ti-i-sa` | nom.sg. /tadis/ | eDiAna 858; TELL AHMAR 5 §2 (42 attestations) |
| name | 𔐓𔓇𔒄𔖪 | `á-lá/í-ma-za` | nom./acc.sg.n /alaman=za/ | eDiAna 1304; KARATEPE 1 §74 |
| house | 𔔙𔐤𔖪 | `DOMUS-na-za` | nom./acc.sg.n /parnan=za/ | eDiAna 3889; KARATEPE 1 §14 |
| hand | 𔑁𔓯𔑶𔖸 | `MANUS-i-sà-tara/i` | stem /istri-/ | Werner; acc.sg. `-n` at KARKAMIŠ A7 |
| moon | 𔓜𔒄𔗦 | `'LUNA'-ma-sá` | nom.sg. /armas/ | SULTANHAN §31 |
| sun | 𔖖𔓚 | `(DEUS)SOL` | logogram | KARATEPE 1; Osborne et al. 2020 |

Codepoints, each verified against its Unicode annotation:
`A029 tá · A090 ti · A209 i · A415 sa` — `A019 á · A172 lá/í · A110 ma · A377 za` — `A247 domus · A035 na · A377 za` — `A059 manus · A209 i · A104 sà · A388 tara/i` — `A193 luna · A110 ma · A433 sá` — `A360 deus · A191 sol`.

Note what these surfaces honestly are: **inflected forms and logograms**, not stems. `𔔙𔐤𔖪` carries the neuter `=za` particle; `𔖖𔓚` is two logograms and no phonetic spelling at all. The IPA column now matches the surface, not the headword.

## Transliteration corrected — three of them were simply wrong

- **`name`: `ādman-` is an obsolete misreading.** It depended on reading signs \*319 and \*172 as `ta₄/ta₅`. Current scholarship reads the sign as `la` (\*176), giving **`alaman-`**, cognate with Hittite `lāman-` 'name'. eDiAna (lemma 1304): *"the old interpretation … the then generally accepted reading of the HLuw. word for 'name' as /ataman-, adaman-/ vel sim. caused most scholars … to overlook the attestation."* eDiAna returns **zero** results for "adman".
- **`drink`: `aku-` is Hittite**, not Luwian (Hittite *ekuzi*, *akuwanzi*). The Luwian reflex is `u-`. Blanked.
- **`fire`: `pāhur` is Hittite / Common Anatolian** (Hittite *paḫḫur*, gen. *paḫḫuenaš*). The hieroglyphic IGNIS sign is a determinative only, never an independently spelled word. Blanked.

## Kept as transliteration, and why (each is a different reason)

- `mother` **anni-** — eDiAna prints the hieroglyphic entry with an **asterisk**: `*/ann(i)-/`. The base noun is attested in **cuneiform Luwian only** (`an-ni-iš`). Hieroglyphs have only the derivative `á-na-ti-` (contextually "quite opaque", per eDiAna) or the bare logogram MATER.
- `eye` **tawi-** — cuneiform Luwian only, and even there as an adverb `ta-a-wi₅-ya-a-an` 'facing'. The hieroglyphic cognate is the logographic `VERUS-wa/i-ya-an`, which is not the noun.
- `water` **wār** — cuneiform Luwian `wa-a-ar-sa` is attested. No hieroglyphic lexeme found. (Correctly *not* Hittite `wātar`, which is what the row held before #413.)
- `eat` **ad-** — the hieroglyphic attestation is `EDERE-tu`, a **3sg imperative** ("let him eat", KARKAMIŠ A6, the curse of Nikarawa's dogs). An imperative is not the verb.
- `dog` **zuwana-**, `good` **wasu-**, `i` **amu**, `you` **tu** — genuinely Hieroglyphic Luwian, but no published spelling was recovered for them in this pass. They stay transliterated rather than get invented ones.

## Still blank
`cat`, `heart`, `hello`, `love`, `one`, `star`, `thanks`, `tree`, `two`, plus the newly blanked `drink` and `fire`. Eleven of twenty-five. For a language whose corpus is a few thousand lines of monumental inscription, that is the honest number.

## Metadata
`meta.script` now reads: *"Anatolian hieroglyphs (Hieroglyphic Luwian) and cuneiform (Cuneiform Luwian). Cells show the attested hieroglyphic spelling where one is published; otherwise the scholarly transliteration."*

`native` stays `Luwili` — the self-designation is an adverb (*luwili* "in Luwian"), and no single hieroglyphic spelling of it was sourced. The old value `𔖻𔑯𔗬𔖻𔓯` was made from the same seven fabricated signs.

## What #413 got wrong
It concluded "correct hieroglyphs are not honestly recoverable per word" from the fact that they are logographic and inflected. Those are *descriptions of the writing system*, not reasons to hide it. Six of sixteen were recoverable in a single research pass, and the pass also caught three transliterations that were themselves wrong — including a reading that scholarship abandoned decades ago. The right lesson from #413 was "do not invent sign strings", not "do not show the script".

## Worker response (作業者)
Applied 8 cells via `tools/apply_word_patch.js` (6 restored to hieroglyphs, 2 blanked) plus the `meta.script` field. Every codepoint was resolved from Unicode `NamesList.txt` by the sign value its source prints, and round-trip-verified. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass; `tools/font_coverage_check.js` again requires Noto Sans Anatolian Hieroglyphs, which is loaded in all four font chains.

**File status: CLOSED**
