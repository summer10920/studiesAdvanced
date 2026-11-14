import { useState } from 'react';

export default function CheckDemo() {
  const [gift, setGift] = useState(false);

  return (
    <section>
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={gift}
          onChange={(event) => setGift(event.target.checked)}
        />
        加早餐
      </label>
      <p className="mt-3">{gift ? '要早餐' : '不含早餐'}</p>
    </section>
  );
}
