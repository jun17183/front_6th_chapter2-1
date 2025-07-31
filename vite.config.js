import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/front_6th_chapter2-1/',
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        basic: './index.basic.html',
        advanced: './index.advanced.html'
      },
      output: {
        // 확장자 자동 추가
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})