# Review 725 — rows with a site title but no cell; Serbo-Croatian gaps (2026-11-13)

Found while checking the Thai wisdom tooth (review 723): some words have a title in a site language but no cell in that
language's row. Two draft-only agents (~/langmap-work/left1113/site, ~/langmap-work/left1113/sh).

## Site-language rows (site/cells.json, 16 applied; site/empty.json, 7 left empty)
kiss zh 吻 wən˨˩˦ and yue 吻 mɐn˩˧ → mouth (吻 first meant the lips; the noun, 一个吻 / 初吻; Cantonese 錫 is a verb, words.hk);
kiss th การจูบ → plain (Wiktionary noun entry, Thai Wikipedia title; จูบ is entered as a verb). These were skipped before by a
blanket "Sinitic rows need a dialect source" rule (zh is Standard Mandarin) and by review 709 dropping verb forms.
usbstick th แฟลชไดรฟ์ → drive. goosebumps sw kimbimbi → plain (TUKI, ILCAA); wisdomtooth sw gego la mwisho 'the last
molar' → age (TUKI); jellyfish sw kiwavi wa baharini → other ('sea cow-itch caterpillar'; TUKI, Madan 1903 upupu wa bahari).
bubbletea it bubble tea, uk бабл-ті, ar شاي الفقاعات → bubble. jetlag it jet lag (Treccani), uk джетлаг, id jet lag, th
เจ็ตแล็ก → jetlag; vi lệch múi giờ → timediff; ar اضطراب الرحلات الجوية الطويلة → other. vi_c / vi_s copied with IPA from
the dialect rules (~/langmap-work/vidial).
Empty with reasons: sw bubble tea, cotton candy, jet lag, woof (TUKI has no word; no Swahili article, no corpus use);
uk lol (review 571); vi hangover (no single word; túc túy has no use); hi ladybird (Wiktionary names have no use).
Unsourced IPA (read from the language's rules): it bubble tea, uk бабл-ті / джетлаг, id jet lag, th เจ็ตแล็ก.

## Serbo-Croatian (sh/cells.json, 11 of 12)
The Wiktionary gap fill keyed sh, so sr/hr/bs had no cell in four words. chili hr čili → chilli; sr љута паприка, bs ljuta
paprika → pepper ('hot pepper'; .ba usage nearly even with čili). usbstick hr, bs USB stick → stick. jetlag hr/bs jet lag,
sr џет-лег → jetlag. bubbletea hr/bs bubble tea, sr бабл ти → bubble. Accents from HJP / Wiktionary where given, else plain ˈ.
Not applied: sr usbstick (no written form clearly wins; USB меморија vs флеш/флешка).

Parity budgets raised with reasons: kiss 27 → 50, jetlag 40 → 53, bubbletea 99 → 109, usbstick 104 → 107 (variety rows of
the new parents, no variety-level source).
Process note: the site agent fetched a few Wikipedia /api/rest_v1/ summaries because the brief suggested that path;
Wikipedia's robots.txt disallows /api/. Brief template fixed (/wiki/ pages only).
