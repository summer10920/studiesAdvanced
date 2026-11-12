import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router';
import { getNote, listNotes, updateNote } from './notes-db.js';

/**
 * 列表路由的 loader。進頁前讀全部筆記，回傳值交給列表頁的 useLoaderData。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/**
 * 編輯路由的 loader。params.noteId 是路徑上的筆記 id。
 * getNote 找到時回傳 { note }，交給 NoteEdit 的 useLoaderData。
 * 沒有這筆時回傳 redirect(url)。url 是要去的路徑，路由器改去該網址並跑那一條的 loader。
 * @param {{ params: { noteId: string } }} args
 * @returns {{ note: { id: string, title: string, done: boolean } } | Response}
 */
export const editLoader = ({ params }) => {
  const note = getNote(params.noteId);
  if (!note) return redirect('/demos/88-redirect');
  return { note };
};

/**
 * 接收編輯頁的表單。request.formData() 讀取欄位，form.get('title') 取出標題。
 * 標題空白時回傳 { error: '請填標題' }，編輯頁用 useActionData 顯示，網址不變。
 * 有標題時 updateNote 依 id 寫入，再回傳 redirect('/demos/88-redirect')。
 * 路由器改去列表並跑列表的 loader。
 * @param {{ params: { noteId: string }, request: Request }} args
 * @returns {Promise<{ error: string } | Response>}
 */
export const action = async ({ params, request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return { error: '請填標題' };
  updateNote(params.noteId, title);
  return redirect('/demos/88-redirect');
};

/**
 * 列表頁。每一列連到該筆的編輯頁 /demos/88-redirect/notes/:noteId。
 * 使用 loader 回傳的 { notes }。
 * @returns {JSX.Element}
 */
export default function RedirectDemo() {
  /**
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">88 送出後轉址</h1>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="text-teal-800 underline"
              to={`/demos/88-redirect/notes/${note.id}`}
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * 編輯頁。Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * defaultValue 帶入目前標題。空白標題時，useActionData 的 error 顯示在輸入框下面。
 * 「回列表」連到 /demos/88-redirect。
 * @returns {JSX.Element}
 */
export function NoteEdit() {
  /**
   * editLoader 回傳 { note }。
   * @returns {{ note: { id: string, title: string, done: boolean } }}
   */
  const { note } = useLoaderData();
  /**
   * 最近一次 action 的回傳值。還沒送出，或 action 已 redirect 時，是 undefined。
   * @returns {{ error: string } | undefined}
   */
  const result = useActionData();
  return (
    <section>
      <h1 className="text-2xl font-bold">編輯筆記</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          defaultValue={note.title}
        />
        {result?.error ? <p className="text-red-700">{result.error}</p> : null}
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          儲存
        </button>
      </Form>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88-redirect">
          回列表
        </Link>
      </p>
    </section>
  );
}
