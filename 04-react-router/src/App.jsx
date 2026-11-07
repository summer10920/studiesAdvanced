import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import DemoPage from './pages/DemoPage.jsx';
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import WherePage from './pages/WherePage.jsx';

/**
 * 筆記網站的路由表。版型包住首頁、單則筆記、位置頁與找不到的頁面。
 * 子路由寫在父路由的 children 裡，才會畫進版型的 Outlet。星號放在最後，更具體的路徑先對上。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'demos/:id', element: <DemoPage /> },
      { path: 'where', element: <WherePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], { basename });

export default function App() {
  return <RouterProvider router={router} />;
}
