# Wordmap review #354 — Turkic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aygül Karabekova, a comparative Turkologist working primarily on the peripheral (Siberian and Sino-Turkic) branches of the family. For this review I lean on Sir Gerard Clauson's *An Etymological Dictionary of Pre-Thirteenth-Century Turkish* (1972), Marcel Erdal's *A Grammar of Old Turkic* (2004) and *Old Turkic Word Formation* (1991), Lars Johanson & Éva Á. Csató (eds.), *The Turkic Languages* (2nd ed. 2022), and — critically for the two languages at issue here — Arienne M. Dwyer's *Salar: A Study in Inner Asian Language Contact Processes, Part I: Phonology* (Turcologica 37/1, 2007), S. E. Malov's *Язык жёлтых уйгуров* (1957) and Hans Nugteren & Marti Roos's Yugur lexical work. I cross-checked the celestial and numeral cognate sets against the comparative Turkic database at Elegant Lexicon (turkic.elegantlexicon.com). My focus is the Oghur/Siberian/Sino-Turkic peripheries where regular sound laws (Salar/West-Yugur sibilantization of *k, Siberian *y-, Chuvash rhotacism/lambdacism) most often trip up compiled wordlists.

## Issues found

### 1. `slr` — two — Salar sibilantized reflex missing
- **File:** `words/two.js` — code `slr`
- **Current:** ["igi","iɣi"]
- **Expected:** ["işki","iʃki"]
- **Why:** Salar is one of the Sino-Turkic varieties (with the Kalpin Uyghur dialect and, areally, West Yugur) in which Common Turkic *ẹki 'two' developed a characteristic epenthetic/metathetic sibilant. Dwyer (2007) and Tenišev's Salar materials record the numeral as *işki ~ ixgi*; the comparative Turkic database gives Salar `i̥ʃkkʰi / išqi` and Omniglot lists `işki, işkey, xigei`. Every documented Salar form contains the sibilant [ʃ]. The current `igi`/[iɣi] (a bare intervocalically-voiced *iki) is not an attested Salar shape and should be `işki` [iʃki].

### 2. `ybe` — star — West Yugur has initial *y-, not h-
- **File:** `words/star.js` — code `ybe`
- **Current:** ["hïltïs","hɯltɯs"]
- **Expected:** ["yïltïs","jɯltɯs"]
- **Why:** Western Yugur (Sarïgh Yughur) regularly retains Common Turkic word-initial *y- [j]; it has no *y- > h- development (its famous preaspiration is a *medial* feature conditioned by voiceless stops, not a word-initial prothesis). The reflex of *yultuz 'star' is accordingly recorded with initial [j]: the comparative Turkic database standardizes the West Yugur form as `yiltïs`, and comparative surveys cite `jïltïs / jəltəs / juldus`. The current h-initial `hïltïs`/[hɯltɯs] has an unmotivated onset; the vowels are fine, only the initial consonant is wrong — it should be `yïltïs` [jɯltɯs].

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
