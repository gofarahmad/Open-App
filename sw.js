
const CACHE_NAME = 'droidlaunch-v1.1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event - Caching the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use addAll with caution, if one fails the whole SW fails to install.
      // We'll wrap it to be more resilient.
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // For navigation requests, always try to serve index.html (SPA fallback)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('./index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if not in cache
        return null;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
