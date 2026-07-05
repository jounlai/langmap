# Wordmap review #320 — Austroasiatic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Senghour Vong, a descriptive/historical linguist specializing in Austroasiatic, with fieldwork on Palaungic and Katuic. For this review I lean on Gérard Diffloth's Palaungic and Waic reconstructions and Justin Watkins' *A Grammar of Wa* (Waic phonology and the standard Parauk romanization); Franklin Huffman's *Cambodian System of Writing* and the Headley et al. *Cambodian–English Dictionary* for Khmer/Old Khmer; Laurence Thompson's *A Vietnamese Grammar* and the Nôm character corpus (Vietnamese Nôm Preservation Foundation) for Vietnamese/Chữ Nôm; H. L. Shorto's *A Dictionary of Modern Spoken Mon* for Monic; Paul Sidwell's *The Katuic Languages* and *Bahnaric* comparative work for Kuy/Bru/Bahnar; and Gregory Anderson's *The Munda Languages* plus Norman Zide's Sora/Gorum materials for Munda (Santali, Mundari, Ho, Sora). I cross-checked every cell against the cognate set within each subgroup, since register/vowel consistency across Palaungic and Munda is the strongest internal control.

## Issues found

### 1. `prk` — star — non-cognate outlier, should be the Palaungic *sŋaj reflex
- **File:** `words/star.js` — code `prk`
- **Current:** ["hmoing","hmɔiŋ"]
- **Expected:** ["si-ngai","sŋaɪ"]
- **Why:** Parauk Wa 'star' is the Proto-Palaungic/Proto-Waic *sŋaj reflex, standardly romanized *si-ngai* (Chinese-Wa orthography), as attested in Watkins' Wa lexicon. The rest of the prk row is already cognate-consistent with the Waic set (name *yaom* /jɔm/ = wbm/lwl *yum*, two *rao* /ra̤ɯ/ = wbm *ra* /raɯ/), and the two sibling "Wa/Waic" entries here — wbm *si-ngai* /səŋaɪ/ and Eastern Lawa lwl *sngaɰ* /sŋaɰ/ — both carry the *sŋaj root. "hmoing" /hmɔiŋ/ is not a Waic reflex for 'star' and breaks this three-way agreement; it is an erroneous cell.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
