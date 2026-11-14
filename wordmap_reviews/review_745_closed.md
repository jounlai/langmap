# Review 745 — rally 2026-11-14, round 9, performance and robustness (7 patches + 2 guards)

Applied: the service worker no longer turns renamed-code links (/en/wordmap/som, /en/hanmap/zh_han) into "site can't be reached"
for returning visitors (navigation fetched with redirect: 'manual'; only ok responses cached); 35 font URLs whose files were
re-cut without a new URL now carry ?v=<sha256> (fonts are cached for a year: returning readers saw tofu for new glyphs, e.g. the
10-29 Yi cut); tree.html loads current wordmap_meta_lite / tree_paths / tree_names_i18n (returning visitors never got review 740's
branch fixes); ipa_synth pages version their scripts (check.html showed 14 cases instead of 56) and revalidate words/*.js.
Guards: page_asset_version_check reads 'x.js?v=N' loader strings and the synth pages; new font_url_version_check (a ?v= must be the
file hash; one URL per font).
Held: ar/he pages lay out left-to-right first then flip (CLS 0.74 on index.html#ui=ar) — set lang/dir during parse from the early
UI guess; touches the UI-language boot code.
