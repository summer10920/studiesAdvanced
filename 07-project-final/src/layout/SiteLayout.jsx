import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

export default function SiteLayout() {
  const navigation = useNavigation();
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        {navigation.state === 'loading' ? (
          <p className="mx-auto w-full max-w-6xl px-4 pt-4 text-sm text-muted sm:px-6">
            讀取中
          </p>
        ) : null}
        <Outlet />
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
