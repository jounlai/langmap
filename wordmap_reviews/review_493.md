# Wordmap data review #493 — papuan-tnw

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: papuan-tnw.

## Reviewer self-introduction (ペルソナ自己紹介)

Papuan/Trans-New-Guinea reviewer; Fedden & field grammars. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] 'i' (I) / mpt (Mian)
- **Issue:** Mian 'I' is given as "naka". In Fedden (2011) A Grammar of Mian, naka /Lnaka/ [naxa] means 'man', not 'I'. The Mian 1sg free pronoun is ne. This same wrong form "naka" is also duplicated in the 'eat' cell, confirming a misassignment rather than a variant.
- **Fix:** Set mpt 'i' to ["ne", "nɛ"] (Fedden's né 'I', 1sg free pronoun; /ɛ/ orthographically <e>). This matches the proposed fix exactly. Note: the 'eat' cell's mpt ["naka","naka"] is also wrong (Mian 'eat' root is wen-, e.g. wembibe 'I eat'), but that is a separate cell outside this finding's target.
- **Source:** Fedden (2011) A Grammar of Mian (Mouton) — naka [naxa] 'man'; 1sg pronoun ne. Project's own mpt meta cites Fedden as authority.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [HIGH] 'eat' / mpt (Mian)
- **Issue:** Mian 'eat' is given as "naka", but naka = 'man' in Fedden. The Mian verb 'eat' is the stem lowon (bare perfective [ndowon]). 'eat' and 'i' both being "naka" is a copy/misassignment error.
- **Fix:** Set words/eat.js mpt to ["lowon","lowon"] (perfective citation stem). A phonetically more precise IPA for the bare perfective is [ⁿdɔwɔn], i.e. ["lowon","ⁿdɔwɔn"]. Either is defensible; the suggestedFix ["lowon","lowon"] is acceptable per the surface===ipa convention. (Note separately: the i/mpt cell is also wrong — should be "né" — but that is outside this finding's scope.)
- **Source:** Fedden (2011) A Grammar of Mian — verb lowon 'eat'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [HIGH] 'water' / mpt (Mian)
- **Issue:** Mian 'water' is given as "ot". Fedden repeatedly glosses aai as 'water' (liquids/noun-class lists). "ot" is not the Mian word for water.
- **Fix:** mpt 'water' should be ["aai", "aːi"] (Fedden 2011). Note: surface===ipa form ["aai","aai"] is also acceptable per project convention since Fedden gives no phonetic/tone transcription for this lexeme.
- **Source:** Fedden (2011) A Grammar of Mian — aai 'water'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [HIGH] 'eye' / mpt (Mian)
- **Issue:** Mian 'eye' is given as "tan", but Fedden gives kin 'eye' (body-part list: kin 'eye', mukung 'nose'). In Mian, tan means 'sunlight'. Wrong-sense assignment.
- **Fix:** ["kin", "kin"]
- **Source:** Fedden (2011) A Grammar of Mian — kin 'eye'; tan 'sunlight'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [HIGH] 'dog' / mpt (Mian)
- **Issue:** Mian 'dog' is given as "kowok". Fedden gives til 'dog' (til 'dog', eil 'pig', wan 'bird'); he even notes the ethnonym Mian means 'dog' in neighbouring Faiwol/Bimin, while the Mian word is til.
- **Fix:** ["til", "til"]
- **Source:** Fedden (2011) A Grammar of Mian — til 'dog'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 6. [HIGH] 'one' / hui (Huli)
- **Issue:** Huli 'one' is given as "mendene", but the Huli numeral one in the base-15 body-tally system is mbira (two=kira, three=tebira, four=maria, five=duria — all already correct in the row). mendene is at best an indefinite 'a certain one', inconsistent with the counting series used for 2-5.
- **Fix:** hui 'one' → ["mbira", "mbiɾa"] (surface mbira; IPA mbiɾa to match the intervocalic-ɾ convention used in tebiɾa/maɾia/duɾia in the same series. The reviewer's ["mbira","mbira"] is also acceptable since 'two' itself uses plain "kira/kira".)
- **Source:** Wikipedia 'Huli language' (pentadecimal: mbira, kira, tebira, maria, duria); languagesandnumbers.com/how-to-count-in-huli; Omniglot Huli.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 7. [MED] mpt (Mian): 'tree', 'fire', 'hand', 'name'
- **Issue:** More Mian cells conflict with Fedden: 'tree'="yel" and 'fire'="aon" — Fedden gives as 'tree; wood; fire' (one Residue-class noun for all three); 'hand'="kun" — Fedden gives kweil 'hand'; 'name'="weng" — Fedden gives ninin 'name' (weng in Ok languages is 'word/speech', not 'name'). Other mpt body-part cells DO match Fedden (ear klon, bone on, tooth sit, tongue haang, house am), so these read as errors, not a different variety.
- **Fix:** tree = "as" (IPA /as/); fire = "as" (IPA /as/) — Fedden explicitly gives 'as' as one noun 'tree; wood; fire', so fire is sourced and should be "as", NOT "—"; hand = "kweil" (Fedden kwěil); name = "ninin" (Fedden ninǐn, [nìnǐˑn]). The suggestedFix is correct except that fire should be "as" rather than "—". Also re-audit the row: eye "tan" should be "kin" (tan='sunlight' in Fedden) and water "ot" should be "aai".
- **Source:** Fedden (2011) A Grammar of Mian — as 'tree; wood; fire'; kweil 'hand'; ninin 'name'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 7 awaiting a decision.
