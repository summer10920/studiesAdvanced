import data from './data.js';
import { useState } from 'react';

export default function MyGallery({ showTitle, setShowTitle }) {
  console.log(data);
  const [idx, setIdx] = useState(0);
  

  const handlePrev = () => {
    setIdx((idx - 1 + data.length) % data.length);
  };
  const handleNext = () => {
    // idx = (idx + 1) % data.length;
    setIdx((idx) => (idx + 1) % data.length);
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
        <button onClick={handlePrev}>prev</button>
        <button onClick={() => setShowTitle(!showTitle)}>{showTitle ? 'hide' : 'show'}</button>
        <button onClick={handleNext}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      {showTitle && <label>{data[idx].title}</label>}
    </div>
  );
}
