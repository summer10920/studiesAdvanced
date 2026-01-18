import { useState } from 'react';
import './App.css';
import LinkLogos from './features/LinkLogos';
import { Loki, EventDemo, EventObjectDemo } from './_shared/util';
import MyButton from './_shared/MyButton';
import MyForm from './features/MyForm';
import LokiState from './features/FirstState';

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

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單預設提交行為
    console.log('submit');
  };

  const handelChangeText = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <LokiState />
      <hr />
      <MyButton>Click Me!!</MyButton>
      <MyForm onSubmit={handleSubmit} onChange={handelChangeText} />
      <hr />
      <EventObjectDemo />
      <hr />
      <EventDemo />
      <hr />
      <Loki onClick={handleClick}>
        <ul>
          <li>123</li>
          <li>456</li>
        </ul>
      </Loki>
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
