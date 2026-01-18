import { useState } from 'react';

export function ImgLogo({ src, alt }) {
  return <img src={src} className="logo" alt={alt} />;
}

// 示範如何把一個fn指定動作丟給小元件
export function Loki({ onClick, children }) {
  // console.log('Loki children:', children);
  return <button onClick={onClick}>{children || 'Default Context'}</button>;
}

export function EventDemo() {
  const [message, setMessage] = useState('請與我互動');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 滑鼠事件
  const handleClick = () => setMessage('你點擊了按鈕！');
  const handleMouseEnter = () => setMessage('滑鼠移入了！');
  const handleMouseLeave = () => setMessage('滑鼠移出了！');
  const handleMouseMove = (e) => {
    // console.log(e);
    setPosition({ x: e.clientX, y: e.clientY });
    setMessage(`滑鼠位置：${e.clientX}, ${e.clientY}`);
  };

  // 鍵盤事件
  const handleKeyDown = (e) => {
    setMessage(`按下了鍵：${e.key}`);
  };

  // 表單事件
  const handleChange = (e) => {
    setMessage(`輸入內容：${e.target.value}`);
  };

  return (
    <div>
      <h3>{message}</h3>
      <p>
        滑鼠座標：{position.x}, {position.y}
      </p>

      <button onClick={handleClick}>點擊我</button>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}
      >
        滑鼠互動區域
      </div>

      <input onChange={handleChange} onKeyDown={handleKeyDown} placeholder="輸入文字或按鍵" />
    </div>
  );
}

export function EventObjectDemo() {
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleClick = (event) => {
    addLog(`點擊事件 - 類型：${event.type}`);
    addLog(`目標元素：${event.target.tagName}`);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 阻止表單預設提交
    addLog('表單提交被阻止');
  };

  const handleInputChange = (event) => {
    addLog(`輸入值：${event.target.value}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addLog('按下了 Enter 鍵');
    }
  };

  return (
    <div>
      <h3>事件日誌</h3>
      <div>
        {log.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <button onClick={handleClick}>點擊我</button>

      <form onSubmit={handleFormSubmit}>
        <input onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="輸入文字" />
        <button type="submit">提交表單</button>
      </form>
    </div>
  );
}
