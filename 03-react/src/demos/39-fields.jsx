// TODO: 講義「多欄位物件」。換你試試：物件再加一個鍵 `unit`，起始是空字串，並加一個對應的輸入框。打「盒」時，下面一行也要看得到。
import { useState } from 'react';

export default function FieldsDemo() {
  const [form, setForm] = useState({ name: '', price: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="grid max-w-sm gap-3">
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
      <p>
        {form.name || '未填'} {form.price}
      </p>
    </section>
  );
}
