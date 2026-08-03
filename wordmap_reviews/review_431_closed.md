# Review 431 — Taiwan Mandarin + "@" additions (strict 3-round rally)

**Date:** 2026-08-04
**Scope:** All new additions this session — Taiwan Mandarin (zh_tw) across all
31 words, the "@" word's new pronunciation entries (Cantonese, English/Spanish/
French national variants), and the "@" meaning-gloss set (24 glosses × 20 UI
languages).
**Method:** Deterministic dataset dump → 3 rounds of a `pipeline(review → adversarial-verify)`
Workflow (5 review shards/round: zh_tw forms, @ IPA, 3 gloss groups; each finding
verified by a DEFAULT-REJECTED skeptic on Opus). 50 agents, ~1.05M tokens.

## Confirmed & applied (commit b9639f1)
- **zh_tw neutral-tone divergences** (Taiwan retains full tone where Mainland
  neutralizes): 眼睛 `tɕiŋ`→`tɕiŋ˥` (yǎnjīng), 名字 `tsɿ`→`tsɿ˥˩` (míngzì),
  月亮 `ljɑŋ`→`ljɑŋ˥˩` (yuèliàng). Real, documented Taiwan-vs-Mainland facts.
- **小老鼠 (@ zh_tw)** normalized from surface-sandhi to citation tones
  `ɕi̯ɑʊ̯˨˩˦ lɑʊ̯˨˩˦ ʂu˨˩˦` — see convention note below.
- **@ gloss fixes:** littledog.ja 子犬→小型犬 (was = puppy); sillymonkey.ja
  おどけたサル→おばかなサル; strudel.ja add （菓子）; curl.sw mkunjo→msokoto;
  atmark.ko "at 기호"→"앳 기호"; en_ph "æt"→"at" (PhilE TRAP = [a]).

## Rejected (kept as-is)
- **hello / cuckoo "third-tone sandhi" findings** — REJECTED. The atlas
  transcribes **citation tones**, not surface sandhi (pre-existing 你好 =
  `ni˧˩˧xaʊ̯˧˩˧`; no zh entry anywhere applies sandhi). The rally was misled
  by my own freshly-added 小老鼠, which *was* sandhi'd — so the correct move was
  to de-sandhi 小老鼠, not to sandhi the others.
- **rollmops.sw** ("samaki wa achari" = generic pickled fish) — a strong
  round-1 verifier rejected it; Swahili has no native herring word and the
  proposed fix was clunky. Current is defensible.

## Note for future rallies
When a rally cites *recently-added* data as the "convention" it's enforcing,
check whether the pre-existing corpus actually follows that convention before
applying. Here the established convention (citation tones) is the authority.
