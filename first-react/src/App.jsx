import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const alts = {
  vite: 'Vite logo',
  react: 'React logo',
};

function ImgVite() {
  return <img src={viteLogo} className="logo" alt={alts.vite} />;
}
function LinkVite() {
  return (
    <a href="https://vite.dev" target="_blank">
      <ImgVite />
    </a>
  );
}
function ImgReact() {
  return <img src={reactLogo} className="logo react" alt={alts.react} />;
}
function LinkReact() {
  return (
    <a href="https://react.dev" target="_blank">
      <ImgReact />
    </a>
  );
}

function MyLogo() {
  const myBr = <br />;
  return (
    <div>
      <LinkVite />
      {myBr}
      <LinkReact />
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  // string 也可規劃為變數
  const h1Title = 'Vite + React';
  const MyTitle = <h1 data-id="title">{h1Title}</h1>;

  return (
    <>
      <MyLogo />
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
