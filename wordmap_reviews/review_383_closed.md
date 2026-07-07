# Wordmap review #383 — Other Indo-European (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Éimhín MacCana, a comparative and historical linguist of the older Indo-European languages, working primarily on Anatolian, Hellenic epigraphy, and Insular Celtic. For this review I lean on Rudolf Thurneysen's *A Grammar of Old Irish* (DIAS, rev. 1946) and the *electronic Dictionary of the Irish Language* (eDIL) for Goidelic; Kim McCone's *A First Old Irish Grammar and Reader* for phonological quality of initial consonants; H. Craig Melchert's *The Luwians* and *Cuneiform Luwian Lexicon*, and A. Payne's *Iron Age Hieroglyphic Luwian Inscriptions* for Anatolian; Michael Ventris & John Chadwick's *Documents in Mycenaean Greek* and Rüdiger Schmitt's *Grammatik des Klassisch-Armenischen* for the remaining branches. My method here is (a) verify attested forms against the lexica, and (b) for reconstructed/hieroglyphic material, refrain from "correcting" defensible reconstructions, flagging only internally inconsistent or demonstrably wrong cells.

## Issues found
### 1. `sga` — i — Old Irish `mé` missing initial palatalization
- **File:** `words/i.js` — code `sga`
- **Current:** ["mé","meː"]
- **Expected:** ["mé","mʲeː"]
- **Why:** In Old Irish, an initial consonant preceding an original front vowel is palatalized (slender); this "first palatalization" was already complete in the pre-Old-Irish period, so *m* before *é* in the 1sg independent pronoun *mé* is slender [mʲ] (Thurneysen §156ff.; McCone 1987). The pronoun is standardly transcribed [mʲeː]. The current bare [meː] is therefore under-specified. This is confirmed as an oversight by the sibling entry `mga` (Middle Irish), whose identical word *mé* is correctly given as ["mé","mʲeː"] — the two Goidelic stages must agree here, since no depalatalization intervened.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
