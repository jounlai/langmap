# Review 677: map IPA against Wiktionary's own IPA

2026-11-09. With the full kaikki raw dump on disk, every Word Map cell whose surface is a Wiktionary headword in the row's language was paired with that entry's IPA (~/langmap-work/ipacheck: cells.py, scan.py, cmp.py, cons.py). 17,975 surfaces have an entry with IPA.

Most differences are each row's own broad convention: tone or diacritics left out (ha, sl, xh, zu), length or vowel quality simplified (ml, ta, kn ɐ→a), r for ɾ, l for ɫ, x for χ, phonemic rather than allophonic spirants (es, gl, an). Those were left alone. The pass then looked only at consonant pairs that are separate phonemes.

Fixed:
- Bats (bbl): ჵ written ħ in eye, four and sleep; every Wiktionary Bats entry with ჵ gives ʕ or ʡ. Now ʕ (commit aa30a7574).
- Kaingang (kgp): the letter s is /ʃ/ (Wiktionary sẽsĩ /ʃɛ̃ˈʃĩ/, asuka /aʃuka/); the row had ʃ in sugar and s in black, bird, daughter, salt and silk. All six now ʃ.
- Konkani (kok): five पाच and wheel चाक are /pɑːts/ and /tsɑːk/ on Wiktionary; the row had tʃ. Fixed those two only; च before back vowels in other cells (four चार, green पाचवो, moon चंद्र) has no entry IPA to check against and is left.

Looked at and left: Ket сь as ɕ (Wiktionary writes s for the same letters; the row's reading is deliberate), Punic and Phoenician ʃ against Wiktionary's s (row convention), Tuvan q, Manchu x/b against χ/p (phonemic vs phonetic).
