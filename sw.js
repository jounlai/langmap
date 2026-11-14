/* LangMap service worker — conservative, self-updating.
   Exists primarily to make the site installable (a fetch handler is required).
   Strategy: network-first for page navigations with a cache fallback so the
   last-seen page works offline; everything else passes straight through to the
   network so the existing ?v= cache-busting keeps versioned JS/data fresh.

   Self-healing: the browser re-fetches THIS file on its own (bypassing the SW),
   so bumping SHELL is the one lever that reaches a client already stuck on a
   stale cache. On activate we purge old caches AND reload every open tab, so a
   stuck visitor is pulled onto the fresh build with no manual cache-clear. */
const SHELL = 'langmap-shell-v3';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => e.waitUntil((async () => {
  // Drop every cache from an older SW version.
  const keys = await caches.keys();
  const stale = keys.filter((k) => k !== SHELL);
  await Promise.all(stale.map((k) => caches.delete(k)));
  await self.clients.claim();
  // Force every open tab to reload so a client that was serving a stale shell
  // lands on the current build immediately — no "clear your cache" needed.
  // Only when an older shell was actually replaced: a first-time visitor has
  // no cache at all, and reloading them threw away the page they had just
  // loaded a second earlier — PageSpeed scored it as an 8 s redirect and the
  // re-render as a 0.5 layout shift (2026-10-16).
  if (!stale.length) return;
  const wins = await self.clients.matchAll({ type: 'window' });
  for (const c of wins) { try { c.navigate(c.url); } catch (_) {} }
})()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // `fetch(req)` still consults the HTTP cache, so a page served with a
    // max-age comes back stale — and a stale page carries a stale
    // WM_ASSET_VERSION, so it asks for the OLD ?v= of every data file and the
    // site silently shows yesterday's data. Force a revalidation: "network-first"
    // has to mean the network.
    //
    // redirect: 'manual', because a navigation's own redirect mode is manual: a
    // response that fetch() had already FOLLOWED through a 301 is refused by the
    // browser as a network error, so every renamed-code URL (/en/wordmap/som ->
    // /so, /en/hanmap/zh_han -> /och, seo/lib.php SEO_RENAMED_CODES) opened as
    // "This site can't be reached" for anyone who had ever loaded one of the maps.
    // The opaque redirect goes back to the browser, which follows it like any 301.
    // Only a 200 is kept for offline use: an opaque redirect has no body, and a
    // 502 during a deploy must not replace the last good copy.
    const fresh = new Request(req.url, { cache: 'reload', credentials: 'same-origin', redirect: 'manual' });
    e.respondWith(
      fetch(fresh)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {}); } return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('/wordmap.html').then((r2) => r2 || caches.match('/'))))
    );
  }
  // non-navigation GETs: let the network (and ?v=) handle it.
});
