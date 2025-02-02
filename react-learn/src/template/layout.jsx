import { Link, Outlet, NavLink } from 'react-router';
import './layout.css';

export default function Layout() {
  return (
    <>
      <nav>
        <h2>選單</h2>
        <ul>
          <li>
            <NavLink to="/base">基礎學習</NavLink>
          </li>
          <li>
            <NavLink to="/lesson02/my-context">Context Sample 1</NavLink>
          </li>
          <li>
            <NavLink to="/lesson02/my-list-menu">Context Sample Menu</NavLink>
          </li>
          <li>
            <NavLink to="/lesson02/todo-list">ToDo List</NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <div className="container">
          <Outlet />
        </div>
        <footer>本專案為 Loki Jiang 課程教材使用</footer>
      </main>
    </>
  );
}
