# React Router

對應講義 React Router（`lokiTech-15day-11-react-router`）。宣告式路由，從 `react-router` 引入，不上 TypeScript，不用 data router 的 loader／action。預設是 `BrowserRouter`。

需要 Node.js 24 與 pnpm。在這個資料夾：

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

起始版只有 `BrowserRouter`、版型骨架與首頁一條路由。各檔的 `.final` 是講義走完之後的完成狀態：`src/pages/*.jsx.final`、`src/components/SiteMenu.jsx.final`，以及巢狀星號的 `src/App.jsx.final`。`src/App.central.jsx.final` 是集中式星號路由。`vite.config.js.final` 與 `src/main.jsx.final` 是選讀的 GitHub Pages 寫法；`src/main.hash.jsx.final` 只拿來對照 HashRouter，不要取代 `src/main.jsx`。
