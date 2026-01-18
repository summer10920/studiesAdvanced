import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022', // 指定輸出目標
  },
  resolve: {
    alias: { // 路徑別名化，將完整路徑的一部分替換為別名
      '@assets': '/src/assets', // 指向資源目錄
    },
  },
});
