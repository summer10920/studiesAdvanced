import { useFetcher, useLoaderData } from 'react-router';
import { listNotes, toggleNote } from './notes-db.js';

/**
 * 進頁前讀清單。回傳值交給 useLoaderData。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/**
 * 接收送到這條路由的表單。form.get('id') 取出隱藏欄位。
 * toggleNote 只翻轉那一筆的 done。回傳值可從 fetcher.data 讀到，這一則沒有畫出來。
 * @param {{ request: Request }} args
 * @returns {Promise<{ ok: boolean }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  toggleNote(String(form.get('id')));
  return { ok: true };
};

/** 每一列用 fetcher.Form 送出，網址留在 /demos/89-fetcher。 */
export default function FetcherDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  /**
   * 不換頁的送出。fetcher.Form 把表單送到這條路由的 action，網址不變。
   * state 是 'idle'、'loading' 或 'submitting'，data 是 action 的回傳值。
   * 這一則只用 Form，沒有把 state 與 data 畫出來。
   * @returns {{ Form: React.ElementType, state: 'idle' | 'loading' | 'submitting', data: unknown }}
   */
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
