# Wordmap review #408 — Khowar (khw), Dardic (deep-dive: 2 independent researchers + adjudicator)

## Why this review exists
Review #399 held the Khowar row rather than correct it: `dog = سو /suː/`, `water = پیے /peɪ/`, `fire = وے /weɪ/`, `moon = بوم /buːm/` looked fabricated, and the meta record had an empty `countries` field. Rather than guess, the row was re-opened under a two-independent-researchers-plus-adjudicator design in which a `correct` verdict requires a citation and an uncontradicted second reader, and an unsourceable cell must be blanked rather than invented.

## Reviewer self-introduction (ペルソナ自己紹介)
Khowar (کھووار, "Chitrali") is the Dardic (Indo-Aryan) language of Chitral in Khyber Pakhtunkhwa, Pakistan, with a smaller community in Ghizer, Gilgit-Baltistan; roughly 50,000–80,000 speakers by UNESCO's endangered-language estimate. It is unusually well described for a Dardic language: Elena Bashir's *Khowar–English Lexicon*, the Liljegren & Ali Khan (2017) *Journal of the IPA* Illustration, and a Wiktionary Swadesh list all exist and agree with one another.

## The systemic defect
Seventeen of twenty-five cells held **Urdu / Hindi / Persian prestige forms in place of inherited Khowar vocabulary**: `گھر ghor` (Urdu *ghar* 'house'), `دل dil` (Persian 'heart'), `پیار piaːr` (Urdu 'love'), `آکھ aːkh` (Hindi 'eye'), `ایک ik` (Urdu 'one'), `خوب xub` (Persian 'good'), `ہات haːt` (Urdu 'hand'), `باب baːb` (Persian 'father'), `مائی maːi` ('mother'). Alongside these sat four forms that answer to no language at all — `سو /suː/` for 'dog', `پیے /peɪ/` for 'water', `وے /weɪ/` for 'fire', `بوم /buːm/` for 'moon'.

The two researchers, working from Bashir's lexicon, Liljegren & Ali Khan (2017) and the Wiktionary Swadesh list, **agreed on 24 of the 25 cells with matching cited replacements.** That level of independent convergence is itself the strongest signal that the original row was a bulk import rather than a transcription of Khowar.

## Issues found

### khw — `dog`, `water`, `fire`, `moon` — fabricated [high]
- Current: `سو` /suː/, `پیے` /peɪ/, `وے` /weɪ/, `بوم` /buːm/
- Corrected: `رینی` /ˈɾeːni/, `اُوغ` /uɣ/, `انگار` /aŋˈɡaːr/, `مَس` /mas/
- Rationale: The real Khowar words (Bashir, *Khowar–English Lexicon*) are *reni* 'dog', *uɣ* 'water', *angár* 'fire', *mas* 'moon'. Both researchers cited all four independently.

### khw — `cat`, `eat`, `eye`, `father`, `good`, `hand`, `heart`, `house`, `mother`, `one`, `sun`, `tree` — prestige-language substitution [high]
- Corrected to: `پُشی` /ˈpuʂi/, `ژبیک` /ʒiˈbik/, `غیچ` /ɣeːtʃ/, `تَت` /tat/, `جَم` /dʒam/, `ہوست` /host/, `ہردی` /ˈhardi/, `دُر` /dur/, `نَن` /nan/, `اِی` /i/, `یور` /joːr/, `کان` /kaːn/
- Rationale: All twelve are cited by both researchers. Khowar's retroflex sibilant in *púši* 'cat' and its inherited *host* 'hand' / *ɣeːč* 'eye' are diagnostic Dardic reflexes that the Urdu copies erased.

### khw — `love` — prestige-language substitution [medium]
- Current: `پیار` /piaːr/ (Urdu)
- Corrected: `مہر` /ˈmeher/
- Rationale: Researcher A supplied a Bashir-cited form; Researcher B found only phrasal expressions and did not contradict it. Under the adjudication rule (cited, uncontradicted → `correct`), the Urdu copy is replaced.

### khw — `thanks` — transcription [low]
- Current: `شکریہ` /sukria/
- Corrected: `شکریہ` /ʃukria/
- Rationale: ش is /ʃ/, not /s/. The surface was right; the IPA was not.

### khw — `drink`, `hello`, `i`, `name`, `star`, `two`, `you` — kept
`پی` /piː/ (the bare verb root), `اوا` /awa/, `نام` /naːm/, `استاری` /isˈtaːɾi/, `جو` /dʒu/, `تو` /tu/ are genuine inherited Khowar. `السلام علیکم` is kept as a real, in-use Arabic borrowing — the atlas records what speakers say rather than hunting for a native synonym that does not exist.

### khw — meta record [high]
- `countries` was an **empty string**; now `Pakistan (Chitral, Khyber Pakhtunkhwa; Ghizer, Gilgit-Baltistan)`.
- `scriptTags` said `['Latin']` for a language written exclusively in Perso-Arabic; now `['Arabic-derived']`, with `textDirection: 'rtl'` added (a validator warning had been firing on the RTL surfaces).
- `script` refined to `Perso-Arabic (Nastaʿlīq)`; `family` refined to `Indo-European (Indo-Iranian, Dardic)`.
- `dataStatus: 'fragmentary'` **removed** — all 25 cells are now sourced, so the "fragmentary" chip no longer applies.

## Domain summary
- 25 cells: **8 keep (one with an IPA fix), 17 correct, 0 blank.**
- 24 of 25 cells were agreed by both independent researchers; the single split (`love`) resolved to the one cited form.
- Khowar is a **living, reasonably well-documented language**; nothing needed blanking.

## Worker response (作業者)
Applied all 18 word changes via `tools/apply_word_patch.js`, plus the five meta-field fixes in `wordmap_meta.js`. Bumped `WM_ASSET_VERSION.words` 59→60, `.meta` 208→209 and `word_manifest.js?v=60`. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass; the `[#193]` RTL warning is cleared.

**File status: CLOSED**
