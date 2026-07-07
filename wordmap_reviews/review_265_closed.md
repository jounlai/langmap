# Wordmap review #265 — Semitic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Yaʿqūb Sarraf, a comparative Semitist trained in the Nöldeke–Brockelmann tradition, working primarily from Edzard Lipiński's *Semitic Languages: Outline of a Comparative Grammar*, John Huehnergard's *A Grammar of Akkadian*, Wolf Leslau's *Comparative Dictionary of Geʿez* and *Etymological Dictionary of Harari*, Theodor Nöldeke's *Compendious Syriac Grammar*, A. F. L. Beeston's *Sabaic Grammar*, Hoftijzer–Jongeling's *Dictionary of the North-West Semitic Inscriptions* (DNWSI), Hans Wehr's *Dictionary of Modern Written Arabic*, and — for the modern colloquials — David Cohen's *Le dialecte arabe ḥassānīya de Mauritanie* and the relevant EALL (Encyclopedia of Arabic Language and Linguistics) dialect articles. I reviewed all 42 domain entries: the ancient/epigraphic tier (Akkadian, Ugaritic, Phoenician, Punic, Sabaean, Old/Imperial/Classical Aramaic, Biblical/Mishnaic Hebrew, Geʿez) and the Ethiosemitic and Arabic-dialect tiers are overwhelmingly sound. Two cells require correction.

## Issues found

### 1. `mey` — star — wrong reflex of *jīm* for Hassaniya
- **File:** `words/star.js` — code `mey`
- **Current:** ["نجمة","ˈneɡma"]
- **Why:** Hassaniya is a conservative Saharan Bedouin variety that in this very dataset preserves the interdentals and the *ay* diphthong (two = اثنين [aθˈnajn]). A dialect that retains ث and *ay* does not innovate the [g] reflex of ج. Per Cohen (*Le dialecte arabe ḥassānīya*, 1963), Hassaniya *jīm* is realized as the sibilant [ʒ] (variably affricated [dʒ]); the plosive [ɡ] value shown here is the Nile-Valley/Egyptian development, alien to Mauritanian Arabic. The [ɡ] slot in Hassaniya is filled instead by *qāf*. Expected [ˈnaʒma].
- **Expected:** ["نجمة","naʒma"]

### 2. `har` — name — IPA vowel contradicts its own romanization
- **File:** `words/name.js` — code `har`
- **Current:** ["sum","sɨm"]
- **Why:** Harari is stored here in Latin transliteration, and the native field reads "sum", but the IPA gives [sɨm] — the vowel qualities disagree ([u] vs [ɨ]). Leslau (*Etymological Dictionary of Harari*, s.v.) records the Harari noun for "name" as *sum* with a genuinely rounded [u], not the pan-Ethiosemitic central [ɨ] of Amharic/Geʿez *sɨm/səm*. The IPA should track the attested rounded vowel and its own headword.
- **Expected:** ["sum","sum"]

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
