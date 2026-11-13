import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import DemoList from '../pages/DemoList.jsx';

/**
 * 全站共用的外框。左側是目錄，右側 Outlet 依網址換主區。
 * 站名連回 /，NavLink 只在停在總覽時才標成使用中。
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:grid md:grid-cols-[18rem_1fr]">
      <aside className="border-b border-stone-200 bg-white md:min-h-screen md:border-r md:border-b-0">
        <div className="px-4 py-4 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-teal-800' : 'font-semibold'
            }
          >
            練習筆記
          </NavLink>
          <DemoList />
          <p className="mt-6 text-sm">
            <NavLink
              to="/where"
              className={({ isActive }) =>
                isActive
                  ? 'text-teal-800 underline'
                  : 'text-stone-600 underline'
              }
            >
              位置
            </NavLink>
          </p>
        </div>
      </aside>
      <main className="px-4 py-6">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
