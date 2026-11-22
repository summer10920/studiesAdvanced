import { useState } from 'react';

export default function SelectDemo() {
  const [city, setCity] = useState('taipei');

  return (
    <section>
      <select
        value={city}
        onChange={(event) => setCity(event.target.value)}
        className="rounded border px-2 py-1"
      >
        <option value="taipei">台北</option>
        <option value="tainan">台南</option>
      </select>
      <p className="mt-3">代碼 {city}</p>
    </section>
  );
}
