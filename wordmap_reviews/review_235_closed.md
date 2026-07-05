# Wordmap review #235 — Americas (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Iris Cotoca-Rendón, a descriptive/historical linguist working across the indigenous languages of the Americas, with fieldwork-adjacent reference training on both Andean/Amazonian and North American families. For this batch I leaned on: Cusihuamán's *Gramática Quechua Cuzco-Collao* and the Academia Mayor de la Lengua Quechua dictionary; Cerrón-Palomino's *Lingüística Aimara*; England's *Autonomía de los idiomas mayas* and the OKMA/Kaufman Mayan vocabularies (for Kʼicheʼ, Kaqchikel, Qʼeqchiʼ); David Kanatawakhon Maracle's Mohawk teaching grammar and the Kanienʼkéha standardization materials; Jan Ullrich's *New Lakota Dictionary*; Arok Wolvengrey's *nēhiyawēwin* dictionary and Nichols & Nyholm's *Ojibwe Concise Dictionary*; Berthe & DeBlois for Miʼkmaq; the *Comparative Eskimo Dictionary* (Fortescue, Jacobson & Kaplan) for the Inuit–Yupik–Aleut set; Berend Hoff's *The Carib Language* and Cáceres for Yeʼkwana/Maquiritari; Payne's Asháninka and Duff-Tripp's Yanesha materials for Kampan/Arawakan; and the Wayuunaiki (Captain & Captain) and Garifuna lexica. The great majority of cells check out cleanly, including the tonal Oto-Manguean forms, the Andean and Mayan independent pronouns, and the whole Eskimo-Aleut column. I flag only the one cell where the native-orthography field is internally inconsistent with its own transcription and with community-standard spelling.

## Issues found
### 1. `moh` — you — missing phonemic final glottal stop in orthography
- **File:** `words/you.js` — code `moh`
- **Current:** ["í:se","íːseʔ"]
- **Expected:** ["í:se'","íːseʔ"]
- **Why:** The Mohawk (Kanienʼkéha) 2sg emphatic/independent pronoun is /íːseʔ/, and the phonemic final glottal stop is obligatorily written with an apostrophe in the standard orthography: **íːse'** (cf. the paired 1sg cell in the same file, "í:'i", which correctly writes its glottal). The current cell's own IPA field carries the ʔ, so dropping the apostrophe in the orthography field makes the native spelling incomplete/nonstandard and internally inconsistent. Ref: Kanatawakhon Maracle, *Mohawk Language* teaching grammar; Kanienʼkéha standardization guidelines (glottal stop = ⟨'⟩).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
