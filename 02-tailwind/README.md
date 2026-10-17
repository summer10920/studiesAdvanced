# Tailwind

對應講義 [Tailwind：utilities、RWD、深色模式](https://summer10920.github.io)（`lokiTech-15day-04-tailwind`）。Vite + Tailwind CSS v4（`@tailwindcss/vite`），純 JavaScript，沒有 TypeScript。

需要 Node.js 24 與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

終端機印出的 Local 網址用瀏覽器打開。存檔後畫面會更新。

| 指令 | 做什麼 |
| --- | --- |
| `pnpm dev` | 開發伺服器 |
| `pnpm build` | 建置到 `dist/` |
| `pnpm preview` | 預覽建置結果 |

`src/style.css` 只有 `@import "tailwindcss"`。`index.html` 是空的起點，class 直接寫在標籤上。不要裝 Bootstrap 或其他 UI 套件。`node_modules/` 不要 commit。
