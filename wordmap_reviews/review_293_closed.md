# Wordmap review #293 — Kra-Dai & Hmong-Mien (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Naruemon Wdetwongyanon, a comparative Tai–Kadai and Hmong-Mien phonologist. My working desk references for this review are Fang-Kuei Li's *A Handbook of Comparative Tai* (1977) and William J. Gedney's *Tai dialect* field notebooks for the pronoun/numeral reconstructions (*ku*, *maɯŋ*, *sɔːŋ*, *daːw*), Mary Haas's *Thai-English Student's Dictionary* (1964) and the Royal Institute Dictionary for Standard Thai orthography and the high/low consonant-class tone rules, Anthony Diller's work on Southern Thai (Pak Tai) for the regional pronoun set (ฉาน, สู), Ernest Heimbach's *White Hmong–English Dictionary* (1979) for RPA tone letters (b=˥, j=˥˧, v=˩˧) and lexemes (*kuv*, *koj*, *ob*, *npe*, *hnub qub*), Martha Ratliff's *Hmong-Mien Language History* (2010), Zhang Junru et al.'s *Zhuangyu Fangyan Yanjiu* for Standard Zhuang (*gou*, *song*, *coh*, *ndaundeiq*) and the s=/θ/, nd=/ɗ/ conventions, and Sai Kam Mong / Shan orthographic sources for the Shan cells. I checked every cell for sense (avoiding polite/honorific or plural pronouns, ordinals, and proper names), native-script correctness, and IPA plausibility with particular attention to the Tai aspirated vs. unaspirated /t͡ɕʰ ~ t͡ɕ/ contrast and tone contours.

## Issues found

### 1. `th_s` — i — missing aspiration on ฉ
- **File:** `words/i.js` — code `th_s`
- **Current:** ["ฉาน","t͡ɕaːn˦"]
- **Expected:** ["ฉาน","t͡ɕʰaːn˦"]
- **Why:** The Southern Thai (Pak Tai) 1sg pronoun ฉาน (from Central Thai ฉัน) begins with ฉ (cho chิ่ng), a high-class letter whose value is the aspirated palatal affricate /t͡ɕʰ/, not plain /t͡ɕ/ (Haas 1964; Royal Institute). The transcription as unaspirated "t͡ɕaːn" is a segmental error — and it is internally inconsistent with this same variety's `name` cell ["ชื่อ","t͡ɕʰɯː˧"], where ช (also an aspirated affricate) is correctly rendered with the aspiration diacritic. Unaspirated /t͡ɕ/ in Thai spells จ, a different letter. Tone ˦ is retained.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
