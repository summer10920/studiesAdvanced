// TODO: 講義「useOptimistic」。換你試試：等待改成 800 毫秒。送出後應仍立刻看到新名稱，只是實際狀態晚一點才跟上。
import { useOptimistic, useState } from 'react';

export default function OptimisticDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const send = async (formData) => {
    const next = String(formData.get('name') || name);
    setOptimisticName(next);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setName(next);
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <p>目前 {optimisticName}</p>
      <input
        name="name"
        className="rounded border px-2 py-1"
        placeholder="新名稱"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        更新
      </button>
    </form>
  );
}
