import { useState } from 'react';
import './App.css';
import MyLogo from './component/MyLogo/MyLogo';
import MyH1 from './component/MyH1/MyH1';
import MyButton from './component/MyButton/MyButton';
import MyForm from './component/MyForm/MyForm';
import MyGallery from './component/MyGallery/MyGallery';

export default function App() {
  const [count, setCount] = useState(0);
  const [toShow, setToShow] = useState(true);

  const h1Title = 'Vite + React';

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };
  const onPasswordChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <MyGallery toShow={toShow} setToShow={setToShow} />
      <MyGallery {...{ toShow, setToShow }} />
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyForm onLokiSubmit={onPasswordSubmit} onLokiChange={onPasswordChange} />
        <MyButton>Click Me!</MyButton>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
