import { Outlet } from 'react-router';
import SiteMenu from './06-nav.jsx';

export default function Shell() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteMenu />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
