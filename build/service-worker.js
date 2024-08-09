// service-worker.js

// Cache versioning
const CACHE_NAME = 'taskmaster-cache-v1';

// Skip waiting and activate the service worker immediately after installation
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Listen for push notifications and show them
self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/path/to/icon.png',
    badge: '/path/to/badge.png',
  });
});
