# React

對應講義 [React 基礎](https://summer10920.github.io)（`lokiTech-15day-08-react-basics`）與 [React 進階](https://summer10920.github.io)（`lokiTech-15day-09-react-advanced`）。Vite + React，元件是 JavaScript（`.jsx`），不上 TypeScript。

需要 Node.js 24 與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

| 指令 | 做什麼 |
| --- | --- |
| `pnpm dev` | 開發伺服器 |
| `pnpm build` | 建置到 `dist/` |
| `pnpm preview` | 預覽建置結果 |
| `pnpm lint` | Oxlint |

入口是 `index.html` 的 `#root`，`src/main.jsx` 把 `App` 畫進去。`src/App.jsx` 目前只有標題，請依講義從這裡拆元件。`node_modules/` 不要 commit。
