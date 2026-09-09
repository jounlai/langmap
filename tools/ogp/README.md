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

## Fonts the renderer needs

The card design assumes **Inter** (titles, sub-line, stat pill) and a **CJK-KR**
face (the Han Map chip `일 il`). Neither ships with a bare Linux box. Without
Inter the titles fall back to a lighter system sans and stop matching the
design; without a Korean face the Hangul chip renders as a tofu box. Install
both into `~/.fonts` and `fc-cache -f` before rendering:

- Inter 4.1 (`extras/otf/Inter-{Regular,Medium,SemiBold,Bold,ExtraBold,Black}.otf`)
- Noto Serif CJK KR (Regular + Bold)

Check with `fc-match 'serif:charset=ac00'` — it must not fall through to
DejaVu Serif.

A headless Chromium is enough; the Playwright cache
(`~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`) works:

```
chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=1 --allow-file-access-from-files \
  --window-size=1200,630 --screenshot=../../ogp-<page>.png \
  "file://$PWD/ogp_template.html?p=<page>"
```

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
   The tree page needs `?ui=ja` (the UI-language param is `ui`, not `l`) and a
   tall window — `--window-size=760,1220 --force-device-scale-factor=2` — so
   that 28 family rows fit above the footer. Scale the 2x capture to 0.625 of
   1x, crop 308x560 from (x=7, y=87), and paste at (822, 40) on a 1200x630
   canvas filled #e9f5ee. That reproduces the existing composition.
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
