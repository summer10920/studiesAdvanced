# React Router

對應講義 React Router（`lokiTech-15day-11-react-router`）。

起點是 `03-react` 的成品：在倉庫根目錄把那個資料夾複製成 `04-react-router`，清掉 `node_modules` 與 `dist`，再 `pnpm install`，然後 `pnpm add react-router@8`。接著把 hash 選單改成 data mode：`createBrowserRouter`、`RouterProvider`、版型 `Outlet`，以及 `NavLink` 連到 `/demos/:slug`。不要回 `03-react` 加路由。

倉庫裡這份是改完的練習站。`src/demos/` 與 `src/demoRegistry.js` 承接自 `03-react`（每筆多了 `slug`）；`src/Menu.jsx` 由按鈕改成 `NavLink`；`src/App.jsx` 是路由表；外框在 `src/layouts/MainLayout.jsx`。86–92 是 loader／action／fetcher 等資料模式示範，路由表用固定路徑掛上。

React 19。資料模式：`createBrowserRouter` 從 `react-router` 引入，`RouterProvider` 從 `react-router/dom` 引入。`basename` 取自 Vite 的 `BASE_URL`。部署到 GitHub Pages 子路徑時再改 `vite.config.js` 的 `base`，並在建置後把 `dist/index.html` 複製成 `dist/404.html`。

```bash
pnpm install
pnpm build
```

回家作業的起始檔是 `homework.html`、`src/homework/main.jsx` 與 `src/homework/data.js`，用雜湊路由，開發伺服器啟動後打開 `/homework.html`。

`pnpm lint` 會報 `src/demos/52-lint.jsx` 與 `61-derive.jsx` 兩處，那是從 `03-react` 帶過來、講義刻意示範的寫法，不是錯誤。
