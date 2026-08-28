# Review 470 — ガード被覆の棚卸し（全体ラリー2巡目 5／5）

**日付:** 2026-08-28
**切り口:** 50個のガードが**何を見ていないか**。データではなく、
データを守る仕組みの側を対象にする。

## 第1の問い — 誰も言及していないフィールドはあるか

`LANG_DATA` と `meta` に実在する43フィールドを列挙し、
`tools/` 配下の全ツールと `validate_wordmap_data.js` の本文に現れるかを調べた。

**結果: 0。** `wordsNote`（1行）や `lastSpeaker`（1行）まで、
どれかのツールが名前を出している。

これは良い知らせではなく、**問いが弱かった**。「言及」は「検証」ではない。

## 第2の問い — 参照は生きているか

値ではなく**関係**を見る。

| 検査 | 対象 | 結果 |
|---|---|---|
| `parentCode` が存在しないコードを指す | 133行 | **0** |
| `baseLang` が存在しないコードを指す | 54行 | **0** |
| 同じ別名を2言語が主張 | 171別名 | **0** |

列挙型10フィールドも整っていた。`vitality` 6値、`codeType` 5値、
`surfaceType` 3値…。綴り違いも野良の値も無い。

## 第3の問い — フィールド同士は噛み合っているか

ここが穴だった。`codeType` `languageKind` `dataStatus` `varietyRole`
`period` `coverage` は**同じ言語を別の角度から記述**しており、
1つずつ見れば全部妥当なのに互いに矛盾しうる。

10個の不変条件を書いて当てた。**8個は全行で成立**していた。

```
ok  languageKind=reconstructed-proto  →  dataStatus=reconstructed      21行
ok  dataStatus=reconstructed          →  languageKind=reconstructed-proto  21行
ok  codeType=historical-stage         →  period あり                    31行
ok  varietyRole=historical-stage      →  period あり                    27行
ok  languageKind=historical-attested  →  period あり                    80行
ok  codeType=pedagogical-stage        →  languageKind=pedagogical-stage 21行
ok  coverage=base-copy-with-notes     →  baseLang あり                  11行
ok  parentCode / baseLang             →  実在するコード                138行
```

**データは健全だった。問題は、この整合が「規律」で保たれていて
「機構」で保たれていないことだった。** それが今回の成果物になる。

## 危うく壊すところだった1件

不成立だった2個のうち、片方は**私の不変条件のほうが間違っていた**。

「`varietyRole` があるなら `parentCode` か `baseLang` があるはず」——
65行中30行が破っていた。うち27行は `historical-stage` で、
**27行すべてが親を持たない**＝それが慣行。残る3行が
`ja_oki`（沖縄語）`ja_mvi`（宮古語）`ja_rys`（八重山語）で、
他の `sibling-language` 9行（`rmy`→`rom`、`smj`/`sms`→`se`、`crk`→`cr`…）は
全部親を持つ。「3行だけ抜けている」ように見えた。

`parentCode: 'ja'` を入れようとして、編集が当たらず原因を追ったところ、
`wordmap_meta.js` の `VARIETY_REL` テーブルにこう書いてあった:

> Sensitive cases (Ryukyuan, Jeju, Isan) use varietyRole
> **to avoid forcing a misleading parent.**

琉球諸語は日本語の**方言ではなく姉妹言語**であり、`parentCode: 'ja'` は
その逆を主張してしまう。**意図的に空にしてある**。
データから自明に見えた規則が、出典付きの判断を上書きするところだった。
編集が失敗して調べたのが幸運だった。

もう1つの不成立（`vitality=extinct` なら period か絶滅年）は、
`mnc` `lbz` `nny` のように**近年絶滅した言語**には period が無く、
`extinctionDate`/`lastSpeaker` を持つ行が全体で2行しかないので、
要求できる状態にない。どちらもガードには入れず、理由をソースに書いた。

## 新設ガード — `tools/meta_invariant_check.js`

成立した8条件＋別名の一意性を機械化した。
**今日壊れているから作ったのではなく、壊れるのを止めるものが無かったから作った。**

不成立の2つは「不変条件ではない」ことと**その理由**をファイル冒頭に明記した。
次に同じ発見をした人が琉球諸語に親を付けないように。

検証: `ko_yb` の `parentCode` を存在しないコードに書き換える →
`ko_yb: parentCode and baseLang must name a code that exists`。

`check_all` は **50 → 51** ガード。

## 2巡目5周の総括

| 周 | 対象 | 修正 | 新設ガード |
|---|---|---|---|
| 466 | 座標 | `countries` 4行 | pin inside a declared country |
| 467 | `meta.sources` | Glottolog 誤リンク3件＋URL 1件 | citations point at the row |
| 468 | 文字体系の宣言 | `script` 4行＋字体30セル | script declared matches data |
| 469 | 二重登録 | 名前 97本 | paired codes name alike |
| 470 | ガード被覆 | （なし） | meta fields agree |

1巡目（455–464）が「**ガードが2つの地図しか知らなかった**」という
被覆の問題を掘り当てたのに対し、2巡目は
「**フィールド同士の関係を誰も見ていなかった**」に着地した。
座標と国、引用とコード、宣言と実データ、コードと名前——
いずれも単体では正しく、**突き合わせて初めて食い違いが出る**組み合わせだった。

自分の probe のバグを4件潰した（点内包の海岸線、Ethnologue の表記ゆれ、
サロゲート領域を飲む文字クラス、行前提のアライナー）。
うちサロゲートの件は記憶に残した。
