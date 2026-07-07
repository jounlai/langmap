# Wordmap review #272 — Turkic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aisulu Berdimuratova, a comparative Turkologist working primarily from Lars Johanson & Éva Á. Csató (eds.), *The Turkic Languages* (2nd ed., 2022); Sir Gerard Clauson, *An Etymological Dictionary of Pre-Thirteenth-Century Turkish* (1972); the collective *Sravnitel'no-istoricheskaya grammatika tyurkskikh yazykov* (Tenishev et al.); Marcel Erdal, *A Grammar of Old Turkic* (2004); and language-specific references including N. Poppe, *Bashkir Manual* (1964), M. Räsänen's *Versuch eines etymologischen Wörterbuchs der Türksprachen*, the *Дыбо/Мудрак* reconstructions of Proto-Turkic pronouns and numerals, and E. R. Tenishev's Salar and Sarygh-Yugur field materials. My focus areas are the Oghur (Chuvash), Siberian (Sakha/Dolgan/Tuvan/Khakas/Shor/Yugur/Tofa), and Kipchak subgroups, plus the diachronic *b-/m-* alternation in the 1sg pronoun and the *yultuz ~ yulduz* etymon for "star".

## Issues found

### 1. `ba` — star — internally inconsistent vowel transcription
- **File:** `words/star.js` — code `ba`
- **Current:** ["йондоҙ","jʊnˈdoð"]
- **Expected:** ["йондоҙ","jʊnˈdʊð"]
- **Why:** Bashkir йондоҙ contains the vowel letter ⟨о⟩ twice (й-**о**-н-д-**о**-ҙ), and in Bashkir both are the same single phoneme — the reduced rounded back vowel realized ≈[ʊ] (Poppe, *Bashkir Manual*; Johanson & Csató, Bashkir chapter). The dataset itself already renders this reduced ⟨о⟩ as ʊ in the parallel Tatar cell (Tatar йолдыз → /jʊɫˈdɤz/). The two identical ⟨о⟩ vowels here are transcribed differently (first ʊ, second o), which cannot be correct: the second syllable should match the first, giving /jʊnˈdʊð/. The consonant ҙ = /ð/ and final stress are otherwise correct.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
