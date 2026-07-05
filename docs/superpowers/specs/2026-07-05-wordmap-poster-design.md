# WordMap Poster Mode — Print/Share Static Map

**Date:** 2026-07-05
**Author:** Jounlai Cho + Claude
**Status:** design (approved for spec review)

## Problem

The live WordMap (`wordmap.html`) is a zoomable Leaflet map that labels
each language at its point coordinate, with names, IPA, and dialect
granularity. It is built for exploration, not for printing or sharing a
clean single-glance image. There is no output that reads as a poster:
one word, one language per country, characters only, laid out cleanly
inside each country.

## Goals

A new **dedicated page** that renders a single, fixed-scale world map as
a print/share-friendly poster for **one word** (`water` for the MVP):

1. **Characters only** — no language name, no IPA. For non-Latin
   scripts, show the native form with a small romanization underneath.
2. **One major language per country** — from a hand-curated table.
3. **New romanization** authored specifically for this feature.
4. **Text fits inside its country** at the country's interior, never
   overflowing the border; font size scales with country size but is
   **capped**; text may be **rotated** to fit narrow/tilted countries.
5. Very small countries / islands may spill onto sea or neighbors
   **only when nothing else is there** — *deferred to v2*.
6. **Adjacent countries get different colors.**
7. **No zoom, no pan, no 3D** — one fixed rendering.

### Non-goals (MVP)

- Requirement 5 (external placement + collision avoidance for tiny
  countries) — deferred to v2. See "v2" below.
- Multiple words / word switching — MVP is `water` only.
- Editing the curation table in-app — it is authored as a data file.

## Approach

A **self-contained static SVG poster renderer** on a new page
`poster.html`, fully decoupled from the Leaflet map. Everything is
computed once at a single fixed scale, which is what makes the hard
requirements (in-polygon text fit, rotation, adjacency coloring)
tractable — there is no zoom level to recompute against.

Chosen over reusing the Leaflet map because in-polygon text fitting,
rotation, and print-quality export are all far cleaner in a
purpose-built SVG than in Leaflet's tile/marker coordinate system.

### Projection

**Natural Earth** (Šavrič polynomial approximation), inlined as a
closed-form forward transform `(lng, lat) → (x, y)`; no external
dependency. Chosen for low distortion and poster aesthetics. The whole
world is drawn into a fixed `viewBox` (Natural Earth aspect ≈ 2.06:1,
e.g. `1600 × 777`).

## Components

### 1. Country → language curation table — `poster_langs.js` (new)

Keyed by **ISO 3166-1 alpha-3** (robust against GeoJSON name variance):

```js
const POSTER_LANGS = {
  JPN: { code: 'ja' },
  CHN: { code: 'zh' },
  FRA: { code: 'fr' },
  PER: { code: 'es_pe' },   // explicit political/multilingual decisions
  // ...
};
```

`code` references an existing `LANG_DATA` entry (for family/lineage color
reuse if desired later). Politically sensitive and multilingual
countries are decided explicitly, one by one.

### 2. Romanization data — in `poster_langs.js` (new), MVP word = `water`

Per (country, word) native form + authored romanization, using the
per-script standard (Japanese = Hepburn, Mandarin = Pinyin with tone
marks, Korean = Revised Romanization, etc.):

```js
const POSTER_WORDS = {
  water: {
    JPN: { native: '水',   roman: 'mizu'  },
    CHN: { native: '水',   roman: 'shuǐ'  },
    FRA: { native: 'eau'                   },  // Latin script → no roman line
    // ...
  },
};
```

Latin-script languages omit `roman` (the native form is already Latin).
MVP authors only the `water` set. This is a data-generation task suited
to the existing 5-run cross-validation pipeline.

### 3. Geo preprocessing (runtime, computed once on page load)

Source polygons: the same country GeoJSON already used by wordmap
(`datasets/geo-countries`), fetched once. From it, compute:

- **Adjacency graph** — two countries are adjacent if their projected
  borders share a point within an epsilon (spatial-hash the border
  vertices). Then **greedy graph coloring** over a fixed **6-color
  palette** (the four-color theorem guarantees 4 suffice, but greedy is
  not minimal; 6 gives ample headroom so a valid coloring always
  exists), producing a stable color index per country → requirement 6.
- **Per-country label geometry:**
  - **Interior point** via *polylabel* (pole of inaccessibility) — the
    center of the largest inscribed circle; gives its radius too.
  - **Oriented bounding box** via min-area rectangle (or PCA on
    vertices) → major-axis **angle** (rotation) and box width/height.
  - These feed the text-fit step.

polylabel (~40 lines) and the min-area-rect are inlined; no runtime
dependency added.

### 4. SVG renderer

1. Draw every country polygon filled by its greedy-coloring palette
   index (6-color palette), with a thin neutral border.
2. For each country that has a curated language + word entry:
   - Anchor text at the polylabel interior point.
   - **Auto-fit font size** by binary search so the text's measured box
     fits inside the country's inscribed box (from step 3), **capped at
     a max** (e.g. 28px at poster scale) so huge countries don't get
     giant text.
   - **Rotate** the text to the major-axis angle when that yields a
     better fit (narrow/tilted countries like Chile).
   - **Non-Latin:** native form on top, romanization on a second line
     at ~55% size directly below, both inside the box.
   - **Overflow guard:** if even the minimum size won't fit, shrink
     past the "nice" minimum; if still impossible, omit the label
     (MVP — tiny countries handled properly in v2).
3. Serialize to a downloadable `.svg`; render to canvas at high DPI for
   a downloadable PNG.

### 5. Page & UI — `poster.html` (new dedicated page)

Minimal chrome: the poster canvas, a word indicator (`water`), and
**Download SVG / Download PNG** buttons. No map controls. Reachable by
direct URL; a link may be added from wordmap later.

## Data flow

```
POSTER_WORDS[word] + POSTER_LANGS      (which language per country)
        │
        ▼
  country GeoJSON ──► project (Natural Earth) ──► geo preprocessing
        │                                          (adjacency+coloring,
        │                                           polylabel, OBB angle)
        ▼
   SVG renderer: polygons (colored) + fitted, rotated text nodes
        │
        ▼
   Download SVG / high-DPI PNG
```

## Testing

- **Fit invariant:** for every rendered label, its measured bounding box
  (post-rotation) lies within its country's inscribed box — assert in a
  headless measurement pass; zero overflow.
- **Coloring invariant:** no two adjacent countries (per the computed
  adjacency graph) share a color index.
- **Font cap:** no label exceeds the max font size.
- **Visual spot-check:** render the `water` poster and eyeball shaped
  cases — Chile (rotation), Russia/Canada (size cap, not giant), Japan
  (native 水 + `mizu`), a Latin country (France, no roman line).

## v2 (deferred)

- Requirement 5: tiny-country / island labels placed **externally** on
  sea or over neighbors only when the target area is empty, with
  collision avoidance. The existing simulated-annealing label solver
  (`2026-05-31-sa-label-placement-design.md`) is prior art to adapt for
  this external-placement pass.
- Multiple words / in-page word switching.
- Optional bundled simplified TopoJSON to remove the runtime GeoJSON
  fetch (offline / faster load).

## Open decisions resolved

- Projection: **Natural Earth**.
- MVP word: **`water`**.
- Location: **dedicated page `poster.html`** (not a mode toggle).
- Language selection: **hand-curated `POSTER_LANGS` table**.
