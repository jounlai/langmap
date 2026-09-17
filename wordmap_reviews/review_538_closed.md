# Review 538 — closed

**Question:** `cjy_lv` is Lishi / Lüliang Jin (呂梁片). Its IPA was 76% character-identical to `cjy`,
which is Taiyuan (并州片) — a different subgroup with a different tone system. Which cells are
really Lüliang?

**Answer: none of the tone layer was.** 34 of 51 IPA strings and 49 of 51 surfaces were Taiyuan's.
All 51 cells have been re-cut from one published Lishi source; 50 are sourced, 1 is not and stays.

## The tone systems do not overlap anywhere

| | 陰平 | 陽平 | 上聲 | 去聲 | 陰入 | 陽入 |
|---|---|---|---|---|---|---|
| **離石 城关** (李小平 2004) | 24 ˨˦ | 44 ˦˦ | 312 ˧˩˨ | 52 ˥˨ | ʔ4 ˦ | ʔ23 ˨˧ |
| 離石 (《山西方言調查研究報告》1993, via 小學堂) | 213 | 44 | 312 | 53 | — | — |
| 汾州小片 (沈明・秋谷裕幸 2018《中國語文》4) | 214 | 44 | 312 | 53 | ʔ4 | ʔ214~ʔ312 |
| **太原 / 并州片** — what the row carried | **11 (平聲 merged)** | | 53 | 45 | ʔ2 | ʔ54 |

Six categories against five: 呂梁片 splits 平聲, 并州片 merges it. **Not one category shares a
contour with Taiyuan.** So every tone-bearing cell was wrong, including the ones whose segments
were right.

## What broke the case open

Not another tone table — a syllabary. `离石话同音字表20220511.tsv` (osfans/MCPDict), 3,426
characters, header `来源：李小平 2004《山西离石方言音系》…代表城关音系 / 调值 ［1］24［2］44［3］312
［5］52［7］4［8］23`. That is the same 李小平 2004 citation review 518 could not verify, now
traceable to a table one can look a character up in. Eight of its readings are independently
corroborated by 小學堂's 離石 point.

Spot-checked before applying anything: 水 `su3`, 五 `uəʔ8`, 白 `pʰiəʔ8`, 我 `ŋa3`, 百 `piəʔ7` — all
as reported.

## Three findings that change what we thought we knew

**1. `水 fei` was invented, and the handoff had it listed as evidence of the opposite.** Item 23
records `fei` among the cells that "carry real 呂梁 features". 李小平's 離石 initial inventory has
**no /f/ at all** (k kʰ l m n p pʰ s t ts tsʰ tɕ tɕʰ tʰ x z ŋ ɕ Ø); 水 is `su˧˩˨`, homophone group
髓鼠黍薯许数; and the 六地方言語音對比 survey states that 離石 reads 普通話 f-words with xu-. 汾陽 has
sʮ, 臨縣 shuei. **`fei` traces to nowhere** — it is not Taiyuan's either. A cell that matches no
neighbour is easy to read as a rare local feature; here it was the one cell with no origin at all.

**2. 五 is a checked syllable in Lishi** — `uəʔ˨˧` 陽入, homophones 伍午物勿. The row had Taiyuan's
`u˥˧`. This also refutes the Han Map's kept-but-unverified `cjy_lv 五 ˥˧` (handoff item 8).

**3. About twenty cells are segmentally right *because* they are identical to Taiyuan** — 血/雪
ɕyəʔ, 喝 xəʔ, 吃 tsʰəʔ, 铁 tʰiəʔ, 一 iəʔ, 蜜 miəʔ, 月 yəʔ, 舌 səʔ, 骨 kuəʔ, 土 tʰu, 家 tɕia, 树 su,
四/屎 sɿ, 火 xuo, 妈 ma, 眼 niæ, 手, 狗. Neighbouring Chinese lects share most basic vocabulary;
**identity is not the defect, identity where the tone systems say they must differ is.** Only the
tone letters moved on those. Conversely 我 (ŋa˧˩˨ against Taiyuan ɣɤ˥˧), 五 and 百 (piəʔ˦ against
paʔ) were wrong in the segments too, and 白 must be aspirated `pʰiəʔ˨˧` because 呂梁片 aspirates
regardless of 平仄.

## Deliberately not done

- **`we` (俺们) is unsourced** — neither 俺 nor plural 们 is in the 字表. Left as it was rather than
  invent a pronoun.
- **Surfaces untouched.** A 字表 gives readings, not word choice: whether Lishi says 日头, 你好 or
  俺们 is a separate question (handoff item 21 doubts 日头 independently).
- **Citation tones throughout.** No source reached gives Lishi disyllabic sandhi, and the row's old
  眼睛/你好 ˨˩˧ were Taiyuan sandhi values.

## Caveats carried forward

The 李小平 table reaches us as a community transcription, not the printed book, and its 陰平/去聲/
陽入 (24/52/23) differ a degree or two from the 1993 report and 沈明・秋谷 (213~214/53/ʔ214~ʔ312).
**One reading was applied row-wide** rather than mixing, so segments and tones come from one book.
The two surveys also differ on the mid vowel (ʌ against ə) and the row still mixes both; that needs
one convention.

## Guard effect

`sinitic_tone_system_share_check.js`'s DEBT entry `cjy|cjy_lv` is **paid and removed**. The table
stays in the file, empty: two Sinitic rows sharing a tone system is the most reliable sign the
project has that one was copied from the other.
