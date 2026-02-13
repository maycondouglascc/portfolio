import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router-dom')) return 'router'
          if (id.includes('node_modules/lottie-react') || id.includes('node_modules/lottie-web')) {
            return 'lottie'
          }
          if (id.includes('node_modules/@microsoft/clarity')) return 'clarity'
          return undefined
        },
      },
    },
  },
})
