import { Link } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 筆記總覽。主題與則數來自目錄資料，Link 前往第一則。
 * Link 改的是網址，文件不整頁重載。
 */
export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold">練習筆記</h1>
      <p className="mt-2 max-w-xl">
        左側是前兩天的示範目錄。點一則就換到該則的網址，重新整理仍停在同一則，也可以把網址存成書籤。
      </p>
      <p className="mt-4">
        共 {demos.length} 則，分成 {topics.length} 個主題。
      </p>
      <ul className="mt-4 grid gap-1">
        {topics.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/01">
          從第一則開始
        </Link>
      </p>
    </section>
  );
}
