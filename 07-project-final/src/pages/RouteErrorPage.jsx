import { isRouteErrorResponse, useRouteError } from 'react-router';
import Typography from '@mui/material/Typography';
import NotFoundPage from './NotFoundPage.jsx';

/**
 * 子路由的 loader 或 action throw 之後，路由器往上找到最近的 errorElement 就畫這一頁。
 * useRouteError 讀到被丟出的值。
 * isRouteErrorResponse 為真且 status 是 404 時，渲染 NotFoundPage，頁首頁尾留著。
 * 其他的路由錯誤回應顯示 error.data；一般的 Error 顯示 error.message。
 */
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
