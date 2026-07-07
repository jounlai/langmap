# Wordmap review #201 — Bantu (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Katarina Nghifikwa, a descriptive Bantuist working on the Southwest (Zone R/K) and Beti-Fang (Zone A) clusters. My core references for this batch are: van der Wal's *Grammar of Makhuwa* and the SIL Makhuwa lexicons for vmw; Fivaz's *A Reference Grammar of Oshindonga* and Tirronen's *Ndonga–English Dictionary* for ng/kj; Schadeberg's *A Sketch of Umbundu* and the Le Guennec–Valente *Dicionário Português-Umbundu* for umb; Chatelain's *Grammatica elementar do Kimbundu* and Maia's *Dicionário Complementar Português-Kimbundu-Kikongo* for kmb; Horton's *Grammar of Luvale* for lue; Meinhof/Möhlig and the Viljoen–Kamupingene *Otjiherero* dictionary for her; Collins' *Tonga Grammar* and the Zambian Tonga lexicons for toi; Nabirye's *Eiwanika ly'Olusoga* for xog; and Redden's *Descriptive Grammar of Ewondo* plus Alexandre's Bulu materials for ewo/bum. Bantu penultimate stress and the class-9/11 *o(N)-* augment/prefix are my main diagnostics for the IPA cells below.

## Issues found

### 1. `umb` — star — IPA drops the initial class-11 vowel /o/
- **File:** `words/star.js` — code `umb`
- **Current:** ["onyeleñgele","ɲelẽŋɡele"]
- **Expected:** ["onyeleñgele","oɲelẽŋɡele"]
- **Why:** The orthographic form correctly opens with the class-11 augment/prefix *o-* (Umbundu *o-* nouns, cf. *onduko* "name" in the same row, which is transcribed with its leading /o/). The broad-IPA cell begins directly at /ɲ/, omitting the initial vowel that the spelling and the noun-class morphology both require. This is an internal orthography↔IPA inconsistency; the transcription should read /oɲelẽŋɡele/ (regressive nasalisation of the pre-*ñg* vowel is fine to keep).

### 2. `kmb` — star — misplaced (word-final) stress mark; violates Bantu penultimate stress
- **File:** `words/star.js` — code `kmb`
- **Current:** ["tetembwa","teteˈmbwa"]
- **Expected:** ["tetembwa","teˈtembwa"]
- **Why:** *tetembwa* syllabifies te.te.mbwa (three syllables; *mbwa* is a single prenasalised onset syllable). Kimbundu, like Bantu generally, has fixed penultimate stress, so the accent belongs on the second syllable: teˈtembwa. The current mark places primary stress on the final syllable *mbwa*, which is not a licit stress position. Every other stress-marked cell in this domain follows the penult rule correctly (kmb *diˈʒina*, lue *liˈʒina* / *taŋɡaˈɲeka*, her *oˈɲose*, toi *iˈziːna*); this cell is the lone outlier.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
