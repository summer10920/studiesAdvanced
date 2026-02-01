import { Routes, Route, Navigate } from 'react-router';
import Layout from './Layout';
import Lesson01 from './pages/lesson01';
import Lesson02 from './pages/lesson02';
import Lesson03 from './pages/lesson03';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <Routes>
      {/* 使用 Layout 作為父路由 */}
      <Route element={<Layout />}>
        {/* 根路徑自動導向 /lesson01 */}
        <Route index element={<Navigate to="/lesson01" replace />} />

        {/* 各課程路由 */}
        <Route path="lesson01" element={<Lesson01 />} />
        <Route path="lesson02/*" element={<Lesson02 />} />
        <Route path="lesson03" element={<Lesson03 />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
