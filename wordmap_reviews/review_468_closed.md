# Review 468 — 宣言した文字体系 vs 実データ（全体ラリー2巡目 3／5）

**日付:** 2026-08-28
**切り口:** `meta.script` は読者に表示されるだけで、他のどのコードも読まない。
だから値が間違っていても**他のガードには一切見えない**。実データと突き合わせる。

## 発見1 — 4行が「Latin」と宣言しながら漢字を書いていた

```
gan_yc  Gan Chinese (Yichun)     Han 100% of 38 cells   declared: Latin
gan_ja  Gan Chinese (Jiʼan)      Han 100% of 42 cells   declared: Latin
hsn_hy  Xiang Chinese (Hengyang) Han 100% of 42 cells   declared: Latin
hsn_yz  Xiang Chinese (Yongzhou) Han 100% of 37 cells   declared: Latin
```

そして**これは既知のクラスだった**。review 432 が
`cjy_lv` `cjy_xz` `czh_wy` `gan_fz` の4行に対して同じ修正
（Latin → Simplified Chinese）を済ませている。**取りこぼしが4行**あり、
クラス全体を見張るものが無かったので誰も気づかなかった。

親行（`gan` `hsn` `cjy` `czh`）はすべて Simplified Chinese。

## 発見2 — 直したら下から2層目が出てきた

`meta.script` を直そうとして中身を見たら、4行のうち3行が**繁体字**を書いていた。

| 行 | 繁体字のみの字 | 簡体字のみの字 |
|---|---|---|
| `gan_yc` | 5 | 0 |
| `hsn_yz` | 6 | 0 |
| `hsn_hy` | 7 | 1 |
| `gan_ja` | 0 | 9 |

親の `gan`・`hsn` は簡体字で、`tools/zh_script_convention.js` の方針も
「大陸の方言は簡体字、台湾の閩南・客家と歴史段階は繁体字」と明記している。

**親行との差分を全部取り、字体差と語彙差を分離した。**

- **字体だけの差（30セル）** → 変換した:
  `骨頭→骨头` `貓→猫` `魚→鱼` `愛→爱` `紅→红` `樹→树` `媽→妈`
  `謝→谢` `們→们` `風→风` `陽→阳` `飲→饮`
- **語彙の差** → **触っていない**:
  `gan_yc eat 食` vs `gan 吃`、`hsn_hy we 我伲` vs `hsn 我们`、
  `hsn_yz house 屋` vs `hsn 屋里`、`gan_yc we 我勒` vs `gan 我个俚` は
  方言語彙そのもので、正規化したら情報が消える

変換後、4行すべてで繁体字のみの字は0。そのうえで `meta.script` を
`Simplified Chinese` にした（先に字体を直したので、この宣言は真になる）。

### 途中で踏んだ罠

`meta.script` の置換が最初 1件も当たらなかった。これらの行は
`LANG_DATA["gan_yc"]` と**ダブルクォート**で書かれており、
シングルクォート前提のパターンが素通りしていた。
リポジトリに3種類のキー/クォート形式が混在するのは既知の罠で、
今回は assert が落ちて気づけた（黙って0件成功していたら見逃していた）。

## 自分の検出器のバグ — サロゲート領域を丸ごと飲んでいた

最初の集計で、シュメール語・フェニキア語・古代エジプト語・西夏語が
**「Han 100%」**と出た。データを見ると全部正しい（`sux` は U+12137 の本物の楔形文字）。
検出器が誤っていた。

原因は文字クラスの端点:

```js
['Han', /[㐀-䶿一-鿿豈-﫿]/]
```

**`豈` を U+F900 だと思っていたが、実際は U+8C48。**
3つ目の範囲が `U+8C48–U+FAFF` になり、**サロゲート領域 U+D800–U+DFFF を丸ごと含む**。
`u` フラグが無いので SMP 文字はサロゲート2個として走査され、全部「Han」に化けていた。

```
/[㐀-䶿一-鿿豈-﫿]/.test('𒄷')   → true   ← 誤り
/[㐀-䶿一-鿿豈-﫿]/u.test('𒄷') → false  ← 正しい
```

review 463 の `[⁰-⁹]`（上付き数字が Unicode 上で連続していない）と**同じ形の罠**。
**見た目で範囲を書かず、`\u` エスケープと `u` フラグを使う。**

ブロック表を全部 `\u` エスケープに書き直し、
アトラスが実際に使う astral 文字（楔形・ヒエログリフ・西夏・古テュルク・
リニアB・古南アラビア・タイ・ヴィエト・メイテイ）も追加した。
違反は **32 → 11 → 0**（11は私の別名表の漏れ）。

## 直さなかった6行 — 宣言がデータより広い

| 行 | 宣言 | 実データ |
|---|---|---|
| `yuy` 東部裕固語 | モンゴル文字（歴史的）＋Latin | **Cyrillic 97%** |
| `oar` 古アラム語 | 古アラム文字（フェニキア系） | **Hebrew 88%**（学術慣行だが宣言に無い） |
| `xve` ヴェネティ語 | ヴェネティ文字 | **Greek 33%** |
| `luz` 南ルル語 | Perso-Arabic (informal) | **Latin 88%** |
| `trm` トレガミ語 | Perso-Arabic | **Latin 100%**（識字ほぼ皆無の言語の学術翻字） |
| `enf` 森ネネツ語 | Cyrillic | **Latin 100%**（同族の `yrk` `sel` `nio` は Cyrillic） |

どれも「データを直す」か「宣言を直す」かの判断が要り、
`enf` を Cyrillic 化するなら36セル分の出典が要る。debt として記録。

一方、**祖語と古代語が Latin なのは方針どおり**なので規則で自動除外した
（`meta.period` を持つ、または宣言が reconstructed / none / undeciphered）。
印欧祖語・ソグド語・女真語・古典マヤ語は意図的にラテン翻字で書かれている。

## 新設ガード — `tools/script_declaration_check.js`

行のセルの25%以上で使われている文字体系が
`meta.script`/`scriptTags` のどこにも書かれていなければ violation。

検証: `gan_yc` を Latin に戻す →
`gan_yc Gan Chinese (Yichun) writes Han in 100% of cells but declares "Latin"`。

`check_all` は **48 → 49** ガード。
