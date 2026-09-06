# Wordmap data review #474 — 高リスク歴史/祖語言語（p_sit, h_vedic, xqa, xpu, xct, wuu）

> 直近追加の高リスク歴史/祖語言語を全概念横断でレビュー（レビューラリー 2026-09-06、5スレッド並列の1本）。
> 適用3件（round-1: h_vedic earth, xqa thanks / round-3: xqa cat）。

## Reviewer self-introduction (ペルソナ自己紹介)

歴史/祖語レビュワー。シナ=チベット祖語再構（Benedict *STC*, Matisoff *Handbook of PTB*/STEDT）、テュルク文献学（Clauson *EDT*, Kāshgarī *Dīwān Lughāt al-Turk*）、北西セム（フェニキア/ポエニ碑文と *Poenulus* 転写）、古インド・アーリア（ヴェーダ vs 古典、RV アクセント）を守備範囲とする。出典に紐付く指摘のみ主張し、データが宣言出典によく従っていれば自説を撤回する source-first 主義。

**Scope:** p_sit（Proto-Sino-Tibetan）, h_vedic（Vedic Sanskrit）, xqa（Karakhanid）, xpu（Punic）, xct（Classical Tibetan）, wuu（Wu）。lang_words は生成物のため source の `words/*.js` を照合。

## Issues found

### 1. p_sit「black」— PST 再構との不一致疑い（MED）
- **Current:** `["*nək","nək"]` → `*(s-)nak`（母音 a）ではないか。

### 2. xqa「cat」— 後代/口語形疑い（MED）
- **Current:** `["piši","piʃi"]` → DLT は çätük ではないか。

### 3. xqa「thanks」— 語義不一致（MED）
- **Current:** `["tabug","tabuɡ"]` → tabuğ は「奉仕/崇敬」で 'thanks' ではない。

### 4. h_vedic「earth」— visarga 誤植（LOW）
- **Current:** `["भूमिः","bʱuːmɪħ"]` → 他セルは `ɦ`（aːpaɦ, aɡniɦ）。

### 5. 低/様式（LOW）
- xpu 母音がヘブライ式（Punic でない）／wuu drink `喝`（慣用は吃）／xct IPA register 混在／h_vedic v~ʋ 揺れ。

## Worker round-1 response (作業者ラウンド1)

- **#4 h_vedic earth — APPLIED（`f4b144dc`）.** `ħ`→`ɦ`（行内整合）。
- **#3 xqa thanks — APPLIED（`f4b144dc`）.** `["tabug","tabuɡ"]`→`["—","—"]`（誤義の除去）。
- **#1 p_sit black — HELD.** Wiktionary `Reconstruction:Proto-Sino-Tibetan/s-nak` が HTTP 404。未検証の再構形を別の未検証形に置換しない。
- **#2 xqa cat — HELD.** piši が誤りと確証できず（pišik は広域で period-valid の可能性）。
- **#5 — 様式判断として保留。**

## Reviewer round-2 response (再評価 round-2)

- **#4 earth / #3 thanks — ✓ CLOSED.** thanks は Clauson *EDT* 785b で tapuğ='service/worship/reverence'、Karakhanid に語彙化した 'thank-you' は無い。blank が誠実。
- **#1 p_sit black — △ ACCEPTED（自説を撤回）.** Worker の HELD が正しかった。Wiktionary のチベット語 ནག་པོ *nag-po* が「From Proto-Sino-Tibetan **\*nək**」を継承 → マップは子孫の `{{inh}}` を忠実に読んでいる。私が挙げた `*nak`(a) は Benedict/Matisoff の PTB 母音、`*nək` は Wiktionary の PST 再構。**出典モデルの差**でありデータ誤りではない。`*nək` のまま。（`/s-nak`・`/nək` の直接ページは 404 だが、ནག་པོ の live 継承属性が `*nək`。）
- **#2 xqa cat — ✗ PUSH BACK（出典あり）.** Clauson *EDT* p.402b s.v. **çetük** 'cat' が Kāshgarī *Dīwān*（Karakhanid コーパス）に直接実証。piši/pişik は pre-13c コーパスに無く後代口語（擬音語）。適用形：行の č/š háček 慣習（cf. ič-, ığač, üč）に合わせ **`čätük` / `tʃætyk`**。
- **#5 — 据置で妥当。**

## Worker round-3 response (作業者ラウンド3)

- **#2 xqa cat — APPLIED（`09027718`）.** 行慣習を確認（ič-/itʃ, ığač/ɯɣatʃ, üč/ytʃ ＝ č háček）→ `["čätük","tʃætyk"]`。
- **#1 p_sit black — 据置（レビュワー撤回、`*nək` は出典忠実）。**

**File status: CLOSED** — 適用3件（h_vedic earth, xqa thanks, xqa cat）、p_sit black は出典忠実として据置、低/様式項目は据置。
