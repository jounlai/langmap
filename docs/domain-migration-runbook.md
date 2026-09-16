# ドメイン移行 runbook — langmap.heuron.com → langmaps.com

作成 2026-09-16。**本番サーバの状態は外から実測した値**（DNS / HTTP ヘッダ / TLS 証明書）。
サーバ内部の設定ファイルは見ていないので、§2 の冒頭に確認コマンドを置いた。

---

## 0. 先に知っておくべき3点

### 0-1. langmaps.com は**もう本番サーバを指している**。そして今、壊れて見える

```
langmaps.com        A 133.242.155.37   ← langmap.heuron.com と同じ IP
www.langmaps.com    A (なし)           ← 未設定
```

- `http://langmaps.com/` は **200 を返すが、中身は Apache2 の "It works" デフォルトページ**
- `https://langmaps.com/` は **`chuka-pop.heuron.com` の証明書**を返す → ブラウザは証明書名不一致の警告

つまり**今この瞬間、langmaps.com を踏んだ人は警告画面か他人のデフォルトページを見ている。**
移行作業を始める前でも、§2 の vhost と証明書だけは早めに入れたほうがよい。

### 0-2. 構成は「apache2 だけ」ではなく **nginx → apache2**

| 実測 | 示すもの |
|---|---|
| 全レスポンスの `Server: nginx/1.24.0 (Ubuntu)` | **TLS を終端し、静的ファイルを返しているのは nginx** |
| 未知の Host が Apache2 デフォルトページを返す | **背後に apache2 がいて、フォールバック先になっている** |
| `.htaccess`（mod_rewrite）が SEO ルーティングの正 | PHP は apache2 側で動いている |
| `docs/perf-optimization-handoff.md` に nginx の gzip・mime 設定作業の記録 | 2026-08 に nginx を直接触っている |

**証明書は nginx 側に入れる**（`certbot --nginx`）。apache2 側に入れても TLS を終端していないので効かない。

### 0-3. 外部に「旧ドメイン固定」の依存が1件ある — **切替前に連絡が必要**

`docs/makoto-goods-link.md` §2 より、Makoto Gadgets は Tシャツ注文ページで

```
https://langmap.heuron.com/lang_words/<code>.js
```

の**接頭辞を検証**している。**黙ってドメインを変えると Makoto 側の商品ページが白紙になる。**
同ドキュメントは「形式を変える場合は必ず事前連絡」と明記している。

対応順序:
1. Makoto 側に新ドメインを伝え、検証プレフィックスを両方許可してもらう
2. 旧ドメインの `/lang_words/` は**リダイレクトではなく実体で残す**か、Makoto 側がリダイレクトを追う実装か確認する（サーバ側取得なので 301 は追えるはずだが、確認を取る）
3. こちらの `WORDS_DIR` を新ドメインに変更

---

## 1. ソース側の変更

`langmap.heuron.com` は全体で 149 箇所（別スレッドの worktree を除く）。
**すべてを一度に置換してはいけない。** 性質が4種類あり、扱いが違う。

### 1-A. 単一定数（ここを直すと連鎖するもの）— 最優先

| ファイル | 箇所 | 内容 |
|---|---|---|
| `seo/lib.php:46` | `const SEO_SITE` | **SEOページ全体の canonical / og:url / hreflang / JSON-LD / sitemap の生成元。** ここ1行で SSR 側 23,598 URL が動く |
| `tools/export_seo_data.js:262,465` | `site:` | `data/wordmap_seo.json` `data/hanmap_seo.json` に焼き込まれる。変更後 **再生成が必要** |

再生成:
```bash
node tools/export_seo_data.js && node tools/bump_versions.js && node tools/check_all.js
```

### 1-B. 静的HTMLのメタタグ — 5ページ × 各8〜12箇所

`index.html` `wordmap.html` `hanmap.html` `tree.html` `namemap.html`:

- `<link rel="canonical">`
- `<meta property="og:url">` / `og:image` / `twitter:image`
- JSON-LD の `"url"` `"logo"`
- `<a class="header-url">` のリンク先と**表示テキスト**（画面に出る文字列）

**JSON-LD の `@id` は別扱い。** `https://langmap.heuron.com/#website` `#org` は
Google が実体を識別する ID で、変えると別実体として再評価される。ドメイン移行では
**新ドメインの `@id` に変えるのが正**（`docs/subdomain-site-name-runbook.md` の G 項と整合）。
サイト名の再学習に数日〜数週間かかることを見込む。

### 1-C. 実行時の挙動が変わるもの — **単純置換すると壊れる**

| 箇所 | 現状 | 注意 |
|---|---|---|
| `wordmap.html:7812` `TSHIRT_HOST` | `'langmap.heuron.com'` | Tシャツ導線の表示ゲート。**現在このゲートは `tshirtEnabled(){ return true; }` で無効化されている**（テスト用）。ドメイン移行と同時に本来の形へ戻すなら、新ドメインを入れてから |
| `wordmap.html:7836` `WORDS_DIR` | 本番は旧ドメイン固定 | **§0-3 の Makoto 連絡が済むまで変えない** |
| GA発火ゲート `location.hostname === 'langmap.heuron.com'`（**11ファイル**: 5ページ + changelog 6本） | 本番のみ計測 | 移行期は**両ドメインを許可**しないと、旧→新の移行中にデータが欠ける。`['langmap.heuron.com','langmaps.com'].includes(location.hostname)` にしておき、旧ドメイン廃止時に戻す |
| `app.js:1883` 透かし / `my-languages.js:929` `dom` / `wordmap_data.js` の `url:'langmap.heuron.com/wordmap.html'`（**21言語分**） | 共有画像に焼かれる文字列 | 画像に出る**ブランド表記**。ドメイン変更と同時に変える |
| `robots.txt:24` `Sitemap:` / `sitemap.xml`（7 loc） | 旧ドメイン | 新ドメインへ |

### 1-D. コメント・ドキュメント — 後回しでよい

`styles.css` のコメント2箇所、`tools/check_all.js:505`、`basemap_key.sample.js:12`、
`docs/` 16ファイル38箇所、`changelog-*.html` の履歴本文。
**changelog の本文中の旧URLは歴史記述なので残してよい**（GA ゲートだけは 1-C 扱い）。

### 1-E. 置換してはいけないもの

- `.claude/worktrees/namemap/` 配下（別スレッドの worktree。そちらで別途対応）
- `basemap_key.js`（gitignore、手動デプロイ。コメント1行のみ）

---

## 2. サーバ側（nginx + apache2 + Let's Encrypt）

### 2-0. まず現状を確認する2コマンド

```bash
sudo nginx -T | grep -n "server_name\|proxy_pass\|root " | head -40
sudo apache2ctl -S
```

これで「どちらが静的を返し、どちらが PHP を処理しているか」が確定する。
以下は **nginx が TLS 終端＋静的、apache2 が PHP** という実測どおりの前提。

### 2-1. DNS

```
langmaps.com        A     133.242.155.37     （設定済み）
www.langmaps.com    A     133.242.155.37     （未設定 — www を使うなら追加）
```

`www` を使わない方針なら追加不要。ただし**証明書に入れておくと後で選べる**ので、
DNS だけ通して SAN に含めておくことを勧める。

### 2-2. nginx: 新ドメインの server ブロック

既存の `langmap.heuron.com` の server ブロックをコピーし、`server_name` を差し替える。
**gzip と mime の設定（`.geojson` → `application/geo+json`、gzip_types）は 2026-08 に入れたもので、
新 server ブロックにも効く形になっているか確認すること**（http ブロックに書いてあれば自動で効く）。

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name langmaps.com www.langmaps.com;
    # certbot が 443 ブロックを追記するまでの間だけ。ACME チャレンジを通すため
    # ここでリダイレクトを書かない（certbot --nginx が面倒を見る）。
    root /var/www/langmap;      # ← 既存 vhost と同じ値に合わせる
    include /etc/nginx/snippets/langmap-common.conf;   # 既存がこの形なら
}
```

### 2-3. Let's Encrypt（certbot、nginx プラグイン）

```bash
sudo certbot --nginx -d langmaps.com -d www.langmaps.com
```

- **`--nginx` を使う**。apache プラグインではない（TLS を終端しているのは nginx）
- www を DNS に入れていない場合は `-d www.langmaps.com` を外す。**入っていない名前を指定すると発行ごと失敗する**
- 発行後の確認:
  ```bash
  echo | openssl s_client -connect langmaps.com:443 -servername langmaps.com 2>/dev/null \
    | openssl x509 -noout -subject -ext subjectAltName -dates
  ```
  `CN=langmaps.com` と `notAfter` が出れば成功。今は `chuka-pop.heuron.com` が出る
- 自動更新の確認: `sudo certbot renew --dry-run`
- **旧証明書（langmap.heuron.com、期限 2026-11-09）は削除しない。** 301 を返し続けるために必要

### 2-4. apache2 側

nginx から proxy されている場合、apache2 の vhost にも新しい名前を通す:

```apache
<VirtualHost *:8080>            # ← 実際の backend ポートに合わせる
    ServerName  langmaps.com
    ServerAlias www.langmaps.com
    ServerAlias langmap.heuron.com      # 旧名も残す（301 は nginx 側で出す）
    DocumentRoot /var/www/langmap
    <Directory /var/www/langmap>
        AllowOverride All               # .htaccess の RewriteRule を有効にする
        Require all granted
    </Directory>
</VirtualHost>
```

`AllowOverride All` は必須。これが `None` だと `.htaccess` が読まれず、
**SEO の 23,598 ページが全部 404 になる**（トップと静的HTMLだけ生き残るので気づきにくい）。

```bash
sudo apache2ctl configtest && sudo systemctl reload apache2
```

### 2-5. 旧ドメイン → 新ドメインの 301（切替当日）

nginx 側、旧 server ブロックを丸ごと置き換える:

```nginx
server {
    listen 443 ssl http2;
    server_name langmap.heuron.com;

    ssl_certificate     /etc/letsencrypt/live/langmap.heuron.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/langmap.heuron.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    # パスとクエリを保ったまま恒久転送。$request_uri はクエリを含む。
    return 301 https://langmaps.com$request_uri;
}
```

**`$request_uri` を使うこと。** `$uri` だとクエリ文字列が落ち、共有された
`?play=langle` や `#...` 付きURLの遷移先が変わる（`#` 以降はそもそもサーバに来ないので無害）。

**例外を1つ作るか決める**: `/lang_words/` は Makoto が取りに来る（§0-3）。
Makoto 側が 301 を追う確認が取れるまでは、旧ドメインでも実体を返す:

```nginx
    location ^~ /lang_words/ {
        root /var/www/langmap;
        try_files $uri =404;
    }
```

---

## 3. 見落としやすい副作用

### 3-1. Service Worker — 301 を入れただけでは旧オリジンから出られない

**2026-09-16、実際に踏んだ。** 301 は curl では完璧に効いているのに、ブラウザは旧サイトを
表示し続ける。原因は2つあり、両方ともサーバ側で手当てが要る。

**(a) SW の network-first が、リダイレクトで cache-fallback に化ける。**
`sw.js` はナビゲーションを `fetch()` → 失敗したら `caches.match()` の順で処理する。
旧オリジンの `fetch()` は 301 でクロスオリジンになり、**CORS ヘッダがないので reject** する。
結果、catch 節に落ちて**旧オリジンのキャッシュが返る**。利用者から見れば「転送が効かない」。

**(b) `/sw.js` を 301 すると、その SW は二度と消せない。**
仕様上、Service Worker スクリプトの取得中にリダイレクトが起きると**更新が失敗**する。
更新できない＝置き換えも削除もできない。そのブラウザは**永久に旧サイトに固定される**。

したがって、旧 vhost では **`/sw.js` を 301 から除外して実体で返す**こと。中身は
`deploy/old-origin-sw.js`（このリポジトリにある。自分を unregister し、キャッシュを消し、
クライアントを同一オリジンで再読込 → 今度は SW がいないので 301 が効く）。

```nginx
location = /sw.js {
    root /srv/www/langmap.heuron.com;
    try_files /deploy/old-origin-sw.js =404;
    add_header Cache-Control "no-cache, must-revalidate" always;
    expires off;
}
```

**301 を出している間はこのファイルを置き続ける。** 更新チェックは1端末あたり最大24時間に
1回、数か月ぶりに来る利用者もいる。

利用者自身の端末で今すぐ直すには: DevTools → Application → Service Workers → Unregister、
または Clear site data。シークレットウィンドウなら最初から影響を受けない。

### 3-2. localStorage / cookie は**オリジン単位なので全部リセットされる**

移行で失われるもの（利用者から見える）:

| キー | 内容 |
|---|---|
| cookie `wm_uilang` | **UI言語の選択** — 新ドメインでは既定（ブラウザ言語）に戻る |
| `COMPARE_STORAGE_KEY` | 比較中の言語リスト |
| `langmap_corrections` | 利用者が入力した添削内容 |
| `lm_visits` / `lm_last_day` / `lm_lotd_day` | 訪問回数・今日の言語 |
| `lm_pwa_dismissed` / `wm-chrome-hidden` | UI の状態 |

**`langmap_corrections` だけは実損。** 移行前に告知するか、旧ドメインで
「エクスポートして新ドメインに読み込む」導線を出すかを決める。
他は再設定で済む。**cookie に `domain=` を付けていないので、旧→新の自動引継ぎはできない。**

### 3-3. PWA インストール済み利用者

`manifest.json` の `start_url` / `scope` は相対パスなので**ファイルの修正は不要**。
ただしインストール済みのアプリは旧オリジンに紐づいており、301 経由で動き続けるだけ。
入れ直してもらうのが確実。

### 3-4. Google Search Console

1. `langmaps.com` をプロパティとして追加・確認
2. 旧プロパティで**アドレス変更ツール**を実行（301 が入っていることが前提）
3. 新しい `sitemap.xml` と `sitemap-seo.xml` を送信
4. サイト名の再学習に数日〜数週間（`docs/subdomain-site-name-runbook.md` 参照）

**旧プロパティは消さない。** アドレス変更の効果測定に要る。

### 3-5. OGP 画像

`og:image` は絶対URL。X / Slack / Facebook は**画像を再取得しないことがある**ので、
旧URLのまま配信し続ける（301 でよい）か、切替後に各プラットフォームのデバッガで
再クロールさせる。

### 3-6. CARTO ベースマップキー

`basemap_key.js`（gitignore・手動デプロイ）のキーは**現在ドメイン制限をかけていない**ので
移行しても動く。将来制限をかけるときは**両ドメインを登録**すること
（`docs/dev-handoff.md` 項目17 の未処理事項）。

### 3-7. アナリティクス

GA プロパティ `G-JZ7JJBCCHG` はそのままでよいが、
**移行期は §1-C のホスト名ゲートを両方許可**しないとデータが切れる。
GA4 側のデータストリームのドメイン設定も新ドメインを追加する。

---

## 4. 推奨する順序

| # | 作業 | 切り戻し |
|---|---|---|
| 1 | Makoto Gadgets へ連絡（§0-3） | — |
| 2 | `www.langmaps.com` の DNS（www を使うなら） | レコード削除 |
| 3 | nginx に新 server ブロック + `certbot --nginx`（§2-2, 2-3） | ブロック削除 |
| 4 | apache2 に ServerName/Alias（§2-4） | 設定戻し |
| 5 | **ここで `https://langmaps.com/` が正しく LangMap を出すことを確認**（両ドメインが同じ内容を返す状態） | — |
| 6 | ソース 1-A → 1-B → 1-C を変更、`check_all.js` 緑を確認、デプロイ | git revert |
| 7 | 旧オリジンに登録解除 SW を配置（§3-1）、数日置く | 元の sw.js に戻す |
| 8 | 旧ドメインを 301 に切替（§2-5） | 旧 server ブロックを戻す |
| 9 | Search Console のアドレス変更（§3-4） | ツール上で取り消し可 |
| 10 | 1-D のコメント・ドキュメント掃除 | — |

**5 と 6 の間で「両ドメインが同じ内容を返す」期間ができる。**
この間は canonical が旧ドメインを指したままなので、重複コンテンツにはならない。
6 を入れた瞬間に canonical が新ドメインへ移る — ここが実質的な切替点で、
8 の 301 はその追認。**逆順（先に 301）にすると、新ドメイン側の canonical がまだ旧を指していて
自己参照ループのように見える期間ができる。**
