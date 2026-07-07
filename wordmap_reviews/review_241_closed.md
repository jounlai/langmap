# Wordmap review #241 — Bantu (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Thandiwe M. Nkosi, a descriptive/comparative Bantuist working primarily on the Southern and Eastern Bantu zones (S, E, G, JE). My core references for this review are Nurse & Philippson (eds.) *The Bantu Languages* (2003) for comparative reconstruction and zone assignment; Ashton, *Swahili Grammar* (1947) and the *TUKI Kamusi ya Kiswahili Sanifu* for Sabaki/G40; Doke & Vilakazi, *Zulu-English Dictionary* (1948) and Doke, *The Phonetics of the Zulu Language* (1926) for the Nguni obstruent series; Ziervogel & Mabuza, *A Grammar of the Swati Language* (1976) plus Rycroft's *Concise SiSwati Dictionary* for siSwati (S43); Coupez et al. for Rwanda-Rundi (JD); and Guthrie's *Comparative Bantu* for the *-bɪ̀dɪ̀ ("two"), *-jínà ("name") and the innovating "star" roots (*-ɲeɲedɪ, *-tandʊ, njata, ndondwa). My review privileges the phonemic obstruent contrasts that Nguni orthography encodes overtly (aspirated *kh/ph/th* vs. plain/ejective *k/p/t*), where transcription errors are objectively checkable against the spelling.

## Issues found

### 1. `ssw` — star — aspirated *kh* mis-transcribed as ejective
- **File:** `words/star.js` — code `ssw`
- **Current:** ["inkhanyeti","iŋkʼaɲetʼi"]
- **Expected:** ["inkhanyeti","iŋkʰaɲeti"]
- **Why:** In siSwati (as in Zulu/Nguni) the digraph *kh* unambiguously encodes the aspirated stop /kʰ/, contrasting with plain *k* (Doke 1926; Ziervogel & Mabuza 1976 §Phonology). Rendering *kh* as ejective /kʼ/ is therefore wrong — it collapses the very contrast the orthography marks. It is also inconsistent with the dataset's own Zulu cognate `inkanyezi` = /iŋkaˈɲeːzi/, where plain *k* is correctly a plain stop; the aspirated Swati form must be /kʰ/. The word-final plain *t* should likewise be a plain /t/ (matching the dataset's non-ejective convention for plain stops), not /tʼ/.

### 2. `ssw` — name — spurious aspiration on plain *t*
- **File:** `words/name.js` — code `ssw`
- **Current:** ["libito","libiːtʰo"]
- **Expected:** ["libito","libiːto"]
- **Why:** The orthographic letter here is plain *t* (not the aspirated digraph *th*), so it must be a plain /t/, not /tʰ/. Reserving aspiration for the *th/kh/ph* digraphs is exactly how the dataset treats every other Nguni entry (cf. Zulu `igama`, `inkanyezi` with plain stops). The aspirated /tʰ/ is an internal inconsistency — the same lexeme set gives plain *t* elsewhere — and contradicts Rycroft's and Ziervogel & Mabuza's phonemic inventory for siSwati. Penultimate lengthening on the vowel is retained.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
