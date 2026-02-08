import { useContext } from 'react';
import { ThemeContext } from '../../sharedContext';

export default function ThemedButton() {
  // 🌟 使用 useContext 讀取 Context 資料
  const theme = useContext(ThemeContext);

  return (
    <div className="themed-button-container">
      <h4>🎨 ThemedButton 元件（存取者）</h4>
      <button
        style={{
          background: theme.buttonBg,
          color: theme.foreground,
          border: `2px solid ${theme.buttonBorder}`,
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'all 0.3s',
        }}
      >
        我是一個使用 {theme.name === 'light' ? '淺色' : '深色'} 主題的按鈕
      </button>
      <p className="code-hint">
        <code>const theme = useContext(ThemeContext)</code>
      </p>
    </div>
  );
}
