// =============================================
// MEGA PABRIK TYCOON - Service Worker
// Versi: 1.0.0
// =============================================

const CACHE_NAME = 'pabrik-tycoon-v1';
const OFFLINE_URL = '/index.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  // Google Fonts (akan di-cache saat pertama load)
  'https://fonts.googleapis.com/css2?family=Russo+One&family=Exo+2:wght@300;400;600;700;800&display=swap'
];

// =============================================
// INSTALL - cache semua asset
// =============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Pabrik Tycoon Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE.filter(url => !url.startsWith('http')));
    }).then(() => {
      console.log('[SW] Assets cached successfully!');
      return self.skipWaiting();
    })
  );
});

// =============================================
// ACTIVATE - bersihkan cache lama
// =============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// =============================================
// FETCH - serve dari cache, fallback ke network
// =============================================
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve dari cache
        return cachedResponse;
      }

      // Coba fetch dari network
      return fetch(event.request).then((networkResponse) => {
        // Cache response baru (hanya untuk resource lokal)
        if (networkResponse && networkResponse.status === 200) {
          const url = new URL(event.request.url);
          if (url.origin === self.location.origin || url.hostname.includes('fonts')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// =============================================
// BACKGROUND SYNC - sinkronisasi data game
// =============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-game-data') {
    console.log('[SW] Background sync: game data');
  }
});

// =============================================
// PUSH NOTIFICATIONS (untuk update game)
// =============================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Mega Pabrik Tycoon';
  const options = {
    body: data.body || 'Pabrikmu menunggu! Kembali bermain 🏭',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: { url: '/' },
    actions: [
      { action: 'open', title: 'Buka Game 🏭' },
      { action: 'close', title: 'Nanti Saja' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/'));
  }
});

console.log('[SW] Mega Pabrik Tycoon Service Worker loaded!');
