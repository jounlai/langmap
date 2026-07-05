# Wordmap review #311 — Tibeto-Burman (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Tenzin R. Wangmo, a descriptive/historical linguist working on the Bodish, Qiangic, Loloish and Kuki-Chin branches of Tibeto-Burman. My desk references for this review are James A. Matisoff's *The Dictionary of Lahu* (1988) and *Handbook of Proto-Tibeto-Burman* (2003); Randy LaPolla's grammars of Qiang (*A Grammar of Qiang*, 2003) and Dulong/Rawang; Guillaume Jacques' work on Japhug and Situ rGyalrong; George van Driem's *A Grammar of Limbu* (1987); Gwendolyn Hyslop's *A Grammar of Kurtöp* (2017); Nathan Hill and Bettina Zeisler on Tibetic (Balti/Ladakhi); and standard references for Written/Colloquial Burmese, Meitei (Mayek), Nuosu Yi and Mizo. I checked each cell for correct sense (informal singular pronoun, cardinal numeral, common-noun readings), script appropriateness, and phonotactic/tonal plausibility of the IPA. The overwhelming majority of cells are well sourced and correct — including the nicely conservative Amdo pre-aspiration (སྐར་མ = *hkarma*, གཉིས = *hɲi*), the Kurtöp East Bodish set (*ŋat / wit / zon*), the Rakhine retention of the *kr-* onset (ကြယ် = *krɛ̀* vs. Burmese *tɕɛ̀*), and the van Driem Limbu forms (*aŋga / kʰɛnɛʔ*). Only one cell fails on phonotactic grounds.

## Issues found
### 1. `lhu` — star — malformed native form with an impossible syllable-final stop
- **File:** `words/star.js` — code `lhu`
- **Current:** ["mûkʰ","mɯ̀ kɯ̂"]
- **Expected:** ["mvuh-keu","mɯ̀ kɯ̂"]
- **Why:** The native field "mûkʰ" is phonotactically impossible in Lahu: the language permits no syllable-final consonants other than glottal stop /ʔ/, so a coda "-kʰ" cannot occur. It is also internally inconsistent with its own IPA, which is clearly **disyllabic** "mɯ̀ kɯ̂". The word for 'star' in Matisoff's *Dictionary of Lahu* is the compound *mvuhˍ-keuˆ* (sky/heaven + classifier-like element), i.e. /mɯ̀-kɯ̂/ — low tone on the first syllable, high-falling on the second, exactly matching the IPA already present. "mûkʰ" is a truncated/corrupted rendering; the native orthography should be written as the two-syllable *mvuh-keu* (equivalently *mɯ̀-kɯ̂*). Only the orthography field is wrong; the IPA is retained.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
