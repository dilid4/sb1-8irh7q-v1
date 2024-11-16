import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@prisma/client'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});