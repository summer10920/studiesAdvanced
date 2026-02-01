import { Link, useNavigate, useLocation } from 'react-router';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="global-not-found">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2>🔍 找不到此頁面</h2>
        <p>
          您訪問的路徑 <code>{location.pathname}</code> 不存在
        </p>

        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← 返回上一頁
          </button>
          <Link to="/lesson01" className="btn-home">
            🏠 回到首頁
          </Link>
        </div>

        {/* 🌟 提供快速導航 */}
        <div className="quick-links">
          <h3>或前往以下頁面：</h3>
          <div className="link-grid">
            <Link to="/lesson01" className="quick-link">
              📘 Lesson 01
            </Link>
            <Link to="/lesson02/projects" className="quick-link">
              📂 作品列表
            </Link>
            <Link to="/lesson02/about" className="quick-link">
              👤 關於我
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
