// TODO: 講義「useId」。換你試試：讓價格也受控，狀態放在 `price`，起始是空字串。 標籤的 `htmlFor` 仍用 `priceId`。
import { useId, useState } from 'react';

export default function UseIdDemo() {
  const nameId = useId();
  const priceId = useId();
  const [name, setName] = useState('');

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
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>
    </form>
  );
}
