/* LangMap service worker — conservative.
   Exists primarily to make the site installable (a fetch handler is required).
   Strategy: network-first for page navigations with a cache fallback so the
   last-seen page works offline; everything else passes straight through to the
   network so the existing ?v= cache-busting keeps versioned JS/data fresh. */
const SHELL = 'langmap-shell-v2';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  // Purge caches from older SW versions so a client that installed a stale
  // shell can't keep serving it. (Bumping SHELL is also a byte change, which is
  // what makes the browser notice this SW and replace an outdated one.)
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k !== SHELL).map((k) => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // `fetch(req)` still consults the HTTP cache, so a page served with a
    // max-age (GitHub Pages sends 600s on HTML) comes back stale — and a stale
    // page carries a stale WM_ASSET_VERSION, so it asks for the OLD ?v= of
    // every data file and the site silently shows yesterday's data. Force a
    // revalidation: "network-first" has to mean the network.
    const fresh = new Request(req.url, { cache: 'reload', credentials: 'same-origin' });
    e.respondWith(
      fetch(fresh)
        .then((res) => { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {}); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('/wordmap.html').then((r2) => r2 || caches.match('/'))))
    );
  }
  // non-navigation GETs: let the network (and ?v=) handle it.
});
