import { useState } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router';
import { demos, groups } from './demoRegistry.js';

/**
 * 左側目錄。由 03-react 的按鈕選單改來：改用 NavLink 換路徑，搜尋寫進查詢參數 q。
 */
export default function Menu() {
  const { slug: currentSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const q = params.get('q') ?? '';
  const keyword = q.trim().toLowerCase();

  const visible = groups
    .map((group) => ({
      name: group.name,
      items: group.items.filter((item) =>
        `${item.id} ${item.slug} ${item.title} ${group.name}`
          .toLowerCase()
          .includes(keyword),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const onSearch = (event) => {
    const next = event.target.value;
    setParams(next ? { q: next } : {}, { replace: true });
  };

  const toDemo = (slug) =>
    q ? `/demos/${slug}?q=${encodeURIComponent(q)}` : `/demos/${slug}`;

  return (
    <aside className="border-b border-stone-200 bg-white md:sticky md:top-0 md:h-screen md:w-72 md:shrink-0 md:overflow-y-auto md:border-r md:border-b-0">
      <div className="flex items-center justify-between gap-2 px-4 py-3 md:block">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-bold text-teal-800' : 'font-bold'
            }
            end
          >
            React Router 練習
          </NavLink>
          <p className="text-xs text-stone-500">{demos.length} 個範例</p>
        </div>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1 text-sm md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '收起目錄' : '展開目錄'}
        </button>
      </div>
      <div className={menuOpen ? 'block' : 'hidden md:block'}>
        <div className="px-4 pb-2">
          <input
            type="search"
            value={q}
            onChange={onSearch}
            placeholder="搜尋編號或標題"
            className="w-full rounded border border-stone-300 px-2 py-1 text-sm"
          />
        </div>
        <nav className="pb-6">
          {visible.length === 0 ? (
            <p className="px-4 py-2 text-sm text-stone-500">沒有符合的範例。</p>
          ) : null}
          {visible.map((group) => (
            <section key={group.name}>
              <h2 className="mt-3 px-4 py-1 text-xs font-bold tracking-wide text-stone-500">
                {group.name}
              </h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={toDemo(item.slug)}
                      onClick={() => setMenuOpen(false)}
                      ref={
                        item.slug === currentSlug
                          ? (element) =>
                              element?.scrollIntoView({ block: 'nearest' })
                          : undefined
                      }
                      className={({ isActive }) =>
                        isActive
                          ? 'flex w-full items-baseline gap-2 bg-teal-800 px-4 py-1.5 text-left text-sm text-white'
                          : 'flex w-full items-baseline gap-2 px-4 py-1.5 text-left text-sm hover:bg-stone-100'
                      }
                    >
                      <span className="w-8 shrink-0 font-mono text-xs opacity-70">
                        {item.id}
                      </span>
                      <span className="flex-1">{item.title}</span>
                      {item.optional ? (
                        <span
                          className={
                            item.slug === currentSlug
                              ? 'text-xs text-teal-100'
                              : 'text-xs text-stone-400'
                          }
                        >
                          選讀
                        </span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="mt-4 px-4 text-sm">
            <NavLink
              to="/where"
              className={({ isActive }) =>
                isActive
                  ? 'text-teal-800 underline'
                  : 'text-stone-600 underline'
              }
            >
              位置（選讀）
            </NavLink>
          </p>
        </nav>
      </div>
    </aside>
  );
}
