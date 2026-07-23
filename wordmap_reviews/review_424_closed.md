# Wordmap review #424 — descriptions audit: false superlatives across the atlas

## Why this review exists
After the Vai fix (#423), the owner: *"１つ偶然派遣しただけなので、ほかの言語も
全体的にレビューラリー。徹底的に検証してください。"* — the Vai "only/oldest"
error was unlikely to be unique, so audit **every** description for the same
class of problem.

## Method — deterministic prefilter → triage → fix, all rally-driven
1. **Prefilter** (`tools/get_desc.js` + a superlative/absolute regex): of **1,120**
   descriptions, **387** contain an absolute claim ("the only", "the oldest",
   "the largest", "the first", "unique", "sole", "never", …).
2. **Triage rally** (30 agents, batched): each judged whether its batch's claims
   are accurate-and-bounded or false/overstated. **67 of 387** flagged `fix`
   (320 were fine — most superlatives are true, e.g. Mandarin = world's most-
   spoken). Every agent fetched the live text via `node tools/get_desc.js`.
3. **Fix rally** (67 agents, one per entry, high-effort): correct the English
   surgically to the accurate position, then **retranslate into every UI
   language** of the entry (19 or 23). ~1,433 language cells regenerated.

English is the source of truth — the errors lived in the English and every
translation had faithfully carried them, so each fix is English-first then
propagated. 0 agent errors across all three rallies.

## The 67 corrections (representative)
**Flatly false:**
- **kn** Kannada — "8 Jnanpith Awards, the most for any Indian language" → Hindi
  has 12; Kannada's 8 is second (most among Dravidian).
- **es_cl** — "Real Academia de la Lengua Chilena" does not exist → **Academia
  Chilena de la Lengua** (1885).
- **szl** Silesian — "officially recognized as a regional language of Poland in
  2024" → parliament passed it but the President **vetoed** it (2024 and 2026).
- **rwk** Rwa — described as a **Pare** (E.30) language → it is **Chaga** (Mt Meru).
- **bsq** Bassa — "largest **Eastern** Kru" → it is **Western** Kru.
- **jia** Jina — wrong family.  **maz** Mazahua — a reversed claim.
- **es_cl / chr / uga / tup**: "first"/"earliest" claims that ignore older
  attestations — Sequoyah's Cherokee (1821) is **not** the first indigenous
  American script (Maya etc.); Ugaritic **predates Phoenician** but is one of the
  earliest alphabets, not *the* first true alphabet; Anchieta's 1595 Tupi grammar
  is not the earliest S. American grammar (Quechua 1560).

**Overstated absolutes → bounded:**
- **to / haw** — "ergative (rare in Polynesian)" → ergativity is normal in
  **Western** Polynesian; Hawaiian is **accusative**. ("haka" is Māori, not Tongan.)
- **ro** — "the only Eastern Romance language" → also Aromanian/Megleno/Istro-
  Romanian; Romanian is the only **major standardized** one.
- **av** — "largest Northeast Caucasian" → Chechen is larger; Avar is largest
  **Daghestanian**.  **kab** — "most widely spoken Berber" → Tashelhit has more;
  Kabyle is the most **standardized/written**.
- **naq** Nama — "most widely spoken click language" → Zulu/Xhosa dwarf it;
  largest **Khoe** click language.
- **lv** — broken tone "unique among IE" → parallels in Danish stød.
- **hi** — Bollywood "world's largest film industry" → **India** as a whole leads
  by output; Bollywood is its most prominent single-language branch.

**Legal/status precision:**
- **kk** "sole official language of Kazakhstan" → sole **state** language (Russian
  co-official in institutions).  **fi** Finnish "sole national, Swedish secondary"
  → both are **co-equal national languages**.  **lb** Luxembourgish "sole official
  1984" → **national** language (French/German remain official).
- **ko_bus** "most **prestigious** dialect" → Seoul is the prestige variety;
  Gyeongsang is the most **prominent/recognizable**.

**Fabricated / wrong supporting detail:**
- **egl** — cited Renato Zero & Tondelli as Emilian culture; both work in standard
  Italian.  **nap** — "13th-century Placiti Cassinesi" → they are **960 CE** and
  legal formulas, not literature.  **bem** — "7 noun classes" → ~15–20.
  **trm** — false PIE-laryngeal retention.  **ket / tsm** — wrong genealogical /
  legal-recognition claims.

Full triage output + per-entry issues archived in the run transcript.

## Applied
- `wordmap_meta.js` — 67 `description:{…}` objects fully replaced (English +
  every UI language), via a brace/string-aware scanner so no neighbouring field
  was touched. All language sets preserved (0 dropped/added). meta cache 227→228.
- New tool `tools/get_desc.js` (audit helper). Guards clean; `wordmap_data`
  validator clean.

See [[decide-dont-punt]], [[review-vs-manual-fixes]]. The 320 "ok" verdicts were
left untouched — a superlative is not automatically wrong.
