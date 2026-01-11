import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const alts = {
  vite: 'Vite logo',
  react: 'React logo',
};

function ImgVite(props) {
  // console.log('ImgVite props:', props);
  return <img src={viteLogo} className="logo" alt={props.alt} />;
}
function LinkVite() {
  return (
    <a href="https://vite.dev" target="_blank">
      <ImgVite alt={alts.vite} name={'vite'} />
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

function LinkLogos() {
  const myBr = <br />;
  return (
    <div>
      <LinkVite />
      {myBr}
      <LinkReact />
    </div>
  );
}

// 示範如何把一個fn指定動作丟給小元件

function Loki({ onClick }) {
  return <button onClick={onClick}>Loki Component</button>;
}

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
