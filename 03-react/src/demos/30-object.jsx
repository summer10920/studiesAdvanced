// TODO: 講義「物件欄位」。換你試試：同一顆按鈕除了改城市，也把名稱改成「阿明」。
import { useState } from 'react';

export default function ObjectDemo() {
  const [profile, setProfile] = useState({ name: '阿光', city: '台北' });

  const onMove = () => {
    setProfile((current) => ({ ...current, city: '台中' }));
  };

  return (
    <section>
      <p>
        {profile.name} 在 {profile.city}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onMove}
      >
        改到台中
      </button>
    </section>
  );
}
