# Wordmap review #286 — Dravidian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. K. Subramaniam, a comparative Dravidianist working primarily from Bh. Krishnamurti's *The Dravidian Languages* (Cambridge, 2003) and the *Dravidian Etymological Dictionary* (DEDR; Burrow & Emeneau, 2nd ed. 1984) as my etymological backbone, cross-checked against S. B. Steever (ed.), *The Dravidian Languages* (Routledge, 1998/2020). For the individual languages in this batch I lean on: F. Hahn / J.-B. Grignard, *An Oraon-English Dictionary* and Grignard's *Grammar of the Oraon Language* (Kurukh); J. Elfenbein's "Brahui" chapter in Steever and D. Bray's *The Brāhūī Language*; P. Hockings & C. Pilot-Raichoor, *A Badaga-English Dictionary* (1992); M. B. Emeneau's *Kolami* and *Kodagu* materials plus DEDR reflexes for Kodava; D. N. S. Bhat's Tulu descriptions; and the standard Tamil (Lehmann), Malayalam (Asher & Kumari), Telugu (Krishnamurti & Gwynn) and Kannada (Sridhar) reference grammars. I paid particular attention to (a) 2sg forms being informal singular rather than honorific/plural, (b) the *cukka/peẓ* etymological reflexes for "star" and "name," and (c) script–IPA consistency in the Devanagari- and Perso-Arabic-written Northern Dravidian entries.

## Issues found

### 1. `kru` — i — nonstandard vowel sign in Kurukh 1sg
- **File:** `words/i.js` — code `kru`
- **Current:** ["ऍन","eːn"]
- **Expected:** ["एन","eːn"]
- **Why:** Kurukh 1sg nominative is *ēn* with a plain long close-mid /eː/ (Grignard, *Oraon-English Dictionary*; Hahn's grammar). The accompanying IPA `eːn` correctly encodes /eː/. The native cell, however, uses the candra-E sign ऍ (U+090D), which was introduced to Devanagari specifically to write the open [æ]/[ɛ] of English loanwords and Marathi/Konkani; it does not represent Kurukh /eː/. Standard Devanagari orthography for Kurukh writes the pronoun एन. As written, the script (candra-E ≈ [ɛ]) contradicts the cell's own IPA (/eː/); normalizing to एन removes the mismatch. The other Kurukh cells (नीन, नाम, बिनको) and the numeral एन्ड़ are fine.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
