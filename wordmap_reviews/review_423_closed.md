# Wordmap review #423 — Vai (vai) description: false superlatives + rough translation

## Why this review exists
Owner read the **Japanese** Vai description and was struck by both its factual
inaccuracy and its stiff, machine-like translation. Flagged specifics:

> 「20以上のアフリカ土着文字体系のうち、植民地以前にアフリカで発明され今日まで
> 継続的に使われている唯一」

1. **「唯一」(the only)** — false. Geʽez (~2,000+ yrs, still used) and Tifinagh
   remain in use; Vai is not the only continuously-used indigenous African script.
2. **「植民地以前」(pre-colonial)** — imprecise. Liberia was a settlement of freed
   African Americans (founded 1822, independent 1847), not a European colony —
   yet the Upper Guinea coast had heavy Atlantic trade contact. Can't be flatly
   "pre-colonial".
3. The EN also claimed Vai was **"the oldest indigenous African script"** — also
   false (Geʽez, Egyptian, Meroitic far older).
4. **"individual invention rather than borrowing"** ignored the scholarly
   consensus of **stimulus diffusion** (Latin/Arabic/Cherokee exposure sparked
   the *idea* of writing; the signs are largely original).
5. **"culturally Mande-Mande/Atlantic boundary"** — a duplication typo → should
   be **Mande–Atlantic**.

Plus two meta-field bugs found in passing:
- `official:'No (English in Liberia'` — unterminated paren → fixed to
  `'No (English is official in Liberia)'`.
- `countries:'Liberia'` — description says Liberia *and* Sierra Leone → fixed to
  `'Liberia, Sierra Leone'`.

## Rally (5 threads, owner-requested)
`vai-desc-review` workflow — 3 independent fact-corrected EN rewrites (different
emphases) → 1 adversarial synthesize/verify pass → 5 parallel translation
threads (batched: CJK-1 ja/ko, CJK-2 zh/yue, Asia vi/th/id/hi, Euro
de/fr/it/es/pt, Other ru/uk/ar/he/sw), ja explicitly prioritised for natural
prose. 9 agents, 0 errors.

## What the corrected description now says
- Vai = one of the **earliest and most successful** of the ~two dozen indigenous
  **West African** scripts of the 19th–20th c. (with Bamum, Nʼko, Mende Kikakui,
  Bassa Vah) — *not* "the only" / "the oldest".
- Explicitly notes **Geʽez and Tifinagh** as older African scripts still in use.
- Liberia framed accurately: freed-African-American settlement, independent 1847,
  outside European colonial rule but amid Atlantic trade contact.
- **Stimulus-diffusion** hedge kept (signs largely original).
- **Mande–Atlantic** contact zone. Kept: ~1832–33, Mɔmɔlu Duwalu Bukɛlɛ, dream,
  Unicode 5.1 (2008, U+A500–A63F), endonym ꕙꔤ, ~104K–120K, Liberia & Sierra Leone.
- All **19 UI-language** descriptions re-translated as natural native prose (the
  previous ja/ko/zh/etc. were literal renderings of the flawed EN).

## Applied
- `wordmap_meta.js` — full `description:{…}` (19 langs) replaced; `countries` +
  `official` fixed. meta cache bumped 226→227. Guards clean.

See [[decide-dont-punt]] — held-superlative claims were web-checkable and
decided, not punted.
