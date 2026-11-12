import { useLoaderData } from 'react-router';
import { listNotes } from './notes-db.js';

/** loader 在畫面前把筆記讀好，頁面用 useLoaderData 拿標題。 */
export const loader = () => ({ notes: listNotes() });

export default function LoaderDemo() {
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
