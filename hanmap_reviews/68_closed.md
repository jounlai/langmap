# Hanmap data review #68 — 全方向ラリー (30 family + 6 dimension reviewers + 12 developers)

> **方式:** オーナー指示の「全方向での確認」。#67 の語族別ラリーに加え、**横断観点別**レビュワーを併用し、
> 縦（各変種内の整合）×横（全言語横断の単一レンズ）×外部照合の三方向で 61 字 × 102 変種を監査。

## ラリー構成

- **縦 30本（語族別・変種内の深さ）**: 各 ~4 変種を全フィールド網羅監査。
- **横 6本（全言語横断・単一レンズ）**: ① surface↔IPA 声調一致 ② IPA 分節転写 ③ 兄弟変種の中古対応整合
  ④ ネイティブ文字グリフ ⑤ 文白/訓読ラベル ⑥ Sino-Xenic 層。
- **検証 12本**: マージ・重複排除後の findings を懐疑的に apply/reject 判定。

> **耐障害メモ:** 本ラリーはセッションの外部中断で複数回停止したため、完了済みレビュワー出力 405 findings を
> ジャーナル（agent transcripts）から回収し、検証フェーズのみを独立ワークフローとして再実行して完遂した。

## 結果

| 指標 | 数 |
|---|---|
| レビュワー出力（回収） | 42 |
| 生 findings → dedup | 484 → 405 |
| 開発者検証 | 405 |
| **承認(apply)** | **294**（確実 168 / 蓋然 118 / 要検討 8） |
| 却下(reject) | 111 |

## 適用

- **確実 164 件**: 自動適用（残 4 件は保留: 下記）。
- **保留 126 件**（開発者 apply・確信度 蓋然/要検討）: 言語非依存ポリシー質問として 4 バケット提示、
  オーナーが **全バケット適用** を選択 — ① IPA 精緻化 81、② ネイティブ文字 10、③ 表層ローマ字 30、④ 文白/訓読ラベル 5。
  うち ④ は **3 件のラベル入替**（cdo 手・cpx 手・gan 人 の 白讀↔文讀）を適用。

**合計 291 セルを変更**（HEAD 比 collateral 0・全件 round-trip 検証済み）。

### 保留・未適用（6 件）
データ構造操作／字キー不整合／単独 variant のため自動適用を見送り、手動精査対象として記録:

- `nan_xm 来` / `nan_te 来` — 空ラベル variant の昇格・削除（構造操作）
- `bca 中` / `zh_cq 中` — char キーが `中`（実体は `中:1/中:2`）で不整合
- `nan_id 口` — variant が存在しない（main `chhùi`=喙 の訓読指摘）
- `wuu_sz 食` — 単独・無ラベル variant のラベル付け（兄弟変種並行性、要追加判断）

---

## 承認一覧（語族別）

### 官話 Mandarin (95)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| zh_cd | 地 | main | ipa | `ti˩˧` → `ti˨˩˧` | 確実 |
| zh_cd | 上 | main | ipa | `saŋ˩˧` → `saŋ˨˩˧` | 確実 |
| zh_cd | 右 | main | ipa | `iəu˩˧` → `iəu˨˩˧` | 確実 |
| zh_cd | 坐 | main | ipa | `tso˩˧` → `tso˨˩˧` | 確実 |
| zh_cd | 六 | main | surface | `neu²¹ /nəu˨˩/` → `nu²¹ /nu˨˩/` | 確実 |
| zh_cq | 九 | main | ipa | `tɕiəu˥˧` → `tɕiəu˦˨` | 確実 |
| zh_cq | 虎 | main | ipa | `fu˥˧` → `fu˦˨` | 確実 |
| zh_cq | 飲 | main | ipa | `in˥˧` → `in˦˨` | 確実 |
| zh_cq | 地 | main | ipa | `ti˨˩` → `ti˨˩˦` | 確実 |
| zh_cq | 上 | main | ipa | `saŋ˨˦` → `saŋ˨˩˦` | 確実 |
| zh_cq | 中:2 | main | ipa | `tsoŋ˨˩˧` → `tsoŋ˨˩˦` | 確実 |
| zh_cq | 中 | main | ipa | `tsoŋ˨˩˧` → `tsoŋ˨˩˦` | 確実 |
| zh_db | 九 | main | ipa | `tɕiɤu˨˩˧` → `tɕiou˨˩˧` | 蓋然 |
| zh_gl | 人 | main | surface | `ren³¹` → `zen³¹` | 確実 |
| zh_hf | 肉 | main | surface | `zeq⁴` → `ziq⁴` | 確実 |
| zh_jh | 山 | main | ipa | `sã˧˧˦` → `ʂã˧˧˦` | 蓋然 |
| zh_jh | 頭 | main | ipa | `dɤu˨˨˦` → `tʰɤu˨˨˦` | 蓋然 |
| zh_jh | 肉 | main | surface | `rouq⁵` → `nyuq⁵` | 蓋然 |
| zh_jiao | 一 | main | surface | `yi²¹³` → `yi⁵⁵` | 確実 |
| zh_jiao | 一 | main | ipa | `i˨˩˧` → `i˥˥` | 確実 |
| zh_jiao | 七 | main | surface | `qi²¹³` → `qi⁵⁵` | 確実 |
| zh_jiao | 七 | main | ipa | `tɕʰi˨˩˧` → `tɕʰi˥˥` | 確実 |
| zh_jiao | 八 | main | surface | `ba²¹³` → `ba⁵⁵` | 蓋然 |
| zh_jiao | 八 | main | ipa | `pa˨˩˧` → `pa˥˥` | 蓋然 |
| zh_jiao | 北 | main | surface | `bei²¹³` → `bei⁵⁵` | 確実 |
| zh_jiao | 北 | main | ipa | `pei˨˩˧` → `pei˥˥` | 確実 |
| zh_jiao | 足 | main | surface | `zu⁴²` → `zu⁵⁵` | 確実 |
| zh_jiao | 足 | main | ipa | `tsu˦˨` → `tsu˥˥` | 確実 |
| zh_jiao | 日 | main | surface | `yi⁵³` → `yi⁴²` | 確実 |
| zh_jiao | 日 | main | ipa | `i˥˧` → `i˦˨` | 確実 |
| zh_jiao | 立 | main | surface | `li⁵³` → `li⁴²` | 確実 |
| zh_jiao | 立 | main | ipa | `li˥˧` → `li˦˨` | 確実 |
| zh_jn | 足 | main | surface | `zu⁴²` → `zu²¹³` | 確実 |
| zh_jn | 足 | main | ipa | `tsu˦˨` → `tsu˨˩˧` | 確実 |
| zh_kf | 目 | main | surface | `mu⁴²` → `mu²⁴` | 要検討 |
| zh_km | 左 | main | surface | `zuo²¹³` → `zuo⁵³` | 確実 |
| zh_km | 左 | main | ipa | `tsuo˨˩˧` → `tsuo˥˧` | 確実 |
| zh_km | 右 | main | surface | `you⁵¹` → `you²¹²` | 確実 |
| zh_km | 右 | main | ipa | `iou˥˩` → `iou˨˩˨` | 確実 |
| zh_km | 地 | main | surface | `di⁴⁵` → `di²¹²` | 確実 |
| zh_km | 地 | main | ipa | `ti˦˥` → `ti˨˩˨` | 確実 |
| zh_km | 中:2 | main | surface | `zong¹³` → `zong²¹²` | 確実 |
| zh_km | 中:2 | main | ipa | `tsuŋ˩˧` → `tsuŋ˨˩˨` | 確実 |
| zh_km | 坐 | main | surface | `zuo⁴⁴` → `zuo²¹²` | 確実 |
| zh_km | 坐 | main | ipa | `tsuo˦˦` → `tsuo˨˩˨` | 確実 |
| zh_km | 魚 | main | surface | `yu⁴²` → `yu³¹` | 確実 |
| zh_km | 魚 | main | ipa | `y˦˨` → `y˧˩` | 確実 |
| zh_lz | 上 | main | surface | `shang⁵³` → `shang¹³` | 蓋然 |
| zh_lz | 上 | main | ipa | `ʂɑ̃˥˧` → `ʂɑ̃˩˧` | 蓋然 |
| zh_lz | 下 | main | surface | `xia⁵³` → `xia¹³` | 蓋然 |
| zh_lz | 下 | main | ipa | `ɕia˥˧` → `ɕia˩˧` | 蓋然 |
| zh_phagspa | 八 | main | native | `ꡌꡈ` → `ꡌꡖ` | 蓋然 |
| zh_phagspa | 立 | main | native | `ꡙꡞꡌ` → `ꡙꡞ` | 蓋然 |
| zh_phagspa | 足 | main | native | `ꡒꡞꡓ` → `ꡒꡟ` | 蓋然 |
| zh_phagspa | 走 | main | native | `ꡒꡟꡓ` → `ꡒꡞꡓ` | 蓋然 |
| zh_sc | 羊 | main | surface | `yan²¹` → `yang²¹` | 確実 |
| zh_sc | 羊 | main | ipa | `yan˨˩` → `iaŋ˨˩` | 確実 |
| zh_song | 日 | main | ipa | `ȵit̚` → `ɲit̚` | 確実 |
| zh_song | 日 | main | surface | `ȵit` → `ɲit` | 確実 |
| zh_song | 肉 | main | ipa | `ȵiuk̚` → `ɲiuk̚` | 確実 |
| zh_song | 肉 | main | surface | `ȵiuk` → `ɲiuk` | 確実 |
| zh_tang | 虎 | main | surface | `xuɔ²¹⁴` → `xuo²¹⁴` | 蓋然 |
| zh_tang | 虎 | main | ipa | `xuɔ˨˩˦` → `xuo˨˩˦` | 蓋然 |
| zh_tang | 来 | main | ipa | `ləɪ˩˨˧` → `loɪ˩˨˧` | 蓋然 |
| zh_tang | 上 | main | surface | `d͡ʑɨɐŋ²¹⁴` → `d͡ʑiɐŋ²¹⁴` | 蓋然 |
| zh_tang | 日 | main | ipa | `ȵiɪt̚` → `ɲiɪt̚` | 蓋然 |
| zh_tang | 日 | main | surface | `ȵiɪt` → `ɲiɪt` | 蓋然 |
| zh_tj | 天 | main | ipa | `tʰiɑn˨˩` → `tʰiɛn˨˩` | 確実 |
| zh_us | 犬 | main | ipa | `t͡ɕʰjwan˨` → `t͡ɕʰjwɛn˨` | 蓋然 |
| zh_wh | 頭 | main | ipa | `tʰou˨˩˧` → `tʰəu˨˩˧` | 蓋然 |
| zh_wh | 走 | main | ipa | `tsou˦˨` → `tsəu˦˨` | 蓋然 |
| zh_wh | 口 | main | ipa | `kʰou˦˨` → `kʰəu˦˨` | 蓋然 |
| zh_wh | 手 | main | ipa | `sou˦˨` → `səu˦˨` | 蓋然 |
| zh_wh | 足 | main | ipa | `tsou˨˩˧` → `tsəu˨˩˧` | 蓋然 |
| zh_wh | 六 | main | ipa | `nou˨˩˧` → `nəu˨˩˧` | 蓋然 |
| zh_wh | 右 | main | ipa | `iou˧˥` → `iəu˧˥` | 蓋然 |
| zh_wh | 北 | main | surface | `bei²¹³` → `be²¹³` | 要検討 |
| zh_wh | 行:2 | main | ipa | `xan˨˩˧` → `xaŋ˨˩˧` | 確実 |
| zh_wh | 肉 | main | ipa | `nəu˨˩˧` → `nou˨˩˧` | 蓋然 |
| zh_wh | 土 | main | ipa | `tʰəu˦˨` → `tʰou˦˨` | 蓋然 |
| zh_xa | 央 | main | ipa | `iã˨˩` → `iaŋ˨˩` | 確実 |
| zh_yuan | 北 | main | surface | `pei1` → `pei3` | 確実 |
| zh_yuan | 血 | main | surface | `xye1` → `xye3` | 確実 |
| zh_zz | 十 | main | ipa | `ʂʐ̩˨˦` → `ʂʐ̩˦˨` | 確実 |
| zh_zz | 人 | main | ipa | `ʐən˨˦` → `ʐən˦˨` | 確実 |
| zh_zz | 頭 | main | ipa | `tʰəu˨˦` → `tʰəu˦˨` | 確実 |
| zh_zz | 魚 | main | ipa | `y˧˥` → `y˦˨` | 確実 |
| zh_zz | 木 | main | ipa | `mu˧˩˨` → `mu˨˦` | 確実 |
| zh_zz | 目 | main | ipa | `mu˨˩` → `mu˨˦` | 確実 |
| zh_zz | 貓 | main | surface | `mao⁵⁵` → `mao²⁴` | 蓋然 |
| zh_zz | 貓 | main | ipa | `mau˥˥` → `mau˨˦` | 蓋然 |
| zh_zz | 左 | main | surface | `zuo⁵⁵` → `zuo⁵³` | 確実 |
| zh_zz | 左 | main | ipa | `tsuo˥˥` → `tsuo˥˧` | 確実 |
| zh_zz | 南 | main | ipa | `næ̃˦˨` → `nan˦˨` | 確実 |
| zh_zz | 日 | main | ipa | `ʐɿ˨˦` → `ʐ̩˨˦` | 確実 |

### 粤 Yue (36)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| yue_dg | 上 | var[上面（locative）] | surface | `sœŋ²²` → `soeng6` | 確実 |
| yue_dg | 上 | var[上去（directional verb）] | surface | `sœŋ¹³` → `soeng5` | 確実 |
| yue_dg | 一 | main | ipa | `jɐt̚˥˥` → `jɐt̚˥` | 確実 |
| yue_dg | 六 | main | ipa | `lʊk̚˨˨` → `lʊk̚˨` | 確実 |
| yue_dg | 日 | main | ipa | `ŋɐt̚˨˨` → `ŋɐt̚˨` | 確実 |
| yue_dg | 月 | main | ipa | `ŋyt̚˨˨` → `ŋyːt̚˨` | 確実 |
| yue_dg | 木 | main | ipa | `mʊk̚˨˨` → `mʊk̚˨` | 確実 |
| yue_dg | 目 | main | ipa | `mʊk̚˨˨` → `mʊk̚˨` | 確実 |
| yue_dg | 立 | main | ipa | `lɐp̚˨˨` → `lɐp̚˨` | 確実 |
| yue_dg | 五 | main | ipa | `ŋ˩˧` → `ŋ̍˩˧` | 確実 |
| yue_dg | 火 | main | ipa | `fɔ˧˥` → `fɔː˧˥` | 確実 |
| yue_dg | 虎 | main | ipa | `fu˧˥` → `fuː˧˥` | 確実 |
| yue_dg | 坐 | main | ipa | `tsʰɔ˩˧` → `tsʰɔː˩˧` | 確実 |
| yue_dg | 二 | main | ipa | `ji˨˨` → `jiː˨˨` | 確実 |
| yue_dg | 耳 | main | ipa | `ji˩˧` → `jiː˩˧` | 確実 |
| yue_dg | 馬 | main | ipa | `ma˩˧` → `maː˩˧` | 確実 |
| yue_dg | 鳥 | main | ipa | `niu˩˧` → `niːu˩˧` | 確実 |
| yue_gz | 上 | var[上面（locative）] | surface | `sœːŋ²²` → `soeng6` | 確実 |
| yue_gz | 上 | var[上去（directional verb）] | surface | `sœːŋ¹³` → `soeng5` | 確実 |
| yue_gz | 一 | main | ipa | `jɐt̚˥˥` → `jɐt̚˥` | 確実 |
| yue_gz | 六 | main | ipa | `lʊk̚˨˨` → `lʊk̚˨` | 確実 |
| yue_gz | 日 | main | ipa | `jɐt̚˨˨` → `jɐt̚˨` | 確実 |
| yue_gz | 月 | main | ipa | `jyt̚˨˨` → `jyːt̚˨` | 確実 |
| yue_gz | 木 | main | ipa | `mʊk̚˨˨` → `mʊk̚˨` | 確実 |
| yue_gz | 目 | main | ipa | `mʊk̚˨˨` → `mʊk̚˨` | 確実 |
| yue_gz | 立 | main | ipa | `lɐp̚˨˨` → `lɐp̚˨` | 確実 |
| yue_gz | 五 | main | ipa | `ŋ˩˧` → `ŋ̍˩˧` | 確実 |
| yue_gz | 火 | main | ipa | `fɔ˧˥` → `fɔː˧˥` | 確実 |
| yue_gz | 虎 | main | ipa | `fu˧˥` → `fuː˧˥` | 確実 |
| yue_gz | 坐 | main | ipa | `tsʰɔ˩˧` → `tsʰɔː˩˧` | 確実 |
| yue_nn | 犬 | main | surface | `hin3` → `hin2` | 蓋然 |
| yue_nn | 犬 | main | ipa | `hiːn˧˧` → `hiːn˧˥` | 蓋然 |
| yue_ts | 中:2 | main | surface | `zung3` → `zung1` | 蓋然 |
| yue_ts | 五 | main | surface | `ng5` → `ng4` | 蓋然 |
| yue_ts | 一 | main | surface | `yat1` → `yat2` | 蓋然 |
| yue_ts | 七 | main | ipa | `tsʰit̚˥˥` → `tʰit̚˥˥` | 蓋然 |

### 閩南 Min Nan (42)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| nan | 十 | main | ipa | `t͡sap̚˦` → `sip̚˦` | 確実 |
| nan | 飲 | var[訓讀（啉）] | ipa | `lim˥˧` → `lim˥˥` | 確実 |
| nan | 央 | var[白讀] | label | `白讀 (on iong)` → `文讀` | 確実 |
| nan | 央 | var[文讀] | label | `文讀 (on ng)` → `白讀` | 確実 |
| nan_hai | 七 | main | ipa | `sit̚˩˩` → `sit̚˥` | 確実 |
| nan_hai | 一 | main | ipa | `it̚˩˩` → `it̚˥` | 確実 |
| nan_hai | 八 | main | ipa | `ɓuet̚˩˩` → `ɓuet̚˥` | 確実 |
| nan_hai | 日 | main | ipa | `rit̚˨˩˧` → `rit̚˧` | 確実 |
| nan_hai | 去 | var[白讀] | ipa | `hi˧˧` → `hi˧˥` | 蓋然 |
| nan_hai | 去 | var[文讀] | ipa | `hu˧˧` → `hu˧˥` | 蓋然 |
| nan_hai | 三 | var[白讀] | ipa | `ta˨˦` → `ɗa˨˦` | 蓋然 |
| nan_id | 口 | main | label | `(no label) chhùi /t͡sʰui˥˩/` → `訓讀（喙）` | 蓋然 |
| nan_id | 一 | var[文讀] | ipa | `it˦` → `it̚˦` | 確実 |
| nan_id | 五 | var[文讀] | ipa | `ŋɔ˥˩` → `ŋɔ˥˧` | 確実 |
| nan_pera | 七 | main | ipa | `tɕiʔ˥` → `tɕʰiʔ˥` | 確実 |
| nan_pera | 手 | var[白讀] | surface | `chiu²¹` → `chhiu²¹` | 確実 |
| nan_pera | 右 | main | ipa | `iu˧` → `iu˨˩` | 確実 |
| nan_pera | 上 | main | ipa | `siɔŋ˧` → `siɔŋ˨˩` | 蓋然 |
| nan_pera | 魚 | main | ipa | `hu˥` → `hu˨˦` | 確実 |
| nan_pera | 心 | main | ipa | `sim˧` → `sim˦` | 蓋然 |
| nan_pera | 貓 | main | ipa | `niau˧` → `niau˦` | 蓋然 |
| nan_pera | 中:1 | main | ipa | `tiɔŋ˧` → `tiɔŋ˦` | 蓋然 |
| nan_qz | 山 | var[白讀] | ipa | `suã˦˩` → `suã˥˥` | 蓋然 |
| nan_qz | 山 | var[文讀] | ipa | `san˦˩` → `san˥˥` | 蓋然 |
| nan_qz | 天 | var[白讀] | ipa | `tʰĩ˦˩` → `tʰĩ˥˥` | 蓋然 |
| nan_qz | 天 | var[文讀] | ipa | `tʰian˦˩` → `tʰian˥˥` | 蓋然 |
| nan_sg | 去 | var[白讀] | ipa | `kʰi˥˧` → `kʰi˨˩` | 確実 |
| nan_sg | 去 | var[文讀] | ipa | `kʰu˥˧` → `kʰu˨˩` | 確実 |
| nan_sg | 見 | var[白讀] | ipa | `kĩ˥˧` → `kĩ˨˩` | 確実 |
| nan_sg | 見 | var[文讀] | ipa | `kian˥˧` → `kian˨˩` | 確実 |
| nan_te | 二 | var[白讀] | ipa | `no˨˦` → `no˧˥` | 確実 |
| nan_te | 来 | var[] | label | `[{surface:lai5, ipa:lai˥˥, label:""}] duplicating the main reading` → `delete the empty-label variant (duplicate of main lai5/lai˥˥)` | 確実 |
| nan_th | 央 | main | ipa | `iɔŋ˧˥` → `iɔŋ˧` | 確実 |
| nan_xm | 一 | var[文讀] | ipa | `it̚˦` → `it̚˧˨` | 確実 |
| nan_xm | 血 | var[白讀] | ipa | `hueʔ˦` → `hueʔ˧˨` | 確実 |
| nan_xm | 血 | var[文讀] | ipa | `hiat̚˦` → `hiat̚˧˨` | 確実 |
| nan_xm | 肉 | var[訓讀（本字未詳）] | ipa | `baʔ˦` → `baʔ˧˨` | 蓋然 |
| nan_xm | 五 | var[白讀] | ipa | `ɡo˨˦` → `ɡɔ˨˩` | 蓋然 |
| nan_xm | 来 | var[] | label | `[{surface:lâi, ipa:lai˨˦, label:""}] with NO main reading` → `promote to main: surface lâi, ipa lai˨˦; remove the empty-label varian` | 確実 |
| nan_zz | 央 | var[白讀] | label | `白讀 (surface iong /iɔŋ˦/)` → `文讀` | 確実 |
| nan_zz | 央 | var[文讀] | label | `文讀 (surface ng /ŋ̍˦/)` → `白讀` | 確実 |
| nan_zz | 食 | var[白讀] | ipa | `t͡ɕiaʔ˩˨˩` → `t͡siaʔ˩˨˩` | 蓋然 |

### 閩東 Min Dong (13)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cdo | 四 | main | ipa | `sei˨˩˨` → `sei˨˩˧` | 確実 |
| cdo | 見 | main | ipa | `kieŋ˨˩˨` → `kieŋ˨˩˧` | 確実 |
| cdo | 行:2 | main | surface | `òng` → `hèng` | 確実 |
| cdo | 中:1 | main | ipa | `dyŋ˩˧` → `tyŋ˦˦` | 確実 |
| cdo | 中:2 | main | ipa | `dœyŋ˨˩˧` → `tœyŋ˨˩˧` | 確実 |
| cdo | 五 | main | ipa | `ŋu˨˦˨` → `ŋou˨˦˨` | 確実 |
| cdo | 六 | var[白讀] | ipa | `lɔyʔ˨˦` → `løyʔ˨˦` | 蓋然 |
| cdo | 十 | var[白讀] | ipa | `siɛʔ˨˦` → `seiʔ˨˦` | 蓋然 |
| cdo | 九 | var[白讀] | ipa | `kau˧` → `kau˧˩` | 蓋然 |
| cdo | 九 | var[文讀] | ipa | `kiu˧` → `kiu˧˩` | 蓋然 |
| cdo | 手 | var[白讀] | label | `siū /ɕiu˧˩˧/ = 白讀 ; chiū /tɕiu˧˩˧/ = 文讀` → `swap labels: chiū (tɕiu˧˩˧)=白讀 ; siū (ɕiu˧˩˧)=文讀` | 蓋然 |
| cdo | 行:2 | main | ipa | `xeŋ˩˧` → `oŋ˩˧` | 蓋然 |
| cdo | 水 | main | ipa | `tɕʰuoi˧˩˧` → `tsuoi˧˩˧` | 蓋然 |

### 閩北 Min Bei (16)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| mnp | 三 | main | ipa | `saŋ˦˥` → `saŋ˥˦` | 確実 |
| mnp | 天 | main | ipa | `tʰiŋ˦˥` → `tʰiŋ˥˦` | 確実 |
| mnp | 西 | main | ipa | `si˦˥` → `si˥˦` | 確実 |
| mnp | 心 | main | ipa | `seiŋ˦˥` → `seiŋ˥˦` | 確実 |
| mnp | 貓 | main | ipa | `mau˦˥` → `mau˥˦` | 確実 |
| mnp | 東 | main | ipa | `tɔŋ˦˥` → `tɔŋ˥˦` | 確実 |
| mnp | 東 | main | surface | `tóng` → `dóng` | 確実 |
| mnp | 馬 | main | ipa | `ma˧˩` → `ma˨˩` | 確実 |
| mnp | 七 | main | ipa | `tsʰiʔ˦˥` → `tsʰi˨˦` | 確実 |
| mnp | 七 | main | surface | `chhi̿` → `chĭ` | 蓋然 |
| mnp | 北 | main | ipa | `pɤʔ˦˥` → `pɛ˨˦` | 確実 |
| mnp | 北 | main | surface | `bă` → `bă̤` | 蓋然 |
| mnp | 足 | main | ipa | `tsyʔ˦˥` → `tsy˨˦` | 確実 |
| mnp | 足 | main | surface | `tsǜk` → `cṳ̆` | 蓋然 |
| mnp | 日 | main | ipa | `niʔ˨˦` → `ni˦˨` | 確実 |
| mnp | 日 | main | surface | `nĭk` → `nì` | 蓋然 |

### 莆仙 Puxian (15)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cpx | 去 | main | ipa | `kʰy˧˨˩` → `kʰy˦˨` | 確実 |
| cpx | 六 | var[白讀] | ipa | `laʔ˥` → `laʔ˨˦` | 蓋然 |
| cpx | 六 | var[文讀] | ipa | `lɔʔ˥` → `lɔʔ˨˦` | 蓋然 |
| cpx | 十 | var[白讀] | ipa | `saʔ˥` → `saʔ˨˦` | 蓋然 |
| cpx | 十 | var[文讀] | ipa | `siʔ˥` → `siʔ˨˦` | 蓋然 |
| cpx | 日 | var[白讀] | ipa | `liʔ˥` → `liʔ˨˦` | 蓋然 |
| cpx | 日 | var[文讀] | ipa | `d͡ziʔ˥` → `d͡ziʔ˨˦` | 蓋然 |
| cpx | 目 | var[白讀] | ipa | `maʔ˥` → `maʔ˨˦` | 蓋然 |
| cpx | 目 | var[文讀] | ipa | `mɔʔ˥` → `mɔʔ˨˦` | 確実 |
| cpx | 食 | var[白讀] | ipa | `siʔ˥` → `siʔ˨˦` | 蓋然 |
| cpx | 食 | var[文讀] | ipa | `sik˥` → `sik˨˦` | 蓋然 |
| cpx | 足 | main | ipa | `tsyɔʔ˨˦` → `tsyɔʔ˥` | 蓋然 |
| cpx | 中:1 | main | ipa | `diŋ˩˧` → `tiŋ˩˧` | 蓋然 |
| cpx | 中:2 | main | ipa | `diŋ˥˧` → `tiŋ˥˧` | 蓋然 |
| cpx | 手 | var[白讀] | label | `ɬiû /ɬiu˧˩/ = 白讀 ; tshiû /tsʰiu˧˩/ = 文讀` → `swap labels: tshiû (tsʰiu˧˩)=白讀 ; ɬiû (ɬiu˧˩)=文讀` | 蓋然 |

### 客家 Hakka (8)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| hak_cn | 馬 | main | surface | `mâ` → `má` | 蓋然 |
| hak_cn | 鳥 | main | surface | `tiâu` → `tiáu` | 蓋然 |
| hak_cn | 羊 | main | surface | `yông` → `yòng` | 蓋然 |
| hak_cn | 下 | main | surface | `hâ` → `ha` | 蓋然 |
| hak_cn | 貓 | main | surface | `meu` → `mêu` | 蓋然 |
| hak_cn | 行:2 | main | ipa | `hoŋ˥˥` → `hoŋ˨˦` | 蓋然 |
| hak_mz | 中:2 | main | ipa | `tʃuŋ˥˧... (actual: tʃuŋ˥˥)` → `tʃuŋ˥˧` | 確実 |
| hak_mz | 中:2 | main | surface | `chung` → `chùng` | 蓋然 |

### 徽 Hui (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| czh | 目 | main | ipa | `mu˥` → `muʔ˥` | 蓋然 |
| czh | 食 | main | ipa | `sɿ˧˧` → `siɪʔ˥` | 確実 |
| czh | 北 | main | ipa | `pɛ˥` → `pɛʔ˥` | 蓋然 |

### 湘 Xiang (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| hsn | 二 | main | ipa | `ɚ˦˥` → `ɚ˨˩` | 確実 |
| hsn | 上 | main | ipa | `san˦˥` → `san˨˩` | 確実 |
| hsn | 下 | main | ipa | `ɕia˦˥` → `ɕia˨˩` | 確実 |

### 贛 Gan (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| gan | 行:1 | var[文讀] | surface | `hɛn⁴⁵` → `hen⁴⁵` | 確実 |
| gan | 行:2 | var[白讀] | surface | `hɔŋ⁴⁵` → `hong⁴⁵` | 確実 |
| gan | 人 | var[文讀] | label | `文讀 on nyin⁴⁵ (ɲin); 白讀 on lin⁴⁵ (lin)` → `swap labels: 白讀 on nyin⁴⁵ (ɲin), 文讀 on lin⁴⁵ (lin)` | 蓋然 |

### 晋 Jin (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cjy | 犬 | main | ipa | `tɕʰyɛʔ˨` → `tɕʰye˥˧` | 確実 |
| cjy | 犬 | main | surface | `qhyeh²` → `qhye⁵³` | 蓋然 |

### 呉 Wu (10)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| wuu_hz | 去 | main | ipa | `tɕʰi˨˩˧` → `tɕʰi˥˧` | 蓋然 |
| wuu_hz | 六 | main | ipa | `loʔ˨` → `loʔ˨˩˧` | 蓋然 |
| wuu_hz | 立 | main | ipa | `liɪʔ˨` → `liɪʔ˨˩˧` | 蓋然 |
| wuu_hz | 聞 | main | ipa | `vən˨˩` → `vən˨˩˧` | 蓋然 |
| wuu_hz | 心 | main | ipa | `ɕin˥˨` → `ɕin˧˧` | 蓋然 |
| wuu_jx | 央 | main | ipa | `iɑ̃˦˦` → `iɑ̃˥˧` | 蓋然 |
| wuu_sz | 食 | var[白讀] | label | `—` → `白讀 (eat)` | 蓋然 |
| wuu_sz | 牛 | main | ipa | `ɲʏ˨˨˧` → `ɲiʏ˨˨˧` | 要検討 |
| wuu_wz | 坐 | main | ipa | `zo˨˩˧` → `zo˧˥` | 蓋然 |
| wuu_wz | 坐 | main | surface | `zo²¹³` → `zo³⁵` | 蓋然 |

### 朝鮮 Koreanic (9)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| ko_bus | 火 | main | ipa | `ɸwaː˩˧` → `hwaː˩˧` | 蓋然 |
| ko_bus | 犬 | main | ipa | `kjʌnː˩˧` → `kjʌːn˩˧` | 蓋然 |
| ko_bus | 上 | main | ipa | `saŋː˩˧` → `saːŋ˩˧` | 蓋然 |
| ko_mid | 六 | main | native | `·ᄅᆔᆨ` → `·륙` | 確実 |
| ko_mid | 肉 | main | native | `·ᅀᆔᆨ` → `·ᅀᅲᆨ` | 確実 |
| ko_mid | 水 | main | ipa | `sjwu˩˥` → `sju˩˥` | 確実 |
| ko_mid | 十 | main | surface | `·sipp` → `·ssip` | 確実 |
| ko_mid | 立 | main | surface | `·lipp` → `·lip` | 確実 |
| ko_mid | 地 | main | surface | `·tti` → `·ti` | 確実 |

### 越 Vietic (5)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| vi_c | 目 | main | ipa | `muk̚˨˩ʔ` → `muk˨˩ʔ` | 蓋然 |
| vi_ohan | 月 | main | ipa | `tʂaŋ˧˧ / jaŋ˧˧` → `ʈaŋ˧˧ / jaŋ˧˧` | 要検討 |
| vi_ohan | 牛 | main | ipa | `tʂəw˧˧` → `ʈəw˧˧` | 要検討 |
| vi_s | 中:1 | main | ipa | `tʂuŋ͡m˧˧` → `ʈuŋ͡m˧˧` | 確実 |
| vi_s | 中:2 | main | ipa | `tʂuŋ͡m˧˥` → `ʈuŋ͡m˧˥` | 確実 |

### 日 Japonic (7)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| ja_ojp | 龍 | main | native | `リュウ` → `リウ` | 蓋然 |
| ja_ojp | 龍 | main | surface | `ryuu` → `riu` | 蓋然 |
| ja_ojp | 龍 | main | ipa | `rʲuː` → `riu` | 蓋然 |
| ja_okn | 南 | main | surface | `nan` → `dan` | 確実 |
| ja_okn | 天 | main | native | `チン` → `ティン` | 要検討 |
| ja_thk | 南 | main | surface | `nan` → `dan` | 確実 |
| ja_thk | 行:1 | main | ipa | `ɡʲoː` → `ŋʲoː` | 蓋然 |

### 満 Tungusic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| mnc | 中:2 | main | native | `—` → `ᡤᠣᡳᠪᡠᠮᠪᡳ` | 蓋然 |
| mnc | 行:2 | main | native | `—` → `ᡶᠠᡳᡩᠠᠨ` | 蓋然 |

### 錫伯 Tungusic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| sjo | 行:2 | main | ipa | `—` → `faidan` | 蓋然 |
| sjo | 六 | main | ipa | `niŋɣun` → `niŋɢun` | 蓋然 |

### 白 Bai (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| bca | 中 | var[中:2 (zhòng, 'hit')] | ipa | `ʐoŋ˧˩` → `ʐoŋ˨˩` | 確実 |

### 壮 Tai (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| za | 木 | main | surface | `moed` → `moeg` | 蓋然 |
| za | 七 | main | ipa | `tsʰaːt̚˥` → `tsaːt̚˥` | 要検討 |
| za | 上 | main | ipa | `tsʰeŋ˧˩` → `tseŋ˧˩` | 要検討 |

### 東干 Dungan (10)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| dng | 食 | main | ipa | `sɨ˦` → `ʂɨ˨˦` | 蓋然 |
| dng | 食 | main | native | `сы` → `шыъ` | 蓋然 |
| dng | 走 | main | ipa | `tsou˥˩` → `tsou˨˦` | 確実 |
| dng | 走 | main | surface | `zu³` → `zu²` | 確実 |
| dng | 走 | main | native | `зуь` → `зуъ` | 確実 |
| dng | 耳 | main | ipa | `ɚ˥˩` → `ɚ˨˦` | 確実 |
| dng | 耳 | main | surface | `er³` → `er²` | 確実 |
| dng | 耳 | main | native | `әрь` → `әръ` | 確実 |
| dng | 飲 | main | ipa | `jin˥˩` → `jin˨˦` | 蓋然 |
| dng | 犬 | main | ipa | `tɕʰyɛn˥˩` → `tɕʰyɛn˨˦` | 蓋然 |

### 蔵 Tibetic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| bo_sino | 山 | main | surface | `shan` → `hran` | 確実 |
| bo_sino | 西 | main | native | `ཞི་` → `ཤི་` | 蓋然 |

### 祖語 Proto (7)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| pko | 二 | main | ipa | `*tupɨr` → `*tupɨɾ` | 確実 |
| pko | 七 | main | ipa | `*nirkup` → `*niɾkup` | 確実 |
| pko | 八 | main | ipa | `*jətərp` → `*jətəɾp` | 確実 |
| pko | 十 | main | ipa | `*jer` → `*jeɾ` | 確実 |
| pmgl | 北 | main | surface | `*xoyitu` → `*hoyitu` | 蓋然 |
| pmgl | 北 | main | ipa | `*xojitu` → `*hojitu` | 蓋然 |
| ptai | 火 | main | surface | `*vajˀ.A` → `*vaj.A` | 蓋然 |
