import { createContext, use, useState } from 'react';

const ThemeContext = createContext('淺色');

function ThemeLabel({ show }) {
  if (!show) return <p>沒有顯示主題</p>;
  const theme = use(ThemeContext);
  return <p>主題 {theme}</p>;
}

export default function UseContextDemo() {
  const [show, setShow] = useState(false);

  return (
    <ThemeContext value="深色">
      <section className="grid gap-3">
        <button
          type="button"
          className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setShow((value) => !value)}
        >
          切換顯示
        </button>
        <ThemeLabel show={show} />
      </section>
    </ThemeContext>
  );
}
