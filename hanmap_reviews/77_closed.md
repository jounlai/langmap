# Hanmap data review #77 — 新規8変種の検証（派生データの誤り摘出）

> 直前に追加した8変種（青田Wu・惠陽客家・老湘語・雷州・閩中・績溪徽・大同晋・邵將）は最近縁変種からの**派生（暫定）**。Min/OtherSinitic/Hakka/Wu の専門家が兄弟変種・既知音韻と照合し、誤りを摘出。

## 結果
| | 数 |
|---|---|
| reviewers / verifiers | 4語族 + 16検証 |
| findings → 検証 | 20 |
| 確実 8 → **適用 8セル（9フィールド）** | |
| 蓋然 4 / 要検討 6 | 保留 |
| 却下 | 2 |

## 適用（新変種の派生エラー修正）
- **声調レジスター誤り**：msj 見 ˧˩→**˥**（陰去を上聲調値で生成していた）、nan_lei 六文讀 ˥→**˨˨**（陽入を陰入で）、mnz 立 ˥→**˦˨**（陽入）
- **surface↔IPA整合**：mnz 目 surface mu→**muʔ**（main＋文讀、IPA の ʔ コーダに合わせる）、wuu_qt 貓 IPA mɔ→**mau**（surface mau に合わせる）、nan_lei 三文讀 IPA tʰam→**tam**
- **声調**：hak_hy 坐 chhó/˧˩→**chhô/˧˧**

## 保留・見送り
- 見送り：hsn_sf 一 surface に声調digit追加（変種の他60字は声調digit無しで不整合になるため）
- 蓋然：msj 月 ˨→˥、hsn_sf 人 ɲin（鼻音声母）、hak_hy 坐 IPA（適用済）
- 要検討：wuu_qt の surface 表記（声調digit有無）、hak_hy 十 韻母 sip/sɨp 等の流儀

全9決定論ガード PASS。新変種は派生のため引き続き話者検証が望ましい。
