const CACHE_NAME = 'red-utility';
const baseURL = 'https://oceanofanythingofficial.github.io/Red-Utility'; // Base Url
const urlsToCache = [
    baseURL,
    `${baseURL}/`,
    // html files
    `${baseURL}/index.html`,
    `${baseURL}/404.html`,

    // css files
    `${baseURL}/css/404.css`,
    `${baseURL}/css/bootstrap.min.css`,
    `${baseURL}/css/style.css`,

    // js files
    `${baseURL}/js/script.js`,
    `${baseURL}/js/search.js`,
    `${baseURL}/js/contact.js`,
    `${baseURL}/js/lazyLoading.js`,
    `${baseURL}/js/onlineStatus.js`,
    `${baseURL}/js/vendors/bootstrap.min.js`,

    // images
    `${baseURL}/src/images/android-chrome-192x192.png`,
    `${baseURL}/src/images/android-chrome-512x512.png`,
    `${baseURL}/src/images/apple-touch-icon.png`,
    `${baseURL}/src/images/favicon-16x16.png`,
    `${baseURL}/src/images/favicon-32x32.png`,
    `${baseURL}/src/images/RedUtility.png`,
    `${baseURL}/src/images/favicon.ico`,
    `${baseURL}/src/images/logo.svg`,
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
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


