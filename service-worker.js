// service-worker.js - Enables offline functionality
const CACHE_NAME = ‘fanfic-library-v1’;
const urlsToCache = [
‘/’,
‘/index.html’,
‘/styles.css’,
‘/app.js’,
‘https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css’
];

// Install service worker
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

// Fetch from cache first, then network
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (response) {
return response;
}
return fetch(event.request);
})
);
});

// Update service worker
self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheName !== CACHE_NAME) {
return caches.delete(cacheName);
}
})
);
})
);
});
