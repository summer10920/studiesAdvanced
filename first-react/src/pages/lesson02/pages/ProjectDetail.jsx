import { useParams, useNavigate, Link } from 'react-router';
import './ProjectDetail.css';

// 模擬完整作品資料
const projectsData = [
  {
    id: 1,
    title: 'React 部落格系統',
    description: '使用 React + Router 建立的現代化部落格系統，支援文章分類、標籤搜尋、留言功能。',
    tech: ['React 19', 'React Router v7', 'CSS Modules', 'LocalStorage'],
    features: ['文章列表與詳情頁面', '分類與標籤過濾', '搜尋功能', '響應式設計', '深色模式切換'],
    demoUrl: 'https://example.com/blog',
    githubUrl: 'https://github.com/example/blog',
    image: '🌐',
  },
  {
    id: 2,
    title: '待辦事項應用',
    description: '支援拖拉排序、分類標籤的 Todo App，資料儲存在 LocalStorage。',
    tech: ['React', 'LocalStorage', 'CSS Grid', 'Drag & Drop API'],
    features: ['新增/編輯/刪除待辦事項', '拖拉排序功能', '分類管理', '完成度統計', '資料持久化'],
    demoUrl: 'https://example.com/todo',
    githubUrl: 'https://github.com/example/todo',
    image: '📝',
  },
  {
    id: 3,
    title: '天氣查詢應用',
    description: '串接 OpenWeather API 的天氣預報工具，支援城市搜尋與多日預報。',
    tech: ['React', 'OpenWeather API', 'Axios', 'Chart.js'],
    features: ['即時天氣查詢', '7 天天氣預報', '溫度趨勢圖表', '城市搜尋紀錄', '地理位置定位'],
    demoUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather',
    image: '🌤️',
  },
  {
    id: 4,
    title: '線上塔羅牌占卜系統',
    description: '提供使用者進行線上塔羅牌抽牌與解讀，支援多種牌陣與占卜主題。',
    tech: ['React', 'Node.js', 'Express', 'RESTful API'],
    features: [
      '隨機塔羅牌抽牌',
      '多種占卜牌陣（單張 / 三張 / 愛情牌陣）',
      '塔羅牌意義與正逆位解讀',
      '占卜結果紀錄',
      '使用者友善的互動式介面',
    ],
    demoUrl: 'https://example.com/tarot',
    githubUrl: 'https://github.com/example/tarot',
    image: '🔮',
  },
];

export default function ProjectDetail() {
  const { myId } = useParams(); // 🌟 從 URL 獲取參數
  const navigate = useNavigate();

  // 從陣列中尋找對應的作品
  const project = projectsData.find((p) => p.id === Number(myId));

  // 如果作品不存在
  if (!project) {
    return (
      <div className="not-found">
        <h2>😢 找不到此作品</h2>
        <p>專案 ID「{myId}」不存在</p>
        <Link to="/lesson02/projects" className="btn-primary">
          返回作品列表
        </Link>
      </div>
    );
  }

  const handleClickGoBack = () => {
    navigate('/lesson02/projects');
  };

  const projectIds = projectsData.map((p) => p.id);

  return (
    <div className="project-detail">
      {/* 返回按鈕 */}
      <button onClick={handleClickGoBack} className="btn-back" style={{ marginRight: '10px' }}>
        返回
      </button>
      <button onClick={() => navigate(-1)} className="btn-back">
        回上頁
      </button>

      {/* 專案標題 */}
      <div className="project-header">
        <div className="project-icon">{project.image}</div>
        <div>
          <h1>{project.title}</h1>
          <p className="project-desc">{project.description}</p>
        </div>
      </div>

      {/* 技術標籤 */}
      <div className="section">
        <h2>🛠️ 使用技術</h2>
        <div className="tech-list">
          {project.tech.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 功能列表 */}
      <div className="section">
        <h2>✨ 主要功能</h2>
        <ul className="feature-list">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* 連結按鈕 */}
      <div className="section">
        <h2>🔗 相關連結</h2>
        <div className="link-buttons">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-demo">
            線上 Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github">
            GitHub 原始碼
          </a>
        </div>
      </div>

      {/* 導航到其他作品 */}
      <div className="section">
        <h2>📂 其他作品</h2>
        <div className="nav-projects">
          {projectIds.indexOf(Number(myId)) > 0 && (
            <Link to={`/lesson02/projects/${projectIds[projectIds.indexOf(Number(myId)) - 1]}`} className="btn-nav">
              ← 上一個作品
            </Link>
          )}
          {projectIds.indexOf(Number(myId)) < projectsData.length - 1 && (
            <Link
              to={`/lesson02/projects/${projectIds[projectIds.indexOf(Number(myId)) + 1]}`}
              className="btn-nav"
              style={{ marginLeft: 'auto' }}
            >
              下一個作品 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
