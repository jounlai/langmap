# Wordmap review #409 — Yaghnobi (yag), Eastern Iranian (deep-dive: 2 independent researchers + adjudicator)

## Why this review exists
Review #399 held the Yaghnobi row: `water = sima`, `sun = lam`, `eye = tala`, `dog = yašala`, `house = akar` are impossible for an Eastern Iranian language descended from Sogdian, but the reviewer refused to substitute guesses. The row was re-opened with two independent researchers (a lexicographer and a comparative Iranist), each required to cite a source, and an adjudicator permitted to `correct` only on a cited, uncontradicted form — and obliged to `blank` otherwise.

## Reviewer self-introduction (ペルソナ自己紹介)
Yaghnobi (яғнобӣ) is spoken by roughly 13,000 people in the Yaghnob valley of Tajikistan and is the only living descendant of Sogdian. Persian/Tajik supplies about 60% of its lexicon, so the presence of a Tajik-looking word is *not* by itself evidence of contamination — the question is always whether the specific form is the one Yaghnobi speakers use. The primary sources are Andreyev & Peshchereva's *Yaghnobi Texts* with dictionary (1957), Ľubomír Novák's Yaghnobi–Czech dictionary (2010), Bird's 2007 Yaghnobi–Tajik–English lexicon, and the StarlingDB/Belyaev annotated Iranian Swadesh list built on them.

## The systemic defect
Eighteen of twenty-five cells were **outright fabrications** — not loans, not dialect variants, simply not Yaghnobi. Both researchers converged on the same replacements from the same primary sources, which is as close to certainty as this kind of audit reaches.

The single most revealing find: the row's `cat = kyat` is a mangling of **kat**, which is the real Yaghnobi word for **house** — and `house` in the same row held the invented `akar`. A word was mis-slotted one row over and then dressed up. That is the fingerprint of a generated table, not a transcribed one.

## Issues found

### yag — `cat`, `dog`, `drink`, `eat`, `eye`, `father`, `fire`, `good`, `hand`, `heart`, `house`, `moon`, `mother`, `one`, `star`, `sun`, `tree`, `water` — fabricated [high]
- Current: `kyat`, `yašala`, `ala`, `atama`, `tala`, `imu`, `pušaki`, `welisa`, `yaš`, `seskin`, `akar`, `hanuxa`, `tapi`, `koli`, `istora`, `lam`, `šopeya`, `sima`
- Corrected: `pišak` /piˈʃak/, `kut` /kut/, `žav` /ʒav/, `xwar` /xʷar/, `ɣurda` /ˈʁurda/, `dodo` /ˈdodo/, `olov` /oˈlov/, `naɣz` /naʁz/, `dast` /dast/, `dil` /dil/, `kat` /kat/, `mahtob` /mahˈtob/, `ocha` /oˈtʃa/, `i` /iː/, `sitora` /siˈtora/, `xur` /xur/, `diraxt` /diˈraxt/, `op` /op/
- Rationale: All eighteen cited by both researchers from the Andreyev–Peshchereva / Novák tradition. `op` 'water' is the regular Yaghnobi reflex of Sogdian *āp*; `xur` 'sun' and `kat` 'house' are likewise inherited. Several corrections (`dast`, `dil`, `olov`, `naɣz`, `diraxt`, `mahtob`) *are* Tajik in origin — but they are the words Yaghnobi speakers actually use, and the atlas records usage, not etymological purity.
- Note: `star` was the one cell where the researchers split, keep-vs-correct. The row's `istora` is a metathesis of the attested `sitora`; both cited `sitora`, so the standard form was taken.

### yag — `love` — unsourceable, blanked [high]
- Current: `kur` /kur/
- Corrected: `—` (explicitly unattested)
- Rationale: `kur` is spurious. Neither researcher could find a Yaghnobi headword for 'love' in any citable source. I re-checked this by hand: the full Yaghnobi–Tajik–English lexicon (а through я) was extracted and searched — it has **no headword glossed 'love'**, and `дӯст` occurs only inside example sentences in its 'friend' sense. Per project policy the cell is blanked rather than filled with a plausible Tajik loan.

### yag — `hello`, `i`, `name`, `thanks`, `two`, `you` — kept
`salom` and `rahmat` are genuine, universally-used Tajik/Arabic borrowings with no native alternative. `man` (1sg), `nom` 'name', `du` 'two', `tu` (2sg) are inherited and were already correct — the only four cells the original row got right.

## Domain summary
- 25 cells: **6 keep, 18 correct, 1 blank.**
- Because one cell is now genuinely unattested, `yag` gains `dataStatus: 'fragmentary'` in `DATA_STATUS_OVERRIDES` and is added to `LIVING_FRAGMENTARY_CODES` in `wordmap.html`, so the "fragmentary" chip — which readers take to mean "historical" — is suppressed. Yaghnobi is a **living language**.

## Worker response (作業者)
Applied all 19 changes via `tools/apply_word_patch.js`. Added `yag: 'fragmentary'` to `DATA_STATUS_OVERRIDES` and `'yag'` to `LIVING_FRAGMENTARY_CODES`. Bumped `WM_ASSET_VERSION.words` 59→60, `.data` 232→233 and `word_manifest.js?v=60`. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass.

**File status: CLOSED**
