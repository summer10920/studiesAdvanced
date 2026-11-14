import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { getNote, listNotes } from './notes-db.js';

/**
 * 列表與明細共用。params 是路徑參數，明細路由才有 noteId。
 * 沒有 noteId 時回傳清單，交給列表頁的 useLoaderData。
 * 有 noteId 時用 getNote 回傳那一筆，交給 NoteDetail。
 * 找不到就 throw data(body, { status })。data 把資料和狀態碼包成路由錯誤回應，
 * 第一個引數會成為 error.data，status 是狀態碼。
 * 在 loader 裡必須 throw，不能 return：函式在這裡停住，頁面元件不會渲染，
 * 路由器畫這條路由的 errorElement。
 * @param {{ params: { noteId?: string } }} args
 * @returns {{ notes: { id: string, title: string, done: boolean }[] } | { note: { id: string, title: string, done: boolean } }}
 */
export const loader = ({ params }) => {
  if (!params.noteId) return { notes: listNotes() };
  const note = getNote(params.noteId);
  if (!note) throw data('找不到', { status: 404 });
  return { note };
};

/**
 * 列表頁。列出筆記，並提供一條連到不存在 id 的連結。
 * 使用沒有 noteId 時 loader 回傳的 { notes }。
 * @returns {JSX.Element}
 */
export default function ErrorElementDemo() {
  /**
   * 沒有 params.noteId 時，loader 回傳的是 { notes }。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">89 errorElement</h1>
      <p className="mt-4">
        {/* not-found 是不存在的 id，用來觸發 404。這個網址由 demos/89-error-element/notes/:noteId 對上，params.noteId 是 'not-found'，沒有另外宣告路由。 */}
        <Link
          className="text-teal-800 underline"
          to="/demos/89-error-element/notes/not-found"
        >
          打開一筆不存在的筆記
        </Link>
      </p>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="text-teal-800 underline"
              to={`/demos/89-error-element/notes/${note.id}`}
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
 * 明細頁。loader 在有 noteId 且找得到時回傳 { note }。
 * 找不到時 loader 已 throw，這個元件不會渲染。
 * @returns {JSX.Element}
 */
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
        <Link className="text-teal-800 underline" to="/demos/89-error-element">
          回列表
        </Link>
      </p>
    </section>
  );
}

/**
 * 明細路由的 errorElement。列表那一條沒有掛這個元件。
 * useRouteError 讀取被丟出的值。
 * isRouteErrorResponse 為 true 時，這是 throw data() 的回應，有 .status 與 .data，畫面顯示 error.data。
 * 否則顯示「找不到」。
 * @returns {JSX.Element}
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
        <Link className="text-teal-800 underline" to="/demos/89-error-element">
          回列表
        </Link>
      </p>
    </section>
  );
}
