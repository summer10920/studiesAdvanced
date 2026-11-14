import { NavLink, Outlet, useNavigation } from 'react-router';

/**
 * 題目一：版型。頁首三個 NavLink，頁面內容畫在 Outlet。
 * 題目二：換頁讀取期間（navigation.state 為 loading）在頁首顯示「載入中」。
 */
export default function Layout() {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="flex items-center gap-4 border-b border-stone-200 bg-white px-4 py-3">
        {/* 首頁連到 /，要加 end，否則每一頁都算使用中 */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'font-semibold text-teal-800' : 'text-stone-600'
          }
        >
          首頁
        </NavLink>
        <NavLink
          to="/tours"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-teal-800' : 'text-stone-600'
          }
        >
          行程
        </NavLink>
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-teal-800' : 'text-stone-600'
          }
        >
          報名
        </NavLink>
        {navigation.state === 'loading' ? (
          <span className="ml-auto text-sm text-stone-500">載入中</span>
        ) : null}
      </header>
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
