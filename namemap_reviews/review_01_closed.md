# NameMap Review 01 — first full data rally (strict 3-round)

**Date:** 2026-08-06
**Scope:** the whole NameMap dataset — 50 names, 1,069 `forms` cells, 423
etymology-tree nodes, 466 people attributions, and the origin/meaning/background
prose across all 19 UI languages.
**Method:** deterministic dataset dump (`forms / trees / people / origins / i18n`)
→ 3 rounds of a `parallel(review) → parallel(adversarial-verify)` Workflow.
6 review shards per round (form+rom, IPA, trees, people, origins, i18n), findings
deduped across rounds, each survivor handed to a DEFAULT-REJECTED skeptic that was
told to refute it and to prefer "refuted" when uncertain.
**Cost:** 89 agents, ~2.96M tokens, 39 min. **19 confirmed / 51 refuted.**

This is the first rally NameMap has had; the data had not been reviewed since the
initial commit (568e7b1). Every value changed below dates from that commit — no
later hand-made fix was overwritten.

## Confirmed & applied

### Wrong phoneme for the language (IPA)
- `muhammad/hi` `mʉɦəmməd̪` → `mʊɦəmməd̪` — Hindi has no /ʉ/. The only other ʉ in
  the file is Swedish/Norwegian *Julia*, where it is real.
- `joseph/ko` `jo.sʌp` → `jo.sep̚` — 셉 is ㅅ+ㅔ+ㅂ; /ʌ/ is ㅓ. `[sʌp]` spells 섭.
- `philip/ko` `pʰil.li.bo` → `pʰil.lip̚.p͈o` — 필립보 has ㅂ coda + ㅂ onset, hence
  tensification, not intervocalic voicing.
- `philip/ka` `pilipe` → `pʰilipʼe` — Georgian ფ is aspirated /pʰ/ and პ is ejective
  /pʼ/; the flat transcription collapsed a distinction Georgian is famous for.
- `isaac/am` `jɨsħak` → `jɨshakʼ` — modern Amharic has no pharyngeal /ħ/ (ሐ merged
  with ሀ), and ቅ is the ejective /kʼ/.
- `paul/fil` `ˈpaβlo` → `ˈpablo` — Tagalog has no [β]. (The Spanish and Mexican
  cells keep ˈpaβlo, which is correct there — the fricative is a Spanish allophone.)
- `khadija/id` and `khadija/ms` `kʰa.di.dʒah` → `xa.di.dʒah` — ⟨kh⟩ in Arabic loans
  is /x/; neither language has phonemic aspirated stops.
- `matthew/vi` `mac.tʰe.u` → `mat.tʰew` — Vietnamese Mátthêu ends in a coda /t/ and
  the ⟨êu⟩ rime is /ew/.

### Romanization contradicting its own row
- `joseph/ko` `Yoseb` → `Yosep` — Revised Romanization writes coda ㅂ as *p*. The
  column already does this everywhere else (야곱 Yagop, 이삭 Isak).
- `elizabeth/ko` `Elisabet` → `Ellisabet` — ㄹ coda + ㄹ onset is *ll* in RR, and the
  row's own IPA is `el.li.sa.bet`. Compare 엘리야 Elliya, 솔로몬 Sollomon.

### Transliteration convention
- `jacob` `Yaʼaqov` → `Yaʿaqov` (21 occurrences across data + i18n) — ע is ayin, which
  this dataset writes ʿ everywhere else (ʿAlī, ʿUmar, Elišévaʿ); ʼ is reserved for
  aleph/hamza.

### Etymology tree
- `jacob`: `diego`, `santiago`, `tiago` reparented from `iacomus` to `iacobus`. The
  whole point of the Iacomus node is the b > m dissimilation that gave Jacques,
  Giacomo, James and Jaime. Santiago is Sant + Iago < *Sanctu Iacobu* and keeps the
  -g-; Tiago is a clipping of San-Tiago. As drawn, the tree made Diego and James
  siblings through a sound change the Iberian forms never underwent.
- `peter`: node `Piotr | Polish / Czech` → `Piotr / Petr`. Piotr is Polish only; the
  dataset's own `cs` cell says **Petr**, so the map contradicted itself. The file's
  convention is to list both forms when a node covers two languages
  (`Jakob / Jakub`, `Tomasz / Tomáš`, `Mikuláš / Mikołaj`).

### Factual errors in the prose (fixed in all affected UI languages)
- `theodore` — **the Welsh Tudor claim is a false etymology and was removed from all
  19 languages.** Welsh *Tudur* is from Brittonic \*Toutorīx "ruler of the people"
  (cf. Gaulish Toutorix), not from Greek Theódōros; the equation is a late learned
  conflation. The Romanian `tudor` tree node is untouched and stays under
  `theodorus_la` — Romanian Tudor *is* a Theodore reflex. Only the prose was wrong.
- `margaret` — the daisy claim had the borrowing backwards, in all 19 languages.
  Greek μαργαρίτης means "pearl" only; the flower sense arose in medieval
  Latin/French (*marguerite*), which is why Daisy became a pet form of Margaret.
  English *daisy* itself is native (OE *dæges eage*). "since the Greek word also
  names the flower" → "because French marguerite came to name the daisy flower".
- `elijah` — "priests of Baal" → "**prophets** of Baal" (1 Kings 18; en/ja/zh).
- `elizabeth` — "Elizabeth I and Elizabeth II of England" → "Elizabeth I of England
  and Elizabeth II of the United Kingdom" (en/ja).
- `omar/he` note — conflated two different Hebrew names. The cell is עוֹמֶר *Omer*
  (the sheaf-measure of Leviticus 23); Esau's grandson in Genesis is אוֹמָר *Omar*,
  a separate name. Note rewritten in en and ja.

### People
- `michael/ga` `Mícheál Martin` → `Micheál Martin` — the Taoiseach spells his own
  name without the fada on the i. The cell's headword form stays `Mícheál`.

## Notable refutations (kept as-is)

51 of 70 findings were refuted. The pattern worth recording is that **most bad
findings came from a reviewer inventing a convention and then enforcing it.**

- `jacob/en` people: "Jacob Zuma is not American, replace him." **Refuted** — the
  `en`/`gb` split in this dataset is by *spelling*, not nationality. The verifier
  found counter-examples in the file itself: `gb` holds James Joyce (Irish) and
  Omar Sharif (Egyptian), `en` holds Margaret Atwood (Canadian).
- `muhammad/sw` form: "Mohammed → Mohamedi to match the IPA." **Refuted** — Mohammed
  is the mainstream Swahili spelling; the weak field is the *IPA*, not the curated
  form. Rewriting a form to match a suspect transcription inverts the evidence.
- `solomon/fil` IPA: "copied from English, Filipino has five vowels." **Refuted** —
  the dataset deliberately gives English-derived IPA to `fil` cells that keep the
  English spelling (Isaac, Elizabeth, Solomon) and Filipino IPA to Hispanized ones
  (Moises, Adan, Mateo). The reviewer's "every other fil cell" claim was simply false.
- `theodore` tree: "reparent Tudor under the Greek node." **Refuted** — under this
  map's actual topology that would detach Romanian Tudor from the Slavic node it
  descends from and make it a sibling of Fyodor and Tewodros. The reviewer's own
  reasoning argued against his proposed edit.
- `alexander/en` IPA: "that's RP, not General American." **Refuted** on the same
  ground as `fil` — this is a dataset-wide policy question, not a single-cell error.

## Notes for the next rally

1. **Ask what the column means before enforcing a rule on it.** Three separate
   refutations (`en`/`gb` people, `fil` IPA, `sw` form) came from a reviewer assuming
   a column was keyed on nationality or phonology when it is keyed on spelling.
2. **When two fields of one row disagree, decide which is the curated one.** The
   `muhammad/sw` finding was right that something was wrong and wrong about which
   half to change.
3. **A prose error propagates to 19 languages.** The Tudor and daisy errors each
   needed 19 edits. Any future finding against `background`, `meaning` or `origin`
   should be costed that way, and the localizations must be checked — they are not
   generated from the English at display time.
4. Downstream: the same two errors had been copied into the SNS marketing posts
   (`marketing/langmap-sns` #116 Theodore, #117 Margaret). Both were rewritten. When
   a prose finding lands, grep the marketing corpus too.
