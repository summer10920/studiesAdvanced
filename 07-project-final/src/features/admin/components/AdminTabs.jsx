import { useLocation, useNavigate } from 'react-router';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export default function AdminTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = pathname.startsWith('/admin/bookings')
    ? '/admin/bookings'
    : '/admin';
  return (
    <Tabs value={value} onChange={(_, next) => navigate(next)} className="mt-4">
      <Tab value="/admin" label="行程" />
      <Tab value="/admin/bookings" label="報名清單" />
    </Tabs>
  );
}
