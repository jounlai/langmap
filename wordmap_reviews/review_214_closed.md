# Wordmap review #214 — Niger-Congo (non-Bantu) (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aïssata Konaté, a descriptive/comparative linguist working on West-African Mande, Gur (Mabia), Kwa and Gbe. My working references for this review are Denis Creissels' *Éléments de grammaire de la langue mandinka* and his Manding tonology papers, Gérard Dumestre's *Grammaire fondamentale du bambara* (for the Manding pronoun tone system), Robert Carlson's *A Grammar of Supyire* (Mouton, 1994), William Welmers' Kpelle materials, Tony Naden's Mabia/Gur comparative wordlists (Dagbani, Mampruli, Mooré), Claire Grégoire and the RECAP Baoulé lexicon, Hazoumê's Fon–Gbe descriptions, and the SIL Liberia Bassa (Kru) orthography notes. My review privileges internal native↔IPA tone consistency, since a mismatch between an acute-marked native form and a grave-marked IPA transcription is a diagnostic of a data-entry slip.

## Issues found

### 1. `dyu` — i — IPA tone contradicts native form (should be High, not Low)
- **File:** `words/i.js` — code `dyu`
- **Current:** ["ń","ŋ̀"]
- **Expected:** ["ń","ŋ́"]
- **Why:** The native cell "ń" carries an acute (High tone), but the IPA "ŋ̀" carries a grave (Low tone) — the two cells directly contradict each other. In Manding tonology the singular subject pronouns 1SG and 2SG are both High-toned (Dumestre, *Grammaire fondamentale du bambara*; Creissels on Manding pronoun tone). This is confirmed internally by the parallel 2SG entry you=["í","í"] (High). The Low-toned IPA is therefore wrong; the syllabic velar nasal should read "ŋ́".

### 2. `bsq` — i — stray leading whitespace in native orthography cell
- **File:** `words/i.js` — code `bsq`
- **Current:** [" M̀","m̩"]
- **Expected:** ["M̀","m̩"]
- **Why:** The native field begins with a spurious leading space (" M̀"), a data-entry artifact that will render as an offset/blank glyph in the map cell. The Bassa (Kru) 1SG is the low-toned syllabic nasal, conventionally written capital "M̀" in SIL Liberia Bassa orthography; only the leading space is defective. The IPA syllabic "m̩" is retained.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
