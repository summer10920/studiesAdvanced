/**
 * 封存：從 03-react 複製過來的 hash 選單 App，僅供對照。
 * 路由版入口是 App.jsx；main.jsx 不要改指到這個檔。
 */
import { useState } from 'react';
import { demos, groups } from './demoRegistry.js';
import Menu from './Menu.jsx';

/** 目前的範例記在網址的 # 後面，重新整理仍停在同一個。 */
function readHash() {
  const id = window.location.hash.slice(1);
  return demos.some((item) => item.id === id) ? id : demos[0].id;
}

export default function App() {
  const [current, setCurrent] = useState(readHash);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const index = demos.findIndex((item) => item.id === current);
  const demo = demos[index];
  const View = demo.Component;

  const select = (id) => {
    window.history.replaceState(null, '', '#' + id);
    setCurrent(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:flex">
      <Menu
        demoCount={demos.length}
        groups={groups}
        current={current}
        query={query}
        menuOpen={menuOpen}
        onQueryChange={setQuery}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onSelect={select}
      />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <p className="text-xs text-stone-500">{demo.group}</p>
              <h1 className="text-lg font-bold">
                {demo.id} {demo.title}
                {demo.optional ? (
                  <span className="ml-2 text-xs font-normal text-stone-400">
                    選讀
                  </span>
                ) : null}
              </h1>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
                disabled={index === 0}
                onClick={() => select(demos[index - 1].id)}
              >
                上一個
              </button>
              <button
                type="button"
                className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
                disabled={index === demos.length - 1}
                onClick={() => select(demos[index + 1].id)}
              >
                下一個
              </button>
            </div>
          </div>
          <div className="pt-6">
            <View />
          </div>
        </div>
      </main>
    </div>
  );
}
