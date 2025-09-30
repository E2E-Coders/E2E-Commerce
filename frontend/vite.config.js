import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/E2E-Commerce/' : '/',
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'docs',               // gera build em frontend/docs
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  }
})
