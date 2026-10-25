# 洛奇旅行 · 靜態版型

這是教師用的 HTML + Tailwind 版型，先把五個畫面擺出來對版。之後再把同一套版面改成 React。沒有購物車，也沒有後端。

## 開啟

需要 Node.js 24 以上與 pnpm。在這個資料夾：

```bash
pnpm install
pnpm dev
```

瀏覽器開終端機印出的本機網址（`http://localhost:5173/`）。`pnpm build` 產出 `dist/`，`pnpm preview` 預覽建置結果。

## 頁面

| 檔案 | 畫面 |
| --- | --- |
| `index.html` | 首頁：Hero、精選行程、前往列表的 CTA |
| `tours.html` | 出團列表：place／days 篩選（示意）與 TourCard |
| `tour.html` | 出團詳情：title、place、days、price、image、intro；「我要報名」到 `booking.html?tourId=1` |
| `booking.html` | 報名：tourId（唯讀）、name、email、people |
| `admin.html` | 後台草稿（僅本機／設計稿）：行程表格與新增／編輯表單 |

`partials/header.html` 是 SiteHeader（`#site-header`、`#nav-toggle`）。`partials/footer.html` 是 SiteFooter，頁尾有後台連結。

視覺已 refinement。色票在 `src/style.css` 的 `@theme`（墨潮、海松、晨霧），顯示字 Noto Serif TC、內文 Noto Sans TC。圖片用 picsum 網址，沒有把圖檔放進倉庫。
