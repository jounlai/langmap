# Wordmap review #347 — Semitic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Yohannes Mekonnen-Sabar, a comparative Semitist working primarily on Ethiosemitic and epigraphic Semitic. My desk references for this review are Wright's *Lectures on the Comparative Grammar of the Semitic Languages* and Lipiński's *Semitic Languages: Outline of a Comparative Grammar* for the family framework; Wolf Leslau's *Etymological Dictionary of Harari* (1963), *The Verb in Harari*, and *Reference Grammar of Amharic* plus *Ethiopians Speak (Gurage)* for the Ethiosemitic pronoun/numeral paradigms; Hans Wehr and Woidich/Behnstedt's dialect atlases for Arabic vernaculars; von Soden's *Grundriss der akkadischen Grammatik* (GAG) for Akkadian; Nöldeke's *Compendious Syriac Grammar* and Beyer's *Die aramäischen Texte vom Toten Meer* for Aramaic; Segert's *A Grammar of Phoenician and Punic* and Bordreuil–Pardee's *Manual of Ugaritic* for the Canaanite/Ugaritic epigraphy; and Beeston's Sabaic grammar for the Old South Arabian row. I verified each cell for sense (independent nominative/plain-register pronoun, cardinal numeral, common noun), native script, and segmental/prosodic IPA plausibility.

## Issues found
### 1. `har` — you — 2sg pronoun is the *akh-* form, not `āħ`
- **File:** `words/you.js` — code `har`
- **Current:** ["āħ","aːħ"]
- **Expected:** ["akhākh","aχaːχ"]
- **Why:** The Harari independent 2sg (masculine) pronoun is *akhākh* (Leslau, *The Verb in Harari*; *Etymological Dictionary of Harari*, s.v. pronominal series: 1sg *ān*, 2ms *akhākh*, 2fs *akhāsh*, 3ms *āzo*). It reflects the common Ethiosemitic 2ms *-k-* element and is directly cognate with this dataset's own Sebat Bet Gurage entry (`sgw` you = `axə`) and Ge'ez 2ms suffix *-kä*. The listed `āħ` with a pharyngeal ħ has no basis: Harari has no pharyngeal in this pronoun, and the *k/kh* radical is precisely what distinguishes the 2nd-person forms. This looks like a corrupted truncation of *akhākh*; the correct plain (non-honorific) 2sg is *akhākh* [aχaːχ].

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
