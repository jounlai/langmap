# LangMap performance optimization — handoff for the production Claude

**Author:** dev-environment Claude (2026-08-23). **For:** a Claude running with access to the LangMap **production server / CDN** and the repo.
**Goal:** finish slimming the site for slow connections. **Top priority remains: the map/page must appear fast.**

---

## 0. Hard constraints (read first — non-negotiable)

1. **NO information degradation, ever.** The site owner is emphatic. Every language must keep its full description/sources; every UI language its full translations. Splitting/lazy-loading is fine; *dropping* content is not. Prove parity (recipe in §6) before committing anything that touches data.
2. **Verify before committing.** This repo has no browser here — the owner tests on a local server. For any code change, load a local static server, have the owner (or you, if you have a headless browser) confirm the affected UI still works, THEN commit.
3. **`wordmap_meta.js` and the `*_data.js` / `meta_i18n_*.js` files are SOURCES OF TRUTH; several shipped files are GENERATED from them.** After editing a source, regenerate + cache-bust (§5). A `check_all` drift guard catches a forgotten regen — trust it.
4. **Don't auto-merge to `main` beyond the owner's normal flow.** Commit per task; keep `check_all` clean at every commit.

---

## 1. Background — what is already shipped (context)

Recent commits already did (all on `main`, `check_all` clean):

- **countries.geojson** self-hosted + Douglas-Peucker simplified (14.6 MB → 1.9 MB). Regen: `node tools/build_countries_geojson.js`.
- **wordmap_meta.js (19 MB) split** → `wordmap_meta_lite.js` (~1.1 MB, structured meta for all langs + base `META_I18N`) + `meta_desc/<code>.js` (per-language description+sources, loaded on popup). Regen: `node tools/build_meta_split.js`.
- **meta-i18n split per UI** → `meta_i18n_engine.js` (translateMetaSmart engine) + `meta_i18n/<ui>.js` (one fully-merged slice per UI). `meta_i18n_ext.js` + `meta_i18n_coverage{,2,3}.js` remain the GENERATION SOURCE. Same regen tool.
- **wordmap.html, tree.html, hanmap.html** rewired to load the lite/engine/per-UI files (current UI only; English loads no i18n). Verified byte-identical translation output to the old stack.
- **Auto cache-bump tooling:** `node tools/bump_versions.js` increments the `?v=` of every changed asset across both version systems (WM_ASSET_VERSION registry + literal per-page tags) and updates both locks. Guards: `tools/asset_version_check.js`, `tools/page_asset_version_check.js`, both run by `tools/check_all.js`.

**Still eager / unsplit (this handoff):** the server does not compress; `index.html` ships `data.js` (6.2 MB) and every page ships the whole `lang_names.js` (656 KB, all 19 UIs); `namemap.html` ships `namemap_content_i18n.js` (584 KB, all UIs).

---

## 2. Task 1 (P0) — Enable gzip/brotli on the server ★ highest leverage

**Confirmed 2026-08-23:** production serves uncompressed. `curl -sI -H 'Accept-Encoding: gzip, br' https://langmap.heuron.com/data.js` returns `content-length: 6497271` and **no `content-encoding`** header. Every `.js`/`.css`/`.json`/`.geojson` is sent raw.

This one change beats all the code work below and touches no code or data:

| file | raw | gzip | brotli |
|---|---|---|---|
| data.js | 6.2 MB | ~0.9 MB | ~0.7 MB |
| wordmap_meta_lite.js | 1.1 MB | ~0.3 MB | — |
| countries.geojson | 1.9 MB | ~0.6 MB | — |

**Do:** enable compression for text types on the LangMap host. Determine the actual stack first (nginx / Apache / Caddy / Cloudflare / Netlify / S3+CloudFront / etc.) and apply the matching config. Cover at least: `text/html text/css application/javascript application/json` and `application/geo+json`.

- **nginx:** `gzip on; gzip_comp_level 6; gzip_min_length 1024; gzip_types text/css application/javascript application/json application/geo+json image/svg+xml; gzip_vary on;` — and if `ngx_brotli` is built: `brotli on; brotli_comp_level 6; brotli_types <same list>;`
- **Apache:** `AddOutputFilterByType DEFLATE text/css application/javascript application/json application/geo+json` (mod_deflate), or mod_brotli equivalent.
- **Caddy:** `encode zstd gzip` in the site block.
- **Cloudflare / CDN:** enable Brotli in the dashboard (Speed → Optimization); ensure the origin isn't sending `Cache-Control: no-transform`.
- **Static-only host that can't compress on the fly:** precompress at build time — write `data.js.gz` / `data.js.br` (and the other large text assets) next to the originals and configure the host to serve them with the right `Content-Encoding` (e.g. S3 objects with `Content-Encoding: gzip`, or nginx `gzip_static on;` + a `*.gz` for each asset). If you go this route, add a build step so the `.gz`/`.br` are regenerated whenever the source changes, or they will go stale.

**Verify:** `curl -sI -H 'Accept-Encoding: br' https://langmap.heuron.com/data.js | grep -i content-encoding` → expect `content-encoding: br` (or `gzip`), and a much smaller `content-length`. Confirm HTML, CSS, JSON all compress.

**Note:** existing `Cache-Control: public, immutable, max-age=31536000` is correct — the `?v=` busting (now automated, §5) is what makes that safe.

---

## 3. Task 2 (P1) — Fix countries.geojson MIME type

Production serves `countries.geojson` as `content-type: application/octet-stream`. Serve it as `application/geo+json` (or `application/json`). Add the mapping in the server/CDN config (e.g. nginx `types { application/geo+json geojson; }`). Low risk; improves correctness and lets the compression rule in §2 match it.

---

## 4. Task 3 (P2, code) — Per-UI `lang_names` on the 4 remaining pages

`index.html`, `tree.html`, `hanmap.html`, `namemap.html` still load the whole `lang_names.js` (656 KB = all 19 UI languages). `wordmap.html` already migrated to a per-UI shim; copy that pattern. **Still worth doing after gzip** (656 KB→~200 KB gzipped for ALL UIs vs ~15 KB gzipped for the one UI a visitor sees), but lower priority and it touches hand-edited render code — so verify in a browser per page.

**The shim (already in repo):** `lang_names_shim.js` exposes `window.LANG_NAMES` (lazy: `LANG_NAMES[ui][code]`), `window.__ensureLangNames(ui)` (loads `lang_names/<ui>.js`, falls back base→en), and `window.__langNamesVersion(v)`. Per-UI tables are generated by `tools/build_lang_names.js` into `lang_names/<ui>.js` (19 files already exist). See the working reference block in `wordmap.html` (search `lang_names_shim.js` — the shim tag, then `lang_names/en.js`, then a bootstrap IIFE that picks the UI from cookie/`navigator` and preloads it).

**Per page, replace** `<script src="lang_names.js?v=NNN"></script>` **with:** the shim tag + `lang_names/en.js` + a bootstrap that preloads the visitor's UI. **Critically, preload every table the page reads synchronously at first paint.** Check each page's name-lookup:
- `index.html` → `app.js` reads `LANG_NAMES[currentUILang] || LANG_NAMES.en`, then `names[code] || LANG_NAMES.en[code] || LANG_NAMES.ja[code] || code` (around app.js:45). So it needs **en + ja + currentUI** present before the first `render()`. Add `window.__ensureLangNames(currentUILang)` (a) at boot right after `currentUILang` is decided (app.js ~542, `currentUILang = detectUILang()`) and before the first render, and (b) inside the UI-language `change` handler (app.js ~634) — wrap `applyUILang()/render()` in `__ensureLangNames(currentUILang).then(...)`. Grep app.js for `LANG_NAMES` to confirm every table it dereferences is preloaded (currently en, ja, currentUI).
- `tree.html` → uses `familyDisplayName` etc.; find its name lookups + its UI `change` handler (near the `uiLangSelect`/`sel` change, ~line 430) and add `__ensureLangNames` before re-render (`buildAndRender`).
- `hanmap.html` → find its name lookup + UI change handler (~5430) and gate the repaint on `__ensureLangNames`.
- `namemap.html` → same; locate its UI-lang change path and name lookups first.

**Verify (per page, in a browser):** load the page in a non-English UI (e.g. `?ui=ko` or set the picker), confirm language names render localized (not English); switch UI live and confirm names update; check Network shows only `lang_names/<ui>.js` (+en, +ja for index) — not the 656 KB `lang_names.js`. If any name shows English when it shouldn't, a table wasn't preloaded — fix the preload list.

**Fallback safety:** the shim already falls back to en on a 404, so a missing slice degrades to English, never a crash — but that IS degradation, so make the preload list correct rather than relying on it.

Once all four pages are migrated, `lang_names.js` is no longer referenced by any page — leave the file in place (it is the source `tools/build_lang_names.js` reads).

---

## 5. Task 4 (P3, code) — Split `namemap_content_i18n.js` per UI

`namemap.html` eagerly loads `namemap_content_i18n.js` (584 KB) — an IIFE holding `{ 'Entity': { ko:…, zh:…, … } }` tables (country/language names + each name's origin/meaning) that it merges into `NM_LANGS` / `NAMES` for ALL 19 UIs. A visitor uses one. Lower priority than §2–§4 and the most entangled — do it only after the above, and only with browser verification.

**Approach:** write a generator (mirror `tools/build_meta_split.js`) that emits `namemap_i18n/<ui>.js` containing just that UI's slice of every table, plus keep the merge logic UI-parameterized. Load `namemap_i18n/<currentUI>.js` (skip for en if en is the source) and re-merge on UI switch. **Prove parity with §6 before shipping** — the merged `NM_LANGS`/`NAMES` for the current UI must be identical to the old all-UIs merge. Register the new dir in `tools/asset_version_check.js` (or rely on `page_asset_version_check.js` if loaded via literal tags) and bump.

---

## 6. No-degradation verification recipe (use for any data/i18n change)

Run the OLD file stack and the NEW file stack in a Node `vm`, then diff the user-visible output. Make `window` the global so the browser's `window.X`↔bare-`X` aliasing holds:

```js
const fs=require('fs'), vm=require('vm');
function stack(files){ const ctx={console}; vm.createContext(ctx);
  vm.runInContext('var window=this; this.window=this;', ctx);          // window === global, like a browser
  for(const f of files) vm.runInContext(fs.readFileSync(f,'utf8'), ctx, {filename:f});
  return ctx; }
// e.g. compare translateMetaSmart output, or the merged NAMES/LANG_NAMES tables,
// OLD vs NEW, over EVERY key. Assert zero differences before committing.
```

For the meta-i18n split this was proven identical across 12 UIs for all 3532 meta strings and all 1151 descriptions/sources. Hold the same bar for lang_names and namemap.

---

## 7. Guardrails & commit workflow

1. After any source edit that feeds a generated file, **regenerate**: `node tools/build_meta_split.js` (meta/i18n), `node tools/build_lang_names.js` (lang_names), `node tools/build_countries_geojson.js` (borders).
2. **Cache-bust automatically:** `node tools/bump_versions.js` (bumps every changed asset's `?v=` across both systems + updates both locks). No hand-editing of version numbers.
3. **Validate:** `node tools/check_all.js` must be **all green** before each commit (it runs the wordmap_data validator, both version guards, and ~30 others). A drift error means a regen or a bump was missed.
4. Commit per task with a clear message; keep the tree clean. Do not merge to `main` beyond the owner's normal flow.
5. **Server tasks (§2, §3) are separate from the repo** — they live in the host/CDN config, not in git. Document whatever you changed (which server, which directive) back to the owner.

**Priority order:** §2 (gzip) → §3 (MIME) → §4 (lang_names) → §5 (namemap). §2 alone delivers most of the remaining win; do it first even if you stop there.
