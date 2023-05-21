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

// Initialize Firebase
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyA-toGx8coidWYspBsuKWdIJuZp-dM_Pbs",
  authDomain: "pwa-g6.firebaseapp.com",
  projectId: "pwa-g6",
  storageBucket: "pwa-g6.appspot.com",
  messagingSenderId: "144479401328",
  appId: "1:144479401328:web:020cf45f116d226d1e8bb5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event');
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(cacheResources))
      .then(() => {
        // Get the current registration token and save it to the database
        messaging.getToken({ vapidKey: 'BLHZLAWEW1kvTgiPvKIb5dkmYgZACiBMHyO1_0PeIvWuzN8lZKLFK9LM1Z8BUzSzCchwc73C0ur4b5nSilJok18' }).then((currentToken) => {
          if (currentToken) {
            console.log('Got registration token:', currentToken);
            // Save the token to your server or IndexedDB for future use
          } else {
            console.log('No registration token available.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving the token:', err);
        });
      })
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