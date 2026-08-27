# Review 464 — 死蔵コード・孤児ファイル・内部リンク（全体ラリー10／10）

**日付:** 2026-08-27
**切り口:** 誰からも参照されないファイル、選べないコード、切れた内部リンク。

## 内部リンク — 切れ0

6ページの `<a href>` から内部リンク75本を取り出し、
実ファイルか有効な SSR ルートかを検査した。

**`NOT FOUND` は0本。** 73本のトリビア記事リンクと3本の索引リンクが、
すべて `/en/trivia/<slug>` などの実在ルートを指している
（既存の `trivia index links freshness` ガードが担当している領域と一致）。

## 発見1 — 公開されているのに誰も知らないページが3枚

web ルートに置かれた `.html` は、リンクの有無に関わらず**公開URL**になる。

| ファイル | 中身 | `noindex` | robots.txt |
|---|---|---|---|
| `changelog.html` ほか5枚 | 内部向け更新履歴 | **あり** | あり（changelog.html） |
| **`poster.html`** | 実際に使える生成ツール。ただし**どこからもリンクされていない**。**git 管理下** | **なし** | なし |
| `_buildertest.html` | 素の試験台。`wordmap_meta.js`（生 **18.7 MB**）を読む | なし | なし |
| `_cardtest.html` | 同上 | なし | なし |

プロジェクトには既に規約がある — 内部ページは
`<meta name="robots" content="noindex, follow">` を持ち、robots.txt でも除外する。
changelog がその形になっている。3枚だけ抜けていた。

### ただし試験台2枚はリポジトリに入っていなかった

`git add` で気づいた。`_buildertest.html` と `_cardtest.html` は
**`.git/info/exclude`**（このクローン限定の除外）に入っており、git 管理下に無い。
git 由来のデプロイなら本番に存在しない。「公開されている」と断定したのは誤りで、
**作業コピーからの deploy をしている場合にのみ問題になる**。

そこで扱いを分けた:

- **`poster.html`（git 管理下・実在の公開URL）** → `noindex` を付けた。
  使えるツールなので robots.txt では塞がない（直接アクセスは妨げない）。
- **試験台2枚** → ローカルにも `noindex` を付け、robots.txt には
  「リポジトリには無い。作業コピー deploy への保険」と明記した2行を足した。
  クローラが到達すれば、テスト用キャンバスを描くために
  **gzip 後 7 MB** の言語メタデータを引くことになるので、2行の保険は安い。

### 新設ガード — `tools/page_indexability_check.js`

**web ルートの `.html` は、sitemap.xml に載っているか noindex かのどちらかでなければならない。**
第三の状態を許さない。両方に該当する場合も violation（どちらかに決めろ）。

検証: `_cardtest.html` の noindex を外す →
`neither in sitemap.xml nor noindex — it is a public, indexable page nothing links to`。戻して0。

`check_all` は **44 → 45** ガード、全て緑。

## 発見2 — 選べないUI言語のスライスが4本

`meta_i18n/` に22ファイルある。UIピッカーが持つのは19言語（うち `en` は本体内蔵）なので18本のはず。
余分な4本は

```
meta_i18n/es_eu.js  es_mx.js  pt_eu.js  pt_br.js    合計 約998 KB
```

`resolveUiLang()` は `UI_I18N[x]` の存在で門前払いし、
**cookie が `es_mx` でも `_` 以降を落として `es` に丸める**（tree.html:413）。
URL の `?ui=` も同じ門を通る。つまりこの4本に到達する経路は無い。

これは既知の積み残し（ハンドオフの `meta_desc` 23UI問題）と同根で、
**記述データが23ロケールを持つのにUIは19しか出さない**ことの副産物。
消すか、ロケールをUIに出すかはオーナーの判断なので触らず記録した。

## 誤検出を3件、自分で潰した

素朴な「名前で参照されているか」検査は 2,485件を孤児と報告したが、
そのほとんどは**動的に組み立てられるパス**だった
（`'meta_i18n/' + ui + '.js'`、`'words/' + id + '.js'`、`'wordmap_trivia_' + lang + '.js'`）。

ルート直下に絞っても3件残り、そのうち2件が誤りだった:

| 出たもの | 実際 |
|---|---|
| `sw.js` が未参照 | `pwa.js:19` が `navigator.serviceWorker.register('/sw.js')` している |
| `manifest.json` が未参照 | 5ページすべてが `<link rel="manifest" href="/manifest.json">` |

どちらも先頭の `/` を私の正規表現が弾いていた。

## 訂正 — review 460 の指摘を取り下げる

460 で「robots.txt が SEO サイトマップを宣言していないのは、
注釈が古い可能性があるのでオーナー判断」と書いた。
robots.txt の注釈を**全文**読むと、そうではなかった:

> SEO big-text pages (sitemap-seo.xml) are intentionally NOT declared here —
> **discovery is left to organic internal-link crawling (footer → /en/wordmap/
> index → hreflang) rather than bulk-submitting 18k URLs.**

18,000 URL を一括送信せず、フッタ→索引→hreflang の自然な巡回に任せる、という
**現行の明示的な戦略**である。判断待ちの項目ではない。ハンドオフを訂正した。

## まとめ

| 項目 | 結果 |
|---|---|
| 内部リンク切れ | **0**（75本検査） |
| 索引可能な野良ページ | git 管理下の1枚（`poster.html`）→ **0**。試験台2枚はローカルのみで、robots.txt に保険 |
| 到達不能なUIスライス | 4本・998 KB を記録（削除はオーナー判断） |
| 真の孤児ファイル | **0** |
| 460 の指摘 | **取り下げ** |
