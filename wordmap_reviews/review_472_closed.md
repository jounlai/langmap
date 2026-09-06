# Wordmap data review #472 — 語彙A（black, honey, hundred, milk, wine, wheel）

> 直近追加の WordMap 概念ファイル群 A のレビュー（レビューラリー 2026-09-06、5スレッド並列の1本）。
> 適用2件（pmh hundred セル＋pmh 解説の連声記述を19UI言語で是正）。

## Reviewer self-introduction (ペルソナ自己紹介)

インド・アーリア語および深層歴史層のレビュワー。中期インド語（プラークリット反射形・パーリ・ヴェーダ/サンスクリット）を中心に、祖語行と古代文字セル（トカラ・シナ=チベット・セム楔形/アブジャド・古テュルク・ルーン）を担当。Pischel *Grammatik der Prakrit-Sprachen*、Turner *CDIAL*、Wiktionary の反射連鎖、STEDT、Adams *Dictionary of Tocharian B* に依拠し、IPA を拘束条件として出典が保証しない語形は綴らない。

**Scope:** `words/{black,honey,hundred,milk,wine,wheel}.js`（直近追加の歴史/祖語セル中心）。

## Issues found

### 1. hundred `pmh` — 音則違反（MED）
- **Current:** `["सद","sada"]`（[hundred.js:103](../words/hundred.js#L103)）
- **Expected:** `["साअ","saa"]`
- **Why:** マハーラーシュトリーは母音間無声閉鎖音を**脱落**させる（śata → sa-a）。sada はシャウラセーニーの有声化（-t->-d-）を誤って適用したもの。Wiktionary の śata マハーラーシュトリー反射形は 𑀲𑀅 (saa)。

### 2. pmh 解説の連声記述 — 事実誤り（MED・根本原因）
- **Current:** meta description が「`*p > v, *t > d, *k > g`」を Maharashtri の最も広範な連声と記述。
- **Why:** `*t > d`/`*k > g` はシャウラセーニーの有声化。マハーラーシュトリーの特徴は**脱落**（`*t, *k → ∅`、`*p → v`）。19 UI言語すべての description に波及。

### 3. spot-checks（LOW）
- qwc milk `ñukñu`（「甘い/母乳」vs 一般語 ñuñu）／okz wheel `cak`（現代 -r 脱落 vs アンコール期）／ojp wine `sake`（乙類）／kaw honey `madu`（表記 madhu との不一致）。

## Worker round-1 response (作業者ラウンド1)

- **#1 hundred pmh — APPLIED（`f4b144dc`）.** Wiktionary で 𑀲𑀅 (saa) を確認 → `["साअ","saa"]`。
- **#2 pmh 解説 — APPLIED（`965f465a`）.** 全 19 UI言語で「`*p>v, *t>∅, *k>∅`」に是正（∅ は言語横断の記号で翻訳不要、Arabic 散文形も対応）。スコープ確認：`*t > d` は pmh 以外に出現しない（Sauraseni 等で正しい箇所を誤変更しない）。
- **#3 spot-checks — HELD.**（有効形の可能性、または dataset 横断の歴史読み慣習が未整備。ojp wine は #471 スレッドで扱い round-3 適用。）

## Reviewer round-2 response (再評価 round-2)

- **#1 hundred `सद→साअ` — ✓ CLOSED.** 母音間 -t- 脱落が正、sada はシャウラセーニー型の誤用。IPA "saa" は surface を正しく転写。
- **#2 pmh 解説 `*t>d→*t>∅` — ✓ CLOSED.** これが真の根本原因。全 UI 是正で同種誤りの再発を防ぐ。wine `सुरा`/rain `वुट्ठि`/iron `लोह` は -r-/-h-/クラスタで影響なし。
- **#3 — △ ACCEPTED（据置）.** qwc milk は辞書に breast-milk 語義で ñukñu 収録あり（ñuñu が一般語だが劣化回避で据置）。okz/kaw は各々 dataset 横断の慣習が必要。
- 新規なし。

**File status: CLOSED** — 適用2件（hundred セル＋pmh 解説19UI）、spot-checks は承認据置。
