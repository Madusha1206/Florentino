import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    open: 'chrome',           // Automatically opens in Chrome
    host: true,               // Accessible on local network
    strictPort: true,         // Don't change port if 5173 is busy
  },

  // Proxy setup for backend (Very useful for your florentino-backend)
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
