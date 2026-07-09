# Wordmap review #407 — Tregami (trm), Nuristani (deep-dive: 2 independent researchers + adjudicator)

## Why this review exists
Review #399 (Indo-Iranian + Caucasus) flagged the Tregami row as almost certainly fabricated but declined to correct it, because inventing a replacement for a poorly-documented Nuristani language is worse than leaving a known-bad cell. This review re-opened it under a design intended to make fabrication structurally impossible:

- **Two independent researchers**, given different mandates (a lexicographer hunting dictionaries and wordlists; a comparative philologist reasoning from expected reflexes and sister-language cognates), each required to cite a real source for every proposed form.
- **One adjudicator** who could only choose `keep` / `correct` / `blank`, and could only `correct` when a form was cited and uncontradicted. When neither researcher could source a form, the cell had to be **blanked**, never guessed.

## Reviewer self-introduction (ペルソナ自己紹介)
Nuristani (Kafiri) forms a third branch of Indo-Iranian, coordinate with Indo-Aryan and Iranian rather than descended from either. Tregami (Gambiri) is spoken by roughly 3,500 people in the Tregam valley of Nuristan, Afghanistan. Morgenstierne's *Notes on Tregami* (1973) remains essentially the only substantial wordlist; almost everything else in the literature is comparative work on Kati, Waigali and Ashkun with Tregami cited in passing.

## The systemic defect
Twelve of the twenty-five cells held **unassimilated Sanskrit citation forms** — `hasta` (hand), `hridaya` (heart), `agni` (fire), `nayan` (eye), `vrkṣa` (tree) — and Indo-Aryan / Persian imports (`ek` 'one', `unz` 'I', `suri` 'sun', `wo` 'water'). These are not loans that Tregami speakers use; they are dictionary headwords of a *different language*, and several are phonologically impossible as Nuristani reflexes. This is the signature of a bulk data import that reached for the nearest Indo-Iranian lexicon when Tregami itself returned nothing.

## Issues found

### trm — `eye`, `fire`, `hand`, `heart`, `tree` — Sanskrit tatsama [high]
- Current: `nayan`, `agni`, `hasta`, `hridaya`, `vrkṣa`
- Corrected: `ac̣ĩ` /aʈʂĩ/, `aŋa` /aŋa/, `doš` /doʃ/, `źo` /zo/, `jala` /dʒala/
- Rationale: Both researchers independently identified these as Sanskrit citation forms and supplied cited Nuristani replacements (Morgenstierne 1973; Wiktionary Nuristani Swadesh material). The Nuristani retroflex affricate in `ac̣ĩ` and the velar nasal in `aŋa` are exactly the reflexes the branch predicts.

### trm — `dog`, `i`, `mother`, `one`, `sun`, `water`, `you` — wrong-language import [high]
- Current: `šva`, `unz`, `nani`, `ek`, `suri`, `wo`, `tü` /ty/
- Corrected: `ćū̃` /tsũː/, `e` /e/, `žey` /ʒej/, `yo` /jo/, `sa` /sa/, `āw` /aːw/, `tu` /tu/
- Rationale: `ek` is Hindi/Urdu; `unz` is Kati/Kamviri, not Tregami; the front rounded vowel in `tü` /ty/ has no support anywhere in Nuristani. Eight of these corrections were agreed and cited by both researchers; the remaining four rest on one researcher's citation, uncontradicted by the other.

### trm — `cat`, `drink`, `eat`, `good`, `house`, `love` — unsourceable, blanked [high]
- Current: `biri`, `piti`, `ji`, `shari`, `kuti`, `ošti`
- Corrected: `—` (explicitly unattested)
- Rationale: Neither researcher could attest any of these six in a real source, and none could supply a defensible replacement. Per project policy an honest blank beats a plausible invention. `biri` merely resembles Indo-Aryan *billī*; `kuti` resembles Sanskrit *kuṭī*.

### trm — `father`, `hello`, `moon`, `name`, `star`, `thanks`, `two` — kept
- `tata`, `salaam`, `mas`, `nām`, `tāra`, `shukria`, `du` were retained. `salaam` and `shukria` are genuine, in-use regional loans (the atlas keeps real loanwords rather than hunting for a native synonym that speakers do not say). `nām` and `tāra` were kept because both researchers argued positively that these are the *expected inherited reflexes* — cf. Waigali `nām` — not Sanskrit borrowings.

## Domain summary
- 25 cells: **7 keep, 12 correct, 6 blank.**
- Because six cells are now genuinely unattested, `trm` gains `dataStatus: 'fragmentary'` in `DATA_STATUS_OVERRIDES`, and is added to `LIVING_FRAGMENTARY_CODES` in `wordmap.html` so that the "fragmentary" chip — which readers interpret as "historical" — is suppressed. Tregami is a **living language**.

## Worker response (作業者)
Applied all 18 changes to `words/*.js` via `tools/apply_word_patch.js`. Added `trm: 'fragmentary'` to `DATA_STATUS_OVERRIDES` and `'trm'` to `LIVING_FRAGMENTARY_CODES`. Bumped `WM_ASSET_VERSION.words` 59→60, `.data` 232→233 and `word_manifest.js?v=60`. `node validate_wordmap_data.js` and `node tools/check_all.js` both pass.

**File status: CLOSED**
