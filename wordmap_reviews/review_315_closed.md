# Wordmap review #315 — Afro-Asiatic (non-Semitic) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive linguist working primarily on Berber (Amazigh) and East/North Cushitic, with a secondary command of Chadic and the Egyptian branch. For Berber my working references are Abdel-Massih, *A Reference Grammar of Tamazight* (Ayt Ayache, 1971), Penchoen, *Tamazight of the Ayt Ndhir* (1973), Naït-Zerrad's *Dictionnaire des racines berbères*, and Kossmann's Zenati/Tarifit descriptions; for Tuareg, Heath's *Grammar of Tamashek*. For Cushitic I lean on Saeed's *Somali Reference Grammar*, Parker & Hayward's *Afar-English-French Dictionary*, Gragg's *Oromo Dictionary*, and Wedekind/Roper for Beja. For Egyptian/Coptic I use Loprieno's *Ancient Egyptian* and Layton's *Coptic Grammar* (Sahidic). Against these I verified each [orthography, IPA] cell for the correct sense (independent 1sg / informal 2sg pronoun, cardinal 2, common-noun "name"/"star"), correct native script, and plausible segmental/tonal transcription.

## Issues found
### 1. `tzm` — you — Kabyle affricated form imported into Central Atlas Tamazight
- **File:** `words/you.js` — code `tzm`
- **Current:** ["kečč","kətʃː"]
- **Expected:** ["šekk","ʃəkː"]
- **Why:** The entire `tzm` row is identical to Kabyle (`kab`: nekk / kečč / sin / isem / itri), and the 2sg pronoun has been copied with Kabyle's characteristic affrication of tense /k/ → [t͡ʃ]. That spirantization/affrication is a Kabyle–Zenati innovation; Central Atlas Tamazight does not affricate tense /k/, which is exactly why its sister variety Tashelhit correctly shows non-affricated `kyyi` [kəjːi] in this same dataset. The Central Atlas independent 2sg.m pronoun is `šekk` [ʃəkː] (Abdel-Massih 1971, paradigm nekk / šekk / kemm; Penchoen 1973, Ayt Ndhir). The 1sg `nekk` already in the row is the genuine Central Atlas form, so only the 2sg cell is wrong. (Corrected orthography keeps the dataset's caron convention: š for /ʃ/.)

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
