# Wordmap review #418 — three-round adversarial hardening of cuckoo + woof

## Why this review exists
The owner asked for **three review rounds** over the two new sound-words, "mainly to verify the correctness of the posted information, but also to consider whether missing languages have room to be added." The standing bar was set in [[wordmap-major-word-only]]: the **mainstream everyday word**, sourced, or nothing — no archaic/poetic/hyper-local synonyms, no invention.

## Round 1 — cuckoo, by family domain (12 fixes)
Replaced marginal / Anglicised / ornithological-checklist forms with the everyday word:
- Indo-Aryan: hi कुक्कू→**कोयल**, ur کوکو→**کوئل**, gu પરદેશી કુહુકંઠ→**કોયલ**, mr सामान्य कोकीळ→**कोकीळ** (dropped the "common" checklist modifier), ne कुक्कु कोइली→**कोइली**, si පොදු කෝකිලයා→**කොහා**.
- Tibetan/Dzongkha bo/dz: Chao tone letters → **diacritics** (Bodish convention).
- tg **фохтак** (a turtledove!) → куку; yi קוקو → the real Yiddish **קוקאווקע**; Asturian cucu→cuquiellu.
- Rejected: Bengali পাতি পাপিয়া (already the standard name), a Ligurian "gap" that was not a gap.

## Round 2 — woof, by family domain (5 changes)
- Irish **bhuf bhuf** added (Foras na Gaeilge official dict; the listicle "amh amh" means "raw").
- Final-obstruent devoicing: Catalan bub→bup, Macedonian av→af (Macedonian devoices; Serbian stays aʋ).
- Slovene post-vocalic /ʋ/→glide (xoʋ→xou); Telugu breathy-voiced ʰ→ʱ (matching hi/mr/ne/ur/bn).

## Round 3 — hostile fact-check of the 134 riskiest cells (this session's minority/topolect/onomatopoeia additions)
115 held; **19 did not** (10 fixed, 9 removed). This is where several eye-catching earlier "discoveries" failed:
- **wuu 催忙鳥** ("hurry-up bird") — unattested across 8 targeted searches; Wu Wikipedia titles the bird 大杜鹃, the Shanghai dict gives 杜鹃. **Removed.**
- **cjy 姑姑蟲** — the last character 蟲 means *insect*; sources tie 姑姑种 to a dove, not a cuckoo. Wrong referent. **Removed.**
- **yo gbó gbó** — Wiktionary defines gbó as the intransitive VERB "to bark", not the imitative sound. **Removed.**
- Also removed (unattested / neighbour-copy, blanked not guessed): kha khap-snem ("close-year"), ps کوکو (a verbatim Persian copy), bor ori ("stone"), kjp Karen form (zero attestation), cja tawaw (unverifiable Cham), som wah.
- Fixed: nan 布穀→**杜鵑** (MOE dict has no 布穀), nan_qz 布穀→**豆仔鳥** (native Hokkien), gan 穀 final -k→glottal ʔ (Nanchang), zh_cq/zh_db Sinitic no-space, su *manuk uncuing* final -k not ʔ, pam/qu stress, es_pr Puerto-Rican aspiration x→h, gl guau glide.
- The gap-sweep proposals were single-source and **unverified, so NOT applied.**

## Principle demonstrated
Where a cell was wrong and no sourced replacement existed, it was **blanked, not guessed** — a partial word tolerates a gap far better than a wrong cell. Final: cuckoo 449, woof 80. All data guards + `cuckoo_ipa_lint` clean.
