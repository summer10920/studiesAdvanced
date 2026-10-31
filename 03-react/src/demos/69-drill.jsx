import { useState } from 'react';

function Banner({ theme, onThemeChange }) {
  return (
    <div className="grid gap-2">
      <p>主題 {theme}</p>
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => onThemeChange('深色')}
      >
        改成深色
      </button>
    </div>
  );
}

function Panel({ theme, onThemeChange }) {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner theme={theme} onThemeChange={onThemeChange} />
    </div>
  );
}

function Layout({ theme, onThemeChange }) {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel theme={theme} onThemeChange={onThemeChange} />
    </div>
  );
}

export default function DrillDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <section className="grid gap-3">
      <Layout theme={theme} onThemeChange={setTheme} />
    </section>
  );
}
