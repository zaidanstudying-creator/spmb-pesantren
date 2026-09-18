import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@spmb/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@spmb/ui': path.resolve(__dirname, '../../packages/ui/src')
    }
  },
  server: {
    port: 5174,
    host: true
  }
});
