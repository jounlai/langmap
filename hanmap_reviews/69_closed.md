# Hanmap data review #69 — 全方向ラリー 第3巡 (30 family + 6 dimension reviewers + 12 developers)

> **方式:** #67・#68 と同じ全方向（縦×横×外部照合）。post-#68 データ（490+セル修正済み）を対象に、
> 二度のラリーが見逃した点＋**前巡が残した不整合**を監査。完走（中断なし、44 エージェント）。

## 結果

| 指標 | 数 |
|---|---|
| レビュワー返答 | 32 |
| 生 findings → dedup | 117 → 111 |
| 開発者検証 | 111 |
| **承認(apply)** | **90**（確実 61 / 蓋然 29 / 要検討 0） |
| 却下 | 21 |

## 主な成果 — 前巡の不整合・破損を捕捉

- **データ破損修復**: `zh_cd 六 surface` が `"nu²¹ /nu˨˩/"`（#68 適用時に "surface /ipa/" 文字列が
  surface 欄に紛れた）→ `"nu²¹"` に修復。全 surface 欄を独立スキャンし、混入はこの 1 件のみと確認
  （`vi_ohan 月 "trăng / giăng"` は正当な二重読み）。IPA 欄の数字混入は依然 **0 件**。
- **#68 の半端適用**: `zh_kf 目`（surface 24 に変えたが ipa が 42 のまま）等、surface↔ipa 不整合を修正。
- **ラベル入替の波及**: #68 の 央 修正（白讀=ng / 文讀=iong）を Min Nan 6 変種
  （my/xm/qz/pn/sg/pera）へ、龍（nan/nan_id）の 白讀↔文讀 も修正。

## 適用

- **確実 65 セル**: 自動適用（49 非ラベル＋8 ペアのラベル入替 16 セル）。
- **保留 29 件**: ポリシー質問でオーナーが ① IPA 精緻化 21・② ネイティブ文字 5 を選択（③ 表層ローマ字は見送り）。
  実適用 24 件（`yue_gz 中` ipa ×2 は char キー不整合 `中`→`中:1/中:2` で除外）。

**合計 89 セルを変更**（HEAD 比 collateral 0・round-trip 検証済み）。

### 保留・未適用 → 後続精査で決着（+3 セル適用）
オーナー指示で保留・除外分を再精査し、根拠を検証して個別決着:

- ✅ **適用** `hak_hl 坐 chho→chhô` — ˥˧（陰平）は曲折アクセント表記が規約（sâm/thiên/sîm 等が ˥˧）。
  無印 chho は ˥˥（陽平）を含意し ipa と矛盾。circumflex 付与で surface↔ipa 整合。
- ✅ **適用** `yue_gz 中:1/中:2 ipa t͡sʊŋ→tsʊŋ` — char キーを `中:1/中:2` に補正の上適用。
  yue_gz の他の破擦音（走/足/左/坐）は全て tie-bar 無し `ts`、中だけ `t͡s` の外れ値だった（変種内整合）。
- ⏸ **据え置き（正しいため変更なし）** `zh_kf 目 → 42` 案は却下。次濁入 7 字（木目月日肉立六）が
  全て 24 に揃い、全濁入（十食）が 42 で、Zhongyuan「次濁入→陰平」規則どおり。24 が正。
- ⏸ **据え置き（要手動精査）** `nan_th 五 文讀 → ngou6` — ipa は既に ŋou˧˥（finding の current ŋou˥˨ は
  既修正）。surface を ngou6 にすると 白讀（ngou6/ŋou˧˥）と**完全同一**になる。疑母字の白/文区別自体に
  疑義があり、単独のトーン修正では解決しない。深掘り対象として記録。

---

## 承認一覧（語族別）

### 官話 Mandarin (25)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| zh_cd | 羊 | main | surface | `yan²¹` → `yang²¹` | 確実 |
| zh_cd | 羊 | main | ipa | `yan˨˩` → `iaŋ˨˩` | 確実 |
| zh_cd | 六 | main | surface | `nu²¹ /nu˨˩/` → `nu²¹` | 確実 |
| zh_cd | 六 | main | ipa | `nəu˨˩` → `nu˨˩` | 確実 |
| zh_cq | 羊 | main | surface | `yan²¹` → `yang²¹` | 確実 |
| zh_cq | 羊 | main | ipa | `yan˨˩` → `iaŋ˨˩` | 確実 |
| zh_jh | 二 | main | ipa | `ə˥˧` → `ɚ˥˧` | 確実 |
| zh_kf | 木 | main | surface | `mu⁴²` → `mu²⁴` | 確実 |
| zh_kf | 木 | main | ipa | `mu˦˨` → `mu˨˦` | 確実 |
| zh_kf | 目 | main | ipa | `mu˦˨` → `mu˨˦` | 確実 |
| zh_kf | 目 | main | surface | `mu²⁴` → `mu⁴²` | 蓋然 |
| zh_km | 上 | main | surface | `sang³¹²` → `sang²¹²` | 確実 |
| zh_km | 上 | main | ipa | `saŋ˧˩˨` → `saŋ˨˩˨` | 確実 |
| zh_km | 下 | main | surface | `xia³¹²` → `xia²¹²` | 確実 |
| zh_km | 下 | main | ipa | `ɕia˧˩˨` → `ɕia˨˩˨` | 確実 |
| zh_km | 血 | main | surface | `xue²¹³` → `xue³¹` | 確実 |
| zh_km | 血 | main | ipa | `ɕyɛ˨˩˧` → `ɕyɛ˧˩` | 確実 |
| zh_phagspa | 鳥 | main | native | `ꡇꡠꡓ` → `ꡈꡦꡓ` | 蓋然 |
| zh_wh | 食 | main | ipa | `sz̩˨˩˧` → `sɿ˨˩˧` | 確実 |
| zh_yuan | 一 | main | ipa | `i˥` → `i˨˩˦` | 確実 |
| zh_yuan | 七 | main | ipa | `tsʰi˥` → `tsʰi˨˩˦` | 確実 |
| zh_yuan | 八 | main | ipa | `pa˥` → `pa˨˩˦` | 確実 |
| zh_yuan | 足 | main | ipa | `tsu˥` → `tsu˨˩˦` | 確実 |
| zh_yuan | 血 | main | ipa | `ɕyɛ˥` → `ɕyɛ˨˩˦` | 確実 |
| zh_yuan | 北 | main | ipa | `pəi˥` → `pəi˨˩˦` | 確実 |

### 粤 Yue (8)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| yue_dg | 下 | main | ipa | `ha˨˨` → `haː˨˨` | 確実 |
| yue_dg | 見 | main | ipa | `kin˧˧` → `kiːn˧˧` | 確実 |
| yue_gz | 中 | main | ipa | `—` → `tsʊŋ˥˥` | 蓋然 |
| yue_gz | 中 | main | ipa | `—` → `tsʊŋ˧˧` | 蓋然 |
| yue_nn | 龍 | main | ipa | `luŋ˨˩` → `lʊŋ˨˩` | 蓋然 |
| yue_nn | 目 | main | ipa | `mɵk̚˨˨` → `mʊk̚˨˨` | 蓋然 |
| yue_us | 龍 | main | ipa | `lʌŋ˨` → `lʊŋ˨` | 蓋然 |
| yue_zs | 目 | main | ipa | `muk̚˨˨` → `mʊk̚˨˨` | 蓋然 |

### 閩南 Min Nan (31)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| nan | 龍 | var[白讀] | label | `白讀 (on liông /liɔŋ˨˦/)` → `文讀` | 確実 |
| nan | 龍 | var[文讀] | label | `文讀 (on lêng /leŋ˨˦/)` → `白讀` | 確実 |
| nan_id | 龍 | var[白讀] | label | `白讀 (on liông /liɔŋ˨˦/)` → `文讀` | 確実 |
| nan_id | 龍 | var[文讀] | label | `文讀 (on lêng /liŋ˨˦/)` → `白讀` | 確実 |
| nan_my | 央 | var[白讀 (iong) / 文讀 (ng)] | label | `iong /ioŋ˧/ = 白讀 ; ng /ŋ˧/ = 文讀` → `swap: iong = 文讀 ; ng = 白讀` | 確実 |
| nan_pera | 央 | var[白讀 (iong³) / 文讀 (ng³)] | label | `iong³ /iɔŋ˦/ = 白讀 ; ng³ /ŋ̍˦/ = 文讀` → `iong³ /iɔŋ˦/ = 文讀 ; ng³ /ŋ̍˦/ = 白讀` | 確実 |
| nan_pn | 央 | var[白讀 (iong) / 文讀 (ng)] | label | `iong /iɔŋ˦/ = 白讀 ; ng /ŋ̍˦/ = 文讀` → `swap: iong = 文讀 ; ng = 白讀` | 確実 |
| nan_qz | 上 | var[文讀] | ipa | `sɔŋ˨˩` → `siɔŋ˨˩` | 確実 |
| nan_qz | 央 | var[白讀] | ipa | `iɔŋ˦` → `iɔŋ˥˥` | 蓋然 |
| nan_qz | 央 | var[文讀] | ipa | `ŋ̍˦` → `ŋ̍˥˥` | 蓋然 |
| nan_qz | 東 | var[白讀] | ipa | `taŋ˦` → `taŋ˥˥` | 蓋然 |
| nan_qz | 東 | var[文讀] | ipa | `tɔŋ˦` → `tɔŋ˥˥` | 蓋然 |
| nan_qz | 西 | var[白讀] | ipa | `sai˦` → `sai˥˥` | 蓋然 |
| nan_qz | 央 | var[白讀 (iong) / 文讀 (ng)] | label | `iong /iɔŋ˦/ = 白讀 ; ng /ŋ̍˦/ = 文讀` → `swap: iong = 文讀 ; ng = 白讀` | 確実 |
| nan_sg | 央 | var[白讀 (iong) / 文讀 (ng)] | label | `iong /iɔŋ˦/ = 白讀 ; ng /ŋ̍˦/ = 文讀` → `swap: iong = 文讀 ; ng = 白讀` | 確実 |
| nan_te | 山 | var[白讀] | ipa | `suã˧` → `suã˧˧` | 確実 |
| nan_te | 山 | var[文讀] | ipa | `saŋ˧` → `saŋ˧˧` | 確実 |
| nan_te | 天 | var[白讀] | ipa | `tʰĩ˧` → `tʰĩ˧˧` | 確実 |
| nan_te | 天 | var[文讀] | ipa | `tʰiaŋ˧` → `tʰiaŋ˧˧` | 確実 |
| nan_te | 東 | var[白讀] | ipa | `taŋ˧` → `taŋ˧˧` | 確実 |
| nan_te | 東 | var[文讀] | ipa | `tɔŋ˧` → `tɔŋ˧˧` | 確実 |
| nan_te | 西 | var[白讀] | ipa | `sai˧` → `sai˧˧` | 確実 |
| nan_te | 西 | var[文讀] | ipa | `se˧` → `se˧˧` | 確実 |
| nan_te | 九 | main | ipa | `kau˥˨` → `kau˥˧` | 確実 |
| nan_te | 九 | var[文讀] | ipa | `kiu˥` → `kiu˥˧` | 蓋然 |
| nan_th | 九 | var[白讀] | ipa | `kau˥˨` → `kau˧˩` | 蓋然 |
| nan_th | 九 | var[文讀] | ipa | `kiu˥˨` → `kiu˧˩` | 蓋然 |
| nan_th | 五 | var[文讀] | surface | `ngou2` → `ngou6` | 蓋然 |
| nan_th | 五 | var[文讀] | ipa | `ŋou˥˨` → `ŋou˧˥` | 蓋然 |
| nan_xm | 央 | var[白讀 (iong) / 文讀 (ng)] | label | `iong /iɔŋ˦/ = 白讀 ; ng /ŋ̍˦/ = 文讀` → `swap: iong = 文讀 ; ng = 白讀` | 確実 |
| nan_zz | 血 | var[白讀] | ipa | `hueʔ˩˨˩` → `hueʔ˧˨` | 確実 |

### 閩東 Min Dong (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cdo | 龍 | main | ipa | `leŋ˩˧` → `lyŋ˩˧` | 確実 |

### 莆仙 Puxian (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cpx | 七 | main | ipa | `tsʰiɔʔ˥` → `tsʰiʔ˥` | 確実 |

### 客家 Hakka (5)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| hak_cn | 坐 | main | ipa | `tsʰo˨˦` → `tsʰo˦˦` | 蓋然 |
| hak_cn | 貓 | main | ipa | `meu˨˦` → `meu˦˦` | 蓋然 |
| hak_hl | 坐 | main | surface | `chho` → `chhô` | 蓋然 |
| hak_hl | 坐 | main | ipa | `tsʰo˩˩` → `tsʰo˥˧` | 蓋然 |
| hak_hl | 貓 | main | ipa | `meu˩˩` → `meu˥˧` | 蓋然 |

### 徽 Hui (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| czh | 食 | main | surface | `si³³` → `sii⁵` | 確実 |

### 平話 Pinghua (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| cnp | 八 | main | ipa | `paːt̚˥` → `pat̚˥` | 確実 |

### 湘 Xiang (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| hsn | 二 | main | surface | `er⁴⁵` → `er²¹` | 確実 |
| hsn | 上 | main | surface | `san⁴⁵` → `san²¹` | 確実 |
| hsn | 下 | main | surface | `xia⁴⁵` → `xia²¹` | 確実 |

### 呉 Wu (3)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| wuu_jh | 二 | main | ipa | `n̩˨˨˦` → `n̩˨˩˧` | 確実 |
| wuu_jh | 五 | main | ipa | `ŋ˨˨˦` → `ŋ˨˩˧` | 確実 |
| wuu_jx | 龍 | main | ipa | `loŋ˧˩` → `loŋ˨˩˧` | 蓋然 |

### 朝鮮 Koreanic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| ko_mid | 七 | main | native | `·치ᇙ` → `·치ᇙ` | 確実 |
| ko_mid | 八 | main | native | `·바ᇙ` → `·바ᇙ` | 確実 |

### 越 Vietic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| vi_nom | 中:1 | main | native | `𡎢` → `𡧲` | 蓋然 |
| vi_nom | 中:2 | main | native | `𠓨` → `中` | 蓋然 |

### 錫伯 Tungusic (2)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| sjo | 中:2 | main | native | `—` → `ᡤᠣᡳᠪᡠᠮᠪᡳ` | 蓋然 |
| sjo | 行:2 | main | native | `—` → `ᡶᠠᡳᡩᠠᠨ` | 蓋然 |

### 東干 Dungan (4)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| dng | 犬 | main | surface | `chyon³` → `chyon²` | 確実 |
| dng | 犬 | main | native | `чүәнь` → `чүәнъ` | 確実 |
| dng | 飲 | main | surface | `yin³` → `yin²` | 確実 |
| dng | 飲 | main | native | `йинь` → `йинъ` | 確実 |

### 祖語 Proto (1)

| lang | 字 | scope | field | 旧 → 新 | 確信 |
|---|---|---|---|---|---|
| pmgl | 牛 | main | ipa | `*hykær` → `*hyker` | 蓋然 |
