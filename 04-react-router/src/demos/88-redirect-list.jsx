import { Link, useLoaderData } from 'react-router';
import { getItems } from '../api/fake-api.js';

/**
 * 列表路由的 loader。進頁前呼叫 getItems，回傳值交給列表頁的 useLoaderData。
 * @returns {Promise<{ items: { id: number, title: string }[] }>}
 */
export const loader = async () => ({ items: await getItems() });

/**
 * 列表頁。每一列有「編輯」連到 /demos/88-redirect-edit/:itemId。
 * @returns {JSX.Element}
 */
export default function RedirectList() {
  /**
   * @returns {{ items: { id: number, title: string }[] }}
   */
  const { items } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">88 送出後轉址</h1>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span>{item.title}</span>
            <Link
              className="text-teal-800 underline"
              to={`/demos/88-redirect-edit/${item.id}`}
            >
              編輯
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
