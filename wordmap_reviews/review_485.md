# Wordmap data review #485 — niger-congo-west

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: niger-congo-west.

## Reviewer self-introduction (ペルソナ自己紹介)

West African (Kwa/Atlantic/Gur) reviewer; tone diacritics. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] red / yo (Yoruba)
- **Issue:** IPA is given as "pupa" using a plain bilabial /p/, but Yoruba has no phonemic /p/: orthographic ⟨p⟩ is the voiceless labial-velar plosive /k͡p/ (e.g. pápá = [k͡pák͡pá]). The row is internally inconsistent — the Yoruba 'moon' cell correctly renders ⟨p⟩ as /kp/ (òṣùpá → òʃùkpá), while 'red' leaves ⟨p⟩ as /p/.
- **Fix:** IPA should render ⟨p⟩ as /k͡p/: /k͡puk͡pa/ (matching the untoned style of the current cell). A more precise, tone-marked form consistent with the moon cell's IPA (òʃùkpá) would be /k͡púk͡pà/ (púpà = high–low). Either is acceptable; the essential correction is /p/ → /k͡p/.
- **Source:** Wikipedia, Yoruba phonology: ⟨p⟩ = /k͡p/, pápá [k͡pák͡pá]; Yoruba lacks plain /p/ except in recent loans (https://en.wikipedia.org/wiki/Yoruba_phonology)
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [LOW] ear / ee (Ewe)
- **Issue:** Surface is spelled "to" with plain ⟨o⟩, but the IPA is /tɔ/ with open-mid /ɔ/. Ewe orthography is phonemic and distinguishes ⟨o⟩ = /o/ from ⟨ɔ⟩ = /ɔ/ as separate letters, so the surface and IPA contradict each other. 'ear' is /to/ (close-mid o).
- **Fix:** Change IPA from "tɔ" to "to", i.e. ee: ["to", "to"]
- **Source:** Ewe vowel inventory a e ɪ i o ɔ u with orthographic ⟨o⟩/⟨ɔ⟩ contrast (Wikipedia, Ewe language)
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [LOW] ear / ig (Igbo)
- **Issue:** "ntị" is transcribed /ntʃi/. Two problems: the dotted vowel ⟨ị⟩ is the [-ATR] high vowel /ɪ/, not /i/; and standard Igbo /t/ does not affricate to /tʃ/ before a front vowel here. Expected /ǹtɪ̀/ ~ /ntɪ/.
- **Fix:** ntɪ
- **Source:** Help:IPA/Igbo and Igbo phonology — dotted ⟨ị⟩ = /ɪ/ (https://en.wikipedia.org/wiki/Help:IPA/Igbo)
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 2 applied, 1 awaiting a decision.
