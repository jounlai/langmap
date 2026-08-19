# LangMap OGP social cards

The five 1200×630 share cards (`ogp-index / ogp-wordmap / ogp-hanmap /
ogp-namemap / ogp-tree.png`, in the repo root) are **composites of a real map
screenshot + a branded overlay** — not synthetic art. They are English-primary
(the declared `og:locale` is `en_US`) with a small Japanese sub-line.

Layout: left ~half is a solid theme-tinted panel (logo, big English title,
small Japanese title, one-line English description, a stat pill, and real
example chips); the right bleeds into the actual map view for that page.
Each page has its own theme colour (index=teal, wordmap=amber, hanmap=vermilion,
namemap=purple, tree=green).

## Rebuild

The overlay lives in `ogp_template.html` (all five cards' text/colour/chips are
in its `CFG` object; `?p=<page>` selects one). It reads a cleaned map crop
`src2_<page>.png` from this folder.

1. **Capture** each map view with headless Chrome (serve the repo over http first),
   at `--window-size=1600,1000`:
   - index  → `index.html` (default sentence-alignment view)
   - wordmap→ `wordmap.html#w=tea&p=38,72,3`
   - hanmap → `hanmap.html` (character 一)
   - namemap→ `namemap.html#n=john&l=ja&s=110&c=50,14&z=4`
   - tree   → `tree.html`
2. **Crop** out the UI chrome (top nav, right map controls, credits, and the
   NameMap left info panel) with Pillow; for `tree`, paste the family list onto
   the right of a tinted 1200×630 canvas. (See the crop boxes used to make the
   current `src2_*.png`.)
3. **Render** `ogp_template.html?p=<page>` via headless Chrome at
   `--window-size=1200,630 --force-device-scale-factor=2` (→ 2400×1260), then
   downsample to 1200×630 with Pillow LANCZOS for crisp type. Save as
   `../../ogp-<page>.png`.

Keep the output ≤ ~1 MB (the current cards are 150–400 KB).

## Notes
- Fonts come from the render host (Noto/Yu Gothic/Meiryo for CJK, Charis SIL/
  Gentium for IPA in the chips). Verify no glyph renders as tofu (□).
- After deploying, re-scrape the cards in the Facebook Sharing Debugger / X Card
  Validator — social crawlers cache `og:image` by URL.
