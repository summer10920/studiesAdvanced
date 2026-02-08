import { useState, useContext } from 'react';
import { FontSizeContext } from '../../sharedContext';
import styles from './MenuItem.module.css';

export default function MenuItem({ data }) {
  // 控制子選單展開/收合
  const [isExpanded, setIsExpanded] = useState(true);

  // 🌟 讀取當前層級的字體大小
  const currentFontSize = useContext(FontSizeContext);

  // 是否有子選單
  const hasChildren = data.children && data.children.length > 0;

  return (
    <li>
      <div className={styles.menuItem}>
        {/* 顯示選單名稱，字體大小由 Context 決定 */}
        <span style={{ fontSize: `${currentFontSize}rem` }}>{data.name}</span>

        {/* 如果有子選單，顯示展開/收合按鈕 */}
        {hasChildren && (
          <button
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '收合' : '展開'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      {/* 渲染子選單 */}
      {isExpanded && hasChildren && (
        // 🌟 為子選單提供新的字體大小（遞減 1.5 倍）
        <FontSizeContext.Provider value={currentFontSize / 1.5}>
          <ul className={styles.submenu}>
            {data.children.map((child) => (
              <MenuItem key={child.name} data={child} />
            ))}
          </ul>
        </FontSizeContext.Provider>
      )}
    </li>
  );
}
