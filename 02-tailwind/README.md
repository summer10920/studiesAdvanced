# Tailwind

對應講義 [Tailwind：utilities、RWD、深色模式](https://summer10920.github.io)（`lokiTech-15day-04-tailwind`）。Vite + Tailwind CSS v4（`@tailwindcss/vite`），純 JavaScript，沒有 TypeScript。頁面不用寫 JavaScript，手動深色那一頁除外。

`pages/` 裡每一份是該節的起點，不是完成版。依 HTML 註解裡的 TODO 自己補 class。品牌色、自訂斷點與版心寫在 `src/style.css`。手動深色只動 `src/dark-manual.css` 與 `src/dark-toggle.js`。

選單只寫在 `partials/nav.html`。`index.html` 與每一份 `pages/*.html` 的 `body` 開頭各有一行 `<load>`，`vite-plugin-html-inject` 在開發與打包時把同一份選單嵌進去。這一行保持自閉合（`<load ... />`）。目錄頁的路徑是 `./partials/nav.html`，屬性是 `home="page"`。`pages/` 裡路徑是 `../partials/nav.html`，屬性是 `p01="page"` 到 `p23="page"`，號碼對到檔名。選單裡的 `{=$home}`、`{=$p01}` 會被換成 `page`，沒指定的換成 `false`，所以只有目前這一頁的連結帶 `aria-current="page"`。

選單是貼在上方的頂欄（`sticky top-0`）。同一批連結寫兩次：寬螢幕那份是 `nav`（`hidden md:flex`，橫排並換行），窄螢幕那份放在 `<details>` 與 `<summary>` 裡（`md:hidden`），沒有另寫腳本。關掉的 `details` 不會把桌面連結留在畫面上。目前頁用 `aria-[current=page]:`。深色用 `dark:`。內層用 `container`，左右留白用 `px-4` 與 `sm:px-6`。`@utility container` 仍是 `src/style.css` 的 TODO，補上之後這列會跟著收到版心。

`pages/13-nav.html` 要練的是那一頁自己的導覽（checkbox 與 `peer`），跟這份全站選單分開，兩份都留著。

需要 Node.js 24 與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

終端機印出的 Local 網址用瀏覽器打開。存檔後畫面會更新。目錄頁是 `index.html`，網址是 `/`。各節是 `/pages/檔名.html`。

| 指令 | 做什麼 |
| --- | --- |
| `pnpm dev` | 開發伺服器 |
| `pnpm build` | 建置到 `dist/` |
| `pnpm preview` | 預覽建置結果 |

| 檔案 | 講義小節 |
| --- | --- |
| `partials/nav.html` | 全站選單（各頁共用） |
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
| `vite.config.js` | HTML 嵌入、Tailwind 插件、自動收集 `pages/*.html` 入口 |

`src/style.css` 以 `@import "tailwindcss"` 開頭。class 寫在 HTML 上。不要裝 Bootstrap，也不要另寫 `tailwind.config.js`。圖片用 [picsum.photos](https://picsum.photos/)，不要把圖檔放進倉庫。`node_modules/` 不要 commit。
