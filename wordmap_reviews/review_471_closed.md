# Wordmap data review #471 — 歴史行・祖語形（proto-forms / 古代語）

> 直近追加の歴史行・祖語形レビュー（レビューラリー 2026-09-06、5スレッド並列の1本）。
> commit `5bae4c05`/`227cdb26`/`8fd5d77a`/`1fa2c05e`。適用3件（round-1: ptrk rain / round-3: ojp wine, xct wheel）。

## Reviewer self-introduction (ペルソナ自己紹介)

歴史音韻レビュワー。上古/中古漢語は Baxter–Sagart・鄭張、Sino-Tibetan は STEDT/Matisoff・Coblin、Mongolic は Nugteren、Turkic は EDAL/Wiktionary 層、古典チベット語は Wylie/Hahn、上代日本語は Frellesvig・Vovin・大野『時代別国語大辞典』を主軸とする。再構は宣言された出典と行内表記の双方に照らして読み、捏造・時代錯誤を厳しく指摘し、データが宣言出典によく従っていれば自説を撤回する。

**Scope:** words/*.js の歴史/祖語セル（proto-*、zh_han/zh_tang/…、ojp、xct 等）と繁体字修正。

## Issues found

### 1. 「子孫から読み取った5祖語形」— 捏造疑い（最優先）
- ptrk wind `*jẹl` / pmng wind `*salkïn` / pmng honey `*bal` / p_sit milk `*s-nəw` / p_sit wind `*qV-lij` の真正性。

### 2. ojp「wine」酒 — 甲乙未反映（MED）
- **Current:** `["酒","sake"]`
- **Why:** 上代日本語 酒 は sake₂（乙類 e）。IPA が甲乙を反映していない。

### 3. xct「wheel」— register 不一致（MED）
- **Current:** `["འཁོར་ལོ","kʰorlo"]`
- **Why:** 現代ラサ音。行内の文語形（honey `sbraŋ rtsi`、wine `rɡun tɕʰaŋ`）と register が食い違う。

### 4. ptrk「rain」— 慣習/自IPA不整合（LOW）
- **Current:** `["*yag-","jaɣ"]`
- **Why:** surface が y- だが行の慣習は j-（wind `*jẹl`、hundred `*jǖz`）、IPA も jaɣ。

### 5. 繁体字→簡体字修正・p_sit ラベル
- 齒/烏/儂 の trad→simp、11 PAIRS の検証。p_sit が「PST」表記だが実体は PTB。

## Worker round-1 response (作業者ラウンド1)

- **#1 — 捏造ではないと確認.** 5祖形は Wiktionary の `{{inh}}`（子孫の継承テンプレ）から harvest した公刊再構。clearance。
- **#4 ptrk rain — APPLIED（`f4b144dc`）.** `*yag-`→`*jag-`（行慣習＋自 IPA jaɣ）。
- **#2 ojp wine — HELD.** データ内に OJ 甲乙表記の前例が無いと判断（→ round-2 で誤りと判明）。
- **#3 xct wheel — HELD.** 文語 IPA の a-chung 実現が不確実。
- **#5 — 繁簡修正・PAIRS 正確と確認。p_sit ラベルは系統的判断として据置。**

## Reviewer round-2 response (再評価 round-2)

- #1 5祖形・#5 繁簡 — ✓ CLOSED。#4 ptrk rain — ✓ CLOSED（live `["*jag-","jaɣ"]`）。
- **#2 ojp wine — ✗ PUSH BACK（出典あり）.** Worker の前提は誤り。ojp 行は甲乙を実表記している：i₂=**ï**（月 `tukï`）、o₂=**ə**（心 `kəkərə`・木 `kə`・雨 `amə`）、甲=下付き**₁**（与之 `jo₁si`）、直接の並行例 e₂=**「ey」**（家 `ipey`=ipe₂）。酒=sake₂ → **`sakey`**。出典：大野『時代別国語大辞典』、Frellesvig (2010)。
- **#3 xct wheel — ✗ PUSH BACK（軽微）.** a-chung は無音素なので追加不要、行の文語式（実子音のみ表記）に合わせ音節間スペースのみ：**`kʰor lo`**（Wylie: ʼkhor lo）。
- #5 p_sit ラベル — △ ACCEPTED（据置）。

## Worker round-3 response (作業者ラウンド3)

- **#2 ojp wine — APPLIED（`09027718`）.** データで検証（家 `ipey`／月 `tukï`／心 `kəkərə`／与之 `jo₁si` を確認、酒 `sake` のみが乙類 e の例外）→ `["酒","sakey"]`。
- **#3 xct wheel — APPLIED（`09027718`）.** `["འཁོར་ལོ","kʰor lo"]`。

**File status: CLOSED** — 適用3件（ptrk rain, ojp wine, xct wheel）、5祖形 clearance、繁簡 confirmed、p_sit ラベルは承認据置。
