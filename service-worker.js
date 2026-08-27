// Intentionally does NOT cache anything and does NOT intercept any request.
// This exists only to satisfy Android's "installable app" criteria (which
// wants a registered service worker with a fetch listener present). iOS
// doesn't require this at all for Add to Home Screen.
//
// The fetch listener below deliberately never calls event.respondWith() —
// that means every request (including ones the browser makes internally,
// e.g. Safari's Share-sheet preview generation) is handled entirely
// natively, with zero involvement from this file. This also guarantees
// every update to index.html reaches everyone immediately, since nothing
// here can ever serve a stale cached response.
self.addEventListener('install', function(event){
  self.skipWaiting();
});
self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(event){
  // intentionally empty — no respondWith(), request passes through untouched
});

