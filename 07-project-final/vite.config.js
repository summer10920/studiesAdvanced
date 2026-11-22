import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/(?:react|react-dom|react-router)\//,
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
