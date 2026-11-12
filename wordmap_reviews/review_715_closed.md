# Review 715 — new word bubbletea (2026-11-12)

Owner 2026-11-12: modern concepts that are the same object everywhere. Partial word (modern rows only).

# bubbletea — draft report (agent B)

36 cells: bubble 20, pearl 8, boba 4, ball 3, tapioca 1 (other 0).
32 hand-drafted + 4 variety copies by guard.vfill (de_at, de_ch, de_lu <- de Bubble Tea; nl_be <- nl bubbelthee).

Sources: kaikki raw dump (English bubble tea / tapioca pearl translation tables, entries glossed bubble tea; ../libB/scanB.py,
../libB/lookB.py), each Wikipedia's article title + first line (langlinks of en:Bubble_tea, ../web/first_Bubble_tea.json), and
de/nl/fr/sv Wiktionary pages for pronunciation (../web/wikt/). Build script ../libB/bub.py.

## Route rule
The cell is the drink. Route by what the name points at: pearl (珍珠), bubble (English bubble tea borrowed or translated),
boba (波霸), tapioca, ball (little balls). Calques of bubble tea (té de burbujas, bubbelthee, תה בועות, te swigod) count as bubble.

## Regional picks
- en bubble tea; en_us boba (en WP: "Introduced to the United States ... where it is more commonly called boba").
- id boba (id WP: "lebih sering disebut boba"); jv boba (jv WP: "kawentar kanthi jeneng boba").
- zh, zh_tw, yue 珍珠奶茶 (Wiktionary + WP). vfill blocked for es, en, pt, zh.
- Dropped vfill copies with no evidence of modern use: fr_lu fr_cm fr_sn fr_ci fr_ht fr_af, ko_kp ko_bus ko_yb ko_hg ko_jl, jvn, gsw.

## Skipped
- nan: the origin language, but the only form found is POJ (nan WP title Chin-chu gû-leng tê); the row writes Han and I did not find the Han spelling. Worth a manual fill.
- wuu, gan: 珍珠奶茶 is the WP title but no Wu/Gan reading source.
- No IPA source: lo ຊານົມໄຂ່ມຸກ, my ပုလဲနို့ရည်, rki, mzn, mni, sn, it (bubble tea), no (boblete), az (qovuqlu çay).
- Everyday word unclear: uk (title Бульбашковий чай vs бабл-ті), bg, mk, sr (calque titles vs бабл ти), ur (title and first line disagree), tl, ar (vocalization of فقاعات unsourced).
- ha: the WP article title is not the drink's name.

## Doubts
- cs: WP title Boba čaj but first line opens with bublinkový / perlový čaj; title used.
- fi: pallerotee (WP title) chosen over kuplatee (Wiktionary entry); both listed in the article.
- ru бабл-ти and es/ca/pt phrase IPA from regular spelling, stress left off per the phrase policy; ru has no pronunciation source.
- sv bubbelte: WP title is "Bubble tea", bubbelte given as an alternative; IPA from spelling.
- ja label/cell タピオカティー per the WP title; speech often clips to タピオカ.
- fa بابل‌تی: no stress marked; vocalization from the article.
