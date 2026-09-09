# カスタムグッズ・ハンドオフ設計書 / 制作指示書

**バージョン:** 1.0（2026-09-09）
**対象:** Makoto Gadgets（`makoto-gadgets.com` / ローカルは `../japan-to-go`）開発担当・グッズ制作会社
**発端:** LangMap（WordMap）→ 「特定言語の単語でTシャツを作る」サービス

このドキュメントは 2 層構成です。

- **第 I 部｜汎用ハンドオフ契約** … LangMap 以外の将来のグッズ元（HanMap、NameMap、系統樹、外部サイト等）でも使い回せる、送り出し側 → Makoto の共通プロトコル。
- **第 II 部｜LangMap × Tシャツ 実装指示** … 第 I 部を LangMap Tシャツに具体化したもの。Makoto 特設ページ、プレビュー、印刷仕様、注文フロー。

「ある程度共通の設計にしたい」という要望に対し、**送り出し側は薄いディープリンク 1 本だけ**を実装し、**重い処理（データ取得・デザイン・プレビュー・決済）はすべて Makoto 側**に寄せる方針です。送り出し側は商品を知らなくてよく、Makoto は元データの中身を知らなくてよい（公開 JSON 契約だけを知る）——という疎結合にしています。

---

## 全体像

```
 送り出し側（例: LangMap wordmap.html — 静的サイト）
   │  言語モーダル / SEO ページの「👕 〇〇語のTシャツを作る」ボタン
   │
   │  ① ディープリンク（GET / クエリだけ、本文なし）
   │     https://makoto-gadgets.com/{locale}/goods/langmap
   │        ?src=langmap&map=wordmap&lang=ja&name=日本語&native=日本語&ui=ja
   ▼
 Makoto Gadgets（Next.js 14 / 特設ページ /[locale]/goods/langmap）
   │  ② 元サイトの公開データ契約を fetch（言語別の単語リスト）
   │     https://<langmap-origin>/data/wordmap_seo.json  →  langs[lang].words
   │
   │  ③ 単語選択 UI（リストから選ぶ / ランダム5「うまい感じ」）
   │  ④ プレビュー（背面=単語グリッド、前面=胸マーク）
   │  ⑤ 既存の design / cart / Stripe フローで商品化・注文
   ▼
 グッズ制作会社（印刷データ = 背面グリッド SVG/PDF + 前面胸マーク SVG）
```

送り出し側の実装は **① のリンク 1 本**のみ。②〜⑤ は Makoto 側に集約。

---

# 第 I 部｜汎用ハンドオフ契約

## 1. ディープリンク URL 仕様

```
https://makoto-gadgets.com/{locale}/goods/{product}?{params}
```

| 位置 | 名前 | 説明 | 例 |
|---|---|---|---|
| path | `{locale}` | Makoto のロケール（`ja` / `en`）。送り出し側 UI 言語から決める。 | `ja` |
| path | `{product}` | グッズ企画のスラッグ。企画ごとに Makoto が特設ページを持つ。 | `langmap` |
| query | `src` | **必須。** 送り出しアプリ識別子。Makoto がデータ取得先・レイアウトを分岐する鍵。 | `langmap` |
| query | `map` | 任意。src 内のサブ種別。 | `wordmap` / `hanmap` / `namemap` |
| query | `ui` | 任意。送り出し側 UI 言語（フル。`ja` / `en` / `zh_tw` 等）。プレビュー既定言語などに利用。 | `ja` |
| query | `v` | 任意。契約バージョン。省略時は `1`。 | `1` |
| query | 企画固有 | `product` ごとに追加（後述の LangMap は `lang` / `name` / `native`）。 | `lang=ja` |

### 契約ルール

- **GET・クエリのみ。本文（POST body）は使わない。** 静的サイトからただの `<a href>` で飛べること。
- **クエリはヒント。信頼はしない。** Makoto 側で必ず検証する（後述 §2 の allowlist）。`name` / `native` は表示の初期値に使うだけで、正は Makoto が公開 JSON から取り直す。
- **識別子（`src` / `lang` / concept キー）だけが結合点。** 人間可読の表示名はいつでも Makoto 側の取得データで上書きされうる。
- **未知の `src` / `product` は 404 相当**（or 汎用エラーページ）。勝手に別 URL を fetch しない（SSRF 防止）。

## 2. データ契約（Makoto が取得する側）

各 `src` は「公開 JSON の場所」と「言語→アイテム配列の形」を Makoto に約束する。Makoto 側は `src` ごとに固定の取得先を持つ（クエリで fetch 先 URL を渡さない＝SSRF 防止）。

```ts
// Makoto: src ごとの取得先を allowlist で固定
const GOODS_SOURCES = {
  langmap: {
    dataUrl: 'https://<langmap-origin>/data/wordmap_seo.json',
    // langs[code].words = { concept: [form, ipa] }
  },
  // 将来: hanmap / namemap / ... を追加
} as const;
```

- 取得先オリジンは Makoto のコードに固定。クエリの `src` はこのテーブルのキー参照のみ。
- **CORS:** 送り出し側 JSON は `Access-Control-Allow-Origin`（`makoto-gadgets.com`、または `*`）を返す必要がある。難しければ Makoto の API ルートでサーバー側 fetch → 中継（キャッシュ付き）。**推奨は後者**（後述 §II-4）。JSON は数百 KB〜級なのでサーバーキャッシュ必須。

## 3. 送り出し側の実装（薄い層）

送り出し側は「ボタンを置いてリンクを組み立てる」だけ。LangMap での実装済みコードは第 II 部 §1 を参照。将来の元サイトも同じ 20 行程度で済む。

## 4. Makoto 側の共通土台（product 横断）

- ルート: `/[locale]/goods/[product]/page.tsx`（`product` ごとに 1 特設ページ）。
- 共通コンポーネント: `<GoodsHandoff src map ui>` … クエリ検証 → 対応データ取得 → 企画別の選択 UI に橋渡し。
- 既存資産に接続: `/[locale]/design` のプレビュー合成（FramePreview + html-to-image）、`useDesignStore` / `useCartStore`、Stripe/PayPal。**新規決済は作らない。** 特設ページは「デザイン確定 → 既存カート line item を生成」までを担い、以降は現行フローに合流。

---

# 第 II 部｜LangMap × Tシャツ 実装指示

## 0. 完成イメージ

- ユーザーは LangMap の言語モーダル（または将来の SEO ページ）で「👕 日本語のTシャツを作る」を押す。
- Makoto 特設ページで、その言語に存在する単語リストから **選ぶ**か、**ランダム5**（うまい感じ）で決める。
- 確定 → プレビュー：
  - **背面**＝選んだ単語がその数だけ並ぶグリッド（大きく主役）。
  - **前面**＝胸に小さく「世界言語マップ / LangMap」マーク（`assets/tshirt/langmap-chest-mark.svg`）。
- そのまま商品としてオーダー。

## 1. LangMap 側（実装済み・このワークツリー）

`wordmap.html` の言語詳細モーダル `renderLangInfo(code)` に、「比較に追加」ボタンの直後、CTA ボタンを追加済み。

- ボタン: `<a class="tshirt-cta-btn" target="_blank" rel="noopener">👕 {言語名}のTシャツを作る</a>`
- ラベルは 19 UI 言語対応（`{lang}` に表示名を差し込み）。
- リンク組み立て（`URL`/`searchParams` で安全にエンコード）:
  ```
  https://makoto-gadgets.com/{ja|en}/goods/langmap
     ?src=langmap&map=wordmap&lang={code}&name={displayName}&native={native}&ui={uiLang}
  ```
  ロケールは UI が `ja` 系なら `ja`、他は `en`。
- CSS クラス `.tshirt-cta-btn`（オレンジのグッズ色。比較ボタンと視覚的に区別）。

> **SEO ページ版（今後）:** 言語別 SEO ページ（`docs/` の big-text pages 企画）にも同じリンクを置くだけ。ボタン文言・URL 生成ロジックは上と共通化しておくと良い。現状の静的モーダルとは別テンプレートなので、生成関数を 1 つ切り出して両方から呼ぶ想定。

## 2. データ契約（LangMap の具体形）

`data/wordmap_seo.json`（このリポジトリが公開・生成）:

```jsonc
{
  "langs": {
    "ja": {
      "code": "ja", "name": "Japanese", "native": "日本語",
      "words": {                 // ← Makoto はここだけ使う
        "water": ["水", "mizɯ"],
        "fire":  ["火", "hi"],
        "moon":  ["月", "tsɯki"]
        // concept: [form, ipa]
      }
    }
  }
}
```

- 言語コードは 1187 件。1 言語あたり単語は概ね 30〜67 個（`ja` は 67）。
- concept キーは英語スラッグ（`water`/`fire`/…）。表示は `form`（現地表記）を使う。`ipa` は補助（背面に小さく併記するか選択可、既定オフ）。
- `words` が空 or 極少（< 1）の言語は特設ページで「この言語はまだ単語が足りません」を出す（ボタン自体は出るが、Makoto 側でガード）。

## 3. Makoto 特設ページ `/[locale]/goods/langmap`

### 3.1 受信・検証

```ts
// クエリ
const src = 'langmap';                    // GOODS_SOURCES のキーに一致必須
const lang = qs.lang;                     // langs[] に存在必須。無ければエラー面
const uiHint = qs.ui, nameHint = qs.name; // 表示初期値のみ（正はデータから）
```

- `lang` が JSON の `langs` に無ければ、言語ピッカー（全 1187 の検索付きリスト）にフォールバック。
- `name`/`native` はデータの `langs[lang].name/native` で上書き（クエリは初期チラ見せ用）。

### 3.2 単語選択 UI

`langs[lang].words` を `[{concept, form, ipa}]` に整形して提示。

1. **リストから選ぶ:** チェックボックス/チップ。1〜N 個（上限は §5 のレイアウト上限、既定 **最大 12**、最小 1）。
2. **ランダム5（うまい感じ）:** ボタン一発で 5 個を自動選択。アルゴリズムは §6。
3. **選び直し / シャッフル / 全解除** を用意。
4. 選択数に応じて背面グリッドの列数が変わる（§5）。

### 3.3 プレビュー

- 既存 `/design` の合成（`FramePreview` + `html-to-image`）を流用。
- **背面プレビュー:** 選択単語を並べたグリッド（§5 レイアウト）。主役。
- **前面プレビュー:** 胸位置に `assets/tshirt/langmap-chest-mark.svg`（小さめ）。
- 表裏トグル、シャツ色スウォッチ（白/黒/ネイビー/杢グレー等、既存の色マスタ `/api/tshirt-colors` に合流）。シャツ色に応じてインク色（濃紺 or 白）を自動反転。

### 3.4 商品化・注文

- 「これで注文」→ `useDesignStore` にデザイン確定 → `useCartStore` に line item 追加 → 現行の Stripe/PayPal チェックアウトへ。
- **line item メタデータ**（制作会社への受け渡し・再現に必須）:
  ```json
  {
    "product": "langmap-tshirt",
    "src": "langmap", "map": "wordmap",
    "lang": "ja", "langName": "日本語",
    "words": [
      {"concept":"water","form":"水","ipa":"mizɯ"},
      {"concept":"moon","form":"月","ipa":"tsɯki"}
    ],
    "showIpa": false,
    "shirtColor": "black", "inkColor": "white",
    "size": "M", "qty": 1,
    "layoutVersion": "1", "dataGenerated": "<wordmap_seo.json の generated 値>"
  }
  ```
  `words` の `form` を正とし、`dataGenerated` を残すことで後日の再現・差分検証ができる。

## 4. 推奨: Makoto 側データ中継 API

CORS とキャッシュのため、直 fetch ではなく Makoto の API ルートを噛ませる。

```
GET /api/goods/langmap/words?lang=ja
  → サーバーで GOODS_SOURCES.langmap.dataUrl を fetch（60〜1440 分キャッシュ）
  → { code, name, native, words:[{concept,form,ipa}] } を返す
```

- 全 JSON（1187 言語）を都度クライアントに渡さない。言語ごとに切り出して返す。
- `lang` は正規表現/allowlist で検証（`^[a-z]{2,3}(_[a-z0-9]+)?$` 程度）。

## 5. Tシャツ・レイアウト仕様（印刷）

### 背面（主役 = 単語グリッド）

- 選択数 → 列数の目安:
  | 単語数 | グリッド |
  |---|---|
  | 1 | 1 個を特大センター |
  | 2–4 | 1 列（縦積み・大） |
  | 5–6 | 2 列 |
  | 7–9 | 3 列 |
  | 10–12 | 3〜4 列 |
- 各セル: `form`（現地表記・大）＋（任意）`ipa`（下に小さく灰）。concept 英語は既定で出さない（出す設定も可）。
- 現地表記フォントは多スクリプト対応必須（CJK / アラビア / デーヴァナーガリー / タイ等）。**Noto Sans/Serif ファミリで全スクリプトをカバー**、IPA は Charis SIL / Gentium。豆腐（□）ゼロを校正で確認。
- 印刷版下は **背面グリッドを SVG→PDF** で生成（Makoto 側でサーバー生成 or html-to-image の高解像度書き出し）。単語数・言語・色をメタから完全再現できること。
- プリント範囲は A3 相当（〜297×420mm 内）に収める。

### 前面（胸マーク）

- 素材: `assets/tshirt/langmap-chest-mark.svg`（このリポジトリ同梱）。
- 「世界言語マップ / LangMap」＋地球グリフ。単色（`currentColor`）。**濃紺 #1b2a44 を既定**、濃色シャツでは白に反転。
- 印刷幅の目安 **約 60mm**、左胸 or センター上部。

### 色

- シャツ色は既存 `/api/tshirt-colors` に合わせる。インク色はシャツ明度で自動反転（明→濃紺、暗→白）。プレビューと版下で同一ロジックを使う。

## 6. ランダム5「うまい感じ」アルゴリズム

単に乱数 5 個だと地味・重複感が出るので、次のヒューリスティックを推奨（Makoto 側実装）:

1. concept を **意味カテゴリ**でゆるくグルーピング（自然: water/fire/sun/moon/star、身体: eye/hand/…、動物、色、家族 等）。カテゴリ表はこのリポジトリの concept 一覧から Makoto 側に静的定義。
2. **異なるカテゴリから優先的に**選び、絵面が偏らないようにする（同カテゴリ 2 個までを許容）。
3. `form` の**字数（表示幅）に程よいばらつき**が出るよう選ぶ（短い語ばかり/長い語ばかりを避ける）。
4. その言語に存在する concept のみが対象。5 個に満たなければ全数。
5. seed 可能に（同じ seed で同じ 5 個＝共有・再現用）。「シャッフル」で seed 更新。

> カテゴリ表は必須ではない（無ければ「重複なし乱数 + 字数分散」だけでも十分“うまい感じ”になる）。段階導入可。

## 7. 前面マーク素材

- `assets/tshirt/langmap-chest-mark.svg` … 同梱。単色ベクター。色はシャツに合わせて差し替え/反転。
- 必要なら Makoto 側で PNG（透過・300dpi 相当）に書き出して制作会社へ。

## 8. 実装フェーズ / チェックリスト

**LangMap 側（このワークツリー・済/要）**
- [x] `renderLangInfo` に CTA ボタン（19 UI 言語）
- [x] `.tshirt-cta-btn` CSS
- [x] 胸マーク SVG（`assets/tshirt/langmap-chest-mark.svg`）
- [x] 本設計書
- [ ] `data/wordmap_seo.json` の CORS 有効化 **or** Makoto 中継 API 採用の決定
- [ ] （今後）SEO ページ版ボタン。URL 生成関数を共通化

**Makoto 側（`../japan-to-go`・要）**
- [ ] `/[locale]/goods/langmap/page.tsx` 特設ページ
- [ ] `GOODS_SOURCES` allowlist + `/api/goods/langmap/words`（中継・キャッシュ）
- [ ] 単語選択 UI（リスト選択 / ランダム5 / シャッフル / 数→列数）
- [ ] 背面グリッド + 前面マークのプレビュー（既存 FramePreview 流用）
- [ ] 多スクリプトフォント読み込み・豆腐チェック
- [ ] `useCartStore` line item（§3.4 メタ）→ 既存 Stripe/PayPal 合流
- [ ] 背面グリッド版下の SVG→PDF 高解像度書き出し
- [ ] `langmap-tshirt` 商品マスタ登録（価格・サイズ・色）

**制作会社向け成果物**
- [ ] 背面＝単語グリッド版下（言語・単語・色ごと、SVG/PDF）
- [ ] 前面＝胸マーク版下（`langmap-chest-mark.svg`／色反転指定）
- [ ] 印刷範囲・配置・インク色反転ルール（§5）

## 9. 疎結合まとめ（なぜこの形か）

- 送り出し側は **リンク 1 本**だけ実装 → 将来 HanMap/NameMap/系統樹/外部でも同型で増やせる。
- Makoto は **公開 JSON 契約**だけ知る → LangMap の内部実装に依存しない。
- 決済・カート・プレビューは **既存資産を再利用** → 新規に作らない。
- 表示名はヒント、識別子だけが結合点 → データ更新に強い。
