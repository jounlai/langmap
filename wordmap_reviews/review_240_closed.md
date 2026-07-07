# Wordmap review #240 — Austronesian (W) (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Litu Kaljivit, a descriptive linguist specializing in the Formosan primary branches and western Malayo-Polynesian (Bornean/South Sulawesi) lexicon. My working references are Robert Blust's *Austronesian Comparative Dictionary* (ACD, online) for the *bituqen* "star", *duSa* "two" and *ŋajan* "name" reflexes; Paul Jen-kuei Li's comparative Formosan pronoun and numeral reconstructions; Raleigh Ferrell's *Paiwan Dictionary* (1982); Elizabeth Zeitoun's *A Grammar of the Tsou Language* (2005) and the Council of Indigenous Peoples' standardized Tsou orthography; Blust's *Thao Dictionary* (2003); the *Kamus Bahasa Dayak Ngaju* for Ngaju; and the Kadazandusun Language Foundation lexicon for Central Dusun. Pronoun sense (free vs. bound, singular vs. plural) was checked against Li's Formosan pronoun tables.

## Issues found
### 1. `tsu` — star — palatal /c/ used where Tsou ⟨c⟩ = /ts/
- **File:** `words/star.js` — code `tsu`
- **Current:** ["congroha","coŋroxa"]
- **Expected:** ["congroha","tsoŋroxa"]
- **Why:** In the standardized Tsou orthography (Zeitoun 2005; CIP orthography) the grapheme ⟨c⟩ represents the alveolar affricate /ts/ — cf. the autonym *Cou* /tsou/, *cou* "person". The transcription already correctly renders word-final ⟨h⟩ as the velar fricative /x/ (…roxa), showing the intent is a careful phonemic broad IPA; keeping ⟨c⟩ as a palatal stop /c/ is therefore internally inconsistent and phonetically wrong. It should read /tsoŋroxa/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
