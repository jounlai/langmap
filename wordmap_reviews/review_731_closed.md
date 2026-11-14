# Review 731 — rally 2026-11-14, round 2, Word Map UI (wordmap.html)

Reviewer patches: ~/langmap-work/rally1114/r02/a4/patches (each verified FAIL on repo → PASS patched).
Applied: 01 name switch re-renders an open comparison table (headers and read-aloud names followed the old mode);
02 Play menu Language Master row shows its SVG medal (owner master-one-medal); 03 the compare cell being read aloud is
highlighted (Word Map td, Han Map .cmp-reading); 04 Language Passport card heading shrinks to fit instead of "My Lang…"
(15 of 19 UIs); 05 its tagline wraps at spaces (graphemes for unspaced scripts) and ends with "…" instead of dropping a
line; 06 alt= from a link clamped 0.1–6 (alt=-5 opened an empty globe); 07 search status no longer says "No match" under
results; 09 the pronunciation panel moves above (or beside) a route word's colour legend instead of covering it.
Held: 08 simple-mode title "Whale ·" (owner's pulldown-only dot); Only + Historical shows modern compared languages
(fbcc22f72 "explicit toggle wins" vs historical-mode-only-historical); Passport card in he/ar draws left-to-right.
Noted for later lanes: speak.js strings only in en/ja/ko/zh (i18n lane); speech has no keyboard path (a11y lane).
