# Wordmap review #255 — Niger-Congo (non-Bantu) (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Adjaratou Sanogo, a descriptive linguist working across the Gur (Mabia), Senufo, Mande and Kwa clusters of the western Volta basin. My primary reference works for this batch are Robert Carlson's *A Grammar of Supyire* (Mouton de Gruyter, 1994) for Senufo Supyire; Denis Creissels & Pierre Sambou's *Le mandinka* and Creissels' Manding comparative work for Dyula/Mandinka; Tony Naden's Mabia (Gur) lexical surveys and the GILLBT materials for Dagbani and Mampruli; Hounkpati B. C. Capo's *A Comparative Phonology of Gbe* (1991) for Fon; William Welmers' work on Kpelle; J. David Sapir's *A Grammar of Diola-Fogny* for Jola-Fonyi; and Charles Bird / Maurice Houis for Susu and the Manding numerals. I checked each cell for sense (emphatic vs. clitic pronoun, cardinal vs. ordinal, appellative "name" vs. "reputation"), for conformity to the standard practical orthography and phoneme inventory of each language, and for tone marking.

## Issues found

### 1. `spp` — name — non-inventory vowel `ɐ` in a Supyire cell
- **File:** `words/name.js` — code `spp`
- **Current:** ["yɐbɛ","jɐ̀bɛ̀"]
- **Expected:** ["yabɛ","jàbɛ̀"]
- **Why:** Supyire (Senufo) has a seven-oral-vowel system /i e ɛ a ɔ o u/ (Carlson 1994, §2); the mid-central vowel [ɐ] is not part of the inventory and is not used in the Supyire practical orthography. The word for "name" is *yabɛ* (low-low), with a plain open /a/ in the first syllable. The `ɐ` in both the orthography and IPA columns is a spurious segment (almost certainly a corrupted `a`) and should be normalised to `a`; the low-tone marking is otherwise correct.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
