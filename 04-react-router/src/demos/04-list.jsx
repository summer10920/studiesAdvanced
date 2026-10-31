import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function ListPage() {
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

  return (
    <section>
      <h1 className="text-2xl font-bold">清單</h1>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link className="text-teal-800 underline" to={'/items/' + item.id}>
              {item.title} {item.place} {item.price}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
