import { useId, useState } from 'react';

export default function UseIdDemo() {
  const nameId = useId();
  const priceId = useId();
  const hintId = useId();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <form className="grid max-w-sm gap-3">
      <div>
        <label htmlFor={nameId}>名稱</label>
        <input
          id={nameId}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor={priceId}>價格</label>
        <input
          id={priceId}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-describedby={hintId}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
        <p id={hintId} className="mt-1 text-sm text-stone-600">
          只填數字，不含貨幣符號
        </p>
      </div>
    </form>
  );
}
