// TODO: 講義「input」。換你試試：起始值改成筆。打開頁面時輸入框裡就有筆，下面一行也是筆。
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
