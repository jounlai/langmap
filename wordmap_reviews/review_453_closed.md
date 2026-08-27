# Review 453 — 生成物パイプラインとガード自体（ラリー4／5）

**日付:** 2026-08-27
**切り口:** データではなくコード側。**「生成器の出力を誰が見張っているか」**を全数確認する。

## 方法

`tools/build_*.js` と `tools/generate_*.js` を列挙し、`check_all.js` が各々を
参照しているかを機械的に照合した。

| 生成器 | ガード |
|---|---|
| build_lang_names.js | あり |
| build_lang_words.js | あり |
| build_namemap_i18n.js | あり（昨日追加） |
| build_trivia_index_links.js | あり |
| build_word_labels.js | あり |
| generate_lang_codes_md.mjs | あり |
| **build_meta_split.js** | **なし** |
| build_countries_geojson.js | なし（外部取得なので鮮度ガードは馴染まない） |
| build_historic_font_subsets.js | なし（バイナリ、稀に再生成） |

## 穴 A — 最大の生成物にガードが無かった

`build_meta_split.js` は **`wordmap_meta_lite.js` ＋ `meta_desc/`（11 MB、1,164ファイル）
＋ `meta_i18n/`（5.8 MB、22ファイル）＋ `meta_i18n_engine.js`** を生成する。
リポジトリ最大の生成物である。

**実証した:**

1. 源（`wordmap_meta.js`）を編集して再生成しないと、`check_all` は4本落ちる — ただし
   それは `LANG_CODES.md` や SEOエクスポートなど**別の下流**が反応しただけで、
   ページが実際に読む `wordmap_meta_lite.js` は**古い値を返し続けた**
2. **生成物側だけを書き換える**と、反応したのは `asset cache-version` 1本のみ。
   これは内容ハッシュ対版数のロックであり、**日常的に `--update` される**。
   つまり `--update` を挟めばドリフトは黙って通る
3. `meta_desc/dds.js` を1つ消しても、誰も気づかない

`--check` を実装した（書き込みを差し替えて全出力を比較する方式なので、
1回の実行で1,187ファイル全部を見る）。上記3経路すべてで `stale: 1` を返すことを確認。
`check_all` に配線。

## 穴 B — `countries.geojson` の版数を誰も追っていない

1.95 MB の国境レイヤーは `fetch('countries.geojson?v=1')` で読まれる。
`<script src>` ではないので `page_asset_version_check.js` の対象外であり、
どのロックにも入っていなかった。生成器のコメント自身が
**「再生成したら wordmap.html の `?v=` を上げよ」**と手動同期を求めている。

上げ忘れれば、既存の訪問者は**古い国境を永久にキャッシュする**。
昨日 `__langNamesVersion` で塞いだのと同じ形の穴なので、同じ道具に第3のアームとして
内容ハッシュ照合を足した。

## ついでに直したもの

`slice_version_check.js --update` が namemap アームで `process.exit(0)` していたため、
**geojson アームがロックに記録される前にプロセスが終わっていた**。
両アームを回してから終了するようにした。

## 結果

- 新設ガード1本（meta split freshness）、既存ガードに1アーム追加
- ガードは計 **37本**、全て green
- 3経路（源の編集・生成物の直接編集・ファイル欠落）と2アーム（geojson・namemap）の
  発火を実測で確認
