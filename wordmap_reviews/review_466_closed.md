# Review 466 — 座標（全体ラリー2巡目 1／5）

**日付:** 2026-08-28
**切り口:** マーカーの位置。アトラスが主張するもののうち**最も目に見える**のに、
これまで一度も検査されていない。

## 構造 — 無傷

1,164言語の `lat`/`lng`:

| 検査 | 結果 |
|---|---|
| 欠損・非数値・非有限 | **0** |
| 緯度が ±90 の外 / 経度が ±180 の外 | **0** |
| (0,0)（いわゆる null island） | **0** |

同一座標に複数言語が乗るピンが51点・104言語あるが、
`fr`/`fro`（パリ）、`it`/`la`（ローマ）、`ja`/`ja_edo`（東京）、`vi`/`vi_nom`（ハノイ）のように
**現代語とその歴史段階**、あるいは `fr_sn`/`wo`（ダカール）のように
**旧宗主国語の現地変種と現地語が首都を共有**する組で、設計どおり。
3言語以上の重複は既存の validator が `[#14]` として警告している。

## 本題 — 座標は宣言している国と合っているか

`countries.geojson` がリポジトリにある（国別の色分けに使っている）ので、
バウンディングボックスではなく**実際の点内包判定**ができる。やった。

### 最初の2回は自分の手法が間違っていた

1回目、99件が「宣言国の外」と出た。並びを見ると
`is` レイキャビク、`si` コロンボ、`kl` ヌーク、`es_pr` サンフアン——
**ほぼ全部が沿岸か島**。geojson は簡略化されているので、
海岸線の内側にある首都が多角形の外に落ちる。**座標は正しい。**

そこで「点が**実際にどの国に入るか**を求めて宣言と突き合わせる」方式に変更。
2回目は85件。今度は `Côte d'Ivoire` vs `Ivory Coast`、`Tanzania` vs
`United Republic of Tanzania`、`Türkiye` vs `Turkey` といった**表記ゆれ**が大半だった。
照合を双方向包含＋発音区別符号の畳み込みにして61件。

## 発見 — 4行のピンが、自分の metadata が挙げていない国に立っていた

そして残った61件のうち、`Roman Empire`・`Worldwide`・`hypothetical` のような
**時代・地域・国際語の宣言**を除くと、生きている言語で本当に食い違うのは4件だった。

**4件とも、同じレコードの `description` が `countries` と矛盾していた。** 外部出典は要らなかった。

| コード | ピンの立つ国 | `countries` | 同じレコードの `description` |
|---|---|---|---|
| `ker` Kera | カメルーン | Chad のみ | 「Chad **and northern Cameroon**」 |
| `mev` Mano | ギニア | Liberia のみ | 「Liberia, **Guinea**, and Côte d'Ivoire converge」 |
| `tkr` Tsakhur | アゼルバイジャン | Russia のみ | 「southern Daghestan and **adjacent NE Azerbaijan**」 |
| `ahk` Akha | ミャンマー | China のみ | 「Yunnan (China), **Myanmar's Shan State, northern Thailand, Laos, and Vietnam**」 |

`countries` を description に合わせて広げた。
`mev` は description が「3国が接する地域」と書いているだけで
コートジボワールで話されるとは言っていないので、**ギニアのみ**を足した。

## 直してはいけない2件

最後まで残った2件は、**直すと壊れる**類のものだった。

`ab` と `crh` は、**ベースマップがその territory を描く境界と、
`meta.countries` の記述が食い違っている**ケース。
ピンと description は互いに一致しており、食い違っているのは下敷きの多角形だけ。
metadata はアトラス自身の記述なので、ベースマップに合わせて書き換えることはしない。

ガードでは正規表現に飲ませず、**理由を書いた明示リスト**に置いた。
黙って除外すると、後から見た人に「検査されている」と誤解させるため。

## 新設ガード — `tools/coord_country_check.js`

除外を**行ごとの手書きリストにしない**のが要点。言語が増えても腐らないよう、
2つのクラスを自動判定で外す。

- **歴史語**: `meta.period` を持つもの。ラテン語はイタリアに立って「Roman Empire」と言い、
  ゴート語は「Gothic kingdoms」と言う。死語の版図は現代の国ではない
- **超国家的**: `countries` が一覧ではなく**範囲**を書いているもの（worldwide、
  international、empire、hypothetical、diaspora、francophone…）。
  エスペラントとウラル祖語には間違えようのある国が無い

多角形のどれにも入らない点も判定しない（簡略化された海岸線の側の問題）。

```
judged 905 / agree 903 / 歴史語・超国家 206 / 沖合 53 / boundary 2
```

検証: `ahk` を China のみに戻す →
`ahk Akha at 20.5,100.07 stands in Myanmar — meta.countries says "China"` を検出。

`check_all` は **46 → 47** ガード。

## 作業中の事故を1件（自分で検出・修復）

否定テストで `ahk` を元に戻す際、`countries:'China'` という文字列で置換したところ
**ファイル内で最初に一致した `hak_cn`（客家語）のレコードを書き換えて**しまった。
直後に `git diff` を確認して発見し、レコード単位で位置を特定する方式に切り替えて両方を修復。
最終的な diff は4行の入替のみで、`hak_cn` は元のままであることを確認済み。
