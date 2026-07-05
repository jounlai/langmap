# Wordmap review #382 — Other Indo-European (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurélien Mahé, a comparative Indo-European philologist with a working specialism in Gallo-Romance dialectology and a second track in Italo-Celtic and the fragmentary Ancient IE languages. For the Romance micro-varieties in this batch I lean on Alain Dawson's *Le picard de poche* and the *Atlas linguistique et ethnographique picard* (ALPic), together with the *Dictionnaire Jèrriais–Français* (Le Maistre) for Norman; for Celtic on Thurneysen's *Grammar of Old Irish*, the *Geiriadur Prifysgol Cymru*, and Ternes' Breton phonology; for Armenian on Ačaṙyan's etymological dictionary and Vaux's *Phonology of Armenian* (the Western dévoicing/voicing chain kʼ↔g, t↔d that these cells correctly encode); for Italic/Anatolian/Tocharian on Buck's *Grammar of Oscan and Umbrian*, Kloekhorst's *Etymological Dictionary of the Hittite Inherited Lexicon*, and Adams' *Dictionary of Tocharian B*; and across the board on Buck's *Dictionary of Selected Synonyms in the Principal Indo-European Languages*. This was a clean batch — the Western Armenian consonant shifts (դուն→tun, կ→g, տ→d), the Old Prussian Elbing-Vocabulary forms (emnes, lauxnos), the Hittite l/n-cognate lāman, and the Brahmi Tocharian pairs all check out — so only one phonetic slip survived.

## Issues found
### 1. `pcd` — name — Picard *nom* missing nasal vowel
- **File:** `words/name.js` — code `pcd`
- **Current:** ["nom", "no"]
- **Expected:** ["nom", "nɔ̃"]
- **Why:** Picard, like its close neighbour Norman, retains the Gallo-Romance nasal vowels; the reflex of Latin *nōmen* is realised with a nasalised back vowel [nɔ̃] (~[nõ]), not a plain oral [no]. The adjacent Norman cell `nrf` correctly gives the same etymon as ["nom", "nɔ̃"], which highlights the inconsistency — the Picard transcription has simply dropped the nasalisation diacritic. Dawson (*Le picard de poche*) and the ALPic materials transcribe *nom* with a nasal vowel. Segmental error (missing nasality).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
