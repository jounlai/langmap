# Argentina & Brazil — language-coverage expansion candidates (scoping)

Pre-work for expanding WordMap coverage of Argentina and Brazil. Compiled 2026-08-23.
**Nothing here is added yet** — this is the candidate list + confidence so we can decide scope before building. Every actual addition still goes through the standard rule: **generate in ≥2 independent passes, keep a cell only where the passes agree; never fabricate; IPA is the binding constraint.**

## Current state (why it looks coarse)

Languages currently tagged `meta.countries` ⊇ the country:
- **Argentina: 10** — qu, gn, arn (Mapudungun), mzh (Wichí), qwc, es_ar, + immigrant langs (yi, lij, pms, pdt)
- **Brazil: 11** — pt_br, gn, yrl (Nheengatu), cni, car, myp (Pirahã), tue, mcf, tpn, tca, pdt

Brazil realistically has ~150–180 living languages; Argentina ~15+. So the map is a curated sample skewed to well-known/immigrant languages. Two separate gaps:

---

## Part A — Quick wins: already in the dataset, just untagged (NO new data)

49 languages sitting in `LANG_DATA` have an empty `meta.countries`. Several are Argentina/Brazil languages that already carry full word data but don't appear when you filter by the country. Fixing the tag is a one-line data edit each — **do this first**; it immediately makes the map denser with zero fabrication risk.

| code | name | correct `countries` |
|---|---|---|
| `xav` | Xavante | Brazil |
| `ter` | Terena | Brazil |
| `bor` | Bororo | Brazil |
| `gun` | Mbyá Guaraní | Brazil, Argentina, Paraguay |
| `aoc` | Pemón | Venezuela, Brazil, Guyana |
| `trn` | Trinitario Mojeño | Bolivia *(not AR/BR, but also empty — fix while here)* |
| `es_bo` / `es_py` / `es_pa` | Bolivian / Paraguayan / Panamanian Spanish | respective country *(general gap)* |

Effect: Brazil 11 → ~15, Argentina 10 → 11, before adding a single new language. (Consider a broader sweep of all 49 empty-`countries` entries as a separate data-quality pass.)

---

## Part B — New languages to add (need cross-validated word data)

Confidence = **expected data availability** (dictionary / Wiktionary-with-IPA / descriptive grammar). It is a pre-filter, **not** a guarantee — the ≥2-pass cross-check at build time is the real gate, and any concept that doesn't corroborate twice is left blank rather than guessed. Codes are ISO 639-3.

### Tier 1 — High confidence (documented, sizable, IPA obtainable)
Start here. These have dictionaries and/or Wiktionary IPA entries and enough speakers that the core vocabulary is well attested.

**Brazil**
| code | language | family | ~speakers | basis |
|---|---|---|---|---|
| `kgp` | Kaingang | Macro-Jê (S. Jê) | ~27,000 | dictionary + Bible; **123 Wiktionary terms with IPA** (verified) |
| `gub` | Guajajára (Tenetehára) | Tupí-Guaraní | ~14,000 | grammars, dictionary |
| `txu` | Kayapó / Mẽbêngôkre | Macro-Jê | ~12,000 | dictionary, mission materials |
| `mbc` | Makuxi | Cariban | ~30,000 (BR+GY) | dictionary, grammar |
| `kpj` | Karajá | Macro-Jê | ~3,000 | rich descriptive work, dictionary |
| `myu` | Munduruku | Tupí (Mundurukú) | ~10,000 | grammar, lexicon |
| `guu` | Yanomamö/Yanomami | Yanomaman | ~20,000+ | dictionaries (choose one variety code deliberately: guu/wca/xsu/gub-adjacent) |
| `mav` | Sateré-Mawé | Tupí | ~9,000 | grammar, wordlists |
| `bwi` | Baniwa (of Içana) | Arawakan | ~6,000 | dictionary |
| `kgk` | Kaiowá (Guaraní) | Tupí-Guaraní | ~30,000 | close to existing gn/gun; well documented |

**Argentina**
| code | language | family | ~speakers | basis |
|---|---|---|---|---|
| `tob` | Toba / Qom | Guaicuruan | ~120,000 | dictionaries, active documentation |
| `moc` | Mocoví | Guaicuruan | ~3,000–12,000 | grammar, wordlists |
| `plg` | Pilagá | Guaicuruan | ~4,000 | grammar (Vidal), lexicon |

### Tier 2 — Medium (grammar exists; IPA may need careful derivation from orthography)
| code | language | country | note |
|---|---|---|---|
| `kbc` | Kadiwéu | BR | Guaicuruan; grammar exists |
| `apn` | Apinajé | BR | Jê; documented |
| `xer` | Xerénte | BR | Jê; documented |
| `xra` | Krahô | BR | Jê; wordlists |
| `pab` | Parecís (Paresí) | BR | Arawakan; grammar |
| `wap` | Wapishana | BR/GY | Arawakan; dictionary |
| `crt` / `mtp` | Chorote | AR | Matacoan; grammar |
| `cag` | Nivaclé (Chulupí) | AR/PY | Matacoan; dictionary |

### Tier 3 — Low / risky (extinct, moribund, or thinly attested → expect many blank cells)
Add only the concepts that corroborate; expect sparse coverage, mark provenance carefully.
| code | language | country | status |
|---|---|---|---|
| `teh` | Tehuelche (Aonikenk) | AR | moribund/near-extinct; some wordlists |
| `ona` | Selk'nam (Ona) | AR | extinct; historical wordlists only |
| `yag` | Yámana / Yaghan | AR/CL | ~1 L1 speaker; Bridges dictionary (rich but old orthography) |
| `vil` | Vilela | AR | moribund; sparse |
| — | Puelche, Günün-a-künä, Chané | AR | extinct/very sparse — likely skip |

---

## Suggested scope for a first pass

1. **Part A tag fixes** (xav, ter, bor, gun, aoc, +es_bo/es_py) — immediate, no data risk.
2. **Tier 1** (~13 languages) via the standard cross-validation pipeline, core words first (the concepts already on the map). Expect strong coverage.
3. Reassess Tier 2/3 after seeing Tier 1 hit rates.

## Build-time guardrails (unchanged)
- ≥2 independent generation passes; keep a cell only where surface forms agree. Disagreement = likely guess → drop.
- IPA is binding; `surface===ipa` is an accepted convention where a language's orthography is effectively phonemic, but do not invent IPA.
- After adding: `node tools/build_meta_split.js` (meta regen), `node tools/bump_versions.js`, `node tools/check_all.js` green, then commit. New languages need `LANG_DATA` entries + `meta` (family/speakers/countries/script/…) + per-word data.

## Open questions for the owner
- Scope: just Argentina + Brazil, or fold this into a wider Latin-American / global indigenous-language pass?
- Target size for the first batch (e.g., all of Tier 1, or a smaller trial of 4–5)?
- Which word set to fill first (the full current ~53-word list, or a core subset)?
