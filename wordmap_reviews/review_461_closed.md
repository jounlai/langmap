# Review 461 — アクセシビリティ（全体ラリー7／10）

**日付:** 2026-08-27
**切り口:** 6ページ（index・wordmap・hanmap・namemap・tree・poster）の
静的な支援技術対応。alt・アクセシブル名・見出し・`lang`。

## 発見1 — 4ページが `<html lang="en">` を固定していた

これが最大のもので、しかも**正解はプロジェクト内に既にあった**。

| 出力 | `<html lang>` | `dir` |
|---|---|---|
| SSR (`seo/lib.php`) | `/ja/wordmap/och` → **`lang="ja"`**、`/ar/wordmap/` → **`lang="ar" dir="rtl"`** | ✓ |
| `namemap.html` | `document.documentElement.lang = uiLang` を実施済み | — |
| **`index.html`** | **`en` 固定** | — |
| **`wordmap.html`** | **`en` 固定** | — |
| **`hanmap.html`** | **`en` 固定** | — |
| **`tree.html`** | **`en` 固定** | `dir='rtl'` は実施済み |

スクリーンリーダーは `<html lang>` で音声と読み上げ規則を選ぶ。
日本語のUIを英語の規則で読ませると、内容は伝わらない。
19UIのうち18言語の読者が、対話ページ4枚すべてでこれに当たっていた。

`applyUILang()` / `applyI18n()` の先頭で設定するようにした。UI切替時に再実行されるので追従する。
値は BCP-47 に正規化する（`es_mx` → `es-MX`）。`namemap.html` の既存行も同じ正規化に揃えた。

### `dir="rtl"` は入れなかった

SSR と tree.html はアラビア語・ヘブライ語で `dir="rtl"` にする。
残る4ページは入れていない。地図UI全体を鏡像反転させる変更で、CSS が対応しているか
目視確認なしには判断できない。加えて `index.html` には

> ※ アラビア文字・ヘブライ文字は比較のため左→右で表示しています

という**意図的な**注記があり、文データの提示方針と衝突しうる。ハンドオフに送った。

## 発見2 — サイト唯一の「名前の無い操作子」

全ページの `<input>` `<select>` `<textarea>` を、`aria-label` /
`aria-labelledby` / `<label for>` / `<label>` 内包のいずれかで名前が付くか調べた。

名前が無いのは **`index.html` の `csvLangSelect` 1つだけ**だった。
CSV保存ボタンとCSVボタンの間に置かれた242言語のドロップダウンで、
何を選ぶものか支援技術には伝わらない。

`csvLang` キーを **19UI分**追加し、`initCSVLangSelect()` で `aria-label` を設定した
（この関数は `applyUILang()` から呼ばれるのでUI言語に追従する）。

## 発見3 — 装飾SVGが42個、無標だった

インライン `<svg>` に `aria-hidden` も `aria-label` も `role` も無いと、
一部のスクリーンリーダーが「グラフィック」と読み上げて雑音になる。
`<body>` 内の42個に `aria-hidden="true"` を付けた（`<head>` は対象外）。

安全性の確認: ボタンが SVG **だけ**を中身に持ち、かつ名前を持たない例は0件だった
（唯一の「無名ボタン」4件は `role="radio"` の `era-modern` 等で、
JS が `textContent` を入れる。SVG は関係ない）。表示は1ピクセルも変わらない。

## 誤検出を3件、自分で潰した

| 出たもの | 実際 |
|---|---|
| `hanmap.html` に alt の無い `<img>` | **JSコメントの中の文字列**（`the just-fetched tile <img>s`） |
| `index.html` の `rtlToggle` が無ラベル | `<label class="rtl-switch">` に**内包**されている。`for=` しか見ていなかった |
| `poster.html` の `word-select` が無ラベル | `<label>Word: <select…></label>` と内包。同上 |
| wordmap/hanmap の「無名ボタン」4件 | `role="radio"` で、`applyUILang()` が `textContent` を入れる |

## 直さなかったもの

- **`tree.html` と `poster.html` に見出しが1つも無い**（h1〜h6 が0個）。
  視覚的に隠した `<h1>` を足すのが定石だが、`poster.html` は印刷用の別物で、
  `tree.html` は全画面の樹形図。どこに何と入れるかは見た目の判断を含むのでハンドオフへ。
- **`wordmap.html` / `hanmap.html` の見出しが `h1 → h3` と飛ぶ**（各1箇所）。
  `h3` を `h2` にすると既存CSSの見た目が変わる可能性がある。同じくハンドオフへ。

## まとめ

| 項目 | 結果 |
|---|---|
| `<html lang>` がUI言語に追従しない | 4ページ → **0** |
| 名前の無い操作子 | 1 → **0**（i18n 19文字列を追加） |
| 無標の装飾SVG | 42 → **0** |
| alt の無い画像 | **0**（唯一の指摘は誤検出） |
| `dir="rtl"`・見出し | ハンドオフへ（見た目の判断を含む） |
