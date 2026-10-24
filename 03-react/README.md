# React

對應講義 React 基礎（`lokiTech-15day-09-react-basics`）與 React 進階（`lokiTech-15day-10-react-advanced`）。路由在 `04-react-router`。Vite + React，元件是 JavaScript（`.jsx`），不上 TypeScript。

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

`src/App.jsx` 用按鈕切換 `src/demos/` 裡的示範。流水號跟著講義出現的順序。多步示範的完成檔是同名 `.final`，日常開發維持第一步。入口是 `index.html` 的 `#root`。
