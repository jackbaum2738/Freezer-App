// Intentionally does NOT cache anything. This exists only to satisfy the
// browser's "installable app" requirements (Add to Home Screen / install
// prompt). Every request is passed straight through to the network so that
// any update to index.html reaches everyone immediately, with no stale
// cached version and no need to reinstall the app.
self.addEventListener('install', function(event){
  self.skipWaiting();
});
self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(event){
  event.respondWith(fetch(event.request));
});
