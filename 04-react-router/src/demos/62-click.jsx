import { useEffect, useState } from 'react';

export default function ClickFetchDemo() {
  const [armed, setArmed] = useState(false);
  const [status, setStatus] = useState('尚未按下');
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!armed) return;
    const load = async () => {
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
    load();
  }, [armed]);

  return (
    <section>
      <p>狀態 {status}</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setArmed(true)}
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
