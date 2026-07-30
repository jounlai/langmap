# Wordmap review #430 — 全言語メタ情報の厳格監査ラリー

## 目的

オーナー要望「言語のメタ情報、翻訳についてもレビューラリー」の**メタ情報**フェーズ。
全 WordMap 言語エントリの **family / countries / speakers / coordinate / vitality /
iso6393 / script / name / 英語description の事実性** を、語族マクロで 28 シャードに分割し、
各シャードを辛口レビュー → 独立エージェントが**敵対的検証**（DEFAULT REJECTED）。

- 規模: 300+ エージェント / 検証 304 件（**CONFIRMED 247 / REJECTED 57**）。
- 重複除外後 **150 件確定**（単一値 97 / 記述 53）。
- ※ セッション終了で 2 度中断 → journal / agent-transcript から確定分を復元して適用
  （[[workflow-harvest-recovery]]）。WSL メモリを 9→16GB に増設し再発防止。

## 適用済み（コミット 5d92969 / 10f12cc / f84412e / ece99a3）

### Phase 1 — 単一値クリーン（36件）
countries 20（gym +Costa Rica, acu +Peru, sum +Honduras, car +ギアナ三国等, rue +6か国,
kde +Mozambique, ess +Alaska, zne +DRC/CAR, ruq +N.Macedonia, mzh +Bolivia/Paraguay,
bru +Laos, anu +S.Sudan, bft +Ladakh, rwk Meru≠Pare, mfe rcf/crs 混同除去, dge Degema≠Bonny,
arp/pqm/mlq 切れた文字列修復, fi Sweden≠Estonia）／ family 7（lrc SW-Iranian, mam Mamean,
awa Central-IA, kab Berber≠Zenati, bsq Kru-Western, lue Chokwe-Luchazi, sik 造語clade削除）／
coordinate 6（hit→Hattusa, myn→Tikal, dge→Degema, uun→Puli, rwk→Mt Meru, tig→Barka）／
speakers 2（mai ~34M, rwk ~190–200K）／ iso6393 1（osu→osn）。

### Vitality — 系統バグ2件を根治 + UNESCO上書き
1. **parseSpeakerCount のレンジ解析バグ**: 「~4–5M」を 4（＝4人）と誤読（enダッシュで
   単位が外れる）→ レンジ表記の全言語が過小評価され偽の危機判定。単位付き数（レンジ上限）を
   採用するよう修正。**40言語**の vitality を是正（bm/bxk/cak/kjb/rwk/pms… が
   critically-endangered から解放）。
2. **fragmentary→extinct の取り違え**: 'fragmentary' は**語データが断片的**という意味で
   言語が死語という意味ではない。話者プローズが死語/休眠/0 でない限り話者数から導出するよう
   バックフィルを修正。**生きている8言語**（itl, ykg, yag, roo, kky, nmn, trm, nej）を
   extinct から解放。歴史/典礼/再構言語は正しく extinct のまま。
3. **明示 vitality 上書き 14件**（count-safe が UNESCO/自記述より楽観的なもの）:
   krl/mdf/myv/wa/eml/pms/csb → definitely-endangered；nv/mi/cab/cak/mzn/thr → vulnerable；
   tji → severely-endangered。

### iso6393 — 誤ISO 6件
yag→yai（yag=Yamdena）, oma→omy（=Omaha-Ponca）, occ→ocm（=廃止Occidental）, cqu→qwc,
bvu→sdo, fa（pes→fas＝Persianマクロ言語）。エントリキーは変えず明示 iso6393 を付与（語データ不変）。

### Phase 4 — 新形式（ダブルクオートキー）エントリ
acw（Hijazi Arabic）: 記述は既に Hijazi/Saudi/11M に修正済みだったが**同定フィールドが全て
Omani のまま**という内部矛盾 → name/native/座標(Muscat→Jeddah)/speakers(~11M)/countries
(Saudi Hejaz)/official/scriptTags(Arabic) を一括是正。ar_ps・ar_jo: 語形はアラビア文字なのに
script:Latin → Arabic。cro 座標 47.5→45.6。qxs 話者 ~0.8–1.5K→~80–100K（桁誤り）。
zdj ~800K+Mayotte→~800K Grande Comore。khw ~50–80K→~300–380K。gon family Central→South-Central。

## 保留・次フェーズ

### 記述（description）53件 → **翻訳ラリーで対応**
英語 description の事実誤り/誇張（abq母音数, adi Galo, akb "four"→six, ame Peru,
amw Sūret帰属, cho音節文字, ii文字数, kr声調数, kry名詞クラス, fa "unchanged"誇張,
en_in/en_south 誇張, es_sgl b/v, luz Northern/Southern取り違え, max Papuan, wls Tongic 他）は
**19言語すべてへの伝播**が必要なため、約束済みの**翻訳（多言語訳の忠実性）ラリー**に統合して
Workflow で一括適用予定。あわせて srr（Cangin→Fula-Serer）, kam（E70→E.50）, cja（(cam)→(cja)）,
cnd（prose の cnd/cng）も記述テキスト修正として同フェーズで扱う。

### 構造変更・要判断で保留
- **iso 構造**: cnd→cng（自記述 prose と連動）, lrr（luz Southern Luri の重複）,
  onn（ono Onondaga の重複）— キー改名/マージ判断が必要。
- **speakers 要判断**: fr_lu（Luxembourg固有の数値）, jya（85–100K vs 35–40K 整合）,
  psi, tkl, rki（どちらの数値を採るか）。
- **name**: yuy（native がウイグル文字の誤り。東部裕固語＝モンゴル系の正しい自称形が要調査）。

## 所見
- 誤りは (1) 話者数レンジのパーサ桁落ち、(2) fragmentary の死語誤判定、という2つの**系統バグ**に
  集中していた。個別パッチではなくロジックを根治（[[hanmap-deterministic-checkers]] の方針）。
- 内部矛盾（フィールド vs 自記述）が多数（acw 一式, countries の第2国欠落, vitality vs 記述）。
- **重要な発見**: エントリに3つのキー書式（`LANG_DATA['x']` / `LANG_DATA["x"]` /
  data.js の quoted JSON）が混在。単一引用アプライヤは新形式を取りこぼす → 監査ツールは両対応必須。
