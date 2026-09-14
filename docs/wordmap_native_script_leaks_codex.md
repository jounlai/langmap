# 指示書: WordMap 「土着文字への変換漏れ（ラテン残り）」を解消する

**宛先:** Codex（外部モデル）
**発行:** 2026-09-14
**対象:** `/home/jounlai/langmap`（WordMap データ）

土着文字（非ラテン）で書くべき言語の一部セルに、ローマ字（ラテン）表記が残っている。
これを各言語の正書法（native script）に変換する。**表記フィールド（配列の第1要素）だけ**を
直し、**IPA（第2要素）は変更しない**。

---

## 0. すでに済んだ分（再作業しないこと）

検証付きで変換済み（コミット済み）:
- **Cham** cja/cjm（12）／**ティフィナグ** zgh/shi/rif/tzm/tmh（29）／**カナダ音節文字** cr/crk/iu（6）
- **キリル** myv Erzya=варма（1）／best-effort で mns wind=вот, kca ear=пал, kca wind=вот（3, 要再検証）

## 1. 残タスク（完全リスト）

`words/<concept>.js` の該当行 `code: ["<surface>", "<ipa>"]` の surface を土着文字へ。

| code | 言語 | 想定文字 | 残セル（concept="romanization" /IPA/） |
|---|---|---|---|
| **vai** | Vai | Vai 音節文字 (U+A500–A63F) | blood="wuli"/wuli/, blue="dsiron"/dʒiron/, bone="kuru"/kuru/, fish="nyɛ"/ɲɛ/, five="sóólu"/soːlu/, four="naani"/naːni/, night="lifi"/lifi/, rain="suna"/suna/, red="kpou"/kpou/, three="sakpa"/sakpa/, tongue="nɛ"/nɛ/, tooth="ɲiŋ"/ɲiŋ/ |
| **blt** | Tai Dam | Tai Viet (U+AA80–AADF) | i="kau", snow="mươi phông", stone="hin", we="hau", wheel="ꞌcuống", white="khao" |
| **khb** | Tai Lue | New Tai Lue (U+1980–19DF) | i="kau", rain="fun", wind="lum" |
| **sel** | Selkup | キリル | ear="üŋkɨma", earth="čʸu", rain="sor̃ɨntæ", wind="mær̃ḳɨ" |
| **akk** | Akkadian | 楔形文字 | egg="pēlu", white="peṣû", wine="karānu" |
| **sux** | Sumerian | 楔形文字 | rain="šeg₃" |
| **otk** | Old Turkic | 突厥文字（オルホン） | nose="burun" |
| **kxm** | Northern Khmer | タイ文字/クメール | five="pram" |
| **yuy** | Eastern Yugur | モンゴル文字（歴史的） | five="tawun" |
| **kca** | Khanty | キリル | rain="yer̃t"（r̃＝軟音化 r。ерт か йерт か要確認） |
| **yrk** | Nenets | キリル | earth="ya" → **要注意（§4）** |

**据え置き妥当（変換しない）:**
- **ale** Aleut（ear="tutusix", five="chaang"）＝Latin もアラスカ正書法として正。
- **lzz** Laz（earth="let'a" 等）＝「Latin or Georgian」でラテンも正。
- **yue** Cantonese `atsign="at"`＝@記号の呼称。

## 2. 変換方針（**推測禁止・検証必須**）

このデータの精度基準は高い。**"見えるラテン"より、"見えにくい誤った土着文字"の方が有害**。
以下を必ず守る:

1. **変換体系を既存セルで検証する。** その言語の既存 native セルを Unicode 文字名
   （Python `unicodedata.name`）でデコードし、IPA/ローマ字と一致することを確認してから、
   同じ体系で漏れセルを組む。例（実績）: ティフィナグは既存 `bird=ⴰⴳⴹⵉⴹ` に一致することで検証、
   Cree は `iu cat=ᐱᓯᒃᑎ`（si=ᓯ/終k=ᒃ）で検証。
2. **字母値は Unicode 正式名を典拠にする**（`unicodedata.name(ch)`）。ブロック:
   Vai U+A500–A63F, Tai Viet U+AA80–AADF, New Tai Lue U+1980–19DF, Cuneiform U+12000–,
   Old Turkic U+10C00–10C4F, Mongolian U+1800–18AF。
3. **語彙は外部DBで確認**: ABVD（オーストロネシア: Tai系は別）、Wiktionary、
   Giellatekno 辞書 `dicts.uit.no`（Uralic: Selkup/Khanty/Nenets）、ORACC（楔形: Akkadian/Sumerian）。
4. **検証できたセルだけ変換**。できないものは残す（勝手に埋めない）。確度を必ずコミットメッセージに明記。
5. **IPA（第2要素）は不変**。表記（第1要素）のみ変更。

## 3. 各言語メモ

- **vai（最難・注意）**: Vai の Unicode 文字名は**このデータの音価とズレる**（`dog=ꕝꖣ` は名称
  DHHA+VU なのに IPA /dɛni/）。**名称ベースの機械変換は不可**。正しい Vai 音節表（このデータの
  ローマ字体系に対応）を用意し、既存の正しいセル（例 `cat=ꖷꖬ=musu` は一致）だけを手掛かりに、
  1セルずつ検証すること。既存 `dog` セル自体が誤りの可能性（§4）。
- **blt Tai Dam / khb Tai Lue**: 声調記号・母音配置のあるアブギダ。Tai Viet / New Tai Lue の
  字母表を典拠に。blt は声調（IPA の ˥˨˦ 等）を持つので綴りに注意。
- **sel Selkup**: キリルだが正書法が不安定。ӈ(ng)/ы(ɨ)/ӄ(q)/ӧ 等。辞書で語形確認必須。
- **akk/sux 楔形**: 学術では**翻字（ローマ字）が標準**でもある。楔形に直すなら ORACC の
  サイン列（例 pe-lu）を典拠に。翻字のまま許容する判断もあり得る（オーナー確認推奨）。
- **otk Old Turkic**: nose "burun" → オルホン突厥文字。右横書き・音節規則に注意。
- **kxm Northern Khmer**: タイ文字で書かれる。five "pram" → タイ文字。
- **yuy Eastern Yugur**: モンゴル文字は歴史的でほぼ不使用。**変換せず据え置きも妥当**。
- **kca rain "yer̃t"**: r̃＝軟音化。ерт/йерт/ерьт のどれか辞書で確認。

## 4. 既存データの要検証フラグ（この作業中に発見）

推測で塗り固めず、**別途検証**すること:
1. **`yrk`(Nenets) `drink="я" /ja/`** が既存にある。`earth="ya"` を `я` にすると drink と同形衝突。
   Nenets で drink=earth が同綴りは不自然 → **既存 drink="я" が誤りの疑い**。要辞書確認。
2. **`vai` `dog="ꕝꖣ"`** — Unicode 名 DHHA+VU が IPA /dɛni/ と不一致 → **誤りの疑い**。
3. **`blt`(Tai Dam) の既存 Tai Viet セルに字母↔IPA不一致が多数（要専門家）** — 全39セルを
   Unicode 名でデコードすると、30 は頭子音が IPA と一致するが、**8 セルは字母名と IPA 頭子音が
   食い違う**:
   - `cat ꪵꪙꪺ`(字母 NO)↔/mɛːu/、`eye ꪁꪎ`(KO)↔/taː/、`hand ꪐꪮ`(NYO)↔/mɯ/、
     `heart ꪈꪲꪒ`(NGO)↔/tɕai/、`house ꪙꪮꪙ`(NO)↔/hɯan/、`love ꪥꪮꪀ`(YO)↔/hak/、
     `mother ꪵꪶꪀ`(KO)↔/mɛː/、`thanks ꪒꪲ…`(DO)↔/tɕai/
   - **断定はしない**: Vai と同じく **Tai Viet の Unicode 文字名が Tai Dam の実音価と対応しない
     可能性**があり（歴史的音変化で説明できる例もありうる）、誤りとは限らない。
   - いずれにせよ **Unicode 名ベースの機械変換は不可**。これが漏れ6語（i/we/snow/stone/wheel/
     white）を安全に組めない理由でもある。**Tai Viet↔Tai Dam の一次資料／専門家**が要る。

## 5. ビルド／検証ワークフロー（毎回）

```bash
# 1) words/<concept>.js の surface だけ編集（IPAは触らない）
# 2) 派生ファイル再生成
node tools/build_lang_words.js
node tools/export_seo_data.js
git checkout -- data/hanmap_seo.json     # 中身はタイムスタンプだけ変わるので戻す
# 3) キャッシュ版数を bump（現在値+1）：wordmap.html の
#    WM_ASSET_VERSION.words, .langWords, および <script src="word_manifest.js?v=N"> を +1
# 4) ロック更新
node tools/asset_version_check.js --update
# 5) 全ガード（必ず緑に）
node tools/check_all.js
```

**注意するガード:**
- `native script block` / `rows mixing scripts unlisted` / `script declared matches data`（土着文字化でPASSするはず）
- `no new intra-row duplicate`（同一言語で2概念が同綴りになると失敗。正当なら
  `node tools/intra_row_dup_check.js --update` で理由コメント付きで受理。§4 の衝突に注意）
- `asset cache-version freshness`（版数 bump 忘れで失敗）

## 6. 共有ツリー注意（重要）

- **別スレッドが同じ main を編集中**（`seo/*.php` 等が未コミットで変わる）。
- **`git add -A` 禁止。** ステージするのは自分の変更のみ:
  `words/ lang_words/ data/wordmap_seo.json tools/asset_version.lock.json wordmap.html`
  （＋必要なら `tools/intra_row_dup.lock.json`）。
- **`seo/*.php` には絶対に触れない。**
- コミットメッセージ末尾: `Co-Authored-By:` は各自の規約に従う。

## 7. 完了の定義

`node -e` で全 words を走査し、「native が過半数の言語の surface にラテン文字が残っていない」
（§1の据え置き言語を除く）状態。検証できず残したセルは、確度と理由を報告に明記すること。
