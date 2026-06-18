# Hanmap data review #70 — 全方向ラリー 第4巡 (30 family + 6 dimension + 12 developers)

> post-#67〜#69（670+セル修正済み）を対象にした第4巡。完走（44 エージェント）。

## 結果

| 指標 | 数 |
|---|---|
| レビュワー返答 | 32 |
| 生→dedup | 105 → 105 |
| 検証 | 107 |
| **承認** | **84**（確実 53 / 蓋然 28 / 要検討 3） |
| 却下 | 23 |

## 適用（88 セル + メタデータ1）

- **確実 57 セル**: 自動適用（45 非ラベル＋6 変種の 龍 白/文ラベル入替 12 セル）。
- **保留 31 件**: ポリシー質問でオーナーが **全バケット適用**を選択 —
  ① IPA 精緻化 18・② 表層ローマ字 10・③ ネイティブ＋文白ラベル 2（ja_okn 西／nan_my 龍）・④ メタデータ 1。
- **メタデータ修正**: `zh_jh` の `romanization.name` が「金衢音」（金華-衢州＝呉語圏）だったが、
  zh_jh は南京江淮官話（en/sources とも一致）。「南京音」に修正。

主テーマ：西南官話の流攝韻 /ou/→/əu/ 統一（成都/重慶 手）、Jiao-Liao 清入→上声（zh_jiao 血）、
Zhengkai 清上→53（zh_kf 土/海/虎…）、昆明声調整合、龍の白/文ラベル入替を Min Nan 7 変種へ波及。

**HEAD 比 collateral 0・round-trip 検証済み。**

---

## 承認一覧（語族別）

### 官話 Mandarin (44)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| zh_cd | 手 | main | ipa | `sou˥˧` → `səu˥˧` | 蓋然 |
| zh_cq | 手 | main | ipa | `sou˦˨` → `səu˦˨` | 蓋然 |
| zh_jh | 心 | main | ipa | `siŋ˧˧˦` → `ɕin˧˧˦` | 蓋然 |
| zh_jh | (variety-level metadata) | main | label | `—` → `Hanyu Pinyin with tone-contour superscripts (南京音)` | 要検討 |
| zh_jiao | 血 | main | surface | `xue²¹³` → `xue⁵⁵` | 蓋然 |
| zh_jiao | 血 | main | ipa | `ɕyə˨˩˧` → `ɕyə˥˥` | 蓋然 |
| zh_kf | 土 | main | surface | `tu⁵⁵` → `tu⁵³` | 蓋然 |
| zh_kf | 土 | main | ipa | `tʰu˥˥` → `tʰu˥˧` | 蓋然 |
| zh_kf | 海 | main | surface | `hai⁵⁵` → `hai⁵³` | 蓋然 |
| zh_kf | 海 | main | ipa | `xai˥˥` → `xai˥˧` | 確実 |
| zh_kf | 虎 | main | surface | `hu⁵⁵` → `hu⁵³` | 確実 |
| zh_kf | 虎 | main | ipa | `xu˥˥` → `xu˥˧` | 確実 |
| zh_kf | 犬 | main | surface | `quan⁵⁵` → `quan⁵³` | 確実 |
| zh_kf | 犬 | main | ipa | `tɕʰyɛn˥˥` → `tɕʰyɛn˥˧` | 確実 |
| zh_kf | 手 | main | surface | `shou⁵⁵` → `shou⁵³` | 確実 |
| zh_kf | 手 | main | ipa | `ʂou˥˥` → `ʂou˥˧` | 確実 |
| zh_kf | 左 | main | surface | `zuo⁵⁵` → `zuo⁵³` | 確実 |
| zh_kf | 左 | main | ipa | `tsuo˥˥` → `tsuo˥˧` | 確実 |
| zh_kf | 走 | main | surface | `zou⁵⁵` → `zou⁵³` | 確実 |
| zh_kf | 走 | main | ipa | `tsou˥˥` → `tsou˥˧` | 確実 |
| zh_km | 龍 | main | surface | `long²⁴` → `long³¹` | 確実 |
| zh_km | 龍 | main | ipa | `luŋ˨˦` → `luŋ˧˩` | 確実 |
| zh_km | 頭 | main | surface | `tou²⁴` → `tou³¹` | 確実 |
| zh_km | 頭 | main | ipa | `tʰəu˨˦` → `tʰəu˧˩` | 確実 |
| zh_km | 南 | main | surface | `nan²⁴` → `nan³¹` | 確実 |
| zh_km | 南 | main | ipa | `nã˨˦` → `nã˧˩` | 確実 |
| zh_km | 聞 | main | surface | `wen²⁴` → `wen³¹` | 確実 |
| zh_km | 聞 | main | ipa | `vẽ˨˦` → `vẽ˧˩` | 確実 |
| zh_km | 聞 | main | ipa | `vẽ˨˦` → `vẽ˧˩` | 確実 |
| zh_km | 聞 | main | surface | `wen²⁴` → `wen³¹` | 確実 |
| zh_km | 足 | main | surface | `zu²⁴` → `zu³¹` | 確実 |
| zh_km | 足 | main | ipa | `tsu˨˦` → `tsu˧˩` | 確実 |
| zh_km | 月 | main | surface | `yue²¹³` → `yue³¹` | 確実 |
| zh_km | 月 | main | ipa | `yɛ˨˩˧` → `yɛ˧˩` | 確実 |
| zh_km | 木 | main | surface | `mu²¹³` → `mu³¹` | 確実 |
| zh_km | 木 | main | ipa | `mu˨˩˧` → `mu˧˩` | 確実 |
| zh_km | 目 | main | surface | `mu²¹³` → `mu³¹` | 確実 |
| zh_km | 目 | main | ipa | `mu˨˩˧` → `mu˧˩` | 確実 |
| zh_lz | 馬 | main | surface | `ma⁴³²` → `ma⁴⁴²` | 蓋然 |
| zh_lz | 馬 | main | ipa | `ma˦˧˨` → `ma˦˦˨` | 蓋然 |
| zh_lz | 鳥 | main | surface | `niao⁴³²` → `niao⁴⁴²` | 蓋然 |
| zh_lz | 鳥 | main | ipa | `niɔ˦˧˨` → `niɔ˦˦˨` | 蓋然 |
| zh_phagspa | 頭 | main | surface | `tʰiw` → `thiw` | 確実 |
| zh_tj | 日 | main | ipa | `ʐɿ˥˧` → `ʐ̩˥˧` | 確実 |

### 粤 Yue (7)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| yue | 火 | main | ipa | `fɔ˧˥` → `fɔː˧˥` | 確実 |
| yue | 坐 | main | ipa | `t͡sʰɔ˩˧` → `t͡sʰɔː˩˧` | 確実 |
| yue_gz | 羊 | main | ipa | `jœŋ˨˩` → `jœːŋ˨˩` | 蓋然 |
| yue_gz | 央 | main | ipa | `jœŋ˥˥` → `jœːŋ˥˥` | 蓋然 |
| yue_ts | 上 | var[上面（locative）] | surface | `seung⁶` → `seung6` | 確実 |
| yue_ts | 上 | var[上去（directional verb）] | surface | `seung⁵` → `seung5` | 確実 |
| yue_ts | 一 | main | surface | `yat2` → `yit2` | 蓋然 |

### 閩南 Min Nan (16)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| nan_id | 去 | var[白讀] | ipa | `kʰi˥˧` → `kʰi˥˩` | 蓋然 |
| nan_id | 去 | var[文讀] | ipa | `kʰu˥˧` → `kʰu˥˩` | 蓋然 |
| nan_my | 口 | var[文讀] | surface | `chhùi` → `khió͘` | 蓋然 |
| nan_my | 口 | var[文讀] | ipa | `tsʰui˨˩` → `kʰiɔ˥˨` | 蓋然 |
| nan_my | 龍 | var[白讀] | label | `liông /lioŋ˨˧/ = 白讀 ; lêng /liŋ˨˧/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 蓋然 |
| nan_pera | 龍 | var[白讀] | label | `liong⁵ /liɔŋ˨˦/ = 白讀 ; leng⁵ /liŋ˨˦/ = 文讀` → `liong⁵ = 文讀 ; leng⁵ = 白讀` | 確実 |
| nan_pn | 龍 | var[白讀] | label | `liông /liɔŋ˨˦/ = 白讀 ; lêng /liŋ˨˦/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 確実 |
| nan_qz | 央 | var[文讀] | ipa | `ŋ̍˥˥` → `iɔŋ˥˥` | 確実 |
| nan_qz | 央 | var[白讀] | ipa | `iɔŋ˥˥` → `ŋ̍˥˥` | 確実 |
| nan_qz | 龍 | var[白讀] | label | `liông /liɔŋ˨˦/ = 白讀 ; lêng /liŋ˨˦/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 確実 |
| nan_sg | 右 | main | ipa | `iu˧` → `iu˨˩` | 確実 |
| nan_sg | 龍 | var[白讀] | label | `liông /liɔŋ˨˦/ = 白讀 ; lêng /liŋ˨˦/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 確実 |
| nan_te | 耳 | main | surface | `hĩ5` → `hĩ6` | 確実 |
| nan_te | 耳 | main | ipa | `hĩ˥˥` → `hĩ˧˥` | 確実 |
| nan_xm | 龍 | var[白讀] | label | `liông /liɔŋ˨˦/ = 白讀 ; lêng /liŋ˨˦/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 確実 |
| nan_zz | 龍 | var[白讀] | label | `liông /liɔŋ˩˧/ = 白讀 ; lêng /liŋ˩˧/ = 文讀` → `liông = 文讀 ; lêng = 白讀` | 確実 |

### 湘 Xiang (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| hsn | 行:1 | var[文讀] | surface | `ɕin¹³` → `xin¹³` | 確実 |
| hsn | 走 | main | ipa | `tsəɯ˦˩` → `tsəu˦˩` | 確実 |

### 贛 Gan (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| gan | 行:1 | var[文讀] | surface | `hen⁴⁵` → `xin⁴⁵` | 要検討 |
| gan | 行:1 | var[文讀] | ipa | `hɛn˦˥` → `ɕin˦˥` | 要検討 |

### 呉 Wu (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| wuu_hz | 東 | main | ipa | `toŋ˧˧˦` → `toŋ˧˧` | 蓋然 |
| wuu_hz | 西 | main | ipa | `ɕi˧˧˦` → `ɕi˧˧` | 蓋然 |
| wuu_sz | 九 | main | ipa | `tɕʏ˥˩` → `tɕiʏ˥˩` | 蓋然 |

### 日 Japonic (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| ja_okn | 西 | main | surface | `sii` → `sī` | 蓋然 |
| ja_okn | 西 | main | ipa | `sii` → `siː` | 確実 |
| ja_okn | 西 | main | native | `シイ` → `シー` | 蓋然 |

### 契丹 Khitan (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| zkt | 火 | main | ipa | `gal` → `ɡal` | 確実 |

### 女真 Jurchen (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| juc | 犬 | main | ipa | `indaxuːn` → `indaxɯn` | 蓋然 |

### 錫伯 Tungusic (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| sjo | 去 | main | ipa | `ɣənəm` → `ɡənəm` | 蓋然 |

### 白 Bai (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| bca | 中:2 | main | ipa | `ʐoŋ˧˩` → `ʐoŋ˨˩` | 確実 |

### 東干 Dungan (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| dng | 立 | main | native | `җаңь` → `җань` | 確実 |

### 蔵 Tibetic (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| bo_sino | 西 | main | surface | `zhi` → `shi` | 確実 |

### 祖語 Proto (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| ptai | 頭 | main | surface | `*krawˀ.C` → `*kraw.C` | 蓋然 |
