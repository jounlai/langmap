# Review 558 — round 74: the last 120 rows without a source

Closed 2026-10-09. Ten agents: four on dialect / national-variety rows,
six on rows audited in earlier rounds that still cited nothing.
Working files: ~/langmap-work/r74/.

## Result

**Every Word Map row now names its source** (rows with no sources:
120 → 0; 119 written from the agents' SOURCES lines by
~/langmap-work/post_round.py, en_ng2 by hand).

599 cells corrected (557 FIX + 42 RFIX), 6 emptied with a record (wuu_wz ear
was Mandarin IPA, mother 阿娘 is 'aunt'; hak_tw chocolate; mey/rap wheel;
fia hello/thanks) plus historical blanks, 101 cells filled.

- Dialect rows: Spanish es_pr es_do es_gt es_ec es_uy es_ve es_bo — words
  right, IPA copied from the parent (trilled r in dormir, Uruguay-only
  hierro, unstressed nieve/hija/ojo; stress then added across all es_*
  rows for the sibling check); ca_va 21 (Valencian vowels per AVL).
  Levantine ar_sy ar_lb ar_jo ar_ps: "ear" was Egyptian ودن; five xamsa →
  xamse; ar_ye 16 (Sanaani). English en_wls en_jam en_za en_us: IPA from
  RP/General American where the variety differs. Sinitic town rows against
  MCPDict: zh_zz 30, wuu_sz 26, wuu_wz 24, hak_tw 23, zh_wh 21;
  nan_qz nan_hai clean.
- Previously audited rows: prk 38 / wbm 25, h_vedic 23, adx 20, inh 18,
  krl 16, rup 10, rap 10, kxm 9 and smaller fixes elsewhere.

## Hand-made decisions

- zh_wh 熊 ɕioŋ˥˥: MCPDict 武漢 prints 熊 as tone 1 (55), irregular;
  ALLOW entry. Stale hsn_yz debt entries removed.
- wuu_sz house 房子 (dial-syn Suzhou; 屋里 is 'at home'): lexical-import
  debt 13 → 14.
- zh_wh cat left as it was (object cell with a reader-reported alt).
- A Cyrillic ы typo in a wbl source title fixed (cəbɨr).
