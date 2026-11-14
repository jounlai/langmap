# Name Map / Time Map UI review 09 — rally 2026-11-14 round 4 (namemap.html, timemap.html)

Reviewer patches: ~/langmap-work/rally1114/r04/a4/patches (each verified FAIL on repo → PASS patched).
Applied: 06 CJK subset faces for chunks that do not exist are no longer emitted (2–4 font 404s on every load, the Korean UI
waiting on failed requests; tools/build_cjk_page_subsets.py + both pages); 01 the origin form is marked in the Japanese UI
(the test read the ja note 原形); 07 an open popup is redrawn in the new UI language; 03 a pasted link with another l= loads
that language's name data; 04 Time Map hash links apply s / simple / c / z too; 02 the die never rolls the name already
shown; 09 zh-TW / zh-Hant browsers load zh, not yue (shim matches the page); 05 search folds ł / đ (Pawel → Paul); 08 the
boot view no longer animates past the URL state.
Held (SEO lane): seo/trivia.php "set date" links into historical calendars lack era=hist.
