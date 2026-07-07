# Wordmap review #364 — Bantu (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Miriam K. Odenyo, a descriptive/comparative Bantuist working from the East-Central-Southern Bantu zones (Guthrie zones E, F, G, J, N, P, R, S, plus the A.70 Yaounde-Fang appendage). My standing references for this pass are Nurse & Philippson (eds.), *The Bantu Languages* (2003/2019); Guthrie, *Comparative Bantu* (1967–71) and the Bastin/Coupez/Mann updated reflexes (BLR3); Ashton, *Swahili Grammar* and the TUKI *Kamusi ya Kiswahili Sanifu* for sw; Ahmed-Chamanga's *Dictionnaire comorien–français* for zdj/swb; Michael Marlo's Luhya (Luyia) tonal/lexical corpus and the Appleby *Luyia–English Vocabulary* for luy; Taylor's *A Grammar of Kinyankore-Kiga* / the Runyakitara materials for nyn/cgg/ttj/nyo; Barlow & Benson (*Kikuyu–English Dictionary*) for ki, and the Mount-Kenya E.50 sources (Marten/Bennett) for mer/ebu/kam; Doke & Vilakazi (Zulu), Pahl et al. *Greater Dictionary of Xhosa*, and Ziervogel/Mabille-Dieterlen (Sotho-Tswana) for the Nguni/Sotho set; van der Veen/Medjo Mvé for fan. I read every cell against orthographic norm plus a phonemically defensible broad IPA, paying special attention to the ng'/ŋ digraph and prenasalisation conventions that trip up transcribers.

## Issues found
### 1. `luy` — star — orthographic apostrophe leaked into the IPA
- **File:** `words/star.js` — code `luy`
- **Current:** ["eng'ining'ini","eŋʼiniŋʼini"]
- **Expected:** ["eng'ining'ini","eŋiniŋini"]
- **Why:** In standard Luhya (Luyia) orthography the digraph `ng'` is simply the velar nasal /ŋ/ (as against `ng` = /ŋɡ/); see Appleby's *Luyia–English Vocabulary* and Marlo's Luyia transcription conventions. The broad IPA should therefore render each `ng'` as a plain [ŋ], giving [eŋiniŋini]. The current value carries the modifier apostrophe ʼ (U+02BC) straight over from the orthography into the phonetic string ([ŋʼ]), which in IPA would spuriously mark ejection/glottalisation — a segment Luhya does not have here. This is an orthography-to-IPA contamination error, not a real feature. The native-script form itself is correct and stays unchanged.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
