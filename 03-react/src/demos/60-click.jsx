// TODO: 講義「事件裡的請求」。換你試試：改讀 posts/3。按下後標題應換成第三篇。
import { useState } from 'react';

export default function ClickFetchDemo() {
  const [title, setTitle] = useState('尚未讀取');

  const onLoad = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    if (!response.ok) {
      setTitle('讀取失敗');
      return;
    }
    const post = await response.json();
    setTitle(post.title);
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onLoad}
      >
        讀取
      </button>
      <p className="mt-3">{title}</p>
    </section>
  );
}
