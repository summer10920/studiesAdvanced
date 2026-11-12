import { Form, useActionData, useLoaderData } from 'react-router';
import { addNote, listNotes } from './notes-db.js';

/**
 * 進頁前讀清單。回傳值交給 useLoaderData。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/**
 * 接收這一條路由的表單。request 是這次送出。
 * request.formData() 回傳 Promise，解析後是 FormData。
 * form.get(name) 取出同名欄位，沒有時是 null。
 * 標題去掉空白後是空字串就回 { error }，否則寫入並回空字串。
 * 寫入之後這條路由的 loader 會再跑。
 * @param {{ request: Request }} args
 * @returns {Promise<{ error: string }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return { error: '請填標題' };
  addNote(title);
  return { error: '' };
};

/**
 * Form method="post" 把欄位送到目前這條路由的 action，不整頁換成另一份文件。
 * 沒有 action 屬性時，目標就是目前網址。
 */
export default function ActionDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  /**
   * 最近一次 action 的回傳值。還沒送出時是 undefined。
   * @returns {{ error: string } | undefined}
   */
  const result = useActionData();
  return (
    <section>
      <h1 className="text-2xl font-bold">87 action 與 Form</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        {result?.error ? <p className="text-red-700">{result.error}</p> : null}
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增
        </button>
      </Form>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </section>
  );
}
