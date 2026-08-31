# Contributing word data to LangMap

This guide is for people adding word translations or new word concepts
to the wordmap. Source data lives in two places:

- `words/<id>.js` — one file per concept (water, fire, etc.). Each file
  contains the concept's label, definition, and per-language translations.
- `wordmap_data.js` — language metadata (lat/lng, native name, etc.).
  Translations no longer live here.

If you only need to fix or add one translation, you can do it without
running anything but a text editor — keep reading.

## Tasks

### Adding a new translation to an existing concept (3 steps)

1. Open the relevant file under `words/`. Concept IDs match filenames
   (`water` ↔ `words/water.js`).
2. Find the region group that fits the language (or add a new comment
   block). Insert the row in the form:

   ```js
   <code>:  ['<surface form>', '<IPA>'],
   ```

   The language code goes on the left; the surface form and IPA on the
   right. Find the right code in [`LANG_CODES.md`](./LANG_CODES.md).

3. Run the validator from the repo root:

   ```bash
   node validate_wordmap_data.js
   ```

   It should report zero failures. If it complains, the message tells you
   what to fix.

### Adding a new concept (5 steps)

1. Pick a unique ID. Use ASCII, lowercase, no spaces (`book`, `river`,
   `to_walk`). Filenames must match the ID.

2. Create `words/<id>.js`. Copy the skeleton at the bottom of this file
   and fill it in. `label.en` and `label.ja` are required; other UI
   languages fall back to English when missing.

3. Append the new ID to `WORD_ORDER` in `word_manifest.js`. Place it in
   the position you want it to appear in the word selector.

4. Bump `WM_ASSET_VERSION.words` in `wordmap.html` so browsers reload
   the new file.

5. Run the validator:

   ```bash
   node validate_wordmap_data.js
   ```

### Adding a new language (rare)

1. Add the language entry to `wordmap_data.js` (name, native, lat/lng).
2. Add localized names to `lang_names.js`.
3. Optionally add metadata (`family`, `speakers`, sources, description)
   in `wordmap_meta.js`.
4. Regenerate the language reference table:

   ```bash
   node tools/generate_lang_codes_md.mjs
   ```

5. Run the validator. It will fail if you forgot the regeneration.

## File format reference

### Simple translation (tuple)

```js
ja: ['水', 'mizu'],
```

Two-element array: `[surface form, IPA]`. IPA can be empty (`''`) if you
don't have it.

### Translation with alternative scripts (object)

When a language uses more than one writing system, switch to the object
form:

```js
za: {
  form:   '淰',                    // primary form shown on the map
  ipa:    'rɐmˀ˧˥',
  alt: [
    { form: 'raemx',    script: 'Latin (Sawcuengh)',
      source: '1957/1982 official orthography' },
    { form: '𭜯 / 淋',  script: 'Sawndip (古壮字)',
      source: 'za.wikipedia.org Raemx' },
  ],
  source: { title: 'za.wikipedia.org', url: 'https://za.wikipedia.org/wiki/Raemx' },
},
```

- `form` and `ipa` describe what shows on the map.
- `alt` is an array of `{form, script, source}` entries — order is
  display order in modals.
- `source` (optional) cites where the primary form came from.

### IPA conventions

- Use IPA notation, not the language's native romanization.
- Tone diacritics belong inline (`ʂweɪ˧˩˧`, `nɨək˧˥`).
- **Never leave the IPA empty.** `tools/wordmap_check.js` counts an empty surface or IPA as a
  `GAP` and adds it to `actionable`, so an entry written that way fails the guard. If you have
  a surface and no pronunciation, either leave the language out of `data` altogether — these
  files are sparse and an absent key is the honest way to say "not sourced" — or, for a
  historical or fragmentary row where the absence is itself the finding, write `["—", "—"]`.
  (This line used to say the opposite. The data has always had zero empty-IPA cells, so nothing
  broke, but the doc and the guard were giving new entries contradictory advice.)

### Sources

Sources for an entire language belong in `wordmap_meta.js` under that
language's `meta.sources` array.

Sources for an individual word's surface form belong inline in the
object form's `.source` field (or `.alt[i].source` for alternate scripts).

## Skeleton for a new `words/<id>.js`

```js
/**
 * <id> — <one-sentence definition in English>
 *
 * New entries: see docs/words/CONTRIBUTING.md
 * Language codes: see docs/words/LANG_CODES.md
 */
WORDS.<id> = {
  label: {
    en: '<English label>',
    ja: '<Japanese label>',
    // …other UI languages as desired
  },
  definition: {
    en: '<English definition>',
    ja: '<Japanese definition>',
  },
  data: {
    // === East Asia ===
    ja: ['<form>', '<ipa>'],
    ko: ['<form>', '<ipa>'],
    // === Europe ===
    en: ['<form>', '<ipa>'],
    // …
  },
};
```

## Previewing your changes

Run the dev server from the repo root:

```bash
python3 server.py
```

Then open <http://localhost:8001/wordmap.html>. The word selector should
list your new concept (if any) and your new translations should render
on the map.

## Pull-request checklist

- [ ] `node validate_wordmap_data.js` passes
- [ ] If you added a language: `tools/generate_lang_codes_md.mjs` re-run
- [ ] If you added/renamed/reordered concepts: `WM_ASSET_VERSION.words`
      bumped in `wordmap.html`
- [ ] Commit message reads as: `Wordmap: add <X> for <Y>` or similar
