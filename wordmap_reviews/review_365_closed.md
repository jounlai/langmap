# Wordmap review #365 — Bantu (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive Bantuist focused on the Southwest (Zone R/K) and Angolan Bantu cluster together with the Beti-Fang (A70) and Grassfields fringe. For this batch I worked from Fivaz's *A Reference Grammar of Oshindonga* and T.E. Tirronen's *Ndonga–English Dictionary* for Ndonga, Riikka Halme's *A Tonal Grammar of Kwanyama* for Kuanyama, W.G. Valente's *Gramática Umbundu* and the Sanders–Fay *Vocabulary of the Umbundu Language* for Umbundu, A.E. Horton's *A Grammar of Luvale* for Luvale, Möhlig & Kavari's *A Grammatical Sketch of Herero* for Otjiherero, Héli Chatelain's *Grammatica Elementar do Kimbundu* for Kimbundu, Kisseberth & Cassimjee's work on Makhuwa tone and orthography, the Luganda/Lusoga Bantu-Great-Lakes descriptions for Soga, Essono's *Grammaire ewondo* and the Bulu mission lexica for the Beti pair, Larry Hyman's *Aghem Grammatical Structure* for Aghem, and Doke-tradition Shona/Ndau materials for Ndau, Lozi and Tonga. Against these sources the Southwest-Bantu ame/ami-and-ove pronoun sets, the Beti tone-marked forms, and the Shona-group cells all check out; the one cell that departs from its own sister-language and from the standard citation form is Ndonga "two".

## Issues found
### 1. `ng` — two — class 9/10 concord given instead of the numeral stem
- **File:** `words/two.js` — code `ng`
- **Current:** ["mbali","ᵐbali"]
- **Expected:** ["vali","vali"]
- **Why:** Oshindonga and Oshikwanyama share the single adjectival numeral stem *-vali* "two" (Fivaz, *Reference Grammar of Oshindonga*; Tirronen, *Ndonga–English Dictionary*), realised as *aavali/yaali* with human/high classes and only as the prenasalised concord *mbali* in the class 9/10 (N-) agreement, e.g. *oombwa mbali* "two dogs". The corpus lists the sister lect Kuanyama (`kj`) correctly with the bare stem ["vali","vali"]; giving Ndonga the class-10 concordial variant *mbali* is internally inconsistent for the same etymon and is not the citation form of the numeral. It should be normalised to the stem *vali* /vali/, matching Kuanyama and the standard Oshiwambo numeral paradigm.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
