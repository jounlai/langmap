# Wordmap data review #499 — historical-proto

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: historical-proto.

## Reviewer self-introduction (ペルソナ自己紹介)

Historical & proto-language reviewer; source-traceable reconstructions. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] iron/nose/sleep — pal (Middle Persian / Pahlavi)
- **Issue:** The Pahlavi column is otherwise written in Book Pahlavi native script, but three cells are left in bare Latin transliteration: iron ['āhan','aːhan'], nose ['wēnīg','weːniːɡ'], sleep ['xuftan','xuftan']. The FORMS are correct Middle Persian (āhan 'iron', wēnīg 'nose', xuftan 'to sleep'); only the script is inconsistent — the 'mostly-native row with stray Latin cells' pattern.
- **Fix:** Convert the three surface fields to Inscriptional Pahlavi (NOT "Book Pahlavi") to match the column's actual script, keeping the Latin reading in the ipa field. Following the column's own orthographic conventions: iron/pal → ["𐭠𐭧𐭭","aːhan"] (āhan = ʾ-h-n, using 𐭧 for h as in māh 𐭬𐭠𐭧); nose/pal → ["𐭥𐭩𐭭𐭩𐭪","weːniːɡ"] (wēnīg = w-ē-n-ī-g, cf. māhīg 𐭬𐭠𐭤𐭩𐭪 for -īg); sleep/pal → ["𐭧𐭥𐭯𐭲𐭭","xuftan"] (xuftan = x-w-f-t-n, cf. xwardan 𐭧𐭥𐭫𐭲𐭭). These glyph spellings follow the column's existing phonetic Inscriptional-Pahlavi convention and standard Pahlavi orthography (ʾhn', wynyk, hwptn'); if the maintainer prefers, they should be validated against the exact spellings used elsewhere in the column, but the readings themselves are correct and must not change.
- **Source:** MacKenzie, A Concise Pahlavi Dictionary (āhan, wēnīg, xuftan); the pal column's own predominant use of Book Pahlavi script.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [LOW] four & hundred — psem (Proto-Semitic)
- **Issue:** The psem column consistently notates glottal stop as ʔ and pharyngeal as ʕ (father *ʔab-, eye *ʕayn-, one *ʔaḥad-), but 'four' surface is *ʼarbaʻ- (modifier-apostrophe ʼ + turned-comma ʻ) and 'hundred' surface is *miʾat- (half-ring ʾ). The ipa fields already give correct 'ʔarbaʕ' and 'miʔat', confirming the surfaces are mis-keyed.
- **Fix:** four (psem): "*ʔarbaʕ-" ; hundred (psem): "*miʔat-" — same as suggestedFix, normalizing the surface to the column's U+0294 ʔ / U+0295 ʕ convention already used by the ipa fields.
- **Source:** Standard PSem *ʔarbaʕ- 'four', *miʔ-at- 'hundred' (Kogan / Semitic Etymological Dictionary; Wiktionary Appendix:Proto-Semitic stems); internal notation of the psem column.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] two — sa (Sanskrit)
- **Issue:** Sanskrit 'two' is cited as द्वि ['dvi'], the bare stem, whereas other Sanskrit numerals use the nominative citation form (one एकः ekaḥ, three त्रयः trayaḥ, four चत्वारः catvāraḥ). The Vedic column gives the correct nominative द्वौ dvau.
- **Fix:** Change words/two.js sa entry to द्वौ with IPA dʋɐu — i.e. sa: ["द्वौ", "dʋɐu"]. (Note: the suggested 'dvau' is a romanization; the dataset's second element is IPA, and the ʋ form matches the existing h_vedic "two" = dʋɐu and sa "four" = tɕatʋaːraɦ.)
- **Source:** Monier-Williams s.v. dvi- (nom. dvau); parallel h_vedic 'two' = द्वौ dvau.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 3 awaiting a decision.
