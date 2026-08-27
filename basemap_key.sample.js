/* basemap_key.sample.js — template for basemap_key.js.
 *
 * CARTO's raster basemaps now require a key; without one the tiles carry an
 * "API key required" watermark. Copy this file to `basemap_key.js`, paste the
 * key in, and upload it to the server. `basemap_key.js` is in .gitignore and
 * must NOT be committed.
 *
 * Be clear about what this does and does not buy. The browser fetches the
 * tiles, so the key is visible to every visitor in the network tab — keeping
 * it out of the repository keeps it off public GitHub, not out of the world.
 * The real control is CARTO's own domain restriction, if they offer one for
 * this key; ask them to limit it to langmap.heuron.com.
 *
 * If the file is missing the pages still work: CARTO_BASEMAP_KEY is undefined,
 * no ?key= is appended, and the only difference is the watermark. So a fresh
 * clone needs no setup.
 *
 * Free tier: 5,000,000 tile requests per calendar month across raster and
 * vector. The CARTO + OpenStreetMap attribution on the maps is the condition
 * for it — do not remove it.
 */
window.CARTO_BASEMAP_KEY = 'PASTE-YOUR-CARTO-KEY-HERE';
