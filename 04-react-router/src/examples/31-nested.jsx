import { useState } from 'react';

export default function NestedDemo() {
  const [profile, setProfile] = useState({
    name: '阿光',
    address: { city: '台北', street: '中山路' },
  });

  const onMove = () => {
    setProfile((current) => ({
      ...current,
      address: { ...current.address, city: '台南' },
    }));
  };

  return (
    <section>
      <p>
        {profile.name} 在 {profile.address.city} {profile.address.street}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onMove}
      >
        改到台南
      </button>
    </section>
  );
}
