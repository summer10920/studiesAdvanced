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
