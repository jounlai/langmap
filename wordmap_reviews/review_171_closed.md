# Wordmap review #171 — Tone-notation cross-family consistency round-2: Chao-letter values in Tai-Kadai (Zhuang) vs documented Standard Zhuang tone system

## Reviewer self-introduction (ペルソナ自己紹介)

Cross-family tone-notation auditor (Sinitic Chao letters vs SEA/African tone marks)

*Scope: Tone-notation cross-family consistency round-2: Chao-letter values in Tai-Kadai (Zhuang) vs documented Standard Zhuang tone system. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `za` — good — ipa 【蓋然】
- **File:** words/good.js
- **Current:** `["ndei", "dei˥"]`
- **Proposed:** `["ndei", "dei˨˦"]`
- **Why:** In Standard (Wuming-based) Zhuang orthography a syllable with no final tone letter is tone 1, whose documented Chao value is 24 (˨˦), not 55. 'ndei' carries no tone letter, so the IPA should be dei˨˦. ˥ (55) is the value of tone 3 (letter -j), which 'ndei' does not have. (Standard Zhuang phonology: tones 1-6 = 24/31/55/42/35/33.)
- **Worker round-1:** APPLIED ✅ — Current cell matched ["ndei","dei˥"]. 'ndei' has no final tone letter → Standard (Wuming) Zhuang tone 1 = Chao 24 (˨˦); ˥ is tone 3 (-j). Applied dei˨˦.

### 2. `za` — eat — ipa 【蓋然】
- **File:** words/eat.js
- **Current:** `["gwn", "kɯn˥"]`
- **Proposed:** `["gwn", "kɯn˨˦"]`
- **Why:** 'gwn' has no final tone letter = tone 1 = Chao 24 (˨˦) in Standard Zhuang, not 55 (˥). ˥ would require the tone-3 letter -j (gwnj). Same systematic mismatch as ndei/ma/da/sim.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["gwn", "kɯn˥"] exactly. Reviewer 171 (probable) and 185 (certain) target the same cell with identical proposed value. Standard Zhuang (Wuming/Yongbei) tone table: bare syllable with no final tone letter = tone 1 = Chao 24 (˨˦); ˥ is tone 3 (-j). Applied → ["gwn", "kɯn˨˦"].

### 3. `za` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["sim", "sim˥"]`
- **Proposed:** `["sim", "sim˨˦"]`
- **Why:** 'sim' has no tone letter = tone 1 = ˨˦ (24) in Standard Zhuang; cell shows ˥ (55 = tone 3). Tone-1 syllables are consistently mis-marked ˥ across the Zhuang column.
- **Worker round-1:** APPLIED ✅ — R171/R185. Current matched sim˥. Standard Zhuang tone 1 (no tone letter) = 24 (˨˦). R185 certain, two reviewers agree. sim˥→sim˨˦.

### 4. `za` — eye — ipa 【蓋然】
- **File:** words/eye.js
- **Current:** `["da", "taː˥"]`
- **Proposed:** `["da", "taː˨˦"]`
- **Why:** 'da' (eye) has no tone letter = tone 1 = ˨˦ (24); cell renders ˥ (55). Should be taː˨˦.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["da","taː˥"]. 'da' no tone letter → tone 1 = ˨˦. Two reviewers (171 probable, 185 certain) agree. Applied taː˨˦.

### 5. `za` — dog — ipa 【蓋然】
- **File:** words/dog.js
- **Current:** `["ma", "maː˥"]`
- **Proposed:** `["ma", "maː˨˦"]`
- **Why:** 'ma' (dog) has no final tone letter = tone 1 = ˨˦ (24) in Standard Zhuang, not ˥ (55).
- **Worker round-1:** APPLIED ✅ — Current cell matched ["ma", "maː˥"] exactly. 'ma' has no final tone letter = tone 1 = ˨˦, not ˥. Concurring findings 171 (probable) + 185 (certain). Applied → ["ma", "maː˨˦"].

### 6. `za` — hand — ipa 【蓋然】
- **File:** words/hand.js
- **Current:** `["fwngz", "fɯŋ˧˥"]`
- **Proposed:** `["fwngz", "fɯŋ˧˩"]`
- **Why:** The final letter -z marks tone 2, whose documented Standard Zhuang Chao value is 31 (˧˩, low-falling), not 35 (˧˥). ˧˥ (35) is the value of tone 5 (letter -q). Same swap appears in 'meuz' (cat) → meu˧˥ and 'mwngz' (mɯŋ˧˥).
- **Worker round-1:** APPLIED ✅ — R171/R185. Current matched fɯŋ˧˥. Final -z = tone 2 = 31 (˧˩) in Standard Zhuang; ˧˥ is tone 5/-q. R185 certain. fɯŋ˧˥→fɯŋ˧˩.

### 7. `za` — cat — ipa 【蓋然】
- **File:** words/cat.js
- **Current:** `["meuz", "meu˧˥"]`
- **Proposed:** `["meuz", "meu˧˩"]`
- **Why:** Final -z = tone 2 = Chao 31 (˧˩) in Standard Zhuang, not 35 (˧˥); ˧˥ is tone 5 (-q). Tone-2 syllables are consistently mis-marked ˧˥ in the Zhuang column.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["meuz", "meu˧˥"] exactly. Final -z marks tone 2 = Chao 31 (˧˩); ˧˥ is tone 5 (-q). Concurring findings 171 (probable) + 185 (certain). Applied → ["meuz", "meu˧˩"].

### 8. `za` — father — ipa 【要検討】
- **File:** words/father.js
- **Current:** `["boh", "po˨"]`
- **Proposed:** `["boh", "po˧"]`
- **Why:** Final -h marks tone 6, whose Standard Zhuang Chao value is 33 (mid level, ˧), not ˨. The cell's ˨ does not correspond to any Standard Zhuang tone value for -h.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["boh","po˨"]. Final -h marks tone 6 = Chao 33 (˧, mid level); ˨ matches no Standard Zhuang tone. Reviewers 171 (discuss) + 185 (certain) agree. Applied po˧.

---

## Worker round-1 response (作業者)

Findings: 8 · applied 8 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing.

---

## Reviewer round-2 response (再評価 round-2)

All 8 findings were APPLIED in round-1. Verified each against current live `words/*.js` (line 195 `za:` cell in every file). `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT — verified live: good.js za=["ndei", "dei˨˦"] (proposed value present)
- ✓ ACCEPT — verified live: eat.js za=["gwn", "kɯn˨˦"]
- ✓ ACCEPT — verified live: heart.js za=["sim", "sim˨˦"]
- ✓ ACCEPT — verified live: eye.js za=["da", "taː˨˦"]
- ✓ ACCEPT — verified live: dog.js za=["ma", "maː˨˦"]
- ✓ ACCEPT — verified live: hand.js za=["fwngz", "fɯŋ˧˩"]
- ✓ ACCEPT — verified live: cat.js za=["meuz", "meu˧˩"]
- ✓ ACCEPT — verified live: father.js za=["boh", "po˧"]

### New issues

None. The Standard Zhuang tone mapping applied (tone 1 bare = ˨˦/24, -z tone 2 = ˧˩/31, -h tone 6 = ˧/33) is internally consistent across the audited cells.

### Scorecard

| item | verdict |
|------|---------|
| 1. good `za` dei˨˦ | ✓ ACCEPT |
| 2. eat `za` kɯn˨˦ | ✓ ACCEPT |
| 3. heart `za` sim˨˦ | ✓ ACCEPT |
| 4. eye `za` taː˨˦ | ✓ ACCEPT |
| 5. dog `za` maː˨˦ | ✓ ACCEPT |
| 6. hand `za` fɯŋ˧˩ | ✓ ACCEPT |
| 7. cat `za` meu˧˩ | ✓ ACCEPT |
| 8. father `za` po˧ | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
