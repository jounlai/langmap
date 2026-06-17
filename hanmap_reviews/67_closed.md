# Hanmap data review #67 — 全言語ラリー (30 reviewers + 10 developers)

> **Numbering note:** #66 のレコメンドで #67/#68 に予約していた呉語(温州/金華)サブ
> レビューは、本ラウンドがオーナー指示の**全言語ラリー**(30レビュワー+10開発者)に
> 充当されたため、引き続き後続番号へ繰り下げる。本ラウンドは 61 字 × 102 変種の
> 全セル(surface/ipa/native + 文白異読 variants)を語族別 30 スライスで横断監査した。

## ラリー構成

- **Review フェーズ**: 30 レビュワーを語族別(官話/粤/閩/客/徽/平話/湘/贛/晋/呉/
  朝鮮/越/日/西夏/契丹/女真/満/錫伯/白/壮/東干/蔵/各祖語)に分割し、各 ~4 変種を担当。
  方法論は #66 を踏襲: **声調カテゴリの内的整合性**(同一中古声調カテゴリ字は方言内で
  同一調値)+ surface↔ipa↔native の三層整合 + 文白/訓読ラベル + 兄弟変種整合 +
  Wiktionary/字汇 一次照合。確立済み規約(太湖呉=Wugniu 声調クラス 1-8、IPA=Chao 調字、
  訓読≠白読、上海の口蓋化は正、温州/金華=調値)を尊重。
- **Develop フェーズ**: 10 開発者が hanmap_data.js に逐一照合し apply/reject を
  懐疑的に検証(66 レビュー済みの成熟データのため既正/誤検出/許容選択を棄却)。

## 結果

| 指標 | 数 |
|---|---|
| レビュワー返答 | 26 / 30 |
| 総 findings | 242 (確実 151 / 蓋然 66 / 要検討 25) |
| 開発者検証 | 240 |
| **承認(apply)** | **199** (確実 159 / 蓋然 35 / 要検討 5) |
| 棄却(reject) | 41 |

## 適用

- **確実 159 件**: 自動適用。
- **保留 40 件**(開発者は apply 判定だが確信度 蓋然/要検討): 言語非依存のポリシー
  質問として操作種別でまとめ、オーナーが **3 バケットすべて適用** を選択 —
  ① IPA 欄のみ精緻化 29、② 表層ローマ字の修正 8、③ ネイティブ文字グリフ補完 3。

合計 **199 セル**を変更(HEAD 比 collateral 0・全件 round-trip 検証済み)。
主軸は声調値の調類整合(成都 213/重慶 214・南京入声 ʔ5・閩南変調・呉 Wugniu)、
三層整合(各変種の native/ipa に surface を合わせる: ko 来→nae, ja_kgs 南→dan,
ko_kp MR ち→ch, ko_mid ㅠ→myuk)、非漢語系の音写統一(満州語 ʤ-, 錫伯 ɲ-,
契丹/女真/祖語の再構形)。

---

## 適用一覧(語族別)

### 官話 Mandarin (46)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| zh_cd | 地 | main | surface | `di¹³` → `di²¹³` |
| zh_cd | 右 | main | surface | `you¹³` → `you²¹³` |
| zh_cd | 坐 | main | surface | `zuo¹³` → `zuo²¹³` |
| zh_cd | 上 | main | surface | `sang¹³` → `sang²¹³` |
| zh_cq | 地 | main | surface | `di²¹` → `di²¹⁴` |
| zh_cq | 中:2 | main | surface | `zong²¹³` → `zong²¹⁴` |
| zh_cq | 九 | main | surface | `jiu⁵³` → `jiu⁴²` |
| zh_cq | 虎 | main | surface | `fu⁵³` → `fu⁴²` |
| zh_cq | 飲 | main | surface | `yin⁵³` → `yin⁴²` |
| zh_cq | 上 | main | surface | `sang²⁴` → `sang²¹⁴` |
| zh_jh | 六 | main | ipa | `liu˥˩` → `liuʔ˥` |
| zh_jh | 六 | main | surface | `liuq⁵¹` → `liuq⁵` |
| zh_jh | 木 | main | ipa | `mu˥˧` → `muʔ˥` |
| zh_jh | 木 | main | surface | `muq⁵³` → `muq⁵` |
| zh_jh | 目 | main | ipa | `mu˥˧` → `muʔ˥` |
| zh_jh | 目 | main | surface | `muq⁵³` → `muq⁵` |
| zh_jh | 食 | main | ipa | `ʂʐ̩˧˥` → `ʂʐ̩ʔ˥` |
| zh_jh | 食 | main | surface | `sheq³⁵` → `sheq⁵` |
| zh_jh | 立 | main | ipa | `li˥˩` → `liʔ˥` |
| zh_jh | 立 | main | surface | `liq⁵¹` → `liq⁵` |
| zh_jh | 北 | main | ipa | `pei˩˧` → `peiʔ˥` |
| zh_jh | 北 | main | surface | `beiq¹³` → `beiq⁵` |
| zh_jiao | 牛 | main | ipa | `niou˦˨` → `liou˦˨` |
| zh_jiao | 南 | main | ipa | `nã˦˨` → `lã˦˨` |
| zh_kf | 中:2 | main | ipa | `tʂuŋ˥˧` → `tʂuŋ˧˩˨` |
| zh_kf | 中:2 | main | surface | `zhong⁵³` → `zhong³¹²` |
| zh_km | 十 | main | ipa | `ʂʅ˧˩` → `sɿ˧˩` |
| zh_lz | 目 | main | surface | `mu²⁴` → `mu¹³` |
| zh_lz | 目 | main | ipa | `mu˨˦` → `mu˩˧` |
| zh_phagspa | 食 | main | native | `ꡔꡞꡂ` → `ꡚꡞꡂ` |
| zh_phagspa | 一 | main | native | `ꡗꡞ` → `ꡝꡞ` |
| zh_phagspa | 月 | main | native | `ꡗꡧꡠ` → `ꡝꡧꡠ` |
| zh_sc | 坐 | main | surface | `zuo¹³` → `zuo²¹³` |
| zh_sc | 坐 | main | ipa | `tso˩˧` → `tso˨˩˧` |
| zh_tw | 中:2 | main | ipa | `t͡sʊŋ˥˩` → `t͡suŋ˥˩` |
| zh_us | 四 | main | ipa | `si˥˩` → `sɹ̩˥˩` |
| zh_yuan | 一 | main | surface | `i1` → `i3` |
| zh_yuan | 七 | main | surface | `tshi1` → `tshi3` |
| zh_yuan | 八 | main | surface | `pa1` → `pa3` |
| zh_yuan | 足 | main | surface | `tsu1` → `tsu3` |
| zh_zz | 目 | main | surface | `mu²¹` → `mu²⁴` |
| zh_zz | 木 | main | surface | `mu³¹²` → `mu²⁴` |
| zh_zz | 十 | main | surface | `shi²⁴` → `shi⁴²` |
| zh_zz | 魚 | main | surface | `yu³⁵` → `yu⁴²` |
| zh_zz | 人 | main | surface | `ren²⁴` → `ren⁴²` |
| zh_zz | 頭 | main | surface | `tou²⁴` → `tou⁴²` |

### 粤 Yue (17)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| yue_dg | 耳 | main | surface | `ji2` → `ji5` |
| yue_dg | 耳 | main | ipa | `ji˨˧` → `ji˩˧` |
| yue_dg | 上 | variant[上面（locative）] | surface | `sœŋ²¹` → `sœŋ²²` |
| yue_dg | 上 | variant[上面（locative）] | ipa | `sœŋ˨˩` → `sœŋ˨˨` |
| yue_dg | 目 | main | ipa | `mok̚˨˨` → `mʊk̚˨˨` |
| yue_dg | 見 | main | ipa | `kin˧` → `kin˧˧` |
| yue_dg | 魚 | main | ipa | `ŋjyː˨˩` → `ŋyː˨˩` |
| yue_gz | 見 | main | ipa | `kiːn˧` → `kiːn˧˧` |
| yue_nn | 四 | main | ipa | `θei˨˨` → `θei˧˧` |
| yue_nn | 四 | main | surface | `thei6` → `thei3` |
| yue_nn | 上 | variant[上面（locative）] | surface | `ɬœŋ²²` → `sloeng6` |
| yue_nn | 上 | variant[上去（directional verb）] | surface | `ɬœŋ¹³` → `sloeng5` |
| yue_nn | 耳 | main | surface | `ji2` → `ji4` |
| yue_ts | 行:2 | main | ipa | `hɔŋ˧˧` → `hɔŋ˨˨` |
| yue_zs | 上 | variant[上面（locative）] | surface | `sœŋ²²` → `soeng6` |
| yue_zs | 上 | variant[上去（directional verb）] | surface | `sœŋ¹³` → `soeng5` |
| yue_zs | 見 | main | ipa | `kin˧` → `kin˧˧` |

### 閩南 Min Nan (27)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| nan | 水 | variant[白讀] | surface | `tsuí` → `chúi` |
| nan | 手 | variant[白讀] | surface | `tshiú` → `chhiú` |
| nan_hai | 三 | main | ipa | `ɗa˧˧` → `ɗa˨˦` |
| nan_hai | 二 | main | ipa | `zi˩˩` → `zi˧˧` |
| nan_hai | 魚 | main | surface | `he4` → `hu4` |
| nan_my | 行:2 | main | ipa | `hiŋ˨˧` → `haŋ˨˧` |
| nan_pera | 木 | main | ipa | `pɔʔ˥` → `bɔʔ˥` |
| nan_pera | 来 | main | ipa | `lai˥` → `lai˨˦` |
| nan_pera | 南 | main | ipa | `lam˥` → `lam˨˦` |
| nan_pera | 行:1 | main | ipa | `kiã˥` → `kiã˨˦` |
| nan_pera | 七 | main | surface | `chit⁵` → `chhit⁵` |
| nan_qz | 右 | main | ipa | `iu˥˥` → `iu˨˩` |
| nan_sg | 貓 | main | ipa | `niau˥` → `niau˦` |
| nan_sg | 心 | main | ipa | `sim˥` → `sim˦` |
| nan_sg | 中:1 | main | ipa | `tiɔŋ˥` → `tiɔŋ˦` |
| nan_sg | 行:1 | main | ipa | `kĩãː˨˦` → `kiã˨˦` |
| nan_te | 二 | variant[文讀] | ipa | `ʑi˨˦` → `ʑi˧˥` |
| nan_te | 上 | variant[白讀] | ipa | `t͡siẽ˨˦` → `t͡siẽ˧˥` |
| nan_te | 上 | variant[文讀] | ipa | `siaŋ˨˦` → `siaŋ˧˥` |
| nan_te | 下 | variant[白讀] | ipa | `e˨˦` → `e˧˥` |
| nan_te | 下 | variant[文讀] | ipa | `hia˨˦` → `hia˧˥` |
| nan_te | 九 | variant[白讀] | ipa | `kau˥` → `kau˥˧` |
| nan_th | 貓 | main | ipa | `ŋiau˥` → `ŋiau˧` |
| nan_th | 心 | main | ipa | `sim˥` → `sim˧` |
| nan_th | 中:1 | main | ipa | `toŋ˥` → `toŋ˧` |
| nan_xm | 見 | variant[白讀] | ipa | `kĩ˩˩` → `kĩ˨˩` |
| nan_xm | 見 | variant[文讀] | ipa | `kian˩˩` → `kian˨˩` |

### 莆仙 Puxian (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| cpx | 去 | main | surface | `khy̍` → `khỳ` |

### 客家 Hakka (23)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| hak_cn | 人 | main | ipa | `ŋin˩˩` → `ŋin˨˦` |
| hak_hl | 一 | main | ipa | `jit̚˨` → `jit̚˥` |
| hak_hl | 七 | main | ipa | `tsʰit̚˨` → `tsʰit̚˥` |
| hak_hl | 八 | main | ipa | `pat̚˨` → `pat̚˥` |
| hak_hl | 足 | main | ipa | `tɕiuk̚˨` → `tɕiuk̚˥` |
| hak_hl | 血 | main | ipa | `hiet̚˨` → `hiet̚˥` |
| hak_hl | 北 | main | ipa | `pet̚˨` → `pet̚˥` |
| hak_hl | 北 | variant[白讀] | ipa | `pet̚˨` → `pet̚˥` |
| hak_hl | 北 | variant[文讀] | ipa | `pak̚˨` → `pak̚˥` |
| hak_hl | 六 | main | ipa | `liuk̚˥` → `liuk̚˨` |
| hak_hl | 十 | main | ipa | `ʃip̚˥` → `ʃip̚˨` |
| hak_hl | 日 | main | ipa | `ŋit̚˥` → `ŋit̚˨` |
| hak_hl | 月 | main | ipa | `ŋiet̚˥` → `ŋiet̚˨` |
| hak_hl | 木 | main | ipa | `muk̚˥` → `muk̚˨` |
| hak_hl | 目 | main | ipa | `muk̚˥` → `muk̚˨` |
| hak_hl | 肉 | main | ipa | `ŋiuk̚˥` → `ŋiuk̚˨` |
| hak_hl | 食 | main | ipa | `ʃit̚˥` → `ʃit̚˨` |
| hak_hl | 立 | main | ipa | `lip̚˥` → `lip̚˨` |
| hak_hl | 中:1 | main | ipa | `tɕuŋ˥˧` → `tʃuŋ˥˧` |
| hak_hl | 中:2 | main | ipa | `tɕuŋ˩˩` → `tʃuŋ˩˩` |
| hak_tw | 坐 | main | surface | `co2` → `co1` |
| hak_tw | 坐 | main | ipa | `tsʰo˩˩` → `tsʰo˨˦` |
| hak_tw | 中:2 | main | surface | `zung3` → `zung4` |

### 徽 Hui (4)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| czh | 足 | main | surface | `zu²¹` → `zu⁵` |
| czh | 足 | main | ipa | `tsuʔ˨˩` → `tsuʔ˥` |
| czh | 行:1 | variant[文讀] | surface | `ɦiɛ̃²²` → `hhien²²` |
| czh | 行:2 | variant[白讀] | surface | `ɦɔ̃²²` → `hhong²²` |

### 平話 Pinghua (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| cnp | 肉 | main | ipa | `ʐəu˧˥` → `ɲuk̚˨˨` |

### 湘 Xiang (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| hsn | 食 | main | ipa | `sz̩˨˦` → `sɿ˨˦` |

### 贛 Gan (2)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| gan | 日 | variant[文讀] | ipa | `ȵit̚˥` → `ɲit̚˥` |
| gan | 人 | variant[文讀] | ipa | `ȵin˦˥` → `ɲin˦˥` |

### 晋 Jin (6)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| cjy | 四 | main | surface | `si¹³` → `si⁴⁵` |
| cjy | 四 | main | ipa | `sɿ˩˧` → `sɿ˦˥` |
| cjy | 南 | main | surface | `nan³⁵` → `nan¹¹` |
| cjy | 南 | main | ipa | `næ̃˧˥` → `næ̃˩˩` |
| cjy | 行:1 | variant[文讀] | surface | `ɕiŋ³⁵` → `xing³⁵` |
| cjy | 行:2 | variant[白讀] | surface | `xɒ̃¹¹` → `xang¹¹` |

### 呉 Wu (11)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| wuu | 行:2 | main | ipa | `ɦɑ̃˩˧` → `ɦɑ̃˨˧` |
| wuu | 中:2 | main | ipa | `tsoŋ˧˧` → `tsoŋ˧˥` |
| wuu_hz | 行:2 | main | surface | `ghaon6` → `ghaon2` |
| wuu_jh | 中:2 | main | surface | `tsong³³⁴` → `tsong⁵³` |
| wuu_jh | 中:2 | main | ipa | `tsoŋ˧˧˦` → `tsoŋ˥˧` |
| wuu_jx | 行:2 | main | surface | `ghaon6` → `ghaon2` |
| wuu_nb | 人 | main | ipa | `ɲin˨˧˩` → `ɲin˨˩˧` |
| wuu_nb | 鳥 | main | ipa | `tiɔ˨˩˧` → `tiɔ˧˥` |
| wuu_nb | 行:2 | main | ipa | `ɦɑ̃˩˧` → `ɦɑ̃˨˩˧` |
| wuu_nb | 一 | main | ipa | `iəʔ˦˧` → `iəʔ˥˥` |
| wuu_sz | 行:2 | main | ipa | `ɦɑ̃˨˨˧` → `ɦɑ̃˨˧˩` |

### 朝鮮 Koreanic (16)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| ko | 来 | main | surface | `rae` → `nae` |
| ko | 来 | main | ipa | `ɾɛ` → `nɛ` |
| ko_bus | 八 | main | surface | `palH` → `phalH` |
| ko_kp | 足 | main | ipa | `t͡ɕok̚` → `tsok̚` |
| ko_kp | 足 | main | surface | `jok` → `chok` |
| ko_kp | 中:1 | main | surface | `jung` → `chung` |
| ko_kp | 中:2 | main | surface | `jung` → `chung` |
| ko_mid | 足 | main | surface | `cwok` → `·cyok` |
| ko_mid | 足 | main | ipa | `tsok̚˥` → `tsjok̚˥` |
| ko_mid | 目 | main | surface | `mwuk` → `·mwuk → ·myuk` |
| ko_mid | 北 | main | surface | `pwuk` → `·puk` |
| ko_mid | 北 | main | ipa | `puk̚˥` → `pɯk̚˥` |
| ko_zai | 中:1 | main | ipa | `t͡ɕuɴ` → `t͡ɕuŋ` |
| ko_zai | 中:2 | main | ipa | `t͡ɕuɴ` → `t͡ɕuŋ` |
| ko_zai | 行:1 | main | ipa | `hɛɴ` → `hɛŋ` |
| ko_zai | 行:2 | main | ipa | `haɴ` → `haŋ` |

### 越 Vietic (5)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| vi | 中:1 | variant[trung tâm (center/middle)] | ipa | `ʈuŋ͡m˧` → `tʂuŋ͡m˧˧` |
| vi | 中:2 | variant[trúng đích (to hit/strike)] | ipa | `ʈuŋ͡m˧˥` → `tʂuŋ͡m˧˥` |
| vi | 目 | main | ipa | `muk̚˧ˀ˨ʔ` → `muk˧ˀ˨ʔ` |
| vi_ohan | 龍 | main | ipa | `zawŋ͡m˨˩ < *bləwŋ` → `ʐawŋ͡m˨˩ < *bləwŋ` |
| vi_s | 目 | main | ipa | `muk̚˨˩ʔ` → `muk˨˩ʔ` |

### 日 Japonic (10)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| ja_kgs | 南 | main | surface | `nan` → `dan` |
| ja_kgs | 行:1 | main | ipa | `ɡʲoː` → `koː` |
| ja_kgs | 行:1 | main | native | `ギョウ` → `コウ` |
| ja_kun | 中:2 | main | ipa | `(missing/undefined)` → `ataɾɯ` |
| ja_kun | 行:2 | main | ipa | `(missing/undefined)` → `okonaɯ` |
| ja_ojp | 血 | main | native | `ケツ` → `ケチ` |
| ja_okn | 七 | main | ipa | `ɕit͡ɕi` → `ɕit͡sɯ` |
| ja_okn | 行:1 | main | surface | `kō` → `gyō` |
| ja_thk | 行:1 | main | surface | `kō` → `gyō` |
| ja_thk | 耳 | main | ipa | `d͡ʑi` → `zɯ̈` |

### 西夏 Tangut (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| txg | 西 | main | surface | `nyy2` → `nee2` |

### 契丹 Khitan (2)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| zkt | 五 | main | ipa | `tabu` → `tau` |
| zkt | 馬 | main | ipa | `mori` → `morin` |

### 女真 Jurchen (3)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| juc | 心 | main | ipa | `niyaman` → `niaman` |
| juc | 頭 | main | ipa | `utɕu` → `udʑu` |
| juc | 五 | main | ipa | `suntɕa` → `sundʑa` |

### 満 Tungusic (5)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| mnc | 二 | main | ipa | `t͡ʃuwə` → `d͡ʒuwə` |
| mnc | 十 | main | ipa | `t͡ʃuwan` → `d͡ʒuwan` |
| mnc | 心 | main | ipa | `niyaman` → `njaman` |
| mnc | 中:2 | main | ipa | `goibumbi` → `ɡoibumbi` |
| mnc | 行:2 | main | ipa | `—` → `faidan` |

### 錫伯 Tungusic (2)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| sjo | 心 | main | ipa | `niyaman` → `ɲaman` |
| sjo | 中:2 | main | ipa | `goibumbi` → `ɢɔibum` |

### 白 Bai (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| bca | 十 | main | ipa | `tsʰɿ˨˩` → `tsʰɿ˨˨˨` |

### 壮 Tai (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| za | 魚 | main | ipa | `pjaː˨˦` → `pjaː˧˧` |

### 東干 Dungan (1)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| dng | 食 | main | surface | `sy¹` → `sy²` |

### 蔵 Tibetic (4)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| bo_sino | 上 | main | ipa | `ʈʂaŋ˥˧` → `ʂaŋ˥˧` |
| bo_sino | 山 | main | ipa | `ɕɛ̃˥˥` → `ʂɛ̃˥˥` |
| bo_sino | 人 | main | ipa | `rẽ̀˥˧` → `rẽ̀˩˧` |
| bo_sino | 北 | main | ipa | `pè˥˧` → `pé˥˧` |

### 祖語 Proto (9)

| lang | 字 | scope | field | 旧 → 新 |
|---|---|---|---|---|
| pja | 中:2 | main | surface | `*naka` → `*atar-` |
| pja | 中:2 | main | ipa | `*naka` → `*atar-` |
| pko | 中:2 | main | surface | `*kawɨn` → `*mac-` |
| pko | 中:2 | main | ipa | `*kawɨn` → `*mat͡s-` |
| pmgl | 十 | main | surface | `*xarba(n)` → `*harba(n)` |
| pmgl | 羊 | main | surface | `*xoni(n)` → `*honi(n)` |
| pmgl | 七 | main | surface | `*doluxa(n)` → `*doluɣa(n)` |
| ptai | 走 | main | surface | `*lɛːn.A` → `*lɛːn.B` |
| ptung | 牛 | main | ipa | `*xukær` → `*xuker` |
