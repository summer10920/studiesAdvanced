// TODO: 講義「事件裡的請求」。換你試試：改讀 posts/8，按鈕文字改成「按一下讀第八篇」。按下後狀態應是完成，畫面出現 #8 與那篇標題。
import { useState } from 'react';

export default function ClickFetchDemo() {
  const [status, setStatus] = useState('尚未按下');
  const [post, setPost] = useState(null);

  const onLoad = async () => {
    setStatus('讀取中');
    setPost(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/5',
      );
      if (!response.ok) throw new Error(String(response.status));
      setPost(await response.json());
      setStatus('完成');
    } catch {
      setPost(null);
      setStatus('讀取失敗');
    }
  };

  return (
    <section>
      <p>狀態 {status}</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onLoad}
      >
        按一下讀第五篇
      </button>
      {post ? (
        <p className="mt-3">
          #{post.id} {post.title}
        </p>
      ) : null}
    </section>
  );
}
