import { Outlet, ScrollRestoration } from 'react-router';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { useStore } from '../store.jsx';

export default function SiteLayout() {
  const { notice, clearNotice } = useStore();
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
      <Snackbar open={Boolean(notice)} autoHideDuration={3200} onClose={clearNotice} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={clearNotice}>{notice}</Alert>
      </Snackbar>
      <ScrollRestoration />
    </div>
  );
}
