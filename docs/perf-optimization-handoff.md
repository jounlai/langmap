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

## 0b. Brotli on nginx — ✅ DONE 2026-09-22 (dynamic + pre-compressed)

The owner asked whether the comments in the shipped source are wasted bytes.
They are not free, but they are also not the first thing to fix, and they
must not be deleted from the source — this repo's comments carry the reasons
for decisions and are read constantly.

### What the server does today

`server: nginx/1.24.0 (Ubuntu)`, so **`.htaccess` in this repo is dead**. The
SEO rewrites work because nginx does them; the file is documentation of
intent, nothing more. Do not edit it expecting an effect.

gzip is on and is at about level 6 — the bytes on the wire match a local
`gzip -6` to within 0.3%, and `gzip -9` would buy 0.7%, which is not worth a
config change. Brotli is **not** enabled: a request with `Accept-Encoding: br`
alone comes back **uncompressed**, all 825,879 bytes of it.

```
                    served    gzip-6    br 5      br 11
wordmap.html        246,875   246,534   221,863   191,214
wordmap_data.js     179,382   179,822   165,291   141,966
word_labels.js      171,229   171,333   155,635   132,847
```

A first visit to the word map is ~695 KB gzipped across 13 files.

### Install

Ubuntu 24.04 (noble) ships the module in universe, built against this exact
nginx. No compiling, no PPA.

```sh
sudo apt update
sudo apt install libnginx-mod-http-brotli-filter libnginx-mod-http-brotli-static
ls /etc/nginx/modules-enabled/ | grep -i brotli     # the packages wire load_module themselves
```

### Config

In the `http { }` block (`/etc/nginx/nginx.conf`), beside the existing gzip
settings. **Leave gzip on** — it is the fallback for anything that does not
send `br`.

```nginx
brotli              on;
brotli_comp_level   5;
brotli_min_length   1024;
brotli_static       on;   # serves a pre-built .br when one exists; see below
brotli_types        text/css
                    application/javascript
                    text/javascript
                    application/json
                    application/geo+json
                    application/manifest+json
                    image/svg+xml
                    application/xml
                    text/xml;
```

`text/html` is deliberately absent: nginx always compresses it and warns
about a duplicate if you list it. `brotli_comp_level 5` is the working point
— level 11 is for files compressed ahead of time, not per request (1.2 s of
CPU for wordmap.html against 22 ms at level 5).

```sh
sudo nginx -t && sudo systemctl reload nginx
```

### Verify

```sh
curl -sI -H 'Accept-Encoding: br' https://langmaps.com/wordmap.html | grep -i 'content-encoding\|content-length'
curl -s  -H 'Accept-Encoding: br' -o /dev/null -w '%{size_download}\n' https://langmaps.com/wordmap_data.js
```

Expect `content-encoding: br` and roughly 222 KB / 165 KB. Also re-check a
client that sends only gzip still gets gzip, and that `/ja/word/water` and
`/en/wordmap/ja` still return 200.

### Result — applied and verified on the live site

`libnginx-mod-http-brotli-filter` + `-static` installed from universe, the
block above added to `http { }`, reloaded. Then the pre-compressed files
landed and `brotli_static` took over for the seven biggest.

| | gzip (before) | dynamic br5 | **static br11 (now)** |
|---|---|---|---|
| wordmap.html | 246,875 | 221,863 | **191,214** |
| hanmap.html | 235,512 | 213,482 | **184,156** |
| wordmap_data.js | 179,382 | 165,291 | **141,966** |
| word_labels.js | 171,229 | 155,635 | **132,847** |
| wordmap_meta_lite.js | 217,071 | 179,145 | **156,085** |
| lang-filter.js | 37,981 | 35,759 | **31,502** |
| my-languages.js | 34,997 | 33,863 | **29,820** |

**A first visit to the word map: 698 KB → 556 KB, −20%.** The PHP-rendered
SEO pages gained most of all, because they are mostly repeated markup:
`/ja/word/water` 379,833 raw → **41,706**, `/en/wordmap/ja` 574,190 →
**63,910**.

Compatibility checked, not assumed: a client sending only `gzip` still gets
246,875; a client advertising nothing still gets 825,879 uncompressed; and
`/ja/`, `/ja/word/`, `/ja/word/chocolate`, `/en/wordmap/`, `/en/wordmap/ja`,
`/ja/hanmap/ja`, `/en/hanmap/ko`, `/sitemap-seo.xml` all still return 200.

One side effect: the `.br` files sit on disk under their own names, so
`/wordmap.html.br` is fetchable and returns 191 KB of
`application/octet-stream` with no `Content-Encoding` — a binary duplicate
of a real page. `robots.txt` now carries `Disallow: /*.br$`. The stronger
fix is on the server and is **not yet applied**:

```nginx
location ~ \.br$ { return 404; }
```

It cannot affect `brotli_static`, because a request for `wordmap.html` never
carries `.br` in its URI, so the regex location is never the one that
matches.

### Pre-compressed .br — how it works here

`tools/build_br.js` writes quality-11 siblings for the seven files above,
selected by "quality 11 beats quality 5 by at least ~4 KB". It **must run
after `bump_versions.js`**, which rewrites `?v=` inside wordmap.html and
hanmap.html. Full rebuild ~6 s; incremental is instant.

The files are **committed**. Deployment is a bare `git pull`, so the repo is
what the server serves, and nginx serves `<file>.br` without checking that
it is newer than `<file>` — a forgotten regeneration would serve the
previous page to every brotli client, silently, with every other guard
green. Generating on the server would move the forgetting somewhere nobody
can check.

`check_all`'s **`pre-compressed .br freshness`** guard decompresses each one
and compares the bytes to the source, so a stale *or truncated* `.br` cannot
be committed. A lock keyed on the source hash could not catch the truncated
case, because the source would still match. Verified both directions:
appending a byte to wordmap.html reports `stale: 1`, truncating
hanmap.html.br reports `stale: 2`, restoring reports `0`.

Cost: 867 KB of binary in the tree, rewritten whenever a source changes.
The `.git` directory was already 792 MB, and the alternative was a silent
staleness class the guards could not see.

### Originally deferred: pre-compressed .br (the other −12%)

`brotli_static on` is already in the config above and does nothing until
`.br` files exist next to the originals. Level 11 offline would take
wordmap.html to 191 KB and wordmap_data.js to 142 KB — another 12 points on
top of dynamic brotli, and zero CPU per request, which suits assets served
`immutable` behind `?v=`.

It is deferred because **deployment is a bare `git pull`** and nginx serves
`file.br` without checking that it is newer than `file`. A stale `.br` would
serve the previous version of the page to everyone, silently — the same
shape of bug as the `?v=1` freeze. Doing it properly needs a generator, a
`check_all` freshness guard in the style of the existing `?v=` locks, and a
decision about whether ~190 KB of binary churn per deploy belongs in git
history. Worth doing, but as its own piece of work.

### Not the answer: stripping comments

Removing every comment from the shipped files would save more than brotli —
85 KB gzipped off `wordmap.html`, 85 KB off `wordmap_data.js`, 283 KB across
the bundle, about 29%. Measured with a scanner that tracks strings, template
literals and regex literals, and checked by confirming `wordmap_data.js`
evaluates to identical data afterwards.

Do not do it in the source. The comments are where this project keeps its
reasoning, and they have paid for themselves repeatedly. If the saving is
wanted, it belongs in the same deploy-time step as the `.br` files, applied
to a copy — and it carries real risk, because 826 KB of hand-written inline
JavaScript has to survive the strip and there is no browser here to test in.

---

## 1. Background — what is already shipped (context)

Recent commits already did (all on `main`, `check_all` clean):

- **countries.geojson** self-hosted + Douglas-Peucker simplified (14.6 MB → 1.9 MB). Regen: `node tools/build_countries_geojson.js`.
- **wordmap_meta.js (19 MB) split** → `wordmap_meta_lite.js` (~1.1 MB, structured meta for all langs + base `META_I18N`) + `meta_desc/<code>.js` (per-language description+sources, loaded on popup). Regen: `node tools/build_meta_split.js`.
- **meta-i18n split per UI** → `meta_i18n_engine.js` (translateMetaSmart engine) + `meta_i18n/<ui>.js` (one fully-merged slice per UI). `meta_i18n_ext.js` + `meta_i18n_coverage{,2,3}.js` remain the GENERATION SOURCE. Same regen tool.
- **wordmap.html, tree.html, hanmap.html** rewired to load the lite/engine/per-UI files (current UI only; English loads no i18n). Verified byte-identical translation output to the old stack.
- **Auto cache-bump tooling:** `node tools/bump_versions.js` increments the `?v=` of every changed asset across both version systems (WM_ASSET_VERSION registry + literal per-page tags) and updates both locks. Guards: `tools/asset_version_check.js`, `tools/page_asset_version_check.js`, both run by `tools/check_all.js`.
- **gzip compression enabled (2026-08-23):** nginx configured with `gzip_types` for JS/CSS/JSON/GeoJSON. `data.js` 6.2 MB → 0.88 MB (86% reduction), `countries.geojson` 1.9 MB → 0.62 MB (67% reduction).
- **GeoJSON MIME type fixed (2026-08-23):** `/etc/nginx/mime.types` now maps `.geojson` → `application/geo+json`.

**Still eager / unsplit (this handoff):** `index.html` ships `data.js` (6.2 MB raw, 0.88 MB gzipped) and every page ships the whole `lang_names.js` (656 KB, all 19 UIs); `namemap.html` ships `namemap_content_i18n.js` (584 KB, all UIs).

---

## 2. Task 1 (P0) — Enable gzip/brotli on the server ★ highest leverage ✅ DONE

**~~Confirmed 2026-08-23:~~ FIXED 2026-08-23:** nginx gzip enabled. Actual results: `data.js` 6.2 MB → 0.88 MB, `countries.geojson` 1.9 MB → 0.62 MB.

**Original issue:** `curl -sI -H 'Accept-Encoding: gzip, br' https://langmap.heuron.com/data.js` returns `content-length: 6497271` and **no `content-encoding`** header. Every `.js`/`.css`/`.json`/`.geojson` is sent raw.

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

## 3. Task 2 (P1) — Fix countries.geojson MIME type ✅ DONE

**FIXED 2026-08-23:** Added `application/geo+json geojson;` to `/etc/nginx/mime.types`. Now serves `content-type: application/geo+json`.

~~Production serves `countries.geojson` as `content-type: application/octet-stream`. Serve it as `application/geo+json` (or `application/json`). Add the mapping in the server/CDN config (e.g. nginx `types { application/geo+json geojson; }`). Low risk; improves correctness and lets the compression rule in §2 match it.~~

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

## 5. Task 4 (P3, code) — Split `namemap_content_i18n.js` per UI — **DONE 2026-08-27**

> Shipped as `tools/build_namemap_i18n.js` → `namemap_i18n/<ui>.js`, loaded through `namemap_i18n_shim.js` (`__nmI18nBoot()` during parse, `__ensureNmI18n(ui)` on a language switch). 216 KB gz → 14 KB, and 1 KB for an English reader since English is the source text and has no slice. Parity proven by §6 across 17 UIs and 4,012 field comparisons, zero differences. `namemap_content_i18n.js` stays in the repo as the source the generator reads; the page no longer loads it. Freshness is guarded in `tools/check_all.js`.

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
