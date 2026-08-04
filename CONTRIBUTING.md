# LangMap Data Contribution Guide / データ追加ガイドライン

This document describes the rules and procedures for adding new sentences or languages to LangMap.

---

## Data Format / データ形式

Each sentence in `data.js` follows this structure:

```json
{
  "id": 101,
  "title": "English description of the sentence",
  "segments": {
    "A": { "color": "#e74c3c" },
    "B": { "color": "#3498db" },
    "C": { "color": "#2ecc71" }
  },
  "langs": {
    "ja": [["B", "学校に"], ["C", "行く"]],
    "en": [["C", "go"], ["B", "to school"]],
    ...
  }
}
```

### Segment Rules / セグメントルール

Each segment array entry is `[segmentID, text]`:
- **First element**: Segment ID (single uppercase letter: A, B, C, ...)
- **Second element**: The text in that language

### Critical Rules / 絶対に守るべきルール

#### 1. Never create adjacent segments with the same ID / 隣接する同一IDセグメントの禁止

**BAD:**
```json
"ja": [["B", "Wi-Fiの"], ["B", "パスワードが"], ["C", "見つからない"]]
```

**GOOD:**
```json
"ja": [["B", "Wi-Fiのパスワードが"], ["C", "見つからない"]]
```

If the same semantic role appears consecutively, **merge them into one segment**. For space-separated languages (English, French, etc.), join with a space. For languages without word spacing (Japanese, Chinese, Korean, etc.), join directly.

#### 2. Segment ID goes first, text goes second / セグメントIDが先、テキストが後

**BAD:** `["I", "A"]` (text "I" first, ID "A" second)
**GOOD:** `["A", "I"]` (ID "A" first, text "I" second)

This is especially error-prone with English "I" (pronoun) — it looks like a segment ID but is text.

#### 3. Word order must be correct for each language / 各言語の語順は正確に

Segments must be listed in the natural word order of that language. Example:
- English (SVO): `[["A", "I"], ["C", "go"], ["B", "to school"]]`
- Japanese (SOV): `[["A", "私は"], ["B", "学校に"], ["C", "行く"]]`

**Common mistakes:**
- Japanese: "ください" (please) comes at the END, not the beginning
- Arabic/Hebrew: VSO order, verb typically first
- Korean: SOV order like Japanese

#### 4. All languages must be included / 全言語を含めること

Every sentence must have entries for all language codes listed in `validate_data.py` `REQUIRED_LANGS`.
Run `python3 validate_data.py` to check for missing languages.

#### 5. Cantonese (yue) must use Traditional Chinese / 広東語は繁体字のみ

**BAD:** `车站` (simplified)
**GOOD:** `車站` (traditional)

Never use simplified Chinese characters (简体字) for Cantonese entries.

#### 6. Chữ Nôm (vi_nom) must use standardized Hán-Nôm characters / チューノムは標準化された漢字・字喃を使用

**BAD:** `"Tôi đi"` (quốc ngữ / Latin script)
**GOOD:** `"碎𠫾"` (Chữ Nôm)

Character selection must follow the standardization references:
- **Primary:** [ChuNomStandardization](https://github.com/valestanov/ChuNomStandardization) (`NomStandardization.csv`)
- **Secondary:** [chunom.org Standard 750](https://chunom.org/pages/standard/)

Key standardized Chữ Nôm characters:
| Vietnamese | Chữ Nôm | Unicode | Meaning |
|---|---|---|---|
| tôi | 碎 | U+788E | I |
| ăn | 咹 | U+54B9 | eat |
| đi | 𠫾 | U+20AFE | go |
| muốn | 㦖 | U+3996 | want |
| là | 羅 | U+7F85 | is |
| có | 固 | U+56FA | have |
| không | 空 | U+7A7A | no/not |
| thấy | 𧡊 | U+2784A | see |
| đẹp | 𢢲 | U+228B2 | beautiful |
| rất | 慄 | U+6144 | very |
| mới | 𪦲 | U+2A9B2 | new |
| bữa | 𩛷 | U+296F7 | meal |
| sáng | 𤏬 | U+243EC | morning |
| giờ | 𣇞 | U+231DE | hour |
| lúc | 𣅶 | U+23176 | moment |
| bảy | 𦉱 | U+26271 | seven |
| chín | 𠃩 | U+200E9 | nine |
| nấu | 𤍇 | U+24347 | cook |
| nắng | 𣌝 | U+2331D | sunny |
| mưa | 𩄎 | U+2910E | rain |
| mua | 𧷸 | U+27DF8 | buy |
| đang | 當 | U+7576 | -ing |
| mỗi | 每 | U+6BCF | each |

**Important:** When adding new vi_nom entries, always look up characters in the standardization references above. Do NOT use non-standard variant characters even if they look similar.

#### 7. Classical Chinese (zh_classical) uses literary style / 文言は文語体を使用

Use classical vocabulary, not modern Chinese:
| Modern | Classical | Meaning |
|---|---|---|
| 我 | 吾/余 | I |
| 想要 | 欲 | want |
| 吃 | 食 | eat |
| 是 | 乃/為 | is |
| 很 | 甚/極 | very |
| 不 | 不/未/無 | not |

#### 8. Edo-period Japanese (ja_edo) uses samurai-style speech / 江戸時代語は武家言葉

| Modern | Edo | Notes |
|---|---|---|
| 私は | 拙者は | Samurai first-person |
| です | でござる | Polite copula |
| ください | くだされ | Request form |
| ホテル | 旅籠 | Inn |
| お店 | 店/商家 | Shop |
| 大学 | 学問所 | University |
| 空港 | 湊 | Port (no airports in Edo) |

#### 9. Egyptian Arabic (ar_eg) uses dialect forms / エジプト方言は口語体を使用

| MSA | Egyptian | Meaning |
|---|---|---|
| أريد | عايز | want |
| ذهب | راح | went |
| ماذا | إيه | what |
| أين | فين | where |
| الآن | دلوقتي | now |
| من فضلك | لو سمحت | please |

Uses بـ prefix for present habitual, هـ prefix for future.

---

## Segment Design Guidelines / セグメント設計ガイドライン

### How to divide a sentence into segments

1. **Identify semantic roles**: Subject, verb, object, adverb, modifier, etc.
2. **Keep segments meaningful**: Each segment should represent a coherent unit that moves as a group across languages
3. **3-6 segments per sentence** is ideal for visualization
4. **Consistent segment IDs across languages**: If "I" is segment A in English, the equivalent pronoun must also be segment A in all other languages

### Segment colors

Each segment ID has a fixed color. Do not change these — they are designed for maximum contrast, readability, and visual harmony:
```json
"A": { "color": "#e8384f" }  // Rose Red
"B": { "color": "#4178bc" }  // Steel Blue
"C": { "color": "#0d9f6e" }  // Jade Green
"D": { "color": "#8338ec" }  // Electric Violet
"E": { "color": "#d4790e" }  // Dark Amber
"F": { "color": "#1098ad" }  // Ocean Teal
"G": { "color": "#c2255c" }  // Ruby
```

### Segment Mapping Rules / セグメントマッピングルール

以下のルールは、過去の修正事例から得られた教訓をまとめたものです。

#### Rule 1: セグメントIDは意味単位に紐づく（語順ではなく意味で決まる）

各セグメントIDは、全言語で同じ意味概念を表す必要があります。語順は言語ごとに異なって構いませんが、IDの割り当ては全言語で統一してください。

```
✅ 正しい例（S6: "I study Japanese at university"）:
  en: [A]I [D]study [C]Japanese [B]at university
  ja: [A]私は [B]大学で [C]日本語を [D]勉強しています
  la: [A]Ego [C]linguam Iaponicam [B]in universitate [D]studeo
  → A=主語, B=場所, C=目的語, D=動詞 が全言語で一致

❌ 間違い例:
  la: [A]Ego [C]linguam Iaponicam [D]in universitate [B]studeo
  → BとDが逆。B=場所なのにstudeo(動詞)が入っている
```

#### Rule 2: Pro-drop言語でも主語代名詞を明示する

イタリア語・スペイン語など主語代名詞を省略する言語でも、セグメント対応のために明示的に代名詞を含めてください。

```
❌ BAD:  it: [A]Studio [C]giapponese [B]all'università
  → AにI+studyが結合。Dが欠落。

✅ GOOD: it: [A]Io [D]studio [C]giapponese [B]all'università
  → A=Io(主語), D=studio(動詞) が分離されている
```

同様に、ウェールズ語・アイルランド語（VSO語順）でも主語代名詞を含めてください：
```
✅ GOOD: cy: [D]Rwy'n astudio [A]fi [C]Japanëeg [B]yn y brifysgol
  → VSO語順だが、A=fi(主語) が明示されている
```

#### Rule 3: クリティック代名詞は独立セグメントにする

イタリア語・スペイン語の目的格代名詞（mi, me）が動詞に付着する場合、分離してください。

```
❌ BAD:  it: [D]mi porti [C]un bicchiere d'acqua
  → B(me)がDの動詞に吸収されている

✅ GOOD: it: [B]mi [D]porti [C]un bicchiere d'acqua
  → B=mi が独立セグメント

❌ BAD:  es: [D]deme [C]un vaso de agua
✅ GOOD: es: [D]dé [B]me [C]un vaso de agua
```

#### Rule 4: 全言語で同じ文構造を使う（意訳による構造変更禁止）

方言や関連言語で「自然な表現」を追求するあまり、文の構造自体を変えてはいけません。セグメントの意味対応が崩れます。

```
❌ BAD（S76: "音楽を聴くと幸せな気持ちになる"）:
  fr:    [D]Je me sens heureux [C]quand [B]j'écoute [A]de la musique
  fr_qc: [A]Écouter [B]de la musique [C]ça me rend [D]heureux
  → fr_qcは「Écouter...ça me rend」構文を使い、A=聴く, B=音楽 になっている
  → frではA=音楽, B=聴く で、意味が逆転している

✅ GOOD:
  fr_qc: [D]Je me sens heureux [C]quand [B]j'écoute [A]d'la musique
  → frと同じ「when I listen」構文で、語彙だけケベック風にする
```

#### Rule 5: 定義されたセグメントIDのみ使用する

各文の `segments` オブジェクトで定義されたID（A, B, C, ...）のみ使用してください。定義にないIDを使うとバリデーションエラーになります。

```
❌ BAD（segmentsにA,B,Cのみ定義）:
  nap: [A]L'esame [B]è [C]lunnerì [D]ca vene
  → Dは未定義

✅ GOOD:
  nap: [A]L'esame [B]è [C]lunnerì ca vene
  → 「lunnerì ca vene」をCに統合
```

#### Rule 6: 空テキストのセグメントを作らない

テキストが空のセグメントは禁止です。参照言語にあるセグメントが訳語で不要な場合は、そのセグメントを省略してください。

```
❌ BAD:  sv: [A]Morgen [B]" [C]blir [D]soligt
  → Bが空文字

✅ GOOD: sv: [A]I morgon [C]blir det [D]soligt
  → 不要なBは省略
```

#### Rule 7: 方言は親言語ベースで生成する

方言データを追加する際は、親言語のセグメント構造をコピーし、テキストのみ方言表現に変換してください。これにより、セグメントIDと順序が自動的に一致します。

| 方言 | 親言語 | 手順 |
|---|---|---|
| nap, scn | it | itのセグメント構造をコピー → テキストをナポリ語/シチリア語に変換 |
| fr_qc | fr | frのセグメント構造をコピー → テキストをケベック表現に変換 |
| de_gsw | de | deのセグメント構造をコピー → テキストをスイスドイツ語に変換 |
| sv, no | de | deのセグメント構造をコピー → テキストをスウェーデン語/ノルウェー語に変換 |
| nl | de | deのセグメント構造をコピー → テキストをオランダ語に変換 |
| en_ang | en | enのセグメント構造をコピー → テキストを古英語に変換 |
| sco | en | enのセグメント構造をコピー → テキストをスコットランド語に変換 |
| si | hi | hiのセグメント構造をコピー → テキストをシンハラ語に変換 |

#### Rule 8: 中国語方言は方言らしい表現を使う

普通話（zh）の文をそのままコピーしないでください。各方言の特徴的な語彙・文法を使ってください。

| 方言 | 使うべき特徴的表現 |
|---|---|
| wuu（上海語） | 阿拉(we), 侬(you), 勿(not), 交关(very), 辰光(time), 伊(he/she) |
| zh_sc（四川話） | 啥子(what), 要得(OK), 莫(don't), 巴适(good), 嘞/哈(particle) |
| zh_db（東北話） | 贼(very), 整(do), 寻思(think), 啥(what), 咋(how), 儿化音 |

```
❌ BAD:  zh_sc: [B]听 [A]音乐 [C]的时候 [D]我感到很开心
  → 普通話そのまま（100%一致）

✅ GOOD: zh_sc: [B]听 [A]音乐 [C]的时候 [D]我硬是高兴得很
  → 四川話の特徴（硬是, 得很）が入っている
```

#### Rule 9: 各言語の正しい文字体系を使う

| 言語 | 正しい文字 | よくある間違い |
|---|---|---|
| ur（ウルドゥー語）| ナスタアリーク体 `موسیقی` | デーヴァナーガリー `संगीत` |
| yue（広東語）| 繁体字 `車站` | 簡体字 `车站` |
| vi_nom（チューノム）| 漢字・字喃 `碎𠫾` | ラテン文字 `Tôi đi` |
| si（シンハラ語）| シンハラ文字 `මම` | ラテン文字 `mama` |

#### Rule 10: 言語コードは `親言語_方言` 形式を使う

新しい方言を追加する際は、親言語のコードをプレフィックスとして使ってください。

```
✅ GOOD: ja_osa, ko_bus, en_aave, ar_eg, zh_sc, de_gsw, fr_qc, el_grc
❌ BAD:  osa, bus, aave, gsw, grc
```

独立した言語（ISO 639コードを持つもの）はプレフィックス不要です：
```
sco（スコットランド語）, nap（ナポリ語）, ain（アイヌ語）, yue（広東語）
```

#### Rule 11: 句読点はデータに含めず、レンダリングで処理する

疑問符`?`、逆疑問符`¿`、感嘆符`!`等の句読点はセグメントデータに入れないでください。代わりに、文オブジェクトに `"type": "question"` 等を追加し、レンダリング側で自動付与します。

```json
❌ BAD:
  "es_eu": [["C", "¿Dónde"], ["D", "está"], ...]

✅ GOOD:
  sentence: { "type": "question", ... }
  "es_eu": [["C", "Dónde"], ["D", "está"], ...]
```

#### Rule 12: フランス語のJ'結合を分離する

フランス語の `J'` (je の省略形) が動詞と結合している場合、`J'` をAセグメント（主語）として分離し、残りを動詞セグメントに入れてください。

```
❌ BAD:  [A]J'ai [C]perdu [B]mon portefeuille
  → "J'ai" にI+have(助動詞)が結合

✅ GOOD: [A]J' [C]ai perdu [B]mon portefeuille
  → A=J'(主語), C=ai perdu(動詞)

❌ BAD:  [D]J'apprends [C]à cuisiner
✅ GOOD: [A]J' [D]apprends [C]à cuisiner
```

フランス語の倒置疑問文も分離してください:
```
❌ BAD:  [D]Pourriez-vous [C]me recommander
✅ GOOD: [D]Pourriez [A]-vous [C]me recommander
```

#### Rule 13: 大文字は文頭セグメントのみ

主語代名詞を追加した結果、動詞が2番目のセグメントになった場合、動詞の先頭を小文字にしてください。

```
❌ BAD:  [A]Yo [D]Tengo que [C]levantarme
✅ GOOD: [A]Yo [D]tengo que [C]levantarme
```

#### Rule 14: 関係代名詞は独立セグメントにする

関係節を含む文では、関係代名詞（which/that/den/que/yang/mà/ที่等）を独立したセグメント（通常G）にしてください。ただし英語で省略されている場合（ゼロ関係代名詞）は追加不要です。

```
en:     [E]a suit [D]I saw          ← "which" 省略、Gなし
de:     [E]einen Anzug [G]den [D]gesehen habe  ← den=関係代名詞
fr:     [E]un costume [G]que [D]j'ai vu        ← que=関係代名詞
id:     [E]jas [G]yang [D]saya lihat           ← yang=関係化辞
th:     [E]สูท [G]ที่ [D]เห็น                    ← ที่=関係化辞
vi:     [E]bộ vest [G]mà [D]tôi đã thấy        ← mà=関係代名詞（使用時のみ）
km:     [E]ឈុតខោអាវ [G]ដែល [D]ខ្ញុំបានឃើញ       ← ដែល=関係代名詞
lo:     [E]ສູທ [G]ທີ່ [D]ເຫ໌ນ                    ← ທີ່=関係化辞
ja:     [D]見た [E]スーツ                         ← 前置修飾、Gなし
ko:     [D]본 [E]양복                             ← 前置修飾、Gなし
```

関係代名詞を持たない言語（日本語・韓国語・中国語等は前置修飾を使用）ではGセグメントは不要です。

**注意**: ベトナム語の`mà`は関係代名詞として使われる場合のみGセグメントにします。`mà`は接続詞（but/and）としても使われるため、文脈で判断してください。同様に、インドネシア語/マレー語の`yang`は形容詞マーカーとしても使われますが、名詞を修飾する関係節を導く場合のみGとします。

#### Rule 15: 構造が異なる概念は別セグメントで表現する

同じ意味でも言語によって構造が異なる場合、構造ごとに異なるセグメントを割り当ててください。

```
S81 "今日は頭が痛い":
  Segments: A=主語, B=頭, C=今日, D=痛い, E=頭痛, F=ある

  「頭が痛い」構文 → B + D を使用:
    ja: [A]私は [C]今日 [B]頭が [D]痛い
    zh: [A]我 [C]今天 [B]头 [D]很痛
    ru: [A]У меня [D]болит [B]голова [C]сегодня

  「頭痛がある」構文 → E + F を使用:
    en: [A]I [F]have [E]a headache [C]today
    de: [A]Ich [F]habe [C]heute [E]Kopfschmerzen
    ko: [C]오늘 [E]두통이 [F]있다
```

#### Rule 16: 複合セグメント（B|D形式）

1つのテキストが複数のセグメント概念に対応する場合、`B|D` のようにパイプで区切ったIDを使用できます。レンダリングでは両色のグラデーションが表示され、線は両方のセグメント位置に接続されます。

```json
["B|D", "headache"]  // BとDの両方に対応
```

ただし、Rule 15のように構造ごとに別セグメントを割り当てる方が明確な場合は、そちらを優先してください。

---

## よくあるセグメントミスと修正事例

以下は、実際のデータで発見・修正されたセグメントの問題パターンです。新しいデータを追加する際は、同じミスを繰り返さないよう注意してください。

### パターン1: 複合フレーズの未分割

異なる意味単位が1つのセグメントにまとめられている場合、分割が必要です。

```
❌ BAD（S1: "ホテルの向かいのお店で"）:
  zh: [C]在酒店对面的商店里
  → B(ホテルの向かいの) と C(お店で) が1セグメントに結合

✅ GOOD:
  zh: [B]酒店对面的 [C]商店里
  → 場所の修飾(B)と場所(C)が分離
```

**判断基準**: 英語や日本語で2つの別セグメントになっている概念が、他言語で1つにまとまっていたら分割を検討する。

### パターン2:「ください」等の丁寧表現が動詞に結合

丁寧マーカー（please, ください, 주세요 等）は、動詞とは別のセグメント（通常A）にすべきです。

```
❌ BAD（S96: "次の交差点を右に曲がってください"）:
  ja: [D]曲がってください
  → D(曲がる) と A(ください) が結合

✅ GOOD:
  ja: [D]曲がって [A]ください
  ko: [D]돌아 [A]주세요

方言も同様:
  osa: [D]曲がって [A]おくれやす
  aom: [D]曲がって [A]けれじゃ
  oki: [D]曲がって [A]くぃみそーれー
  ja_edo: [D]曲がり [A]くだされ
```

### パターン3: セグメントIDの意味的不一致

同じ概念に対して、言語間で異なるセグメントIDが割り当てられている。

```
❌ BAD（S13: "水を一杯ください"）:
  en:  [A]Please   [C]give me  [B]a glass of water
  aom: [A]みずを    [B]いっぺ   [C]けれじゃ
  → A=水(enではplease), B=一杯(enではwater), C=ください(enではgive)

✅ GOOD:
  aom: [C]みずを [A]いっぺ [B]けれじゃ
  → C=水, A=一杯/please, B=ください/give — enと意味が対応
```

**チェック方法**: 各セグメントIDの意味を英語（en）と日本語（ja）で確認し、他言語でも同じ意味に同じIDが付いているか検証する。

### パターン4: 動詞と目的語の未分割

「旅したい」「向右转」のように、動詞と目的語（または動詞と助動詞）が結合されている。

```
❌ BAD（S44: "世界中を旅したい"）:
  ja: [D]旅したい
  → C(旅) と D(したい) が結合

✅ GOOD:
  ja: [C]旅 [D]したい
  ko: [C]여행 [D]하고 싶다
  th: [D]อยาก [C]เดินทาง

❌ BAD（S96: "右に曲がって"）:
  zh: [D]向右转
  → C(右) と D(转) が結合

✅ GOOD:
  zh: [C]向右 [D]转
  vi: [D]rẽ [C]phải
```

### パターン5: 方言のセグメントIDが親言語と不一致

方言データを生成する際、テキストだけでなくセグメントIDの意味対応も親言語と一致させる必要があります。

```
❌ BAD（S3: "私は毎朝7時に朝ごはんを食べます"）:
  ja:  [A]私は [D]毎朝 [E]7時に [B]朝ごはんを [C]食べます
  aom: [A]わ   [B]めあさ [C]すつずに [D]あさまま [E]くうだばって
  → B=毎朝(jaではD), C=7時に(jaではE) — IDがずれている

✅ GOOD:
  aom: [A]わ [D]めあさ [E]すつずに [B]あさまま [C]くうだばって
  → ja と同じ意味に同じID
```

**防止策**: 方言データを生成したら、必ず親言語とセグメントIDの集合を比較する。以下のスクリプトで確認可能:

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('data.js','utf8');
const S = new Function(src + '; return SENTENCES;')();
const parent = 'ja', child = 'aom';
for (let i = 0; i < S.length; i++) {
  const p = new Set((S[i].langs[parent]||[]).map(s=>s[0]));
  const c = new Set((S[i].langs[child]||[]).map(s=>s[0]));
  const pOnly = [...p].filter(x=>!c.has(x));
  const cOnly = [...c].filter(x=>!p.has(x));
  if (pOnly.length || cOnly.length)
    console.log('S'+(i+1)+': '+parent+'='+[...p].join('')+' '+child+'='+[...c].join(''));
}
"
```

### パターン6: 意味的に「もう少し分けるべき」かの判断

セグメント分割の粒度に迷った場合の指針:

1. **英語の対応セグメントを見る** — 英語で2つのセグメントに分かれている概念は、他言語でも分けるべき
2. **語順マップとして価値があるか** — 分割することで言語間の語順の違いが可視化されるなら分割する
3. **3〜6セグメントを目安に** — 細かすぎると見づらく、粗すぎると語順の違いが見えない
4. **文法的に分離可能か** — 「曲がってください」は「曲がって」+「ください」に分離可能だが、「食べた」を「食べ」+「た」に分けるのはやりすぎ

---

## Validation Script / バリデーションスクリプト

Run `validate_data.py` to check for common errors before committing:

```bash
python3 validate_data.py
```

This script checks:
- Adjacent same-ID segments
- Flipped segment ID/text (e.g., `["I", "A"]` instead of `["A", "I"]`)
- Missing languages
- Simplified Chinese in Cantonese (yue)
- Latin characters in Chữ Nôm (vi_nom)
- Invalid segment IDs

---

## Adding a New Language / 新しい言語の追加

1. Add to `LANGUAGES` array in `app.js`
2. Add to `LANG_NAMES` in `lang_names.js` (all 21 UI language entries)
3. Add data for all 100 sentences in `data.js`
4. **方言の場合**: 親言語のセグメント構造をコピーし、テキストのみ変換（Rule 7参照）
5. If RTL, add to `RTL_LANGS` set in `app.js`
6. Add to `REQUIRED_LANGS` in `validate_data.py`
7. Run `validate_data.py` to verify
8. Update cache buster version in `index.html` (`?v=N`)

## Adding a New Sentence / 新しい文章の追加

1. Choose a sentence that shows interesting word order differences
2. Assign an `id` (next available number)
3. Define semantic segments (A, B, C, ...)
4. Translate and align all languages (see `REQUIRED_LANGS` in `validate_data.py`)
5. Run `validate_data.py` to verify
6. Update cache buster version in `index.html` (`?v=N`)

---

## i18n Naming Conventions / 多言語名称のルール

When adding or updating language names across UI languages, follow these conventions to maintain consistency.

### 1. Parenthetical format / 括弧形式

All dialect/variant/period qualifiers MUST use parenthetical format:

```
✅ Language (Qualifier)     — Japanese (Osaka), Korean (Medieval)
✗  Qualifier + Language     — Middle Korean, 大阪話, Dialek Osaka
✗  Language + Qualifier     — Tiếng Đức Thụy Sĩ, Norte-coreano
```

### 2. Self-designation for politically sensitive names / 政治的配慮

Use the self-designation where the generic language name is politically loaded:

| Code | CJK UIs | Other UIs |
|------|---------|-----------|
| ko_kp | 朝鮮語(文化語) / 조선말(문화어) | Korean (DPRK) |

Rationale: "韓国語(北朝鮮)" is contradictory — 韓国語 literally means "language of South Korea".

### 3. No English leakage / 英語の混入禁止

Every non-English UI language must have a native translation. Never leave English words like "Vietnamese", "English", "Middle" in non-English UIs. Run the following check before committing:

```bash
node -e "
const fs=require('fs'), vm=require('vm');
const ctx={};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('lang_names.js','utf8')+';this.LANG_NAMES=LANG_NAMES;', ctx);
const LN=ctx.LANG_NAMES;
const words=['Vietnamese','English','French','German','Spanish','Chinese','Korean','Japanese','Middle','Old','Ancient','Classical'];
for(const ui of Object.keys(LN)){if(ui==='en')continue;for(const[c,n]of Object.entries(LN[ui])){const w=String(n).split(/[\s(]/)[0];if(words.includes(w))console.log(ui,c,n)}}
"
```

For the canonical full validation (including LANG_NAMES coverage and many other Word Map checks), prefer:

```bash
node validate_wordmap_data.js
```

### 4. Consistent prefixes per UI language / 言語ごとの接頭辞統一

| UI | Rule | Example |
|----|------|---------|
| vi | Always use `Tiếng` prefix | `Tiếng Nhật (Osaka)` not `Phương ngữ Osaka` |
| th | Use short form (no `ภาษา`) for variants | `ญี่ปุ่น (โอซากะ)` not `สำเนียงโอซากะ` |
| id | Use short form (no `Bahasa`/`Dialek`) for variants | `Jepang (Osaka)` not `Dialek Osaka` |
| yue | Use `語` consistently for all entries | `韓語(標準)` not `韓文(標準)` |
| ko | No space before parenthesis | `영어(호주)` not `영어 (호주)` |
| ar | Use definite article `ال` consistently | `العربية (المصرية)` not `عربية (مصرية)` |

### 5. Compound segments / 複合セグメント

When a single word fuses two segment roles, use `X|Y` notation:

```
✅ B|D for fused give+me: ください, 주세요, deme, أعطني
✅ B|C for fused eat+breakfast: frühstücke, desayuno, завтракаю
✗  Hyphenated clitics should be SPLIT: donnez / -moi (not B|D)
```

Rule of thumb: if it's **one orthographic word** → compound. If separated by space or hyphen → split.

### 6. Crediting contributors / 貢献者のクレジット

When applying a fix based on external feedback:
1. Include the contributor's name in the git commit message
2. Add a dated entry in `changelog.html` with `<span class="contributor">— reported by Name</span>`
3. Add the contributor's name to the Contributors list at the bottom of `changelog.html`

---

## Word Map (`wordmap_data.js` / `wordmap_meta.js`) Rules / Word Map のルール

The Word Map page (`wordmap.html`) is a separate dataset from the Word Order Map: 20 key concepts × 579 languages/varieties on a world map. Different file, different rules.

### A. File layout

```text
wordmap_data.js — LANG_DATA[code] = { name, native, lat, lng, words: { water:[...], fire:[...], ... } }
                  WORD_LIST          (20 concepts in display order)
                  EXCLUDED_CODES     (codes hidden from default modern view)
                  WM_UI / WM_UI_LABELS (UI strings & UI lang labels)
wordmap_meta.js — LANG_DATA[code].meta = { family, speakers, countries, official, script, description }
                  description must be { en, ja, ko, zh, ... } object (≥6 langs)
```

`LANG_NAMES` (translated language names per UI lang) lives in `lang_names.js` (separated from app.js per wordmap-check.md §12) and is loaded by both `index.html` and `wordmap.html` via a normal `<script>` tag.

### B. Adding a new language

For every new code, you MUST add:

1. **`wordmap_data.js`** — `LANG_DATA[code] = { name, native, lat, lng, words }` with all 20 word entries.
2. **`wordmap_meta.js`** — `LANG_DATA[code].meta = { family, speakers, countries, official, script, description: { en, ja, ko, zh, de, fr, ... } }`.
3. **`lang_names.js`** — `LANG_NAMES[uiLang][code]` for all 21 UI languages (use the dedup-aware Python helpers in `/tmp/`).
4. **`lang-filter.js`** — if the family branch is new, add a `FAMILY_DEFAULTS[familyName]` entry with sensible (wo, tone, morph) defaults.
5. **Bump cache busters**: `wordmap_data.js?v=N+1`, `wordmap_meta.js?v=N+1`, `lang_names.js?v=N+1`.

Run the validator:

```bash
node validate_wordmap_data.js
```

Must report 0 errors. As of wordmap-check-3.md cleanup, the only routine
warnings are 100M+ tier entries lacking `speakerBasis` (target: 0 over time).
INFO lines for explicitly-unattested `—` entries (hidden from map labels)
and duplicate-coordinate groups are expected and benign.

### C. Word entry format / 語形エントリの形式

Each word is `[surface, ipa]`:

```js
water: ['水', 'mizu']
moon: ['ጨረቃ', 'tʃəräqa']
```

Both elements MUST be strings. Use `'—'` for both when explicitly unattested (fragmentary historical languages):

```js
cat: ['—', '—']  // No attested form for this concept
```

Entries with both `'—'` are now hidden from the map (rendered as "— (unattested)" only in the language detail panel). Do NOT use `'—'` to mean "I don't know" or "fill in later" — that is silent data corruption. If a form exists but you don't have IPA, put the surface form and approximate IPA, then mark in the commit message that IPA needs review.

### C2. Pronunciation / IPA Policy / 発音表記ポリシー (Audit Tasks 76, 81, 94)

The second element in `[surface, ipa]` is governed by `meta.pronunciationType` (Audit Task 76):

| Value | Use when | Stress / tones |
|---|---|---|
| `'ipa'` | The row is intended as IPA, including stress/tone where relevant | Required where the language has lexical stress (Italian, Spanish, Russian, Polish) or contrastive tone (Mandarin, Cantonese, Vietnamese, Thai) |
| `'broad'` | Broad phonemic guide; may omit predictable allophones, stress, or fine phonetics | Stress/tone optional but document the omission in `meta.coverageNote` |
| `'romanization'` | The second value is primarily a romanization system, not IPA | Use the standard romanization for that language (Pinyin, Hepburn, RR, etc.) |
| `'orthography'` | The second value mostly copies spelling because the orthography itself is the pronunciation guide | Acceptable for shallow orthographies (Indonesian, Esperanto); document the choice |
| `'mixed'` | The row visibly mixes systems and needs cleanup | Add `meta.coverageNote` flagging the mixed state |
| `'unknown'` | Not yet reviewed | Temporary fallback only |

**Stress policy (Audit Task 81)**: stress marks (ˈ/ˌ) should be added to a row only when **either** (a) the row is `pronunciationType: 'ipa'`, **or** (b) you are committing to source-checked IPA across all 20 cells of that row. Adding stress to a few cells of an otherwise stress-less row creates a mixed state — either finish the row or mark `pronunciationType: 'mixed'`. Do not add stress mechanically from spelling.

**Do NOT** mark a row as `'ipa'` without checking it actually represents IPA (e.g. Indonesian `air/air` is orthography, not IPA).

#### Per-language `pronunciationType` reference (Audit Task 144 docs extension)

Use this table when adding a new row or auditing an existing one. The
*default* column is what the validator expects unless `meta.coverageNote`
documents an explicit deviation.

| Language family / group | Default `pronunciationType` | Rationale |
|---|---|---|
| Sinitic (Mandarin, Cantonese, Wu, Min, Hakka) | `'ipa'` | Tone is contrastive — must be marked with Chao tone letters (˥˦˧˨˩). |
| Tai-Kadai (Thai, Lao, Zhuang, Shan, Bouyei) | `'ipa'` | Tone contrastive. Same Chao notation as Sinitic. |
| Vietnamese / Vietic | `'ipa'` | Tone contrastive, register-tone system. |
| Japonic / Koreanic | `'ipa'` | Pitch-accent (Japanese) or syllable-final consonants (Korean) are non-trivial; broad orthographic copy is ambiguous. |
| Mongolic / Tungusic / Turkic | `'broad'` | Vowel harmony is predictable; broad transcription is accepted unless a narrow phonetic detail is being recorded (e.g. Kazakh ə vs e). |
| Slavic (most regional varieties) | `'broad'` | ASCII digraphs `ts`/`dz` accepted at broad level. Promote to `'ipa'` only when tie-bar `t͡s`/`d͡z` is enforced row-wide. |
| Romance (Italian, Spanish, Portuguese, French, Romanian) | `'ipa'` | Stress is contrastive (Italian, Spanish) or near-contrastive (Portuguese); narrow IPA needed to make stress visible. |
| Germanic (English, German, Dutch, Frisian, Nordic) | `'ipa'` | Phonemic length, vowel quality contrasts, and English diphthongs need narrow IPA. |
| Celtic | `'ipa'` | Initial mutations + complex vowel system require narrow IPA. |
| Hellenic / Albanian / Armenian / Baltic | `'ipa'` | Stress / pitch patterns must be marked. |
| Indo-Aryan (Hindi, Bengali, Punjabi, Marathi, Gujarati, Sinhala) | `'broad'` for most rows; `'ipa'` once schwa-deletion + retroflex contrasts are sourced per cell. |
| Iranian (Persian, Tajik, Kurdish, Pashto) | `'broad'` (default); `'ipa'` once stress and ezafe are documented. |
| Semitic (Arabic, Hebrew, Aramaic, Maltese, Amharic) | `'ipa'` | Pharyngeals + emphatics (ʕħʔ + ṭ ḍ ṣ ẓ) require narrow IPA. |
| Cushitic / Berber / Chadic | `'ipa'` | Tone (Chadic), ejectives (Cushitic), pharyngealization (Berber) all need narrow notation. |
| Bantu (any sub-branch) | `'ipa'` | Tone is contrastive in nearly every Bantu language. Use IPA tone diacritics (´ ` ´` `´) since Chao bars are over-precise for grammatical tone. |
| Niger-Congo Atlantic / Mande / Kwa / Volta-Niger | `'ipa'` | All have lexical tone. Same diacritic convention as Bantu. |
| Nilo-Saharan / Nilotic | `'ipa'` | Lexical tone + ATR vowel harmony need explicit notation. |
| Austronesian (Malayo-Polynesian) | `'orthography'` for shallow-orthography rows (Indonesian, Malay, Tagalog, Cebuano); `'broad'` for Polynesian (long-vowel macrons cannot be omitted); `'ipa'` for Formosan. |
| Austroasiatic (Khmer, Mon, Munda) | `'broad'` (default); promote to `'ipa'` only after register / phonation contrasts (Khmer) are sourced per cell. |
| Hmong-Mien | `'ipa'` | Tone contrastive; multi-tone systems (Hmong White/Green) need Chao notation. |
| Dravidian (Tamil, Telugu, Kannada, Malayalam) | `'broad'` (default); `'ipa'` once retroflex laterals (ḷ ḻ) and gemination are sourced. |
| Tibeto-Burman / Karenic / Loloish | `'ipa'` | Tone contrastive. Use Chao for Karenic + Loloish; IPA diacritics for non-tonal Bodish dialects. |
| Indigenous Americas (Quechua, Aymara, Guarani, Maya, Nahuatl, Navajo) | `'ipa'` | Glottalization, pharyngealization, ejectives, and tone (Otomanguean) all need narrow IPA. |
| Pacific (Australian Aboriginal, Papuan) | `'broad'` (default); promote to `'ipa'` once retroflex / lamino-dental / nasal-place contrasts are sourced per row. |
| Constructed (Esperanto, Toki Pona, Lojban, Klingon) | `'orthography'` (Esperanto, Toki Pona — phonemic spelling); `'broad'` for Lojban; `'ipa'` for Klingon (canonical IPA defined by Okrand). |
| Creoles / pidgins | `'broad'` (default) — substrate-influenced phonology not always captured by lexifier orthography. |
| Sign languages | not applicable; see C4. |
| Reconstructed proto-languages | `'ipa'` for the IPA column (`*` prefix kept on surface only — see "Reconstructed-form notation"). |
| Historical attested (Old/Middle stages) | `'ipa'` if the source provides one (Latin, Old English, Sanskrit, Greek); `'broad'` if only orthographic transliteration is available; `'mixed'` if scholarly conventions (e.g. Baxter-Sagart `X`/`H`) are kept. |

**When "broad" is the right answer** even for an IPA-strong language:
- The 20 cells were sourced from a teaching grammar that uses broad
  phonemic notation throughout (no allophone detail).
- The row is a `regional-variety` of an IPA-typed parent, where
  re-transcribing every cell with narrow IPA would invent precision
  the source doesn't support.
- The language has *no* monolingual phonetic dictionary and the IPA
  column would be derived from spelling — `'broad'` is honest about
  that.

**When `'mixed'` is the right answer**:
- Some cells use IPA, others use romanization, and the discrepancy is
  source-driven (e.g. Old Chinese `och` keeps Baxter-Sagart `X`/`H`
  finals in the IPA column for scholarly continuity per Audit Task
  160). Document the mix in `meta.coverageNote` and reference the
  source convention by name (Baxter-Sagart 2014, Hepburn, RR2000,
  Wylie, etc.).

#### Outstanding pronunciation rebuilds (Audit Task 146 deferred)

The following rows still need a full per-cell pronunciation rebuild
(20 cells each, sourced):

| Code | Language | Action | Source |
|---|---|---|---|
| `my` | Burmese | Tone / phonation row-wide consistency | Cambridge JIPA Burmese (2014) |
| `km` | Khmer | All-cell IPA rebuild from Royal Phnom Penh standard | Headley 1977 |
| `id` / `ms` / `tl` | Indonesian / Malay / Tagalog | Column-policy decision: stay `'orthography'` or add genuine broad transcription | (decision pending; default = `'orthography'`) |
| `ta` / `te` | Tamil / Telugu | Concept-level register policy (literary vs colloquial) | (policy pending) |
| `bo` | Tibetan | Lhasa Central per-cell verification | Wylie + IPA mapping |

While these rebuilds are pending, **do not** flip the row to `'ipa'`.
Keep the existing value (typically `'broad'` or `'orthography'`) until
the per-cell rebuild lands together with `meta.sources` and
`reviewStatus: 'source-checked'`.

### C3. Column conventions and concept policies (Audit Task 147)

The following conventions resolve the long-running policy questions that
were deferred across audit Pass 2-6. Each rule has a default and an
exception clause; per-row deviations must be documented in
`wordEvidence.note` or `meta.coverageNote`.

#### Tone and stress notation

- **Tone-required languages** (Mandarin, Cantonese, Vietnamese, Thai,
  Lao, Burmese, Yoruba, Hausa, Igbo, Naxi, Bouyei, Iu Mien, Hmong,
  Zhuang, Tai Lue, Shan): tone marks are required when
  `pronunciationType: 'ipa'`. Use Chao tone letters (˥ ˦ ˧ ˨ ˩) for
  Sinitic and Tai-Kadai; IPA tone diacritics (´ ` etc.) for African and
  South Asian. Pick one notation per language and document in
  `meta.coverageNote`.
- **Stress-required languages** (Italian, Spanish, Portuguese, Russian,
  Polish, Greek, German, French): `ˈ` (primary) and `ˌ` (secondary) are
  required when `pronunciationType: 'ipa'` and stress is contrastive or
  predictable-but-non-final. See C2 stress policy for when to add.
- **Both can be omitted** if `pronunciationType: 'broad'` and
  `meta.coverageNote` documents the omission.

#### Affricate notation (Audit Task 163)

- **`pronunciationType: 'ipa'` rows**: IPA tie-bar is **required**.
  Use `t͡s` (U+0361 COMBINING DOUBLE INVERTED BREVE) instead of bare
  ASCII `ts`. Same for `d͡z`, `t͡ʃ`, `d͡ʒ`, `t͡ɕ`, `d͡ʑ`, `t͡ʂ`, `d͡ʐ`,
  and aspirated variants `t͡sʰ`/`t͡ʃʰ`/`t͡ɕʰ`/`t͡ʂʰ`. Validator `[#163]`
  enforces this.
- **`pronunciationType: 'broad'`/`'romanization'`/`'orthography'` rows**:
  bare ASCII digraphs (`ts`, `dz`, `tʃ`, `dʒ`) are acceptable. Broad
  transcription legitimately uses bare digraphs.
- **Untagged rows**: assign `pronunciationType` first (Audit Task 76),
  then apply the rule for the assigned type.
- **Slavic family**: ASCII `ts` is acceptable across rows tagged `'broad'`
  (most regional Slavic varieties); rows promoted to `'ipa'` get tie-bar.
- **Turkic family** (Kazakh/Bashkir/Karachay-Balkar/Karakalpak): the
  conventions `w`/`y`/`q`/`x` are accepted as they reflect documented
  romanization standards; treat as `pronunciationType: 'broad'`.

#### Reconstructed-form notation (Audit Task 164)

For rows with `dataStatus: 'reconstructed'` (Proto-Indo-European `ine`,
Proto-Ryukyuan `pry`, Proto-Japonic-Koreanic `pjk`):

- **Surface column**: keep the asterisk reconstruction marker (`*kam`)
  and bound-stem hyphen (`*h₁ed-`).
- **IPA column**: strip both. The `*` and trailing `-` belong only in
  surface; IPA gives a phonological form ready to be read aloud.
- **Logographic-surface rows** (Old Korean `oko`, Goguryeo `okg`, Goryeo
  Korean `ko_gor`, Old Chinese `och`): surface uses Chinese characters
  and cannot carry `*`, so the reconstructed `*` appears in IPA only.
  This is a separate convention and is exempt from `[#164]`.
- Validator `[#164]` enforces the surface-only rule for Latin-script
  reconstructions.

#### Verb forms (eat / drink / love)

- **Default**: use the language's normal dictionary citation form.
- **Indo-European**: infinitive (English `eat`, German `essen`,
  French `manger`, Russian `есть`).
- **Semitic** (Arabic/Hebrew/Aramaic): Arabic uses 3rd-masculine-singular
  perfective (`أكل` ʔakala) following standard Semitic dictionary
  convention; Hebrew uses infinitive (`לאכול` leʔeχol). Both are correct
  per their respective lexicographic traditions; do not blindly impose
  one convention. Each Arabic dictionary entry must have
  `wordEvidence.note` explaining the perfective choice.
- **Verbal-noun languages** (Tamil, Telugu, Kannada, Tibetan): verbal
  noun is acceptable as citation form; document with
  `wordEvidence.note` if the language has both verbal-noun and finite
  citation traditions.
- **Bound-stem languages** (Inuit-Yupik, Iranian historical, Pashai,
  Burushaski, Wakhi): trailing-hyphen bound stems are acceptable per
  Task 103 with `wordEvidence.formType: 'bound-stem'`.

#### Native-speaker attestation as a source

A speaker reporting their own usage is a **primary source**, not a weaker
substitute for a dictionary. Record it as `evidence: 'direct'` with a `source`
that names it explicitly as speaker attestation, who provided it and when, plus
any published works they cite as counterparts.

Two things this protects against:
- Treating a dictionary as automatically superior. Published Ryukyuan
  dictionaries are decades old (the 沖縄語辞典 is from 1976) and list forms a
  present-day speaker may never use. Overwriting living usage with an archaic
  headword makes the map worse, not better.
- Treating speaker reports as unverifiable hearsay. They are checkable — by
  other speakers, and often by the dictionaries too. When both agree, say so in
  the note (see `ja_oki.woof`, where the 沖縄語辞典 and the speaker report match).

Where a speaker and a dictionary genuinely disagree, keep both in the record and
say which one the displayed cell follows and why.

#### Regional-variety verb/adjective forms (Japonic / Koreanic)

Rows that are regional varieties of Japonic (`ja`) or Koreanic (`ko`) — those
with `meta.parentCode: 'ja'`/`'ko'` and `meta.codeType: 'regional-variant'` —
display verb/adjective concept words (`eat`, `drink`, `good`) in the
**connective form** rather than the dictionary citation form.

(`parentCode` + `codeType` are the actual gate. An earlier version of this
section named `coverage: 'regional-variety' | 'base-copy-with-notes'`, but the
mainland JA rows carry `coverage: 'partial'` and the rule was applied to them
anyway — the wording is corrected here to match the data.)

- **Japonic regional varieties**: 〜て形 / 連用形 (e.g. `食べて`, `飲んで`,
  `良くて`). Dialect音便 differences become visible in this form:
  Hakata `飲うで` (ウ音便), Aomori `飲んで` (撥音便), Kagoshima `良かって`
  (〜か形 + っ + て).
- **Koreanic regional varieties**: 〜아/어 形 (e.g. `먹어`, `마셔`, `좋아`).
  Dialect endings and 보조용언 attach naturally here: Jeolla `좋아부러`,
  Pyongyang `먹어`, Busan stem-variant `묵어`.

**Known gap — `good` on the mainland JA rows is only half-migrated.** Only
`ja_aom` / `ja_sd` (良くて) and `ja_kg` (良かって) carry the connective form;
`ja_kyo` / `ja_osa` / `ja_hir` (ええ) and `ja_hak` (よか) are still citation
forms. Do **not** "finish" this without checking the contrast first: the
current mixed state yields four distinct surfaces (良くて / ええ / よか /
良かって), whereas converting the rest to the connective would merge 博多 into
鹿児島's 良かって and drop it to three. The connective rule demonstrably earns
its keep on `drink` (飲む is identical across all seven mainland rows in
citation form, but splits into 飲んで / 飲うで in the connective) — it does not
on `good`. A decision is pending; leave `good` alone until then.

The parent rows `ja` and `ko` keep the **dictionary citation form**
(`食べる`, `먹다`). This preserves cross-language comparability with
`en: eat`, `de: essen`, etc. The morphological mismatch between parent
(`ja: 食べる`) and dialect (`ja_osa: 食べて`) is intentional; do **not**
"normalize" dialect rows back to the citation form.

Per-cell `wordEvidence.formType`:
- `'connective-te'` for Japonic 〜て / 連用形
- `'connective-eo-a'` for Koreanic 〜아/어

Per-cell `wordEvidence.note` records the citation form, e.g.
`'citation: 食べる; connective 〜て form per regional-variety policy'`.

**Out of scope** of this policy (use their own forms):
- Historical stages (`ja_edo`, `ja_kanbun`, `ja_heian`, `ja_chu`,
  `ko_mid`, `ko_em`, `ko_gor`) — period grammar

**Sister-language extension — Jeju (`ko_jeju`)**: although Jeju is its own
Koreanic language (not a Korean dialect), the same connective-form philosophy
applies using Jeju's own 〜앙/엉 ending — the structural sister of Korean
〜아/어. The terminal `ŋ` is Jeju's hallmark feature and makes the form
visually distinct from mainland Korean (`먹엉` vs `먹어`, `좋앙` vs `좋아`).
Same `formType: 'connective-eo-a'` is reused.

**Sister-language extension — Ryukyuan languages, Okinawan only**: the
Ryukyuan languages are Japonic sister languages, but the extension currently
holds for **Okinawan (`ja_oki`) only**.
- **Okinawan (Northern Ryukyuan)**: 〜でぃ (-di) connective — the structural
  sister of Japanese 〜て. eat: `食でぃ` kadi, drink: `飲でぃ` nudi.
  `formType: 'connective-te'`. Adjective `まし` left as-is pending native
  verification.
- **Miyako (`ja_mvi`) and Yaeyama (`ja_rys`) — withdrawn, citation forms /
  provisional.** Both are **Southern Ryukyuan** (Macro-Yaeyama); Yaeyama is
  most closely related to Miyako, **not** to Okinawan. An earlier revision of
  this section classified Yaeyama as Northern Ryukyuan and gave it Okinawan's
  forms verbatim (`食でぃ` kadi, `飲でぃ` nudi), which is why `ja_oki` and
  `ja_rys` were displaying identical cells.
  - `ja_mvi` eat is restored to the sourced citation form `食ー` foː
    (ja.wikipedia 宮古語). The previous `食み` kami was built on 噛む kamu;
    Miyako's verb for "eat" is an f-initial reflex of 食(く)ふ. `ja_mvi` drink
    is likewise back to citation `飲む` numu so the row is internally
    consistent.
  - `ja_rys` eat is restored to the sourced citation form `食ーん` ɸoːŋ
    (ja.wikipedia 八重山語, 石垣方言 活用表: 終止形1 hoː / 終止形2 hoːN). The
    f/h-initial reflex it shares with Miyako foː is itself evidence for the
    Southern grouping.
  - `ja_rys` drink is **still an Okinawan copy** (`飲でぃ` nudi), marked
    `evidence: 'inferred'` with a PROVISIONAL note — the Yaeyama verb
    conjugation table available online does not cover 飲む. It needs a
    dictionary source (e.g. 宮城信勇『石垣方言辞典』) before it can be trusted.
  - `good`: `ja_oki` is now `ゆたしゃん` jutaɕaɴ, sourced from 国立国語研究所
    『沖縄語辞典』(首里方言), which lists it as the adjective「よい。いい。
    よろしい」. The previous `まし` maɕi was wrong for this concept — the same
    dictionary lists masi as a **noun**「一方よりまさること」("better /
    preferable"), not the general adjective. `ja_mvi` and `ja_rys` still carry
    the inherited `まし` and need per-language sources; no online source for
    Miyako/Yaeyama "good" has been found so far.
  - Verb forms for `ja_mvi` / `ja_rys` are now the connective 食い fai / ɸai
    and 飲み numi, reader-reported and consistent with the 食(く)ふ stem the
    Wikipedia conjugation tables give (Miyako foː, Yaeyama 語幹 hwa-). They are
    `evidence: 'inferred'` — dictionary confirmation is still wanted.
  - The Miyako/Yaeyama cells for mother, father, love, cat, one, hello and
    woof were corrected in 2026-08 from **native-speaker attestation**
    (@Soda_Limer on X). Several of them — mother, father, cat, love — had been
    holding Okinawan-shaped values in both southern rows, the same copying
    pattern that produced the eat/drink error.
  - `good` is now sourced for all three, via 琉球大学「大琉球語辞典」 (a
    cross-search over 首里 / 今帰仁 / 奄美分類 / 与論 / 伊江島 / 伊良部 /
    石垣): Okinawan ユタサン, Miyako ぞーはン (伊良部方言辞典), Yaeyama
    カイシャーン (石垣方言辞典). All three had been holding `まし` maɕi, which
    is a **noun** meaning "preferable", not the adjective.
  - Okinawan `good` is displayed as ゆたさん following 大琉球語辞典, which
    renders that 首里 headword ユタサン and distinguishes サン from シャン
    elsewhere (与論 ユタシャン, 伊江島 ユタシャ). Note that the 沖縄語辞典's own
    romanization of the same entry is `'jutasjaN`, which would read ゆたしゃん.
    The discrepancy is recorded in `wordEvidence` rather than resolved silently.

Do not extend this policy to a Ryukyuan language without first checking its
subgroup (`meta.family`) — Northern and Southern Ryukyuan have different verb
morphology, and copying across the split is what produced the error above.

#### Concept scope: heart, mother/father, one

- **`heart`**: default is *emotional/cognitive* "heart" where the
  language has a basic everyday term for it. Anatomical heart is
  acceptable when the emotional sense uses a different concept entirely.
  Document the choice in `wordEvidence.conceptEvidence: 'noted'` for
  rows where the choice is non-obvious (Indonesian/Malay `hati` =
  liver/heart-as-feeling; Thai `ใจ` = heart/mind/spirit; Korean `마음` =
  mind/heart/feeling; Japanese `心` = heart/mind/spirit).
- **`mother` / `father`**: default is the *neutral citation form*
  most Indo-European dictionaries use. Languages may use child/familiar
  register (e.g., Chinese `妈妈/爸爸`, English AAVE `mama/daddy`) where
  the formal counterpart is rarely used in everyday speech; document
  this in `meta.coverageNote`.
- **`one`**: default is the *masculine/default citation form* where the
  language has gender-marked numerals (Arabic `واحد`, Hebrew `אחד`,
  French `un`, Spanish `uno`, Italian `uno`). Document gender in
  `wordEvidence.note` when the choice would otherwise mislead.

#### Mandarin tone sandhi

- **Default**: keep underlying citation tones in the IPA column. Sandhi
  is rule-based and predictable; the citation form is more useful for
  cross-language comparison than the surface form.
- Example: 你好 = `ni˧˩˧xaʊ̯˧˩˧` (citation), not `ni˧˥xaʊ̯˨˩˦` (after
  third-tone sandhi). Document this in
  `meta.coverageNote` for the Mandarin row.

#### Quebec French

- `fr_qc` represents Québec French. Treat as a `regional-variety` of
  `fr` with `coverage: 'partial'`. Differences from `fr` should focus on
  lexical items that distinguish Québec usage (e.g., `bonjour` vs `allô`)
  rather than full phonetic re-transcription.

#### Arabic MSA vs dialect labeling (Audit feedback §31)

- `ar` represents **Modern Standard Arabic (MSA)**. Use Cairo
  pronunciation values for the IPA column where dialects diverge (e.g.
  *ǧīm* as `[g]` is a Cairo realisation; *qāf* `[q]` is the MSA target,
  not the Cairo `[ʔ]`).
- Dialect rows (`ar_eg`, `ar_lev`, `ar_gulf`, `ar_iq`, `ar_ma`,
  `ar_tn`, `ar_sd`) should reflect *that dialect's* phonology, not
  MSA. Do not copy MSA forms into a dialect row "for completeness."
  Mark dialect rows with `parentCode: 'ar'`,
  `coverage: 'regional-variety'`, and `pronunciationType: 'ipa'` once
  per-cell sourcing is in place.
- Disambiguator: when a native name is shared (e.g. modern MSA
  `العربية` vs `العربية الفصحى`), set `meta.disambiguator` (Audit
  Task 188) to differentiate.

#### Orthographic-IPA family review (Audit feedback §19/§20/§21)

For families where the IPA column was historically populated from
spelling rather than from a transcribed source — Lakota / Dakota
(`lkt`/`dak`), Navajo (`nv`), Inuit-Yupik (`iu`/`ik`/`kal`/`yup`/
`ess`/`ipk`), and any new Sioux-cluster row — use:

- `pronunciationType: 'broad'` until per-cell narrow IPA is sourced
  from a published reference grammar (Boas, de Reuse, Young & Morgan,
  etc.).
- Mark the row with `meta.coverageNote: 'orthographic-derived; awaiting
  per-cell phonetic source.'`
- Do **not** silently add stress / tone / nasalization marks until the
  source is named in `meta.sources`.

#### Georgian transliteration vs IPA (Audit feedback §23)

- `ka` IPA column uses Georgian-IPA, **not** romanization.
  Specifically: ejectives written as `pʼ tʼ kʼ tsʼ tʃʼ qʼ`; uvular
  `q` (`ყ`) is `[qʼ]` (ejective uvular stop), not `[q]`.
- The validator does **not** accept `kh` / `gh` / `tsʼ` written with
  ASCII apostrophe (`'`); use the modifier letter apostrophe `ʼ`
  (U+02BC).
- Georgian transliteration (e.g. ISO 9984, Mkhedruli-to-Latin) belongs
  in the *surface* column only when the row is romanized — for `ka`
  itself, surface stays Mkhedruli script.

#### Regional-variety coverage flag (Audit feedback §38-§43)

Rows marked `meta.coverage: 'regional-variety'` (e.g. `es_mx`, `fr_qc`,
`zh_db`, `en_app`) should:

- Inherit pronunciation type from the parent unless the variety has a
  documented phonological difference. Set
  `meta.varietyRole: 'regional-variant'` (Audit Task 170).
- Use `meta.coverageNote` to describe what differs from the parent
  ("`fr_qc` differs from `fr` lexically [`allô`, `dépanneur`] but
  shares the standard French phonology in the IPA column.").
- Avoid fabricating differences. If a variety is identical to the
  parent for the 20 concept words, that's a legitimate result —
  document with `coverage: 'base-copy-with-notes'` (Audit Task 90 family).

#### Asian minority-language tone omission (Audit feedback §51-§58)

Per-family tone-source policy for the deferred minority-language
batch:

| Family / language | Source for tone | Status |
|---|---|---|
| Naxi (`nxq`) | Michaud (Lijiang A-sher Naxi phonology) | ✅ done |
| Bouyei (`pcc`) | Snyder & Long 1983, modern SIL | ✅ done |
| Tujia (`tji`) | Brassett & Brassett 2005 | ✅ done |
| Iu Mien (`ium`) | Court 1985, Wiktionary | ✅ done |
| Tai Lue (`khb`) | Hartmann & Owens, SIL Mainland-SE-Asia | ⏳ pending |
| Shan (`shn`) | Cushing 1887, Sai Kham Mong (modern SIL) | ⏳ pending |
| Lahu (`lhu`) | Matisoff 1973, 1988 | ⏳ pending |
| Mlabri (`mra`) | Rischel 1995 | ⏳ pending |
| Khmu (`kjg`) | Suwilai Premsrirat | ⏳ pending |
| Wa (`prk`) | Watkins 2002 | ⏳ pending |
| Hmong (`hmn`) | Heimbach 1969, Mortensen | ⏳ pending |
| Zhuang (`za`) | Zhang Junru, modern Wuming-standard | ⏳ pending |
| Jingpo (`kac`) | Hanson 1906, modern reference | ⏳ pending |
| Akha (`ahk`) | Lewis 1968, Hansson 1989 | ⏳ pending |

Until a row in this list is sourced, keep `pronunciationType: 'broad'`
and **do not** mechanically add tone marks from cognate sources.

#### Coverage / confidence flag schema (Audit feedback §43)

The schema field `meta.coverage` (Audit Task 90/170/172) accepts:

| Value | Meaning |
|---|---|
| `'full'` (or unset) | All 20 cells sourced and reviewed. Default. |
| `'partial'` | Some cells unsourced; row otherwise reviewed. Set `meta.coverageNote` listing which concepts are partial. |
| `'base-copy-with-notes'` | Variety row that copies from `parentCode` for most cells; documented differences in note form. |
| `'regional-variety'` | The row is a regional/dialectal variety with substantive lexical or phonetic differences. Pair with `meta.varietyRole`. |
| `'orthographic-derived'` | IPA column derived from spelling, not from a transcribed source. Treat as `pronunciationType: 'broad'` until rebuilt. |
| `'machine-seeded'` | Initial bulk import, not yet reviewed. Use only with `reviewStatus: 'machine-seeded'`. |
| `'fragmentary'` | Historical / endangered / very-low-data row where some concepts are genuinely unattested (`'—'` cells). |

### C5. Word-cell evidence schemas (Audit Tasks 97 / 133 / 195)

`wordEvidence` is a per-cell sub-record on each language row. It carries
the *why-this-form*, *what-was-the-source*, and *what-confidence* signal
that the validator and modal display use. Two shapes are supported:

#### Preferred (split) schema — Audit Task 195

Use the split schema when the form, pronunciation, and concept come
from different sources, or when a cell deserves explicit evidence in
each of the three streams. This is the **preferred form for new entries**:

```js
words: { eat: ['먹다', 'mʌktɐ'] },
wordEvidence: {
  eat: {
    formEvidence: 'direct',           // direct | proxy | reconstructed | inferred | disputed | pedagogical | noted
    pronunciationEvidence: 'direct',  // same enum
    conceptEvidence: 'direct',        // same enum
    formType: 'inflected-form',       // free-word | bound-stem | root | inflected-form | phrase | reconstructed-root | agreement-stem | greeting-formula | thanks-formula | compound | light-verb-construction
    citation: {
      short: 'Lee 2003',              // display label (validator: required)
      type: 'grammar',                // dictionary | grammar | inscription | wordlist | database | article | internal-review | reference
      author: 'Lee, K-M.',
      year: 2003,
      title: 'A History of the Korean Language',
      page: 'p. 47',
    },
    note: 'Standard verb-stem 먹- with the active-converbial -다.',
    accessed: '2026-04-01',           // ISO date when the URL/source was checked
    url: 'https://example.com/...',
  },
}
```

#### Legacy (unified) schema — still accepted

The legacy unified shape is the historical default and remains
supported. Migrate to the split schema only when the three streams
genuinely diverge:

```js
wordEvidence: {
  eat: { evidence: 'direct', source: 'Lee 2003', note: 'Standard verb stem.' },
}
```

#### Pilot guidance (Audit Task 195)

- **When to use split**: rows where form / pronunciation / concept
  come from clearly distinct sources. Old Korean (`oko`) and Old
  Japanese (`ojp`) are good pilots — Hyangchal/Manyōgana corpus for
  the form, reconstructed phonology for the pronunciation,
  semantic interpretation for the concept.
- **When NOT to use split**: rows where one source covers all three
  streams (a normal modern dictionary entry). The split is more
  verbose; redundant detail is noise.
- **Citation object**: required when `citation` is set. `short` and
  `type` are mandatory (validator `[#13t]`). `year`, `author`,
  `title`, `page`, `url`, `accessed` optional but encouraged.
- **`accessed`**: ISO date `YYYY-MM-DD` (validator `[#13r]` warns on
  other formats).
- **`url`**: must be `http://` or `https://` (validator `[#13r]`
  errors otherwise).
- **Coverage**: track adoption via the validator's INFO line
  `split-evidence adoption: N/M cells use split schema (legacy=…,
  pilot=…); K still on unified { evidence, source } form`.

#### Stream-name conventions: legacy vs pilot (Audit Task 195)

Two stream-name conventions are accepted. New rows should adopt the
pilot names; legacy names are retained so existing `Task 97`-era cells
keep validating.

| Slot | Legacy (Task 97) | Pilot (Task 195) |
|---|---|---|
| Form / surface evidence | `formEvidence` | `languageEvidence` |
| Pronunciation evidence | `pronunciationEvidence` | `pronunciationEvidence` |
| Concept / meaning evidence | `conceptEvidence` | `semanticEvidence` |

The pilot names better describe the *evidence stream*, not the field
location: `languageEvidence` covers spelling + morphology + grammatical
shape; `semanticEvidence` covers concept-mapping decisions
(anatomical-vs-emotional `heart`, citation-form policy, etc.). The
validator (`[#195]`) warns if a single cell mixes the two conventions.

#### URL citation reproducibility (Audit Task 189)

Every `wordEvidence.url` and every `wordEvidence.citation.url` **must**
ship with an `accessed` date in ISO 8601 (`YYYY-MM-DD`) format. Without
it the citation is unverifiable once the upstream content changes.

Validator rules (`[#189]`):

- `wordEvidence.url` set + `wordEvidence.accessed` missing → WARN
  during the migration window; promote to ERROR after Phase 1 backfill
  lands.
- `wordEvidence.accessed` not matching `YYYY-MM-DD` → ERROR.
- `wordEvidence.accessed` in the future (vs system date) → ERROR.
- `wordEvidence.accessed` older than 1 year → INFO (counted in the
  coverage line; consider re-verifying the URL).
- Same rules apply to `wordEvidence.citation.url` /
  `wordEvidence.citation.accessed`.

Backfill plan:

- **Phase 1** — the 24 `'source-checked'` rows (per Task 173). Each
  cell with a URL gets `accessed`. Promote `[#189]` WARN to ERROR at
  the end of Phase 1.
- **Phase 2** — next 50 priority rows.
- **Phase 3** — opportunistic.

When the upstream URL is dead, replace with an `archive.org` snapshot
and document the substitution in `wordEvidence.note`. Do **not** invent
accessed dates; if the cell was authored without a recorded date, leave
the field unset and add it during the next verification pass.

### C4. Languages intentionally not represented as rows (Audit Task 150 Batch J)

The 20-word × IPA schema cannot honestly represent every linguistic
phenomenon. The following are *consciously omitted* — recording them
here so future contributors do not add misleading rows:

- **Whistled languages** (Silbo Gomero on La Gomera, Mazatec whistled,
  Kuşköy whistled Turkish, Pirahã whistled register, Akha whistled
  speech, etc.). These are *registers* of their host languages — the
  whistled form encodes the host language's prosody/tone, not a
  separate phoneme inventory. Adding them as separate rows would
  duplicate the host language's data with a fake "IPA" column.
  *Action:* document the host language; mention whistled register in
  `meta.coverageNote` if relevant.
- **Signed languages** (American Sign Language `ase`, British Sign
  Language `bfi`, Japanese Sign Language `jsl`, etc.). See Task 142
  for the modality decision. Sign languages need a `modality: 'signed'`
  field and either SignWriting (Sutton SW, Unicode U+1D800–U+1DAAF) or
  curated video URL handling — the `[surface, ipa]` pair cannot
  represent handshape/movement/orientation/non-manual markers.
- **Drum languages, click sub-systems used as games, secret-society
  registers** (e.g., Sranan Tongo `kromanti` ritual register, Yoruba
  drum talk, Pig Latin / Verlan / similar play-language registers).
  Same issue: they encode the host language's segments/tones via a
  different medium, not separate phoneme inventories.
- **Thieves' cant / criminal argots** (Polari, Cant, etc.). Lexically
  parasitic on a host language with limited speaker community; better
  documented in linguistic ethnography than in a comparative word map.

If a contributor proposes adding any of the above, point them to this
subsection and discuss the underlying schema work first.

### D. Coordinates / 座標

`lat/lng` is a single representative point (the prestige center, capital, or historical site). The map auto-stacks labels at duplicate or near-duplicate coordinates, so don't worry about exact uniqueness — use the geographically meaningful point for the speaker community.

For diaspora languages or L2 lingua francas, pick the historical/cultural center (e.g. English → London, Spanish → Madrid). For ancient languages, use the historical capital or main archaeological site (e.g. Akkadian → Babylon, Tangut → Yinchuan).

### E. Meta fields / メタフィールド

| Field | Required | Notes |
|---|---|---|
| `family` | yes | Top-level family name + parenthetical sub-branch. E.g. `'Indo-European (Romance)'`, `'Sino-Tibetan (Min Nan)'`. Top token must be in the validator's allow-list (currently 70+ accepted families). |
| `speakers` | yes | Best estimate as a single number (M/K) plus optional annotation in parens. E.g. `'~125M'`, `'~25K (fluent)'`, `'Extinct (liturgical)'`. Annotations like L2/L1, total, regional aggregate, lingua franca should be in the parenthetical so they translate via the speaker-atom translator. |
| `countries` | yes | Comma-separated country names (top-level only). E.g. `'India, Sri Lanka'`. |
| `official` | yes | Official status. `'No'` if none, otherwise specific countries/regions. |
| `script` | yes | Writing system(s). Slash-separated for alternatives. Normalize to terms recognized by `detectScript()` in lang-filter.js (`Latin`, `Cyrillic`, `Han characters`, `Brahmic`, `Arabic`, etc.). |
| `description` | yes | Object with translations. Must have AT LEAST: `en`, `ja`, `ko`, `zh`, `de`, `fr`. Strongly recommended: `es_eu` (or `es`), `pt_eu` (or `pt`), `ru`. |

### F. Speakers field / 話者数フィールド

Per `wordmap-check.md` §5, speaker counts mix several bases (L1, total L1+L2, regional aggregate, etc.). When in doubt, prefer L1 native-speaker counts and annotate the parenthetical:

```js
speakers: '~270M'                                       // L1 (Bengali — straightforward)
speakers: '~100M (total; L2 lingua franca, L1 ≈ 15-20M)' // total + breakdown
speakers: '~140M (regional aggregate across African Francophone countries)'
speakers: '~80M (Wu Chinese family total; Shanghainese alone ~15-20M)'
speakers: '~25K (fluent)'                               // endangered/revived
speakers: 'Extinct (liturgical)'                        // historical/Latin/etc.
```

The speaker-tier filter takes the first numeric value, so annotations don't break tier classification — they just make the panel display the basis honestly.

### G. Historical languages / 歴史言語

For codes added to `HIST_DESCENDANT` in `wordmap.html`:

1. Also add the code to `EXCLUDED_CODES` in `wordmap_data.js`.
2. Pair with a representative modern descendant if one exists (`{hist: modern}`), or `null` if not.
3. Use `'—'` for unattested word entries (fragmentary languages will have many).
4. In the `description`, be explicit about reconstruction status: `'…reconstructed by comparative method'`, `'…attested in inscriptions only'`, etc.
5. Speaker count should be `'Extinct'`, `'Extinct (liturgical)'`, `'Extinct (~Nc. CE)'` etc. — never a number unless revived.

### H. Cache busters

Always bump after data changes:

```html
<script src="wordmap_data.js?v=N+1"></script>
<script src="meta_i18n_ext.js?v=N+1"></script>
<script src="meta_i18n_coverage.js?v=N+1"></script>
<script src="lang-filter.js?v=N+1"></script>
<script src="lang_names.js?v=N+1"></script>
s.src = 'wordmap_meta.js?v=N+1';
```

This keeps the user's browser from serving stale data after a deploy.

`meta_i18n_coverage.js` is a layered patch over `meta_i18n_ext.js` — when adding new
country / family / script / region phrases, prefer extending the
<code>COMMON_PHRASES</code> table there (one row per phrase, 11 non-Latin UI columns) and
the <code>COMMON_PHRASES_LATIN</code> table for de/fr/es/it/pt/id/sw. Don't edit the
base atoms in <code>meta_i18n_ext.js</code> for compound phrases; the layered approach
keeps base translations stable and lets coverage iterate without merge churn.

#### Drift detection (Audit Task 198)

The validator's `[#19]` check compares every `<script src="X.js?v=N">`
in `wordmap.html` against the central `WM_ASSET_VERSION` registry and
flags mismatches. Two enforcement modes:

- **Local development (default)**: drift surfaces as WARN. Iteration
  is not blocked, so you can bump multiple files in one editing
  session without the validator complaining halfway through.
- **CI / strict mode (`WM_VALIDATE_STRICT=1`)**: drift escalates to
  ERROR. The GitHub Actions workflow runs strict mode and fails the
  PR if any cache-buster value disagrees with `WM_ASSET_VERSION`. A
  separate `cache-buster-drift-gate` job surfaces the exact
  mismatched lines in the PR check output.
- **Monotonic-baseline guard**: each `WM_ASSET_VERSION` value must be
  ≥ the recorded floor (`WM_VERSION_FLOOR` in
  `validate_wordmap_data.js`). Always ERROR — a rollback below the
  floor is never legitimate. Update the floor only when the current
  value exceeds it by ≥ 10 to avoid micro-tracking.

Optional pre-commit hook (`.githooks/pre-commit`) runs the validator
before each commit and surfaces drift inline. Install once:

```bash
git config core.hooksPath .githooks
```

The hook fails the commit only on validator ERROR; drift is shown as a
warning hint so you can decide whether to bump in this commit or the
next. Bypass for work-in-progress with `git commit --no-verify`.

### I. Cantonese must use Traditional Chinese (recap from §5 above)

Applies to `wordmap_data.js` too: `LANG_DATA.yue.native` and any words for `yue`/`yue_*` codes must be Traditional. Same for Taiwanese Hakka (`hak_tw`), Taiwanese (`nan`), and other Traditional-using varieties.

### J. Optional richer schema (added per wordmap-check.md "all A" decisions)

These fields are **optional** for backward compatibility — existing entries don't need to be migrated en masse. New entries (and any audit/correction pass) should adopt them. The validator checks shape when present, so missing fields are fine but malformed ones fail.

```js
// In wordmap_meta.js — add to any LANG_DATA[code].meta = { … } object:
speakerBasis: 'L1',                    // 'L1' | 'total' | 'regional-population' | 'aggregate' | 'liturgical' | 'extinct' | 'uncertain'
speakerSource: 'Ethnologue 26',        // free string (citation)
speakerYear: 2023,                     // 4-digit year

// Audit Task 220: structured speakerCount supersedes the prose `speakers`
// + scalar speakerBasis/Source/Year fields. Add new entries here (or via
// SPEAKER_COUNT_OVERLAY at the bottom of wordmap_meta.js for bulk).
speakerCount: {
  // Pick ONE shape:
  //   point  — single best estimate
  l1:        125_000_000,        // L1-only count (preferred when the basis is L1)
  total:     1_500_000_000,      // total incl. L2 (used when L1 unknown / aggregate)
  l2:        80_000_000,         // optional L2-only count
  range:     'point',            // 'point' (single number) | 'range' (uncertainty band)

  //   range  — explicit uncertainty band
  range:     'range',
  rangeMin:  5_000,
  rangeMax:  10_000,
  l1RangeMin: 60_000_000,        // optional: when l1 has its own band but total is point
  l1RangeMax: 85_000_000,

  // Required metadata
  year:      2024,                // 4-digit census/source year
  source:    'Ethnologue 27',     // free citation string
  exact:     true,                // optional: true if the number is a published exact figure
                                  // (omit for "≈" / "~" estimates — most cases)

  // Optional vitality flag (used for color-coding in modal display)
  vitality:  'vulnerable',        // 'extinct' | 'critically-endangered' |
                                  // 'severely-endangered' | 'definitely-endangered' |
                                  // 'vulnerable'

  // Optional qualitative notes (rendered as small line below main number)
  notes:     'L1 ≈ 380M; L2 ≈ 1.1B (the largest L2 community of any language)',
},

iso6393: 'jpn',                        // ISO 639-3 (3-letter, lowercase)
glottocode: 'nucl1643',                // Glottocode (4 letters + 4 digits)
parentCode: 'zh',                      // for varieties — must exist in LANG_DATA
sources: [                             // CANONICAL citations array — structured.
  { type: 'reference', title: 'Ethnologue 26', url: 'https://...', accessed: '2026-05-04' },
  { type: 'dictionary', title: 'CIP online dictionary', url: 'https://...' }
],
// references: [...] — legacy string-only field. Still rendered in the modal
// bibliography footer for backward compatibility, but DO NOT add new entries
// here. Use the structured `sources` array above. (Audit Task 91, 2026-05-05)

// CANONICAL placement — Audit Task 131: meta.locationBasis is canonical.
// Do not add new top-level lang.locationBasis entries; the validator now warns.
meta: {
  locationBasis: 'capital',            // 'capital' | 'prestige-center' | 'historical-site' | 'largest-city' | 'approx-region'
}
```

Reference example: see `LANG_DATA['ja']` in `wordmap_meta.js` and `wordmap_data.js`. Used as the schema reference; the validator's "Optional schema adoption" line counts how many entries have each field.

Why these fields:
- **speakerBasis**: per `wordmap-check.md §5`, the bare speaker number mixes L1, total, regional aggregate, and liturgical bases — making "100M+" fragile. The `speakerBasis` enum makes the basis explicit so downstream tools can compare like-for-like.
- **speakerSource / speakerYear**: per §15, no source/date in current data. Knowing whether a number is from Ethnologue 2023 vs. a 1980 census matters for endangered-language estimates.
- **speakerCount** (Audit Task 220): supersedes the prose `meta.speakers`. Lossy-prose ("~125M", "5,000-10,000") becomes a structured shape (`l1` / `total` / `rangeMin` + `rangeMax`) plus required `year` and `source`. The modal renderer (`formatSpeakerCount` in `wordmap.html`) reads it and emits per-UI-lang formatting (ja `5,000〜10,000` / `1.25億`; en `5,000–10,000` / `125M`; zh `1.25亿` / `万`-unit). The filter (`speakerTierFromStructured` in `lang-filter.js`) reads `l1 ?? total ?? rangeMax` to classify the row's tier, falling back to the legacy prose parser when `speakerCount` is missing. As of 2026-05-07 the bulk parser (Phase 1) backfilled 852/910 rows (93.6%); 54 rows with unparseable prose remain in `/tmp/task220_unparseable.txt` for manual review.
- **iso6393 / glottocode / parentCode**: per §13, the LangMap codes are a mix of ISO 639-3, ISO 639-1, and custom (`zh_sc`, `ja_edo`). Adding canonical IDs makes interop with Glottolog / WALS / Ethnologue trivial. **Note (Audit Task 178): `meta.iso6393` is the canonical field for ISO 639-3 codes. The earlier `meta.canonicalCode` field is deprecated — `CANONICAL_CODE` runtime initializer now writes into `iso6393`. Validator `[#178]` warns if `canonicalCode` is still set on any row.** **Audit Task 177: `iso6393` is auto-backfilled at runtime from a 2-letter→3-letter map (`ISO_639_1_TO_3`) for codes without explicit assignment, plus identity for 3-letter row codes. Coverage is 619/619 (100%); contributors adding new rows do not need to set `iso6393` manually if the row code is already an ISO 639-1 or 639-3 code.**
- **reviewStatus** (Audit Task 172): every row has an explicit `meta.reviewStatus` after the runtime backfill. Initial value is determined by a heuristic over `wordEvidence` and `meta.sources`: rows with both per-cell evidence (≥5 cells) AND row-level sources → `'source-checked'`; rows with at least one form of evidence → `'human-reviewed'`; otherwise `'machine-seeded'`. Override the default by adding the row to the `REVIEW_STATUS` map at the top of `wordmap_meta.js`. Validator `[#172]` warns when a row has rich evidence but is still flagged `'unreviewed'` or `'machine-seeded'`.
- **locationBasis**: per §9, the single `lat/lng` mixes capital / prestige center / historical site / approx region. Knowing the basis prevents the map from being misread as "speaker distribution."
- **sources**: per §15, source citations should at minimum exist at language level for accountability. Per-word `sources` is not required (would be 11,580 entries) but supported via the same shape if you want to record per-form citations.

### K. WORD_LIST shape (refactored 2026-05-04, definition added 2026-05-05)

Each `WORD_LIST` entry has the shape:

```js
{
  id: 'water',
  definition: {
    en: 'Drinkable water (H₂O); ...',
    ja: '飲用・生活用の水 (H₂O)。...',
    ko: '마시거나 일상에 쓰는 물 (H₂O). ...',
    zh: '可饮用或日常使用的水 (H₂O)；...'
  },
  label: { en, ja, ko, zh, id, … }
}
```

The Indonesian key is `id` (not `ind` like before — the legacy collision-avoidance was needed when the entry's own id was a top-level field, but now it's nested in `label` so there's no clash).

**Required for new concepts:**
- `id`: lowercase ascii identifier
- `label.en` and at least `ja`, `ko`, `zh`, `de`, `fr`, `es`, `pt`, `ru`, `ar`
- `definition.en` (required) plus `ja`, `ko`, `zh` (priority UI langs per validator check #12b')

**`definition` semantics** — defines the intended concept, not just UI help text. It locks down what each cell should mean so that future reviewers don't "fix" valid cells to a different sense. Difficult concepts that especially benefit from clear definitions:

| Concept | Why it needs explicit definition |
|---|---|
| `heart` | Anatomical organ vs mind/soul (E/SE Asian langs use 心/마음/ใจ for the latter) |
| `love` | Noun vs verb citation form depending on language |
| `good` | Adjective form; not the adverb "well" or a greeting response |
| `hello` | Neutral everyday greeting, not time-of-day forms unless the language only has those |
| `eat` / `drink` | Citation form policy (infinitive / Semitic perfective 3ms / SE Asian bare stem) |

If you add a new concept, include `definition` in the Option A multilingual-object shape. The renderer falls back to `definition.en` for missing UI langs, with a visible "(English fallback)" note (per Task 121).

The validator (#12b' / #12b") requires:
- `definition.en` present (ERROR if missing)
- `definition.ja`/`ko`/`zh` strongly recommended (WARN if missing)
- String `definition` rejected (the legacy partial implementation from Task 82 is now blocked)

### L. LANG_NAMES is now in `lang_names.js`

Previously embedded in `app.js` and extracted by `wordmap.html` via `fetch + regex + new Function` (per `wordmap-check.md §12`). Now in a standalone file `lang_names.js`, loaded by both `index.html` and `wordmap.html` via a normal `<script>` tag.

When adding a new language: append the new code to the appropriate per-UI-lang dict in `lang_names.js` for all 21 UI langs. The dedup-aware Python helpers in `/tmp/add_*_lang_names*.py` handle this.

### M. Coverage roadmap to 1,000 languages — Tiers 5 through 13 (Audit Task 197)

The Word Map currently covers ~620 languages and is on a long-running
expansion path to 1,000+. Tiers 1–4 (Tasks 141 / 142 / 149 / 150 / 196)
proposed ~63 languages on top of the current count. Tiers 5–13 below
plan the remaining ~318. **Treat each tier as a sequence of 5–10 lang
sub-batches; never land an entire tier in one commit.**

#### Tier list

| Tier | Region / family | Count | Cumulative | Notes |
|---|---|---:|---:|---|
| 5 | Sign languages (ase / bfi / jsl / asf already; +nzs, lsf, gsg, kvk, csl, bzs, ins, psl, lsc, lse, tsq, gss, dse, ils, slf, pks, ssp, cse) | +30 | 712 | Requires Tier 2 modality decision (Audit Task 142) before any signed lang lands. Atom translations must tag `modality: 'signed'`. |
| 6 | Australian Aboriginal — Pama-Nyungan + non-PN (wbp, kld, xrr, gbb, mwf, dhg, djr, gnn, gun, ahw, tcs, Tiwi, etc.) | +25 | 737 | Cite Glottolog + AIATSIS for every row. Make Ngumpin-Yapa / Wati / Arandic sub-branches explicit in `meta.family`. ICIP-aware sourcing. |
| 7 | Papuan — Trans-New Guinea (Engan, Mountain Ok, Madang, Eastern Highlands, Asmat-Kamoro, West Papuan, Sepik, Lakes Plain) + Skou / Kwomtari | +30 | 767 | Initial `reviewStatus: 'machine-seeded'`; SIL PNG/Indonesia databases primary. |
| 8 | Native American extension — California (Pomo, Maidu, Yokuts, Wintu, Hupa); Mesoamerican (Mixe, Mazatec, Totonac, Chinantec, Huave); Salishan, Iroquoian; Algic ext.; Plains | +50 | 817 | Cite tribal language programs where they exist; document L1/L2/heritage distinctions for revitalization-stage rows. |
| 9 | Bantu extension — E40-50, F, J, L, M, N, R sub-branches (Embu, Meru, Sukuma, Nyamwezi, Soga, Luba, Hemba, Tumbuka, Kuanyama, etc.) | +50 | 867 | Set `meta.grammarCapsule.gender.system: 'noun-class'` with the count per row (Audit Task 153 schema). |
| 10 | Pacific & Austronesian completion — Philippine (mrw, mdh, tsg, ifb, xsb), Indonesian regional (btx), Polynesian completion (wls, fud), Micronesian (cal, gil, kos), Melanesian | +40 | 907 | Many already exist — Tier 10 fills regional sub-batches rather than starting from zero. |
| 11 | Sino-Tibetan minor + Karenic — Naga (nbt, aii, nbe, kne, lhm), Karen (pwo, kjp, pdu, kyu), Lolo-Burmese (lis, mwq), Tibetan (adx, khg, dre, loy), Bodish minor (bft, lbj) | +40 | 947 | Tone systems differ per language; per-row tone sourcing required. |
| 12 | Niger-Congo extension — Atlantic (srr, bsc, Pulaar dialects), Mande (mlq, snk, sus), Volta-Niger (idu, iji, hag), Adamawa-Ubangi (dyo) | +30 | 977 | Use **Atlantic-Congo** convention per Task 159; don't reintroduce `Niger-Congo (Bantu, ...)`. |
| 13 | Mesoamerican / Andes / isolates — Maya (kek, cak, poc, usp), Otomanguean (mim, trs, top), Andean (qul, quz, quy), South American (gug, tpw), isolates (hai, tar, way) | +25 | 1,002 | Quechua varieties differ at IPA level — source each individually, never copy from `qu` macro. |

#### Cross-cutting requirements (every tier, every row)

These map directly to the per-batch checklist in §B above. **Skipping any
of these regenerates lang_names backlogs and family-string drift that
later tasks (Tasks 143, 159, 175, 184) have to clean up.**

1. **`lang_names.js` — all 21 UI sections.** Not 4 (`en/ja/ko/zh`); 21
   (`en, ja, ko, zh, yue, vi, th, id, hi, de, fr, it, es_eu, es_mx,
   pt_eu, pt_br, ru, uk, ar, he, sw`). Validator's `lang_names.<UI>:
   N/M` warning catches every regression.
2. **`meta.description` — multilingual object.** Plain string is
   deprecated (Audit Task 145). Fill `en/ja/ko/zh/de/fr` minimum.
   Tiers 9 (Bantu) and 12 (Niger-Congo): also fill `sw`.
3. **`meta_i18n_coverage.js` + `meta_i18n_ext.js` atoms.** When a tier
   introduces a new family/script/region token, add the atom translation
   in **all 11 UI langs covered by `META_I18N_COVERAGE_ATOMS`**, not
   just `en/ja/ko/zh`. Alternatively, add a `META_I18N` full-string
   entry in `wordmap_meta.js` covering all 22 UI langs.
4. **`WORD_LIST.label` — all 21 UI langs.** Already balanced (Task 175).
   New concepts must add labels in all 21 UI sections.
5. **`WORD_LIST.definition` — all 21 UI langs (Task 176).** Required
   when a tier introduces a previously-uncovered domain (e.g. Tier 5
   sign-language modality scope).
6. **`meta.parentCode` or `meta.varietyRole`.** Per Task 170: every
   underscore code needs one of the two. Non-underscore codes can leave
   both unset if they have no map-anchored parent.
7. **`HIST_DESCENDANT` updates** for any historical-stage row added
   (Audit Task 122). Forgetting this leaves the historical row as an
   isolated marker without modern reflexes.
8. **`meta.family` — normalized per Task 159.** Use the convention
   chosen there (Sinitic vs Sino-Tibetan, Atlantic-Congo vs Niger-Congo,
   Saami vs Sámi, etc.). Don't introduce a third spelling.
9. **`meta.scriptTags` — typed array per Task 130.** Required on every
   new row. The prose `script` field is for display; `scriptTags`
   drives the filter UI.
10. **`meta.disambiguator`** — set if the new row's native name
    collides with an existing row (Tasks 115 / 188). Run the
    native-name multimap scan after every batch.
11. **`lang-filter.js`** — add the new family/script/region tokens to
    the curated taxonomy if not already covered (Task 159 anchor).

#### Per-tier validator gates

No batch merges until:

- `node validate_wordmap_data.js` reports **0 ERRORs and no NEW WARNs**
  vs the pre-batch baseline.
- `lang_names.<UI>: N/M` warning count is **exactly the same** as
  before the batch — i.e. every new lang is covered in all 21 UI
  sections.
- `[#13b']` description-i18n coverage threshold (95%) is **not
  breached** for any UI lang.
- Family-string consistency check (Task 159) shows **no new variants**
  of already-existing taxonomies (no Sinitic + Sino-Tibetan(Sinitic, X)
  for the same X; no Saami + Sámi; no Niger-Congo (Bantu) + Atlantic-
  Congo (Bantu)).

#### Per-batch automated gate (Audit Task 201)

The validator runs an automatic per-batch check that diffs against a
base ref (default `origin/main`) and runs the cross-cutting rules
above on every newly-added `LANG_DATA` entry. This catches "added the
data row but forgot the i18n / scriptTags / parentCode follow-through"
regressions at PR time, before they accumulate into a backlog.

Gate identifiers (Phase 1 = WARN; promote to ERROR once routinely
clear):

| ID | Rule | Audit Task |
|---|---|---|
| `[#201a]` | New lang has entries in all 21 UI sections of `lang_names.js` | 143 / 197 |
| `[#201b]` | New lang has `meta.description` as a multilingual object with at least `en`, `ja`, `ko`, `zh` | 145 / 197 |
| `[#201c]` | New lang has a non-empty `meta.scriptTags` array | 130 / 197 |
| `[#201d]` | Underscore-coded lang has `meta.parentCode` or `meta.varietyRole` | 170 / 197 |
| `[#201e]` | New lang has `meta.family` set | 159 / 197 |
| `[#201f]` | New lang has `meta.disambiguator` if its native name collides with another row | 188 / 197 |

Knobs:

- `WM_BASE_REF=<ref>` overrides the diff base (default `origin/main`).
  Useful locally: `WM_BASE_REF=HEAD~10 node validate_wordmap_data.js`
  retrospectively gates the last 10 commits.
- `WM_BATCH_GATE=0` skips the gate entirely (e.g. when running on a
  detached working tree without git history).
- The CI workflow sets `WM_BASE_REF=origin/main` and uses
  `actions/checkout@v4` with `fetch-depth: 0` so the diff resolves on
  feature-branch PRs.

When the gate finds nothing to compare against (no diff, git
unavailable, or `WM_BATCH_GATE=0`), it logs `Per-batch gate (Task
201): no new LANG_DATA entries vs <ref>` as INFO and continues.

#### Validator-driven progress checkpoints

- **At 700 langs** (Tier 5 complete): re-run Tasks 143–146 to clear any
  fresh `lang_names` backlog.
- **At 800 langs** (Tier 7 complete): re-run Task 159 — Pama-Nyungan
  and Trans-New Guinea sub-branches multiply taxonomies.
- **At 900 langs** (Tier 9 complete): re-run Task 165 — Bantu adds many
  script combinations.
- **At 1,000 langs**: full re-validation including Tasks 167 (speakers),
  171 (speakerYear), 173 (wordEvidence), 177 (glottocode/iso6393),
  188 (disambiguator after every native-name collision), 190 (vitality),
  193 (textDirection), 194 (formType compound).

#### Quality safeguards (Tier 5–13)

- **`reviewStatus: 'machine-seeded'`** is the default for new rows;
  promote to `'human-reviewed'` / `'source-checked'` only after
  per-cell verification.
- **`pronunciationType: 'broad'` or `'orthography'`** is the default;
  `'ipa'` requires sourced narrow-IPA per cell (Task 76 rule).
- **`audioRef: null`** initially — Task 151 audio backfill is a
  separate pass.
- **`vitality`** must be set per Task 190; many Tier 5–13 candidates
  are endangered.
- **`textDirection: 'rtl'`** must be set for any RTL-script row
  (Task 193).
- **`disambiguator`** must be checked after every batch via the
  native-name multimap scan.

#### Per-tier execution checklist

1. **Pre-batch**: `node validate_wordmap_data.js`; record the baseline
   (errors / warnings / INFOs).
2. **Add wordmap_data row** with full 20-cell `words` block, sourced.
3. **Add wordmap_meta meta block** with all required fields:
   `family`, `speakers`, `speakerBasis`, `speakerSource`,
   `speakerYear`, `iso6393`, `glottocode`, `countries`,
   `officialStatus` (Task 166), `officialIn`, `script`, **`scriptTags`**
   (Task 130, mandatory), `description: { en, ja, ko, zh }` minimum,
   `pronunciationType`, `surfaceType`, `locationBasis`, lat/lng,
   **`parentCode` or `varietyRole`** (Task 170, mandatory if underscore
   code), **`vitality`** (Task 190, mandatory), **`textDirection`** if
   RTL (Task 193, mandatory if applicable), `reviewStatus:
   'machine-seeded'`, `sources: [{ type: 'reference', title: ..., url:
   ..., accessed: 'YYYY-MM-DD' }]`, `aliases` if applicable,
   `disambiguator` if native name collides.
4. **Add `lang_names.js` entry in ALL 21 UI sections** — no
   exceptions.
5. **Add `meta_i18n_coverage.js` atom translations** for any new
   family / script / region tokens, in all 11 covered UI langs (Task
   184) or via `META_I18N` full-string in 22 langs.
6. **Update `lang-filter.js`** if a new family/script/region category
   appears.
7. **Update `HIST_DESCENDANT`** if the row is a historical stage with
   modern descendants.
8. **Bump `WM_ASSET_VERSION`** for `data`, `meta`, `names`.
9. **Run validator** and confirm: 0 ERRORs, 0 new WARNs, no
   `lang_names.<UI>: N/M` regression.
10. **Update `changelog.html`** with credit and language list.

#### Anti-patterns (do NOT)

- Do not add a tier in one giant commit. Split each tier into 5–10
  langs per commit, scoped by sub-family or sub-region.
- Do not skip the i18n step "for now" — the lang_names backlog grows
  exponentially. Tier 5 alone is 30 langs × 21 UI sections = 630
  entries that must land at the same time.
- Do not introduce family-taxonomy variants ("Pama-Nyungan, Wati
  subgroup" vs "Pama-Nyungan (Wati)" vs "Pama-Nyungan Wati") within a
  tier. Pick one and apply.
- Do not skip `scriptTags` even for languages with familiar scripts.
  The filter UI relies on it.
- Do not rush to 1,000 by lowering quality. `'machine-seeded'` rows
  are acceptable; **fabricated rows are not.**
- Do not skip the post-batch validator run. Catching issues per-batch
  avoids cascade.
- Do not let any tier introduce more than 10 new family-string tokens.
  If a tier needs more, the family taxonomy needs revision in a
  separate task before the tier proceeds.

#### Done when

- All 9 tiers (5 through 13) are complete.
- Total language count ≥ 1,000.
- Validator total WARNs do not exceed pre-Tier-5 baseline + 5%.
- Family taxonomy normalization (Task 159) has been re-run after every
  tier.
- `lang_names.js` has 1,000+ entries in every one of the 21 UI
  sections.
