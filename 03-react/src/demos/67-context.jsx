import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('淺色');

function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

function Panel() {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner />
    </div>
  );
}

function Layout() {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel />
    </div>
  );
}

export default function ContextDemo() {
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
