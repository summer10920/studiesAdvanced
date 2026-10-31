import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createItem } from '../api/fake-api.js';

export default function FormPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await createItem({
        title,
        place,
        days: Number(days),
        price: Number(price),
      });
      navigate('/items');
    } catch {
      setMessage('送出失敗');
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <input
        value={place}
        onChange={(event) => setPlace(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="地點"
      />
      <input
        value={days}
        onChange={(event) => setDays(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="天數"
      />
      <input
        value={price}
        onChange={(event) => setPrice(event.target.value)}
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
