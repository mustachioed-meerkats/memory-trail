var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/dist/bundle.js',
  '/login',
  '/api/stories/user/4'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// self.addEventListener('fetch', function(event) {
//   console.log(event.request.url);
//   // event.respondWith(
//   //   caches.match(event.request).then(function(response) {
//   //     console.log('getting a response', response == 'true');
//   //     return response || fetch(event.request);
//   //   })
//   // );
// });