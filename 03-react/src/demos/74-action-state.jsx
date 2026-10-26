import { useActionState } from 'react';

const send = async (previous, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const title = String(formData.get('title') || '未填');
  return previous === '尚未送出' ? title : previous + '、' + title;
};

export default function ActionStateDemo() {
  const [message, formAction, isPending] = useActionState(send, '尚未送出');

  return (
    <form action={formAction} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
      >
        {isPending ? '送出中' : '送出'}
      </button>
      <p>{message}</p>
    </form>
  );
}
