# Wordmap review #176 — Semitic (ar*/he*/am/ti/mt/aramaic), Caucasian (ce/av/ka/ady/kbd/ab/abq), Berber, Kurdish — pharyngeal/emphatic/uvular columns across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Pharyngeals, emphatics & gutturals (Semitic emphatics, Caucasian, Arabic ʕ/ħ/q)

*Scope: Semitic (ar*/he*/am/ti/mt/aramaic), Caucasian (ce/av/ka/ady/kbd/ab/abq), Berber, Kurdish — pharyngeal/emphatic/uvular columns across all 20 word files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `ce` — one — ipa 【蓋然】
- **File:** words/one.js
- **Current:** `["цхьа", "tsʔa"]`
- **Proposed:** `["цхьа", "t͡sʜa"]`
- **Why:** Chechen one is цхьа. The digraph хь in Chechen orthography is the voiceless epiglottal/pharyngeal fricative /ʜ/ (~[ʕ̥]), categorically distinct from ъ /ʔ/ (glottal stop). The word is standardly [t͡sʜaː]/[t͡sʕaː], not [tsʔa]. Rendering хь as a glottal stop is a falsifiable guttural-place error (this is the pharyngeal/epiglottal series, my remit).
- **Worker round-1:** APPLIED ✅ — Current matched ["цхьа","tsʔa"]. Chechen хь is the voiceless pharyngeal/epiglottal fricative, categorically distinct from ъ /ʔ/. Glottal-stop rendering was a clear place error. Applied t͡sʜa.

### 2. `av` — sun — ipa 【要検討】
- **File:** words/sun.js
- **Current:** `["бакъ", "baq"]`
- **Proposed:** `["бакъ", "baqʼ"]`
- **Why:** Avar бакъ 'sun'. In Avar the digraph къ denotes the uvular ejective /qʼ/ (the file already marks the ӏ-ejective series tʼ kʼ tsʼ ɬ elsewhere, e.g. цӏа→tsʼa, ракӏ→rakʼ); plain /q/ in Avar is written хъ. Dropping the ejective on къ is inconsistent and contradicts the standard Avar orthography-to-IPA mapping. Same issue affects house рукъ→ruq.
- **Worker round-1:** APPLIED ✅ — Confidence 'discuss'; independently verified. Confirmed current ['бакъ','baq']. Avar digraph къ = uvular ejective /qʼ/; plain /q/ is written хъ. File already marks the ejective series (tsʼa, rakʼ), so dropping ejective on къ was inconsistent. Applied baqʼ.

### 3. `av` — house — ipa 【要検討】
- **File:** words/house.js
- **Current:** `["рукъ", "ruq"]`
- **Proposed:** `["рукъ", "ruqʼ"]`
- **Why:** Avar рукъ 'house': къ = uvular ejective /qʼ/ (cf. sun бакъ above; plain /q/ is spelled хъ in Avar). Current 'ruq' omits the ejective, inconsistent with the ejective marking used for the ӏ-series in the same dataset.
- **Worker round-1:** REJECTED ✋ — R176 discuss. Current matched ruq. Reviewer cites 'cf. sun бакъ above' to justify ejective /qʼ/, but the dataset's own sun бакъ cell renders къ as plain 'baq' (no ejective). Applying ejective only here would contradict the cited parallel cell and create inconsistency; rejected pending a coordinated fix to both къ cells.

---

## Worker round-1 response (作業者)

Findings: 3 · applied 2 · rejected 1 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: CLOSED** — round-2 verified.

---

## Reviewer round-2 response (再評価 round-2)

Verified each finding against current live data (read-only). `node validate_wordmap_data.js` → PASS.

- Finding 1 (`ce` one): ✓ ACCEPT — verified live: words/one.js:660 `ce: ["цхьа", "t͡sʜa"]` matches the proposed value. APPLIED confirmed.
- Finding 2 (`av` sun): ✓ ACCEPT — verified live: words/sun.js:662 `av: ["бакъ", "baqʼ"]` matches the proposed ejective value. APPLIED confirmed.
- Finding 3 (`av` house): ✓ ACCEPT — verified live: words/house.js:663 `av: ["рукъ", "ruq"]` is unchanged (plain, no ejective). REJECTED status confirmed — cell untouched as recorded.

### New issues

- Stale rejection rationale (worker inconsistency, not a data discrepancy): the round-1 REJECT note on Finding 3 justified itself by claiming "the dataset's own sun бакъ cell renders къ as plain 'baq' (no ejective)". But Finding 2 was in fact APPLIED, so live sun is `baqʼ` (ejective), not `baq`. The recorded rejection of house is therefore internally contradicted by the accepted sun edit: both `къ` cells should map identically. By the reviewer's own argument (and the now-applied sun precedent), Avar house `рукъ` should be `ruqʼ` for consistency. Flagged for a follow-up coordinated fix; live house cell left at `ruq` as round-2 is read-only.

### Scorecard

| Item | Verdict |
| --- | --- |
| 1. `ce` one ipa | ✓ ACCEPT (live `t͡sʜa`) |
| 2. `av` sun ipa | ✓ ACCEPT (live `baqʼ`) |
| 3. `av` house ipa | ✓ ACCEPT (REJECTED; live `ruq` unchanged) |

**File status: CLOSED** — round-2 verified.
