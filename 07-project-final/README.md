# 洛奇旅行 · 功能化

切版完成之後的參考答案。前台報名不必登入。行程與訂單在 Cloud Firestore。只有後台使用 Firebase Authentication 的 email 與密碼。

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

`tours` 任何人可讀。`/seed` 在資料庫仍是測試模式時，把 `src/data/tours.js` 寫進去。換成 `firestore.rules` 之後，瀏覽器不能再寫行程。

`orders` 任何人可新增。讀取與更新只限已登入使用者。這份專案沒有註冊，登入者就是在主控台建立的那位管理員。

規則全文在 `firestore.rules`。
