# Tailwind

對應講義 [Tailwind：utilities、RWD、深色模式](https://summer10920.github.io)（`lokiTech-15day-04-tailwind`）。Vite + Tailwind CSS v4（`@tailwindcss/vite`），純 JavaScript，沒有 TypeScript。

`pages/` 裡每一份是該節的起點，不是完成版。依 HTML 註解裡的 TODO 自己補 class。品牌色、自訂斷點與版心寫在 `src/style.css`。手動深色只動 `src/dark-manual.css` 與 `src/dark-toggle.js`。

需要 Node.js 24 與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

終端機印出的 Local 網址用瀏覽器打開。存檔後畫面會更新。目錄頁是 `index.html`。

| 指令 | 做什麼 |
| --- | --- |
| `pnpm dev` | 開發伺服器 |
| `pnpm build` | 建置到 `dist/` |
| `pnpm preview` | 預覽建置結果 |

| 檔案 | 講義小節 |
| --- | --- |
| `pages/01-compare.html` | 原子化 utility 對比傳統 CSS |
| `pages/02-naming.html` | 命名煩惱 |
| `pages/03-size.html` | 檔案膨脹 |
| `pages/04-scan.html` | 只輸出用到的 |
| `pages/05-palette.html` | 預設色票與色階 |
| `pages/06-opacity.html` | 透明度 |
| `pages/07-paint.html` | 文字、背景與邊框 |
| `pages/08-theme.html` | 用 @theme 自訂品牌色 |
| `pages/09-dark-system.html` | 預設跟著系統 |
| `pages/10-dark-toggle.html` | 用 @custom-variant 改成手動切換 |
| `pages/11-button.html` | 按鈕 |
| `pages/12-card.html` | 卡片 |
| `pages/13-nav.html` | 導覽列 |
| `pages/14-form.html` | 表單欄位 |
| `pages/15-scale.html` | 間距、尺寸與字體 |
| `pages/16-layout.html` | Flex 與 Grid |
| `pages/17-states.html` | 狀態、group 與 transition |
| `pages/18-formula.html` | class 的四段 |
| `pages/19-mobile.html` | 手機優先 |
| `pages/20-breakpoints.html` | 斷點 sm、md、lg、xl、2xl |
| `pages/21-container.html` | container 與 mx-auto、px |
| `pages/22-custom-breakpoint.html` | 自訂斷點 |
| `pages/23-container-query.html` | 選讀：容器查詢 @container |
| `src/style.css` | `@import "tailwindcss"`、`@theme`、`@utility container` |
| `src/dark-manual.css` | `@custom-variant dark` |
| `src/dark-toggle.js` | 切換按鈕 |
| `vite.config.js` | Tailwind 插件與 `build.rollupOptions.input` |

`src/style.css` 以 `@import "tailwindcss"` 開頭。class 寫在 HTML 上。不要裝 Bootstrap，也不要另寫 `tailwind.config.js`。圖片用 [picsum.photos](https://picsum.photos/)，不要把圖檔放進倉庫。`node_modules/` 不要 commit。
