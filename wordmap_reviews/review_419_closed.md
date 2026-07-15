# Wordmap review #419 — full family×word re-audit of the whole atlas

## Why this review exists
The owner asked for a review rally over the **entire WordMap** — all 25 core words × ~1,113 languages (cuckoo/woof were freshly hardened in #418 and are excluded). When asked how deep, the owner chose the **most thorough** option: one reviewer per **language-family × word** cell (≈12 family domains × 25 words ≈ 300 reviewers), each finding independently and adversarially verified, rather than the coarser family-only rallies of #397–412.

This finer granularity is the point: a family-only reviewer skims 25 columns at once and misses single-cell errors; a (family × word) reviewer sees one concept across ~40–180 related languages side by side, which makes **cross-language copy artefacts** and **wrong-meaning cells** jump out.

## Method
- Slices generated per (family, word): a table of code · language · family · surface · IPA. Rich object-format cells (multi-script, with `alt`/source metadata — e.g. Zhuang 淰, Jurchen) are shown by their primary form and **left untouched** by the apply step (a plain array replacement would drop their alt data).
- Each reviewer reports only genuine problems; each is adversarially verified against sources (default reject). Fixes pass `tools/cuckoo_ipa_lint` where tonal, then `tools/check_all.js`.
- Run in 4 batches by word to stay under the agent cap; applied and committed per batch.
- Standing rules enforced: mainstream everyday word only ([[wordmap-major-word-only]]); preserve deliberate dialect phonology ([[rally-dialect-false-positives]]); never invent ([[partial-word-policy]] "better a gap than a wrong cell").

## Batch 1 — water, fire, sun, moon, star, mother, father (84 reviewers)
**231 findings → 218 accepted, 13 rejected; 209 applied** (9 were object-format cells, correctly skipped). Representative:
- **Wrong meaning:** Tulu (tcy) had father/mother **reversed** (amme=father, appe=mother — a documented Dravidian reversal); Lampung (ljp) "father" was *kemaman* = **uncle**; Kusunda (kgg) "ama" was a Nepali **'mother'** loan → yi.
- **Neighbour-language copies:** Abaza (abq) father cell was a verbatim copy of the Abkhaz row → аба; Komi-Permyak (koi) carried the Russian loan бать where native **ай** belongs; Extremaduran (ext) held the Fala word *pai* → pairi; es_pr "padre" had Portuguese *pai* as its IPA.
- **Script/IPA self-consistency:** Sumerian (sux) father 𒀀𒁀→**𒀊𒁀** (ab-ba, matching its own /abba/ IPA); Plautdietsch (pdt) informal *Papa* → neutral citation **Voda**.

## Batch 2 — i, you, name, eye, hand, heart, love (84 reviewers)
**206 accepted, 10 rejected; all 206 applied.** (The scratchpad was cleared mid-run when the working tree was briefly on another branch; the accepted set was recovered from the workflow journal per [[workflow-harvest-recovery]].) "eye" alone took 44 fixes. Representative:
- **Wrong meaning:** Otomi (otq) "eye" was *hmi* = **face** → da; Hurrian (xhu) "eye" was *šini* = **two** → furi (𒁍𒊑); Aari (aiw) "eye" was the Hamar **mouth** form → aafi.
- **Wrong-language copies / wrong glyph:** Old Nubian (onw) "eye" held the Nile-Nubian word → **maɲ** (ⲙⲁⳡ); Vai (vai) carried the wrong syllabary glyph → **ꕰ** (NYA).
- **Truncation / diacritic:** Dogon (ddn) gi→**giré**; Saho (ssy) int→**inti**; Venda (ve) ito→**iṱo** (dental); Kalenjin (kln) kosit→**konda**; Cherokee (chr) agati→**akta**.

## Batches 3–4 (pending)
- Batch 3: tree, house, dog, cat, eat, drink
- Batch 4: one, two, hello, thanks, good

(Results appended as each batch closes.)
