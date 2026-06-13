# Wordmap review #187 — Inline etymology & script-attribution claims: och (Baxter–Sagart OC reconstructions), za (Sawcuengh/Sawndip), zkt/juc (Khitan/Jurchen) object-form cells across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Cross-cutting auditor: definition-block factual accuracy round-2 (etymology, speaker, script claims) — Jurchen/Khitan/Zhuang/Old-Chinese inline source/script claims

*Scope: Inline etymology & script-attribution claims: och (Baxter–Sagart OC reconstructions), za (Sawcuengh/Sawndip), zkt/juc (Khitan/Jurchen) object-form cells across all 20 word files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `och` — house — ipa 【確実】
- **File:** words/house.js
- **Current:** `["室", "*l̥ik"]`
- **Proposed:** `["室", "*s.tit"]`
- **Why:** The cited surface character is 室 (shì 'room/chamber/dwelling'), an entering-tone syllable with a Middle Chinese -t coda (MC syit). Baxter–Sagart (2014) reconstruct 室 as Old Chinese *s.tit. The current value *l̥ik has a -k coda and *l̥- onset, which cannot correspond to 室 (it matches a different graph series such as 識/釋). The reconstruction contradicts the character it is glued to; correct B-S 2014 form is *s.tit.
- **Worker round-1:** APPLIED ✅ — R187 certain. Current matched *l̥ik. 室 (MC syit) is entering-tone with -t coda; B-S 2014 *s.tit. Current *l̥ik has wrong -k coda/onset. *l̥ik→*s.tit.

### 2. `za` — moon — surface 【蓋然】
- **File:** words/moon.js
- **Current:** `{ form: "ndaen", script: "Latin (Sawcuengh)", source: "1957/1982 official orthography" }`
- **Proposed:** `{ form: "ndwen", script: "Latin (Sawcuengh)", source: "1957/1982 official orthography" }`
- **Why:** The Standard Zhuang (Sawcuengh official orthography) word for 'moon/month' is ndwen /ɗɯːn/, not 'ndaen'. All sibling za entries in this dataset are correct standard forms (raemx, ranz, feiz, daengzngoenz, meh, gyaez, it); 'moon' is the lone outlier. The accompanying primary IPA dan˥ likewise does not match ndwen and should be revisited (ndwen ≈ ɗɯːn). 'ndaen' is not the attested Sawcuengh lexeme for moon.
- **Worker round-1:** APPLIED ✅ — Probable; verified. Current alt form matched 'ndaen'. Standard Zhuang (Sawcuengh) for moon/month is ndwen /ɗɯːn/; 'ndaen' is not the attested lexeme and is the lone outlier among correct za entries. Applied surface ndwen (IPA dan˥ left as-is per finding scope).

### 3. `zkt` — dog — ipa 【要検討】
- **File:** words/dog.js
- **Current:** `form: "𘰕𘯛", ipa: "niaqan"  (alt: { form: "ńi.qo", script: "Latin (Kane 2009 reading)", source: "Polygram ńi.qo per West 2011, \"A Mirror on the Khitan Language\" (BabelStone Blog)." })`
- **Proposed:** `ipa: "ńiqo" (i.e. reconcile the primary reading with the cited polygram ńi.qo, or re-source 'niaqan')`
- **Why:** Internal contradiction between the primary cell and its own cited source: the primary IPA is given as 'niaqan', but the only alt reading and the West 2011 source it names read the polygram 𘰕𘯛 as ńi.qo (Khitan 'dog'). 'niaqan' is not what the cited reference gives; either the primary IPA should be ńiqo/ńi.qo to agree with West 2011, or a separate source for 'niaqan' must be supplied. As written, the cell's transcription falsifies its own attribution.
- **Worker round-1:** REJECTED ✋ — Current cell confirmed: form 𘰕𘯛, ipa "niaqan", with alt reading ńi.qo cited to West 2011. Confidence is 'discuss'. The reviewer correctly identifies a genuine internal contradiction (primary 'niaqan' vs the West 2011 / Kane reading 'ńi.qo'), but resolving it requires choosing the authoritative reading or re-sourcing 'niaqan' — Khitan small script decipherment is unsettled and 'niaqan' may derive from a separate valid source. WebSearch confirmed the West 2011 BabelStone source exists but did not independently disambiguate the two transcriptions. Not applying a unilateral change to the primary IPA; deferred for human/source review per the 'discuss' flag.

---

## Worker round-1 response (作業者)

Findings: 3 · applied 2 · rejected 1 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing.

## Reviewer round-2 response (再評価 round-2)

Read-only verification against current live `words/*.js`. `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT (item 1, och/house) — verified live: `words/house.js:1039` `och: ["室", "*s.tit"]`. Proposed *s.tit applied as claimed; -k coda removed.
- ✓ ACCEPT (item 2, za/moon) — verified live: `words/moon.js:199` alt `{ form: "ndwen", script: "Latin (Sawcuengh)", source: "1957/1982 official orthography" }`. Surface ndwen applied; primary IPA dan˥ left as-is per finding scope (consistent with round-1 note).
- ✓ ACCEPT (item 3, zkt/dog) — verified live: `words/dog.js:1028` `ipa: "niaqan"` with alt `ńi.qo` (Kane 2009 / West 2011) unchanged. REJECTED/deferred as claimed; internal contradiction genuine but left for human/source review per 'discuss' flag.

### New issues
None.

### Scorecard

| item | verdict |
|------|---------|
| 1. och — house — ipa | ✓ ACCEPT (APPLIED verified) |
| 2. za — moon — surface | ✓ ACCEPT (APPLIED verified) |
| 3. zkt — dog — ipa | ✓ ACCEPT (REJECTED verified) |

**File status: CLOSED** — round-2 verified.
