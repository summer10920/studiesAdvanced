// TODO: 講義「submit」。換你試試：名稱是空的時候不要更新訊息，改把訊息設成「請填名稱」。有名稱時仍送出原本那句。
import { useState } from 'react';

export default function SubmitDemo() {
  const [form, setForm] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(form.name + ' ' + form.price);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-sm gap-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="名稱"
        className="rounded border px-2 py-1"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="價格"
        className="rounded border px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{message}</p>
    </form>
  );
}
