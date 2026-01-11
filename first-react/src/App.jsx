import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function ImgLogo({ src, alt }) {
  return <img src={src} className="logo" alt={alt} />;
}

function LinkItem({ logoItem }) {
  const { url, imgUrl, altText } = logoItem;
  return (
    <a href={url} target="_blank">
      <ImgLogo src={imgUrl} alt={altText} />
    </a>
  );
}

function LinkLogos() {
  const logoItems = [
    { id: 1, url: 'https://vite.dev', imgUrl: viteLogo, altText: 'Vite logo' },
    { id: 2, url: 'https://react.dev', imgUrl: reactLogo, altText: 'React logo' },
  ];

  return (
    <div>
      {logoItems.map((item) => (
        <LinkItem logoItem={item} key={item.id} />
      ))}
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
