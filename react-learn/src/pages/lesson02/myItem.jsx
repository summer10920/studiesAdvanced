import { useContext } from 'react';
import { useState } from 'react';
import { FontSizeContext } from './FontSizeContext';
import style from './myItem.module.css';

const MyItem = ({ data }) => {
  const [showChild, setShowChild] = useState(true);
  const fzVal = useContext(FontSizeContext);
  return (
    <li>
      <span style={{ fontSize: fzVal + 'rem' }}>{data.name}</span>
      {data.child?.length && (
        <button className={style.btn} onClick={() => setShowChild((bool) => !bool)}>
          {showChild ? '+' : '-'}
        </button>
      )}
      {showChild && data.child?.length > 0 && (
        <FontSizeContext.Provider value={fzVal / 1.5}>
          <ul>
            {data.child.map((obj) => (
              <MyItem key={obj.name} data={obj} />
            ))}
          </ul>
        </FontSizeContext.Provider>
      )}
    </li>
  );
};
export default MyItem;
