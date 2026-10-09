# Review 557 — round 73: unsourced rows, part 2 (audit + fill)

Closed 2026-10-09. Ten agents; interrupted once (owner restarted WSL) and
resumed from the partial files. Working files: ~/langmap-work/r73/.

## Result

813 cells corrected (784 FIX + 29 RFIX; 14 route FIX lines converted to RFIX
with the current route), 55 emptied (historical rows plain "—", modern rows
with an 'unsourced' record), 77 cells filled from the source each row was
found to follow, and **75 more rows now name their source in meta.sources**
(rows with no sources: 195 → 120).

Most fixed: tyz 57, egy 45, hsn_yz 40 (rebuilt from MCPDict 冷水灘 — no row
source existed), sl 38 (IPA; 99 → devetindevetdeset, route unit, by hand),
dng 36 (Wiktionary Module:dng-pron; Tajik ҷ for Dungan җ), dsb 34 / hsb 31
(Polish-style IPA; hsb moon měsac was 'month'), myp 27, pt_gw 25, kjp 24
(script), mni 23, mra 22 (Khmu words copied from kjg), hit 22, bsk 22,
kjg 20, lt 19, lb 19, ygr 18, brx 17 (ो/ै read as o/ɨ; Bodo /ɯ/ /ɯi/),
khw 8 (Urdu red لال, fish ماچھی).

Clean or nearly: jv, ilo, nij, tsj, ne, si, ckb, ps, ug, tk, se.

## Hand-made decisions

- ksw digit tones (⁵² ³³ ²¹ ³¹) converted to Chao letters; sd/kjp tie-bars bare.
- Pirahã baíxi 'parent' in both father and mother: ACCEPTED as
  'myp:father|mother' in implausible_polysemy_check.
- Old Cham ama / ina ruled inherited from PAn *ama / *ina.
- Homophones locked: chb hyca name/stone (Gómez: hyca#I 'Nombre'),
  mra wək water/drink (Peiros), myp grue blue/green.
- Debts: tone 69 → 71 (tca toneless cells), lexical-import 12 → 13
  (hsn_yz 嘴 after the rebuild).

## Held

DELs on route concepts (we in cjy_lv hsn_hy hsn_yz; sugar emp tiw bsk;
coffee bsk) — need a route decision; not applied.
