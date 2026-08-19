# 指示書：LangMap 5マップの OGP 画像＆メタ整備

**宛先:** Codex（コーディングエージェント）
**対象リポジトリ:** langmap（本番 `https://langmap.heuron.com/`）
**ゴール:** 5つのマップ（語順 / 単語 / 漢字 / 名前 / 系統樹）に、**統一感のある OGP 画像（各 1200×630 PNG）** を用意し、各ページの `og:image` / `twitter:image` を **自分の画像**に正しく配線する。SNS・チャット・検索でカードとして映える状態にする。

---

## 0. TL;DR（やること）

1. 5枚の OGP 画像を **1200×630 PNG** で作る（下記ファイル名）。既存3枚も統一デザインで作り直す。
2. `hanmap.html` と `namemap.html` の `og:image` / `twitter:image` が **誤って `ogp-wordmap.png` を指している**ので、各自の画像に修正する。
3. 生成方法は **方式A（HTMLテンプレを headless Chrome で 1200×630 レンダリング）を推奨**。方式B（画像生成AIプロンプト）も併記するのでどちらでも可。
4. 受け入れ基準（§7）を満たすこと。

| ページ | ファイル | og:image ファイル名 | 現状 |
|---|---|---|---|
| 語順マップ | `index.html` | `ogp-index.png` | 存在（要リフレッシュ） |
| 単語マップ | `wordmap.html` | `ogp-wordmap.png` | 存在（要リフレッシュ） |
| 漢字マップ | `hanmap.html` | **`ogp-hanmap.png`** | ❌ 未作成・`ogp-wordmap.png` を誤参照 |
| 名前マップ | `namemap.html` | **`ogp-namemap.png`** | ❌ 未作成・`ogp-wordmap.png` を誤参照 |
| 系統樹 | `tree.html` | `ogp-tree.png` | 存在（要リフレッシュ） |

画像は **リポジトリ直下**（既存 `ogp-*.png` と同じ場所）に置く。URL は `https://langmap.heuron.com/<filename>`。

---

## 1. ブランド／ビジュアル指針（全画像共通）

これが5枚の「家族感」を作る土台。**5枚は必ず同じテンプレート**で作り、テーマ色と中身だけ変える。

- **プロダクト名/ロゴ:** 「LangMap」。ロゴ画像は `langmap.png`（紫の地球儀 🌐 アイコン）。左上か左に必ずロゴ＋「LangMap」を置く。
- **地図の世界観:** Leaflet + CARTO の淡いライトベースマップに、**言語族ごとのパステル配色（紫・青・緑・赤・黄）**で国/地域が塗り分けられている。＝「世界地図に多言語データが載っている」印象。
- **テーマ色（ページごとにアクセントを変える）:**
  - 語順マップ = ティール/青緑 `#0e7490`
  - 単語マップ = アンバー `#b45309`
  - 漢字マップ = 朱/レッド `#c0392b`
  - 名前マップ = パープル `#8e44ad`（NameMap の実アクセント）
  - 系統樹 = グリーン `#2e8b57`
  - 共通の下地アクセント（ロゴ等）はパープル `#8e44ad` 〜 ブルー `#2e6fb8` 系。
- **フォント:** 見出しは太字サンセリフ（Inter / system-ui 相当）。**IPA・各言語表記には Charis SIL / Gentium Plus / Noto 系**（多言語グリフを崩さないため必須）。日本語・ハングル・漢字・アラビア・デーヴァナーガリー等が混在するので **Noto Sans フォールバック**を必ず用意。
- **トーン:** 「学術的だが遊び心がある」。文字は大きく・少なく・可読性最優先（サムネで潰れないこと）。
- **クレジット:** 右下か下部に小さく `langmap.heuron.com`。
- **セーフゾーン:** 1200×630 だが SNS は中央 ~1.91:1 でトリミングされうる。**重要テキスト/ロゴは四辺から 60px 以上内側**に収める。文字の見切れ厳禁。

---

## 2. 推奨レイアウト（テンプレ構造）

全5枚で共通の構図（左：コピー、右：ビジュアル）:

```
┌──────────────────────────────────────────────────────────┐
│  [🌐 LangMap]                                    (accent bar)│
│                                                            │
│   <大見出し：ページ名（日本語＋英語）>                        │
│   <サブ：1行の説明＋数字（例 "1,151 languages")>            │
│                                                            │
│   [ example chips: 実データの短い例を3〜6個 ]                │
│                                                            │
│                         ┌───────────────────────────────┐ │
│                         │  実マップのスクショ（薄く/枠つき）│ │
│                         │  or テーマに合う地図ビジュアル    │ │
│                         └───────────────────────────────┘ │
│                                       langmap.heuron.com   │
└──────────────────────────────────────────────────────────┘
```

- 左 40〜55% にテキスト、右にビジュアル。もしくは「地図を全面・上に半透明のグラデ＋左にコピー」でも良い（統一すればどちらでも）。
- **example chips には実際のデータを使う**（下の各ページ仕様の「例トークン」）。多言語グリフが映えるので効果大。

---

## 3. 各ページ仕様（画像の中身）

数字は最新値。og:title / og:description は既存タグを流用（下に現行値を再掲）。画像内テキストは日本語見出し＋英語サブでOK。

### 3-1. 語順マップ（`ogp-index.png`）— テーマ色 ティール `#0e7490`
- **画像見出し:** 「語順マップ / Word Order Map」
- **サブ:** 「世界の基本語順を一枚に — SOV・SVO・VSO ほか / 242 languages」
- **example chips:** `SOV` `SVO` `VSO` `OSV` … と、色分けの凡例（"日本語=SOV" "English=SVO" "Irish=VSO" 等の対比）
- **背景ビジュアル:** SOV/SVO/VSO が色分けされた世界地図（語順ごとの塗り分けが一目で分かる構図）
- **スクショ元:** `index.html`（デフォルトの世界ビュー。語順の色分けが広く見える引き）

### 3-2. 単語マップ（`ogp-wordmap.png`）— テーマ色 アンバー `#b45309`
- **画像見出し:** 「単語マップ / Word Map」
- **サブ:** 「一つの言葉が、言語ごとにこんなに違う — 発音（IPA）つき / 1,151 languages・35 words」
- **example chips:** `dog` を各言語で: `dog` `Hund` `chien` `perro` `собака` `犬 inɯ` `狗` `köpek`。または看板の「茶」: `tea / 茶 chá / thé / чай / お茶`（cha/te 分裂が話題性◎）
- **背景ビジュアル:** ヨーロッパ〜世界の単語マップ（多言語ラベルが密に載った地図）。可能なら **茶マップ（cha=琥珀 / te=青緑の色分け）** が映える。
- **スクショ元:** `wordmap.html#w=tea`（cha/te の色分け＋凡例が出る）を **ヨーロッパ〜ユーラシア広域**で。代替: `#w=dog` の欧州ビュー。

### 3-3. 漢字マップ（`ogp-hanmap.png`）— テーマ色 朱 `#c0392b` ★新規
- **画像見出し:** 「漢字マップ / Han Map」
- **サブ:** 「一つの漢字が、漢字圏でどう読まれるか — / 61 characters × 119 languages・variants」
- **example chips:** 例えば「山」の各読み: `山 shān`（中）`saan`（粤）`san`（閩）`やま/サン`（日）`산 san`（韓）`sơn`（越）＋復元音 `*srаn`（上古）等
- **背景ビジュアル:** 東アジア〜漢字圏の地図に、大きな漢字（例「山」「龍」「犬」）＋各地の読み。朱色アクセント。
- **スクショ元:** `hanmap.html`（映える字＝山/日/月/龍 あたりを選択した東アジアビュー）

### 3-4. 名前マップ（`ogp-namemap.png`）— テーマ色 パープル `#8e44ad` ★新規
- **画像見出し:** 「名前マップ / Name Map」
- **サブ:** 「一つの名前が、世界でどう姿を変えるか — 由来・意味・系統樹つき」
- **example chips:** John の変異: `John` `Jean` `Juan` `Giovanni` `Johannes` `Иван` `Yaḥyā` `Ιωάννης`
- **背景ビジュアル:** ヨーロッパ中心の地図に John 系の各国表記が散った構図（`namemap.html#n=john` の実ビューが理想）。
- **スクショ元:** `namemap.html#n=john&l=ja&s=110&c=50,10&z=4`（ヨーロッパに変異形が並ぶ）

### 3-5. 系統樹（`ogp-tree.png`）— テーマ色 グリーン `#2e8b57`
- **画像見出し:** 「系統樹 / Language Family Tree」
- **サブ:** 「世界の言語を系統で辿る — 印欧・シナチベット・アフロアジア… / 1,000 languages」
- **example chips:** `Indo-European` `Sino-Tibetan` `Afro-Asiatic` `Austronesian` `Dravidian` `Uralic` `Turkic`
- **背景ビジュアル:** 樹形図（インデント付きツリー）が広がるビジュアル。地図ではなく「枝分かれ」を主役に。
- **スクショ元:** `tree.html`（印欧語族などを展開したツリービュー）

#### 現行 og:title / og:description（画像の文言と齟齬が出ないよう参照）
- index: *"LangMap — Multilingual Word Order Map: 242 Languages (SOV/SVO/VSO)"*
- wordmap: *"LangMap — Word Map: 1,151 Languages with Pronunciation"*
- hanmap: *"HanMap — Han Character Pronunciation Atlas (61 chars × 119 languages)"*
- namemap: *"LangMap — Name Map: One Name Across the World"*
- tree: *"Language Family Tree: 1,000 Languages by Genealogical Classification"*

---

## 4. 方式A（推奨）：HTMLテンプレを headless Chrome で 1200×630 レンダリング

**なぜ推奨:** マップ製品の OGP は「実際の地図＋くっきりした文字」が最も強い。ブランド色・実フォント・実データをそのまま使え、修正も容易。外部の画像APIも不要。

手順（Codex が実装）:
1. `tools/ogp/` に **共通テンプレート** `ogp_template.html`（1200×630, CSS で §2 のレイアウト）を作る。テーマ色・見出し・サブ・chips・背景画像をクエリ or JSON で差し替え可能に。
2. 背景に使う **実マップのスクショ**を、§3 の「スクショ元」URL を headless Chrome で撮影して用意（`--window-size=1400,900 --screenshot`、必要領域にトリミング）。ローカルは `python3 -m http.server` で配信、`http://localhost:PORT/...` を撮る。UI パネル（左の情報カード等）は必要に応じ CSS で隠すか、トリミングで外す。
3. 各ページの設定でテンプレを描画し、`--window-size=1200,630` かつ **`--force-device-scale-factor=2`（＝2400×1260 で撮って 1200×630 に縮小 or そのまま高精細）** でスクショ → `ogp-<page>.png` を出力。
4. **フォント埋め込み必須**：Noto Sans / Noto Sans JP / Noto Sans KR / Noto Sans SC / Noto Serif / Charis SIL 等を `@font-face`（ローカル同梱 or Google Fonts）で読み込み、IPA・CJK・アラビア等が豆腐(□)にならないこと。
5. 生成物を最適化（`pngquant`/`oxipng` 等で 300KB 目安、上限 ~1MB）。

テンプレ最小骨子（Codex はこれを拡張してよい）:
```html
<!doctype html><html><head><meta charset="utf-8">
<style>
  @font-face{ /* Noto Sans JP/KR/SC, Charis SIL 等をローカル同梱 */ }
  html,body{margin:0}
  .card{width:1200px;height:630px;position:relative;overflow:hidden;
        font-family:'Inter','Noto Sans JP','Noto Sans SC','Noto Sans KR',system-ui,sans-serif;
        background:#fff;color:#14213d}
  .accent{position:absolute;inset:0 0 auto 0;height:10px;background:var(--accent)}
  .brand{position:absolute;left:56px;top:44px;display:flex;align-items:center;gap:14px;font-weight:800;font-size:30px}
  .brand img{width:40px;height:40px}
  .h1{position:absolute;left:56px;top:150px;font-size:64px;font-weight:800;line-height:1.05;max-width:620px}
  .h1 small{display:block;font-size:30px;color:var(--accent);font-weight:700;margin-top:6px}
  .sub{position:absolute;left:56px;top:360px;font-size:24px;color:#3b4252;max-width:600px;line-height:1.4}
  .chips{position:absolute;left:56px;top:470px;display:flex;flex-wrap:wrap;gap:10px;max-width:600px}
  .chip{font-size:22px;padding:6px 14px;border-radius:999px;background:var(--tint);color:var(--accentDark);
        font-family:'Charis SIL','Gentium Plus','Noto Serif',serif}
  .viz{position:absolute;right:0;top:0;width:560px;height:630px;object-fit:cover;
       -webkit-mask-image:linear-gradient(90deg,transparent,#000 90px)}
  .url{position:absolute;right:40px;bottom:26px;font-size:18px;color:#8a8f99}
</style></head>
<body>
  <div class="card" style="--accent:#b45309;--accentDark:#7c3a06;--tint:#fbe8d3">
    <div class="accent"></div>
    <img class="viz" src="MAP_SCREENSHOT.png">
    <div class="brand"><img src="langmap.png">LangMap</div>
    <div class="h1">単語マップ<small>Word Map</small></div>
    <div class="sub">一つの言葉が、言語ごとにこんなに違う — 発音つき。<br>1,151 languages · 35 words</div>
    <div class="chips"><span class="chip">dog</span><span class="chip">Hund</span><span class="chip">chien</span><span class="chip">собака</span><span class="chip">犬 inɯ</span><span class="chip">狗</span></div>
    <div class="url">langmap.heuron.com</div>
  </div>
</body></html>
```
→ これを5ページ分、テーマ色・文言・chips・`viz` 画像を差し替えて描画。**Artifact/Design スキルがあるなら、それでテンプレを作り PNG 化してもよい。**

---

## 5. 方式B（代替）：画像生成AI用プロンプト

イラスト寄りにしたい場合。**1200×630（横 1.91:1）指定、テキストは最小限**（画像AIは文字が苦手なので、正確な文言はレンダリングし直すか overlay 前提）。各プロンプトは英語。

- **共通スタイル接尾（全ページに付ける）:**
  `— flat vector editorial illustration, clean modern infographic style, soft pastel world-map motif, subtle grid, off-white background, crisp, high detail, 1200x630, 1.91:1 aspect, generous margins, social share card, no gibberish text, leave the left third clear for a title overlay`

- **語順マップ:** `A stylized world map where countries are tinted in three or four distinct pastel colors representing sentence word-order groups (teal, blue, green, amber), a small clean legend of 'SOV / SVO / VSO', teal accent (#0e7490)` + 共通接尾
- **単語マップ:** `A pastel world map dotted with speech bubbles showing the same idea in many scripts and alphabets, an amber accent (#b45309), a faint IPA vibe, warm and inviting` + 共通接尾
- **漢字マップ:** `An East-Asia-centered pastel map with one large elegant Han character (e.g. 山 or 龍) as a hero motif, radiating thin lines to different regions, vermilion/red accent (#c0392b), calligraphic yet modern` + 共通接尾
- **名前マップ:** `A Europe-centered pastel map with a single given name shown morphing across regions (John → Jean → Juan → Ivan), thin connecting family-tree lines, purple accent (#8e44ad), elegant` + 共通接尾
- **系統樹:** `An elegant branching tree diagram of world language families spreading across an off-white canvas, roots to many leaves, green accent (#2e8b57), botanical-meets-infographic` + 共通接尾

**注意:** 方式B単体だと正確な数字・見出し・ロゴが入らない。**必ず overlay（方式Aのテキストレイヤー）を重ねて最終化**すること。＝「AI背景 → HTML/Canvas で文字とロゴを合成」が現実的。

---

## 6. メタタグ配線（各 HTML を編集）

各ページの `<head>` を確認し、**og:image と twitter:image が自分のファイル**を指すように統一する。特に修正必須:

- `hanmap.html`：`og:image` と `twitter:image` を
  `https://langmap.heuron.com/ogp-wordmap.png` → **`https://langmap.heuron.com/ogp-hanmap.png`**
- `namemap.html`：同上 → **`https://langmap.heuron.com/ogp-namemap.png`**（`twitter:image` タグが無ければ追加）

各ページで最低限そろえる（既存があれば値だけ確認/修正）:
```html
<meta property="og:image" content="https://langmap.heuron.com/ogp-<page>.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="<そのマップの内容を1行で>">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://langmap.heuron.com/ogp-<page>.png">
```
- `og:image` は **絶対URL**（http/https 込み）で。相対パスは不可。
- `og:image:alt` を各ページに追加（アクセシビリティ＆一部クローラ向け）。
- 既存の og:title / og:description は原則そのまま（数字が古ければ最新化: wordmap=1,151 langs・35 words, tree=1,000, hanmap=61×119, index=242）。

---

## 7. 受け入れ基準（チェックリスト）

- [ ] `ogp-index / ogp-wordmap / ogp-hanmap / ogp-namemap / ogp-tree.png` の **5枚**がリポジトリ直下に存在。
- [ ] 各画像は **正確に 1200×630 px**、PNG、~1MB 以下（推奨 300–600KB）。
- [ ] 5枚が **同一テンプレの家族デザイン**で、テーマ色だけ違う。
- [ ] 画像内の **多言語グリフ（IPA・CJK・アラビア・デーヴァナーガリー等）が豆腐(□)化していない**。
- [ ] 重要テキスト/ロゴが四辺 60px 以内に見切れていない（SNSトリミング耐性）。
- [ ] 各 HTML の `og:image` / `twitter:image` が **自分の画像**を指す（hanmap/namemap の誤参照が解消）。
- [ ] すべて絶対URL。`twitter:card=summary_large_image`、`og:image:width/height` あり。
- [ ] 数字が最新（1,151 / 35 / 242 / 61×119 / 1,000）。
- [ ] `og:image:alt` を各ページに追加。
- [ ] ローカルで各ページの `<head>` を検証、崩れなし。

## 8. 反映・キャッシュ注意

- SNS/チャットのクローラは og:image を **キャッシュ**する。既存3枚を差し替えても即時反映されないことがある。
  - Facebook: Sharing Debugger で **Scrape Again**。
  - X(Twitter): Card Validator / 新規URLで確認。
  - Slack/Discord: 少し待つ or クエリ付きURLで確認。
- ファイル名は据え置き（既存URL維持）。どうしても即時更新したい時のみ、`og:image` に `?v=2` を付ける手もある（画像ファイル自体は同名で可）。
- **本番へは通常のデプロイフロー**でこのリポジトリを反映（push はオーナーが実行）。

---

### 参考：各ページの「スクショ元」URL（方式Aで背景に使う。ローカル配信して撮影）
- 語順: `index.html`（デフォルト世界ビュー）
- 単語: `wordmap.html#w=tea&p=45,50,3`（cha/te 色分け＋凡例, ユーラシア広域）／代替 `#w=dog` 欧州
- 漢字: `hanmap.html`（山/龍/日 などを選択した東アジアビュー）
- 名前: `namemap.html#n=john&l=ja&s=110&c=50,10&z=4`
- 系統樹: `tree.html`（印欧語族を展開）

以上。5枚の統一 OGP を作り、メタを自分の画像に配線して完了。
