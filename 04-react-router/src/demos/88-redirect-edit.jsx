import { Form, Link, redirect, useLoaderData } from 'react-router';
import { getItems, updateItem } from '../api/fake-api.js';

/**
 * 編輯路由的 loader。params.itemId 是路徑上的項目 id。
 * 從 getItems 找出這一筆，交給編輯頁的 useLoaderData。
 * @param {{ params: { itemId: string } }} args
 * @returns {Promise<{ item: { id: number, title: string } }>}
 */
export const loader = async ({ params }) => {
  const items = await getItems();
  const item = items.find((row) => String(row.id) === String(params.itemId));
  return { item };
};

/**
 * 接收編輯頁的表單。request.formData() 讀取 title，updateItem 寫入後
 * 回傳 redirect('/demos/88-redirect-list')。路由器改去列表並跑列表的 loader。
 * @param {{ params: { itemId: string }, request: Request }} args
 * @returns {Promise<Response>}
 */
export const action = async ({ params, request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '');
  const items = await getItems();
  const current = items.find((row) => String(row.id) === String(params.itemId));
  await updateItem(params.itemId, { ...current, title });
  return redirect('/demos/88-redirect-list');
};

/**
 * 編輯頁。Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * defaultValue 帶入目前標題。送出後由 action 轉回列表。
 * @returns {JSX.Element}
 */
export default function RedirectEdit() {
  /**
   * @returns {{ item: { id: number, title: string } }}
   */
  const { item } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">編輯標題</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          defaultValue={item.title}
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          儲存
        </button>
      </Form>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88-redirect-list">
          回列表
        </Link>
      </p>
    </section>
  );
}
