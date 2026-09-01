#!/usr/bin/env node
/*
 * build_seo_minimaps.js — static SVG locator maps for the SSR trivia pages.
 *
 * An article's "🌵 Zoom to the Kalahari" control is a real instruction on the
 * interactive map and was nothing but a link on the server-rendered page. The
 * reader is being told where something is and shown no map.
 *
 * A live map is the wrong fix here: the SSR pages are plain HTML with no
 * Leaflet, and pulling the whole app into an article to show one location
 * would cost megabytes. A raster tile service is worse — an API key we must
 * not ship, plus an external request on every article view.
 *
 * So: draw the map ourselves, once, at build time, from the countries.geojson
 * the site already self-hosts. Output is a plain <svg> per location, inlined
 * into the page by seo/trivia.php. No JavaScript, no network, no key, and it
 * is in the HTML source, so a crawler sees it too.
 *
 * There are only 57 distinct coordinates in the whole 70-article corpus, and
 * they are language-independent (only the caption is translated), so the whole
 * set is a few hundred KB.
 *
 *   node tools/build_seo_minimaps.js           write seo/minimaps/
 *   node tools/build_seo_minimaps.js --check   report staleness, exit 1
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'seo', 'minimaps');

const W = 720, H = 380;          // viewport, px, at the button's own zoom
const TILE = 256;                 // Leaflet's tile size — same scale as the app

/* ---- Web Mercator, matching Leaflet so a zoom in the data means the same
   thing here as it does on the interactive map. ---- */
const scale = z => TILE * Math.pow(2, z);
const projX = (lng, z) => (lng + 180) / 360 * scale(z);
const projY = (lat, z) => {
    const s = Math.sin(Math.max(-85.05112878, Math.min(85.05112878, lat)) * Math.PI / 180);
    return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale(z);
};

/* Douglas-Peucker, in projected pixels: the tolerance means the same visual
   thing at every zoom, so a world view is cheap and a city view stays sharp. */
function simplify(pts, tol) {
    if (pts.length < 3) return pts;
    const sq = tol * tol;
    const keep = new Uint8Array(pts.length);
    keep[0] = keep[pts.length - 1] = 1;
    const stack = [[0, pts.length - 1]];
    while (stack.length) {
        const [a, b] = stack.pop();
        let far = -1, best = sq;
        const [ax, ay] = pts[a], [bx, by] = pts[b];
        const dx = bx - ax, dy = by - ay, len = dx * dx + dy * dy;
        for (let i = a + 1; i < b; i++) {
            const [px, py] = pts[i];
            let t = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0;
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            const ex = ax + t * dx - px, ey = ay + t * dy - py;
            const d = ex * ex + ey * ey;
            if (d > best) { best = d; far = i; }
        }
        if (far > 0) { keep[far] = 1; stack.push([a, far], [far, b]); }
    }
    return pts.filter((_, i) => keep[i]);
}

/* Sutherland-Hodgman against the viewport, with a margin so a border that
   leaves and re-enters the frame does not gain a false edge along it. */
function clip(pts, x0, y0, x1, y1) {
    const inside = (p, e) => e === 0 ? p[0] >= x0 : e === 1 ? p[0] <= x1 : e === 2 ? p[1] >= y0 : p[1] <= y1;
    const cut = (a, b, e) => {
        const t = e === 0 ? (x0 - a[0]) / (b[0] - a[0]) : e === 1 ? (x1 - a[0]) / (b[0] - a[0])
                : e === 2 ? (y0 - a[1]) / (b[1] - a[1]) : (y1 - a[1]) / (b[1] - a[1]);
        return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
    };
    let out = pts;
    for (let e = 0; e < 4 && out.length; e++) {
        const inp = out; out = [];
        for (let i = 0; i < inp.length; i++) {
            const cur = inp[i], prv = inp[(i + inp.length - 1) % inp.length];
            const ci = inside(cur, e), pi = inside(prv, e);
            if (ci) { if (!pi) out.push(cut(prv, cur, e)); out.push(cur); }
            else if (pi) out.push(cut(prv, cur, e));
        }
    }
    return out;
}

const n1 = v => Math.round(v * 10) / 10;

function renderMap(geo, lat, lng, z) {
    const cx = projX(lng, z), cy = projY(lat, z);
    const x0 = cx - W / 2, y0 = cy - H / 2, x1 = cx + W / 2, y1 = cy + H / 2;
    // Longitudes of the frame, for the antimeridian shift below.
    const lngAt = x => x / scale(z) * 360 - 180;
    const shifts = [];
    if (lngAt(x0) < -180) shifts.push(-360);
    if (lngAt(x1) > 180) shifts.push(360);

    const paths = [];
    for (const f of geo.features) {
        if (!f.geometry) continue;
        const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
        for (const poly of polys) {
            for (const ring of poly) {
                for (const shift of [0, ...shifts]) {
                    // Cheap reject on the ring's lng/lat box before projecting.
                    let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
                    for (const [lo, la] of ring) {
                        const px = projX(lo + shift, z), py = projY(la, z);
                        if (px < mnx) mnx = px; if (px > mxx) mxx = px;
                        if (py < mny) mny = py; if (py > mxy) mxy = py;
                    }
                    if (mxx < x0 || mnx > x1 || mxy < y0 || mny > y1) continue;
                    // Islets smaller than a couple of pixels are noise at this
                    // zoom and cost real bytes — a world view is mostly them.
                    if (mxx - mnx < 2 && mxy - mny < 2) continue;
                    let pts = ring.map(([lo, la]) => [projX(lo + shift, z), projY(la, z)]);
                    pts = simplify(pts, 1.1);
                    pts = clip(pts, x0, y0, x1, y1);
                    if (pts.length < 3) continue;
                    paths.push('M' + pts.map(p => n1(p[0] - x0) + ' ' + n1(p[1] - y0)).join('L') + 'Z');
                }
            }
        }
    }
    const mx = n1(W / 2), my = n1(H / 2);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" class="trivia-minimap-svg">
<rect width="${W}" height="${H}" class="mm-sea"/>
<path class="mm-land" d="${paths.join('')}"/>
<g class="mm-pin"><circle cx="${mx}" cy="${my}" r="17" class="mm-halo"/><circle cx="${mx}" cy="${my}" r="5.5" class="mm-dot"/></g>
</svg>`;
}

/* Every distinct panto coordinate in the corpus. The label is translated per
   UI but the coordinates are not, so one file serves all 19 languages. */
function collectCoords() {
    const seen = new Map();
    for (const f of ['wordmap_trivia.js', 'hanmap_trivia.js']) {
        const c = vm.createContext({});
        vm.runInContext('var window=this;', c);
        vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), c, { filename: f });
        for (const a of vm.runInContext('window.TRIVIA_ARTICLES', c) || []) {
            for (const ui of Object.keys(a.body || {})) {
                for (const m of String(a.body[ui]).matchAll(/<button\b([^>]*)>/g)) {
                    const at = m[1];
                    const g = n => {
                        const r = at.match(new RegExp('\\b' + n + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
                        return r ? (r[2] || r[3] || r[4] || '') : '';
                    };
                    if (g('data-action') !== 'panto') continue;
                    const lat = g('data-lat'), lng = g('data-lng'), z = g('data-zoom') || '5';
                    if (!isFinite(+lat) || !isFinite(+lng)) continue;
                    seen.set(`${+lat},${+lng},${+z}`, [+lat, +lng, +z]);
                }
            }
        }
    }
    return [...seen.values()];
}

const key = (lat, lng, z) => `${lat}_${lng}_${z}`.replace(/\./g, 'p').replace(/-/g, 'm');

const check = process.argv.includes('--check');
const coords = collectCoords();
const geo = JSON.parse(fs.readFileSync(path.join(ROOT, 'countries.geojson'), 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

let written = 0, stale = 0, bytes = 0;
const wanted = new Set();
for (const [lat, lng, z] of coords) {
    const file = path.join(OUT, key(lat, lng, z) + '.svg');
    wanted.add(path.basename(file));
    const svg = renderMap(geo, lat, lng, z);
    bytes += svg.length;
    const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (cur === svg) continue;
    stale++;
    if (!check) { fs.writeFileSync(file, svg); written++; }
}
const orphans = fs.readdirSync(OUT).filter(f => f.endsWith('.svg') && !wanted.has(f));
if (!check) for (const f of orphans) fs.unlinkSync(path.join(OUT, f));

if (check) {
    console.log(`seo/minimaps: ${coords.length} locations, stale: ${stale + orphans.length}`);
    process.exitCode = (stale + orphans.length) ? 1 : 0;
} else {
    console.log(`seo/minimaps: ${coords.length} locations, ${written} written, ${orphans.length} removed, ${Math.round(bytes / 1024)} KB total`);
}
