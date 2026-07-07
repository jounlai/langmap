# Wordmap review #273 — Uralic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Anneli Kuusk, a descriptive/historical Uralicist trained in the Helsinki–Szeged tradition, working primarily from Denis Abondolo & Riitta-Liisa Valijärvi (eds.), *The Uralic Languages* (2nd ed., Routledge 2023); Károly Rédei's *Uralisches Etymologisches Wörterbuch* (UEW) for etymological control of the "name" (*nimə) and pronoun (*mun / *tun) sets; Pekka Sammallahti, *The Saami Languages: An Introduction* (1998) for the whole Saami column; Tapani Salminen's Tundra Nenets materials and Florian Siegl, *Materials on Forest Enets* (2013) for Enets; Beáta Wagner-Nagy, *A Grammar of Nganasan* (2018); and the standard Finnic references (Laanest for Finnic comparison, EKI/Erelt for Estonian, VISK for Finnish). For Permic/Mordvinic/Mari I lean on Bartens' comparative volumes. I checked every cell for sense (1sg vs plural/honorific; cardinal vs ordinal; common noun "name" vs proper noun), native orthography, and IPA plausibility.

## Issues found

### 1. `enf` — you — 2sg pronoun written with a single vowel letter, contradicting its own long-vowel IPA
- **File:** `words/you.js` — code `enf`
- **Current:** ["у","uː"]
- **Expected:** ["уу","uː"]
- **Why:** The Forest Enets independent 2sg pronoun is *uu* (Siegl 2013, *Materials on Forest Enets*, pronoun paradigm: modʲ / **uu** / bu, pl. modʲnaʔ / uuʔ / buʔ). The vowel is long, which the supplied IPA correctly encodes as [uː]. A single Cyrillic ⟨у⟩ represents a short vowel and is internally inconsistent with the [uː] already given in the cell; the digraph ⟨уу⟩ is required to render the long vowel of the 2sg pronoun. The rest of the Forest Enets row (модь /modʲ/, сизи /sʲizi/, нии /niː/, нуга /nuɡa/) is correct.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
