// Service Worker para PWA
const CACHE_NAME = 'brindisi-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/index.css'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache.filter(url => {
          // Filtrar solo URLs http/https
          return url.startsWith('/') || url.startsWith('http')
        }))
      })
      .catch(err => {
        console.log('Error al cachear:', err)
      })
  )
})

self.addEventListener('fetch', event => {
  // Solo cachear peticiones http/https
  if (!event.request.url.startsWith('http')) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
      })
      .catch(() => {
        return caches.match('/index.html')
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})