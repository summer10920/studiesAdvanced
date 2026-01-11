import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // jsx 可規劃為變數
  const imgVite = <img src={viteLogo} className="logo" alt="Vite logo" />;
  const imgReact = <img src={reactLogo} className="logo react" alt="React logo" />;
  const myBr = <br />;

  // string 也可規劃為變數
  const h1Title = 'Vite + React';
  const MyTitle = <h1 data-id="title">{h1Title}</h1>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          {imgVite}
        </a>
        {myBr}
        <a href="https://react.dev" target="_blank">
          {imgReact}
        </a>
      </div>
      {MyTitle}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
