import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([ // 使用 ESLint 9.39.1 的 Flat Config API 定義設定
  globalIgnores(['dist']),// 全域忽略設定：告訴 ESLint 不要檢查 dist 資料夾
  {
    files: ['**/*.{js,jsx}'],// 指定此組規則適用的檔案類型（所有 js / jsx 檔）
    extends: [// 繼承既有的推薦規則集合
      js.configs.recommended,// ESLint 官方推薦的 JavaScript 規則
      reactHooks.configs.flat.recommended,// React Hooks 的推薦規則（避免錯誤使用 Hooks）
      reactRefresh.configs.vite,// React Refresh（Vite / Fast Refresh）相關規則
    ],
    languageOptions: {// 語言與執行環境相關設定
      ecmaVersion: 2020,// 指定 ECMAScript 語法版本（支援到 ES2020）
      globals: globals.browser,// 定義全域變數來源（瀏覽器環境，如 window、document）
      parserOptions: {// Parser 的進階設定
        ecmaVersion: 'latest',// 使用最新的 ECMAScript 語法
        ecmaFeatures: { jsx: true },// 啟用 JSX 語法支援（React）
        sourceType: 'module',// 使用 ES Module（import / export）
      },
    },
    rules: {// 自訂規則設定
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],// 禁止未使用的變數，但允許以大寫或底線開頭的變數（例如常數或 enum）
      semi: ['error', 'always'], // 強制要求使用分號結尾
      'no-extra-semi': 'error', // 禁止多餘的分號
    },
  },


]);
