# Wordmap data review #473 — 語彙B（you, wind, tooth, iron, rain, bear）

> 直近追加の WordMap 概念ファイル群 B のレビュー（レビューラリー 2026-09-06、5スレッド並列の1本）。
> 適用0件（全て承認据置または clean）。

## Reviewer self-introduction (ペルソナ自己紹介)

歴史比較言語学レビュワー。Sinosphere（Sinitic 方言学・中古漢語韻図再構・日琉/韓の周縁）を中心に、オーストロネシア・印欧・中期インド語も守備範囲。Sinitic の表記・声調は MOE 臺灣台語常用詞辭典、Wiktionary の方言同義表、小學堂/MCPDict 同音字表、閩南方言大詞典に、Formosan/Philippine は ILRDF・Wolff/Topping/Jensen に、Indic 祖形は Turner CDIAL と `{{inh}}` 連鎖に照らす。IPA を load-bearing とし、出典なしは「—」。

**Scope:** `words/{you,wind,tooth,iron,rain,bear}.js`。

## Issues found

### 1. nan「you」— 閩系内の用字不一致（MED）
- **Current:** `["你","li˥˧"]`（[you.js:195](../words/you.js#L195)）
- **Observation:** 同閩系は語源形 `汝`（nan_xm/nan_zz `汝 li˥˧`、nan_qz `汝 lɯ˥˥`、nan_pn `汝 lu˥˧`、cpx `汝`…）。

### 2. rain pmh / wind p_sit（LOW）
- rain pmh `वुट्ठि` が pi と完全一致／wind p_sit `*qV-lij` の出典確認。

### 3. 他 — clean
- tooth の 齒/齿 trad→simp と 齒/khí(有気) vs ki(無気) の Hokkien/Teochew 分岐、you の wuu `儂→侬`・nan 声調 li˥˩→li˥˧、iron の +19 Formosan/Philippine セル、bear の cop `ⲗⲁⲃⲟⲓ`・kaw `ꦧꦂꦮꦁ` などは各行出典付きで妥当。

## Worker round-1 response (作業者ラウンド1)

- **#1 nan you — HELD.** MOE 臺灣台語辞典は lí の推奨用字に `你` も挙げるため、台湾側の地域慣習として据置（意図確認としてフラグ）。読み li˥˧ は正しい。
- **#2 — 情報提供として受領.**（pmh hundred は別スレッド #472 で修正済み。）
- **#3 — 変更不要と確認。**

## Reviewer round-2 response (再評価 round-2)

- **#1 nan you 你/汝 — △ ACCEPTED（押しを撤回）.** これは誤りではなく trad/simp と同種の**地域別用字慣習**（台湾 nan=MOE 用字 你／大陸 nan_xm/zz/qz=辞書慣習 汝）。読み li˥˧ は両側同一・正しく、音韻的争点なし。閩系内で字を強制統一するのは実在の慣習を上書きする。任意で nan 行に「MOE 用字」の一行コメントを付ければ自己文書化になる（欠陥ではない）。
- **#2 — ✓ CLOSED.** rain pmh=pi は Skt vṛṣṭi > vuṭṭhi の正当な中期インド語共有反射。wind p_sit `*qV-lij` は Burmese လေ の `{{inh}}` 連鎖で追跡可能。
- 新規なし。6ファイル全て pass（捏造なし、慣習一貫、IPA と surface 一致）。

**File status: CLOSED** — 適用0件、nan you は地域慣習として承認、他は clean。
