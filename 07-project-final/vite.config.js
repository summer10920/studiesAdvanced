import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
          if (id.includes('firebase')) return 'firebase';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react';
          return undefined;
        },
      },
    },
  },
});
