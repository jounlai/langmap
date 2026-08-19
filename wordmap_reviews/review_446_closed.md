# Review 446 — 行内表記整合（ラリー3／5・決定的チェッカー）

**日付:** 2026-08-19
**手法:** `tools/cross_row_consistency_check.js`。LLM に「正しいか」を問わず、
**各行が既に34語で採っている文字体系・声調表記**と新セルを機械照合した。
[[hanmap-deterministic-checkers]] の方針どおり、系統的誤りは検査器で潰す。

## 文字体系の不一致 — 21セル修正

| 行 | 語 | 修正前 | 修正後 | 行の多数派 |
|---|---|---|---|---|
| enf 森ネネツ | night / tongue | пи・нями | **pi・nyami** | ラテン（kari, nexu, buja…） |
| ess 中央シベリア・ユピック | blood | aak | **аак** | キリル |
| ale アレウト | blood | aamax | **аамах̆** | キリル |
| yai ヤグノビ | blood/tongue/night | хун・зивок・хшап | **xun・zivok・xšap** | ラテン |
| wbl ワヒ | blood | wixn | **вихн** | キリル |
| psi パシャイ | blood/tongue/night | ratt・žib・rat | **رت・ژیب・رات** | アラビア |
| luz 南ルル | blood/tongue/night | خون・زون・شو | **xun・zun・şow** | ラテン |
| haj ハジョン | blood/tongue/night | রক্ত・জিবা・রাতি | **rokto・jiba・rati** | ラテン |
| tly タリシュ | blood | خун | **xun** | ラテン |
| pi_edu パーリ（教育） | blood | लोहित | **lohita** | ラテン |
| cja 西チャム | blood/tongue/night | darah・dalah・malam | **دره・دله・مالم** | アラビア（アカル・ジャウィ） |

**tly の blood `خун` は文字の混成だった** — アラビア文字 خ にキリル ун が続く1語。
`script_fusion_check` は既知の3語だけを見ていたため素通りしていた。

## 声調表記の不一致 — 2セル修正

- **lhu ラフ blood** `ʃi˩` → `ʃi`（この行は Chao 声調を一切付けない）
- **lhm ロミ tongue** `tɕila` → `tɕila˥`（27セル中25セルが付けている）

## 未決 2件（行単位の課題）

- **tca ティクナ** — blood/tongue/night の3セルが無声調。ただし fish・three・red も
  同様で**行全体の欠落**。声調を推測で足すのは捏造になるため据え置き。
- **zh_song 宋代漢語** — 入声セル（血・舌・月）に声調がなく、一（i˥）にはある。行内で未整理。
