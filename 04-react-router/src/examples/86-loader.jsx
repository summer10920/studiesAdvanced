import { useLoaderData } from 'react-router';
import { listNotes } from './notes-db.js';

/**
 * 在這個網址的元件畫出來之前執行。回傳值交給 useLoaderData。
 * 路由器會傳入 { params, request }。這一則不讀路徑參數，直接回傳全部筆記。
 * 回傳 Promise 時路由器會先等待。這一則是同步回傳。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/** 畫出 loader 準備好的標題。 */
export default function LoaderDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">86 loader 讀資料</h1>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </section>
  );
}
