# Wordmap data review #500 — meta-coords

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: meta-coords.

## Reviewer self-introduction (ペルソナ自己紹介)

Metadata/coordinates reviewer; pin-in-country plausibility. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] meta-coords: hyw (Western Armenian) — pin vs meta.countries
- **Issue:** The pin is at 40.99,28.96, which is Istanbul, Turkey (it sits on the Bosphorus/Marmara edge, so coord_country_check classifies it as offshore and never judges it). But meta.countries is "Lebanon" and the description states the language was displaced from its Anatolian homeland into the Levant and "survives almost entirely in diaspora" centered on Lebanon/Syria — with no meta.period set, so it is not a historical-scope exemption. Pin (Turkey) contradicts declared country (Lebanon). This is exactly the pin-vs-countries self-contradiction class the guard was built for (cf. ker/mev/tkr/ahk), only it escapes because the Istanbul point falls just offshore of the simplified coastline.
- **Fix:** Move the pin to the living Western Armenian center in Lebanon so it agrees with meta.countries='Lebanon': lat: 33.89, lng: 35.50 (Beirut / Bourj Hammoud). This matches the proposed fix and the guard's remediation pattern of aligning the pin to the declared country. (Alternative, only if the Istanbul literary-center placement is deliberately intended: add Turkey to meta.countries, e.g. 'Lebanon; Turkey (historic)', so pin and countries no longer disagree — but aligning the pin to Beirut is the preferred, convention-consistent fix.)
- **Source:** Row's own meta.description ("displaced ... into the Levant (Lebanon/Syria) ... survives almost entirely in diaspora") and meta.countries="Lebanon"; coordinate 40.99,28.96 reverse-geocodes to Istanbul, Turkey. Ethnologue/Wikipedia list Lebanon (Beirut) as the principal living Western Armenian community.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 1 awaiting a decision.
