# Hanmap data review #79 — Thai (th) 漢字借用層

> 直近追加の Thai (th) 漢語借用層レビュー（レビューラリー 2026-09-06、5スレッド並列の1本）。
> 適用1件（話者数）。

## Reviewer self-introduction (ペルソナ自己紹介)

Sino-Thai / Kra-Dai レビュワー。Tai 諸語における漢語借用層と Thai 音韻（子音クラス×声調記号×音節型による声調導出、RTGS 転写、Tai 固有語 vs 上古/中古漢語借用の区別）を専門とする。Thai 語源は Manomaivibool (1975) *A Study of Sino-Thai Lexical Correspondences*、Pittayaporn (2009) *The Phonology of Proto-Tai*、Wiktionary の och/ltc 再構、Royal Society RTGS 1999 に照らし、話者数は Ethnologue で確認する。

**Scope:** `HAN_LANG_META.th` と 10 セル（二三四五六七八九十・馬）。commit `f92e61dd`/`16052fbd`/`d3dc5198`。

## Issues found

### 1. th `speakers` — 内部矛盾する話者数（P2）
- **Current:** `約6900万人 (L1) / 約8000万人 (L1+L2)`
- **Expected:** `約2700万人 (L1) / 約7100万人 (L1+L2)`
- **Why:** 69M を「L1」とすると Central Thai 母語話者・タイ人口を超える。Ethnologue 2024 (tha)：Central Thai L1 ≈ 27M、L2 ≈ 44M、総計 ≈ 71M。`speakersSource` は既に `Ethnologue 2024 (tha)` を宣言している。

### 2. 牛 — 非収録（据置確認・LOW）
- Sino-Tai 対応で借用説があるが係争中（しばしば固有 Tai / Austro-Tai 扱い）。「出典で帰属できる字のみ」の基準では非収録が正しい。指摘は「意識的な欠落」の確認のためで追加要求ではない。

### 3. 10 セル・メタ — clean
- 声調は全て子音クラス×声調規則と整合（二 ยี่=falling、五 ห้า=falling、六/七/八/十=low、九 เก้า=falling、馬 ม้า=high）。RTGS・タイ文字・IPA・語源帰属（一=固有 หนึ่ง で除外、龍=Skt makara で除外、潮州語借用は nan_th へ）すべて妥当。座標 15.87/100.99、family、sources、RTGS ブロック、18言語 i18n も健全。

## Worker round-1 response (作業者ラウンド1)

- **#1 話者数 — APPLIED（`f4b144dc`）.** Ethnologue 2024 (tha) の L1≈27M / 総計≈71M を web 検証のうえ `約2700万人 (L1) / 約7100万人 (L1+L2)` に修正。当該文字列はファイル内 `\u` エスケープ格納だったため、ファイル内で一意の ASCII 数字（6900→2700, 8000→7100）を置換した。
- **#2 牛 — 承認（据置）.** #3 — 変更なし。

## Reviewer round-2 response (再評価 round-2)

- **#1 話者数 — ✓ CLOSED.** live: `約2700万人 (L1) / 約7100万人 (L1+L2)`、`speakersSource: "Ethnologue 2024 (tha)"` と整合。L1 27M + L2 44M = 総計 71M。母語話者が人口を超える red flag は解消。押し戻しなし。
- 新規指摘なし。10 セル・メタは round-1 の通り clean。

**File status: CLOSED** — 適用1件（話者数）、他は clean / 承認据置。
