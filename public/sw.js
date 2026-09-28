// UPSSSC PET MASTER - Progressive Web App Service Worker (Network-First Strategy)
const CACHE_NAME = 'upsssc-pet-master-v5';

const CORE_ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.webmanifest'
];

// Install: Cache core shell and immediately activate
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Core caching notice:', err);
      });
    })
  );
});

// Activate: Purge ALL obsolete caches from any previous version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache store:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: NETWORK-FIRST strategy to guarantee fresh updates on online visits
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Only handle http and https requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses for offline use
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Offline fallback from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If HTML document request and offline, fallback to cached index.html
          if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html') || caches.match('./');
          }
        });
      })
  );
});
