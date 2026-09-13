# Review 535 — closed

**Question:** Does the name switch behave correctly in every state a reader can actually reach?

**91 states exercised** with four node harnesses against the real shim and the real slice files:
24 `__langNameFor` cases, 12 switch transitions, 4 hash round trips, 12 hand-written hashes, 12
hashchange-onto-a-live-state, 21 single + 5 compare goods hand-offs across 7 UI codes, and today's
`lang_names/en.js` run against the **pre-feature shim** to see how a cache crossing degrades.
**Zero invariant violations. Five findings, none of them the state machine.**

## The finding that matters: the third option did nothing in 17 of 19 UI languages

`LANG_NICKNAMES` has only `en` and `ja`. For de/fr/es/ru/…/sw the button rendered, labelled itself
correctly (`WM_UI.shortName` is complete for all 21 UI codes), was clickable, wrote `abbr=1` into a
URL the reader might share — **and produced a byte-identical map.** Two of three positions
indistinguishable.

It is hidden now unless the resolved UI actually has nicknames, and because the nickname table
arrives with the slice rather than at parse time, `updateNameSwitch()` is re-run from all three
`__ensureLangNames().then()` blocks. If a reader is in 略称 and switches to a UI with no nicknames,
the mode falls back to formal rather than leaving a hidden button selected.

## Two compare tables disagreed with each other

Pin labels and the **trivia** compare header went through `getDisplayName` and followed the switch;
the **main** compare panel header read the raw table and did not. With Short selected in English the
same screen said *Singlish* on the pin, *Singapore English* in the compare panel, and *Singlish* in
the trivia compare. Whatever the right rule is, those two cannot both be right. Compare surfaces now
follow the map; the language modal's `<h2>` deliberately stays formal, because that panel is the
encyclopaedic view.

## The aria label was dead text

`wordmap.html`'s markup was updated to "(native / translated / short)", but `applyUILang()`
overwrites `#name-switch`'s `aria-label` with `i18n('ariaNameGroup')` at init and on every UI
change — and that string was still two-option **in all 19 languages**. A screen reader announced two
options for a three-option group. All 19 rewritten.

## A fallback that could not fall back

The `LANG_NAMES[uiLang] || LANG_NAMES.en` lines after `if (window.__langNameFor) return …` are only
reachable if the shim failed to load — and `wordmap.html` never declares `LANG_NAMES`, so that path
threw a **ReferenceError** instead of falling back. Now reads `window.LANG_NAMES`.

## A correction to my own commit message

The nickname commit claimed `__langNameFor`'s base-language step fixed a live bug where an `es_mx`
or `pt_br` reader "silently fell through to ENGLISH for every language on the map". **That is not
reachable.** `_normalizeUiLang` collapses `es_eu`/`es_mx`/`pt_eu`/`pt_br` → `es`/`pt` at every entry
point — cookie, navigator, and the `?ui=` restore — and the UI picker is built from
`WM_UI_LABELS`, whose 19 keys exclude the regional codes. So `uiLang` is always one of 19 base
codes. The base step is correct defence, not a fix, and the `formal=`/`formals=` mismatch I claimed
it would have caused cannot occur either. The commit message overstates it; this record is the
correction.

## Left alone

`loadHash` never resets an absent `nat=`/`abbr=`, so a link pasted into the same tab can only turn a
mode on — but `hist`, `pin` and `only` all behave that way, and changing `abbr` alone would make it
the odd one out.

## Verified correct

Exactly-one-radio across all 12 transitions, with two-active and none-active **unreachable**; the
"selected underneath" behaviour matches its comment; all four states survive a hash round trip;
pre-feature `nat=1` links restore unchanged and garbage values are rejected; `loadHash()` runs
before the first `updateMarkers()` so deep links are honoured on first paint; all 24 resolver edge
cases including unloaded slices, missing codes, a nickname without a formal name, and `ui`
undefined/null/empty/unknown; goods arrays same length and order with non-ASCII surviving double
encoding, and a nickname-less language sending an identical string in both parameters; shim `?v=`
and slice `?v=` consistent across all four pages, with the cache-crossing case degrading gracefully
— formal names register first, nicknames are lost, one console error; `hanmap.html` untouched and
safe, its third option absent by design; no duplicate ids, no double-attached listener, no
temporal-dead-zone read; and `lang_nicknames.js` is build-input only, so the layer genuinely costs
no extra request.
