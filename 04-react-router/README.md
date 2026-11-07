# React Router

對應講義 React Router（`lokiTech-15day-11-react-router`）。

起點是 `03-react` 的成品：在倉庫根目錄把那個資料夾複製成 `04-react-router`，清掉 `node_modules` 與 `dist`，再 `pnpm install`，然後才 `pnpm add react-router@8`，並在 `src/App.jsx` 用 `createBrowserRouter` 與 `RouterProvider` 接上路由器。`src/main.jsx` 維持直接渲染 `App`。後面的路由表、目錄、連結與參數都改這一份，不要回 `03-react` 加路由。

倉庫裡這份是完成的練習筆記網站。`src/examples/` 是從前一份 `src/demos/` 搬過來的示範元件，由 `src/data/catalog.js` 依主題列入目錄。入口是 `src/main.jsx`，路由表是 `src/App.jsx`，左側目錄與主區在 `src/layouts/MainLayout.jsx`，頁面在 `src/pages/`。

React 19。資料模式，從 `react-router` 引入。`basename` 是 `createBrowserRouter` 的第二個參數，值來自 Vite 的 `BASE_URL`（開發時預設是網站根目錄）。部署到 GitHub Pages 子路徑時再改 `vite.config.js` 的 `base`，並在建置後把 `dist/index.html` 複製成 `dist/404.html`。

```bash
pnpm install
pnpm build
```
