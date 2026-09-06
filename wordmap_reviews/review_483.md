# Wordmap data review #483 — afroasiatic-other

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: afroasiatic-other.

## Reviewer self-introduction (ペルソナ自己紹介)

Berber/Cushitic/Chadic/Egyptian-Coptic reviewer; Tifinagh, IPA. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] earth / ha (Hausa)
- **Issue:** IPA field is "ƙasa" — the orthographic hooked letter ƙ (U+0199, a Latin letter, not an IPA symbol) has leaked into the IPA slot. Hausa ƙ is a velar ejective, and every other Hausa cell in the dataset correctly transcribes it as /kʼ/ (baƙi→bakʼiː, ƙashi→kʼaʃiː, ƙwai→kʼʷai, ƙarfe→kʼarfe, ƙauna→kʼauna, ƙafa→kʼafa).
- **Fix:** kʼasaː
- **Source:** Standard Hausa phonology: ƙ = velar ejective /kʼ/; internal consistency with the dataset's own six other ƙ cells.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] ear / so (Somali)
- **Issue:** IPA "ðeɡ" uses the dental fricative /ð/ for orthographic dh, but Somali dh is the voiced retroflex plosive /ɖ/. Every other Somali dh cell in the dataset is /ɖ/ (dhiig→ɖiːɡ, dhul→ɖul, dhagax→ɖaˈɡaħ, dhiiga cognates), so this one cell is both wrong and internally inconsistent.
- **Fix:** ɖeɡ
- **Source:** Wikipedia, Somali phonology (dh = /ɖ/; e.g. dhul [ɖul]); en.wikipedia.org/wiki/Somali_phonology.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] red / aa (Afar)
- **Issue:** IPA "ʕasi" maps orthographic c to the voiced pharyngeal /ʕ/, but in Afar orthography c = the VOICELESS pharyngeal /ħ/ (q is the letter for /ʕ/). All other aa 'c' cells correctly use ħ (cutuk→ħutuk, kacanú→kaħanu, caxá→ħaɖa, caacay→ħaːħaj); 'red' is the lone outlier, and its q-cells (qabal→ʕabal, qarí→ʕari, migaaq→migaːʕ, qado→ʕado) confirm q=ʕ.
- **Fix:** ħasi
- **Source:** Help:IPA/Afar and Omniglot Afar: ⟨c⟩=/ħ/, ⟨q⟩=/ʕ/, ⟨x⟩=/ɖ/; en.wikipedia.org/wiki/Help:IPA/Afar.
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [MED] shi (Tashelhit): bird, egg, five, snow, stone, white
- **Issue:** The shi row is written overwhelmingly in Tifinagh, but six cells stray into Latin: bird "agḍiḍ", egg "taglayt", five "smmus", snow "adfel", stone "azru", white "amellal". This breaks the row's native-script convention (the exact case the project flags: a mostly-native row with stray Latin cells).
- **Fix:** Render surfaces in Neo-Tifinagh (IPA unchanged): bird ⴰⴳⴹⵉⴹ, egg ⵜⴰⴳⵍⴰⵢⵜ, five ⵙⵎⵎⵓⵙ, snow ⴰⴷⴼⵍ, stone ⴰⵣⵔⵓ, white ⴰⵎⵍⵍⴰⵍ (matches the proposed fix). The schwa is left unwritten to match the rest of the shi row's convention.
- **Source:** Internal row convention (rest of shi is Neo-Tifinagh/IRCAM); Latin↔Tifinagh transliteration.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [MED] tzm (Central Atlas Tamazight): bird, egg, five, nose, snow, white
- **Issue:** The tzm row is overwhelmingly Tifinagh, but six cells stray into Latin: bird "agḍiḍ", egg "tamellalt", five "semmus", nose "tinzert", snow "adfel", white "amellal". Same native-script inconsistency as shi.
- **Fix:** Render the six surfaces in Tifinagh, IPA unchanged: bird ⴰⴳⴹⵉⴹ, egg ⵜⴰⵎⵍⵍⴰⵍⵜ, five ⵙⵎⵎⵓⵙ, nose ⵜⵉⵏⵣⵔⵜ, snow ⴰⴷⴼⵍ, white ⴰⵎⵍⵍⴰⵍ (identical to the suggested fix). Separately, sleep tzm ["gen","ɡən"] is a 7th stray Latin cell → ⴳⵏ, not part of this finding but worth noting.
- **Source:** Internal row convention (rest of tzm is Neo-Tifinagh/IRCAM); Latin↔Tifinagh transliteration.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 6. [LOW] hundred / aa (Afar)
- **Issue:** Surface "bool" vs IPA "boːlu": the IPA carries a final vowel -u that the surface lacks. One of the two is truncated.
- **Fix:** aa (hundred): keep surface "bool", correct IPA to "boːl" → ["bool", "boːl"]. Source: Wiktionary Afar entry "bóol" = hundred, IPA /ˈboːl/ (masc. cardinal; cognates Somali boqól, Saho bool). Confidence: MED-HIGH on the mismatch being a real error and on "boːl" being the correct IPA; the finding's proposed direction (surface→"boolu") is not the best fix.
- **Source:** Internal surface/IPA mismatch; Afar numeral lists (Omniglot) give boolu.
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 4 applied, 2 awaiting a decision.
