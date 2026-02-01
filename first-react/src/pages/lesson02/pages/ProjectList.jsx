import { Link, useLocation } from 'react-router';
import './ProjectList.css';

// 模擬作品資料
const projects = [
  {
    id: 1,
    title: 'React 部落格系統',
    description: '使用 React + Router 建立的現代化部落格',
    tech: ['React', 'Router', 'CSS'],
    image: '🌐',
  },
  {
    id: 2,
    title: '待辦事項應用',
    description: '支援拖拉排序、分類標籤的 Todo App',
    tech: ['React', 'LocalStorage', 'CSS Grid'],
    image: '📝',
  },
  {
    id: 3,
    title: '天氣查詢應用',
    description: '串接 OpenWeather API 的天氣預報工具',
    tech: ['React', 'API', 'Axios'],
    image: '🌤️',
  },
];

export default function ProjectList() {
  // 🌟 接收從其他頁面傳來的 state
  const location = useLocation();
  const successMessage = location.state?.message;

  return (
    <div>
      {/* 🌟 如果有成功訊息，顯示提示框 */}
      {successMessage && <div className="success-alert">✅ {successMessage}</div>}

      <h1>我的作品集</h1>
      <p className="subtitle">點擊任一作品查看詳細資訊</p>

      <div className="project-grid">
        {projects.map((project) => (
          <Link key={project.id} to={`/lesson02/projects/${project.id}`} className="project-card">
            <div className="project-image">{project.image}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
