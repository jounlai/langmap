# Review 459 — 全ページの i18n 網羅（全体ラリー5／10）

**日付:** 2026-08-27
**切り口:** 5つのページ（index・wordmap・hanmap・namemap・tree）の UI 文字列テーブルに
抜けが無いか。そして翻訳の**配送経路**が壊れていないか。

## UI 文字列テーブル — ほぼ完全

| テーブル | UI | キー | 欠落 |
|---|---|---|---|
| `UI_STRINGS`（Lang Map） | 19 | 43 | **0** |
| `I18N_STRINGS`（Word Map） | 19 | 49 | 1（後述） |
| `COMPARE_I18N`（Word Map） | 19 | 7 | **0** |
| `I18N_STRINGS`（Han Map） | 19 | 50 | 1（同じ） |
| `COMPARE_I18N`（Han Map） | 19 | 8 | **0** |
| `HAN_GROUPS_I18N` | 19 | 25 | **0** |
| `UI_I18N`（Tree） | 19 | 13 | **0** |
| `TREE_ROOT_I18N` | 19 | 2 | **0** |

唯一出た `triviaExpand` は `{ en: '⤢' }` — **記号1文字**で、ソースにも
`// icon-only; full phrase in triviaExpandTitle` と書いてある。設計どおり。

`FAMILY_NAMES_I18N`（ja/ko/zh のみ、241/129/45件）も欠陥ではない。
`familyDisplayName()` は4段フォールバックで、この表は**上書き層**であり、
本体は全UI共通の `translateMetaSmart()` が担う。

## 測定 — 系統名が英語のまま残る数

とはいえ実際に何件が英語で出るかは測る価値がある。系統樹のノード651件に対し:

```
id 422   sw 416   de 404   it 375   es 374   pt 374   fr 373   vi 331
th 164   hi 164   he 162   ar 160   uk 155   ru 154   yue 152   zh 150
ko 111   ja  37
```

大半は `Gan — 宜浏片` のような中国方言片名で、これは漢字のまま出るのが妥当。
**翻訳率のギャップ自体は段階的整備の途中**（`translateMetaSmart` の注釈も
「~17 UI langs をカバー」と書いている）なので、この周では埋めない。ハンドオフに記録。

## 発見1 — 3言語が自分の語族から追放されていた

測定の副産物として、**系統樹のノード名になってはいけない文字列**が出た。
`meta.family` を `parseFamilyPath()` が `Stock (sub, sub)` として割るのだが、
それが読めない記法を使っている行が6つあった。

### 偽の根を作っていた3件

| コード | `meta.family` | 結果 |
|---|---|---|
| `ess` 中央シベリア・ユピック | `Eskimo-Aleut (Yupik branch — sister to Central Alaskan Yupʼik **(esu)** and Aleut)` | **括弧が入れ子**で正規表現が不一致 → 文字列全体が1つの根に |
| `fud` 東フトゥナ語 | `Austronesian › Malayo-Polynesian › Oceanic › Central Pacific › Polynesian › Nuclear Polynesian` | `›` は区切りとして認識されない → 全体が1つの根に |
| `wrh` ウィラジュリ語 | `Pama-Nyungan › Central New South Wales (Wiradhuric)` | 同上 |

つまり地図には

```
Eskimo-Aleut (5言語)   と   Eskimo-Aleut (Yupik branch — sister to …) (1言語)
Austronesian (102言語)  と   Austronesian › Malayo-Polynesian › … (1言語)
Pama-Nyungan (15言語)   と   Pama-Nyungan › Central New South Wales (1言語)
```

が**並んで**表示されていた。トップレベルの根は97個あり、そのうち3個が偽物だった。

### 節を1つに潰していた3件

`wbl` `gsw_w` `lij_t` は根は正しいが、括弧の中で `→` を使っているため
5段の階層が**1つのラベル**になっていた
（`Germanic → West → Upper German → Alemannic → Höchstalemannisch` が1ノード）。

### 直し方は兄弟行が決めた

推測ではなく、**同じ語族の隣の行が使っている形**に合わせた:

| コード | 直後 | 根拠となった兄弟 |
|---|---|---|
| `ess` | `Eskimo-Aleut (Yupik, Central Siberian)` | `esu` = `Eskimo-Aleut (Yupik)` |
| `fud` | `Austronesian (Polynesian, Nuclear Polynesian)` | `sm` `to` `mi` `haw` = `Austronesian (Polynesian)`、`tvl` = `(Polynesian, Ellicean)` |
| `wrh` | `Pama-Nyungan (Central New South Wales, Wiradhuric)` | `wbp` = `Pama-Nyungan (Ngumpin-Yapa)` |
| `wbl` | `Indo-European (Iranian, Eastern Iranian, Southeastern, Pamir)` | 矢印をカンマに |
| `gsw_w` | `Indo-European (Germanic, West, High German, Alemannic, Höchstalemannisch)` | `gsw` = `…(Germanic, West, High German, Alemannic)` |
| `lij_t` | `Indo-European (Romance, Italo-Western, Gallo-Italic, Ligurian, Tabarchino)` | `pms` = `…(Romance, Italo-Western, Gallo-Italic)` |

`ess` の「sister to esu and Aleut」という註は消えたが、**それは系統樹が構造で示すこと**であり、
文字列に散文で書いたことがそもそも樹を壊した原因だった。

トップレベルの根は **97 → 94**、Austronesian は 102 → 103 言語になった。

`family_string_check.js` を拡張:
- 矢印（`>` `›` `→` `»`）が**文字列のどこにあっても** violation
- **入れ子の括弧**も violation

検証: `ess` を `Eskimo-Aleut (Yupik (CSY))` に戻す → 検出。戻して0。

## 発見2 — 翻訳スライスの版数が2ページで凍っていた

`meta_i18n/<ui>.js` と `meta_i18n_engine.js` は3ページが遅延ロードする。

| ページ | 読み方 |
|---|---|
| `wordmap.html` | `assetUrl('meta_i18n/'+ui+'.js', 'metaI18nUi')` — **レジストリ経由** |
| `tree.html` | `'meta_i18n/'+ui+'.js?v=1'` — **直書き** |
| `hanmap.html` | `'meta_i18n/'+ui+'.js?v=1'` — **直書き** |

だからスライスを再生成すると、**Word Map の読者だけが新しい翻訳を受け取り、
Tree と Han Map の読者はキャッシュの古いものを持ち続ける**。
`page_asset_version_check.js` は `<script src>` タグしか見ないので、文字列リテラルは不可視。
`slice_version.lock.json` にも `meta_i18n` の項目が無かった。

`assetUrl()` に置き換えようとしたが**やめた**。`hanmap.html` は
`wordmap.html` とは別の自前 `WM_ASSET_VERSION` を持ち、
`metaI18nEngine`/`metaI18nUi` のキーが無いので `?v=undefined` になる。
版数プラミングを3ページ分いじる変更は、この周の範囲を超える。

代わりに **`slice_version_check.js` に3本目の腕**を足した。
`meta_i18n/` 全ファイル＋エンジンをハッシュし、リテラルの `?v=` と照合する
（`namemap_i18n/` と `countries.geojson` と同じ方式）。
tree と hanmap の数字が互いに食い違った場合も violation。

**今は緑**（ハッシュも版数も一致）。スライスが変わって版数が据え置かれた瞬間に赤くなる。

検証: `meta_i18n/ja.js` に1行足す → `meta_i18n/ changed but both pages still ask for ?v=1`。戻して0。

## まとめ

| 項目 | 結果 |
|---|---|
| UI 文字列の欠落 | **0**（唯一の指摘はアイコン1文字で設計どおり） |
| 偽の系統樹の根 | 3 → **0** |
| 潰れた階層 | 3 → **0** |
| 翻訳スライスの版数追跡 | 無 → **ハッシュで追跡** |
| 系統名の翻訳率 | 測定してハンドオフへ（この周では埋めない） |
