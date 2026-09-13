# Makoto Gadgets 各位 — `name=` が「俗称」になります（`formal=` を追加）

**発行:** LangMap 側（2026-09-13）
**対象:** `https://makoto-gadgets.com/{ja|en}/goods/langmap?...` のディープリンク

`docs/makoto-goods-link.md` §2「変更しないでほしいもの」には該当しませんが、
**リンクに載る文字列の中身が変わる**ので、事前にお知らせします。
パラメータ名・データURL・ファイル形式・言語コード体系は一切変えていません。

## 1. 何が変わったか

LangMap は言語名を2層で持つようになりました。

| 層 | 例 | 用途 |
|---|---|---|
| 正式名称 | Singapore English / シンガポール英語 | 地図の既定表示。今まで通り |
| 略称（俗称） | Singlish / シングリッシュ | グッズの既定。地図では任意 |

理由は単純で、地図の版面には正式名称が要るが、胸に刷るなら Singlish の方が
良い、という判断です（LangMap オーナーの指示）。

そこで **`name=` / `names=` には略称がある言語では略称を送ります。**
略称を持たない言語（大多数）では、従来どおり正式名称がそのまま入ります。

## 2. 追加したパラメータ

正式名称が失われないよう、併せて送ります。**追加のみで、既存の挙動は不変です。**

| モード | 既存 | 追加 |
|---|---|---|
| 単一言語 | `name=Singlish` | `formal=Singapore English` |
| 比較 | `names=["Singlish", …]` | `formals=["Singapore English", …]` |

`formals` は `names` と同じ順序・同じ要素数です。

```
…/ja/goods/langmap?src=langmap&map=wordmap&lang=en_sg
  &name=Singlish
  &formal=Singapore%20English
  &native=Singlish
  &ui=ja
  &words=https%3A%2F%2Flangmap.heuron.com%2Flang_words%2Fen_sg.js
```

## 3. お願い

- **何もしなくても動きます。** `name=` を今まで通り使えば、刷られる文字列が
  俗称に変わるだけです。これが LangMap 側の意図した既定です。
- 商品ページの説明文など「正式な言語名」を出したい箇所があれば、`formal=` を
  使ってください。無い場合は `name=` と同じ値が入ります。
- 逆に **常に正式名称で刷りたい**ということであれば連絡してください。既定を
  どちらにするかは LangMap 側で切り替えられます。

## 4. 略称の作り方（参考）

勝手な短縮はしません。ルールは `lang_nicknames.js` の冒頭に書いてあり、
`tools/lang_nickname_check.js` がビルドを止めます。

1. 実在する呼び名であること。略すために発明した語は入れない
2. UI言語ごとに、その言語が実際に使う形だけ。英語の俗称をロシア語に混ぜない
3. 1,187ピンの中で一意であること。他言語の正式名称と衝突させない
4. 括弧を使わない
5. 蔑称は入れない。話者が自称に使うかどうかで判断する
6. 出典を `docs/lang-nickname-sources.md` に必ず書く

そのため略称は疎（まばら）です。**無い言語の方が多い**とお考えください。
