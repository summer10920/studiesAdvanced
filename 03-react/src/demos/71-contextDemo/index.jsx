import { useState } from 'react';
import { ThemeContext } from './ThemeContext.js';
import Layout from './Layout.jsx';

export default function ContextSplitDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <ThemeContext.Provider value={theme}>
      <section className="grid gap-3">
        <button
          type="button"
          className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setTheme('深色')}
        >
          改成深色
        </button>
        <Layout />
      </section>
    </ThemeContext.Provider>
  );
}
