# Wordmap review #370 — Germanic (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive/historical Germanicist working the older and small-corpus West-Germanic edge of the family. For the modern minority languages I lean on Marron C. Fort's *Saterfriesisches Wörterbuch* (1980) and Pyt Kramer's *Näi Seelter Woudebouk* for Saterland Frisian (Seeltersk), and on Alexander Andrason & Tymoteusz Król's *A Grammar of Wymysorys* (Duke/SEELRC, 2016) for Vilamovian. For the historical stages I use Joseph Wright's *Grammar of the Gothic Language*, Wilhelm Braune's *Althochdeutsche Grammatik* and *Gotische Grammatik*, the *Heliand* glossary/Holthausen's *Altsächsisches Wörterbuch* for Old Saxon, Adolf Noreen's *Altnordische Grammatik* for Old Norse, and Höskuldur Thráinsson et al.'s *Faroese: An Overview and Reference Grammar*; for the English stages the OED and Dobson's *English Pronunciation 1500–1700*. I cross-checked the two least-documented cells (Saterland Frisian, Wymysorys) against Wiktionary descendant lists and languagesandnumbers/Omniglot number tables.

## Issues found

### 1. `stq` — two — nonexistent form (missing final -n)
- **File:** `words/two.js` — code `stq`
- **Current:** ["twäi","tvai"]
- **Expected:** ["twäin","tvain"]
- **Why:** Saterland Frisian has no cardinal *twäi*. The attested citation (masculine) form is **twäin** /tvain/, with feminine/neuter **two** /tvoː/ (Fort, *Saterfriesisches Wörterbuch*; Wiktionary *twäin*: "Saterland Frisian, cardinal number, from Old Frisian *twēne*, fem./neut. *two*, ordinal *twäide*"; languagesandnumbers.com and Omniglot both list "twäin (m), two (f/n)"). The corpus form has dropped the final -n in both the spelling and the IPA. Either the masculine **twäin** /tvain/ or the fem./neut. **two** /tvoː/ is acceptable; "twäi"/[tvai] is neither.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
