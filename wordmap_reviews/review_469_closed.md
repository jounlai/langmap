# Review 469 — 同一言語の二重登録（全体ラリー2巡目 4／5）

**日付:** 2026-08-28
**切り口:** 455 のコピー行検査は「2行のデータが同じか」を見た。
こちらは手前の問い —「**そもそも同じ言語が2つのコードで登録されていないか**」。

## 出発点

| 検査 | 結果 |
|---|---|
| 表示名の完全一致 | **0組**（`LANG_DATA.name` ベース） |
| 同一 `iso6393` を持つコード | 30組・122コード（英語の各変種が `eng` を共有する類。正常） |
| 同一 `glottocode` | 1組（`zh_cq`/`zh_cd` = `sich1238`、どちらも四川話。正常） |

`LANG_DATA.name` では何も出ない。しかし**表示に使われるのは `lang_names.js`** であり、
そちらを見ると話が変わった。

## 発見1 — 地図ごとにコード体系が違う

祖語のコードが Word Map と Han Map で食い違っている。一致しているのは `ptai` だけ。

```
Word Map  p_jpn  p_kor  pmng   p_tun   p_aav  p_hmx  p_sit   p_ine   yua
Han  Map  pja    pko    pmgl   ptung   paa    phm    pst
Lang Map                                              ine     myn
```

review 456 で見つけた `ine`/`p_ine`・`myn`/`yua` と同じ構造で、**3つの体系**がある。

代償は `lang_names.js` の重複だけではない。SSR の URL が
`/en/wordmap/p_jpn` と `/en/hanmap/pja` に割れ、
地図をまたぐ機能はこの2つを同一言語と認識できない。

## 発見2 — 35本の名前が食い違っていた

重複していること自体より深刻なのはこちら。**同じ言語が地図によって別の名前で出ていた。**

| UI | Word Map `p_jpn` | Han Map `pja` |
|---|---|---|
| ja | 日琉祖語 | **日本祖語** |
| ko | 일본조어 | **원시 일본어** |
| de | Urjaponisch | **Proto-Japonisch** |
| vi | Tiền Nhật Bản ngữ | **Nhật Bản nguyên thủy** |

`pmng`/`pmgl` が12本、`p_tun`/`ptung` が12本、`p_jpn`/`pja` が11本。

**Word Map 側に揃えた。** 大きい方の地図であり、かつ内容が正確だから —
Japonic は琉球諸語を含むので **日琉**祖語が正しく、日本祖語では狭い。

## 発見3 — 検査を「派生」にしたら想定外が出た

ペアを手書きせず「**英語名が同じコードは同じ言語**」で導出したところ、
9組のつもりが **16組**出た。増えた7組が新しい発見だった。

**(a) 名前から修飾語が抜けていた 2件**

```
es_hn  en="Spanish"  ja="スペイン語"      ← 親の es と同名。実体はホンジュラス
fr_lu  en="French"   ja="フランス語"      ← 親の fr と同名。実体はルクセンブルク
```

`LANG_DATA` 側は "Honduran Spanish" / "Luxembourg French" と正しく、
`lang_names.js` だけが親と区別できない状態だった。
兄弟の書式（`es_ni` = "Spanish (Nicaragua)" / "スペイン語(ニカラグア)"）に合わせ、
**19UI × 2言語 = 38本**を修正。

**(b) さらに2組の地図間コード分裂**

- `en_ang`（Lang Map）と `ang`（Word Map）= 古英語
- `de_gsw`（Lang Map）と `de_ch`（Word Map）= スイス標準ドイツ語

`de_gsw` は Lang Map の roster でも「ドイツ語(スイス)」なので `de_ch` と同一。
スイス・ドイツ語方言の `gsw` とは**別物**なので、そちらとは混同していない。

**(c) どの地図にも無い ISO 別名 3件**

`tah`・`hmo`・`smg` は 19UI 分の名前を持ちながら、
**Word Map にも Han Map にも Lang Map にも存在しない**。
アトラスのコードは `ty`・`ho`・`suk` で、これらは ISO 639-3 側の綴り。
`wordmap_meta.js` には `'hmo'` `'smg'` をキーにした説明ブロックまである。

読者に見えないので害は小さいが、名前が食い違っていた（`ヒリ・モトゥ語` vs `ヒリ・モツ語` 等）。
**削除はしていない** — 同じ作業ツリーを別スレッドが触っており、
`wordmap_meta.js` 側の参照も残っているため。ガードでは注記として出す。

計 **24本**を追加で揃え、合計 **97本**の名前文字列を修正した。

## `lang_names.js` の第3の形式を踏んだ

`tah` の3本だけ置換が当たらなかった。原因はファイル構造で、
`tah` は UI 別テーブルではなく

```js
const ADDED3 = { tah: { en: 'Tahitian', ja: 'タヒチ語', … }, en_nz: { … } }
```

という**コード別**の別ブロックにあった。既知の「3つの形式が混在」の3つ目。
死んだ別名なので追わず、ガードの側で扱うことにした。

### 作業中の事故（自分で検出・修復）

否定テストで `pja` の ja を壊したあと、復旧に使ったアライナーが
`tah` で `process.exit(1)` して途中終了し、`pja` が壊れたまま残った。
`git diff` と guard の再実行で気づき、値を直接指定して復旧。
その後アライナーを**行前提から波括弧の対応付け**に書き直し、
キーの前に境界を要求して `tah` が `ptah` の一部に当たらないようにした。

## 新設ガード — `tools/paired_code_name_check.js`

**ペアを列挙しない。** 英語名が同じコードは同じ言語とみなし、
その全 UI で名前が一致することを要求する。10組目が明日増えても、
このファイルを触らずに検査対象になる。

どの地図にも出ないコード（ISO 別名）は violation ではなく注記。
読者に見えないものを赤にしても意味がないため。

```
14 language(s) carry two codes; all 266 paired names agree
note: 3 pair(s) are an ISO alias against a live code, shown by no map
```

検証: `pja` の ja を `日本祖語` に戻す →
`ja: "proto-japonic" is named p_jpn="日琉祖語" vs pja="日本祖語"`。

`check_all` は **49 → 50** ガード。

## ハンドオフへ

**コード自体の統一は行っていない。** SSR の URL が動くので
`SEO_RENAMED_CODES` による 301 とセットで計画すべき変更であり、
レビュー周の範囲を超える。9言語分の対応表と影響範囲を記録した。
