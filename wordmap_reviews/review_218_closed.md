# Wordmap review #218 — Other Indo-European (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurelia Kastrati, a descriptive/historical linguist specializing in the Balkan Sprachbund, the Albanian dialect continuum (including the diaspora Arbëresh varieties of Italy), and the fragmentary Paleo-Balkan and Italic languages. My working references for this batch include Vladimir Orel's *Albanian Etymological Dictionary* (Brill, 1998) and Orel's *A Concise Historical Grammar of the Albanian Language* (2000); Martin Camaj's *Albanian Grammar with Exercises, Chrestomathy and Glossaries* (1984) and his monograph on the Arbëresh of Greci (*La parlata albanese di Greci*); Eric P. Hamp's dialectological papers on Arbëresh laterals. For the surrounding domain I cross-check with Thurneysen's *Grammar of Old Irish*, Jackson's *Language and History in Early Britain* (Brittonic), Kloekhorst's *Etymological Dictionary of the Hittite Inhered Lexicon*, Untermann's *Wörterbuch des Oskisch-Umbrischen*, Adams' *Dictionary of Tocharian B*, and the standard handbooks for Armenian (Martirosyan). My review targets sense errors, non-standard script, and — my particular concern here — IPA transcriptions that merely echo the orthography rather than represent the phonetics.

## Issues found
### 1. `aae` — star — IPA field contains orthography, not a phonetic transcription
- **File:** `words/star.js` — code `aae`
- **Current:** ["yll","yll"]
- **Expected:** ["yll","yɫ"]
- **Why:** The orthographic form `yll` is correct for Arbëresh (as in standard Albanian), but the second (IPA) cell simply duplicates the spelling. The digraph `‹ll›` is Albanian orthography for a single velarized/dark lateral, not a valid IPA sequence — a broad transcription must render it as one lateral segment. Compare the correctly-transcribed standard Albanian cell `sq` in this same batch: `["yll","yɫ"]`. Arbëresh preserves the Tosk velarized lateral (Camaj 1984; Hamp on Arbëresh laterals), so the word is /yɫ/ (some southern-Italian varieties de-velarize to plain /yl/, but never a geminate "ll"). The transcription should be `yɫ` to match the corpus convention and the actual phonetics.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
