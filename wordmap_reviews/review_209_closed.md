# Wordmap review #209 — Isolates & fragmentary (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Miren Etxeberria-Sandoval, a descriptive/historical linguist specializing in language isolates and fragmentarily-attested languages. My working reference shelf for this review: John Enrico, *Haida Syntax* (2003) and the *Haida Dictionary* for hai; Ekaterina Gruzdeva, *Nivkh* (1997) for niv; Kirsten Refsing, *The Ainu Language* (1986) for ain; José Ignacio Hualde & Jon Ortiz de Urbina, *A Grammar of Basque* (2003) and R.L. Trask, *The History of Basque* (1997) for eu; Daniel Everett (1986, 2005) and Frank, Everett, Fedorenko & Gibson, "Number as a cognitive technology: Evidence from Pirahã language," *Cognition* 108 (2008) for myp; Hermann Berger, *Die Burushaski-Sprache von Hunza und Nager* (1998) for bsk; Ineke Smeets, *A Grammar of Mapuche* (2008) for arn; Willem Adelaar & Pieter Muysken, *The Languages of the Andes* (2004) for omc/pbb/tsz; Bonny Sands's Khoisan survey work for hts/sad; Matthew Stolper's Elamite chapter (in Woodard, ed.) for elx; and Helmut Rix, *Etruskische Texte* / *Rätisch und Etruskisch* for ett. Each cell below was checked against these sources; I flag only defensible sense/form errors and leave uncertain-but-plausible cells untouched.

## Issues found

### 1. `eu` — you — Basque 2sg gives the polite/default form, not the informal
- **File:** `words/you.js` — code `eu`
- **Current:** ["zu","s̻u"]
- **Expected:** ["hi","hi"]
- **Why:** The concept is explicitly the *informal* 2sg. Basque **zu** is historically a plural pronoun that grammaticalized into the neutral/polite singular (it still governs plural-style allocutive agreement); the genuine intimate/familiar 2sg — the T-form used with children, close peers, animals and in the *hika* register — is **hi** (Hualde & Ortiz de Urbina 2003 §"Personal pronouns" and the allocutive/*hika* discussion; Trask 1997). For a slot labelled "2sg informal," the correct filler is **hi** /hi/, with **zu** being the polite/default counterpart. This is the classic T/V split misassigned to the informal cell.

### 2. `myp` — two — Pirahã "two"-quantity word: orthography shows the "one" form (tone mismatch with the IPA)
- **File:** `words/two.js` — code `myp`
- **Current:** ["hói","hòí"]
- **Expected:** ["hoí","hòí"]
- **Why:** Pirahã has no exact numerals; Everett (2005) and Frank et al. (2008) show only two relative-quantity terms whose sole contrast is tone: **hói** (high–low, i.e. falling; "a small size/amount," ≈ 'one') versus **hoí** (low–high, i.e. rising; "a somewhat larger amount," ≈ 'two'). The supplied IPA **hòí** (low–high, rising) correctly encodes the larger-quantity 'two' word, but the native orthography **hói** (acute/high on the first vowel) spells the *falling* 'one' word — an internal orthography↔IPA contradiction. To match the intended 'two' sense and the given IPA, the native form must be **hoí**. (Anumeric caveat noted, but the fix simply makes the cell self-consistent.)

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
