# Sinosphere コーナー — 記事追加ガイドライン

`https://langmaps.com/sinosphere/` は、Facebook グループ
[SINOSPHERE 漢字文化圈](https://www.facebook.com/groups/763870134421875/) に投稿した英語記事を
サイト上で読めるようにした独立コーナーです。地図アプリ（Word Map / Han Map …）とは別系統で、
**19言語展開はしません（英語のみ）**。各記事の最後に、関連する地図へのリンクを1本置きます。

人間でもエージェントでも、記事を追加・修正するときはこのファイルを最初から最後まで読んでください。

---

## 1. ファイル構成

```
sinosphere/
  GUIDE.md                         ← このファイル
  sinosphere.css                   ← 手書き（唯一の CSS）
  posts/<YYYY-MM-DD>_<slug>/       ← ★ソース（ここだけを編集する）
      post.md                      ←   本文 + front matter
      image1.jpg, image2.jpg …     ←   画像（長辺 1600px 以下の JPEG）
  index.html                       ← 生成物：記事一覧
  <slug>.html                      ← 生成物：記事ページ
  thumbs/<slug>.jpg                ← 生成物：一覧用サムネイル（幅 640px）
  feed.xml                         ← 生成物：RSS
sitemap.xml の <!-- sinosphere:start … end --> ブロック ← 生成物
tools/build_sinosphere.py          ← import / build / check
```

**生成物は手で編集しない。** `post.md` を直して `build` し直す。

URL は `https://langmaps.com/sinosphere/<slug>.html`。slug は公開後に変えない
（変えると FB や外部からのリンクが切れる）。

---

## 2. 記事を追加する手順

1. **FB から書き出す。** これまでと同じ形式（日付フォルダ + `post.md` + `imageN.jpg`、
   ルートに `index.md` の一覧表）で書き出す。

2. **取り込む。**
   ```bash
   python3 tools/build_sinosphere.py import /mnt/c/Users/jounl/Downloads/sinosphere_posts/sinosphere_posts
   ```
   - `index.md` の FB URL で照合し、**未登録の投稿だけ**を `sinosphere/posts/` に追加する。
   - 画像は長辺 1600px・JPEG 品質 84 に縮小される。
   - 新規記事は `draft: true` 付きで入る。ドラフトは公開されず、check でも警告扱い。

3. **整える（§3 の形式に直す）。** 少なくとも次をやる:
   - front matter を全部埋める（slug を読める英語に直し、フォルダ名も `<日付>_<slug>` に合わせて rename）。
   - 本文先頭の `# タイトル`、リード箇条書き、`👇Here is the longer story.`、末尾の地図 CTA
     （`🗺️ Explore …` と URL 行）を本文から消す。これらは front matter に移す。
   - FB 書き出しの崩れ（§3.4）を直す。
   - `<!-- ORIGINAL FACEBOOK TEXT … -->` の行と `draft: true` を消す。

4. **ビルドとチェック。**
   ```bash
   python3 tools/build_sinosphere.py build
   python3 tools/build_sinosphere.py check     # "sinosphere problems: 0" で合格
   ```
   `check` はリンク先の存在も確認する（Word Map の `words/<id>.js`、Han Map の `HAN_LIST`、
   記事 id）。`node tools/check_all.js` にも組み込まれている。

5. **目視。** `python3 -m http.server 8080` → `http://localhost:8080/sinosphere/` で
   一覧と新記事をスマホ幅でも確認する。

6. **コミット。** `sinosphere/` 一式と `sitemap.xml` をまとめてコミットする。

### サイト版から FB 用テキストを作る

```bash
python3 tools/build_sinosphere.py fb <slug>        # 画面に出力
python3 tools/build_sinosphere.py fb <slug> > /mnt/c/Users/jounl/Downloads/<slug>_fb.md
```

- FB 投稿の形に戻す: `# タイトル` → 要約3行 → `👇Here is the longer story.` → 本文 → `🗺️` 地図リンク。
- **出典欄は出力しない**（サイト版にだけ残す）。
- 画像は出力しない。本文中の画像の位置に `[image2.jpg]` の目印が入るので、FB で画像を添付する。
- 例ブロック `>` の行末には改行用の `\` が付く（これまでの FB 原稿と同じ形）。
- 先に FB に投稿した場合は、投稿 URL を front matter の `fb:` に入れて build し直す。

---

## 3. 記事の形式

### 3.1 front matter

```yaml
---
title: "Three Lakes, One Name: 西湖"         # 記事タイトル（FB の # 行）
slug: three-lakes-one-name-xihu               # 英小文字-ハイフン。漢字はピンインなどに置き換える
date: 2026-11-16                              # FB 初出日。フォルダ名の先頭と一致させる
revised: 2026-11-23                           # サイト用に大きく書き直した日（任意）
fb: https://www.facebook.com/groups/763870134421875/posts/2423175851824620/
tags: [place-names, characters, mandarin, vietnamese, japanese]
hero: image1.jpg                              # 一覧サムネと OGP に使う
hero_alt: "Map of East Asia marking the three West Lakes in Hangzhou, Hanoi and Fujikawaguchiko"
lead:                                         # ちょうど3本。記事冒頭の要約ボックスになる
  - China, Vietnam and Japan all have a lake called 西湖.
  - The same two characters are read Xīhú, Tây Hồ and Saiko.
  - Behind the one name lie three different histories, and one legend that may be modern.
map_label: '"西" across the Sinosphere'        # 地図カードの見出し
map_url: https://langmaps.com/hanmap.html#w=西  # 必ず https://langmaps.com/ で始める
series: "I Know the Characters. But Not That Meaning."   # 連載のみ
part: 1                                                  # 連載のみ
description: "..."        # 任意。省略時は lead の1本目が meta description になる
sources:                  # 任意だが推奨。辞書・論文・公式資料など
  - "Sun Mu, *Jilin Leishi* 鷄林類事 (c. 1103)"
---
```

- **map_url の書き方**: Word Map は `wordmap.html#w=<word id>`（`?w=` は不可。id は `words/` のファイル名）、
  Han Map は `hanmap.html#w=<漢字>`（`HAN_LIST` にある字のみ）、記事なら `#trivia=<id>`。
  `check` が存在を確認する。収録されていない字（例: 峠）のときは、関連する収録字か記事にリンクする。
- 旧ドメイン `langmap.heuron.com` は使わない。
- **YAML の引用**: `: `（コロン＋空白）や `#` を含む値は必ず `"…"` で囲む。囲まないと lead の1行が
  辞書として読まれる（check がエラーにする）。
- `sources:` には書誌のほか素の URL も書ける（自動でリンクになる）。他人の画像を使ったときのクレジットもここ。

### 3.2 タグ（この一覧から選ぶ。2〜6個）

| 種類 | タグ |
|---|---|
| テーマ | `characters`（字形・字の成り立ち） `pronunciation`（字音・読み） `sound-change` `vocabulary`（語の意味・用法） `loanwords` `numbers` `place-names` `names`（人名） `writing`（表記体系・入力・正書法） `grammar` `history` `culture` |
| 言語 | `mandarin` `cantonese` `min` `hakka` `wu` `japanese` `korean` `vietnamese` `beyond-asia`（漢字文化圏の外の言語＝ヒンディー語・タイ語・欧州語などが記事の主役の回。1節だけ出てくる程度なら付けない） |

新しいタグが本当に必要なら、この表に足してから使う。

### 3.3 本文の構成（2026-11 以降の FB 形式が基準）

```markdown
## 最初の節：核心の比較を見せる
（同じ字・同じ語が各言語でどうなるかを、例ブロックで並べる）

## 2〜4個の展開の節
（なぜそうなったか。歴史・音変化・文化。1節に1つの論点）

## 締めの節
（最初の比較に戻ってまとめる）

**最後の1行は太字の一文で締める。**
```

- `##` 節は **3つ以上**、本文は **英語 350語以上**（目安 600〜1200語）。どちらも check が見る。
  4節以上あると目次が自動で付く。
- `#`（H1）は本文に書かない。タイトルは front matter。
- 段落内の単純改行はそのまま改行になる（FB の「1行1文」のリズムを残せる）。空行で段落を分ける。
- 段落全体が `**…**` の1行は「決め台詞」として少し大きく表示される。乱用しない（1節に1つまで）。
  記事の最後は原則この太字1行で締めるが、作者が太字の後に問いかけや一文を置いている場合はその順を尊重してよい。

### 3.4 書式の約束

| 用途 | 書き方 | 例 |
|---|---|---|
| 漢字・ハングル・かなの語形 | **太字** | `**西湖**` |
| 読み・ローマ字・訳語でない外国語 | *斜体* | `*Xīhú*`, `*sopung*` |
| ラテン文字の外国語の語形（越・仏・西など） | *斜体* | `*mantekilya*`, `*Hồ Tây*` |
| 再構形のアステリスク | `\*` でエスケープ | `*\*mit*` → *\*mit*（斜体の中の * ） |
| 1語の言語間比較 | 例ブロック `>` | 下記 |
| 3言語×3項目以上の比較 | 表 `| … |` | |
| 追加画像 | `![代替テキスト](image2.jpg "キャプション")` | 単独行に置く |

例ブロック（中の空 `>` 行で段落を分ける）:

```markdown
> **四** (*shi*) = four
> **死** (*shi*) = death
>
> Exactly the same pronunciation.
```

**FB 書き出しの崩れ（必ず直す）**

- `> ` だけの行の後に空行があり、引用にしたかった内容が外に出ている → 内容を `>` ブロックに入れる。
- 先頭の `# タイトル`、リード箇条書き、`👇Here is the longer story.`、末尾の `🗺️ Explore …` /
  `***"西" in Asia***` / URL 単独行 → 本文から削除（front matter に移す）。
- `[https://…](https://…)` の生 URL リンク、旧ドメイン → 削除または `langmaps.com` に。
- 曲がった二重引用符 `“ ”` → まっすぐな `"`（アポストロフィ `’` はそのままでよい）。

### 3.5 言語ごとの表記

- 漢字語は **字 (*読み*)** の順。言語ラベルは文頭に: `Cantonese: **一** (*jat1*)`。
- 中国語: 標準中国語はピンイン（声調記号つき）、広東語は Jyutping（数字声調）、閩南語は POJ / 台羅、
  客家語は Pha̍k-fa-sṳ など、記事の中で1つの方式に揃える。簡体/繁体が違う字は `**爱人（愛人）**`。
- 日本語: ヘボン式。長音は macron（*jū*, *Saiko*）。
- 韓国語: 改訂ローマ字（*sopung*, *naeil*）。ハングルを先に、漢字を括弧で: `**내일 (來日)**`。
  用言の見出し形は辞書形（-다）。
- ベトナム語: 声調記号つきの正書法（*Tây Hồ*）。漢字表記は Hán tự として括弧に。
- 歴史音（中古音・上古音）は拠った再構の名前を書く（Baxter–Sagart など）。`*` を付ける。
- 日本語・韓国語の方言、古語、琉球語は特に慎重に（出典なしで書かない）。

---

## 4. 内容のルール

LangMap 本体の記事ガイド（`docs/trivia-writing-guide.md`）の「三つの鉄則」はここでも鉄則です。

1. **捏造しない。** 語形・読み・年号・人名・数字はすべて出典で確かめられるものだけ。
   Han Map / Word Map のデータ（`hanmap_data.js`, `words/*.js`）と食い違う語形を書くときは、
   どちらが正しいかを確かめ、地図側が誤りならそちらも直す（または報告する）。
2. **引用符は逐語引用だけ。** 実在の人物名と並べた `"…"` は、その人が実際に書いた・言った言葉に限る。
3. **書き直しで事実を落とさない。** 文を削っても、そこにあった年・数字・語形・固有名は残す。

加えて、このコーナー固有のこと:

- **「内容が薄い」初期投稿の拡充**: 地図のスクリーンショット1枚＋1行、のような投稿は、
  その画像が示している事実（地図データで確認できるもの）を本文で説明し、§3.3 の形に広げる。
  拡充した記事には `revised:` を付ける。
- **伝承・俗説・異説**は、そうと分かるように書く（"According to a traditional explanation…"）。
  確かでないことは「何が・どの程度」確かでないかを具体的に書く（ぼかした hedge は不可）。
- **声**: FB 投稿の語り口（短い段落、問いかけ、最後の一行）は残してよい。ただし誇張語
  （remarkable, extraordinary, the most …）は事実で裏付けられる時だけ。
- 外部記事・SNS 投稿を下敷きにしたときは `sources:` に挙げる。

---

## 5. 公開前チェックリスト

- [ ] `python3 tools/build_sinosphere.py check` が `sinosphere problems: 0`
- [ ] front matter: slug・フォルダ名・date・fb URL・tags（§3.2の語彙）・hero_alt・lead 3本
- [ ] map_url を実際に開いて、記事の話題が地図に出ることを確認した
- [ ] 本文の語形・読みを、地図データか辞書で照合した（特に日本語・韓国語・ベトナム語の読み）
- [ ] `"…"` で囲んだ人名つきの文は逐語引用である
- [ ] 一覧ページ・記事ページをスマホ幅（375px）で見た
- [ ] `sinosphere/` と `sitemap.xml` をコミットした
