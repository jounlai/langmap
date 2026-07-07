# Wordmap review #215 — Nilo-Saharan (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Achol Deng-Mayen, a descriptive/historical linguist specializing in the Nilotic and Eastern-Sudanic branches of Nilo-Saharan, with fieldwork on Western Nilotic (Dinka, Nuer, Anywa) and comparative work across the Eastern Nilotic Maa cluster. My review leans on the standard reference apparatus: Tucker & Mpaayei, *A Maasai Grammar with Vocabulary* (1955); Doris L. Payne's phonological work on Maa ATR harmony; Tucker & Bryan, *Linguistic Analyses: The Non-Bantu Languages of North-Eastern Africa* (1966); Dimmendaal, *The Turkana Language* (1983) and his Nilotic survey work; Nebel, *Dinka-English Dictionary* (1979) and Crazzolara/Frank for Nuer; Reh, *Anywa Language* (1996); Cyffer & Hutchison, *Dictionary of the Kanuri Language* (1990); Browne, *Old Nubian Dictionary* (1996); and Spagnolo, *Bari Grammar* (1933). My focus below is genuine segment/sense errors, not orthographic taste.

## Issues found

### 1. `mas` — i — Maasai 1sg pronoun: IPA drops the [-ATR] vowel
- **File:** `words/i.js` — code `mas`
- **Current:** ["nanʉ","nanu"]
- **Expected:** ["nanʉ","nanʊ"]
- **Why:** The native orthography already writes the emphatic 1sg pronoun with ⟨ʉ⟩, which in Maa orthography (Tucker & Mpaayei 1955; Payne) denotes the [-ATR] high back vowel /ʊ/, i.e. *nánʉ́* = [nánʊ́]. The broad-IPA cell "nanu" uses the [+ATR] /u/ and therefore contradicts its own orthography and the Maa ATR system. This is a wrong-segment error, and the corpus elsewhere preserves ATR vowel quality in IPA (cf. Dinka *yïn* → /jɪn/), so it should read /nanʊ/.

### 2. `saq` — i — Samburu 1sg pronoun: IPA drops the [-ATR] vowel
- **File:** `words/i.js` — code `saq`
- **Current:** ["nanu","nanu"]
- **Expected:** ["nanu","nanʊ"]
- **Why:** Samburu (Sampur) is the immediate sister of Maasai and shares the cognate emphatic 1sg *nanʉ* with the same [-ATR] high back vowel [ʊ] (Tucker & Bryan 1966; Maa ATR harmony). The practical Samburu orthography underspecifies ATR by writing plain ⟨u⟩, but the broad phonemic IPA should be /nanʊ/, not the [+ATR] /nanu/. Wrong-segment error, parallel to the Maasai cell above.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
