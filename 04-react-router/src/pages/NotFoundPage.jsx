import { Link } from 'react-router';

/**
 * 沒有路由對上時的主區。星號放在版型裡，左側目錄還在，這裡只換主區的說明。
 * 回目錄的 Link 指向 /，主區回到總覽。
 */
export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">這個網址沒有對上任何筆記。</p>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回目錄
        </Link>
      </p>
    </section>
  );
}
