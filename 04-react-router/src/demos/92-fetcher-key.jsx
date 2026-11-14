import { useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * 接收表單。讀 title，回傳 { notice }。同一 key 的 useFetcher 可從 fetcher.data 讀到這份結果。
 * @param {{ request: Request }} args
 * @returns {Promise<{ notice: string }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '');
  return { notice: `已送出：${title}` };
};

/**
 * 子表單。useFetcher({ key: 'notice-form' }) 與頁面共用同一個 fetcher，只負責送出標題。
 * @param {{ onClose: () => void }} props
 * @returns {JSX.Element}
 */
function NoticeForm({ onClose }) {
  /**
   * 與頁面共用同一個 fetcher。Form 把標題送到這一條路由的 action，網址不變。
   * @returns {{ Form: React.ElementType, state: 'idle' | 'loading' | 'submitting', data: { notice?: string } | undefined, reset: () => void }}
   */
  const fetcher = useFetcher({ key: 'notice-form' });
  return (
    <fetcher.Form method="post" className="mt-4 grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        defaultValue="看海"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          disabled={fetcher.state !== 'idle'}
        >
          送出
        </button>
        <button
          type="button"
          className="rounded border px-3 py-1"
          onClick={onClose}
        >
          取消
        </button>
      </div>
    </fetcher.Form>
  );
}

/**
 * 示範頁。useFetcher({ key: 'notice-form' }) 與 NoticeForm 共用同一個 fetcher。
 * 渲染時比對尚未處理的 fetcher.data；有 notice 就關起表單並顯示提示。
 * 再次打開時呼叫 fetcher.reset()，清掉上一次留下的資料。
 * @returns {JSX.Element}
 */
export default function FetcherKeyDemo() {
  /**
   * 與 NoticeForm 共用同一個 fetcher。data 是 action 的回傳值。
   * reset 把 fetcher 清回空的 idle。
   * @returns {{ state: 'idle' | 'loading' | 'submitting', data: { notice?: string } | undefined, reset: () => void }}
   */
  const fetcher = useFetcher({ key: 'notice-form' });
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [seen, setSeen] = useState(null);
  if (
    fetcher.state === 'idle' &&
    fetcher.data?.notice &&
    fetcher.data !== seen
  ) {
    setSeen(fetcher.data);
    setOpen(false);
    setNotice(fetcher.data.notice);
  }

  const openForm = () => {
    fetcher.reset();
    setOpen(true);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">92 用 key 共用 fetcher</h1>
      {notice ? <p className="mt-3">{notice}</p> : null}
      {open ? (
        <NoticeForm onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          className="mt-4 rounded bg-teal-800 px-3 py-1 text-white"
          onClick={openForm}
        >
          打開表單
        </button>
      )}
    </section>
  );
}
