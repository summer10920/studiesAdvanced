import { useState } from 'react';
import { usePost } from '../hooks/usePost.js';

export default function HookDepsDemo() {
  const [id, setId] = useState(1);
  const { status, post } = usePost(id);

  return (
    <section className="grid gap-3">
      <p>目前編號 {id}</p>
      <div className="flex gap-2">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            type="button"
            className="rounded bg-teal-800 px-3 py-1 text-white"
            onClick={() => setId(value)}
          >
            第 {value} 篇
          </button>
        ))}
      </div>
      {status === 'loading' && <p>載入中</p>}
      {status === 'error' && <p>讀取失敗</p>}
      {status === 'ready' && (
        <p>
          #{post.id} {post.title}
        </p>
      )}
    </section>
  );
}
