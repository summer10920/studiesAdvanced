// TODO: 講義「GET」。換你試試：改讀 id 為 2 的文章。按下後標題應換成另一篇，而不是第一篇。
import { useState } from 'react';

export default function GetDemo() {
  const [title, setTitle] = useState('尚未讀取');

  const onLoad = async () => {
    setTitle('讀取中');
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      if (!response.ok) throw new Error(String(response.status));
      const post = await response.json();
      setTitle(post.title);
    } catch {
      setTitle('讀取失敗');
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onLoad}
      >
        讀取第一篇
      </button>
      <p className="mt-3">{title}</p>
    </section>
  );
}
