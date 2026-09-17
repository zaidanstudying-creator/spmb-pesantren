import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@spmb/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@spmb/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@spmb/portal': path.resolve(__dirname, '../portal/src'),
      '@spmb/admin': path.resolve(__dirname, '../admin/src')
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
