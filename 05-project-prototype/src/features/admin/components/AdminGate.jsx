import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useSession } from '../../../session.jsx';

export default function AdminGate({ children }) {
  const { user } = useSession();
  if (user?.role === 'admin') return children;
  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Alert severity="warning">行程與報名只有管理員可以進入。</Alert>
      <Button className="mt-6" component={Link} to="/admin/login" variant="contained">到後台登入</Button>
    </main>
  );
}
