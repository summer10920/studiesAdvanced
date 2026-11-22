# React

對應講義 React 基礎（`lokiTech-15day-09-react-basics`）與 React 進階（`lokiTech-15day-10-react-advanced`）。路由課把這個資料夾複製成 `04-react-router`，再在那一份安裝 `react-router`。Vite + React，元件是 JavaScript（`.jsx`），不上 TypeScript。

需要 Node.js 26 與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

| 指令           | 做什麼         |
| -------------- | -------------- |
| `pnpm dev`     | 開發伺服器     |
| `pnpm build`   | 建置到 `dist/` |
| `pnpm preview` | 預覽建置結果   |
| `pnpm lint`    | ESLint         |

左側目錄由 `src/Menu.jsx` 負責；示範清單在 `src/demoRegistry.js`（依講義章節分組，選讀會標「選讀」）；`src/App.jsx` 用網址 `#` 記住目前示範並掛上對應元件。每個示範檔在 `src/demos/`，編號跟著講義出現的順序。回家作業的起始檔在 `src/homework/`，也在目錄最後的「回家作業」。`pnpm lint` 會報 `52-lint` 與 `61-derive` 兩處，那是講義刻意示範的寫法，不是錯誤。入口是 `index.html` 的 `#root` 與 `src/main.jsx`。
