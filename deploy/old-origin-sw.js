/* old-origin-sw.js — the kill switch for langmap.heuron.com.
 *
 * Deploy this AS /sw.js on the OLD origin only, and make the old vhost serve
 * it for real (200) instead of 301'ing it. Never deploy it on langmaps.com.
 *
 * Why it is needed. The real sw.js is network-first for navigations and falls
 * back to its cache when the network fails. On the old origin the network now
 * answers with a 301 to langmaps.com, and a cross-origin redirect without CORS
 * makes the SW's fetch() REJECT — so every controlled visitor lands in the
 * catch branch and is served the old cached page. The redirect works perfectly
 * in curl and not at all in their browser.
 *
 * Why /sw.js must be excluded from the 301. Per spec, a redirect while
 * fetching a service-worker script fails the update, so the old worker can
 * never be replaced. Serving this file at 200 is the only way the old worker
 * ever goes away.
 *
 * Keep it in place for as long as the 301 stays — a returning visitor gets the
 * update check at most once every 24 h, and one who does not come back for
 * months still needs it waiting for them.
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        for (const k of await caches.keys()) {
            try { await caches.delete(k); } catch (_) {}
        }
        await self.registration.unregister();

        // Same-origin only: WindowClient.navigate() throws on a cross-origin
        // URL, so reload the page where it is. With the worker gone the
        // navigation reaches the network, and the network is the 301.
        const wins = await self.clients.matchAll({ type: 'window' });
        for (const c of wins) {
            try { c.navigate(c.url); } catch (_) {}
        }
    })());
});

/* No fetch handler on purpose: nothing is intercepted, so every request goes
 * to the network and gets the redirect. */
