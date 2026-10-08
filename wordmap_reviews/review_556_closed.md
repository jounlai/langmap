# Review 556 — round 72: rows with no recorded source

Closed 2026-10-08. Ten concurrent audit agents, 98 rows that had no
`sources` in their meta. Working files: ~/langmap-work/r72/.

## Result

705 cells corrected (694 FIX + 11 RFIX, 9 route FIX lines converted to RFIX
with the current route), 13 emptied with an 'unsourced' record, and
**97 rows now name the source they follow in `meta.sources`** (rows with no
sources: 292 → 195).

Worst rows (fixes): woe 36, qxs 28 (Mawo forms in Taoping Qiang; mother had
the fire word), ers 26, slr 24 (Turkish/Uyghur spellings; "name" was
'horse'), njo 24, duu 24 (water was the eat cell), kpe 22, jya 20 (Japhug
prefixes, Tibetan zla/kʰsum), bca 20 (spelling switched between Bai Latin
and IPA mid-row), one 19, mos 18, moh 18, aoc 17. Wrong-meaning cells
included Ho-Chunk mother = 'older brother', Haida sleep = 'harpoon',
Iñupiaq red = 'fish scale', Yup'ik heart = 'his leg', Bororo eye =
'tears', Akawaio drink = 'not', Tzotzil honey = 'incense'.

Clean or nearly: nez, ter, ii, yuy, mjg, kjh, bxr, cro, hai, dag, ybe.

## Hand-made decisions

- Mooré: Webonary has karga = 'wheel' and naoore = 'foot, leg, paw,
  wheel'. The foot cell held karga; it is now naoore (route leg+foot kept),
  so foot and wheel no longer share a form.
- sce fish/head tie-bars written bare (house convention).
- Tone debt 58 → 69: moh's FirstVoices grave accents (7 cells) are tone the
  row's IPA has never written; bca turned majority-Chao and exposed 3 old
  toneless cells; one each in njo duu ers.
- Homophones locked (sourced): ahk a kui, naq ǁgûb, ers nɛ, qxs tɕi dʒɿ mi
  tsʰi (tones dropped by the row), ake ensi, duu nɑm, woe cha (blood / to be
  red), bca ɤ̃ kou.

## Held

- mro: 7 DELs rest on ASJP alone (no citable Mru wordlist) — not applied.
- DELs on route concepts (cro we, ik/moh wine, bci bear) — need a route
  decision, not applied.
