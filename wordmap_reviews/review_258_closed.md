# Wordmap review #258 — Other / unclassified (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. H. Vermeulen, a descriptive/historical linguist specializing in language isolates and small families of the Americas and Northeast Asia. My working references for this batch are R. H. Robins, *The Yurok Language* (1958) and the Blevins–Garrett Yurok corpus for Algic isol)ate morphophonology; Laurel Watkins, *A Grammar of Kiowa* (1984) for Kiowa–Tanoan; H. Aoki, *Nez Perce Dictionary* (1994); Georg & Volodin, *Die itelmenische Sprache* and Skorik for Chukotko-Kamchatkan; I. Nikolaeva, *A Historical Dictionary of Yukaghir* (2006); H. Werner's Yeniseian works (Ket/Yugh); and Young & Morgan, *The Navajo Language* (1987) for the Athabaskan cells. My review prioritizes cells where the native orthography and the broad IPA are mutually inconsistent (an objectively checkable error) alongside documented phoneme-inventory violations.

## Issues found

### 1. `yur` — you — apostrophe (glottal stop) mistranscribed as ejective /kʼ/
- **File:** `words/you.js` — code `yur`
- **Current:** ["ke'l","kʼel"]
- **Expected:** ["ke'l","keʔl"]
- **Why:** The Yurok 2sg independent pronoun is *keʔl* (Robins 1958; Blevins & Garrett). In the practical orthography used across this very row, the apostrophe marks a glottal stop — confirmed by the same language's `name` cell `'er'werhł` = /ʔerʔwerɬ/, where ⟨'⟩ → /ʔ/. So `ke'l` parses as k-e-ʔ-l = /keʔl/. The current /kʼel/ wrongly relocates the glottal onto ⟨k⟩ as an ejective onset, contradicting both the source form and the internal convention.

### 2. `yur` — star — same apostrophe→/ʔ/ convention violated, spurious /k/ inserted
- **File:** `words/star.js` — code `yur`
- **Current:** ["kes'oh","keskʼoh"]
- **Expected:** ["kes'oh","kesʔoh"]
- **Why:** The written form `kes'oh` parses as k-e-s-ʔ-o-h under the same orthographic convention established by the `name` cell (⟨'⟩ = /ʔ/). The IPA /keskʼoh/ both inserts a phantom /k/ and reads ⟨s'⟩ as an ejective, which the spelling does not support; there is no ⟨k'⟩ onset in the form. The transcription should read /kesʔoh/ to match the native orthography.

### 3. `kio` — you — vowel /æ/ not in the Kiowa inventory
- **File:** `words/you.js` — code `kio`
- **Current:** ["ám","ǽm"]
- **Expected:** ["ám","ám"]
- **Why:** The Kiowa 2sg pronoun is *ám* (Watkins 1984). Kiowa's oral-vowel inventory is /i e a o u ɔ/ (plus nasal counterparts); there is no /æ/. Orthographic ⟨a⟩ = /a/, consistent with the 1sg cell `nɔ́ɔ` = /nɔ́ː/ which correctly uses /ɔ/ for ⟨ɔ⟩. The transcription /ǽm/ substitutes a segment absent from the language and should be /ám/.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
