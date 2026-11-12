import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/(?:react-dom|react-router|\/react\/)/,
              name: 'react',
            },
            {
              test: /node_modules\/(?:@mui|@emotion)/,
              name: 'mui',
            },
            {
              test: /node_modules\/firebase/,
              name: 'firebase',
            },
          ],
        },
      },
    },
  },
});
