import { data, Form, useActionData } from 'react-router';
import { createItem } from '../api/fake-api.js';

/**
 * 接收這一條路由的表單。request 是這次送出。
 * request.formData() 回傳 Promise，解析後是 FormData。
 * form.get('title') 是 FormData 的方法，讀取 name 為 title 的欄位，不是 HTTP GET。
 * 沒有這個欄位時是 null。標題去掉空白後是空字串，就回傳
 * data({ errors: { title } }, { status: 400 })。
 * 有字就呼叫 createItem({ title })，對 jsonplaceholder 發出 POST，
 * 並回傳 { item }。這個服務不會把資料留下來，所以這一則不維護清單。
 * @param {{ request: Request }} args
 * @returns {Promise<{ errors: { title: string } } | { item: { id: number, title: string } }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return data({ errors: { title: '請填標題' } }, { status: 400 });
  const item = await createItem({ title });
  return { item };
};

/**
 * Form method="post" 把欄位送到目前這條路由的 action，不整頁換成另一份文件。
 * 沒有 action 屬性時，目標就是目前網址。
 * 成功後用 useActionData 顯示伺服器回傳的那一筆。
 */
export default function ActionDemo() {
  /**
   * 最近一次 action 的回傳值。還沒送出時是 undefined。
   * @returns {{ errors?: { title: string }, item?: { id: number, title: string } } | undefined}
   */
  const result = useActionData();
  return (
    <section>
      <h1 className="text-2xl font-bold">87 action 與 Form</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的標題"
        />
        {result?.errors?.title ? (
          <p className="text-red-700">{result.errors.title}</p>
        ) : null}
        {result?.item ? (
          <p>
            伺服器回傳 #{result.item.id} {result.item.title}
          </p>
        ) : null}
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增
        </button>
      </Form>
    </section>
  );
}
