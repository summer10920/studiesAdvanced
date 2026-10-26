import { useEffect, useState } from 'react';
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../api/fake-api.js';

// 空白表單：新增與清表單共用
const emptyForm = { title: '', place: '', days: '', price: '' };

export default function ItemsDemo() {
  // 清單、表單、正在編輯的 id、載入訊息
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('載入中');
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // 進畫面讀清單一次；清除時中止這次請求
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getItems(controller.signal));
        setMessage('');
        setReady(true);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setMessage('讀取失敗');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  // 表單欄位、清成新增、帶入編輯
  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onNew = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      place: item.place,
      days: String(item.days),
      price: String(item.price),
    });
  };

  // 刪除成功後改本機清單
  const onDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) onNew();
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // 送出：新增或更新；成功後改本機清單並清表單
  const onSubmit = async (event) => {
    event.preventDefault();
    const id = editingId;
    const fields = {
      title: form.title,
      place: form.place,
      days: Number(form.days),
      price: Number(form.price),
    };
    try {
      if (id === null) {
        const created = await createItem(fields);
        setItems((current) => [...current, { ...fields, id: created.id }]);
      } else {
        await updateItem(id, { ...fields, id });
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...fields, id } : item)),
        );
      }
      onNew();
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // 載入中先擋；左邊卡片＋新增，右邊共用表單
  if (!ready) return <p>{message}</p>;

  return (
    <section className="grid items-start gap-4 md:grid-cols-2">
      <div className="grid gap-3">
        <button
          type="button"
          className="justify-self-start rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onNew}
        >
          新增
        </button>
        <ul className="grid gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 rounded border border-stone-200 bg-white p-4"
            >
              <p>{item.title}</p>
              <p>
                {item.place} {item.days} 天 {item.price}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded bg-teal-800 px-3 py-1 text-white"
                  onClick={() => onEdit(item)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="rounded bg-teal-800 px-3 py-1 text-white"
                  onClick={() => onDelete(item.id)}
                >
                  刪除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
        <p>{editingId === null ? '新增' : '編輯'}</p>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="標題"
          className="rounded border px-2 py-1"
        />
        <input
          name="place"
          value={form.place}
          onChange={onChange}
          placeholder="地點"
          className="rounded border px-2 py-1"
        />
        <input
          name="days"
          value={form.days}
          onChange={onChange}
          placeholder="天數"
          className="rounded border px-2 py-1"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="價格"
          className="rounded border px-2 py-1"
        />
        <button
          type="submit"
          className="justify-self-start rounded bg-teal-800 px-3 py-1 text-white"
        >
          送出
        </button>
        {message ? <p>{message}</p> : null}
      </form>
    </section>
  );
}
