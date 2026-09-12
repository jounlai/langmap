# Makoto Gadgets 連携 — LangMap側の実装指示

**宛先:** LangMap 開発担当
**発行:** Makoto Gadgets 側（2026-09-09）
**対象ブランチ:** `feat/tshirt-handoff`

`docs/custom_goods_handoff.md`（v1.0）を実装に合わせて更新した内容です。
**食い違う箇所はこちらを正とします。**

---

## 0. 何が変わったか（3行）

- 全言語まとめた `data/wordmap_seo.json` は**使いません**。すでにある
  **`lang_words/<code>.js` のURLをリンクに載せてください**。
- フォント情報は**渡さないでください**。Makoto側がLangMapと同じフォントを使います。
- ドメイン・ロケール判定は**実コードが正しい**ので変更不要です（設計書の文章だけ誤記）。

LangMap側の作業は **§1 のパラメータ1個の追加だけ**です。

---

## 1. やること: `words` パラメータを追加

`wordmap.html` の `renderLangInfo()` 内、CTAリンクを組み立てている箇所
（`u.searchParams.set('ui', uiLang);` の直後）に1行足してください。

```js
u.searchParams.set('words', 'https://langmap.heuron.com/lang_words/' + code + '.js');
```

これで完成形は次のとおりです。

```
https://makoto-gadgets.com/ja/goods/langmap
  ?src=langmap
  &map=wordmap
  &lang=ja
  &name=Japanese
  &native=日本語
  &ui=ja
  &words=https%3A%2F%2Flangmap.heuron.com%2Flang_words%2Fja.js
```

### なぜURLを渡すのか

Makoto側は「どの言語のデータがどこにあるか」だけを受け取り、
**選ばれた言語の分（約2KB）をその場で取りに行きます**。
26MBの全言語JSONを持たないので、LangMapのデータ更新がそのまま反映されます。

### SEOページ版にも同じものを

今後の言語別SEOページにも同じリンクを置きます。
URL生成を関数に切り出し、モーダルとSEOページの両方から呼ぶ形にしてください。

---

## 2. 変更しないでほしいもの（Makotoが依存します）

| 項目 | 現在の値 | 備考 |
|---|---|---|
| データURLの形 | `https://langmap.heuron.com/lang_words/<code>.js` | Makotoはこの**接頭辞を検証**します。別ホスト・別パスに移す場合は事前連絡が必要 |
| ファイルの中身 | `window.__wmLangWordsAdd("<code>",{ "<concept>": ["表記","IPA"], ... })` | Makotoはサーバー側で第2引数を取り出してJSONとして読みます |
| 公開設定 | 認証なしで200を返すこと | CORSヘッダは**不要**（Makotoはサーバー側から取得） |
| 言語コード | `ja` `ja_osa` `es_cr` など | `lang` と `words` のコードは必ず一致させる |

**形式を変える場合は必ず事前に連絡してください。** 黙って変えると
Makoto側の商品ページが白紙になります。

> 任意（あると堅い）: 同じ内容を `lang_words/<code>.json` にも出力してもらえると、
> JS関数呼び出しの解析が不要になり、より壊れにくくなります。急ぎではありません。

---

## 3. フォント: 何も渡さないでください

Makoto側は **LangMapとまったく同じフォント**で描画します。
`wordmap.html` のフォントスタックをそのまま複製して使います。

```
"Gentium Plus", "Noto Serif", "Noto Serif JP", "Noto Serif SC", "Noto Serif TC",
"Noto Serif KR", "Noto Serif Devanagari", "Noto Serif Bengali", ...
"Noto Naskh Arabic", "Noto Sans Syriac", "Noto Sans Canadian Aboriginal", ...
Georgia, "Times New Roman", serif
```

加えて、ローカルサブセット（`fonts/` の35本 — Brahmic Subset / Historic Script
Subset / Nom Serif Subset / Tifinagh Subset / Noto Serif KR Old Jamo /
Noto Serif Khitan Small Script / Charis SIL）も同じものを使います。

**お願い:**

- フォントスタックや `fonts/` の中身を変えたときは連絡してください。
  Makoto側の見た目がLangMapとずれ、印刷版下にも影響します。
- 逆に、リンクに `font` / `fontUrl` のようなパラメータを足す必要はありません。

---

## 4. 変更不要（すでに正しいもの）

実コードを確認済みです。以下は**直さないでください**。

| 項目 | 実装 | 判定 |
|---|---|---|
| 送り先ドメイン | `https://makoto-gadgets.com/...` | ✅ 正しい |
| ロケール判定 | UIが `ja` 系のときだけ `ja`、それ以外は `en` | ✅ 指示どおり |
| `src` / `map` / `lang` / `name` / `native` / `ui` | 設定済み | ✅ そのまま |
| ラベルの19言語対応 | 実装済み | ✅ そのまま |
| 胸マークSVG | `assets/tshirt/langmap-chest-mark.svg` | ✅ Makotoが取り込みます |

なお `docs/custom_goods_handoff.md` の本文には
**`makoto-gadget.com`（複数形のsが無い）という誤記**が数か所あります。
実コードは正しいので動作に影響はありませんが、文章は直しておいてください。

---

## 5. 破棄になった内容（custom_goods_handoff.md から削除してよい箇所）

| 該当 | 理由 |
|---|---|
| §I-2「`data/wordmap_seo.json` を Makoto が取得」 | 26MBを毎回パースするとサーバーのメモリが持たない。言語別ファイルに変更 |
| §I-2「CORS を有効化 or 中継APIを採用」の宿題 | **不要になりました**。Makotoがサーバー側から取るのでCORSは関係なし |
| §II-4「`/api/goods/langmap/words` にJSON全体を中継」 | 同上 |
| §8 チェックリストの「`wordmap_seo.json` の CORS 有効化 or 中継API採用の決定」 | 同上。§1 の1行追加に置き換え |

---

## 6. チェックリスト（LangMap側）

- [ ] `u.searchParams.set('words', ...)` を1行追加（§1）
- [ ] リンクを実際に踏んで、`words` が正しい言語コードで入ることを確認
- [ ] `lang_words/<code>.js` が全1,187言語で200を返すことを確認
- [ ] `docs/custom_goods_handoff.md` のドメイン誤記を修正（§4）
- [ ] 同ドキュメントの破棄部分を削除・追記（§5）
- [ ] （今後）SEOページ版でURL生成関数を共通化

---

## 7. 連絡が必要になるとき

次の変更をするときは、**先にMakoto側へ連絡してください**。

1. `lang_words/` のパス・ファイル形式・ホスト名を変える
2. フォントスタック、または `fonts/` のサブセットを差し替える
3. 言語コードの体系を変える（`_` 区切りのバリアントなど）
4. `concept` のID（`water` `fire` …）を増減・改名する
