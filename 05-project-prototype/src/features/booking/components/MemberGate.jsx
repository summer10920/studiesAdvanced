import { Navigate, useLocation } from 'react-router';
import { useSession } from '../../../session.jsx';

export default function MemberGate({ children }) {
  const { user } = useSession();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`} replace />;
  return children;
}
