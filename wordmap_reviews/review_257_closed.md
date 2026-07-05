# Wordmap review #257 — Oceanic & Polynesian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Malia Tuʻitupou, a descriptive/historical linguist specializing in the Oceanic subgroup, with primary field competence in Nuclear Polynesian and the Micronesian languages. My working reference shelf for this review comprised: Pukui & Elbert, *Hawaiian Dictionary* (1986); Biggs, *English–Māori, Māori–English Dictionary* (Auckland UP); Milner, *Samoan Dictionary* (1966); Churchward, *Tongan Dictionary* (1959) and *Tongan Grammar*; Andrews & Whittaker for Rapanui; the Académie Tahitienne *Dictionnaire*; Ross, Pawley & Osmond, *The Lexicon of Proto Oceanic* (vols. 1–5) for cognate control; Blust, *The Austronesian Languages* (2013) for higher-order reconstruction; Bender et al., *Marshallese Reference Grammar* and the *Marshallese–English Dictionary*; Sohn, *Woleaian Reference Grammar*; Rehg & Sohl, *Ponapean Reference Grammar*; Topping, *Chamorro Reference Grammar/Dictionary*; and, for the Papuan Tip witness in this set, Lister-Turner & Clark, *A Grammar of the Motu Language of Papua*. I checked every cell against reflexes of PPn *au, *koe, *rua, *(h)iŋoa, *fetuʔu and PMic/POc cognates, paying particular attention to *ŋ-reflex spelling (Samoan/Wallisian/Niuean ⟨g⟩ = /ŋ/, Tahitian/Hawaiian *ŋ > ʔ/n) and to segment inventories in the IPA transcriptions.

## Issues found
### 1. `meu` — name — Motu has no dental fricative /ð/
- **File:** `words/name.js` — code `meu`
- **Current:** ["ladana","laðana"]
- **Expected:** ["ladana","ladana"]
- **Why:** The orthographic form *ladana* ("name") is correct, but the transcription mis-segments intervocalic ⟨d⟩ as a dental fricative [ð]. Motu's consonant inventory (Lister-Turner & Clark, *A Grammar of the Motu Language of Papua*; cf. Ross, *POc Lexicon* on Papuan Tip reflexes) contains the voiced alveolar stop /d/ [d] and has **no** dental fricative — the only continuants are /s h/ and the bilabial /v/ [β]. Intervocalic /d/ does not lenite to [ð] in Motu. The IPA should read [ladana].

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
