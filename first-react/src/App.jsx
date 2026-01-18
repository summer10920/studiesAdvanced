import { useState } from 'react';
import './App.css';
import LinkLogos from './features/LinkLogos';
import { Loki } from './_shared/util';

function App() {
  const [count, setCount] = useState(0);

  // string 也可規劃為變數
  const h1Title = 'Vite + React';
  const MyTitle = <h1 data-id="title">{h1Title}</h1>;

  const handleClick = () => {
    console.log('Loki button clicked!');
  };
  const alertClick = () => {
    alert('Loki button alert!');
  };

  return (
    <>
      <Loki onClick={handleClick} />
      <Loki onClick={alertClick} />
      <hr />
      <LinkLogos />
      {MyTitle}
      <div className="card" style={{ color: 'red', backgroundColor: 'black' }}>
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
