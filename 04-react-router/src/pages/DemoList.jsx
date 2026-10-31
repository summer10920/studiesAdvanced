import { NavLink, useSearchParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面，篩完沒有項目的主題不畫。
 * NavLink 的 isActive 為真時，這一則用深色底標出目前頁。
 * 輸入框把關鍵字寫進查詢 q；空字串會清掉查詢。連到單則時帶上同一個 q，換頁後篩選還在。
 */
export default function DemoList() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const keyword = q.trim().toLowerCase();
  const visible = demos.filter((demo) => {
    if (!keyword) return true;
    return (
      demo.id.includes(keyword) || demo.title.toLowerCase().includes(keyword)
    );
  });

  const onSearch = (event) => {
    const next = event.target.value;
    setParams(next ? { q: next } : {});
  };

  return (
    <div className="mt-4">
      <input
        value={q}
        onChange={onSearch}
        placeholder="搜尋筆記"
        className="w-full rounded border border-stone-300 px-2 py-1 text-sm"
      />
      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-stone-500">沒有符合的筆記</p>
      ) : null}
      <div className="mt-4 grid gap-4">
        {topics.map((topic) => {
          const items = visible.filter((demo) => demo.topic === topic.id);
          if (items.length === 0) return null;
          return (
            <section key={topic.id}>
              <h2 className="text-xs font-semibold tracking-wide text-stone-500">
                {topic.title}
              </h2>
              <ul className="mt-1 grid">
                {items.map((demo) => (
                  <li key={demo.id}>
                    <NavLink
                      to={
                        q
                          ? `/demos/${demo.id}?q=${encodeURIComponent(q)}`
                          : `/demos/${demo.id}`
                      }
                      className={({ isActive }) =>
                        isActive
                          ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
                          : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
                      }
                    >
                      {demo.id} {demo.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
