import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import DemoPage from './pages/DemoPage.jsx';
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import WherePage from './pages/WherePage.jsx';

/**
 * 筆記網站的路由表。版型包住首頁、單則筆記、位置頁與找不到的頁面。
 * 子路由寫在父 Route 裡面，才會畫進版型的 Outlet。星號放在最後，更具體的路徑先對上。
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="demos/:id" element={<DemoPage />} />
        <Route path="where" element={<WherePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
