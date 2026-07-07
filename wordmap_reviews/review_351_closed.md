# Wordmap review #351 — Slavic & Baltic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marek Zaborowski, a historical-comparative Slavist and Baltist working from the standard reference apparatus for the family: Comrie & Corbett, *The Slavonic Languages* (Routledge, 1993) and Sussex & Cubberley, *The Slavic Languages* (Cambridge, 2006) for the pan-Slavic frame; H. Lunt, *Old Church Slavonic Grammar* (7th ed.) for `cu` and the *azъ/дъва/имѧ/звѣзда* citations; A. Zaliznjak and the *Zaliznjak dictionary* plus Avanesov for East-Slavic stress (`ru`, `be`, `uk`, `orv`, `rue`); J. Toporišič, *Slovenska slovnica* and the *SSKJ* (*Slovar slovenskega knjižnega jezika*) for Slovene tonemics and vowel quality; for Baltic, V. Ambrazas (ed.), *Lithuanian Grammar* and T. Mathiassen's short grammars of Lithuanian and Latvian (incl. Latvian broad vs. narrow /e ~ æ/). For the Sorbian, Kashubian and Silesian micro-standards I rely on Stone (in Comrie & Corbett), Faßke's *Grammatik der obersorbischen Schriftsprache*, and the Kashubian normative dictionaries. I checked each cell for sense (strictly 1sg / 2sg-informal / cardinal 2 / appellative noun / celestial noun), orthographic norm, and broad-IPA plausibility including the South-Slavic pitch-accent and Baltic length/palatalization conventions used elsewhere in the corpus.

## Issues found
### 1. `sl` — name — wrong vowel quality and missing length on stressed final vowel
- **File:** `words/name.js` — code `sl`
- **Current:** ["ime","iˈmɛ"]
- **Expected:** ["ime","iˈmeː"]
- **Why:** Standard Slovene *imé* (gen. *iména*) carries a long, close-mid stressed final vowel — SSKJ marks it *imé* (é = long /e/), i.e. [iˈmeː], not the short open-mid [ɛ]. Slovene phonemically distinguishes /e/ (é) from /ɛ/ (è), and this word has /e/. The transcription is also internally inconsistent: every other Slovene cell in this domain correctly writes stressed vowels long and close — `i` jaːs, `you` tiː, `two` dʋaː, `star` ˈzʋeːzda (close-mid [eː]). Only `name` was left with a short open [ɛ]. Reference: Toporišič, *Slovenska slovnica*; SSKJ headword *imé*.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live `words/name.js` via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
