var cacheName = "studystore-v1";
var cacheFiles = [
    "index.html",
    //"products.js",
    "images/English.png",
    "images/Math.jpg",
    "images/icon-32.png",
    "images/icon-512.png",
    "images/science.jpg",
    "images/history.jpg",
    "images/geography.jpg",
    "images/music1.jpg",
    "images/music2.jpg",
    "images/irishdancing.jpg",
    "images/art.jpg",
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[Service Worker] Caching all the files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function(e) {
    e.respondWith(        
        caches.match(e.request).then(function (cachedFile) {
            //return the file if it is in the cache
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                
                return cachedFile; 
            } else {//downlowd the file if it is not in the cache
                return fetch(e.request).then(function (response) {

                    return caches.open(cacheName).then(function (cache) {
                        //add the new file to the cache
                        cache.put(e.request, response.clone());

                        console.log("[Service Worker] Resource fetched and saved in the cache for:" + e.request.url);
                        
                        return response;
                    });
                });
            }
        })
    );
});
