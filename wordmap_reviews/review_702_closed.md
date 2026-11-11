# Review 702 — the 20 words of 2026-11-12, round 1 of 10: gloss and IPA against Wiktionary (2026-11-12)

Owner asked for ten review rounds on the 20 new words. Round 1 is the deterministic pass over the kaikki dump.

## Gloss check (~/langmap-work/glosscheck/cmp2.py)
3,414 cells with a Wiktionary entry: 3,393 carry the concept in a gloss; 21 do not. All 21 kept:
romanization-of entries (jv ×3), homonyms where the source list gives the concept (nog бий spider and to hina spider, IDS;
av рос husband, NorthEuraLex), the butter "fat" route (gld ykg niv uz, deliberate), zh entries with no English gloss in the dump,
mt brimb (row uses collectives: farfett), uga plural, tpi lombo 'chile', ty hiʻo (translation table of mirror).
Doubt kept: uz yogʻ for butter (everyday word is probably sariyogʻ; no entry in the dump).

## IPA check (~/langmap-work/ipacheck/cmp_new.py)
173 cells differ from Wiktionary by a substitution not already common in that row. Nearly all are notation
(non-syllabic marks, ɑ/a, ɪ/i, tone and length diacritics). Fixed 6:
- snake xal моһа moˈra → moˈʁa (Kalmyk һ is a fricative, not r)
- east ka აღმოსავლეთი ärmo̞sävle̞tʰi → aʁmosavletʰi (ღ; row's plain-a notation)
- king fa شاه ʃoː → ʃɒːh
- island cop ⲙⲟⲩⲓ muː → muːj (Wiktionary; the lion cell already has muːj)
- friday en ˈfɹaɪdɪ → ˈfraɪdeɪ, sunday en ˈsʌndɪ → ˈsʌndeɪ (the other weekdays in the row end -deɪ, and the row writes r)

## Route
- left: English left and its 28 variety rows plus enm plain → bad. Wiktionary: "from Old English left, lyft ('weak, clumsy,
  foolish')". Found by the story writer; header comment updated.
