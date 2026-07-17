# Wordmap review #420 — computer & sushi (two new words, #28 / #29)

## Why this review exists
Two new WordMap concepts were requested: **computer** and **sushi**. A first pass (by a different assistant) built them as a rigorous **rich-cell** dataset — every cell an object carrying `form`, `ipa`, `source{url,accessed}`, `transcriptionLevel`, evidence flags and historical-relationship markers (≈ analogue / ≙ descriptive coinage), backed by ~+439 lines of changes across nine core files (validator, wordmap.html UI, lint, build tools, CONTRIBUTING). That draft correctly refused the initial "1,113 uniform /suʃi/" coverage and shrank to a **verified partial** (computer 54, sushi 47) — but stopped there, review left OPEN.

## Decision (owner-approved 2026-07-17)
The rich-cell architecture required a sourced URL per cell, which cannot scale to broad coverage and diverges from the atlas's standard `[surface, ipa]` cells. The owner's guidance — "sushi is a loanword, so most countries use *sushi* but with their own pronunciation; historical languages had no such thing, so use a fitting analogue or a period-concept description" — is exactly the standard partial-word approach. So, with the owner's sign-off:
- The nine core-file changes were reverted to HEAD; the rich-cell helper was removed.
- The two words were rewritten in the **standard partial format** (`partial: true`, plain `[surface, ipa]`), **keeping the draft's verified data** (47 + 54 cells) and its good historical analogues.
- Coverage was then broadened by a family-domain rally.

## The historical analogues (kept from the draft, extended)
sushi and the electronic computer did not exist in antiquity, so historical cells use the era's nearest thing, not an anachronistic loan:
- **sushi**: Ancient Greek **τάριχος** (salted/preserved fish), Latin **salsāmentum**, Old/Middle/Edo Japanese **鮓 / 鮨** (the ancestral narezushi), Old/Middle Chinese **鮓**, Golden-Age Spanish **escabeche** (marinated fish), Sanskrit **शुष्कमत्स्य** (dried fish).
- **computer**: Latin **calculātor** (a human reckoner), Ancient Greek **ἄβαξ** (abacus), Old/Heian Japanese **算木** (counting rods) and Middle/Edo **算盤** (soroban), Sanskrit/Pali **गणक / gaṇaka**, Quranic Arabic **حَاسِبِينَ** (reckoners), Old/Middle Chinese **籌 / 算盤**, Classical Tibetan **རྩིས་པ**.

## Expansion rally
Twelve family-domain researchers (each finding then reviewed by a per-domain adversarial verifier; every applied cell passed `tools/cuckoo_ipa_lint.js`): **+247 sushi, +301 computer**. Principles enforced:
- Loanword in the local script with **that language's own pronunciation** — never a uniform /suʃi/. Differentiated where real: Australian sʉːʃiː, Swedish sʉːɧi, Greek σούσι /susi/, seseo Spanish /susi/, Cyrillic суши/сушы, Sinitic topolects with per-lect Chao tones (壽司/寿司, 電腦/电脑).
- The **mainstream native/calqued word** for computer where that is what people say (电脑, ordinateur, dator, رایانه, tölva, bilgisayar, கணினி, Tibetan གློག་ཀླད, Korean 콤퓨터).
- **No invention**: the unsourceable long tail (much of the Americas, the Pacific, and small African/Austronesian languages) was skipped — a gap, not a guess. These stay `partial`.

## Correctness review pass (2026-07-17)
A second rally re-audited every published cell by family domain (adversarial verify per finding). The data held up well — only **4 fixes, 0 removes, 1 rejected**:
- Icelandic sushi ˈsuːʃi → **ˈsuːsɪ** (Icelandic has no /ʃ/, and unstressed -i → [ɪ]).
- Persian computer → the mainstream loan **کامپیوتر** with corrected IPA; Jin (cjy) computer tone fix; Lingala computer **odinatɛ́lɛ**.
- Rejected: a proposal to simplify Xiang (hsn) 電腦→电脑 — the atlas correctly writes the non-Mandarin topolects (Min/Wu/Hakka/Xiang) in **traditional** characters, so 電腦 is right and the adversarial verifier protected it.
The many look-alike /ˈsuʃi/ sushi cells were checked and kept: for a simple CV·CV loanword most languages genuinely realise it that way, and the reviewers differentiated where it matters (Australian sʉːʃiː, Swedish sʉːɧi, seseo /susi/, Greek /susi/).

## Historical analogues, expanded (2026-07-17)
The owner noted that sushi's true ancestor is **narezushi** — fish lacto-fermented packed in cooked grain — and asked to deepen the historical row. A dedicated rally (three regional researchers + adversarial verify) added **27** more historical cells, prioritising the genuine fermented-fish-with-grain dish where it existed and falling back to attested salted/preserved fish otherwise; barely-attested corpora were skipped, and one anachronism was rejected (Classical Armenian's salt-fish word is actually Middle Armenian):
- **The narezushi belt (its real origin):** Old Khmer **ប្រហុក** (prahok), Old Thai (Sukhothai) **ปลาร้า** (pla ra), Old Tagalog **ᜊᜓᜇᜓ** (buro, i.e. *burong isda*, in Baybayin), Old Malay **pekasam**, Old Javanese **ḍeṅ**, Old Sundanese **tarasi**, Old Burmese **ငါးပိ** (ngapi), Chữ Nôm **𩻐** (mắm), Sino-Vietnamese **鮓**, Middle/Goryeo Korean **젓 / 醢** (jeot / hae).
- **Salted / preserved fish elsewhere:** Old Norse **skreið** (stockfish), Middle/Early-Modern English & German **stokfish / Stockfisch**, Old French **harenc sor** & Classical French **hareng saur** (salt herring), Old Spanish **cecial**, Old Italian **tonnina** (salt tuna), Ottoman Turkish **لاكردا** (lakerda), Classical Persian **شورماهی**, Mishnaic Hebrew **טָרִית**, Akkadian **šiqqu**, Coptic **ⲧⲁⲣⲓⲭⲓⲟⲛ**, Katharevousa Greek **τάριχος**.
(The Chữ Nôm 𩻐 sits in CJK Ext-B; it was added to the self-hosted BabelStone-Han subset so it renders instead of tofu.)

## Final
computer **355** cells, sushi **321** cells. All data guards + IPA lint clean. WORD_LIST 27→29; caches bumped. Closed.
