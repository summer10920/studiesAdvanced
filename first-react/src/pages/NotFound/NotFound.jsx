import { Link, useNavigate, useLocation } from 'react-router';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.globalNotFound}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2>🔍 找不到此頁面</h2>
        <p>
          您訪問的路徑 <code>{location.pathname}</code> 不存在
        </p>

        <div className={styles.errorActions}>
          <button onClick={() => navigate(-1)} className={styles.btnBack}>
            ← 返回上一頁
          </button>
          <Link to="/lesson01" className={styles.btnHome}>
            🏠 回到首頁
          </Link>
        </div>

        {/* 🌟 提供快速導航 */}
        <div className={styles.quickLinks}>
          <h3>或前往以下頁面：</h3>
          <div className={styles.linkGrid}>
            <Link to="/lesson01" className={styles.quickLink}>
              📘 Lesson 01
            </Link>
            <Link to="/lesson02/projects" className={styles.quickLink}>
              📂 作品列表
            </Link>
            <Link to="/lesson02/about" className={styles.quickLink}>
              👤 關於我
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
