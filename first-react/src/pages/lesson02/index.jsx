import { Routes, Route, Navigate, Link, NavLink, Outlet } from 'react-router';
import './index.css';

// 子頁面元件（稍後建立）
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function Lesson02() {
  return (
    <div className="lesson02-container">
      {/* 內部導航列 */}
      <nav className="lesson02-nav">
        <h2>📂 我的作品集</h2>
        <div className="nav-links">
          <NavLink to="/lesson02/projects" className="nav-link">
            作品列表
          </NavLink>
          <NavLink to="/lesson02/about" className="nav-link">
            關於我
          </NavLink>
          <NavLink to="/lesson02/contact" className="nav-link">
            聯絡我
          </NavLink>
        </div>
      </nav>

      {/* 子路由渲染區域 */}
      <div className="lesson02-content">
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:myId" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}
