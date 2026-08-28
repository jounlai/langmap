# Review 467 — `meta.sources`（全体ラリー2巡目 2／5）

**日付:** 2026-08-28
**切り口:** アトラスが根拠を示している場所。1,164言語・2,249件の出典。これまで未検査。

## 形式 — ほぼ無傷

| 検査 | 結果 |
|---|---|
| `sources` が配列でない | **0** |
| エントリがオブジェクトでない | **0** |
| `title` の欠落 | **0**（2,249件すべて） |
| `type` 値のばらつき | **0**（全件 `reference`） |
| 不正な URL | **1** |

不正 URL は `jqr` の `https://www.de Gruyter.com/` — **ホスト名に空白**。
`www.degruyter.com` に直した。

出典のホストは261種、上位は Ethnologue 668件、Glottolog 402件、Cambridge 79件。

## 本題 — リンクは「その言語」を指しているか

形式が正しくても、**中身が別言語を指していたら出典として無意味**である。
これは照合できる。`meta.iso6393` と `meta.glottocode` がレコードにあるので、
URL に埋まっているコードと突き合わせればよい。オフラインでできる。

### 発見 — 3行が別言語の Glottolog ページを引用していた

**3件とも同じ壊れ方をしていた。** Glottolog のコードは
**言語名の頭4文字＋数字**なので、名前が似た言語どうしで衝突する。
コードを名前から推測すると隣の言語に着地する。

| 行 | 引用していた ID | その ID の実体 | 正しい ID |
|---|---|---|---|
| `ohu` 古ハンガリー語 | `oldh1241` | **Old High German** | `oldh1242` |
| `olo` リヴィ・カレリア語 | `livv1244` | **Liv（リヴォニア語）** | `livv1243` |
| `xqa` カラハン朝トルコ語 | `kara1467` | **Kara-Kalpak** | `qara1244` |

`Old H`ungarian / `Old H`igh German、`Livv`i / `Liv`onian、
`Kara`khanid / `Kara`kalpak。どれも頭4文字が一致する。

**3件とも glottolog.org で1件ずつ実物を確認してから直した。**
`xqa` は ISO 経由の URL が 404 だったので検索で候補を得たが、
検索要約は今回の別件で一度外していたので、`qara1244` のページを直接開いて
`Qarakhanid` であることを確かめた。

### 兆候はタイトルに出ていた

誤っていた側は、タイトルが**言語名ではなくコードそのもの**だった
（`'Glottolog: kara1467'`、`goh` の `'Glottolog: oldh1241'`）。
正しい側は `'Glottolog: Old Hungarian'` のように名前で書かれている。
コードを本文に書き写した時点で、確認していないことが表に出ていた。
タイトルも言語名に直した。

## 直さなかった2つの一貫パターン

Ethnologue のリンクと `iso6393` が食い違う行が7つあったが、
**どちらも単発の矛盾ではなく、統一された運用**だった。

**macrolanguage（5件）** — `iso6393` に macrolanguage を、
リンクに Ethnologue が実際に記述する個別言語を置いている。5件すべて同じ形:

```
ms msa→zsm    fa fas→pes    sw swa→swh    mg mlg→plt    yi yid→ydd
```

**日本語の歴史段階（3件）** — `ja_heian`(8–12c)・`ja_chu`(12–16c)・`ja_edo`(17–19c)
がいずれも `iso6393='ojp'` で、リンクは `jpn`。
ISO 639-3 に中世・近世日本語のコードが無いためで、3行すべてで統一されている。
`ja_edo` の 17–19c を「Old Japanese」と呼ぶのは苦しいが、
**代わりに使えるコードが存在しない**。運用の問題なので独断では変えない。

どちらも規則で自動除外した（macrolanguage 対応表と、`meta.period` を持つ行）。

## 負債 — 301行が出典を1件も持たない

`meta` はあるが `sources` が空、が **301行（26%）**。内訳の傾向:

- 最近追加した地域変種（`es_cr` `es_hn` `ar_jo` `fr_lu` `de_lu` `pt_mo` …）
- 中国語方言行（`gan_yc` `gan_ja` `gan_fz` `cjy_lv` `hsn_hy` `czh_wy` …
  **review 455 でコピー行と判明した6行を含む**）
- 北米先住民言語（`bla` `hop` `com` `one` `ono` `win` `cro` `hai` …）

violation ではなく **debt** として毎回表示する。埋めるべき穴であって、
今ある回帰ではないため。

## 新設ガード — `tools/source_link_check.js`

- 形式（配列・オブジェクト・title・URL）
- **Ethnologue リンクのコード = `iso6393`**（macrolanguage 対応と `period` 持ちは除外）
- **1つの Glottolog ID を `iso6393` の異なる行が引用していたら violation** ←
  これが3件を捕まえた規則。方言行どうしは `iso6393` を共有するので誤検出しない

**リンクの生死は検査しない。** CI はオフライン前提で
「no network, so CI stays fast and deterministic」と明記されており、
2,249件の HTTP を叩けばその前提が壊れる。Ethnologue はログイン要求で
200/403 が揺れるのでノイズにもなる。

検証: `ohu` を `oldh1241` に戻す →
`glottocode oldh1241 is cited by rows with different iso6393: ohu(ohu) goh(goh)`。

`check_all` は **47 → 48** ガード。
