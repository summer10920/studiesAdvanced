import { useState } from 'react';
import './App.css';
import MyLogo from './component/MyLogo/MyLogo';

export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';
  const h1Element = <h1 data-id="123">{h1Title}</h1>;

  return (
    <>
      <MyLogo />
      {h1Element}
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
