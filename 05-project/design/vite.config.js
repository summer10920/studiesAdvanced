import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';

const pages = readdirSync('.')
  .filter((name) => name.endsWith('.html'))
  .sort();

export default defineConfig({
  plugins: [injectHTML({ replace: { undefined: 'false' } }), tailwindcss()],
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
