// TODO: 講義「checkbox」。換你試試：起始值改成 `true`。打開頁面時應已勾選，文字是要禮盒。
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
        加禮盒
      </label>
      <p className="mt-3">{gift ? '要禮盒' : '不包禮盒'}</p>
    </section>
  );
}
