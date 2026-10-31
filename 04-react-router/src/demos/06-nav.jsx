import { NavLink } from 'react-router';

const itemClass = ({ isActive }) =>
  isActive ? 'text-teal-800 underline' : 'text-stone-700';

export default function SiteMenu() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
        <NavLink to="/" end className={itemClass}>
          首頁
        </NavLink>
        <NavLink to="/items" className={itemClass}>
          清單
        </NavLink>
        <NavLink to="/search" className={itemClass}>
          搜尋
        </NavLink>
        <NavLink to="/new" className={itemClass}>
          新增
        </NavLink>
      </nav>
    </header>
  );
}
