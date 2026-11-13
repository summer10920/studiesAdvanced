# 洛奇旅行 · 設計稿

靜態設計稿，給對版型用。假資料在各功能的 `mock.data.js`。色票是嫩綠與陽光黃、大圓角、柔和陰影。

報名與後台儲存改的是這次開啟的記憶體，重整回到 `mock.data.js` 的種子。登入頁只畫畫面，不寫入狀態。沒有 Firebase。

執照字號不是真實立案。

## 開啟

需要 Node.js 26 以上與 pnpm。

```bash
pnpm install
pnpm build
```

`pnpm build` 會產出 `dist/`，並把 `dist/index.html` 複製成 `dist/404.html`。這份作業沒有啟動 dev server。

## 頁面

| 路徑 | 檔案 | 畫面 |
| --- | --- | --- |
| `/` | `pages/HomePage.jsx` | 輪播、地區與天數搜尋、熱門、六個主題、三則理由、四則評價 |
| `/tours` | `pages/ToursPage.jsx` | 篩選、排序、主題查詢參數、卡片、沒有結果 |
| `/tours/:id` | `pages/TourDetailPage.jsx` | 圖集、亮點、每日行程、費用、出發日。手機底部固定「立即報名」 |
| `/booking` | `pages/BookingPage.jsx` | 直接打開。姓名與 email 用範例預覽且唯讀，電話可填，小計跟著人數變 |
| `/booking/done` | `pages/BookingDonePage.jsx` | 剛送出的內容，狀態「待確認」。直接打開則是範例 |
| `/me` | `pages/MyBookingsPage.jsx` | 範例清單四筆。沒有取消 |
| `/about` | `pages/AboutPage.jsx` | 品牌短述、虛構字號與品保、六則 FAQ |
| `/login` | `pages/LoginPage.jsx` | 「用 Google 帳號繼續」的對話框。按鈕不寫入狀態 |
| `/admin/login` | `pages/AdminLoginPage.jsx` | email 與密碼欄位。送出不導頁 |
| `/admin` | `pages/AdminToursPage.jsx` | 行程表與編輯。直接打開 |
| `/admin/bookings` | `pages/AdminBookingsPage.jsx` | 報名清單，狀態用下拉，不依狀態篩選 |
| `*` | `pages/NotFoundPage.jsx` | 找不到頁 |

頁首頁尾在 `layouts/SiteLayout.jsx`。契約 id：`#site-header`、`#nav-toggle`、`#tour-list`、`#booking-form`。

「立即報名」直接到 `/booking?tourId=...&departureId=...`。頁尾有「後台登入」，模板頁尾沒有這條，方便打開後台稿。

## MUI 與 Tailwind

MUI 元件只在 `src/theme.js` 調外觀（色、圓角、陰影、字級）。排版與間距用 Tailwind class，沒有用 `sx`。

`main.jsx` 用 `StyledEngineProvider enableCssLayer`。`src/index.css` 宣告：

```css
@layer theme, base, mui, components, utilities;
```

色票寫在 `src/theme.js` 的 `tokens`，啟動時寫進 `--loki-*`。Tailwind 的 `@theme` 讀這些變數。MUI palette 用同一組色碼（MUI 要能算對比，不能只吃 `var()`）。

| 色 | 變數 | 用途 |
| --- | --- | --- |
| `#3FB27F` | `--loki-primary` | 品牌嫩綠（裝飾、大色塊）。白字對比 2.66:1，不拿來當按鈕字 |
| `#2E8F63` | `--loki-hover` | 嫩綠的加深色 |
| `#1F6B4A` | `--loki-action` | 主按鈕、連結、選取。白字 6.44:1 |
| `#146845` | `--loki-actionHover` | 主按鈕 hover。白字 6.78:1 |
| `#FFC94A` | `--loki-accent` / `--loki-secondary` | 陽光黃：徽章、價格標籤、次要按鈕。墨藍字 9.31:1 |
| `#1F2A44` | `--loki-ink` | 文字、頁尾 |
| `#3A4350` | `--loki-muted` | 輔文 |
| `#FAF8F3` | `--loki-paper` | 暖白底 |
| `#FFFFFF` | `--loki-white` | 卡片 |
| `#E7F4EC` | `--loki-mist` | 淺綠區塊 |
| `#FFF6D6` | `--loki-foam` | 淺黃區塊、深底上的輔文 |
| `#E4E0D4` | `--loki-line` | 分隔線 |
| `#C23B4A` | `--loki-alert` | 刪除、已取消。白字 5.23:1 |

標題與價格：Noto Serif TC。介面、表單、表格：Noto Sans TC。

| 交給 MUI | 用在哪 |
| --- | --- |
| Button | 搜尋、報名、儲存、刪除、頁首登出 |
| TextField | 報名表、後台行程表 |
| Select | 地區、天數、價格、排序、人數、主題、報名狀態 |
| Chip | 地區／主題／天數、狀態、列表上的主題 |
| Card | 行程卡、理由、評價、手機版後台一筆一張 |
| Dialog | 登入提示、刪除確認 |
| Table | 後台桌機的行程表與報名表 |
| Snackbar + Alert | 儲存、刪除、改狀態；空結果與權限 |
| Stepper | 報名、報名完成 |
| Rating | 首頁評價（只讀） |
| Accordion | 每日行程、FAQ、手機篩選（一次開一組） |
| AppBar、Drawer、IconButton | 頁首、手機選單、輪播箭頭 |
| Typography、Paper | 標題、後台登入卡片 |

| 交給 Tailwind | 用在哪 |
| --- | --- |
| 版面 | `max-w-6xl`、欄數、頁首頁尾、區塊上下距 |
| 輪播 | 淡入（`opacity` + `transition`），沒有輪播套件 |
| 圖片 | 比例、圓角、滿版 |
| 手機固定列 | 詳情頁底部「立即報名」 |
| 頁尾 | 電話、地址、字號 |

輪播在首頁第一塊：`useState` 記目前張、`useEffect` 每 4.5 秒換一張，圓點與箭頭可點。系統若偏好減少動態，就不會自動播。

## 資料

| 檔案 | 內容 |
| --- | --- |
| `src/features/tours/mock.data.js` | 8 筆行程，以及地區、主題、天數、價格區間、排序 |
| `src/features/home/mock.data.js` | 4 則評價、三則理由、主題圖 |
| `src/features/booking/mock.data.js` | 後台 4 筆，以及「我的報名」範例 4 筆 |
| `src/features/about/mock.data.js` | 6 則 FAQ |

後台改行程時，表單沒有的每日行程、圖集、費用含／不含會原樣留著。
