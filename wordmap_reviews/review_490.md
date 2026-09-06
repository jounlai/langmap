# Wordmap data review #490 — uralic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: uralic.

## Reviewer self-introduction (ペルソナ自己紹介)

Uralic reviewer; vowel length, citation forms. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] wind / myv (Erzya)
- **Issue:** The cell is ["var̃ma", "var̃ma"]: the surface is Latin script with a combining tilde over r, and the IPA is identical to it and contains "r̃", which is not a valid IPA symbol. Erzya wind is the Cyrillic word варма. Every other Mordvinic cell in the file is Cyrillic surface + clean Latin IPA (cf. Moksha mdf варма / "varma" in the same concept), so this row is corrupted on both fields.
- **Fix:** ["варма", "varma"]
- **Source:** Erzya варма 'wind' (Wikipedia/Omniglot Erzya; Wikivoyage Erzya phrasebook 'Пуви виев варма'); internal comparison to mdf варма "varma" in words/wind.js.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] hundred / udm (Udmurt)
- **Issue:** сю 'hundred' is transcribed "su", dropping the palatalization. In Udmurt orthography a consonant + iotated vowel (ю) marks a palatalized consonant + /u/, so сю = /sʲu/. The same file already renders сюлэм 'heart' (udm) as "sʲulem", so this cell is internally inconsistent as well as wrong.
- **Fix:** Change hundred/udm IPA from "su" to "sʲu".
- **Source:** Udmurt grammar: palatalization opposition in dentals /d t s z n l/ marked by iotated vowels (en.wikipedia.org/wiki/Udmurt_grammar); internal сюлэм "sʲulem" in words/heart.js.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [MED] cat / udm (Udmurt)
- **Issue:** коӵыш 'cat' is transcribed "kotɕɨʃ" with the alveolo-palatal /tɕ/. The letter ӵ is the HARD affricate /t͡ʃ/, distinct from soft ч /t͡ɕ/; Wiktionary gives [koˈt͡ʃɯ̈ʃ]. The file correctly uses /tɕ/ for ч elsewhere (e.g. udm чорыг 'fish' "tɕorɨɡ"), so ӵ here should be the hard /tʃ/.
- **Fix:** kotʃɨʃ
- **Source:** Wiktionary коӵыш [koˈt͡ʃ̺ɯ̈ʃ]; Che-with-diaeresis Ӵ = non-palatalized /t͡ʃ/ vs ч /t͡ɕ/ (en.wikipedia.org/wiki/Che_with_diaeresis).
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [MED] bone / se and tooth / se (North Sámi)
- **Issue:** North Sámi á is unambiguously long /aː/, but bone se dákti is transcribed "dakti" and tooth se bátni is transcribed "batni" — the length (and stress) is dropped. The file transcribes á correctly as /aː/ in the same slice: star se násti "ˈnaːsti", salt se sálti "ˈsaːlti", moon se mánnu "maːnːu", father se áhčči "aːhtʃːi".
- **Fix:** bone se → ["dákti", "ˈdaːkti"]; tooth se → ["bátni", "ˈbaːtni"] (core correction is the /aː/ length; leading stress ˈ matches násti/sálti but is optional given inconsistent stress marking elsewhere)
- **Source:** North Sámi orthography: á = /aː/ (standard descriptions); internal consistency with se násti/sálti/mánnu in this dataset.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [LOW] iron / fi, milk / fi, salt / fi (Finnish)
- **Issue:** Finnish orthographic a is the back vowel /ɑ/, and the file uses ɑ in the large majority of fi cells (e.g. bird "ˈlintu", fish "ˈkɑlɑ", tooth "ˈhɑmːɑs"), but a handful render it as front /a/: iron rauta "ˈrauta", milk maito "ˈmaito", salt suola "ˈsuola". These are internal inconsistencies, not a dialectal choice.
- **Fix:** iron/fi: "ˈrɑutɑ"; milk/fi: "ˈmɑito"; salt/fi: "ˈsuolɑ" (identical to the suggested fix)
- **Source:** Finnish phonology: a = /ɑ/; internal majority convention in this dataset.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 2 applied, 3 awaiting a decision.
