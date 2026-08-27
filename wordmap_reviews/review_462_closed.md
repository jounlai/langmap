# Review 462 — 各ページの実転送量（全体ラリー8／10）

**日付:** 2026-08-27
**切り口:** 読者が**最初の描画までに落とすバイト数**。
HTML が `<script src>` と `<link rel=stylesheet>` で自ら要求するものだけを数える。
`loadTrivia()` や `loadMetaI18n()` や単語スライスが後から取るものは対象外 —
それらは「first paint の前に置かない」ための仕組みそのものであり、
数に入れたらその仕組みが効いているかどうかが見えなくなる。

## 実測（gzip -9）

| ページ | 初回描画までの合計 | 最大の1件 |
|---|---|---|
| **`hanmap.html`** | **1,988.5 KB** | `hanmap_trivia.js` **943.0 KB** |
| `index.html` | 940.7 KB | `data.js` 840.9 KB |
| `wordmap.html` | 597.4 KB | （HTML自身 211.4 KB） |
| `tree.html` | 231.4 KB | `wordmap_data.js` 169.6 KB |
| `namemap.html` | 123.5 KB | `namemap_names_ext.js` 49.8 KB |

`index.html` の 841 KB は 100文 × 223言語の `data.js` で、これは地図の中身そのもの。
perf ハンドオフが「6.2MB → 0.86MB」と記録している圧縮後の値と一致する。

## 発見 — Han Map が初回描画の47%をトリビアに使っている

`hanmap.html:3296`

```html
<script src="hanmap_trivia.js?v=11"></script>
```

**943 KB gz（生 2.5 MB）が、地図が描かれる前に落ちる。**
1,988 KB のうち **47%** がこれ。

### 正解は隣のページに書いてある

`wordmap.html:3222` のコメント:

> Trivia articles are decorative on the map (blink markers) and only read in
> full when the reader opens one. **Fetch after `load` so they never sit in
> front of first paint**; every reader guards with `|| []`.

Word Map は2つのことを同時にやっている:

| | Word Map | Han Map |
|---|---|---|
| 取得時期 | `loadTrivia()` が `load` の後 | **`<script src>` で先読み** |
| UI言語 | `wordmap_trivia.js` は **EN+JA のみ 359 KB**、`wordmap_trivia_<ui>.js` を必要時に | **19UI全部を1ファイルに同梱 2.5 MB** |

つまり Han Map は**遅延化も分割もしていない**。
どちらの手法も、同じリポジトリの隣のファイルに実装済みで、コメント付きで理由まで書いてある。

### 受け皿は既にある

`hanmap.html:3487` に `window.TRIVIA_ARTICLES = window.TRIVIA_ARTICLES || [];`
という防御的スタブがあり、消費側も
`if (!overlay || !articles) return;`、
`if (typeof refreshTriviaBlinks === 'function') refreshTriviaBlinks();`
と全て存在確認してから触る。後から入っても壊れない形になっている。

### それでも今回は入れなかった

`loadTrivia()` を移植するのは実行時の挙動変更で、
**ブラウザで確認せずに入れるとトリビアが静かに動かなくなる**種類の変更になる。
40記事の点滅マーカーと索引の再描画タイミングは、コードを読むだけでは詰めきれない。
見た目の確認ができる場で行うべきなのでハンドオフに送った（手順は上表のとおり）。

## 新設ガード — `tools/page_weight_check.js`

各ページの初回描画バイト数を gzip -9 で実測し、`page_weight.lock.json` と照合する。

- **5%を超えて増えたら violation**（ふだんの編集分は許す）
- 5%以上軽くなったら「lock を切り直せ」と通知する（改善が記録に残る）
- `--update` で lock を再作成

Han Map の 1,988 KB は**今の値として記録**した。これ以上増えないことは保証されるが、
減らすのはハンドオフの仕事。`check_all` の行には常に最重量ページが出る。

検証: lock の `hanmap.html` を半分に書き換える → `grew 1988.5 KB vs 994.2 KB locked (+100.0%)`。
`--update` で戻して0。

`check_all` は **42 → 43** ガード、全て緑。

## まとめ

| 項目 | 結果 |
|---|---|
| 初回描画重量の実測 | 5ページ分を確定 |
| 最大の無駄 | Han Map のトリビア **943 KB**（全体の47%） |
| 修正 | **見送り**（実行時挙動の変更・要ブラウザ確認）→ ハンドオフ |
| 再発防止 | 重量ラチェットを導入 |
