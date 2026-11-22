import { Outlet, ScrollRestoration } from 'react-router';
import Menu from '../Menu.jsx';

/**
 * 全站共用外框。左側是從 03 hash 選單演進來的目錄，右側 Outlet 依網址換主區。
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:flex">
      <Menu />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </main>
      <ScrollRestoration />
    </div>
  );
}
