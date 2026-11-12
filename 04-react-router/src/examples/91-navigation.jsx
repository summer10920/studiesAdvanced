import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { addNote, listNotes } from './notes-db.js';

/**
 * 進頁前讀清單。這裡多等 400 毫秒，讓讀取中留在畫面上。
 * 回傳值交給 useLoaderData。回傳 Promise 時路由器會等待。
 * @returns {Promise<{ notes: { id: string, title: string, done: boolean }[] }>}
 */
export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { notes: listNotes() };
};

/**
 * 接收目前路由的表單。同樣先等 400 毫秒。
 * formData 與 form.get 讀取標題，有字才寫入。回傳 null，這一則沒有用 useActionData。
 * @param {{ request: Request }} args
 * @returns {Promise<null>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const title = String(form.get('title') ?? '').trim();
  if (title) addNote(title);
  return null;
};

/**
 * Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * 送出期間用 navigation.state 停用按鈕。
 */
export default function NavigationDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  /**
   * 路由器此刻的導覽。state 為 'idle'（閒置）、'loading'（正在跑 loader）或 'submitting'（正在跑 action）。
   * @returns {{ state: 'idle' | 'loading' | 'submitting' }}
   */
  const navigation = useNavigation();
  const [params] = useSearchParams();
  const nonce = Number(params.get('n') ?? '0');
  const pending =
    navigation.state === 'loading' || navigation.state === 'submitting';
  return (
    <section>
      <h1 className="text-2xl font-bold">91 useNavigation</h1>
      {pending ? <p className="mt-3">讀取中</p> : null}
      <p className="mt-3">
        <Link
          className="text-teal-800 underline"
          to={`/demos/91-navigation?n=${nonce + 1}`}
        >
          重新讀取
        </Link>
      </p>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-40"
          disabled={navigation.state === 'submitting'}
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
