# Wordmap data review #475 — ie-romance

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: ie-romance.

## Reviewer self-introduction (ペルソナ自己紹介)

Romance philologist (es/pt/fr/it/ro/ca/oc/sc + Romance creoles); Wiktionary, dialect phonologies. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] ear / ro (Romanian)
- **Issue:** IPA is given as "uˈrekje" with a spurious palatal glide. Romanian orthographic "che" = plain /ke/ (only "chi" adds palatalization context), so "ureche" has no /j/. Wiktionary and standard references give /uˈre.ke/.
- **Fix:** uˈreke
- **Source:** en.wiktionary.org/wiki/ureche — Romanian pronunciation /uˈre.ke/
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] three / sc (Sardinian)
- **Issue:** Surface "tres" (correct, Logudorese) does not match the IPA "ˈtrezi": the transcription is disyllabic and ends in -i, which reflects a Campidanese-style paragogic vowel that would copy the stem vowel (e), not become -i. The rest of the Sardinian rows are Logudorese (unu, duos, bàtoro, chimbe), so the -i ending is anomalous and the two fields disagree.
- **Fix:** Best sourced value: "ˈtrɛːzɛ" (matches Wiktionary [ˈtɾɛː.zɛ̆]: s→z voicing + paragoge echoing the stem vowel). Acceptable alternative more consistent with the sibling 'duos'/"ˈduɔs" row, which carries no paragoge: "ˈtrɛs" (or "ˈtres"). Do NOT keep the -i ending "ˈtrezi".
- **Source:** omniglot.com Logudorese Sardinian numbers + en.wikibooks Sardinian/Cardinal numbers (three = tres); Wikipedia 'Sardinian phonology' (intervocalic s-voicing, paragoge)
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] fire / ext (Extremaduran)
- **Issue:** "huegu" is transcribed /ˈweɣu/ with a silent initial h, but Extremaduran characteristically retains an aspirated [h] from Latin word-initial f- (focus > huegu). The same row's "iron" is transcribed "hierru" /ˈhjeru/ WITH the aspiration, so the two cells are internally inconsistent about the f->h reflex.
- **Fix:** words/fire.js ext: ["huegu", "ˈhweɣu"] — add the aspirated initial [h] so the IPA matches the ⟨h⟩ spelling and the parallel iron cell (hierru /ˈhjeru/).
- **Source:** Wikipedia 'Extremaduran language' — retention of word-initial [h] from Latin f-; internal consistency with ext 'iron' hierru /ˈhjeru/
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [LOW] sleep / ro (Romanian)
- **Issue:** The verb is cited bare as "dormi" /dorˈmi/, but the other Romanian verbs in the dataset use the full infinitive citation form: eat = "a mânca", drink = "a bea". Romanian dictionary citation of a verb is the long infinitive with the particle 'a'. So 'sleep' is inconsistent.
- **Fix:** surface: "a dormi", ipa: "a dorˈmi" (matches the finding's suggestedFix exactly, consistent with eat "a mânca"/"a mɨnka" and drink "a bea"/"a be̯a")
- **Source:** Internal consistency with ro 'eat' (a mânca) and ro 'drink' (a bea); standard Romanian infinitive citation form
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [LOW] night / ro (Romanian)
- **Issue:** "noapte" is transcribed /ˈnwapte/ with a /w/ glide, but standard Romanian has the falling diphthong /o̯a/: [ˈno̯apte]. The dataset elsewhere uses the o̯a notation for the same diphthong (ro 'sun' soare /so̯are/, 'star' stea /ste̯a/, 'at sign' coadă /ˈko̯adə/), so /ˈnwapte/ is a notation inconsistency.
- **Fix:** ro: ["noapte", "ˈno̯apte"]  (IPA cell = "ˈno̯apte" — matches the dataset's period-less style used in atsign "ˈko̯adə"; Wiktionary's "ˈno̯ap.te" includes a syllable break the dataset omits)
- **Source:** en.wiktionary.org/wiki/noapte (/ˈno̯ap.te/); internal consistency with ro soare/stea/coadă
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 3 applied, 2 awaiting a decision.
