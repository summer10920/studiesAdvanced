import { useActionState } from 'react';
import { createItem } from '../api/fake-api.js';

const send = async (previous, formData) => {
  const item = await createItem({ title: String(formData.get('title') || '未填') });
  const title = item.title;
  return previous === '尚未報名' ? '已報名：' + title : previous + '、' + title;
};

export default function ActionStateDemo() {
  const [message, formAction, isPending] = useActionState(send, '尚未報名');

  return (
    <form action={formAction} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="想報名的行程"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
      >
        {isPending ? '報名中' : '報名'}
      </button>
      <p>{message}</p>
    </form>
  );
}
