# Wordmap review #207 — Indo-Iranian (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ramesh Wariyal, a historical-descriptive linguist of the Indo-Iranian branch. For the Indo-Aryan cells I lean on R. L. Turner's *A Comparative Dictionary of the Indo-Aryan Languages* (CDIAL) for etymological control, Colin Masica's *The Indo-Aryan Languages* (1991) and Cardona & Jain's *The Indo-Aryan Languages* (2003) for the modern standards, Grierson's *Linguistic Survey of India* for the peripheral Pahari/Rajasthani/Sindhic varieties (Dotyali, Marwari, Kachhi), and Platts' *Dictionary of Urdu, Classical Hindi and English* for the Hindi–Urdu pair. For Iranian I use Windfuhr (ed.) *The Iranian Languages* (2009), Steingass' *Persian-English Dictionary*, Abaev's Ossetic work, and Elfenbein for Balochi. Pali/Sanskrit are checked against Monier-Williams and the PTS *Pali-English Dictionary*. I paid particular attention to (a) implosive phonemes in the Sindhic subgroup, (b) pronoun politeness grades, and (c) native-script vowel diacritics against the paired IPA.

## Issues found

### 1. `kfr` — two — missing implosive in Sindhic numeral
- **File:** `words/two.js` — code `kfr`
- **Current:** ["બ","ba"]
- **Expected:** ["બ","ɓa"]
- **Why:** Kachhi (Kutchi) belongs to the Sindhic subgroup and, like Sindhi, retains the four voiced implosives /ɓ ɗ ʄ ɠ/. The numeral "two" reflects the same etymon as Sindhi ٻہ /ɓa/ (already transcribed with the implosive in the `sd` cell of this very set). The plain pulmonic /b/ in "ba" is a transcription error; the initial is the implosive [ɓ]. Gujarati script cannot mark the implosive, so the orthography બ is fine, but the paired IPA must read `ɓa` for internal consistency with the Sindhi cognate and the documented Kutchi phoneme inventory (Masica 1991 §3; Grierson LSI VIII.1 on Kachchhi).

### 2. `dty` — i — orthography/IPA mismatch (bare म vs. /mu/)
- **File:** `words/i.js` — code `dty`
- **Current:** ["म","mu"]
- **Expected:** ["मु","mu"]
- **Why:** The paired IPA is `mu`, deliberately distinguished from Nepali `ma` (the `ne` cell reads ["म","ma"]), reflecting the far-western Pahari 1sg pronoun *mu* (cf. Baitadeli/Doteli *mu*). But the Devanagari म carries only the inherent vowel /ə/ and reads /mə/, not /mu/; the vowel sign is missing. The `you` cell for the same language correctly writes the vowel diacritic (तु = /tu/), so the bare म here is an internal inconsistency. The script must be मु to spell the intended /mu/.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
