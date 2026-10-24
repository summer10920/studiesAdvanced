// TODO: 講義「radio」。換你試試：加一顆「打」，值是 `dozen`。點了之後，下面一行應是 dozen。
import { useState } from 'react';

export default function RadioDemo() {
  const [unit, setUnit] = useState('piece');

  return (
    <fieldset>
      <label className="mr-4">
        <input
          type="radio"
          name="unit"
          checked={unit === 'piece'}
          onChange={() => setUnit('piece')}
        />
        件
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          checked={unit === 'box'}
          onChange={() => setUnit('box')}
        />
        盒
      </label>
      <p className="mt-3">單位 {unit}</p>
    </fieldset>
  );
}
