
const doCache = true;
const CACHE_NAME = 'my-pwa-cache-v2';
// eslint-disable-next-line no-restricted-globals
 self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                // eslint-disable-next-line array-callback-return
                Promise.all(keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Deleting cache: ' + key)
                        return caches.delete(key);
                    }
                }))
            )
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(event) {
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    // Получаем данные из манифеста (они кэшируются)
                    fetch('/static/reader/manifest.json')
                        .then(response => {
                            response.json()
                        })
                        .then(assets => {
                            // Открываем и кэшируем нужные страницы и файлы
                            const urlsToCache = ['./src/App.tsx','/favicon.ico']
                            cache.addAll(urlsToCache)
                        })
                })
        );
    }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', function(event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
