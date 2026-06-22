# サブドメインのサイト名修正 指示書（Google検索で親ドメインの社名が出る問題）

**対象**：`service.example.com` のようにサブドメインで運用しているサービスで、Google 検索結果のサイト名欄に**親ドメイン（会社）の名前**が表示されてしまうケース。
**ゴール**：検索結果のサイト名を、そのサービス自身の名前（例：`LangMap`）に変える。

---

## 1. なぜ起きるのか（先に理解する）

- Google は **1ドメイン／1サブドメインにつき「サイト名」を1つ**だけ割り当てる。
- **サブドメインは既定で親ドメインのサイト名を継承する。** だから親 `example.com` のサイト名が「○○株式会社」だと、`service.example.com` にもそれが出る。
- サブドメイン**独自のサイト名シグナル**を、その**サブドメインのトップページ**に明示すれば上書きできる（Google公式仕様。ドメイン／サブドメイン両レベルでサイト名指定に対応）。
- **即時には反映されない。** Google がそのページを再処理したときに更新され、**数日〜数週間**かかる。

> サイト名の判定に使われるシグナル（強い順のイメージ）：
> `WebSite` 構造化データの `name` → `og:site_name` → `<title>` → `<h1>` 等の見出し → ドメイン名

---

## 2. 作業チェックリスト（このすべてを「サービス名」に揃える）

各サービスの **トップページ（サブドメインのルート `/`）** で、以下を確認・修正する。
content ページ（アプリ画面等）にも同じ `og:site_name` と `<h1>` を入れておくと一貫性が増す。

- [ ] **A. `og:site_name`** を `サービス名` にする
- [ ] **B. `WebSite` 構造化データ**の `name` を `サービス名` にする
- [ ] **C. `publisher`（サイトの主体）** を「サービス名の Organization」にし、**会社は `parentOrganization` に降格**（クレジットは残す）
- [ ] **D. `<h1>`** を全ページに置く（無いサイトが多い。視覚的に隠してOK）
- [ ] **E. `<title>`** が `サービス名 — …` で始まる
- [ ] **F. `canonical`** がそのサブドメインURL自身を指す（親に向けない）
- [ ] **G.（推奨）親ドメイン側**にも独自の `WebSite` 構造化データを置き、両者を別サイトとして分離させる

---

## 3. コピペ用スニペット

`{{...}}` を各案件の値に置換すること。

### A. og:site_name（`<head>` 内）
```html
<meta property="og:site_name" content="{{SITE_NAME}}">
```

### B+C. WebSite + Organization 構造化データ（トップページの `<head>` 内）
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://{{SUBDOMAIN}}/#website",
      "url": "https://{{SUBDOMAIN}}/",
      "name": "{{SITE_NAME}}",
      "publisher": { "@id": "https://{{SUBDOMAIN}}/#org" }
    },
    {
      "@type": "Organization",
      "@id": "https://{{SUBDOMAIN}}/#org",
      "name": "{{SITE_NAME}}",
      "url": "https://{{SUBDOMAIN}}/",
      "logo": "https://{{SUBDOMAIN}}/logo.png",
      "parentOrganization": {
        "@type": "Organization",
        "name": "{{COMPANY_NAME}}",
        "url": "https://{{PARENT_DOMAIN}}"
      }
    }
  ]
}
</script>
```
**ポイント**：`publisher` と `Organization.@id` を**サブドメイン**に向ける（`{{PARENT_DOMAIN}}/#org` にしない）。会社は `parentOrganization` として残すのでクレジットは失われない。

### D. 視覚的に隠した `<h1>`（`<body>` 直後）
```html
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">{{SITE_NAME}}</h1>
```
※ デザイン上 `<h1>` を表に出せるならそれが理想。出せない場合のみ上記の隠し方を使う。各ページの h1 は `{{SITE_NAME}} — {{ページ名}}` の形でブランドを先頭に。

---

## 4. やってはいけない / 注意

- `og:site_name` や `WebSite.name` に**会社名を入れない**（サービス名にする）。
- `publisher` を**親ドメインの会社 Organization に向けない**（サイトの主体が会社になってしまう）。
- フッターの「制作: ○○株式会社」等の表記は**残してよい**（通常サイト名には影響しない。構造化データ／og が優先）。反映後もしつこく残る場合のみ追加対処。
- 構造化データは**トップページに必ず**。サブページだけだと弱い。
- 1ページに `<h1>` は1つ。既に表示用 h1 があるページに隠し h1 を重複させない。

---

## 5. Google Search Console での操作（コードだけでは完結しない）

各サブドメインのプロパティで：
1. **URL検査**に `https://{{SUBDOMAIN}}/`（トップページ）を入力 →「**インデックス登録をリクエスト**」。
2. 主要な集客ページ（アプリ画面等）も同様にリクエスト。
3. サイトマップを出している場合は再送信。
4. **待つ**：サイト名は Google の再処理時に更新。**数日〜数週間**。焦らない。

---

## 6. 検証方法

- **リッチリザルトテスト** / **schema.org Validator**：トップページURLを入れ、`WebSite.name = サービス名`、`Organization.name = サービス名` が読めることを確認。
- **URL検査の「公開URLをテスト」**：レンダリング後の HTML に `og:site_name` と `<h1>` が入っているか確認（JSで描画している場合は特に重要）。
- **`site:{{SUBDOMAIN}}`** で検索し、結果のサイト名欄を経過観察（反映はタイムラグあり）。

---

## 7. 期待値・タイムライン

- コード修正＋デプロイ：即時（ただし検索結果はまだ変わらない）。
- 再クロール：リクエスト後、数時間〜数日でクロールされることが多い。
- **サイト名の表示更新：数日〜数週間**。Google 側の都合で前後する。
- それでも1か月以上変わらない場合 → 9. へ。

---

## 8. 横展開の進め方（複数案件）

案件ごとに以下の表を埋めてから着手すると漏れがない。

| 案件 | サブドメイン | サービス名 | ロゴURL | 親会社/親ドメイン | A:og | B:WebSite | C:publisher | D:h1 | SC再登録 | 反映確認日 |
|---|---|---|---|---|---|---|---|---|---|---|
| 例 | langmap.heuron.com | LangMap | /langmap.png | ヒューロン株式会社 / heuron.com | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| | | | | | | | | | | |

---

## 9. それでも親会社名が残るとき（追加対処）

1. **親 `example.com` のサイト名が強すぎる**：親側にも `WebSite` 構造化データを置き、親のサイト名を明確化（＝両者を別サイトとして Google に分離させる）。
2. **本文中の会社名シグナルが強い**：トップ近くの大きな会社名テキストを画像化、または `<h1>` 等の見出しから会社名を外す（フッターの小さなクレジットは可）。
3. **JSルートで `<head>` を後から書き換えている**：クローラが見る初期HTMLに og/JSON-LD が入っているか URL検査で確認（SSR/静的出力が安全）。
4. 反映を急ぐ必要があれば、トップページの**実コンテンツ更新＋再リクエスト**で再処理を促す。

---

### 参考（このリポジトリでの適用例）
`index.html` / `wordmap.html` / `hanmap.html` に上記 A〜D を適用したコミット：
`915c596 SEO: make Google show "LangMap" as the subdomain site name, not the parent company`
