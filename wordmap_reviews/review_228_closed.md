# Wordmap review #228 — Slavic & Baltic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Radomír Vejnović, a comparative Slavicist and Baltist. For the modern Slavic branch I lean on Comrie & Corbett's *The Slavonic Languages* (1993), the *Etymologický slovník jazyka staroslověnského* and the Prague *Slovník jazyka staroslověnského* (SJS/Cejtlin) for Old Church Slavonic, Zaliznjak's *Grammatičeskij slovar'* and Avanesov's orthoepic dictionary for East Slavic stress/palatalisation, Schuster-Šewc's *Historisch-etymologisches Wörterbuch der ober- und niedersorbischen Sprache* for Sorbian, and Boryś's *Słownik etymologiczny języka polskiego* plus the *Słownik gwarowy* tradition for Lechitic (Silesian, Kashubian). For Baltic I use Fraenkel's *Litauisches etymologisches Wörterbuch*, the *Dabartinės lietuvių kalbos žodynas*, and Karulis's *Latviešu etimoloģijas vārdnīca*, with Ambrazas's *Lithuanian Grammar* for prosody. I check every cell for correct sense (singular informal pronoun, cardinal numeral, common-noun 'name'/'star'), standard normalised orthography, and phonemically defensible broad IPA.

## Issues found
### 1. `cu` — star — dzělo/spelling contradicts the given IPA
- **File:** `words/star.js` — code `cu`
- **Current:** ["ѕвѣзда","zvæˈzda"]
- **Expected:** ["звѣзда","zvæˈzda"]
- **Why:** The initial grapheme ѕ (dzělo) denotes the affricate [dz], yet the supplied IPA is [zvæˈzda] with a plain fricative [z] — the script and transcription are internally inconsistent. The normalised canonical-OCS lemma in the standard dictionaries (SJS/Cejtlin's *Slovník jazyka staroslověnského*; Kurz) is spelled with земля з, i.e. **звѣзда**, reflecting the satem outcome of PIE *ǵʰwoygʷ- (> Slavic *z-). The [dz]-initial ѕвезда is a specifically Macedonian secondary development (correctly kept for `mk` = ѕвезда /ˈdzvɛzda/), not the standard OCS form. Since sibling `orv` already carries звѣзда/z, aligning `cu` to звѣзда keeps script and the [z] IPA consistent.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
