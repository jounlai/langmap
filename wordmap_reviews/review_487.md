# Wordmap data review #487 — dravidian

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: dravidian.

## Reviewer self-introduction (ペルソナ自己紹介)

Dravidian reviewer; native scripts, verb citation. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [LOW] red / kn (Kannada)
- **Issue:** IPA 'keːmpu' marks a long vowel, but ಕೆಂಪು is written with the short-e sign (ಕೆ = [ke], not ಕೇ = [keː]) and is pronounced [kempu] with a short e. The dataset's own tcy (Tulu 'kempu'), bfq (Badaga 'kempu') and kfa (Kodava 'kempu') cells correctly use short e.
- **Fix:** kempu
- **Source:** Kannada orthography (ೆ is short e, ೇ is long e); Help:IPA/Kannada, Wikipedia.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [LOW] earth / tcy (Tulu)
- **Issue:** Surface ಮಣ್ಣ್ carries the geminate ಣ್ಣ (ṇṇ), but the IPA 'maɳ' drops the gemination entirely and shows a single ɳ. This is internally inconsistent (Kannada earth ಮಣ್ಣು is correctly maɳːu; Kodava ಮಣ್ಣ್ is maɳɳ; Badaga மண்ணு is maɳɳɯ).
- **Fix:** maɳɳ
- **Source:** Surface/IPA internal consistency with kn, kfa, bfq cells for the same concept.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [LOW] red / te (Telugu)
- **Issue:** IPA 'eɽːani' uses the retroflex flap [ɽ], but ఎర్ర is spelled with ర (ra, an alveolar tap/trill), not the historical ఱ (ṟa). The geminate here is an alveolar trill [rː], giving [erːani]; [ɽ] is the wrong place/manner.
- **Fix:** erːani
- **Source:** Telugu phonology — ర is [r]; Bhaskararao, 'Telugu' (JIPA Illustrations of the IPA); Help:IPA/Telugu.
- **Disposition:** APPLIED (`9e3587f3`)

**File status: CLOSED** — 3 applied, 0 awaiting a decision.
