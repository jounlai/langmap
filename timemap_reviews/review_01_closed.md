# TimeMap Review 01 — HNT round 1

**Date:** 2026-10-15. First review TimeMap has had.
Calendars greg_va greg_uk greg_us greg_jp japanese roc juche buddhist chinese
dangi hebrew: 8 patches (5 accepted, 3 amended).
- **Bug fixed:** the Japanese calendar printed "令和NaN年" (and 大正/昭和/平成)
  on the first day of every era, because ICU returns the year as 元; the
  engine now handles it (tested on 1912, 1926, 1989, 2019 changeovers).
- roc/juche: Juche years were dropped by North Korea in October 2024 — notes
  updated to the past tense; greg_uk (Scotland used 1 January from 1600),
  greg_us (1752 applies to the British colonies only), buddhist wording.
UI languages ja ko zh yue: 20 wording fixes in month/date strings.

## Round 2
Calendars (11): islamic — official in Saudi Arabia, with salaries on the
Gregorian calendar since 2016; persian — the year begins on the equinox DAY
(the before/after-noon Tehran rule), not at the exact moment; indian clean
(one Hindi Gazette spelling held, PDF unreadable); bengali …
UI languages vi th id hi: 23 fixes (22 accepted, 1 amended).
