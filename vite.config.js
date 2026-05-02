import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend API for the dev proxy. Override with NOOD_DEV_API_PROXY=...
const API_TARGET = process.env.NOOD_DEV_API_PROXY || 'http://localhost:5050'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
