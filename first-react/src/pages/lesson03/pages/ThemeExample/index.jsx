import { useState } from 'react';
import { ThemeContext, themes } from '../../sharedContext';
import Toolbar from './Toolbar';
import './index.css';

export default function ThemeExample() {
  // 管理當前主題狀態
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // 切換主題的函式
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev.name === 'light' ? themes.dark : themes.light));
  };

  return (
    <div className="theme-example">
      <h1>🎨 Context API：主題切換範例</h1>

      <div className="example-intro">
        <p>這個範例展示如何使用 Context API 在多層元件中共享主題資料，</p>
        <p>中間層元件（Toolbar）不需要處理 Props。</p>
      </div>

      {/* 切換主題按鈕 */}
      <div className="control-panel">
        <button onClick={toggleTheme} className="toggle-btn">
          切換到 {currentTheme.name === 'light' ? '深色' : '淺色'} 主題
        </button>
        <p className="current-theme">
          當前主題：<strong>{currentTheme.name === 'light' ? '淺色' : '深色'}</strong>
        </p>
      </div>

      {/* 🌟 使用 Provider 提供主題資料給子樹 */}
      <ThemeContext.Provider value={currentTheme}>
        <Toolbar />
      </ThemeContext.Provider>

      {/* 說明區域 */}
      <div className="explanation">
        <h3>💡 程式碼說明</h3>
        <ol>
          <li>
            <code>ThemeContext.Provider</code> 包覆子元件樹
          </li>
          <li>
            <code>value</code> 屬性提供當前主題資料
          </li>
          <li>
            子樹中的任何元件都可以透過 <code>useContext</code> 讀取主題
          </li>
          <li>中間層元件（Toolbar）不需要處理 Props</li>
        </ol>
      </div>
    </div>
  );
}
