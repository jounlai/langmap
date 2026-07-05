# Wordmap review #279 — Austroasiatic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sovann Réastey, a descriptive/comparative linguist working on the Mon-Khmer and Munda branches of Austroasiatic. My core references for this review are Harry Shorto's *A Mon-Khmer Comparative Dictionary* (2006, ed. Sidwell/Cooper/Bauer), Gérard Diffloth's and Paul Sidwell's Austroasiatic reconstructions, Suwilai Premsrirat's *Khmu–Thai–English Dictionary* and *Thesaurus of Khmu Dialects in Southeast Asia*, Robert Headley's *Cambodian–English Dictionary* and Philip Jenner's *A Dictionary of Angkorian Khmer* for Khmeric, P. O. Bodding's *A Santal Dictionary* and Gregory Anderson's *The Munda Languages* for Munda, Justin Watkins' *The Phonetics of Wa* and the Wa lexica for Palaungic, and Guilleminet/Banker for Bahnaric. I cross-check paired entries in the same language (the two Khmu rows kjg/xkk) and cognate sets across a branch (the four Palaungic rows) as internal controls against sense errors.

## Issues found

### 1. `xkk` — name — "nose" word substituted for "name"
- **File:** `words/name.js` — code `xkk`
- **Current:** ["muh","muh"]
- **Expected:** ["hmɔh","hmɔh"]
- **Why:** /muh/ is the Khmu reflex of proto-Mon-Khmer *muh "**nose**", not "name". The companion Khmu row kjg correctly gives ["hmɔh","hmɔh"]; two rows for the same language must not disagree on this basic noun. Suwilai Premsrirat's Khmu dictionary lists 'name' = /hmɔh/ (~ /səmɔh/) versus 'nose' = /muh/. This is a wrong-sense (name↔nose) error; corrected to the attested 'name' form.

### 2. `prk` — name — "water" word substituted for "name"
- **File:** `words/name.js` — code `prk`
- **Current:** ["rom","rɔm"]
- **Expected:** ["yaom","jɔm"]
- **Why:** In Wa/Parauk, "rom" (~ raom) /rɔm/ is the word for "**water**", not "name". The three other Palaungic rows all carry the inherited 'name' root: wbm ["yum","jɔm"], pll ["yum","jum"], lwl ["yum","jɔm"], reflecting Palaungic *jɔm "name". Parauk patterns with them; "rom/rɔm" is a wrong-sense (name↔water) substitution. Corrected to the "yaom/yum" (/jɔm/) form.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
