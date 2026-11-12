import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { addNote, getNote, listNotes } from './notes-db.js';

/**
 * 列表與明細共用。params 是路徑參數，明細路由才有 noteId。
 * 沒有 noteId 時回傳清單；有 noteId 時回傳那一筆。
 * 找不到就 throw data(body, { status })。data 把資料和狀態碼包成路由錯誤回應，
 * 第一個引數會成為 error.data，status 是狀態碼。
 * 在 loader 裡必須 throw，不能 return：函式在這裡停住，頁面元件不會渲染，
 * 路由器往上找到最近一個有 errorElement 的路由來畫。
 * @param {{ params: { noteId?: string }, request: Request }} args
 * @returns {{ notes: { id: string, title: string, done: boolean }[] } | { note: { id: string, title: string, done: boolean } }}
 */
export const loader = ({ params }) => {
  if (!params.noteId) return { notes: listNotes() };
  const note = getNote(params.noteId);
  if (!note) throw data('找不到這則筆記', { status: 404 });
  return { note };
};

/**
 * 接收目前路由的表單。formData 與 form.get 的用法和上一則相同。
 * 標題空白時回錯誤物件。
 * 成功時回傳 redirect(url)。url 是要去的路徑，路由器改去該網址並跑那一條的 loader。
 * @param {{ request: Request }} args
 * @returns {Promise<{ error: string } | Response>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return { error: '請填標題' };
  const note = addNote(title);
  return redirect(`/demos/88-redirect-error/notes/${note.id}`);
};

/**
 * 列表頁。Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * 這一則的列表沒有讀取 useActionData。
 */
export default function RedirectDemo() {
  /**
   * 沒有 params.noteId 時，loader 回傳的是 { notes }。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">88 redirect 與錯誤</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增並前往
        </button>
      </Form>
      <p className="mt-4">
        {/* not-found 是不存在的 id，用來觸發 404。這個網址由 demos/88-redirect-error/notes/:noteId 對上，params.noteId 是 'not-found'，沒有另外宣告路由。 */}
        <Link
          className="text-teal-800 underline"
          to="/demos/88-redirect-error/notes/not-found"
        >
          打開一筆不存在的筆記
        </Link>
      </p>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="text-teal-800 underline"
              to={`/demos/88-redirect-error/notes/${note.id}`}
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 明細頁。loader 在有 noteId 時回傳 { note }。 */
export function NoteDetail() {
  /**
   * @returns {{ note: { id: string, title: string, done: boolean } }}
   */
  const { note } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-2">{note.done ? '已完成' : '未完成'}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88-redirect-error">
          回列表
        </Link>
      </p>
    </section>
  );
}

/**
 * 明細路由的 errorElement。列表那一條沒有掛這個元件。
 * useRouteError 讀取被丟出的值。
 * isRouteErrorResponse 為 true 時，這是 throw data() 的回應，有 .status 與 .data；
 * 否則是一般的 Error，改看 .message。這一則找不到時顯示 error.data。
 */
export function NoteMissing() {
  /**
   * @returns {unknown}
   */
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.data : '找不到';
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到</h1>
      <p className="mt-2">{String(message)}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88-redirect-error">
          回列表
        </Link>
      </p>
    </section>
  );
}
