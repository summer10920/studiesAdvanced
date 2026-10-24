# studiesAdvanced

洛奇 120 小時在職前端入門課的練習倉庫。講義在 [https://summer10920.github.io](https://summer10920.github.io)（搜尋「在職前端 15 天計畫」）。這個倉庫在第一天 fork 之後，整學期的練習都寫在這裡。

技術棧停在看得懂、改得動：HTML、CSS、Tailwind CSS v4、JavaScript、React。不上 TypeScript。Node.js 用 **24**，套件管理只用 **pnpm**。

## Fork 與 clone

你沒有老師倉庫的寫入權限。先 fork [summer10920/studiesAdvanced](https://github.com/summer10920/studiesAdvanced)，再 clone **你自己的**那一份。

1. 登入 GitHub，打開老師倉庫，確認分支是 `new-tech`，按 **Fork**。
2. 進入你的 fork，按 **Code**，複製 HTTPS 網址。
3. 在本機：

```bash
git clone --branch new-tech https://github.com/你的帳號/studiesAdvanced.git
cd studiesAdvanced
```

不要 clone 老師的網址再 `git push`，會被拒絕。老師有更新時，先在 GitHub 你的 fork 按 **Sync fork**，再回到這個根目錄 `git pull`。

## 建議的 VS Code 套件

用 VS Code 打開**這個根目錄**（`studiesAdvanced` 這一層，不要只開子資料夾）。根目錄的 `.vscode/settings.json`、`.vscode/placeholder.code-snippets` 與 `.prettierrc` 會自動套用：存檔排版、占位圖片段都不用再抄到個人設定。

編輯器會讀 `.vscode/extensions.json` 並建議安裝。

**必裝：** Live Server、Prettier、Tailwind CSS IntelliSense、ES7+ React snippets、Git Graph、繁體中文語言包。

**建議：** ESLint、Path Intellisense、Image Preview、GitHub Copilot（免費方案）。

## 講義對到資料夾

| 講義 | 主題 | 資料夾 | 怎麼跑 |
| --- | --- | --- | --- |
| 00 計畫 | 課表與專題契約 | （沒有練習資料夾，讀講義即可） | — |
| 01 工具 | VS Code、Git、fork | 倉庫根目錄 | 裝套件、完成 clone |
| 02 HTML | 語意標籤、表單、無障礙 | `01-html-css-js/02-html/` | Live Server |
| 03 CSS | 選擇器、盒模型、Flex、Grid、RWD | `01-html-css-js/03-css/` | Live Server |
| 04 Tailwind | utilities、RWD、深色模式 | `02-tailwind/` | `pnpm dev` |
| 05 Tailwind 公式表 | class 對照 | （沒有練習資料夾，查講義即可） | — |
| 06 JavaScript 基礎 | 變數、函式、陣列、模組 | `01-html-css-js/04-js/` | Live Server |
| 07 DOM | 選取元素與事件 | （稍後加入） | — |
| 08 非同步 | fetch、async | （稍後加入） | — |
| 09 React 基礎 | 元件、props、state、列表與表單 | `03-react/` | `pnpm dev` |
| 10 React 進階 | effect、共用狀態 | `03-react/` | `pnpm dev` |
| 11 React Router | 路由、選單、參數 | `04-react-router/` | `pnpm dev` |
| 12 結業專案 | 洛奇旅行 | `05-project/` | 規格之後才補進該資料夾 |

`02-html`、`03-css` 與 `04-js` 裡每個子資料夾都是該節的**起點**（結構、占位內容、中文 TODO），不是講義上的完成版。各資料夾的 `README.md` 有對照表。

### 各資料夾怎麼跑

**HTML／CSS／JavaScript 基礎。** 不需要 Node。VS Code 維持開著倉庫根目錄，在檔案總管對目標的 `index.html` 右鍵 **Open with Live Server**。JavaScript 那一組的結果在瀏覽器 Console。圖片使用 picsum 與 placehold 的網址。

**Tailwind 與 React。** 需要 Node 24 與 pnpm。還沒有 pnpm 時，在終端機執行 `corepack enable`，然後開一個新終端機。

```bash
cd 02-tailwind   # 或 03-react、04-react-router
pnpm install
pnpm dev
cd ..            # 回到倉庫根目錄
```

`pnpm build` 產出 `dist/`，`pnpm preview` 預覽建置結果。`node_modules/` 與 `dist/` 已在 `.gitignore`，刪掉之後用 `pnpm install` 裝得回來。

## Commit 你的進度

在**倉庫根目錄**操作。第一次 commit 前，這台電腦要先有作者名稱（只要做一次）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的信箱@example.com"
```

一段練習做完：

```bash
git status
git add 01-html-css/02-html/10-form
git commit -m "完成 HTML 報名表欄位"
git push
```

- 訊息寫這次做了哪一節，不要只寫 `update`。
- 只加入你改過的練習，不要 `git add` 整個 `node_modules`。
- `push` 是推到你的 fork。
- 寫壞了先 `git diff` 看差異，再決定要不要還原那個檔案。
