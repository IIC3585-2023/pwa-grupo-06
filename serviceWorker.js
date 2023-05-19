// Choose a cache name
const cacheName = 'cache-pwa';
// List the files to precache
const cacheResources = [
  '/', 
  '/index.html',
  '/offline.html',
  '/style.css',
  '/index.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event');
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(cacheResources))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch requested for:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Found in cache:', event.request.url)
          return cachedResponse;
        }
        return fetch(event.request)
          .then((fetchResponse) => {
            const responseCopy = fetchResponse.clone();
            caches.open(cacheName)
              .then((cache) => {
                cache.add(event.request, responseCopy);
              });
            return fetchResponse;
          })
          .catch(() => {
            // Fetch failed, respond with the offline page
            console.log('Offline:', event.request.url)
            return caches.match('/offline.html');
          });
      })
  );
});