# Wordmap review #302 — Papuan (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Miriam Kautz, a descriptive linguist specializing in the non-Austronesian ("Papuan") languages of New Guinea and eastern Timor, with secondary competence in Muskogean (which appears here as a set of control languages). For the Trans-New Guinea material I lean on Andrew Pawley, Ralph Bulmer et al., *A Dictionary of Kalam with Ethnographic Notes* (Pacific Linguistics 630, 2011); Adrianne Lang, *Enga Dictionary with English Index* (PL C-20, 1973); Stephen Rule and G. C. J. Lomas on Huli; Günther Renck, *A Grammar of Yagaria* (PL B-40, 1975); Juliette Huber, *First Steps towards a Grammar of Makasae* (LINCOM, 2011) for the Timor-Alor-Pantar side; and Arjen Lock's SIL Abau materials for Upper Sepik. For the Muskogean outliers (Chickasaw, Choctaw, Muscogee) I use Munro & Willmond's *Chickasaw Dictionary*, George Aaron Broadwell's *Choctaw Reference Grammar*, and Jack B. Martin & Margaret Mauldin, *A Dictionary of Creek/Muskogee* plus Martin's *A Grammar of Creek (Muskogee)*. I cross-checked doubtful cells against the Wiktionary Muskogean Swadesh appendix and community Mvskoke resources.

## Issues found

### 1. `mus` — you — wrong native form (n for m in 2sg independent pronoun)
- **File:** `words/you.js` — code `mus`
- **Current:** ["cene","tʃiːni"]
- **Expected:** ["cvme","t͡ʃiːmi"]
- **Why:** The Muscogee (Creek) independent 2sg pronoun "you" is **cvme** (long-vowel variant orthography **cēme**), pronounced [t͡ʃiːmi], not "cene". Martin & Mauldin's *Dictionary of Creek/Muskogee* and Martin's *Grammar of Creek* list the emphatic/independent personal pronouns as vne (1sg), cvme (2sg), pome (1pl); the Wiktionary Muskogean Swadesh appendix likewise gives Creek "you" = *cēme*, and the Southeastern Mvskoke Nation lexicon gives the cvm(e) stem. The data's medial consonant is a transcription slip: it must be **m**, not **n** — the IPA should end in [mi], not [ni]. (Note: the 1sg cell `vne`/[ani] and `two` = hokkolen are correct, so this is an isolated slip in the paradigm.)

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
