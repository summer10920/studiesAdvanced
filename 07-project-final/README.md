# 洛奇旅行 · 功能化

切版完成之後的參考答案。前台用 Google 登入報名，並在「我的報名」讀自己的訂單。後台使用 Firebase Authentication 的 email 與密碼。行程與訂單在 Cloud Firestore。

色票、路由與契約 id 與 `05-project-prototype` 相同。畫面規格看那一份 README。

## 開啟

需要 Node.js 24 與 pnpm。

```bash
pnpm install
cp .env.example .env.local
```

把 Firebase 網頁應用程式的設定填進 `.env.local`。這個檔不要 commit。沒有金鑰時 `pnpm build` 仍可通過，頁面會顯示尚未設定。

```bash
pnpm dev
```

## 資料

`tours` 任何人可讀，瀏覽器不可寫。`/seed` 在資料庫仍是測試模式時，把 `src/features/tours/mock.data.js` 寫進去。換成 `firestore.rules` 之後，瀏覽器不能再寫行程。

`orders` 只讓已登入者新增，而且 `uid` 必須等於 `request.auth.uid`。讀取限文件主人，或 `sign_in_provider` 為 `password` 的管理員。更新只限管理員。刪除不開放。網站沒有註冊表單。

主控台啟用 Google，以及電子郵件／密碼。不要啟用電話驗證，不要升級 Firebase Authentication with Identity Platform。`localhost` 已在授權網域。

規則全文在 `firestore.rules`。
