import { Link, useParams } from 'react-router';

/**
 * 沒有路由對上時的主區。星號放在版型裡，左側目錄還在，這裡只換主區的說明。
 * useParams 的 '*' 欄位是星號接住的那一段網址，回目錄的 Link 指向 /。
 */
export default function NotFoundPage() {
  const { '*': missed } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">網址 /{missed} 沒有對上任何筆記。</p>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回目錄
        </Link>
      </p>
    </section>
  );
}
