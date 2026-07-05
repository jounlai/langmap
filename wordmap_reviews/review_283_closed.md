# Wordmap review #283 — Bantu (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ndapewa Kaukungua, a descriptive Bantuist working on the southwestern (Zone R/K) and Grassfields peripheries of the family. For this batch I relied on Fivaz's *A Reference Grammar of Oshindonga* and Tobias & Turvey's *English–Kwanyama Dictionary* for the Oshiwambo cluster; W. G. Schadeberg's *A Sketch of Umbundu* together with Valente's *Gramática do Umbundu* and Sanders' *Vocabulary of the Kimbundu Language* / Chatelain's *Grammática elementar do Kimbundu* for the Angolan Zone R/H varieties; Möhlig & Kavari's *A Grammatical Sketch of Herero* for Otjiherero; Horton's *Grammar of Luvale*; Collins' *Tonga Grammar* and the *Chitonga–English Dictionary* for Zone M; the Cannon/LOT materials and *Lusoga* orthography for Soga; Redden's *Descriptive Grammar of Ewondo* and Alexandre's Beti materials for Ewondo/Bulu; and S. C. Anderson's Aghem tonology (SCOPIL) for the Ring Grassfields data. Reconstructions were cross-checked against Guthrie's *Comparative Bantu* and Meeussen's *Bantu Grammatical Reconstructions*.

## Issues found
### 1. `umb` — star — spurious vowel nasalization in IPA
- **File:** `words/star.js` — code `umb`
- **Current:** ["onyeleñgele","oɲelẽŋɡele"]
- **Expected:** ["onyeleñgele","oɲeleŋɡele"]
- **Why:** The broad IPA nasalizes the mid vowel as `ẽ` before the `ñg` digraph. Umbundu (Schadeberg, *A Sketch of Umbundu*; Valente) has no phonemic nasal vowels; the orthographic `ñg` represents a velar-nasal + voiced-stop / prenasalized sequence /ŋɡ/, and the preceding vowel /e/ is fully oral. The nasal diacritic on the vowel is an over-transcription and should be removed, giving /oɲeleŋɡele/. The native orthography is unaffected.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
