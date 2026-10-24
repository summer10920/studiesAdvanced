import { Outlet } from 'react-router';
import SiteMenu from './SiteMenu.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteMenu />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
