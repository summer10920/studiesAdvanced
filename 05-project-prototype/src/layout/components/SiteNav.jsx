import { NavLink } from 'react-router';

const item = ({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteNav({ onNavigate, id }) {
  return (
    <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center" aria-label="主要">
      <NavLink to="/tours" className={item} onClick={onNavigate}>行程</NavLink>
      <NavLink to="/about" className={item} onClick={onNavigate}>關於</NavLink>
      <NavLink to="/me" className={item} onClick={onNavigate}>我的報名</NavLink>
    </nav>
  );
}
