// sw.js
const web_cache = 'web-app-cache-v1.0';
const filesToCache = [
  '/',
  'bulma.min.css',
  'style.css',
  '/img/app_icon.svg'
];

self.addEventListener('install',(event)=> {
  event.waitUntil(
    caches.open(web_cache)
      .then((cache)=> {
        //Cache has been opened successfully
        return cache.addAll(filesToCache);
      })
  );
});

