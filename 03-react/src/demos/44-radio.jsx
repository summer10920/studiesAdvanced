// TODO: 講義「radio」。換你試試：加一顆「團」，值是 `group`。點了之後，下面一行應是 group。
import { useState } from 'react';

export default function RadioDemo() {
  const [unit, setUnit] = useState('person');

  return (
    <fieldset>
      <label className="mr-4">
        <input
          type="radio"
          name="unit"
          checked={unit === 'person'}
          onChange={() => setUnit('person')}
        />
        人
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          checked={unit === 'day'}
          onChange={() => setUnit('day')}
        />
        天
      </label>
      <p className="mt-3">單位 {unit}</p>
    </fieldset>
  );
}
