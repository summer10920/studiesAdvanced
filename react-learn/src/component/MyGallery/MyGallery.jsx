import { useState } from 'react';
import data from './data.js';

const MyGallery = ({ toShow, setToShow }) => {
  const [idx, setIdx] = useState(0);

  const handleControl = (todo) => {
    switch (todo) {
      case 'next':
        setIdx((idx) => (idx + data.length + 1) % data.length);
        break;

      case 'prev':
        setIdx((idx) => (idx + data.length - 1) % data.length);
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleControl('prev')}>prev</button>
        <button onClick={() => setToShow((bool) => !bool)}>{toShow ? 'hide' : 'show'}</button>
        <button onClick={() => handleControl('next')}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      {toShow && <label>{data[idx].title}</label>}
    </div>
  );
};

export default MyGallery;
