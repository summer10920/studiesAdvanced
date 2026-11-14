import { useFormStatus } from 'react-dom';

// 必須是 <form> 裡面的子元件，useFormStatus 才讀得到那張表單的狀態
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
    >
      {pending ? '送出中' : '送出'}
    </button>
  );
}

export default function FormStatusDemo() {
  const send = async () => {
    // 模擬伺服器 2 秒後才回應
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="輸入任何文字"
      />
      <SubmitButton />
    </form>
  );
}
