import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Brindisi - Guía de Cocteles',
        short_name: 'Brindisi',
        description: 'Tu guía completa para preparar cocteles deliciosos',
        theme_color: '#1a1a1a',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cocktail-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cocktail-data'
            }
          }
        ]
      }
    })
  ],
  // CRÍTICO PARA ELECTRON: Usar rutas relativas en lugar de absolutas
  base: './',
  build: {
    outDir: 'dist',
    // Generar sourcemaps solo en desarrollo
    sourcemap: false,
    // Optimización para archivos grandes
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Organizar mejor los archivos generados
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: true
  }
})