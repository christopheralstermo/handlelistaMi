import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',

      devOptions: {
        enabled: true
      },

      manifest: {
        name: 'Handleliste',
        short_name: 'Handleliste',
        start_url: '/',
        display: 'standalone',
        background_color: '#eaf2f8',
        theme_color: '#eaf2f8',

        icons: [
          {
            src: '/android-chrome-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }


    })
  ]
})
