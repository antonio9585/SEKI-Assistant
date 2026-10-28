const CACHE_NAME = 'seki-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json'
];

// Install Event - Cache essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Fetch Event - Serve from cache if offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});