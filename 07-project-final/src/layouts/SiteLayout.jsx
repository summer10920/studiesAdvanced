import { Outlet } from 'react-router';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
