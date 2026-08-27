# Review 460 — SSR/SEO の生成面（全体ラリー6／10）

**日付:** 2026-08-27
**切り口:** サーバサイドで生成される23,161ページ。title・canonical・hreflang・
sitemap・リダイレクト。データではなく**配信**の正しさを見る。

## ページ本体 — 抜き取り59件すべて健全

サイトマップから無作為抽出（wordmap 30・hanmap 15・trivia 10・ハブ 4）:

| 検査 | 結果 |
|---|---|
| HTTP ステータス | **59/59 が 200** |
| `<title>` | 欠落 **0**、**重複 0** |
| `<link rel="canonical">` | 欠落 0、**要求パスと不一致 0** |
| `<meta name="description">` | 欠落 **0** |
| `rel="alternate"` | **全ページ20本**（19UI＋x-default） |
| `<meta name="robots">` | 全ページ `index,follow` |

## リダイレクト — 意図どおり

| URL | 結果 |
|---|---|
| `/ja/wordmap/ddn` | 301 → `/ja/wordmap/dds` |
| `/ja/wordmap/p_kra` | 301 → `/ja/wordmap/ptai` |
| `/ja/hanmap/pko` `pst` `paa` `phm` | **200**（Han Map の生きたコード。WordMap 側の改名に巻き込まれていない） |
| `/ja/wordmap/nosuchcode` | 404 |
| `/wordmap/och` | 301 → `/en/wordmap/och` |

改名リダイレクトを「各地図の検索が失敗した後に」効かせる修正（今会話で実施）が保たれている。

## サイトマップの構造 — 完全

`/sitemap-seo.xml` は 23,161 URL。

- **重複 `<loc>` : 0**
- **全 `<url>` に hreflang 20本**（19UI＋x-default）、例外なし
- UI 接頭辞は19種すべて
- 内訳: wordmap 19,494 / hanmap 2,299 / trivia 1,349 / ハブ 19

wordmap の 19,494 ÷ 19 = **1,026言語**。アトラスは1,164なので138行が除外されている
（`sitemap.php` の注釈どおり noindex 指定の変種を落としている）。
hanmap の 2,299 ÷ 19 = 121 = 120言語＋索引。数が合う。

## 発見 — サイトマップが上限の94.9%

```
bytes : 49,761,107 / 52,428,800   (94.9%)
URLs  :     23,161 / 50,000       (46.3%)
```

**先に効くのは容量**で、URL数ではない。理由は1 URL あたり **約2,148バイト**という重さ:
`<loc>` は60バイト程度なのに、hreflang の代替リンクを20本抱えているため。

上限を超えたサイトマップは**超過分が切られるのではなく、ファイル全体が拒否される**。
つまり23,161ページが一斉に宣言を失う。

残り容量 2.67 MB ÷ (2,148バイト × 19UI) ＝ **あと約65言語**。
前回のセッションだけで13言語追加している。

### 直さなかった — 直し方は sitemap index

正しい修正は `/sitemap-seo.xml` を索引にして
`-wordmap.xml` `-hanmap.xml` `-trivia.xml` を並べること。
だがこれは外向きの URL 構成の変更で、レビュー周の範囲を超える。ハンドオフに記録。

### 新設ガード — `tools/sitemap_size_check.js`

`php seo/sitemap.php` を実行して**実バイト数と実URL数を測る**（推定しない）。
上限内なら violation ではなく **headroom として残量を毎回表示**する
（455 の debt と同じ方式）。超えたら赤。
1 URL あたりのバイト数もファイル自身から測るので、
hreflang の本数が変われば残り言語数の見積もりも自動で追従する。

php が無い環境では「測定せず」と明示して緑（開発依存で木を折らない）。

`check_all` は **41 → 42** ガード、全て緑。

## オーナー判断が要る1点 — サイトマップを宣言するかどうか

`robots.txt` は `sitemap.xml`（静的7URL）だけを宣言し、
23,161ページを載せた `/sitemap-seo.xml` は宣言していない。ファイルにはこう書いてある:

> SEO big-text pages (sitemap-seo.xml) are intentionally NOT declared here —
> at /sitemap-seo.xml if ever needed.

「intentionally」とある以上これは意図的な判断であり、
検索エンジンに23,161ページの索引付けを促すのは外向きの行為なので、**こちらでは変えない**。
ただしこの注釈は SSR ページが公開される前に書かれた可能性があり、
現在は `/ja/wordmap/och` などが実際に稼働している。**今も意図どおりか確認をお願いしたい。**

## まとめ

| 項目 | 結果 |
|---|---|
| ページの title/canonical/description/hreflang | **欠陥0** |
| リダイレクトとルーティング | **意図どおり** |
| サイトマップの構造 | **欠陥0** |
| サイトマップの容量 | **94.9%** — ガードで可視化、修正方針を記録 |
| robots.txt の宣言 | オーナー判断へ差し戻し |
