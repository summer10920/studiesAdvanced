# Tailwind

對應講義 [Tailwind：utilities、RWD、深色模式](https://summer10920.github.io)（`lokiTech-15day-04-tailwind`）。Vite + Tailwind CSS v4（`@tailwindcss/vite`），純 JavaScript，沒有 TypeScript。`pages/` 裡每一頁就是講義裡對應 demo 的完整檔案，每一頁都是獨立頁面，直接開啟就能看。每份講義結尾的回家作業，起始檔是 `pages/homework-04.html`。

需要 Node.js 26 與 pnpm。在這個資料夾：

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

- `pages/01-compare.html`：utility-first 是什麼
- `pages/02-naming.html`：屬性與值
- `pages/05-palette.html`：色階與透明度
- `pages/15-scale.html`：間距單位
- `pages/29-preflight.html`：選讀：Preflight 重置了什麼
- `pages/04-scan.html`：只輸出用到的 class
- `pages/30-play-cdn.html`：選讀：Play CDN
- `pages/11-button.html`：按鈕
- `pages/12-card.html`：卡片
- `pages/17-states.html`：hover、focus、active
- `pages/17b-group-peer.html`：選讀：group 與 peer
- `pages/09-dark-system.html`：跟著系統
- `pages/10-dark-toggle.html`：選讀：手動切換
- `pages/19-mobile.html`：手機優先
- `pages/20-breakpoints.html`：預設斷點
- `pages/27-max.html`：max-* 範圍變體
- `pages/22-custom-breakpoint.html`：用 @theme 自訂斷點
- `pages/16-layout.html`：卡片牆
- `pages/21-container.html`：版心與 max-w-*
- `pages/13-nav.html`：選讀：導覽列
- `pages/23-container-query.html`：未具名容器
- `pages/23b-container-named.html`：具名容器
- `pages/28-sidebar.html`：側欄實作
- `pages/08-theme.html`：品牌色
- `pages/08b-theme-spacing-font.html`：間距與字型
- `pages/24-apply.html`：@apply
- `pages/26-arbitrary.html`：任意值與 ! 覆寫
- `pages/26b-important.html`：任意值與 ! 覆寫
- `pages/25-layer.html`：選讀：@layer 與 @utility

`src/` 放各頁用到的樣式與腳本：`style.css`（`@import "tailwindcss"`、品牌色與間距字型）、`breakpoints.css`、`container.css`、`apply.css`、`layer.css`、`dark-manual.css` 與 `dark-toggle.js`。`vite.config.js` 會自動收集 `pages/*.html` 當作建置入口。

class 寫在 HTML 上。不要裝 Bootstrap，也不要另寫 `tailwind.config.js`。
