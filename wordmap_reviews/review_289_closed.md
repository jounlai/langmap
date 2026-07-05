# Wordmap review #289 — Indo-Iranian (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ramin Sethi, a historical-descriptive linguist working across the Indo-Iranian continuum, with fieldwork emphasis on Dardic and Western Iranian. My routine desk references for this review were Colin Masica, *The Indo-Aryan Languages* (Cambridge, 1991) and R. L. Turner's *A Comparative Dictionary of the Indo-Aryan Languages* (CDIAL) for the Indo-Aryan cognate sets (I, you, two, name, star ← *aham, *tuvam, *dvi-, *nāman-, *tārā-); Georg Morgenstierne's Dardic materials and D. L. R. Lorimer for Khowar/Kashmiri; Gilbert Lazard, *A Grammar of Contemporary Persian* for the Persian cluster (fa/prs/tg/jpr/luz/lrr); D. N. MacKenzie for Kurdish; and, decisively for this round, Habibullah Tegey & Barbara Robson, *A Reference Grammar of Pashto* (1996) together with Herbert Penzl, *A Grammar of Pashto* (1955) for the Pashto pronominal vocalism. I cross-checked pronoun grade (informal-singular, not honorific/plural), numeral cardinality, native orthography, and broad-IPA segment fidelity against these sources.

## Issues found

### 1. `ps` — i — Pashto 1SG pronoun has schwa, not /a/
- **File:** `words/i.js` — code `ps`
- **Current:** ["زه","za"]
- **Expected:** ["زه","zə"]
- **Why:** Standard literary Pashto realizes the 1SG pronoun زه with the mid-central vowel schwa: /zə/ (Tegey & Robson 1996 §pronouns; Penzl 1955). Pashto contrasts /ə/ and /a/ phonemically, so transcribing /za/ selects the wrong vowel phoneme. Orthography زه is correct; only the IPA vowel is wrong.

### 2. `ps` — you — Pashto 2SG pronoun has schwa, not /a/
- **File:** `words/you.js` — code `ps`
- **Current:** ["ته","ta"]
- **Expected:** ["ته","tə"]
- **Why:** The Pashto 2SG-informal pronoun ته is /tə/ with schwa, parallel to زه /zə/ (Tegey & Robson 1996; Penzl 1955). /ta/ with open /a/ mis-selects the phoneme in a language where /ə/ ~ /a/ is contrastive. Orthography ته is correct; the sense (2sg familiar) is correct; only the IPA vowel needs fixing.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
