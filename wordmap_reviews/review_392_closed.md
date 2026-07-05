# Wordmap review #392 — Slavic & Baltic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Halina Vöckler, a comparative Slavicist and Baltologist working from the descriptive frameworks of Comrie & Corbett (eds.), *The Slavonic Languages* (Routledge), Sussex & Cubberley, *The Slavic Languages* (CUP), and Dalewska-Greń, *Języki słowiańskie*. For Sorbian I lean on Schaarschmidt, *The Historical Phonology of the Upper and Lower Sorbian Languages*, and Stone's Upper/Lower Sorbian sketches in Comrie & Corbett; for East Slavic on Mayo (Belarusian) and Shevelov (Ukrainian); for Baltic on Ambrazas (ed.), *Lithuanian Grammar*, Stang's *Vergleichende Grammatik der baltischen Sprachen*, and the *Latviešu valodas gramatika* (LU Latvian Language Institute). I check native orthography against the standard academic dictionaries (СБМ for Belarusian, PWN for Polish, ССКЈ for BCMS, LKŽ for Lithuanian) and IPA against the phonological sketches in the same handbooks.

## Issues found
### 1. `hsb` — star — Upper Sorbian ⟨w⟩ is bilabial [w], not labiodental /v/
- **File:** `words/star.js` — code `hsb`
- **Current:** ["hwězda","ˈɦvʲɛzda"]
- **Expected:** ["hwězda","ˈɦwʲɛzda"]
- **Why:** Upper Sorbian preserves the bilabial glide [w] for the grapheme ⟨w⟩ in prevocalic position (Schaarschmidt 1997; Stone in Comrie & Corbett 2002), in contrast to Lower Sorbian, which has largely shifted ⟨w⟩ toward [v]. The dataset already encodes this split correctly: Upper Sorbian `two` = "dwaj" /dwaj/ uses [w], while Lower Sorbian `two`/`star` (dwa /dva/, gwězda /ɡvɛzda/) use [v]. The Upper Sorbian `star` cell is therefore internally inconsistent — hwězda should have the same [w] as dwaj. The native spelling and the /ɦ/ (voiced glottal, correct for Upper Sorbian ⟨h⟩) are fine; only the labiodental /v/ segment is wrong and should be /w/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
