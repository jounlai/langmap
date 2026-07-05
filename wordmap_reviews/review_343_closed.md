# Wordmap review #343 — Papuan (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Rangi Awoltamon, a descriptive linguist working on Trans-New Guinea and Sepik languages. My primary references for this batch are: Andrew Pawley & Ralph Bulmer, *A Dictionary of Kalam with Ethnographic Notes* (2011) for Kalam (kmh); Arjen Lock, *Abau Grammar* (SIL-PNG, 2011) for Abau (aau); Adrianne Lang, *Enga Dictionary* (Pacific Linguistics C-20, 1973) for Enga (enq); Stephen Rule and the Huli grammatical tradition (J. Rule, W. Rule) plus Lomas' Huli material for Huli (hui); Günther Renck, *A Grammar of Yagaria* (Pacific Linguistics B-40, 1975) and the *Yagaria Dictionary* for Yagaria (ygr); the Mountain-Ok comparative work (Healey) for Faiwol (fai); Juliette Huber and A. Correia's Makasae material for Makasae (mkz); and SIL Kainantu wordlists for Kanite (kmu). For the Muskogean cells that share this batch (outside my core area) I cross-check against Pamela Munro & Catherine Willmond, *Chickasaw: An Analytical Dictionary* (1994) and Jack Martin & Margaret Mauldin, *A Dictionary of Creek/Muskogee* (2000).

## Issues found

### 1. `cic` — star — impossible glottal stop on a consonant-final stem
- **File:** `words/star.js` — code `cic`
- **Current:** ["fochik","foːt͡ʃikʔ"]
- **Expected:** ["fochik","foːt͡ʃik"]
- **Why:** The Chickasaw stem *fochik* 'star' (Munro & Willmond 1994) is consonant-final (…*k*). The appended final /ʔ/ in the IPA is phonotactically impossible: Chickasaw's phrase-final glottalization attaches only to vowel-final citation forms, which is exactly why the other cic cells in this row correctly carry it (*anóʔ*, *chishnoʔ* /t͡ʃiʃnoʔ/, *tokloʔ*, *hohchifoʔ* /hoːt͡ʃifoʔ/ — all vowel-final). A stop coda cannot be followed by /ʔ/; the sister-language cell `cho` star = ["fichik","fitʃik"] correctly shows no glottal on the cognate. The /ʔ/ should simply be dropped.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
