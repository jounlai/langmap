# Review 861 — six more basic words: hair, neck, tail, feather, sand, ash

2026-11-28. Follows review 860. The batch was paused overnight and resumed from .claude/nw4_wip / S/nw4.

## Process
- **Drafting:** 15 family drafters. AF1 was re-run because its first run was stopped before it wrote an output file.
- **Verification:** 13 verifiers. 3,174 cells drafted: 3,080 ok, 64 fixed, 30 dropped.

## My own decisions (strict "two sources, two different words → drop")
- **Different words in two sources:**
  - neck: koi, smn, loz, ce, av, wa, ko_bus (우리말샘 has 모간지 for 경상).
  - feather: se, nv, ko_mid (·짗 vs 깃).
  - ash: ab, kbd, mnc, pa, os, tum, xh.
  - tail: so, osp.
  - sand: gsw, ko_hg, hmn, loz.
  - hair: kk, ain, och.
  - kk feather.
  - Tone conflict: gan hair (Wiktionary and MCPDict differ on 髮).
- **Variety or notation problems:**
  - Whole rows: mn_cn (standard Mongolian entries, letter-by-letter IPA), sog (IE-CoR comment transliterations), juc (romanization unlike the row's).
  - Single cells:
    - ksh hair (source is Central Franconian, not Kölsch)
    - haz ash (Persian pronunciation)
    - ko_mid tail and sand (tone dots placed by the drafter)
    - ja_rys feather and ash (Yaeyama and Miyako mixed)
    - itl ash (˚ in the surface)
    - vi_nom feather (𣭜 is lông only; the vi row has lông vũ)
- **Kept: homographs listed as separate entries.** Samoan, Tokelauan and Tuvaluan ua neck/rain; Niuean ua neck/two; mh bok sand/book; Persian پر feather/full.
- **Kept: one word for hair and feather.** Malagasy, Sasak, Hausa and others.

## Guards
The check_all crash and its fix are recorded in the commit before this one. This batch also needed:
- intra-row dup and Sinitic reading locks updated;
- ojp pane and kubi ruled circular; ota kum and xqa sač ruled inherited;
- mandarin-shape budget +3 (wuu 羽毛, wuu/wuu_hz 沙子 from dial-syn);
- om cirʼachaa apostrophe;
- 2 stress marks and 2 ko_em ̚ removed.

NomNaTong subset +𩯀 tóc, 𦙶 cổ, 𡳪 đuôi, 𡋥 cát (75 codepoints).

## Result
| word | cells |
|---|---|
| hair | 550 |
| neck | 526 |
| tail | 509 |
| feather | 464 |
| sand | 541 |
| ash | 506 |

3,096 cells in 739 languages. The map now has 196 words; routes come next.

CLOSED.
