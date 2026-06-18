# Hanmap data review #71 — 全方向ラリー（新観点） + オーナー方針決定

> 既存の #67〜#70 と決定論ガード（tools/*_check.js）は「セル単位の音韻」を尽くした。
> #71 は**今まで監査していない高次・意味・通時の観点**に絞った（11レビュワー + 8開発者）。

## ラリー結果
| 指標 | 数 |
|---|---|
| レビュワー | 11（意味整合・ローマ字体系・再構フレーム・Sino-Xenic層位・地域類型・非漢語語彙）|
| findings → dedup | 32 → 31 |
| 承認 | 28（確実16 / 蓋然11 / 要検討1）|

## 適用

### クリーンな確定（7件・コミット 3341b5a）
- `人 cdo/cpx` 白讀 → **訓讀（儂）**（native 儂 nè̤ng/náng は nan と同じ訓讀。系統間の意味整合）
- `行:2 ja_kun` okonau **削除**（=行う「行う/do」は 行:1 の語義。「行/列」の 行:2 に和訓は無い）
- `犬 pja` *inu→**\*enu**、`火 pja` *pəy→**\*poy**、`馬 ptung` *morin→**\*murin**（祖語再構）
- `六 za` roeg→**roek** /ɣok̚˥/（鳥 za「roeg=bird」と byte 同一だった。six=roek で弁別）

### オーナー方針決定で適用（コミット <this>）
- **閩南語 → Tâi-lô 統一**（POJ宣言の8変種: nan/nan_id/nan_my/nan_pn/nan_qz/nan_sg/nan_xm/nan_zz）。
  決定論翻字（chh→tsh, ch→ts, o͘→oo, oa→ua, oe→ue, ⁿ→nn、声調記号は NFD で保持）で
  **surface 223セルを変換、IPAは不変**（発音同一・綴りのみ）。メタの romanization 名も Tâi-lô に更新。
  除外: nan_hai(海南拼音)・nan_pera(Peranakan独自)・nan_te/nan_th(潮州Peng'im)。
- **zh_jh → 南京で統一**。reading_type/description 全19言語が南京なので、誤って合肥から引かれた
  speakers/speakersSource を南京（約940万人・南京话）に修正。romanization=南京音 は維持。

### 保留（要追加判断）
- `cnp 三/心/南/飲` の -m 韻尾（source は cnp が -m 保持と示すが、surface も coordinated に
  直す必要があり綴り判断が要る）。
- `vi_ohan 頭` の早期漢越音セル（層位ミスマッチ、除去/置換は要オーナー判断）。

全決定論ガード PASS（`node tools/check_all.js`）。
