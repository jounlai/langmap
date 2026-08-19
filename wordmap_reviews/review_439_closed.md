# Review 439 — ラリー3／敵対的出典再検証（新3語）

**日付:** 2026-08-19
**対象:** `words/red.js` `words/fish.js` `words/three.js`
**方針:** **DEFAULT REJECTED**。ラリー1・2 が「書き方」を見たのに対し、本ラリーは
**その語形が本当にその言語のものか**を疑う。起草時に「語族パターンからの推定」と
自認したセルを名指しで洗い出し、まだ突き合わせていなかったパラメータに当てて
**反証を試みる**。一致しなければ資料側を採る。

## 手法上の修正：新語どうしの重複を見ていなかった

ラリー1の `dup` 検査は「新語 vs 既存32語」しか見ておらず、**新3語どうしの一致**が
素通りしていた。追加検査で4件検出、全て実害だった:

| 行 | 内容 | 処置 |
|---|---|---|
| `xav` Xavante | red = fish = `tebe` | fish が正（ASJP XAVANTE_2=tebe）、red を **iprẽ** に是正（ASJP XAVANTE=i\*prE） |
| `kmh` Kalam | fish = three = `kobsal` | fish が正（ASJP KALAM_2）、three を **omŋal nokom** に是正（数詞DB） |
| `kpf` Komba | red = fish = `kuring` | red が正（TNG Komba red=kuriŋ）、fish は出典なし → **空欄化** |
| `okz` Old Khmer | fish = three = `ត្រី` | fish が正、three は出典なし → **空欄化** |

## 反証の結果：13件を資料側に置き換え

「語族パターンから推定した」と自認していたセルを ASJP（red 1,456言語 / fish 5,588言語）と
数詞DB に当てた結果、**大半が反証された**:

| 行 | 語 | 起草値 | 資料 | 判定 |
|---|---|---|---|---|
| `bom` Berom | fish | chi | BEROM=tok | 反証 |
| `agq` Aghem | fish | chi | AGHEM_2=cixa | 反証 |
| `ekp` Ekpeye | fish | azụ（Igbo形） | EKPEYE=ukpa | 反証 |
| `izz` Izii | fish | azụ | IZI=ema | 反証 |
| `ets` Yekhee | fish | azụ | YEKHEE=eseri | 反証 |
| `ets` Yekhee | three | esa | Etsako=élà | 反証 |
| `iso` Isoko | fish | iyei | ISOKO=yei | 反証 |
| `iso` Isoko | three | esa | Isoko=ɪ́sa | 反証 |
| `ekp` Ekpeye | three | atọ | Ekpeye=ɓɨ́tɔ́ | 反証 |
| `lol` Mongo | fish | nse | MONGO=se | 反証 |
| `tll` Tetela | fish | nse | TETELA=se | 反証 |
| `rim` Nyaturu | fish | samaki（スワヒリ形） | NYATURU=somba | 反証 |
| `mev` Mano | fish | yi | MANO_MANN=gba | 反証 |
| `dnj` Dan | fish | yi | YAKOUBA=yu | 反証 |
| `wbt` Warnman | fish | kapi（＝water） | WARNMAN=ṭanpakariŋu | 反証 |
| `nmf` Tangkhul | fish | kha | TANGKHUL=kʰai | 精緻化 |

**「エド系5行に同じ azụ を入れていた」のが最大の失敗**。azụ は Igbo の語であり、
Ekpeye・Izii・Yekhee はそれぞれ ukpa / ema / eseri と全く違う。ラリー2の
「語族をまたぐ同形」検査は同一語族内のこの種のコピーを拾えない。

一方、**確認された**もの: `dur` Dii fish=zeʼ、`urh` Urhobo fish=eri、`ewo`/`bum` fish=kos、
`lua` fish=mushipa、`ium` fish=biauv、`ktz` fish=ǃʼau、`ahk` fish=nghasha、`tiw` fish=miputi、
`wbt` red=martarr、`nmf` red=kahunga、`rwk`/`bom`/`agq`/`dur` の three。

## 空欄化した2セル

現代語に「—」を置く際は理由が要る（review 434 の `ker` と同じ扱い）。

- `kpf` Komba **fish** — `dataStatus: fragmentary` の行。TNG は red と three しか
  持たず、fish のパラメータ自体が存在しない。red と同形を置いたままにするより空欄が正しい
- `okz` Old Khmer **three** — `historical-attested`。碑文語彙に確実な3の語形を当てられない。
  ត្រី（fish）をそのまま置いていたのは明白な誤り

いずれも `meta.unattestedReason` に `'unsourced'` を記録。

## 既存メタの疑義（本ラリー外・要判断）

`asu`（Asu, タンザニア）の `meta.iso6393` が **`asu`** になっているが、ISO 639-3 の
`asu` は**ブラジルの Tocantins Asurini**であり、タンザニアの Asu（Pare）は **`asa`**。
そのため ASJP を引くと Asurini（トゥピ語族）のデータが返り、fish に `ipira`、
three に `najrojhi` というブラジルの語が「一致」してしまう。

本ラリーではデータを触らず報告に留める。`asu` の語データ自体は既存25語ぶんが
別途入っているので、**ISO を直すと過去のレビューで引いた出典との対応も変わる**。
オーナー判断を仰ぐ（[[review-vs-manual-fixes]]）。

## 残る無出典セル

比較資料に一致行が無いセルは red 657 / fish 279 / three 371 だが、その大半は
方言行（`es_cr` `en_us` `ja_osa`…）・祖語・人工語・歴史段階で、親言語や再構の
体系から導けるもの。**独立した現代少数言語で、かつ推定形のまま残っているもの**は
`asu` fish/three（上記 ISO 問題のため保留）、`luy` `kr` `toc` `olk` `kmu` `nej` `srb`
`kdt` `blk` `mgo` など。次のラリーの標的として記録する。
