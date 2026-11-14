export default function Menu({
  demoCount,
  groups,
  current,
  query,
  menuOpen,
  onQueryChange,
  onToggleMenu,
  onSelect,
}) {
  const keyword = query.trim().toLowerCase();
  const visible = groups
    .map((group) => ({
      name: group.name,
      items: group.items.filter((item) =>
        `${item.id} ${item.title} ${group.name}`
          .toLowerCase()
          .includes(keyword),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="border-b border-stone-200 bg-white md:sticky md:top-0 md:h-screen md:w-72 md:shrink-0 md:overflow-y-auto md:border-r md:border-b-0">
      <div className="flex items-center justify-between gap-2 px-4 py-3 md:block">
        <div>
          <p className="font-bold">React 練習</p>
          <p className="text-xs text-stone-500">{demoCount} 個範例</p>
        </div>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1 text-sm md:hidden"
          onClick={onToggleMenu}
        >
          {menuOpen ? '收起目錄' : '展開目錄'}
        </button>
      </div>
      <div className={menuOpen ? 'block' : 'hidden md:block'}>
        <div className="px-4 pb-2">
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
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
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-current={item.id === current ? 'page' : undefined}
                      ref={
                        item.id === current
                          ? (element) =>
                              element?.scrollIntoView({ block: 'nearest' })
                          : undefined
                      }
                      className={
                        item.id === current
                          ? 'flex w-full items-baseline gap-2 bg-teal-800 px-4 py-1.5 text-left text-sm text-white'
                          : 'flex w-full items-baseline gap-2 px-4 py-1.5 text-left text-sm hover:bg-stone-100'
                      }
                      onClick={() => onSelect(item.id)}
                    >
                      <span className="w-8 shrink-0 font-mono text-xs opacity-70">
                        {item.id}
                      </span>
                      <span className="flex-1">{item.title}</span>
                      {item.optional ? (
                        <span
                          className={
                            item.id === current
                              ? 'text-xs text-teal-100'
                              : 'text-xs text-stone-400'
                          }
                        >
                          選讀
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </aside>
  );
}
