import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [draft, setDraft] = useState(keyword);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  const visible = items.filter((item) => item.title.includes(keyword));

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchParams(draft ? { q: draft } : {});
  };

  return (
    <section>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="rounded border px-2 py-1"
          placeholder="標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          搜尋
        </button>
      </form>
      <ul className="mt-4 grid gap-2">
        {visible.map((item) => (
          <li key={item.id}>
            {item.title} {item.place} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
