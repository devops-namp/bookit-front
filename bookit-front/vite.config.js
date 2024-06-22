import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'VITE_BACKEND_BASE_URL': JSON.stringify(process.env.VITE_BACKEND_BASE_URL),
    'VITE_WEB_SOCKET_PORT': JSON.stringify(process.env.VITE_WEB_SOCKET_PORT),
  }
})
