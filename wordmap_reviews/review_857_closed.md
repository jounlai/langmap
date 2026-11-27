# Review 857 — six more basic words: horn, breast, liver, come, road, full

2026-11-27. Follows review 854 (owner 「はい、続けてください」). Same pipeline as review 853.

## Pipeline
1. Candidate sheets: every row's lexibank forms for the Concepticon concepts (HORN (ANATOMY), BREAST, LIVER, COME, ROAD / PATH / PATH OR ROAD, FULL), plus the row's own eat/drink/sleep/see and good/white cells to set its citation form.
2. 15 family drafters (S/nw2/BRIEF.md), with this round's sense rules:
   - breast = a woman's breast, not "chest";
   - road not only "street";
   - full = the adjective.
3. 13 verifiers re-read each source (S/nw2/VBRIEF.md): 3,051 drafted, 2,978 ok, 58 fixed, 15 dropped.

## My own decisions on top of the verifiers
- **Dropped, sources disagree:**
  - yue_dg come (Wiktionary ŋui, MCPDict lɵ)
  - acn horn (tone 55 vs 35)
  - rim road (another Nyaturu dialect than the row's)
  - shx horn/full (a Duozhu She doculect, not Haifeng)
- **Restored, ha road hanya:** the Hausa Milky Way cell is "hanya" on purpose; its comment reads "literally 'the road'".
- **Restored, breast cells = the row's milk word:**
  - adt, enq, fai, hui, kgg, ium
  - abs, aoz, bjn, bug, dtp, gay, hot

  Every source glosses them "breast". One verifier kept 13 such Austronesian cells and another dropped seven, so I applied the same rule to all of them.
- **Open item, milk cells with no source:** adt ngama, enq andu, fai muk, hui andu and kgg ambu have no source comment. The lexibank lists give these words only for BREAST, so these cells need a source.
- **Japanese/Korean dialects:**
  - Romanized dialect sources were respelled only where the dialect word is the standard morpheme (Kagoshima tsuno 角, Gyeongsang ppul 뿔).
  - Real dialect words keep their own form from 우리말샘: 질 road; 항거석이다 (경남), 꼴뚝하다 (함북) and 꼴똑차다 (길림성) full.
- **Mechanical fixes:**
  - IPA syllable dots dropped where the row has none.
  - 12 stress marks on monosyllables removed.
  - ko_em 졎 written without ̚, which matches the row.

## Result
| word | cells |
|---|---|
| horn | 484 |
| breast | 482 |
| liver | 565 |
| come | 510 |
| road | 607 |
| full | 385 |

3,033 cells in 763 languages, all `partial: true`, every cell `plain`. Etymological routes come next.

- Manifest:
  - horn after horse;
  - breast after skin;
  - liver after heart;
  - come after hear;
  - road after house;
  - full after new.
- EXPECTED_WORDS = 184.
- owner_decisions BUDGET (variety rows with no variety source): horn 71, breast 73, liver 71, come 66, road 63, full 75.

## Fonts
- NomNaTong subset: +𧤁 𦜘 𦤾 𠫆 (69 codepoints).
- New Jigmo2 one-glyph subset (CC0) for Cantonese 𢆡 nin1 'breast'.

CLOSED.
