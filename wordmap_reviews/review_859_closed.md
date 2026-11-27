# Review 859 — six more basic words: woman, man, child, meat, cloud, smoke

2026-11-27. Follows review 858 (owner 「はい、続けてください」). Same pipeline as reviews 853 and 857 (S/nw3/BRIEF.md, VBRIEF.md).

## Result of the pipeline
- 3,527 cells drafted by 15 family agents.
- 13 verifiers: 3,464 ok, 40 fixed, 23 dropped.

## Clash policy
One rule for every verifier list this round. These overlaps are expected:
- woman = the row's wife cell;
- man = husband or person;
- child = daughter;
- smoke = tobacco.

Such a cell is kept when its own source glosses this meaning. A clash with an unrelated word is dropped unless a source gives both meanings.

## My own decisions
- **Dropped, sources or readings disagree:**
  - Sinitic: Jinan cloud and smoke, Chengdu smoke, Lanzhou meat and Taiyuan (cjy) cloud, where Wiktionary and MCPDict differ; also nan_te man (tone).
  - uga meat (šiʾru vs bšr).
  - bbc woman (boru-boru vs boru).
  - agq child (wìzɨ́n vs wí).
  - wbp man, pjt smoke, ve man (a second list gives another word).
- **Dropped, compound tones built from citation tones:** zh_kf / czh / wuu_hz man; wuu_hz / wuu_jx woman; hak_cn woman and man.
- **Dropped, notation:**
  - ja_mvi woman: 女 written for "midun", which is not the standard word.
  - qwc woman and man: 1560 spellings guarme / cari in a row that writes warmi.
  - juc (all cells): Robbeets' ə/š romanization in a row that uses e/j.
- **Restored by me:**
  - hil cloud gabon: synonyms in one Wiktionary table, not a conflict.
  - tr et / az ət meat: homographs of the @ cell; both meanings are sourced.
  - ptrk man *ǟr: Wiktionary "man".
- **Open item, ptrk husband *ēr:** a verifier reports the Wiktionary page glosses *ēr "early". Left as it is; it needs a check.
- **Mechanical fixes:**
  - 5 stress marks on monosyllables removed.
  - vi_s thịt written ˨˩ (checked nặng, as the row writes it).
  - NomNaTong subset +𩄲 mây, 𤌋 khói (71 codepoints).

## Totals
| word | cells |
|---|---|
| woman | 664 |
| man | 567 |
| child | 522 |
| meat | 571 |
| cloud | 588 |
| smoke | 570 |

3,482 cells in 835 languages, all `partial: true` and every cell `plain`. Routes come next.

- Manifest: woman, man and child after person; smoke after fire; cloud before rain; meat after milk.
- EXPECTED_WORDS = 190.
- owner_decisions BUDGET: woman 58, man 58, child 76, meat 61, cloud 56, smoke 63.

CLOSED.
