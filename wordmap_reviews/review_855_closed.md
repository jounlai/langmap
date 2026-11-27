# Review 855 — the Script filter agrees with the map (owner report: Kusunda)

2026-11-27. Owner: 「フィルターのScriptが怪しい。例えば、Kusundaは、フィルターBrahmicで現れるけど、メタ情報のScriptではUsually unwrittenになっていて、地図上ではローマ字になってる」

## Cause
The Script chip reads `meta.scriptTags` (or, with no tags, a guess from the `meta.script` text — `detectScript` in lang-filter.js). `script_declaration_check` only asked "is every script in the cells declared?", and it excused Latin on rows whose text says unwritten. Nothing asked the reverse: "is every tag shown in the cells or named in the meta?" So Kusunda's invented `['Brahmic']` passed. The same gap hid rows whose map script was missing from their tags.

## Audit (all 1,218 rows, effective tags as the filter computes them)
Fixed, 31 rows:
- Tag with no basis: kgg Brahmic → Latin (unwritten, romanized transcription shown).
- Map script missing:
  - ayl +Arabic-derived (100% Arabic script, tagged Latin only)
  - blk +Brahmic (Burmese script)
  - ja_kyo / ja_sd / ja_rys +Kana
  - lep Other → Brahmic (Lepcha script)
  - amw +Syriac
  - oar +Hebrew (square script on the map)
  - p_ryu / p_jpk Other → None / reconstructed, like the other proto rows
- Native script kept, Latin added because the map shows a transliteration: trm, enf, emy, xlu, xpr, xqa, xsc, omy, osn, juc, pyx, ocm, sog, cms, xht, xib, xpg, xve.

Kept: tags for a script the language really uses but the meta text leaves out. Listed in ATTESTED with the reason:
- sw / mg / wo / ff Ajami-type Arabic script
- tg Persian script before 1928
- tl Baybayin
- bft Perso-Arabic Balti
- nan_xm / nan_zz POJ
- and others

dv Thaana stays Other: there is no Thaana chip.

## Guard
`tools/script_filter_tags_check.js`, registered in check_all as "script filter matches the map":
- SHOWN: a script in ≥25% of a row's cells must be one of its tags.
- BASIS: a tag must be shown or named in meta.script, unless it is listed in ATTESTED.

0 violations.

CLOSED.
