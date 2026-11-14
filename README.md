# studiesAdvanced

洛奇 120 小時在職前端課的練習倉庫。講義在 [summer10920.github.io](https://summer10920.github.io)（搜尋「在職前端 15 天計畫」）。課程從 HTML、CSS、Tailwind、JavaScript 學到 React 與 React Router，最後做出一個多頁的旅行社網站；深度停在看得懂、改得動、講得出來，不教 TypeScript。

## 課程怎麼進行

講師不在課堂上現場打程式：每個範例都是這個倉庫裡一份完整、可直接執行的檔案，講師複製進 VS Code、執行後講解觀念。你可以自己讀、改、再執行，也可以請 AI 助手當家教。

講義分兩種內容：

- **主線**：基本觀念，加上結業專案用得到的內容。全部在 120 小時內講完。
- **選讀**：標題以「選讀：」開頭，上課不講，留給你回家自己讀。Tailwind 公式表（05）與 Firebase 篇（13）整篇都是選讀。

| 階段 | 時數 | 講義 | 內容 |
| --- | --- | --- | --- |
| 工具與 HTML | 8 | 01、02 | VS Code、Git 與 GitHub、語意標籤、表單、無障礙 |
| CSS | 12 | 03 | 選擇器、盒模型、Flex、Grid、響應式版面 |
| Tailwind | 8 | 04 | 工具類別、響應式、深色模式、自訂主題 |
| JavaScript | 28 | 06、07、08 | 語法與資料處理、DOM 與事件、fetch 與 async |
| React | 16 | 09、10 | 元件、狀態、列表、表單、effect、共用狀態 |
| React Router | 12 | 11 | 路由、版型、動態路由、loader、action |
| 結業專案 | 32 | 12 | 洛奇旅行網站：前台、後台，資料用記憶體裡的假資料 |
| 緩衝 | 4 | | |

時數是預估，會依進度挪動。

**回家作業**：02 到 11 每篇最後都有一章，不計分、課堂不講解。起始檔在各練習資料夾的 `homework/`（React 在 `src/homework/`），標準答案在倉庫根目錄的 `homework/`，依講義編號分資料夾、檔名與起始檔相同。先自己做，做完或卡住再對照。

**結業展示**：在本機打包並預覽網站，走完一次從選行程到報名的流程，再口頭說明一個元件的資料從哪裡來。畫面好不好看不單獨評量。

## 開始前準備

上課用的是教室提供的電腦，已初始化好，**結訓後會還原**，所以留在電腦上的檔案不會保留。作業和進度要 commit 並 push 到你自己的 GitHub fork（做法見最後一節），回家才拿得到。

你只需要一個 GitHub 帳號。VS Code、Chrome、Git 在講義 01 確認；Node.js 與 pnpm 到 04 Tailwind 才用得到，課堂上用 nvs 安裝 Node 26，再裝 pnpm，不用事先準備。

自己的電腦要重現環境時，照講義 01 與 04 的步驟安裝即可。

## 取得練習倉庫

你沒有老師倉庫的寫入權限，所以要先 fork，再 clone **你自己的**那一份。

1. 登入 GitHub，打開 [summer10920/studiesAdvanced](https://github.com/summer10920/studiesAdvanced)，按 **Fork**，並**取消勾選**「只複製預設分支」。老師為你這一期建立的班級分支（`fe/YYYMM`，YYY 是民國年、MM 是該年第幾期，例如 `fe/11601`）才會一起帶過去。
2. 進入你的 fork，按 **Code**，複製 HTTPS 網址。
3. 在本機 clone 班級分支：

```bash
git clone --branch fe/11601 https://github.com/你的帳號/studiesAdvanced.git
cd studiesAdvanced
```

`fe/11601` 只是範例，請換成老師公布的班級分支。不要 clone 老師的網址再 `git push`，會被拒絕。老師更新內容時，先在你的 fork 按 **Sync fork**，再在本機根目錄執行 `git pull`。

## VS Code 設定

用 VS Code 打開**這個根目錄**（`studiesAdvanced` 這一層，不要只開子資料夾）。根目錄的 `.vscode/` 與 `.prettierrc` 會自動套用存檔排版與占位圖片段，不用另外設定。

編輯器會依 `.vscode/extensions.json` 建議安裝套件：

- 必裝：Live Server、Prettier、Tailwind CSS IntelliSense、ES7+ React snippets、Git Graph、繁體中文語言包。
- 建議：ESLint、Path Intellisense、Image Preview、GitHub Copilot（免費方案）。

## 講義對到資料夾

| 講義 | 資料夾 | 怎麼跑 |
| --- | --- | --- |
| 01 工具 | 倉庫根目錄 | 完成 clone、安裝套件 |
| 02 HTML | `01-html-css-js/02-html/` | Live Server |
| 03 CSS | `01-html-css-js/03-css/` | Live Server |
| 04 Tailwind | `02-tailwind/` | `pnpm dev` |
| 06–08 JavaScript | `01-html-css-js/04-js/` | Live Server，結果看瀏覽器 Console |
| 09–10 React | `03-react/` | `pnpm dev` |
| 11 React Router | `04-react-router/` | `pnpm dev` |
| 12 結業專案 | `06-project-init/`（從空專案開始做）、`05-project-prototype/`（做完的樣子） | `pnpm dev` |
| 13 Firebase（選讀） | `07-project-final/`（接上 Firebase 的完成品） | `pnpm dev` |

05 Tailwind 公式表沒有練習資料夾，查講義即可。各資料夾裡的檔案就是講義 demo 的完整檔案，複製貼上就能執行，資料夾的 `README.md` 有對照表。

**Live Server 資料夾**：在檔案總管對目標檔案按右鍵，選 **Open with Live Server**。`fetch` 讀本機 JSON 時不能直接雙擊開檔，一定要用 Live Server。

**pnpm 資料夾**（04 之後，需要 Node 26 與 pnpm）：進入資料夾後安裝並啟動。

```bash
cd 03-react
pnpm install
pnpm dev
```

`pnpm build` 產出 `dist/`，`pnpm preview` 預覽建置結果。`node_modules/` 與 `dist/` 不會進版控，刪掉後用 `pnpm install` 就裝得回來。

## Commit 你的進度

在倉庫根目錄操作。第一次 commit 前，先設定作者名稱（只要做一次）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的信箱@example.com"
```

一段練習做完：

```bash
git status
git add 01-html-css-js/02-html/homework
git commit -m "完成 HTML 報名表欄位"
git push
```

- 訊息寫這次做了哪一節，不要只寫 `update`。
- 只 `git add` 你改過的練習，不要加整個 `node_modules`。
- `git push` 推到你自己的 fork。
- 改壞了先 `git diff` 看差異，再決定要不要還原那個檔案。
