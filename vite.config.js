import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/front_6th_chapter2-1/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'index': './index.html',
        'index.basic': './index.basic.html',
        'index.advanced': './index.advanced.html'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})
