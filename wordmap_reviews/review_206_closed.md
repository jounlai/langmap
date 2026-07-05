# Wordmap review #206 — Germanic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Alrik Vennemann, a historical-comparative Germanicist trained on the Ingvaeonic and Nordic branches. For this review my working references are Fernand Mossé's *A Handbook of Middle English* and Roger Lass's chapters in *The Cambridge History of the English Language* vol. II–III (for the Middle/Early Modern English vowel strata and the open ō / close ō split), E. V. Gordon's *An Introduction to Old Norse* and the Faroese descriptions in Þráinsson et al.'s *Faroese: An Overview and Reference Grammar*, Wilhelm Braune's *Althochdeutsche Grammatik* and *Mittelhochdeutsche Grammatik* for the OHG→MHG→ENHG record, Ferdinand Holthausen's *Altsächsisches Wörterbuch* for Old Saxon, Wilhelm Streitberg's *Gotisches Elementarbuch* / Lehmann's *Gothic Etymological Dictionary* for Gothic, Marron Fort's *Saterfriesisches Wörterbuch* for Saterland Frisian, and Andrason & Król's *A Grammar of Wymysorys*. My focus is the diachronic vowel-quality distinctions that are easy to flatten in broad IPA.

## Issues found

### 1. `enm` — two — Middle English vowel is open ō, not close ō
- **File:** `words/two.js` — code `enm`
- **Current:** ["two","twoː"]
- **Expected:** ["two","twɔː"]
- **Why:** OE *twā* had /ɑː/, which underwent the early-Middle-English rounding of OE long *a* to the **open** long vowel ǭ /ɔː/ (the phoneme that also absorbed OE *au*). Middle English **close** /oː/ descends only from OE *ō* (*gōd, mōna, dōn*). "Two" therefore belongs with *so, go, home, stone, oak, road* — all open /twɔː, sɔː, gɔː…/ — not with *good/food/moon*. The transcription /twoː/ assigns it to the wrong (close) vowel class, a genuine phonemic error in the ME system where ǭ and ō were contrasting phonemes (Mossé §§16–20; Lass, CHEL II). The rest of the enm row (*name* /ˈnaːmə/, *sterre*, *thou* /θuː/) is unshifted classical ME, confirming the intended stratum, so /twɔː/ is the correct value.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
