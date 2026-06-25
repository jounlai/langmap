/* LangMap service worker — conservative.
   Exists primarily to make the site installable (a fetch handler is required).
   Strategy: network-first for page navigations with a cache fallback so the
   last-seen page works offline; everything else passes straight through to the
   network so the existing ?v= cache-busting keeps versioned JS/data fresh. */
const SHELL = 'langmap-shell-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(req, copy)).catch(() => {}); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('/wordmap.html').then((r2) => r2 || caches.match('/'))))
    );
  }
  // non-navigation GETs: let the network (and ?v=) handle it.
});
