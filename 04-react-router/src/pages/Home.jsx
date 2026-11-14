import { Link } from 'react-router';
import { demos, groups } from '../demoRegistry.js';

/**
 * 總覽首頁。說明這份專案由 03-react 的 hash 選單改成路徑路由。
 */
export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold">React Router 練習</h1>
      <p className="mt-2 max-w-xl">
        這份專案從 <code className="text-sm">03-react</code> 複製而來，把 hash
        選單改成 data mode 的路徑路由。左側目錄用{' '}
        <code className="text-sm">NavLink</code>
        ，點一則會換成 <code className="text-sm">/demos/…</code>
        ；重新整理仍停在同一則，也可以把網址存成書籤。
      </p>
      <p className="mt-4 text-sm text-stone-600">
        共 {demos.length} 則，分成 {groups.length} 組。
      </p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/01-hello">
          從第一則開始
        </Link>
      </p>
    </section>
  );
}
