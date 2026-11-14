# Review 738 — rally 2026-11-14, round 5, site UI: tree, progress, changelog, ipa_synth, poster, 404, nav, PWA

Reviewer patches: ~/langmap-work/rally1114/r05/a4/patches (18, each verified on a patched mirror).
Applied: tree shows all 1,197 rows (14 nested varieties — es_pr es_do es_gt es_ec es_uy es_ve, ar_sy ar_lb ar_sa, wae gsw_w
gsw_als, hak_hl zh_hf — were never placed); tree handlers wired once (a failed UI switch left families unopenable); tree
search survives a UI switch; tree back-to-top works under the scroll lock; poster labels all 178 countries again (broken since
2026-09-04 — countries looked up by an ISO field the self-hosted borders do not carry) and drops Antarctica, and its tab title
follows the word; PWA "Daily Langle" shortcut uses ?play=langle; the iOS install hint uses the page's language; ipa_synth index
rebuilt (24 words added since 11-10 were missing); changelog long strings wrap on phones; a stray </li> removed; progress:
missing-language chips open that language, role=group, back-link contrast, count-free meta, phone table fits, ja gloss lang;
404 page links the interactive maps.
Held: tree/wordmap meta counts ("1,187 languages", "87 key words") — public-claims lane; changelog entries out of date order in
5 places; dev router 301 before 404 for unknown non-prefixed paths (SEO lane / server config).
