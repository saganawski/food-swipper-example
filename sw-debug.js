// Debug Service Worker with comprehensive logging
console.log('[PWA Debug SW] Service Worker loading...');
console.log('[PWA Debug SW] Current location:', self.location.href);
console.log('[PWA Debug SW] Registration scope:', self.registration?.scope);

// Log all events
self.addEventListener('install', (event) => {
  console.log('[PWA Debug SW] Install event triggered');
  console.log('[PWA Debug SW] Event details:', event);
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[PWA Debug SW] Activate event triggered');
  console.log('[PWA Debug SW] Registration scope:', self.registration.scope);
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  console.log('[PWA Debug SW] Fetch request:', url);
  
  // Log navigation requests specifically
  if (event.request.mode === 'navigate') {
    console.log('[PWA Debug SW] Navigation request detected:', url);
    console.log('[PWA Debug SW] Request mode:', event.request.mode);
    console.log('[PWA Debug SW] Request destination:', event.request.destination);
  }

  // Handle 404 errors for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.log('[PWA Debug SW] Navigation fetch failed, serving index.html');
        return fetch('/index.html');
      })
    );
  }
});

self.addEventListener('message', (event) => {
  console.log('[PWA Debug SW] Message received:', event.data);
});

console.log('[PWA Debug SW] Service Worker setup complete');