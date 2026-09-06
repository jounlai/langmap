# Wordmap data review #477 — ie-indo-iranian

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: ie-indo-iranian.

## Reviewer self-introduction (ペルソナ自己紹介)

Indo-Aryan & Iranian reviewer; Devanagari/Perso-Arabic scripts, CDIAL, Wiktionary. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] milk / os (words/milk.js:363)
- **Issue:** The Ossetian surface "æхсыр" begins with a Latin small letter ae (U+00E6) instead of the Cyrillic letter ӕ (U+04D5); the remaining four characters are Cyrillic. Every other Ossetian cell in the dataset correctly uses Cyrillic ӕ (e.g. ӕвзаг, ӕхсӕв, ӕфсӕн, цӕхх). This mixed-codepoint word breaks font rendering, collation and search for this cell.
- **Fix:** ӕхсыр (all Cyrillic; leading character = U+04D5 CYRILLIC SMALL LETTER AE, replacing U+00E6). Full codepoints: U+04D5 U+0445 U+0441 U+044B U+0440. IPA unchanged: əxsɨr
- **Source:** Byte inspection: first char = U+00E6 (LATIN AE) vs. U+04D5 (CYRILLIC AE) used in all other os cells; Ossetian ӕхсыр 'milk' (Abaev, Historical-Etymological Dictionary of Ossetic).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [LOW] iron / nose / sleep — pal (words/iron.js:348, words/nose.js:577, words/sleep.js:536)
- **Issue:** Three Middle Persian (pal) cells are written in Latin transliteration (āhan, wēnīg, xuftan) while the pal row is otherwise consistently in Inscriptional Pahlavi script (e.g. blood 𐭧𐭥𐭭, ear 𐭢𐭥𐭱, tooth 𐭣𐭭𐭣𐭠𐭭, tree 𐭣𐭫𐭧𐭲). Per project convention this row is 'mostly native script', so these are stray-Latin cells, not the by-convention uniform-transliteration case.
- **Fix:** iron.js pal: ["𐭠𐭧𐭭", "aːhan"]; nose.js pal: ["𐭥𐭩𐭭𐭩𐭪", "weːniːɡ"]; sleep.js pal: ["𐭧𐭥𐭯𐭲𐭭", "xuftan"]. (Glyphs match the suggested fix; keep the already-correct IPA. Note sleep's IPA is currently surface===ipa "xuftan" — leave the IPA as "xuftan", only the surface changes to Pahlavi.)
- **Source:** Internal consistency: all other pal cells use Pahlavi (U+10B60 block); MacKenzie, A Concise Pahlavi Dictionary (āhan, wēnīg, xuftan).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 2 awaiting a decision.
