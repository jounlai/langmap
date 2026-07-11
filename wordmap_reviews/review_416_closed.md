# Wordmap review #416 — the cuckoo (a new word, #26) and its sourced regional expansion

## Why this review exists
A new WordMap concept was added: **cuckoo** (the common cuckoo *Cuculus canorus*, or any Cuculidae bird — koel, Cacomantis, hawk-cuckoo, coucal, ani, guira, roadrunner). It is the first **partial word** (`WORDS.cuckoo.partial === true`): plotted only where a real, sourced form exists, so a genuinely out-of-range or unsourced language is blank rather than filled. The selector marks it with **◐** and the definition line shows a per-word note (see [[partial-word-policy]]).

The interest of the word is that it is largely **onomatopoeic** — the two-note call names the bird again and again in unrelated families (Russian *kukushka*, French *coucou*, Hungarian *kakukk*, Finnish *käki*, Japanese *kakkō*). But the owner's repeated push was: don't just transliterate 布穀; find the **genuine local word**, which is often not 布穀 at all.

## Method
Family/region-domain research rallies (one researcher per group, every proposal adversarially verified against a named source; IPA held to the atlas convention by `tools/cuckoo_ipa_lint.js` — Chao tone letters for Sinitic/Tai-Kadai/Vietnamese/Hmong-Mien, diacritic tone for Burmish/Loloish/Tibetan, plain IPA elsewhere, bare affricates, no superscript digits).

## What was found (all sourced)
- **Sinitic topolects have their own words, not 布穀.** Wu (Shanghai) was proposed 催忙鳥, Jin (Taiyuan) 姑姑蟲 — both later **refuted** in review #418 (see there). Surviving, sourced: Hokkien **豆仔鳥** ("bean bird", Xiamen/Zhangzhou/Quanzhou), Meixian Hakka **伏鳩仔**, Changsha Xiang **陽雀子**, Taiwan Hakka **杜鵑**, Taiwanese Hokkien **杜鵑** (MOE dict). Southwest Mandarin (Chengdu/Chongqing/Kunming) uses **阳雀**, not the textbook 布谷鸟; North China **喀咕**; the Dungan of Central Asia write theirs in Cyrillic, **җунгўчўр**.
- **Korean dialects** are genuinely distinct (우리말샘): Gyeongsang **부꾹새**, Yanbian/Hamgyŏng **뻐꿍기**, Jeju **버꿍새**.
- **Japanese** dialects are NOT distinct — every modern lect says カッコウ, so none were added. But Old Japanese is: カッコウ is an Edo coinage, so the classical cuckoo is **ほととぎす** (霍公鳥, Man'yōshū). Okinawan/Ryukyuan (ja_oki/mvi/rys) are correctly **blank** — the cuckoo is a 九州以北 summer visitor and does not reach the Ryukyus.
- **Indochina** (SEAlang, Matisoff/Bradley Loloish dicts): Shan ၼူၵ်ႉတွင်ႉလေႃး, Zhuang roegdinghgeng, Tày/Nùng khảm khắc (*Cuculus micropterus*, named for its night call), Lahu qú-pu, Lisu, Hani, Jingpho, Karen, Cham tawaw (koel), Iu Mien.
- **The Americas name New World cuckoos, not the European one.** Latin-American Spanish stopped showing the book word *cuco*: Río de la Plata **pirincho** (guira cuckoo), Paraguay **piririta**, Bolivia **serere**, the Andean north **garrapatero** (ani), Caribbean **pájaro bobo** / Cuba **arriero** (lizard cuckoos), Mexico/Guatemala **pijuy**, Costa Rica **tijo**, Honduras/Nicaragua **tijul**. Indigenous: Quechua chikwan, Cariban pika, Bororo ori (later refuted, #418).
- **Maritime SE Asia** is thinly documented; only three well-sourced coucal names survived (Tausug saguksuk, Iban/Banjar bubut). Most small Philippine/Indonesian languages were **skipped as unsourceable** rather than invented — the adversarial verifiers rejected fabricated forms (e.g. a fake Hiligaynon dictionary entry, a PMP *butbut that actually reconstructs as "owl").

## Granularity decision (and its reversal)
First the identical dialect copies were **pruned** (a partial word plots only distinct forms). But that collapsed English/Arabic/French/Japanese to one dot each while Spanish and Chinese kept dozens — an artefact of whether a bare parent code exists. The owner flagged it (US English missing from the map). Decision **reversed**: the 66 pruned identical copies were **restored to parent form** for geographic parity — the map does not inherit parent→variant, so a variant needs its own cell to plot. See [[partial-word-policy]].

## Guard added
`tools/cuckoo_ipa_lint.js` (wired into `tools/check_all.js`) rejects superscript-digit tones, Latin acute/grave tones where Chao letters are required, tie-bar affricates, and tonal cells with no tone — for every partial word.

Final: cuckoo ~449 sourced cells after the #418 hardening. All data guards pass.
