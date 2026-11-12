import { isRouteErrorResponse, useRouteError } from 'react-router';
import Typography from '@mui/material/Typography';
import NotFoundPage from './NotFoundPage.jsx';

export default function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404)
    return <NotFoundPage />;

  const message = isRouteErrorResponse(error) ? error.data : error?.message;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>發生錯誤 · 洛奇旅行</title>
      <Typography variant="h1">發生錯誤</Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        {message ? String(message) : '請稍後再試'}
      </p>
    </main>
  );
}
