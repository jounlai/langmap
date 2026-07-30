# Wordmap review #429 — 全データ総ざらいレビューラリー（5並列 × 5巡）

## 目的

オーナー要望により、WordMap の**全データ**（1,138 言語 × 30 語 ≈ 34,000 セル）を
総ざらい監査。「5スレッド同時進行 × 5回繰り返し」。

## ラリー

Workflow: 語族マクロで **26 シャード**に分割。各ラウンドで全シャードを並列レビュー
（＝並列レーン）→ **敵対的検証**。ラウンド間で **セル単位に重複除外**し、取りこぼしを
5巡で積み上げ。誤検出対策として house-style（方言音韻保持・単音節の強勢なし・zh 簡繁の
別・再構形除外・実験的部分語の空欄許容）をレビュー指示に組込み。

- 規模: **181 エージェント / 約 3.78M トークン / 全5巡完走**。
- **51 候補 → 30 CONFIRMED**（敵対的検証通過）。
- 精査の結果 **19 件を適用、11 件を保留/非採用**（[[review-vs-manual-fixes]]
  [[rally-dialect-false-positives]] の方針で、確信できないもの・手作業と衝突するもの・
  方言音声の微差は適用しない）。

## 適用（19セル）

| コード | 言語 | 語 | 修正前 | 修正後 | 種別 |
|---|---|---|---|---|---|
| bn | Bengali | cuckoo | পাতি পাপিয়া | কোকিল | 種名→主流語（koel、hi कोयल と同源）|
| pi | Pali | good | सुन्दर (=美しい) | साधु | 語彙取り違え（pi_edu の kusala が傍証）|
| pmh | Maharastri Prakrit | good | सुंदर (=美しい) | साहु | 同上（sādhu の Prakrit 反射）|
| osp | Old Spanish | good | bono | bueno | 古スペイン語標準形 |
| rmf | Kalo Finnish Romani | cat | baari mačka (=大きい猫) | mačka | 修飾語除去（rom/rmy と一致）|
| lad | Ladino | dog | pero (=but と同綴) | perro | 綴り（IPA /pero/ は震え r のまま）|
| bqi | Bakhtiari | tree | تو | دار | 語彙取り違え（dâr=木、汎イラン）|
| bqi | Bakhtiari | good | خاص (=特別) | خو | 語彙取り違え |
| tg | Tajik | dopamine | Дофамин | дофамин | 普通名詞の大文字→小文字 |
| el_kath | Katharevousa Gk | computer | υπολογιστής | ὑπολογιστής | 気息記号（多音調正書法に統一、ὕδωρ 等と整合）|
| luz | Southern Luri | thanks | تشکر /tʃɑkər/ | /tæʃæˈkːor/ | IPA（tašakkor、綴りと不整合を修正）|
| ofs | Old Frisian | water | wetir /vetiɾ/ | /wetir/ | IPA（w=/w/、語末 r）|
| bra | Braj | drink | पीबौ /piːbɔ/ | /piːbaʊ/ | IPA（ौ=au）|
| tcs | Torres Strait Creole | tree | tri /tʃɾi/ | /tri/ | IPA |
| pll | (Shan/Bola) | you | miʔ /mɛʔ/ | /miʔ/ | IPA（綴り i と不整合）|
| pjt | Pitjantjatjara | two | kutjara /kucaɾa/ | /kucaɻa/ | IPA（単一 r=反り舌接近音）|
| nys | Nyungar | name | kwerl /kwɛrl/ | /kwɛɻl/ | IPA（反り舌）|
| aer | Eastern Arrernte | father | arrweke | akngeye | 語彙取り違え（アレンテ標準）|
| aer | Eastern Arrernte | mother | mama | meye | 語彙取り違え |

## 保留・非採用（11セル）

**手作業と衝突 → 非採用**
- **xlu (Luwian) hand**: 提案は象形文字→ラテン翻字への退化。[[review-vs-manual-fixes]]
  の「Luwian にヒエログリフを戻す」既存の手作業と衝突。非採用。

**確定訳が得られず → 非採用**
- **tiw (Tiwi) hello** `ngirramini`（=物語/歌で誤り）: 確実な挨拶語が見つからず保留。

**方言音声の微差（churn 回避）→ 非採用**
- **en_au (Australian Eng) I** /ɑɪ/→/ɑːe/、**wbp (Warlpiri) two** /ɟiɾama/→/ciɾama/:
  いずれも許容範囲の転写差。

**要追加検証で保留（低リソース言語・断片言語・複雑正書法）**
- **rue (Rusyn) hello** `Здраво`: 南スラブ的で怪しいが、正しい日常挨拶が未確定
  （Добрый день 等が主流の可能性）。提案 Витай は確証できず保留。
- **hui (Huli) one** `mendene`→`mbira`、**aer sun** `arrenge`→`uterne`、
  **adt (Adnyamathanha) father/mother**（提案 vapi に /v/ で要確認）、
  **cms (Messapic) father** `ana`→`—`（断片言語、削除は要確認）、
  **pal (Middle Persian) love**（パフラヴィー文字の綴り、要確認）。

## 所見
- 全データ5巡でも確定は 30 件（誤り率 ~0.09%）と、データは総じて非常に堅牢。
- 誤りは (1) 種名/修飾語など「概念のズレ」、(2) 綴り/大小文字、(3) 反り舌 r・気息記号など
  正書法連動の IPA、に集中。豪州先住民諸語の親族語・IPA と、断片/低リソース言語に残課題。
- 保留分は追って一次資料で個別確認する。
