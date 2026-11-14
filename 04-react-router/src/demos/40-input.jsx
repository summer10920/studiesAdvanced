import { useState } from 'react';

export default function InputDemo() {
  const [name, setName] = useState('');

  return (
    <section>
      <label className="grid max-w-sm gap-1">
        名稱
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p className="mt-3">目前：{name || '尚未填'}</p>
    </section>
  );
}
