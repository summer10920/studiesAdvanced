import { useFetcher, useLoaderData } from 'react-router';
import { listNotes, toggleNote } from './notes-db.js';

/** useFetcher 更新完成狀態，網址留在這一頁。 */
export const loader = () => ({ notes: listNotes() });

export const action = async ({ request }) => {
  const form = await request.formData();
  toggleNote(String(form.get('id')));
  return { ok: true };
};

export default function FetcherDemo() {
  const { notes } = useLoaderData();
  const fetcher = useFetcher();
  return (
    <section>
      <h1 className="text-2xl font-bold">89 fetcher 不換頁</h1>
      <ul className="mt-4 grid max-w-sm gap-3">
        {notes.map((note) => (
          <li key={note.id} className="flex items-center justify-between gap-3">
            <span>
              {note.title} · {note.done ? '已完成' : '未完成'}
            </span>
            <fetcher.Form method="post">
              <input type="hidden" name="id" value={note.id} />
              <button
                type="submit"
                className="rounded bg-teal-800 px-3 py-1 text-white"
              >
                {note.done ? '改回未完成' : '標成完成'}
              </button>
            </fetcher.Form>
          </li>
        ))}
      </ul>
    </section>
  );
}
