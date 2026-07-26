# Wordmap review #426 — 新規追加した再構祖語の再構形レビューラリー

## 目的

直近で追加した **16 の再構祖語**（`languageKind:'reconstructed-proto'`）の
データを敵対的に監査した。検証対象:

- 各語の**再構形**（標準的な比較再構と一致するか。特定分枝の反射形が
  祖語形として誤って入っていないか）
- **年代 (period) / 故地 (countries) / 語族 (family) / 分類 (languageKind,
  dataStatus)**
- 英語 description の事実誤り

対象コード:
`paus, psem, pura, pdr, pban, pst, pafa, pkar, pmay, puaz`（初期10）＋
`paa, pkd, phm, ptrk, pmng, ptg`（アジア系6）。
意図的な `—`（未再構セル）は監査対象外（誤りではない）。

## ラリー

1. **家族圏別レビュー**（6 グループ並列）: SE-Asian / Sino-Tibetan+Dravidian /
   Semitic+Afroasiatic+Kartvelian / Ural-Altaic / Bantu / Americas。
   各エージェントが `words/*.js` の再構セルと `wordmap_meta.js` の meta を
   grep し、家族ごとの標準文献（Blust ACD, Shorto/Sidwell, Pittayaporn,
   Ratliff, Matisoff/STEDT, DEDR, Kogan/Huehnergard, Ehret/Militarev,
   Klimov/Fähnrich, Clauson/EDAL, Janhunen/Nugteren, Benzing/Tsintsius,
   BLR3, Kaufman&Norman, Stubbs/Langacker）と照合。
2. **敵対的 verify パス**: 各指摘を独立エージェントが懐疑的に再検証
   （既定 real=false、確信がある場合のみ確定）。

## 結果

- 候補指摘: **5 件** → 敵対的検証で **5 件すべて確認・適用**（誤検出 0）。
- いずれも「祖語形ではなく特定の娘分枝の反射形が入っていた／音素の誤り」型。

### 適用した修正（5セル）

| コード | 語 | 修正前 | 修正後 | 根拠 |
|---|---|---|---|---|
| pkar | eye | `*tʼol-` | `*tʼwal-` | `*tʼol-` は Zan（ミングレル/ラズ）反射。祖語は -w- を保持（Georgian tʼval-）。Klimov 1998 / Fähnrich 2007 |
| ptrk | eye | `*göz` | `*köz` | g- はオグズ系の語頭有声化。古テュルク・非オグズ諸語は無声 k-（köz）。Clauson EDPT / EDAL |
| pban | two | `*-bìdì` | `*-bɪ̀dɪ̀` | 祖語7母音体系の第2度母音 *ɪ が正。第1度 *i は音素的誤り。BLR3 / Meeussen 1967 |
| pmay | drink | `*ʔuchʼ` | `*ʔukʼ` | uchʼ はチョラン・ツェルタル系の口蓋化反射。汎マヤは *ʔukʼ。Kaufman&Norman 1984 / Kaufman 2003 |
| pmay | name | `*kʼaabʼaʔ` | `*bʼih` | kʼaabʼaʔ は低地マヤ（ユカテカ・チョラン）の新形。最広の反射集合は *bʼih。Kaufman 2003 (PMED) |

いずれも各セルの `[form, ipa]` 双方を更新。

## 所見

- テュルク/モンゴル/ツングース、ドラヴィダ、セム等は再構が概ね妥当と確認。
- 誤りは「祖語形と娘分枝の反射形の取り違え」に集中しており、体系的な
  音素表記（例: バントゥ7母音、テュルク語頭子音）に照らすと検出可能な型。
- Hmong-Mien 等の希薄な祖語は、そもそも `—` を多く残しており誤検出なし。
