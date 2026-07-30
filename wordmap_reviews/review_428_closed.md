# Wordmap review #428 — 再構祖語エントリの「厳格」メタ監査

## 目的

最近追加した **21 の再構祖語**（reconstructed-proto）の**言語エントリのメタ情報**を、
オーナー要望により**非常に厳格に**監査した。#426 は再構「語形」を検証済みなので、
今回は未監査だった **年代 (period) / 故地 (countries) / 語族分類 (family) / 座標 / 母語名
(native) / 英語 description の事実性・誇張**が対象。

対象コード: paus, psem, pura, pdr, pban, pst, pafa, pkar, pmay, puaz, paa, pkd, phm,
ptrk, pmng, ptg, pjp, pko, ine, pry, pjk。

## ラリー

Workflow: 祖語ごとに1エージェント＝辛口の歴史言語学レビュアーが年代・故地・語族・記述を
精査 → 各指摘を独立エージェントが敵対的検証（CONFIRMED は本物の誤り・誇張・重大な不正確
のみ）。計 70 エージェント / 約 1.0M トークン。**49 件提起 → 33 件 CONFIRMED**。

## 適用済み（このコミット）— 単一値メタ

### native 欄（全 21 件）
全祖語の `native` に「水」等の再構語（例 ptrk `*sub`, pmng `*usun`, ptg `*mū`, pjp
`*midu`, pkd `*naːm`, pafa は破損 `*Vfroasiatic`）が言語名の代わりに入っていた。祖語に
自称はないため、**`native` = 各祖語の学名**（例 Proto-Turkic）に統一。版図カード・言語
モーダル・地図の native 表示が正しくなる。

### 座標（2 件）
- pban 6,12 → **6,10**（6,12 は内陸カメルーン。Grassfields 故地は西部・ナイジェリア国境寄り）
- pkd 23,110 → **21.8,110**（内陸広西 → 「華南沿岸」の記述に合わせ沿岸へ）

### 語族分類（1 件）
- pjk family `Japonic (proposed Japonic-Koreanic)` → **`Japonic-Koreanic (proposed macro-family)`**
  （日韓祖語は Japonic の**上位**ノードであり、Japonic 内の一員ではない）

### 年代フィールド（9 件、地図ラベル）
| code | 修正前 | 修正後 | 根拠 |
|---|---|---|---|
| phm | 25–20cBCE | **6–3cBCE** | 2500 **BP**(≈500 BCE) と 2500 **BCE** の取り違え（Ratliff 2010, Sagart 2004）|
| pmng | 1–13c | **9–13c** | 1c 開始は Para-Mongolic(鮮卑・契丹)を混入。Proto-Mongolic は中世モンゴル直前 |
| ptg | 3cBCE–5cCE | **1cBCE–5cCE** | フィールドと記述(「1千年紀CE」)の不一致解消 |
| pjp | 5cBCE–3cCE | **5cBCE–5cCE** | 日琉分岐(＝Proto-Japonic の終端)は1千年紀CE |
| pko | 5cBCE–7cCE | **1cBCE–7cCE** | 5cBCE 開始は深すぎ・自記述と矛盾 |
| pdr | 40–30cBCE | **35–25cBCE** | Kolipakam 2018 は根を ~2500 BCE と推定。「usually dated」は過大 |
| pst | 45–35cBCE | **55–35cBCE** | Bayesian 2 研究の古い方(~7500 BP)を含むよう拡幅 |
| paa | 40–30cBCE | **45–20cBCE** | Sidwell&Blench(~4000BP) / Diffloth(~5000BCE) の争点幅 |
| pkd | 25–20cBCE | **25–10cBCE** | 500 年幅は擬似精度。分散は3千年紀〜1千年紀BCE |

## 未適用・要検討として保留

### 意図的手作業との衝突（自動変更せず）— [[review-vs-manual-fixes]]
- **pjk 座標 38.5,134**: ソースに「Sea of Japan (symbolic — 両故地の中間)」という明示コメント。
  海上配置は意図的。監査は半島(38.5,127.5)への移動を推奨したが、手作業の意図を尊重し保留。
  （故地フィールド「Korean Peninsula / Manchuria」との不一致は残るため要判断）

### 誤検出
- **pafa period「100–75cBCE」を"破損"とした指摘**: 本アトラスは世紀BCE表記で 100cBCE=1万年前を
  意図的に許容（PERIOD_MIN_IDX=-100）。フィールド形式は正しい。→ 不採用。

### 記述 (description) の事実誤り・誇張 — 【記述フェーズで適用済み】
14祖語 × 19言語の記述を Workflow で修正（確定修正のみ最小限適用→JSON.stringify で
安全に差し替え、既存訳は保持）。あわせて pjk `speakers`（Bronze Age→Neolithic〜早期
青銅器）と ptg `countries`（eastern Siberia 削除→middle Amur basin）フィールドも修正。
対象と内容:
- **paus**: Dempwolff を Formosan ベース再構と誤記（実際は Malayo-Polynesian ベース。Formosan
  重視は Dyen/Blust 以降）。
- **ine**: 「schwa indogermanicum」を Schleicher に誤帰属（実際は Brugmann/青年文法学派。Schleicher
  は Stammbaum・*fable*）。「5 vowels」は過度の単純化（*e/*o アブラウト中心）。
- **pkar**: 「unrelated to any other」断定 → 「実証された同系関係はない（北コーカサス/ノストラ説は未証明）」。
- **pry**: Amami が娘言語一覧から脱落・「4 branches」誤り／*maja「猫」を確実な再構innovationと過大主張
  （借用・擬音の可能性）／*kimu の説明過大／Pellard(2015)の分岐年代の誤要約。
- **pjk**: 「Bronze Age Korea ~3rd millennium BCE」→ 3千年紀は新石器(櫛目文)。青銅器(無文土器)は ~1500–1000 BCE。
- **pmng/ptg**: period 変更に伴い記述prose の年代表現も要整合。
- **ptg 故地**: 「eastern Siberia」は後代の北方拡散。主流故地は満洲/中アムール → フィールド＋prose 修正。
- **pdr/paa/pkd/phm/pst 等**: 年代の「usually dated」等の確定調を緩め、フィールドと整合。

## 所見
- 誤りは (1) native 欄への語彙混入（系統的パイプラインミス）、(2) 座標と故地テキストの不一致、
  (3) 争点ある年代を確定調で提示、(4) 学史的帰属の誤り、に集中。
- 「とても厳しく」の要望どおり、過大主張・確定調・擬似精度も積極的に検出した。
