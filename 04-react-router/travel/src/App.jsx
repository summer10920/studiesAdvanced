import { useEffect, useState } from 'react';
import { createItem, getItems } from './api/fake-api.js';

const emptyForm = { title: '', place: '', days: '', price: '' };

function TripCard({ item, onOpen }) {
  return (
    <li className="rounded border border-stone-200 bg-white p-4">
      <p className="font-semibold">{item.title}</p>
      <p className="mt-1">
        {item.place} {item.days} 天 {item.price}
      </p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => onOpen(item.id)}
      >
        看這一筆
      </button>
    </li>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, []);

  const selected =
    items.find((item) => String(item.id) === String(selectedId)) ?? null;

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.title) return;
    setMessage('');
    try {
      await createItem({
        title: form.title,
        place: form.place,
        days: Number(form.days),
        price: Number(form.price),
      });
      setForm(emptyForm);
      setPage('list');
    } catch {
      setMessage('送出失敗');
    }
  };

  let view;
  if (page === 'home') {
    view = (
      <section>
        <h1 className="text-2xl font-bold">洛奇旅行</h1>
        <p className="mt-2">城市散步、山海與社寺。</p>
      </section>
    );
  } else if (page === 'list') {
    if (status === 'loading') view = <p>載入中</p>;
    else if (status === 'error') view = <p>讀取失敗</p>;
    else {
      view = (
        <ul className="grid gap-2">
          {items.map((item) => (
            <TripCard
              key={item.id}
              item={item}
              onOpen={(id) => {
                setSelectedId(id);
                setPage('detail');
              }}
            />
          ))}
        </ul>
      );
    }
  } else if (page === 'detail') {
    view = selected ? (
      <article>
        <h1 className="text-2xl font-bold">{selected.title}</h1>
        <p className="mt-2">
          {selected.place} {selected.days} 天 {selected.price}
        </p>
      </article>
    ) : (
      <p>找不到這筆</p>
    );
  } else {
    view = (
      <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="標題"
        />
        <input
          name="place"
          value={form.place}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="地點"
        />
        <input
          name="days"
          value={form.days}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="天數"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="價格"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          送出並回到清單
        </button>
        {message ? <p>{message}</p> : null}
      </form>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
          <button type="button" onClick={() => setPage('home')}>
            首頁
          </button>
          <button type="button" onClick={() => setPage('list')}>
            清單
          </button>
          <button type="button" onClick={() => setPage('new')}>
            新增
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{view}</main>
    </div>
  );
}
