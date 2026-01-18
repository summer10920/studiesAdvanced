import { Outlet, NavLink } from 'react-router';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      {/* 側邊選單 */}
      <aside className="sidebar">
        <h2>🎓 React 學習系統</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/lesson01">📘 Lesson 01：基礎元件</NavLink>
            </li>
            <li>
              <NavLink to="/lesson02">📗 Lesson 02：Router 教學</NavLink>
            </li>
            <li>
              <NavLink to="/lesson03">📕 Lesson 03：待擴充</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 主要內容區域 */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
