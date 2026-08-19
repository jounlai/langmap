# Review 437 — ラリー1／横断整合（新3語 red・fish・three）

**日付:** 2026-08-19
**対象:** `words/red.js` `words/fish.js` `words/three.js`（各1,151セル）
**手法:** LLM ラリーではなく**決定的チェッカー**を新造。ある言語行にとって
「他の32概念」がその行の作法を定義する、という前提で新3語を突き合わせた。
成果物は [`tools/cross_row_consistency_check.js`](../tools/cross_row_consistency_check.js)
として恒久設置（引数なしで全35概念を相互監査、語名を渡せばその語だけ）。

検出する3クラス:

| クラス | 判定 |
|---|---|
| `script` | セルの文字体系 ≠ その行の多数派文字体系 |
| `tone` | 行が声調字母を付ける習慣（≥70%）なのに無い／付けない行（0%）なのに有る |
| `dup` | 同一行内で別概念と表記が完全一致（コピペの兆候） |

日本語の漢字＋かな、韓国語のハングル＋漢字は**設計上の混在**なので1体系として扱う
（この統合前は偽陽性が118件中94件を占めた）。

## 結果：129件検出 → 122件修正

### script 92件 → 7件（うち5件は保留、2件は仕様）

新語だけ別の文字体系で書いてしまった行を全面的に是正。代表例:

- **Cyrillic ↔ Latin の取り違え** — `enf` Forest Enets（行は Latin: ŋoʔ, sizi）に
  キリル、`yux` Kolyma Yukaghir（行はキリル）にラテン、`ale` Aleut、`ess` Central
  Siberian Yupik、`yuy` Eastern Yugur、`kry` Kryts、`yug` Yugh、`wbl` Wakhi、`yai` Yaghnobi
- **Syriac 行に Hebrew/Latin** — `arc` Aramaic の3セルがヘブライ文字、`tru` Turoyo の
  3セルがラテン。いずれもシリア文字へ
- **音節文字を落としていた** — `cr`/`crk` Cree の red・fish がラテン（行はカナダ音節文字）
  → ᒥᐦᒁᐤ / ᑭᓄᓭᐤ
- **Tifinagh 行にラテン** — `shi` `rif` `tzm` `tmh` の Berber 4行 × 最大3セル
- **Devanagari 行にラテン** — `kru` Kurukh、`tdh` Thulung、`gon` Gondi
- **楔形文字行にラテン** — `akk` red、`hit` fish、`elx` three
- **単純な取り違え** — `lis` Lisu の three に**彝文字 ꌦ** を入れていた（行はラテン）。
  `bfq` Badaga・`iru` Irula はラテン行にカンナダ/タミル、`haj` Hajong はラテン行にベンガル

### tone 40件 → 3件

行が声調を付けるのに新セルに無い（`bo` `za` `hmn` `kac` `ahk` `kjp` `pcc` `nxq` `ium`
`tji` `yiz` `hni` `blt` `tyz` `nut` `lhm`）／行が付けないのに新セルに有る（`lhu` `sukh`
`mtq` `qxs` `duu` `ers`）の双方向。行の作法に揃えた。

### dup 25件 → 実害12件を確認、うち3件修正

同一行の別概念と表記が一致した25件を1件ずつ検分。**大半は本物の同音異義**だった:

- ノルウェー語 `tre` = three / tree、英語系クレオール `tri` 同様（no, nn, pcm, bi, tcs）
- アイヌ語 **レ** = three / name（有名な同音）
- ベトナム語（南部）**ba** = three / father
- チベット・ビルマ諸語の **ŋa** = fish / I（*ŋa の二重語源、duu・mro・adi）
- イングーシ語 **цӏе** = fire / red（火からの派生）、レズギ語 **гъед** = star / fish（多義）

修正したもの:

- `abe` Western Abenaki の three が two と同じ **nis** → **nas**（2は nis、3は nas）
- `bzh` Mapos Buang の three が two と同じ **luu** → **lo**（Central Buang l̪ɔː）
- `kru` fish の IPA にタイバーが残存 → ベア表記へ

## 保留（7件）— 理由付き

| 行 | 内容 | 保留理由 |
|---|---|---|
| `cja` Western Cham ×3 | 行はアラビア文字、新セルはラテン | Cham 用アラビア文字の正書法を確実に書き起こせない。誤った文字列は不一致より悪い |
| `cjm` Eastern Cham ×2 | 行はチャム文字、新セルはラテン | 同上 |
| `tca` Ticuna ×3（tone） | 行は全25セルに声調、新3セルに無し | Ticuna の声調は出典（数詞DBは to³ma⁵ʔẽ¹ʔpɨ¹ 形式）と行の Chao 字母表記の対応が取れない。捏造しない |

`ja_aom` の あがい／さがな は**仕様**として除外。方言形をかなで書くのは
`good` の ja_hak よか・ja_osa ええ と同じ既存作法（[[rally-dialect-false-positives]]）。

## 副産物：既存32語にも同じ欠陥が19件

チェッカーを全35概念に向けると、**今回の3語以外に script 19件・tone 61件**が出る。
本ラリーの対象外なので手を付けていないが、代表例:

- `za` Zhuang — water/fire/sun/moon/mother/love/house/one の8セルが古壮字（Sawndip）、
  残りはラテン。行としてどちらを主とするかが決まっていない
- `blt` Tai Dam の i・name、`khb` Tai Lue の i、`kho` Khotanese の i がラテン（各行は固有文字）
- `kaa` Karakalpak の tea がキリル（行はラテン）、`haj` Hajong の cuckoo がベンガル文字
- `lzz` Laz の cuckoo、`shi` Tashelhit の tea、`yue` の atsign

**方針質問（言語非依存）**: 二重文字体系を持つ言語（Zhuang の Sawndip/ラテン、Cham の
アラビア/チャム、Tai Dam の TaiViet/ラテン）で、**行の主表記をどちらに固定するか**。
現状は概念ごとに揺れている。決めれば残り19件は機械的に片付く。
