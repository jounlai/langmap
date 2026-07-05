# Wordmap review #231 — Turkic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aygül Reshitova, a comparative Turkologist working primarily on the Bulgharic (Oghur) and Siberian branches. For this review I lean on Sir Gerard Clauson's *An Etymological Dictionary of Pre-Thirteenth-Century Turkish* and Marcel Erdal's *Old Turkic Grammar* for the reconstructed/Old Turkic anchors (`otk`, `xqa`); Lars Johanson & Éva Á. Csató (eds.), *The Turkic Languages* (2nd ed., 2021) for the branch-wide phonology; Martti Räsänen's *Versuch eines etymologischen Wörterbuchs der Türksprachen* for the `yultuz`/`yulduz`/`sïldïs` "star" reflexes; and, decisively for this batch, John R. Krueger's *Chuvash Manual* together with the standard Ashmarin-based Chuvash orthographic norm (Cyrillic with `ӑ` U+04D1, `ӗ` U+04D7, `ҫ` U+04AB, `ӳ`). The Chuvash cells are where I concentrate, since Chuvash is the one lect here whose script relies on special Cyrillic letters that are easily corrupted by Latin lookalikes.

## Issues found

### 1. `cv` — star — Latin lookalikes for Cyrillic `ҫ`/`ӑ`
- **File:** `words/star.js` — code `cv`
- **Current:** ["çăлтăр","ɕɔlˈtor"]
- **Expected:** ["ҫӑлтӑр","ɕɔlˈtor"]
- **Why:** The Chuvash word for "star" is *ҫӑлтӑр*, written entirely in Cyrillic. The current cell uses Latin `ç` (U+00E7) for what must be Cyrillic `ҫ` (U+04AB, es-with-descender = [ɕ]) and Latin `ă` (U+0103) for Cyrillic `ӑ` (U+04D1, the reduced back vowel). A mixed Latin/Cyrillic string is not valid Chuvash orthography and breaks search/collation. The broad IPA [ɕɔlˈtor] is fine (ҫ=[ɕ], the short rounded ӑ realized [ɔ̆]); only the script is corrected. Cf. Krueger, *Chuvash Manual*, lexicon s.v. *ҫӑлтӑр*.

### 2. `cv` — i — Latin `ĕ` for Cyrillic `ӗ`
- **File:** `words/i.js` — code `cv`
- **Current:** ["эпĕ","eˈbə"]
- **Expected:** ["эпӗ","eˈbə"]
- **Why:** Chuvash 1sg *эпӗ* uses the Cyrillic reduced-vowel letter `ӗ` (U+04D7); the current cell has Latin `ĕ` (U+0115), the same Latin-lookalike substitution seen in the `star` cell. Sense and IPA (intervocalic lenition п→[b]) are correct; only the script letter is fixed.

### 3. `cv` — you — Latin `ĕ` for Cyrillic `ӗ`
- **File:** `words/you.js` — code `cv`
- **Current:** ["эсĕ","eˈzə"]
- **Expected:** ["эсӗ","eˈzə"]
- **Why:** Chuvash 2sg-informal *эсӗ* must be spelled with Cyrillic `ӗ` (U+04D7); the current form uses Latin `ĕ` (U+0115). IPA [eˈzə] (intervocalic с→[z]) is correct; script-only correction.

### 4. `cv` — two — Latin `ĕ` for Cyrillic `ӗ`
- **File:** `words/two.js` — code `cv`
- **Current:** ["иккĕ","ikˈkə"]
- **Expected:** ["иккӗ","ikˈkə"]
- **Why:** Chuvash cardinal "two" is *иккӗ* with Cyrillic `ӗ` (U+04D7); the current form ends in Latin `ĕ` (U+0115). Cardinal sense and IPA are correct; only the final letter's script is fixed.

## Worker response (作業者)
Findings: 4 · applied 4 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
